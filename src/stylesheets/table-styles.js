import styled from 'styled-components'

const TableStyles = styled.div`
  padding: 1rem;
   table {
    ${'' /* These styles are suggested for the table fill all available space in its containing element */}
    display: block;
    width: 100%;
    ${'' /* These styles are required for a horizontaly scrollable table overflow */}
    thead {
      display: block;
      width: 100%;
    }
    tbody {
      display: block;
      width: 100%;
      border: 1px solid #ddd;
      box-sizing:border-box;
      box-shadow:0 2px 15px 0 rgba(0,0,0,0.15);
      overflow: auto;
      padding: 1rem;
    }
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
      border-bottom: 1px solid #ddd;
    }
    th {
      border: 0px;
      background: #fafafa;
      padding: .5rem;
    },
    td {
      margin: 0;
      padding: 0.5rem;
      word-wrap: break-word;
      border-right: 1px solid #ddd;
      ${'' /* In this example we use an absolutely position resizer,
       so this is required. */}
      position: relative;
      :last-child {
        border-right: 0;
        }
      .resizer {
        right: -1.5px;
        background: #ddd;
        width: 3px;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;
        &.isResizing {
          background: #ddd;
        }
      }
    }
    th {
      &:last-of-type {
        resizer {
          ${'' /* note that the 15 is the scroll width and if also referenced in the getHeaderGroupProps for the header row below */}
          ${'' /* todo: resolve this value dynamicaly from element.scrollWidth to account for OS/Browser differences  */}
          right: -2px;
        }
      }
    }
  }
  globalFilter: {
    padding: 50px 10px 20px 30px;
  }
  .columnToggle {
    background: #fafafa;
    border: 1px solid #ddd;
  }
  ul {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
  }
  li {
    padding: 1rem;
  }
`

export default TableStyles