"use client"

import ActionsMenu from '@/components/ActionMenu';
import DataTable from '@/components/DataTable';
import SearchBox from '@/components/SearchBox';
import { formatDate } from '@/lib/formatDate';
import { tempPaymentRider } from '@/lib/tempData';
import { Avatar, Box, Button, Divider, Link, Modal, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #eee',
    boxShadow: 24,
    p: 6,
};


const PaymentsDriver = () => {
    const [searchValue, setSearchValue] = React.useState<string>('');
    const [page, setPage] = React.useState<number>(0);
    const [pageSize, setPageSize] = React.useState<number>(10)
    const [rows, setRows] = React.useState<any[]>([])
    const [loader, setLoader] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState(false);
    const [selectedDetails, setSelectedDetails] = React.useState<any>();

    const handleViewTransaction = (id: string) => {
        setSelectedDetails(rows.find(item => item.id === id));
        setOpen(true)
    }

    const handleClose = () => setOpen(false);

    const options = [
        {
            label: "View Transaction",
            handler: handleViewTransaction
        }
    ]

    const columns: GridColDef[] = [
        { field: 'sNo', headerName: 'S.No', width: 20 },
        { field: 'transactionId', headerName: 'Transaction Id', flex: 1 },
        { field: 'paymentDate', headerName: 'Date', flex: 1 },
        {
            field: 'rider', headerName: 'Driver', flex: 1.5,
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar alt="John" src={params.row.avatar} id="avatar" sx={{ mr: 2 }} />
                    {params.row.rider}
                </div>
            ),
        },
        { field: 'amount', headerName: 'Amount', flex: 1 },
        { field: 'paymentType', headerName: 'Payment Type', flex: 1 },
        {
            field: 'invoice', headerName: '', flex: 1,
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link href="https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf" target="_blank" sx={{ textDecoration: "none", color: "#000" }}>Invoice</Link>
                </div>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            renderCell: (params) => (
                <ActionsMenu id={params.row.id} options={options} />
            ),
        },
    ];

    const handleSearch = (value: string) => {
        setSearchValue(value);
    }

    const getRiderPaymentsDetails = async () => {
        setLoader(true)
        try {
            setTimeout(() => {
                setRows(tempPaymentRider)
                setLoader(false);
            }, 1000);
        } catch (error) {
            console.error(error);
            setLoader(false);
        }

    }

    React.useEffect(() => {
        getRiderPaymentsDetails()
    }, []);

    return (
        <Box sx={{ height: "100vh", overflowY: "scroll" }}>
            <Typography variant='h5'>Payments</Typography>
            <Box sx={{ mt: 2 }}>
                <SearchBox placeholder='Search...' value={searchValue} onChange={handleSearch} autoFocus={true} />
            </Box>
            <Box sx={{ mt: 2 }}></Box>
            <DataTable columns={columns} rows={rows} page={page} pageSize={pageSize} loader={loader} checkboxEnables={false} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box>
                            <Avatar alt="John" src={selectedDetails?.avatar} id="avatar" sx={{ mr: 2 }} />
                        </Box>
                        <Box>
                            <Typography>{selectedDetails && formatDate(selectedDetails?.paymentDate)}</Typography>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography>You have rated by {selectedDetails?.driver}</Typography>
                                <div style={{ display: 'flex', alignItems: 'center', marginLeft: "10px" }}>
                                    {Array.from({ length: selectedDetails?.rating }, (_, index) => (
                                        <Typography key={index} sx={{ color: '#ffd700', fontSize: '15px' }}>
                                            <i className="ri-star-fill" />
                                        </Typography>
                                    ))}
                                </div>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ mt: 4, display: "flex" }}>
                        <Box>
                            <Typography sx={{ color: "#21328d", fontWeight: 600 }}><i className="ri-radio-button-line" /></Typography>
                            <Typography sx={{ transform: "rotate(90deg)", marginLeft: "-11px", marginTop: "5px", color: "#21328d" }}>- - - - -</Typography>
                            <Typography sx={{ mt: 1, color: "#21328d", fontWeight: 600 }}><i className="ri-map-pin-fill" /></Typography>
                        </Box>
                        <Box sx={{ ml: 2 }}>
                            <Typography sx={{ mb: 2, fontSize: "1.125rem" }}>{selectedDetails?.source}</Typography>
                            <Divider />
                            <Typography sx={{ mt: 2, fontSize: "1.125rem" }}>{selectedDetails?.destination}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ mt: 5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography sx={{ fontSize: "2rem" }}>Total</Typography>
                        <Typography sx={{ fontSize: "2rem" }}>{selectedDetails?.amount}</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ mt: 3, mb: 3 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography>Driver trip fare</Typography>
                            <Typography>{selectedDetails?.fare}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography>Subtotal</Typography>
                            <Typography>₹{Number(selectedDetails?.amount.split('₹')[1]) - (Number(selectedDetails?.fare.split('₹')[1]) + Number(selectedDetails?.conenience.split('₹')[1]) + 20)}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography>Transaction convenience fee</Typography>
                            <Typography>{selectedDetails?.conenience}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography>myUride fee</Typography>
                            <Typography>₹20</Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ mt: 5, mb: 2, textAlign: "center" }}>
                        <Button variant='contained' sx={{ paddingLeft: "3rem", background: "#21328d", paddingRight: "3rem", borderRadius: "20px" }} onClick={handleClose}>Done</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default PaymentsDriver