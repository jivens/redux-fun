import React from 'react'
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter } from 'react-table7'
import { Button } from 'semantic-ui-react'
import TableStyles from '../stylesheets/table-styles'
import { DefaultColumnFilter, GlobalFilter, fuzzyTextFilterFn, SelectColumnFilter } from '../utils/Filters'
import { IndeterminateCheckbox } from '../utils/Checkbox'

function Table({
  columns,
  data,
  loading,
   })
  { const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )
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
    getToggleHideAllColumnsProps,
    setHiddenColumns,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      hiddenColumns: columns.filter(column => !column.show).map(column => column.id),
      //initialState: { pageIndex: 0 }, // Pass our hoisted table state
      //manualPagination: false, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      //pageCount: controlledPageCount,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  )
  // Listen for changes in pagination and use the state to fetch our new data
// React.useEffect(() => {
//   fetchData({ pageIndex, pageSize })
// }, [fetchData, pageIndex, pageSize])

React.useEffect(() => {
const hiddenColumns = flatColumns.filter((column: any) => !column.show).map((column: any)=> column.id);
setHiddenColumns(hiddenColumns); }, []);

  // Render the UI for your table
  return (
    <React.Fragment>
      <div>
        <ul>
        <li>
          <span>Show/Hide Columns:   </span>
        </li>
        <li>
          <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />
          Toggle All
        </li>
        {flatColumns.map(column => (
          <div>
            <li key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
              {column.Header}
            </label>
            </li>
          </div>
        ))}
        </ul>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
          <tr>
            <th
              colSpan={flatColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
          <tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan="10000">Loading...</td>
            ) : (
              <td colSpan="10000">
                Showing {page.length} of ~{pageCount * pageSize}{' '}
                results
              </td>
            )}
          </tr>
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div>
    </React.Fragment>
  )
}

function AffixTable({affixData}) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        show: false,
      },
      {
        Header: 'Type',
        accessor: 'type',
        Filter: SelectColumnFilter,
        filter: 'includes',
        show: true,
      },
      {
        Header: 'Nicodemus',
        accessor: 'nicodemus',
        filter: 'fuzzyText',
        show: true,
      },
      {
        Header: 'English',
        accessor: 'english',
        filter: 'fuzzyText',
        show: true,
      },
      {
        Header: 'Link',
        accessor: 'link',
        disableFilters: true,
        Cell: ({ row }) => <a href={row.original.link} target="_blank" rel="noopener noreferrer">{row.original.page}</a>,
        show: true,
      },
      {
        Header: 'Username',
        accessor: 'user.username',
        Filter: SelectColumnFilter,
        filter: 'includes',
        show: false,
      },
      {
        Header: 'Active',
        accessor: 'active',
        filter: 'fuzzyText',
        show: false,
      },
      {
        Header: 'Edit/Delete',
        filterable: false,
        sortable: false,
        width: 100,
        show: false,
        Cell: ({row, original}) => (
          <div>
            <Button>
                !E
            </Button>
            <Button>
                !X
            </Button>
          </div>
        )
      },
    ]
  )

  const [data] = React.useState(() => affixData)

  return (
    <TableStyles>
      <Table
        columns={columns}
        data={data}
      />
    </TableStyles>
  )
}

export default AffixTable