import { Box, Collapse, IconButton, TableCell, TableRow } from '@mui/material';
import * as React from 'react';
import { CollapsibleRowProps } from './table.d';
import styles from './style.module.scss';

function CollapsibleRow(props: CollapsibleRowProps) {
  const { row, serialNo, headCells, expand, expandIconAt, selectable, expandInCols } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {selectable}
        {serialNo && (
          <TableCell sx={{ p: '24px' }}>
            {expandIconAt === 'start' && expand !== undefined && (
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? (
                  <i className="ri-arrow-up-s-line" />
                ) : (
                  <i className="ri-arrow-down-s-line" />
                )}
              </IconButton>
            )}
            {serialNo}
          </TableCell>
        )}
        {headCells.map((headCell: any, index: number) => (
          <TableCell
            className={headCell.stickyClass ? styles[headCell.stickyClass] : ''}
            sx={{
              fontSize: '0.875rem',
              left: headCell.stickyAt,
              right: headCell.stickyAt,
            }}
            key={`${serialNo || 'expand_cell'}_${headCell.id}`}
          >
            {index === 0 && expandIconAt === 'start' && expand !== undefined && !serialNo && (
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? (
                  <i className="ri-arrow-up-s-line" />
                ) : (
                  <i className="ri-arrow-down-s-line" />
                )}
              </IconButton>
            )}
            {headCell.cell ? headCell.cell(row) : row[headCell.id]}
          </TableCell>
        ))}
        {expandIconAt === 'end' && expand !== undefined && (
          <TableCell className={styles.stickyRight} sx={{ right: 0 }}>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <i className="ri-arrow-up-s-line" /> : <i className="ri-arrow-down-s-line" />}
            </IconButton>
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            position: 'sticky',
            left: 0,
          }}
          colSpan={expandInCols}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>{expand && expand(row)}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default CollapsibleRow;
