import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import * as React from 'react';
import { EnhancedTableHeadProps } from './table.d';
import styles from './style.module.scss';
function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const {
    order,
    orderBy,
    onRequestSort,
    headCells,
    serialNo,
    expandIconAt,
    selectable,
    numSelected,
    rowCount,
    onSelectAllClick,
    serialNoName,
  } = props;
  const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: (theme) => theme.palette.grey[100] }}>
        {selectable && (
          <TableCell
            className={styles.stickyLeft}
            sx={{
              backgroundColor: (theme) => theme.palette.grey[100],
              color: (theme) => theme.palette.text.primary,
              fontWeight: 700,
              fontSize: '0.875rem',
              left: 0,
              width: '3rem',
            }}
          >
            <Checkbox
              sx={{
                color: '#666666',
                '&.Mui-checked': {
                  color: '#14845C',
                },
              }}
              indeterminate={
                !!numSelected && !!rowCount && numSelected > 0 && numSelected < rowCount
              }
              checked={!!rowCount && rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
        )}
        {serialNo && (
          <TableCell
            sx={{
              backgroundColor: (theme) => theme.palette.grey[100],
              color: (theme) => theme.palette.text.primary,
              fontWeight: 700,
              fontSize: '0.875rem',
              minWidth: 70,
            }}
            align="justify"
            key="sno"
          >
            {serialNoName ? serialNoName : 'S. No'}
          </TableCell>
        )}
        {headCells.map((headCell) =>
          headCell.sortable ? (
            <TableCell
              className={headCell.stickyClass ? styles[headCell.stickyClass] : ''}
              sx={{
                backgroundColor: (theme) => theme.palette.grey[100],
                color: (theme) => theme.palette.text.primary,
                fontWeight: 700,
                fontSize: '0.875rem',
                left: headCell.stickyAt,
                right: headCell.stickyAt,
                minWidth: () => `${headCell.minWidth}px`,
                p: '6px 16px',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  height: '70%',
                  borderLeft: '1px solid #D9D9D9',
                  top: '15%',
                  left: '6px',
                },
              }}
              key={headCell.id}
              align="left"
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? <Box component="span" /> : null}
              </TableSortLabel>
            </TableCell>
          ) : (
            <TableCell
              className={headCell.stickyClass ? styles[headCell.stickyClass] : ''}
              sx={{
                backgroundColor: (theme) => theme.palette.grey[100],
                color: (theme) => theme.palette.text.primary,
                fontWeight: 700,
                fontSize: '0.875rem',
                left: headCell.stickyAt,
                right: headCell.stickyAt,
                minWidth: () => `${headCell.minWidth}px`,
                p: '6px 16px',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  height: '70%',
                  borderLeft: '1px solid #D9D9D9',
                  top: '15%',
                  left: '6px',
                },
              }}
              key={headCell.id}
            >
              {headCell.label}
            </TableCell>
          )
        )}
        {expandIconAt === 'end' && (
          <TableCell
            key="expandIcon"
            sx={{
              position: 'sticky',
              right: 0,
              backgroundColor: (theme) => theme.palette.grey[100],
              color: (theme) => theme.palette.text.primary,
              fontWeight: 700,
              fontSize: '0.875rem',
              '&:before': {
                content: '""',
                position: 'absolute',
                height: '70%',
                borderLeft: '1px solid #D9D9D9',
                top: '15%',
                left: '6px',
              },
            }}
          />
        )}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
