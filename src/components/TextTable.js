import React from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useExpanded
} from "react-table7";
import { Segment } from "semantic-ui-react";
import TableStyles from "../stylesheets/table-styles";
import SubTable from "./SubTable";
import { DefaultColumnFilter, GlobalFilter, fuzzyTextFilterFn } from "../utils/Filters";

const headerProps = (props, { column }) => getStyles(props, column.align)
const getStyles = (props, align = 'left') => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'flex-start',
      display: 'flex',
    },
  },
]

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
      <div className="tableWrap">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} >
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps(), headerProps)}>{column.render('Header')}
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                    <div>
                    {column.canFilter ? column.render('Filter') : null}
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
              <td colSpan="10"> Loading... </td>
            ) : (
              <td colSpan="10">
                Showing {page.length} of ~{pageCount * pageSize} results
              </td>
            )}
          </tr>
        </tbody>
      </table>
      </div>
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
      show: true,
      minWidth: 50,
      maxWidth: 100,
    },
    {
      Header: 'Pub #',
      id: 'rnumber',
      accessor: 'rnumber',
      disableFilters: true,
      show: true,
      minWidth: 75,
      maxWidth: 100,
    },
    {
      Header: 'Notes #',
      id: 'tnumber',
      accessor: 'tnumber',
      disableFilters: true,
      show: true,
      minWidth: 75,
      maxWidth: 100,
    },
    {
      Header: 'Title',
      id: 'title',
      accessor: 'title',
      show: true,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      Header: 'Narrator',
      id: 'title',
      accessor: 'speaker',
      show: true,
      minWidth: 100,
      maxWidth: 200,
    },
    {
      Header: 'Cycle',
      accessor: 'cycle',
      show: true,
      minWidth: 100,
      maxWidth: 200,
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
