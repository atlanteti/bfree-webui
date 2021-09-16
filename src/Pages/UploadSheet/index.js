import { Component, React } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import { CustomMenu } from "../../Componentes/CustomMenu";
import { request } from "../../Services/api";
import {
  CustomMenuCol,
  MainContainer,
  MainRow,
  Title,
} from "../../styles/CommonStyles";
import ListUsers from "../../Componentes/ListUsers";
import { CustomAlert } from "../../Componentes/CustomAlert";
import CircularProgress from '@material-ui/core/CircularProgress'

export default class UploadSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      failUploadStatus: false,
      failUploadMessage: null,
      responseAlertShow: null,
      redirect: false,
      fileName: "Escolha a planilha excel para enviar",
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
    this.setState({loadTable: true})
    const response = await request({
      method: "post",
      endpoint: "demands/complete-import",
      params: this.state.formData,
    })
    this.setState({loadTable: false})
    this.showAlert(response.meta);
  };

  handleChangeFile = (event) => {
    const uploadFile = new FormData();
    uploadFile.append("file", event.target.files[0]);
    this.setState({ file: uploadFile, fileName: event.target.files[0].name });
  };

  handleSubmitFile = async (event) => {
    event.preventDefault();
    this.setState({loadTable: true})
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
    this.setState({loadTable: false})
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
                  <Title style={{ marginBottom: 18 }}>Upload</Title>
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
                    <Row style={{justifyContent: "center"}}>
                      <CircularProgress />
                    </Row>
                  </Col> 
                  :
                  <>
                  {!this.state.failUploadStatus ? (
                    <Col>
                      <Container fluid>
                        <Form onSubmit={this.handleSubmitFile}>
                          <Form.File id="formcheck-api-custom" custom>
                            <Form.File.Input
                              isValid
                              onChange={this.handleChangeFile}
                            />
                            <Form.File.Label data-browse="Selecionar Arquivos">
                              {this.state.fileName}
                            </Form.File.Label>
                            <Form.Control.Feedback type="valid" style={{ marginTop: 10 }}>
                              Número máximo de linhas: 500
                            </Form.Control.Feedback>
                          </Form.File>
                          <Button 
                            style={{ marginTop: 10 }} 
                            type="submit"
                            variant="warning"
                          >
                              Enviar
                          </Button>
                        </Form>
                      </Container>
                    </Col>
                  ) : (
                    <Col>
                      <Container fluid>
                        <Form onSubmit={this.handleSubmit}>
                          <ListUsers
                            onChange={this.handleChange}
                            controlId="operatorId"
                          />
                          <Button variant="warning" type="submit">Enviar</Button>
                        </Form>
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