import * as React from 'react';
import { alpha } from '@mui/material/styles';
import { Toolbar, Typography } from '@mui/material';
import { EnhancedTableToolbarProps } from './table.d';

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, actions, selected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        mb: '1rem',
        borderRadius: '2px',
        bgcolor: (theme) => alpha(
          theme.palette.primary.main60,
          theme.palette.action.activatedOpacity,
        ),
      }}
    >
      <Typography
        sx={{
          flex: '1 1 100%',
          color: (theme) => theme.palette.primary.main80,
        }}
        variant="body1"
        component="div"
        fontWeight={700}
      >
        {numSelected}
        {' '}
        Selected
      </Typography>
      {actions.map((val) => val(selected))}
    </Toolbar>
  );
};

EnhancedTableToolbar.defaultProps = {
  actions: [],
};

export default EnhancedTableToolbar;
