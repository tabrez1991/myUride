/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import {
  FormControl,
  Typography,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Paper,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Checkbox,
  CircularProgress,
  styled,
} from '@mui/material';
import styles from './style.module.scss';
import { Order, EnhancedTableProps, PaginatedTableProps } from './table.d';
import EnhancedTableHead from './head';
import Row from './collapsible_row';
import { getComparator, getSum, Item, stableSort } from './helpers';
import EnhancedTableToolbar from './toolbar';
import HtmlTable from './html_table';

const PaginatedTable = (props: PaginatedTableProps) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [totalColSpan, setTotalColSpan] = React.useState<any>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<any>(10);
  const [htmlTable, setHtmlTable] = React.useState('');
  const [isPrintClicked, setPrintClicked] = React.useState(false);
  const [isExcelClicked, setExcelClicked] = React.useState(false);
  const {
    expandable,
    expandInCols,
    serialNo,
    rows,
    headCells,
    pagination,
    expandIconAt,
    selectable,
    uniqueKey,
    actions,
    loading,
    tableRef,
    tableTitle,
    excelFileName,
    order: orderProps,
    orderBy: orderByProps,
    showTotal,
    totalLength,
    setPageNumberClicked,
    setRecordsToShow,
    customRowPerPage,
    serialNoName,
  } = props;

  const lengthOfData: any = totalLength || rows.length;

  React.useEffect(() => {
    if (customRowPerPage) {
      setRecordsToShow && setRecordsToShow(customRowPerPage);
      setRowsPerPage(customRowPerPage);
    } else {
      setRecordsToShow && setRecordsToShow(rowsPerPage);
    }
  }, [rowsPerPage]);

  React.useEffect(() => {
    setTotalColSpan(
      1 + (selectable ? 1 : 0) + (serialNo ? 1 : 0) + (expandIconAt === 'start' ? 1 : 0)
    );
  }, [showTotal]);

  React.useEffect(() => {
    if (orderProps) setOrder(orderProps);
  }, [orderProps]);

  React.useEffect(() => {
    if (orderByProps) setOrderBy(orderByProps);
  }, [orderByProps]);

  const rowsPerPageDropdown: Array<{ page: number; label: string }> = [
    { page: 5, label: '5' },
    { page: 10, label: '10' },
    { page: 15, label: '15' },
    { page: 25, label: '25' },
    { page: 50, label: '50' },
    { page: totalLength ? 100 : rows?.length, label: totalLength ? '100' : 'All' },
  ];

  React.useEffect(() => {
    if (headCells && rows) {
      const htmlTableSample = ReactDOMServer.renderToString(
        <HtmlTable headCells={headCells} rows={rows} uniqueKey={uniqueKey} title={tableTitle} />
      );
      setHtmlTable(htmlTableSample);
    }
  }, [rows, headCells]);

  React.useEffect(() => {
    if (isPrintClicked) {
      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write(htmlTable);
        printWindow.document.close();
        setTimeout(() => {
          printWindow.focus();
          printWindow.print();
        }, 500);
      }
    }
  }, [isPrintClicked]);

  const base64 = (s: any) => window.btoa(unescape(encodeURIComponent(s)));

  React.useEffect(() => {
    if (isExcelClicked) {
      const uri = 'data:application/vnd.ms-excel;base64,';
      // const htmlTable = ReactDOMServer.renderToString(
      //   <HtmlTable headCells={headCells} rows={rows} uniqueKey={uniqueKey} title={tableTitle} />
      // );
      const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${excelFileName}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body>
      ${htmlTable}
      </body></html>`;
      const a = window.document.createElement('a');
      a.href = uri + base64(template);
      a.download = `${excelFileName}.xls`;
      a.click();
    }
  }, [isExcelClicked]);

  const print = () => {
    // const htmlTable = ReactDOMServer.renderToString(
    //   <HtmlTable headCells={headCells} rows={rows} uniqueKey={uniqueKey} title={tableTitle} />
    // );
    // const printWindow = window.open('', '', 'width=800,height=600');
    // if (printWindow) {
    //   printWindow.document.write(htmlTable);
    //   printWindow.document.close();
    //   setTimeout(() => {
    //     printWindow.focus();
    //     printWindow.print();
    //   }, 500);
    // }
    setPrintClicked(true);
  };

  const exportToExcel = () => {
    // const uri = 'data:application/vnd.ms-excel;base64,';
    // const htmlTable = ReactDOMServer.renderToString(
    //   <HtmlTable headCells={headCells} rows={rows} uniqueKey={uniqueKey} title={tableTitle} />
    // );
    // const template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${excelFileName}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body>
    // ${htmlTable}
    // </body></html>`;
    // const a = window.document.createElement('a');
    // a.href = uri + base64(template);
    // a.download = `${excelFileName}.xls`;
    // a.click();
    setExcelClicked(true);
  };

  React.useEffect(() => {
    if (tableRef) tableRef.current = { print, exportToExcel };
  }, []);

  React.useEffect(() => {
    !totalLength && setPage(0);
    if (!pagination) setRowsPerPage(lengthOfData);
  }, [rows, pagination]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n[uniqueKey].toString());
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage - 1);
    setPageNumberClicked && setPageNumberClicked(newPage);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setRecordsToShow && setRecordsToShow(parseInt(event.target.value, 10));
    !totalLength && setPage(0);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - lengthOfData) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      {selected.length > 0 && (
        <EnhancedTableToolbar actions={actions} selected={selected} numSelected={selected.length} />
      )}
      <Paper
        elevation={2}
        sx={{ borderRadius: '.5rem', boxShadow: 'none', border: '1px solid #ECECEC' }}
      >
        <TableContainer sx={{ borderRadius: '.5rem' }}>
          <Table sx={{ minWidth: 750 }} size="small" stickyHeader>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
              serialNo={serialNo}
              expandIconAt={expandIconAt}
              selectable={selectable}
              onSelectAllClick={handleSelectAllClick}
              numSelected={selected.length}
              rowCount={lengthOfData}
              serialNoName={serialNoName}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {totalLength &&
                stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                  const isItemSelected: any = isSelected(row[uniqueKey]?.toString());
                  return expandable ? (
                    <Row
                      key={`${page * rowsPerPage + index + 1}`}
                      row={row}
                      headCells={headCells}
                      expand={expandable}
                      expandInCols={expandInCols}
                      expandIconAt={expandIconAt}
                      serialNo={serialNo ? page * rowsPerPage + index + 1 : undefined}
                      selectable={
                        selectable && (
                          <TableCell
                            className={styles.stickyLeft}
                            key={`checkbox-${index + 1}`}
                            padding="checkbox"
                            sx={{ p: '1rem', left: 0, textAlign: 'center' }}
                          >
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              onClick={(event) => handleClick(event, row[uniqueKey].toString())}
                            />
                          </TableCell>
                        )
                      }
                    />
                  ) : (
                    <TableRow key={`${page * rowsPerPage + index + 1}`}>
                      {selectable && (
                        <TableCell padding="checkbox" sx={{ p: '1rem' }}>
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onClick={(event) => handleClick(event, row[uniqueKey].toString())}
                          />
                        </TableCell>
                      )}
                      {serialNo && <TableCell>{page * rowsPerPage + index + 1}</TableCell>}
                      {headCells.map((headCell) => (
                        <TableCell
                          className={headCell.stickyClass ? styles[headCell.stickyClass] : ''}
                          sx={{
                            fontSize: '0.875rem',
                            left: headCell.stickyAt,
                            right: headCell.stickyAt,
                          }}
                          key={headCell.id}
                        >
                          {headCell.cell ? headCell.cell(row) : row[headCell.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              {!totalLength &&
                stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected: any = isSelected(row[uniqueKey]?.toString());
                    return expandable ? (
                      <Row
                        key={`${page * rowsPerPage + index + 1}`}
                        row={row}
                        headCells={headCells}
                        expand={expandable}
                        expandInCols={expandInCols}
                        expandIconAt={expandIconAt}
                        serialNo={serialNo ? page * rowsPerPage + index + 1 : undefined}
                        selectable={
                          selectable && (
                            <TableCell
                              className={styles.stickyLeft}
                              key={`checkbox-${index + 1}`}
                              padding="checkbox"
                              sx={{ p: '1rem', left: 0, textAlign: 'center' }}
                            >
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                onClick={(event) => handleClick(event, row[uniqueKey].toString())}
                              />
                            </TableCell>
                          )
                        }
                      />
                    ) : (
                      <TableRow key={`${page * rowsPerPage + index + 1}`}>
                        {selectable && (
                          <TableCell padding="checkbox" sx={{ p: '1rem' }}>
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              onClick={(event) => handleClick(event, row[uniqueKey].toString())}
                            />
                          </TableCell>
                        )}
                        {serialNo && <TableCell>{page * rowsPerPage + index + 1}</TableCell>}
                        {headCells.map((headCell) => (
                          <TableCell
                            className={headCell.stickyClass ? styles[headCell.stickyClass] : ''}
                            sx={{
                              fontSize: '0.875rem',
                              left: headCell.stickyAt,
                              right: headCell.stickyAt,
                            }}
                            key={headCell.id}
                          >
                            {headCell.cell ? headCell.cell(row) : row[headCell.id]}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                  sx={{
                    fontSize: '0.875rem',
                  }}
                >
                  <TableCell colSpan={headCells.length} />
                </TableRow>
              )}
              {!loading && lengthOfData <= 0 && (
                <TableRow
                  style={{
                    height: 53 * 5,
                  }}
                  sx={{
                    fontSize: '0.875rem',
                  }}
                >
                  <TableCell colSpan={headCells.length} sx={{ textAlign: 'center' }}>
                    No Data
                  </TableCell>
                </TableRow>
              )}
              {loading && rows.length <= 0 && (
                <TableRow
                  sx={{
                    fontSize: '0.875rem',
                    height: 53 * 3,
                  }}
                >
                  <TableCell
                    colSpan={headCells.length + (serialNo ? 1 : 0) + (expandable ? 1 : 0)}
                    sx={{ textAlign: 'center' }}
                  >
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}
              {!pagination && showTotal && (
                <TableRow
                  sx={{
                    backgroundColor: (theme) => theme.palette.grey[50],
                    alignItems: 'center',
                    borderRadius: '0 0 0.5rem 0.5rem',
                  }}
                >
                  <TableCell colSpan={totalColSpan} sx={{ pt: '1rem', pb: '1rem' }}>
                    <Typography variant="button2">Total</Typography>
                  </TableCell>
                  {React.Children.toArray(
                    headCells.map((headCell, i) => {
                      if (headCell.numeric) {
                        return (
                          <TableCell sx={{ fontWeight: 700 }}>
                            {getSum(rows, headCell.id)}
                          </TableCell>
                        );
                      }
                      if (i !== 0) return <TableCell />;
                      return false;
                    })
                  )}
                  {expandIconAt === 'end' && <TableCell />}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {pagination && (
          <Box
            sx={{
              display: 'flex',
              backgroundColor: (theme) => theme.palette.grey[50],
              alignItems: 'center',
              borderRadius: '0 0 0.5rem 0.5rem',
            }}
          >
            <Item sx={{ flexGrow: 1, pl: '1rem' }}>
              <Typography variant="body2">{lengthOfData} entries found</Typography>
            </Item>
            <Item>
              <Typography variant="body2">Rows per page</Typography>
            </Item>
            <Item>
              <FormControl sx={{ minWidth: 50 }} size="small">
                <Select
                  labelId="rows-per-page"
                  id="rows-per-page"
                  value={rowsPerPage.toString()}
                  onChange={handleChangeRowsPerPage}
                  size="small"
                  style={{ backgroundColor: '#FFFFFF' }}
                >
                  {rowsPerPageDropdown.map((val: { page: number; label: string }) => (
                    <MenuItem key={val.page} value={val.page}>
                      {val.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Item>
            <Item>
              <Pagination
                count={Math.ceil(lengthOfData / rowsPerPage)}
                onChange={handleChangePage}
                page={page + 1}
                color="primary"
                shape="circular"
                size="small"
                showFirstButton
                showLastButton
                siblingCount={0}
                boundaryCount={2}
              />
            </Item>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

PaginatedTable.defaultProps = {
  pagination: true,
  serialNo: false,
  selectable: false,
  expandIconAt: 'start',
  uniqueKey: 'id',
  actions: [],
  loading: false,
};
export default PaginatedTable;
