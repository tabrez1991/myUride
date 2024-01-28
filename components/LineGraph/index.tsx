"use client"

import { Box } from '@mui/material'
import React from 'react'
import { ResponsiveLine } from '@nivo/line'

const LineGraph = (props: any) => {
	const { data } = props

	const tooltipFormatter = (value: any, { point }: any) => {
		console.log("point", value)
    return (
      <div>
        <strong>Month:</strong> {value?.point?.data?.xFormatted}<br />
        <strong>Users:</strong> {value?.point?.data?.yFormatted}
      </div>
    );
  };

	return (
		<Box sx={{ height: 600, background: "#fff" }}>
			<ResponsiveLine
				data={data}
				margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
				xScale={{
					type: "point"
				}}
				tooltip={tooltipFormatter}
				yScale={{
					type: 'linear',
					min: 'auto',
					max: 'auto',
					stacked: true,
					reverse: false
				}}
				yFormat=" >-.2f"
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'transportation',
					legendOffset: 36,
					legendPosition: 'middle'
				}}
				axisLeft={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'count',
					legendOffset: -40,
					legendPosition: 'middle'
				}}
				pointSize={10}
				pointColor={{ theme: 'background' }}
				pointBorderWidth={2}
				pointBorderColor={{ from: 'serieColor' }}
				pointLabelYOffset={-12}
				useMesh={true}
				legends={[
					{
						anchor: 'bottom-right',
						direction: 'column',
						justify: false,
						translateX: 100,
						translateY: 0,
						itemsSpacing: 0,
						itemDirection: 'left-to-right',
						itemWidth: 80,
						itemHeight: 20,
						itemOpacity: 0.75,
						symbolSize: 12,
						symbolShape: 'circle',
						symbolBorderColor: 'rgba(0, 0, 0, .5)',
						effects: [
							{
								on: 'hover',
								style: {
									itemBackground: 'rgba(0, 0, 0, .03)',
									itemOpacity: 1
								}
							}
						]
					}
				]}
			/>
		</Box>
	)
}

export default LineGraph