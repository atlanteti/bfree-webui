import { Component, React } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import { CustomMenu } from "../../Componentes/CustomMenu";
import { request } from "../../Services/api";
import {
   BackGroundForm,
   CustomMenuCol,
   MainContainer,
   MainRow,
   Title,
} from "../../styles/CommonStyles";
import ListUsers from "../../Componentes/ListUsers";
import { CustomAlert } from "../../Componentes/CustomAlert";
import CircularProgress from '@material-ui/core/CircularProgress'
import CustomFileInputField from "../../Componentes/CustomFileInputField";

export default class UploadSheet extends Component {
   constructor(props) {
      super(props);
      this.state = {
         file: null,
         failUploadStatus: false,
         failUploadMessage: null,
         responseAlertShow: null,
         redirect: false,
         fileName: "Nenhum arquivo escolhido",
         formData: {},
         loadTable: false
      };

      this.handleChangeFile = this.handleChangeFile.bind(this);
      this.handleChange = this.handleChange.bind(this);
   }

   getAlertCallback(func) {
      this.setState({
         responseAlertShow: func,
      });
   }

   showAlert(data) {
      this.state.responseAlertShow(data);
   }

   handleChange = (event) => {
      this.setState({
         formData: {
            ...this.state.formData,
            [event.target.id]: Number(event.target.value.trim()),
         },
      });
      console.log(this.state);
   };

   handleSubmit = async (event) => {
      event.preventDefault();
      this.setState({ loadTable: true })
      const response = await request({
         method: "post",
         endpoint: "demands/complete-import",
         params: this.state.formData,
      })
      this.setState({ loadTable: false })
      this.showAlert(response.meta);
   };

   handleChangeFile = (fileData) => {
      const uploadFile = new FormData();
      uploadFile.append("file", fileData[0]);
      this.setState({ file: uploadFile, fileName: fileData[0].name });
   };

   handleSubmitFile = async (event) => {
      event.preventDefault();
      this.setState({ loadTable: true })
      const response = await request({
         method: "post",
         endpoint: "demands/import-file",
         contentType: "multipart/form-data",
         data: this.state.file,
      });
      if (response.meta.status === 213) {
         this.setState({
            failUploadStatus: true,
            failUploadMessage: response.meta.message,
         });
         this.showAlert(response.meta);
      } else {
         this.showAlert(response.meta);
      }
      this.setState({ loadTable: false })
   };

   redirect() {
      this.setState({ redirect: true });
   }

   render() {
      if (this.state.redirect) {
         return <Redirect to="/demandas" />;
      } else {
         return (
            <>
               <MainContainer>
                  <MainRow>
                     <CustomMenuCol lg={2}>
                        <CustomMenu />
                     </CustomMenuCol>
                     <Col>
                        <Col style={{ marginTop: "1rem" }}>
                           <Title style={{ marginBottom: 18 }}>Upload de planilha excel</Title>
                           <Helmet title="Upload" />
                        </Col>
                        <Col>
                           <Container fluid>
                              <CustomAlert
                                 showAlertCallback={this.getAlertCallback.bind(this)}
                                 redirectCallback={this.redirect.bind(this)}
                              />
                           </Container>
                        </Col>
                        {this.state.loadTable ?
                           <Col>
                              <Row style={{ justifyContent: "center" }}>
                                 <CircularProgress />
                              </Row>
                           </Col>
                           :
                           <>
                              {!this.state.failUploadStatus ? (
                                 <Col>
                                    <Container fluid>
                                       <BackGroundForm>
                                          <Col>
                                             <CustomFileInputField
                                                onChange={this.handleChangeFile.bind(this)}
                                                filename={this.state.fileName} />
                                             <Form onSubmit={this.handleSubmitFile}>
                                                <Col style={{ textAlign: "center" }}>
                                                   <Button type="submit" variant="dark"
                                                      style={{
                                                         padding: "0.5rem 3rem"
                                                      }}>
                                                      Enviar
                                                   </Button>
                                                </Col>
                                             </Form>
                                          </Col>
                                       </BackGroundForm>
                                    </Container>
                                 </Col>
                              ) : (
                                 <Col>
                                    <Container fluid>
                                       <BackGroundForm>
                                          <Form onSubmit={this.handleSubmit}>
                                             <ListUsers
                                                onChange={this.handleChange}
                                                controlId="operatorId"
                                             />
                                             <Button variant="dark" type="submit">Enviar</Button>
                                          </Form>
                                       </BackGroundForm>
                                    </Container>
                                 </Col>
                              )}
                           </>
                        }
                     </Col>
                  </MainRow>
               </MainContainer>
            </>
         );
      }
   }
}
