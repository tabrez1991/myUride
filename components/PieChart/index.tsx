"use client"

import { Box, Typography } from '@mui/material'
import React from 'react'
import { ResponsivePieCanvas } from '@nivo/pie'

// const data = [
//     {
//         "id": "totalUser",
//         "label": "Total Users",
//         "value": 99,
//         "color": "hsl(231, 62%, 34%, 1)"
//     },
//     {
//         "id": "currentMonth",
//         "label": "Current Month",
//         "value": 33,
//         "color": "hsl(34, 70%, 50%)"
//     },
// ]

const LineGraph = (props: any) => {
    const { data } = props
    console.log("Dagagaga",data)
    return (
        <Box sx={{ height: 200, background: "#fff", position: "relative" }}>
            <ResponsivePieCanvas
                data={data}
                enableArcLinkLabels={false}
                enableArcLabels={false}
                margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
                innerRadius={0.8}
                borderWidth={1}
                colors={{ scheme: 'paired' }}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.6
                        ]
                    ]
                }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            2
                        ]
                    ]
                }}
            />
            <Box sx={{ border: "1px solid #000", display: "inline-block", borderRadius: "50%", p: 2, textAlign: "center", background: "hsl(231, 62%, 34%, 1)", color: "#fff", position: "absolute", top: 59, left: 126 }}>
                <Typography>{Math.round((data[1]?.value / data[0]?.value) * 100)}%</Typography>
                <Typography>growth</Typography>
            </Box>
            <Typography sx={{ position: "absolute", top: 170, left: 146 }}>{data[0]?.label}</Typography>
        </Box >
    )
}

export default LineGraph