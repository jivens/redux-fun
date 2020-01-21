import { RECEIVE_TEXTS, SET_TEXT_PAGE_SIZE, SET_TEXT_PAGE,
  SET_TEXT_FILTERED, SET_TEXT_SORTED, SET_TEXT_RESIZED} from '../actions/texts'

function sourcefiles(jsonData) {
  let json = JSON.parse(JSON.stringify(jsonData))
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
          //console.log(json[i]["textfiles"][j]["imagequerystring"]);
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

export default function texts (state = {}, action) {
  switch (action.type) {
    case RECEIVE_TEXTS :
      console.log('here is sourcefiles(action.texts)', action.texts)
      console.log('here is sourcefiles(action.texts.data)', sourcefiles(action.texts.data))
      return {
        ...state,
        ...action.texts,
        data: sourcefiles(action.texts.data),
      }
    case SET_TEXT_PAGE_SIZE :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          pageSize: action.pageSize,
          page: action.page
        }
      }
    case SET_TEXT_PAGE :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          page: action.page
        }
      }
    case SET_TEXT_SORTED :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          sorted: action.newSorted
        }
      }
    case SET_TEXT_FILTERED :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          filtered: action.filtered
        }
      }
    case SET_TEXT_RESIZED :
      return {
        ...state,
        tableData: {
          ...state.tableData,
          resized: action.resized
        }
      }
    default :
      return state
  }
}
