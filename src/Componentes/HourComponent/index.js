import { MenuItem } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import { ValidationTextField } from "../FormFields";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"
import NoDataComp from "../NoDataComp";

export function SetHour(props) {
   return (
      <ValidationTextField
         id={props.id}
         select
         fullWidth
         defaultValue={props.defaultValue}
         onChange={props.onChange}
         name={props.name}
         label={props.label}
         InputLabelProps={{
            shrink: true,
            required: false
         }}
      >
         <MenuItem value={undefined}><NoDataComp /></MenuItem>
         <MenuItem value={"08:00:00"}>08:00</MenuItem>
         <MenuItem value={"09:00:00"}>09:00</MenuItem>
         <MenuItem value={"10:00:00"}>10:00</MenuItem>
         <MenuItem value={"11:00:00"}>11:00</MenuItem>
         <MenuItem value={"12:00:00"}>12:00</MenuItem>
         <MenuItem value={"13:00:00"}>13:00</MenuItem>
         <MenuItem value={"14:00:00"}>14:00</MenuItem>
         <MenuItem value={"15:00:00"}>15:00</MenuItem>
         <MenuItem value={"16:00:00"}>16:00</MenuItem>
         <MenuItem value={"17:00:00"}>17:00</MenuItem>
         <MenuItem value={"18:00:00"}>18:00</MenuItem>
         <MenuItem value={"19:00:00"}>19:00</MenuItem>
         <MenuItem value={"20:00:00"}>20:00</MenuItem>
      </ValidationTextField>
   )
}

export const HourComponent = (props) => {
   return props.data?.map((currentDiv, index) => {
      return <Col className="expense-block" key={currentDiv} id={`expense-block-${index}`} data-block={index}>
         <Row style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
            <Col xs={12} sm={1} lg={1}>
               <p style={{ marginRight: 0 }}>{props.dayOfWeek}</p>
            </Col>
            <Col xs={12} sm={4} lg={2}>
               <SetHour
                  label="Inicial"
                  name="cal_start"
                  onChange={(event) => props.onChange(event, props.indexWeek, currentDiv)}
                  defaultValue={props.data[index].cal_start}
                  startHour={props.data[index].cal_start}
               />
            </Col>
            <p>-</p>
            <Col xs={12} sm={4} lg={2}>
               <SetHour
                  label="Final"
                  name="cal_end"
                  onChange={(event) => props.onChange(event, props.indexWeek, currentDiv)}
                  defaultValue={props.data[index].cal_end}
                  endHour={props.data[index].cal_end}

               />
            </Col>
            <Col xs={12} sm={1} lg={1} style={{ cursor: 'pointer' }}>
               <Row>
                  <IoAddCircleOutline size={25} color="rgba(0,0,0,0.5)" onClick={props.onDuplicate} />
                  {props.data.length > 1 && <IoRemoveCircleOutline size={25} color="rgba(0,0,0,0.5)" onClick={() => props.removeDuplicate(props.data, currentDiv, props.changeState)} />}
               </Row>
            </Col>
         </Row>
      </Col>
   })
}