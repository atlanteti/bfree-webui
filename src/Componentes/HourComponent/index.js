import { MenuItem } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import { ValidationTextField } from "../FormFields";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"
import NoDataComp from "../NoDataComp";
import { SubTitle, CenterAlignDivToMobile } from "../../styles/CommonStyles";
import moment from "moment";

export function SetHour(props) {
   function* range(start, end, step) {
      while (start < end) {
         yield start;
         start += step;
      }
   }
   let arrayOfHours = Array.from(range(8, 23, 1));
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
            <Col xs={12} sm={2} lg={3} md={2}>
               <SubTitle className="mb-2">{props.dayOfWeek}</SubTitle>
            </Col>
            <Col xs={12} sm={4} lg={2}>
               <SetHour
                  label="Inicial"
                  name="cam_start"
                  onChange={(event) => props.onChange(event, props.indexWeek, currentDiv)}
                  defaultValue={props.data[index].cam_start}
               />
            </Col>
            <CenterAlignDivToMobile>
               -
            </CenterAlignDivToMobile>
            <Col xs={12} sm={4} lg={2}>
               <SetHour
                  label="Final"
                  name="cam_end"
                  onChange={(event) => props.onChange(event, props.indexWeek, currentDiv)}
                  defaultValue={props.data[index].cam_end}
               />
            </Col>
            <Col>
               <Row>
                  <CenterAlignDivToMobile style={{ cursor: 'pointer' }}>
                     <IoAddCircleOutline size={30} color="rgba(0,0,0,0.5)" onClick={props.onDuplicate} />
                  </CenterAlignDivToMobile>
                  <CenterAlignDivToMobile style={{ cursor: 'pointer' }}>
                     {props.data.length > 1 && <IoRemoveCircleOutline size={30} color="rgba(0,0,0,0.5)" onClick={() => props.removeDuplicate(props.data, currentDiv, props.changeState)} />}
                  </CenterAlignDivToMobile>
               </Row>
            </Col>
         </Row >
      </Col >
   })
}

export const HourCalendarComponent = (props) => {
   var filteredDays = props?.data.filter(function (value) {
      return moment(value.cal_date).format('yyyy-MM-DD') === moment(props.date).format('yyyy-MM-DD') || value.cal_start === null;
   });
   let renderDays = []
   if (filteredDays.length !== 0) {
      renderDays = filteredDays
   } else {
      renderDays = ["div1"]
   }
   return renderDays?.map((currentDiv, index) =>
      <Col className="expense-block" key={currentDiv} id={`expense-block-${index}`} data-block={index}>
         <Row style={{
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 10,
            background: props.bgColor
         }}>
            <Col xs={12} sm={1} md={2}>
               <SubTitle className="mb-2">{props.dayOfMonth && props.dayOfMonth} {props.dayOfWeek}</SubTitle>
            </Col>
            <Col xs={12} sm={12} md={4}>
               <SetHour
                  label="Inicial"
                  name="cal_start"
                  onChange={(event) => props.onChange(event, currentDiv, props.dayOfMonth, props.date)}
                  defaultValue={currentDiv.cal_start}
               />
            </Col>
            <CenterAlignDivToMobile>
               -
            </CenterAlignDivToMobile>
            <Col xs={12} sm={12} md={4}>
               <SetHour
                  label="Final"
                  name="cal_end"
                  onChange={(event) => props.onChange(event, currentDiv, props.dayOfMonth, props.date)}
                  defaultValue={currentDiv.cal_end}
               />
            </Col>
            <Col xs={12} sm={1} lg={1} style={{ cursor: 'pointer' }}>
               <Row>
                  <CenterAlignDivToMobile>
                     <IoAddCircleOutline size={30} color="rgba(0,0,0,0.5)" onClick={props.onDuplicate} />
                  </CenterAlignDivToMobile>
                  <CenterAlignDivToMobile>
                     <IoRemoveCircleOutline size={30} color="rgba(0,0,0,0.5)" onClick={() => props.removeDuplicate(currentDiv)} />
                  </CenterAlignDivToMobile>
               </Row>
            </Col>
         </Row>
      </Col>
   )
}