import { MainContainer, MainRow, BackGroundForm } from "../../styles/CommonStyles";
import { CustomMenu } from "../../Componentes/CustomMenu";
import { Form, Col, Row } from "react-bootstrap";
import { HourComponent } from "../../Componentes/HourComponent";
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
                        <Row style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
                           <p>SEG</p>
                           <Col xs={12} sm={4}>
                              <HourComponent
                                 label="Inicial"
                                 name="col_init_hour"
                              />
                           </Col>
                           <p>:</p>
                           <Col xs={12} sm={4}>
                              <HourComponent
                                 label="Final"
                                 name="col_end_hour"
                              />
                           </Col>
                        </Row>
                     </BackGroundForm>
                  </Form>
               </Col>
            </Col>
         </MainRow>
      </MainContainer>
   )
}