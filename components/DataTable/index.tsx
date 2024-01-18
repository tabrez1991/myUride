"use client"

import React from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box } from '@mui/material';

interface DataTableProps {
	columns: GridColDef[];
	rows: {
		driverId: string;
		driver: string;
		mobileNumber: string;
		ratings: number;
		totalTrips: number;
		totalEarnings: string;
	}[];
	page: number;
	pageSize: number;
	checkboxEnables?: boolean;
	loader: boolean;
}

const DataTable = (props: DataTableProps) => {
	const { columns, rows, page, pageSize, loader, checkboxEnables } = props;

	const [api, setApi] = React.useState();

	return (
		<Box sx={{ width: "100%", background: "#fff" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page, pageSize },
					},
				}}
				// onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
				pageSizeOptions={[5, 10, 20]}
				checkboxSelection={checkboxEnables}
				loading={loader}
				style={loader ? { height: "80vh" } : { height: "100%" }}
			/>
		</Box>
	)
}

export default DataTable