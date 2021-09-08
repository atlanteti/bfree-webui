import { React } from 'react'
import { Col, Container, Form } from "react-bootstrap";
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
                  <Form.Group controlId="formFile" className="mb-3">
                     <Form.Label>Default file input example</Form.Label>
                     <Form.Control type="file" />
                  </Form.Group>
               </Container>
            </Col>
         </Col>
      </MainRow>
   </MainContainer >
}
