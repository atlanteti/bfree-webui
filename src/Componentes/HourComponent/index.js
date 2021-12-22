import { MenuItem } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import { ValidationTextField } from "../FormFields";

export function HourComponent(props) {
   function handleChange(e) {
      console.log(e)
   }
   return (
      <ValidationTextField
         select
         fullWidth
         onChange={handleChange}
         name={props.name}
         label={props.label}
         InputLabelProps={{
            shrink: true,
            required: false
         }}
      >
         <MenuItem value={"08:00"}>08:00</MenuItem>
         <MenuItem value={"09:00"}>09:00</MenuItem>
         <MenuItem value={"10:00"}>10:00</MenuItem>
         <MenuItem value={"11:00"}>11:00</MenuItem>
         <MenuItem value={"12:00"}>12:00</MenuItem>
         <MenuItem value={"13:00"}>13:00</MenuItem>
         <MenuItem value={"14:00"}>14:00</MenuItem>
         <MenuItem value={"15:00"}>15:00</MenuItem>
         <MenuItem value={"16:00"}>16:00</MenuItem>
         <MenuItem value={"17:00"}>17:00</MenuItem>
         <MenuItem value={"18:00"}>18:00</MenuItem>
      </ValidationTextField>
   )
}

export function SetHour(props) {
   return <Row style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
      <p>{props.dayOfWeek}</p>
      <Col xs={12} sm={4} lg={2}>
         <HourComponent
            label="Inicial"
            name={props.initialId}
         />
      </Col>
      <p>:</p>
      <Col xs={12} sm={4} lg={2}>
         <HourComponent
            label="Final"
            name={props.finalId}
         />
      </Col>
   </Row>
}