import { Box, Card, Chip, Divider, Tooltip, Typography } from '@mui/material'
import React from 'react'

interface TripDetailsProps {
    data: any
}

const chipNotAssigned = {
    color: "#21328d",
    background: "#b1bbec",
    borderRadius: "8px",
    padding: "10px"
}

const chipAssigned = {
    color: "#218d2b",
    background: "#b2ecb1",
    borderRadius: "8px",
    padding: "10px"
}
const TripDetails = (props: TripDetailsProps) => {
    const { data } = props;
    return (
        <Card sx={{ width: "400px", margin: "10px", padding: "20px", borderRadius: "20px", border: "1px solid #989393", boxShadow: "none" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Tooltip title={data.tripId}>
                        <Typography sx={{ fontWeight: 500, fontSize: "1.25rem", width: "100px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{data.tripId}</Typography>
                    </Tooltip>
                    <Typography sx={{ color: "#989393" }}>{data.country}</Typography>
                </Box>
                <Box>
                    <Chip icon={
                        <Typography
                            sx={data.status === "1" ?
                                { color: "#218d2b !important" } :
                                { color: "#21328d !important" }}
                        >
                            <i className="ri-checkbox-blank-circle-fill" />
                        </Typography>}
                        label={`${data.seatsLeft} Seats left`}
                        sx={data.status === "1" ? chipAssigned : chipNotAssigned} />
                </Box>
            </Box>
            <Box sx={{ mt: 4, display: "flex" }}>
                <Box>
                    <Typography sx={{ color: "#21328d", fontWeight: 600 }}><i className="ri-radio-button-line" /></Typography>
                    <Typography sx={{ transform: "rotate(90deg)", marginLeft: "-11px", marginTop: "5px", color: "#21328d" }}>- - - - -</Typography>
                    <Typography sx={{ mt: 1, color: "#21328d", fontWeight: 600 }}><i className="ri-map-pin-fill" /></Typography>
                </Box>
                <Box sx={{ ml: 2 }}>
                    <Typography sx={{ mb: 2, fontSize: "1.125rem" }}>{data.source}</Typography>
                    <Divider />
                    <Typography sx={{ mt: 2, fontSize: "1.125rem" }}>{data.destination}</Typography>
                </Box>
            </Box>
        </Card>
    )
}

export default TripDetails