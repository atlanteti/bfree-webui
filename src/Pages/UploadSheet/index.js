import { React } from 'react'
import { Button, Col, Container, Form } from "react-bootstrap";
import { Helmet } from 'react-helmet';
import { CustomMenu } from '../../Componentes/CustomMenu';
import { CustomMenuCol, MainContainer, MainRow, Title } from '../../styles/CommonStyles';
export default function UploadSheet(props) {
   return <MainContainer>
      <MainRow>
         <CustomMenuCol lg={2}><CustomMenu /></CustomMenuCol>
         <Col>
            <Col style={{ marginTop: '1rem' }}>
               <Title style={{ marginBottom: 18 }}>Upload</Title>
               <Helmet title="Upload" />
            </Col>
            <Col>
               <Container fluid>
                  <Form>
                     <Form.File id="formcheck-api-custom" custom>
                        <Form.File.Input isValid onChange={(data) => {
                           console.log(data)
                        }} />
                        <Form.File.Label data-browse="Enviar">
                           Escolha a planilha excel para enviar
                        </Form.File.Label>
                        <Form.Control.Feedback type="valid">Número máximo de linhas: 500</Form.Control.Feedback>
                     </Form.File>
                     <Button type="submit">Enviar</Button>
                  </Form>
               </Container>
            </Col>
         </Col>
      </MainRow>
   </MainContainer >
}
