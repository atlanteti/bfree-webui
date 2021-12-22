import { MainContainer, MainRow, BackGroundForm } from "../../styles/CommonStyles";
import { CustomMenu } from "../../Componentes/CustomMenu";
import { Form, Col, Row } from "react-bootstrap";
import { HourComponent, SetHour } from "../../Componentes/HourComponent";
import { Title, SubTitle } from "./styles.js"
export function Horario() {
   return (
      <MainContainer>
         <MainRow>
            <CustomMenu />
            <Col>
               <Col
                  sm={{ offset: 1, span: 10 }}// Temporary until styled components
                  md={{ offset: 1, span: 10 }}
                  lg={{ offset: 2, span: 10 }}
                  style={{ paddingTop: 20, textAlign: 'center' }}

               >
                  <Form>
                     <BackGroundForm xs={1} className={'mb-2'} noGutters>
                        <Title>Vamos configurar sua agenda?</Title>
                        <SubTitle>Defina os dias da semana e horários que você pode atender</SubTitle>
                        <SetHour
                           dayOfWeek="SEG"
                           initialId="col_init_hour"
                           finalId="col_end_hour"
                        />
                        <SetHour
                           dayOfWeek="TER"
                           initialId="col_init_hour"
                           finalId="col_end_hour"
                        />
                     </BackGroundForm>
                  </Form>
               </Col>
            </Col>
         </MainRow>
      </MainContainer>
   )
}