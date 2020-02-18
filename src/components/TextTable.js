import React from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useFlexLayout,
  useResizeColumns,
  useExpanded
} from "react-table7";
import { Segment } from "semantic-ui-react";
import TableStyles from "../stylesheets/table-styles";
import SubTable from "./SubTable";
import { DefaultColumnFilter, GlobalFilter, fuzzyTextFilterFn } from "../utils/Filters";

const headerProps = (props, { column }) => getStyles(props, column.align);
const getStyles = (props, align = "left") => [
  props,
  {
    style: {
      justifyContent: align === "right" ? "flex-end" : "flex-start",
      alignItems: "flex-start",
      display: "flex",
      overflow: "auto"
    }
  }
]; 

function Table({ columns, data, renderRowSubComponent, loading }) {
  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter, // Let's set up our default Filter UI
      minWidth: 25, // minWidth is only used as a limit for resizing
      width: 75, // width is used for both the flex-basis and flex-grow
      maxWidth: 500 // maxWidth is only used as a limit for resizing
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state,
    flatColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setHiddenColumns,
    state: { pageIndex, pageSize, expanded }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: {
        sortBy: [{ id: 'rnumber', desc: false }]
      },
      hiddenColumns: columns
        .filter(column => !column.show)
        .map(column => column.id)
    },
    useResizeColumns,
    useFlexLayout,
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
  );

  React.useEffect(() => {
    const hiddenColumns = flatColumns
      .filter((column: any) => !column.show)
      .map((column: any) => column.id);
    setHiddenColumns(hiddenColumns);
  }, []);

  // Render the UI for your table
  return (
    <React.Fragment>
      <Segment>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </Segment>
      <table {...getTableProps()}>
        <thead>         
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(
                    column.getSortByToggleProps(),
                    headerProps
                  )}
                >
                  {column.render("Header")}
                  {column.canResize && (
                    <div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? "isResizing" : ""
                      }`}
                    />
                  )}
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                  <div>                 
                    {column.canFilter ? column.render("Filter") : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          
          {page.map((row) => {
            prepareRow(row);
            return (
              <React.Fragment {...row.getRowProps()}>
              <tr>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  )
                })}
              </tr>
              {row.isExpanded ? (
                  <tr>
                    <td colSpan={flatColumns.length}>
                      {renderRowSubComponent({ row })}
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>            
            );
          })}
          <tr>
            
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan="10"> Loading... </td>
            ) : (
              <td colSpan="10">
                Showing {page.length}
                of~{pageCount * pageSize} results
              </td>
            )}
          </tr>
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          
          {"<"}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          
          {">"}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          
          {">>"}
        </button>
        <span>
          Page
          <strong>
            
            {pageIndex + 1}
            of {pageOptions.length}
          </strong>
        </span>
        <span>
          | Go to page:
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </React.Fragment>
  );
}

function TextTable({ textData }) {
  const columns = React.useMemo(() => [
    {
      Header: () => null,
      id: 'expander',
      Cell: ({row}) => (
        <span {...row.getExpandedToggleProps()}>
        {row.isExpanded ? '▼' : '▶'}
      </span>        
      ),
      width: 50,
      show: true,
    },
    {
      Header: 'Pub #',
      id: 'rnumber',
      accessor: 'rnumber',
      show: true,
      disableFilters: true,
      width: 75,
    },
    {
      Header: 'Notes #',
      id: 'tnumber',
      accessor: 'tnumber',
      disableFilters: true,
      show: true,
      width: 75,
    },
    {
      Header: 'Title',
      accessor: 'title',
      show: true,
      width: 150,
    },
    {
      Header: 'Narrator',
      accessor: 'speaker',
      show: true,
      width: 150,
    },
    {
      Header: 'Cycle',
      accessor: 'cycle',
      show: true,
      width: 150,
    },
  ]);

  const [data] = React.useState(() => textData);

  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
      <div>
        <SubTable subData={data[row.index].sourcefiles}/>    
      </div> 
    ),
    []
  ) 

  return (
    <TableStyles>
      <Table 
        columns={columns} 
        data={data}
        renderRowSubComponent={renderRowSubComponent}
      />
    </TableStyles>
  );
}

export default TextTable;
