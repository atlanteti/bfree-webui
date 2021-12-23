import { MenuItem } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import { ValidationTextField } from "../FormFields";
import { IoAddCircleOutline } from "react-icons/io5"

export function SetHour(props) {
   return (
      <ValidationTextField
         id={props.id}
         select
         fullWidth
         onChange={props.onChange}
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

export function HourComponent(props) {
   return <Row style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
      <Col xs={12} sm={1} lg={1}>
         <p style={{ marginRight: 0 }}>{props.dayOfWeek}</p>
      </Col>
      <Col xs={12} sm={4} lg={2}>
         <SetHour
            label="Inicial"
            name={props.initialId}
            onChange={props.onChange}
         />
      </Col>
      <p>-</p>
      <Col xs={12} sm={4} lg={2}>
         <SetHour
            label="Final"
            name={props.finalId}
            onChange={props.onChange}
         />
      </Col>
      <Col xs={12} sm={1} lg={1} style={{ cursor: 'pointer' }} onClick={props.onDuplicate}>
         <IoAddCircleOutline size={25} color="rgba(0,0,0,0.5)" />
      </Col>
   </Row>
}