import { MainContainer, MainRow, Title, BackGroundForm } from "../../styles/CommonStyles";
import { CustomMenu } from "../../Componentes/CustomMenu";
import { Form, Col, Row } from "react-bootstrap";

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
                        <h2>Vamos configurar sua agenda?</h2>
                        <p>Defina os dias da semana e horários que você pode atender</p>
                        <Col>
                           <Row>

                           </Row>
                        </Col>
                     </BackGroundForm>
                  </Form>
               </Col>
            </Col>
         </MainRow>
      </MainContainer>
   )
}