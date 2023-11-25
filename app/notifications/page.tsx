"use client"

import { formatDate } from '@/lib/formatDate';
import { tempNotifications } from '@/lib/tempData';
import { Avatar, Box, Card, CircularProgress, Divider, Typography } from '@mui/material'
import React from 'react'

const Notification = () => {
    const [page, setPage] = React.useState<number>(0);
    const [pageSize, setPageSize] = React.useState<number>(10)
    const [rows, setRows] = React.useState<any[]>([])
    const [loader, setLoader] = React.useState<boolean>(false);

    const getNotificationsDetails = async () => {
        setLoader(true)
        try {
            setTimeout(() => {
                const groupedByDate: any = tempNotifications.reduce((result: any, item) => {
                    const date = item.date;
                    result[date] = result[date] || [];
                    result[date].push(item);
                    return result;
                }, {});
                const groupedArray: any[] = Object.entries(groupedByDate).map(([date, items]) => ({ date, items }));
                const sortedArray = groupedArray.sort((a, b) => new Date(b.date.split("/").reverse().join("-")).getTime() - new Date(a.date.split("/").reverse().join("-")).getTime());
                setRows(sortedArray)
                setLoader(false);
            }, 1000);
        } catch (error) {
            console.error(error);
            setLoader(false);
        }

    }

    React.useEffect(() => {
        getNotificationsDetails()
    }, [page, pageSize]);

    return (
        <Box sx={{ height: "100vh", overflowY: "scroll" }}>
            <Typography variant='h5'>Notifications</Typography>
            <Box sx={{ mt: 2 }}></Box>
            {loader ? <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </Box> : <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(600px, 1fr))", gap: "20px" }}>{rows.map((item, i) => (
                <Box key={item.date}>
                    <Typography variant='h6' sx={{ padding: "0px 30px", fontWeight: 500 }}>{i === 0 ? "Today" : item.date}</Typography>
                    <Card sx={{ width: "600px", margin: "5px 10px", padding: "0px 20px 0px 20px", borderRadius: "20px", border: "1px solid #989393", boxShadow: "none" }}>
                        {item.items.map((element: any) => <Box key={element.id}>
                            <Box sx={{ display: "flex", mt: 2, mb: 2 }}>
                                <Box>
                                    <Avatar alt="John" src={element.avatar} id="avatar" sx={{ mr: 2 }} />
                                </Box>
                                <Box sx={{ width: "100%" }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                        <Typography sx={{ color: "#989393", fontSize: "0.825rem" }}>{element.driver}</Typography>
                                        <Typography sx={{ color: "#989393", fontSize: "0.825rem" }}>{formatDate(element.date)}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: "0.825rem" }}>
                                            {element.content}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Divider />
                        </Box>)}
                    </Card>
                </Box>
            ))}</Box>
            }
        </Box >
    )
}

export default Notification