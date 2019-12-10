import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withApollo, graphql } from 'react-apollo'
import { Link } from 'react-router-dom';
import { flowRight as compose } from 'lodash'
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import { getTextsQuery } from '../queries/queries';
import { handleTextPageChange,
  handleTextPageSizeChange, handleTextSortedChange,
  handleTextFilteredChange, handleTextResizedChange } from '../actions/texts'
import { loadState }  from '../utils/localStorage'
import AudioPlayer from '../utils/AudioPlayer'

class TextsList extends Component {
  constructor(props) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this)
    this.onPageSizeChange = this.onPageSizeChange.bind(this)
    this.onSortedChange = this.onSortedChange.bind(this)
    this.onFilteredChange = this.onFilteredChange.bind(this)
    this.onResizedChange = this.onResizedChange.bind(this)
    const serializedState = loadState()
    console.log('here is my texts state from constructor ', serializedState.texts)
    this.state = {texts: serializedState.texts}
  }

  //we call our main function, which includes all the helper functions.
  async componentDidMount() {
    const getTextData = await this.props.client.query({
      query: getTextsQuery,
      variables: {
      }
    })
    let data = getTextData.data.texts_Q
    console.log('here is my data in ComponentDidMount ', data)
    let newData = this.sourcefiles(data)
    console.log('here is my newData ', newData)
  }

  async onPageChange(page) {
    await this.props.dispatch(handleTextPageChange(page))
    let currentState = this.state
    currentState.texts.tableData.page = page
    this.setState(currentState)
  }

  async onPageSizeChange(pageSize, page) {
    await this.props.dispatch(handleTextPageSizeChange(pageSize, page))
    let currentState = this.state
    currentState.texts.tableData.page = page
    currentState.texts.tableData.pageSize = pageSize
    this.setState(currentState)

  }

  async onSortedChange(newSorted, column, shiftKey) {
    await this.props.dispatch(handleTextSortedChange(newSorted, column, shiftKey))
    let currentState = this.state
    currentState.texts.tableData.sorted = newSorted
    this.setState(currentState)
  }

  async onFilteredChange(filtered, column) {
    await this.props.dispatch(handleTextFilteredChange(filtered, column))
    let currentState = this.state
    currentState.texts.tableData.filtered = filtered
    this.setState(currentState)
  }

  async onResizedChange(newResized, event) {
    await this.props.dispatch(handleTextResizedChange(newResized, event))
    let currentState = this.state
    currentState.texts.tableData.resized = newResized
    this.setState(currentState)
  }

sourcefiles(json) {
  //you have the data from getTextsQuery, call it json.
  //Now reformulate it so that the ReactTable display can handle it.
    let i = 0;
    let k = 0;
    //set an empty string to hold handImages, and one to hold typedImages.
    //These are needed for the SplitView utility that displays handwritten and
    //typed fieldnotes side-by-side.
    while (i < json.length) {
      let handImages = '';
      let typedImages = '';
      //set an empty array to hold 'sourcefiles'.
      json[i]["sourcefiles"] = [];
      let j=0;
      //for each text, provide the data fields 'src', 'title', 'fileType'
      //'msType'.  Set the entry type as 'text', and give it a key.
      while (j < json[i]["textfiles"].length) {
        json[i]["sourcefiles"].push(
          {
            src: json[i]["textfiles"][j].src,
            title: json[i]["textfiles"][j].resType + " pdf",
            fileType: json[i]["textfiles"][j].fileType,
            msType: json[i]["textfiles"][j].msType,
            type: "text",
            key: k
          }
        );
        if (json[i]["textfiles"][j]["textimages"].length > 0) {
          k++;
          // for each textfile, build the query string so that imageviewer can derive the images from it.
          let l = 0;
          json[i]["textfiles"][j]["imagequerystring"]='';
          while (l < json[i]["textfiles"][j]["textimages"].length) {
            json[i]["textfiles"][j]["imagequerystring"] = json[i]["textfiles"][j]["imagequerystring"] + '&images=' + json[i]["textfiles"][j]["textimages"][l]["src"];
            l++;
          }
          console.log(json[i]["textfiles"][j]["imagequerystring"]);
        json[i]["sourcefiles"].push(
            {
              src: json[i]["textfiles"][j]["imagequerystring"],
              title: json[i]["textfiles"][j].resType + " image files",
              fileType: json[i]["textfiles"][j].fileType,
              type: "textimages",
              key: k
            }
          );
          //SplitView needs to know if the imagefiles are for handwritten
          //or typed fieldnotes.  Here's where we tell it.
          if (json[i]["textfiles"][j].msType === "Handwritten") {
            handImages = json[i]["textfiles"][j]["imagequerystring"];
          }
            if (json[i]["textfiles"][j].msType === "Typed") {
            typedImages = json[i]["textfiles"][j]["imagequerystring"];
          }
        }
        j++; k++;
      }
      j=0;
      while (j < json[i]["audiosets"].length) {
        //here we create the data that is needed to pass to the AudioPlayer
        json[i]["sourcefiles"].push(
          {
            speaker: json[i]["audiosets"][j].speaker,
            title: json[i]["audiosets"][j].title,
            sources: json[i]["audiosets"][j].audiofiles,
            type: "audio",
            key: k
          }
        );
        j++; k++;
      }
      //SplitView should only appear if a text has both a set of handwritten
      //fieldnots and a corresponding set of typed manuscripts.
      //For SplitView to read in the imagefiles into the, correct gallery
      //we need to modify the query string to replace every instance of
      //'images' with either 'handimages' or 'typedimages'.  We use unshift
      //instead of push to put the SplitView at the top of the versions list,
      //iff a text has a SplitView.
      if ( handImages.length >0 && typedImages.length >0){
        handImages=handImages.replace(/images/g, "handimages");
      typedImages=typedImages.replace(/images/g, "typedimages");
      json[i]["sourcefiles"].unshift(
        {
          src: handImages + typedImages,
          title: "Dual view of typed and handwritten notes",
          fileType: "images",
          type: "splitview",
          key: k
        }
      );
      }
      i++;
    }
    return json;
 }
  //weblink builds the clickable link for a textfile.
  weblink(link, page) {
    return (
      link === '' ? page : <a href={link} target="_blank" rel="noopener noreferrer">{page}</a>
    );
  }
 render() {
  const { texts } = this.state
  const columns = [
      {
        Header: 'Pub #',
        id: 'rnumber',
        accessor: d=>Number(d.rnumber),
        width: 75
      },
      {
        Header: 'Notes #',
        id: 'tnumber',
        accessor: d=>Number(d.tnumber),
        width: 75
      },
      {
        Header: 'Title',
        accessor: 'title',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, {
            keys: ["title"],
            threshold: matchSorter.rankings.CONTAINS
          }),
        filterAll: true,
      },
      {
        Header: 'Narrator',
        accessor: 'speaker',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, {
            keys: ["speaker"],
            threshold: matchSorter.rankings.CONTAINS
          }),
        filterAll: true,
      },
      {
        Header: 'Cycle',
        accessor: 'cycle',
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, {
            keys: ["cycle"],
            threshold: matchSorter.rankings.CONTAINS
          }),
        filterAll: true,
      },
  ];

    const subcolumns = [

    {
      Header: 'Versions',
      accessor: 'source',
      style: { paddingLeft: "50px" },
        Cell: ({row, original}) =>
        //This builds the different kinds of entries via the sourcefiles
        //json.  If the file is a text (pdf), then weblink is called to
        //build the link.  Else, if the file is an audio, then AudioPlayer
        //is called.  Else, if there are textimage sets, we link to
        //ImageViewer. Else, we build SplitView.
        (
          original.type === "text"
          ? this.weblink(original.src, original.title)
          : (original.type === "audio"
            ? <AudioPlayer key={original.key} title={original.title} speaker={original.speaker} sources={original.sources} />
            : (original.type ==="textimages"
              ? <Link to={{
                  pathname: '/imageviewer/',
                  search: '?key=' + original.key + original.src }}
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                  {original.title}
                </Link>
              : <Link to={{
                  pathname: '/splitview/',
                  search: '?key=' + original.key + original.src }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {original.title}
                </Link>
              )
            )
        )
    },
    ];

  const table =
    <ReactTable
      data={texts.data}
      columns={columns}
      minSize={1}
      filterable
      page={texts.tableData.page}
      pageSize={texts.tableData.pageSize}
      filtered={texts.tableData.filtered}
      sorted={texts.tableData.sorted}
      resized={texts.tableData.resized}
      onPageChange={page => this.onPageChange(page)}
      onPageSizeChange={(pageSize,page) => this.onPageSizeChange(pageSize,page)}
      onSortedChange={(newSorted,column,shiftKey) => this.onSortedChange(newSorted,column,shiftKey)}
      onResizedChange={(newResized, event) => this.onResizedChange(newResized, event)}
      onFilteredChange={(filtered, column) => this.onFilteredChange(filtered,column)}
      SubComponent={row => {
        return (
        <ReactTable
          data={row.original.sourcefiles}
          columns={subcolumns}
          defaultPageSize={row.original.sourcefiles.length}
          showPagination={false}
          />
        );
      }}
    />
    return (
      <React.Fragment>
        {table}
      </React.Fragment>
    )
  }
}

function mapStateToProps (state) {
  const serializedState = loadState()
  console.log('here is my texts.tableData state ', serializedState.texts.tableData)
  const {texts} = serializedState
  return {
    texts
  }
}

export default compose(
  graphql(getTextsQuery, { name: 'getTextsQuery' }),
)( withApollo(connect(mapStateToProps)(TextsList)))

