/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-sparse-arrays */
import React, { useState } from 'react'
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter, useFlexLayout, useResizeColumns } from 'react-table7'
import { Segment } from 'semantic-ui-react'
import TableStyles from '../stylesheets/table-styles'
import { DefaultColumnFilter, GlobalFilter, fuzzyTextFilterFn } from '../utils/Filters'
import { IndeterminateCheckbox } from '../utils/Checkbox'
import DecoratedTextSpan from '../utils/DecoratedTextSpan';

const headerProps = (props, { column }) => getStyles(props, column.align)
const cellProps = (props, { cell }) => getStyles(props, cell.column.align)
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


function Table({
    columns,
    data,
    loading,
     })
    { const filterTypes = React.useMemo(
      () => ({
        fuzzyText: fuzzyTextFilterFn,
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
        Filter: DefaultColumnFilter,       // Let's set up our default Filter UI
        minWidth: 25, // minWidth is only used as a limit for resizing
        width: 50, // width is used for both the flex-basis and flex-grow
        maxWidth: 500, // maxWidth is only used as a limit for resizing
      }),
      []
    )
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      rows,
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
      },
      useResizeColumns,
      useFlexLayout,
      useGlobalFilter,
      useFilters,
      useSortBy,
      usePagination
    )
  
  React.useEffect(() => {
  const hiddenColumns = flatColumns.filter((column: any) => !column.show).map((column: any)=> column.id);
  setHiddenColumns(hiddenColumns); }, []);
  
    // Render the UI for your table
    return (
      <React.Fragment>
        <div className="columnToggle">
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
                  <li key={column.Header}>
                  <label>
                    <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                    {column.Header}
                  </label>
                  </li>
                </div>
              ))}
          </ul>
        </div>
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
              <tr {...headerGroup.getHeaderGroupProps()} >
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps(), headerProps)}>{column.render('Header')}
                    {column.canResize && (
                      <div
                        {...column.getResizerProps()}
                        className={`resizer ${
                          column.isResizing ? 'isResizing' : ''
                        }`}
                      />
                    )}
                    {column.isSorted ? (column.isSortedDesc ? "↑" : "↓") : ""}
                      <div>
                      {column.canFilter ? column.render('Filter') : null}
                      </div>
                  </th>
                ))}
              </tr>
            ))}
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
              <td colSpan="10">Loading...</td>
            ) : (
              <td colSpan="10">
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
      </React.Fragment>
    )
  }

  function SpellingList({spellingsData}) {
    const columns = React.useMemo(
      () => [
        {
            Header: 'Reichard',
            accessor: 'reichard',
            show: false,
            Cell: ({ cell: { value } }) => (<DecoratedTextSpan str={value} />),
        },
        {
            Header: 'Salish',
            accessor: 'salish',
            show: false,
            Cell: ({ cell: { value } }) => (<DecoratedTextSpan str={value} />),
        },
        {
            Header: 'Nicodemus',
            accessor: 'nicodemus',
            show: true,
            Cell: ({ cell: { value } }) => (<DecoratedTextSpan str={value} />),
        },
        {
            Header: 'English',
            accessor: 'english',
            show: true,
            Cell: ({ cell: { value } }) => (<DecoratedTextSpan str={value} />),
        },
        {
            Header: 'Note',
            accessor: 'note',
            show: false,
        }
      ],
      []
    )
  
    const [data] = useState(() => spellingsData)

    //const data = spellingsData
  

    return (
      <TableStyles>
        <Table
          columns={columns}
          data={data}
        />
      </TableStyles>
    )
  }
  
  export default SpellingList 