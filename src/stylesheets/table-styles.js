import styled from 'styled-components'

const TableStyles = styled.div`
  padding: 1rem;

  table {
    overflow: auto;
    width: 100%;
    border-spacing: 0;
    border: 1px solid #ddd;
    box-sizing:border-box;
    box-shadow:0 2px 15px 0 rgba(0,0,0,0.15);
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    thead {
      background: #fafafa;
    }
    th {
      background: #fafafa;
      padding: 5px;
      border: 1px solid #ddd;
    },
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      :last-child {
        border-right: 0;
      }
      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 1px solid #ddd;
      }
    }
  }
  .pagination {
    padding: 0.5rem;
  }
  ul {
      list-style:none;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
  }
  li {
    padding: 10px;
  }

`
export default TableStyles