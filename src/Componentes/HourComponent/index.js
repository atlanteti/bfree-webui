import { MenuItem } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import { ValidationTextField } from "../FormFields";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"
import NoDataComp from "../NoDataComp";
import { SubTitle } from "../../styles/CommonStyles";

export function SetHour(props) {
   function* range(start, end, step) {
      while (start < end) {
         yield start;
         start += step;
      }
   }
   let arrayOfHours = Array.from(range(8, 22, 1));
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
         {arrayOfHours.map((hour, index) => {
            return <MenuItem key={index} value={`${String(hour).padStart(2, '0')}:00:00`}>{`${String(hour).padStart(2, '0')}:00`}</MenuItem>
         })}
      </ValidationTextField>
   )
}

export const HourComponent = (props) => {
   return props.data?.map((currentDiv, index) => {
      return <Col className="expense-block" key={currentDiv} id={`expense-block-${index}`} data-block={index}>
         <Row style={{
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 10,
            background: props.bgColor
         }}>
            <Col xs={12} sm={1} lg={1}>
               <SubTitle style={{ paddingLeft: 20 }}>{props.dayOfWeek}</SubTitle>
            </Col>
            <Col xs={12} sm={4} lg={2} md={{ offset: 2 }}>
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
                  <IoAddCircleOutline size={30} color="rgba(0,0,0,0.5)" onClick={props.onDuplicate} />
                  {props.data.length > 1 && <IoRemoveCircleOutline size={30} color="rgba(0,0,0,0.5)" onClick={() => props.removeDuplicate(props.data, currentDiv, props.changeState)} />}
               </Row>
            </Col>
         </Row>
      </Col>
   })
}