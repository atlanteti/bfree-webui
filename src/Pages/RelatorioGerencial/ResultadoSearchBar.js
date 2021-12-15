import moment from "moment";
import { Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { ValidationTextField } from "../../Componentes/FormFields";
import { DataSearchTitle, BtnBlue, SearchBarBorder } from "../../styles/CommonStyles";

export default function ResultadoSearchBar(props) {
   return <SearchBarBorder>
      <Form onSubmit={props.handleSubmit}>
         <Row>
            <Col xs={12} md={9} sm={7}>
               <DataSearchTitle>Pesquisar por período</DataSearchTitle>
               <Row>
                  <Col className="mt-2">
                     <DatePicker
                        placeholderText="dd/mm/aaaa"
                        dateFormat="dd/MM/yyyy"
                        selected={props.initialDate}
                        minDate={new Date(moment().startOf('month').subtract(12, 'month').calendar())}
                        onChange={(dateSelect) => props.onChange(dateSelect, "initialDate")}
                        customInput={
                           <ValidationTextField
                              label="Data Inicial"
                              type="text"
                              fullWidth
                           />
                        }
                     />
                  </Col>
                  <Col className="mt-2">
                     <DatePicker
                        placeholderText="dd/mm/aaaa"
                        dateFormat="dd/MM/yyyy"
                        selected={props.finalDate}
                        maxDate={new Date()}
                        onChange={(dateSelect) => props.onChange(dateSelect, "finalDate")}
                        customInput={
                           <ValidationTextField
                              label="Data Final"
                              type="text"
                              fullWidth
                           />
                        }
                     />
                  </Col>
               </Row>
            </Col>
            <Col className="mt-3" xs={12} md={2} sm={5}>
               <p style={{ color: 'transparent' }}>.</p>
               <Row>
                  <Col>
                     <BtnBlue type="submit" variant="dark">Buscar</BtnBlue>
                  </Col>
               </Row>
            </Col>
         </Row>
      </Form>
   </SearchBarBorder>
}