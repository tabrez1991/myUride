"use client"

import { Box } from '@mui/material'
import React from 'react'
import { ResponsivePieCanvas } from '@nivo/pie'

const data = [
    {
        "id": "java",
        "label": "java",
        "value": 510,
        "color": "hsl(231, 62%, 34%, 1)"
    },
    {
        "id": "rust",
        "label": "rust",
        "value": 94,
        "color": "hsl(34, 70%, 50%)"
    },
];

const LineGraph = () => {

    return (
        <Box sx={{ height: 200, background: "#fff" }}>
            <ResponsivePieCanvas
                data={data}
                enableArcLinkLabels = {false}
                enableArcLabels={false}
                margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
                innerRadius={0.8}
                // padAngle={0.7}
                // cornerRadius={3}
                // activeOuterRadiusOffset={8}
                colors={{ scheme: 'paired' }}
                // borderColor={{
                //     from: 'color',
                //     modifiers: [
                //         [
                //             'darker',
                //             0.6
                //         ]
                //     ]
                // }}
                arcLinkLabelsSkipAngle={45}
                // arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={0}
                // arcLinkLabelsColor={{ from: 'color' }}
                // arcLabelsSkipAngle={10}
                // arcLabelsTextColor="#333333"
                // defs={[
                //     {
                //         id: 'dots',
                //         type: 'patternDots',
                //         background: 'inherit',
                //         color: 'rgba(255, 255, 255, 0.3)',
                //         size: 4,
                //         padding: 1,
                //         stagger: true
                //     },
                //     {
                //         id: 'lines',
                //         type: 'patternLines',
                //         background: 'inherit',
                //         color: 'rgba(255, 255, 255, 0.3)',
                //         rotation: -45,
                //         lineWidth: 6,
                //         spacing: 10
                //     }
                // ]}
                // fill={[
                //     {
                //         match: {
                //             id: 'ruby'
                //         },
                //         id: 'dots'
                //     },
                //     {
                //         match: {
                //             id: 'c'
                //         },
                //         id: 'dots'
                //     },
                //     {
                //         match: {
                //             id: 'go'
                //         },
                //         id: 'dots'
                //     },
                //     {
                //         match: {
                //             id: 'python'
                //         },
                //         id: 'dots'
                //     },
                //     {
                //         match: {
                //             id: 'scala'
                //         },
                //         id: 'lines'
                //     },
                //     {
                //         match: {
                //             id: 'lisp'
                //         },
                //         id: 'lines'
                //     },
                //     {
                //         match: {
                //             id: 'elixir'
                //         },
                //         id: 'lines'
                //     },
                //     {
                //         match: {
                //             id: 'javascript'
                //         },
                //         id: 'lines'
                //     }
                // ]}
                // legends={[
                //     {
                //         anchor: 'right',
                //         direction: 'column',
                //         justify: false,
                //         translateX: 140,
                //         translateY: 0,
                //         itemsSpacing: 2,
                //         itemWidth: 60,
                //         itemHeight: 14,
                //         itemTextColor: '#999',
                //         itemDirection: 'left-to-right',
                //         itemOpacity: 1,
                //         symbolSize: 14,
                //         symbolShape: 'circle'
                //     }
                // ]}
            />
        </Box>
    )
}

export default LineGraph