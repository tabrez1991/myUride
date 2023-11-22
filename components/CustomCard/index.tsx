"use client"

import { Box, Card, Typography } from '@mui/material'
import React, { ReactNode } from 'react'

interface CustomCardProps {
	icon: ReactNode;
	label: string;
	value: number;
}
const CustomCard = (props: CustomCardProps) => {
	const { icon, label, value } = props;
	return (
		<Card sx={{ padding: "20px" }}>
			<Typography sx={{ color: "#21328d", fontSize: "1.25rem", width: "fit-content", padding: "6px 10px", border: "1px solid #c8d1fe", background: "#c8d1fe", borderRadius: "6px" }}>{icon}</Typography>
			<Typography sx={{ color: "#a4a2a2", fontWeight: 600, fontSize: "1rem", mt: 1.5 }}>{label}</Typography>
			<Typography sx={{ fontSize: "2rem", fontWeight: 600, mt: 1 }}>{value}</Typography>
		</Card>
	)
}

export default CustomCard