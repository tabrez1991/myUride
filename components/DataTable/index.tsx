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
	paginationHandleChange?: any
	count?: number
}

const DataTable = (props: DataTableProps) => {
	const { columns, rows, count, page, pageSize, loader, checkboxEnables, paginationHandleChange } = props;

	console.log("DataTable", page, pageSize,)

	return (
		<Box sx={{ width: "100%", background: "#fff" }}>
			<DataGrid
				disableRowSelectionOnClick={true}
				onPaginationModelChange={paginationHandleChange}
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page, pageSize },
					},
				}}
				hideFooterPagination={true}
				paginationMode='server'
				pageSizeOptions={[]}
				checkboxSelection={checkboxEnables}
				loading={loader}
				style={loader ? { height: "80vh" } : { height: "100%" }}
			/>
		</Box>
	)
}

export default DataTable