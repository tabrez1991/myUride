import { Menu, MenuItem, Typography } from '@mui/material';
import React from 'react'

interface ActionMenuProps {
	id: string;
	options: any
	close?: any
}
const ActionsMenu = (props: ActionMenuProps) => {
	const { id, options, close } = props;

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	React.useEffect(() => {
		handleClose()
	}, [close])

	return (
		<div>
			<Typography onClick={handleClick} sx={{ cursor: "pointer" }}>
				<i className="ri-more-2-fill" />
			</Typography>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{options.map((item: any) => (
					<MenuItem onClick={() => item.handler(id)}>{item.label}</MenuItem>
				))}
			</Menu>
		</div>
	);
};

export default ActionsMenu