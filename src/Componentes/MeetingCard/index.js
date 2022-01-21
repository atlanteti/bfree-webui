import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function BasicCard(props) {
   return (
      <Card sx={{ minWidth: 275 }}>
         <CardContent>
            <Typography color="text.secondary">Data:</Typography>
            {props.meetingData.date}
            <Typography color="text.secondary">Cliente: </Typography>
            {props.meetingData.client}
            <Typography color="text.secondary">Consultor: </Typography>
            {props.meetingData.consultant}
            <Typography color="text.secondary">Horario: </Typography>
            {props.meetingData.start} a {props.meetingData.end}
         </CardContent>
      </Card>
   )
}