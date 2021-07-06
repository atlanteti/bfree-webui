import React, { useState, useEffect } from 'react';

import { Redirect } from "react-router-dom";
import axios from "axios";
import { Form, Col, Row, Button, Alert, Toast } from 'react-bootstrap';
import "./styles.css";
import { CustomMenu } from '../../../Componentes/CustomMenu';
import moment from "moment";
import { request } from '../../../Services/api';

export default function CadastrarCompanhia(props) {
   const [companyData, setCompanyData] = useState({});
   const [responseData, setResponseData] = useState({});
   const [showAlert, setShowAlert] = useState(false);
   const [message, setMessage] = useState();
   const [statusMsg, setStatusMsg] = useState();
   const [redirect, setRedirect] = useState(false);
   const [horaUpd, setHoraUpd] = useState();
   const [horaCriacao, setHoraCriacao] = useState();

   const paramRoute = props.match.params.param;

   const companyId = Number(props.match.params.cpn_cod);

   const handleChange = (e) => {
      setCompanyData({ ...companyData, [e.target.id]: e.target.value.trim() })
   };

   function insertionResultHandler(data) {
      setShowAlert(true);
      if (data.meta.status == 100) {
         setMessage("Companhia cadastrada com sucesso!");
         setStatusMsg('success');
         window.setTimeout(() => {
            setShowAlert(false)
         }, 2500);
      } else {
         setMessage("Algo deu errado. Tente novamente!");
         setStatusMsg('warning');
      }
   }

   async function insertCompanyData(formData) {
      return await request({
         method: "post",
         endpoint: "companies/cadastrar",
         data: formData
      });
   }

   function editResultHandler(data) {
      if (data.meta.status == 100) {
         setRedirect(true);
      }
   }

   async function editCompanyData(formData) {
      return await request({
         method: "put",
         endpoint: `companies/alterar/${companyId}`,
         data: formData,
      });
   }

   const handleSubmit = async (e) => {
      const formData = {
         ...companyData,
         cpn_cli_cod: Number(companyData.cpn_cli_cod)
      }
      try {
         e.preventDefault()
         let data = null;
         if (paramRoute === "inserir")
         {
            data = await insertCompanyData(formData);
            setResponseData(data);
            // insertionResultHandler(data);
         }
         else
         {
            data = await editCompanyData(formData);
            // editResultHandler(data);
         }
         setResponseData(data);
      } catch (error) {
         console.log(error)
      }
   };
   
   

   useEffect(() => {
      const requestData =  async () => {
         try {
            const data = await request({
               method:"get",
               endpoint: `companies/procurar/${companyId}`
            })
            updateData(data);
         } catch (error) {
            console.log(error)
         }
   
   
      };
      if (paramRoute !== "inserir"){
         requestData();
      }
   }, [companyId, paramRoute])
   if (redirect) {
      return <Redirect to="/companhia" />
   }
   class RegisterAlert extends React.Component{
      constructor(props){
         super(props)
         this.state = {
            showAlert:false}
         }
      onShowAlert(){
         this.setState({showAlert:true})
         if (this.props.data.meta.status == 100) {
            this.setState({
               message:"Companhia cadastrada com sucesso!",
               statusMsg:'success'});
            window.setTimeout(() => {
               this.setState({showAlert:false})
            }, 2500);

         } else {
            this.setState({
               message:"Algo deu errado. Tente novamente",
               statusMsg:"warning"
            })
         }
      }
      render() {
         return <Alert 
                     variant={this.state.statusMsg} 
                     onClose={()=>{this.setState({showAlert:false})}}
                     dismissible
                     show={this.state.showAlert}>
                  <p>{this.state.message}</p>
               </Alert>
      }
   }
   return (
      <>
         <CustomMenu />
         <Col style={{ marginTop: 48 }}>
            <Col md={{ span: 4, offset: 3 }}>
            {/* {showAlert &&
               <Alert show={false} variant={statusMsg} onClose={() => setShowAlert(false)} dismissible>
                  <p>{message}</p>
               </Alert>
            } */}
            <RegisterAlert data={responseData}/>
               <Form onSubmit={handleSubmit}>
                  <Row>
                     <Col>
                        <Form.Group controlId="cpn_cli_cod">
                           <Form.Label>ID Eduzz: </Form.Label>
                           <Form.Control
                              type="number"
                              defaultValue={companyData?.cpn_cli_cod}
                              onChange={handleChange}
                              required
                           />
                        </Form.Group>
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                        <Form.Group controlId="cpn_name">
                           <Form.Label>Nome: </Form.Label>
                           <Form.Control
                              type="text"
                              onChange={handleChange}
                              defaultValue={companyData?.cpn_name}
                              required
                           />
                        </Form.Group>
                     </Col>
                  </Row>
                  {paramRoute === "inserir" ? "" : (
                     <>
                        <Row>
                           <Col>
                              <Form.Group controlId="cpn_dtcreation">
                                 <Form.Label>Data de criação: </Form.Label>
                              </Form.Group>
                           </Col>
                        </Row>
                        <Row>
                           <Col style={{ marginBottom: 20 }}>
                              {/* formatando data */}
                              {moment(companyData?.cpn_dtcreation).format("a") === "pm" ? (
                                 moment(companyData?.cpn_dtcreation).format("DD-MM-YYYY") + " " + (parseInt(horaCriacao) + 12) + ":" + moment(companyData?.cpn_dtcreation).format("mm")
                              )
                                 : moment(companyData?.cpn_dtcreation).format("DD-MM-YYYY hh:mm")
                              }
                           </Col>
                        </Row>
                        {companyData.usr_dtupdate === null ? "" : (
                           <>
                              <Row>
                                 <Col>
                                    <Form.Group controlId="cpn_dtupdate">
                                       <Form.Label>Data de atualização: </Form.Label>
                                    </Form.Group>
                                 </Col>
                              </Row>
                              <Row>
                                 <Col>
                                    {/* formatando data */}
                                    {moment(companyData?.cpn_dtupdate).format("a") === "pm" ? (
                                       moment(companyData?.cpn_dtupdate).format("DD-MM-YYYY") + " " + (parseInt(horaUpd) + 12) + ":" + moment(companyData?.cpn_dtupdate).format("mm")
                                    )
                                       : moment(companyData?.cpn_dtcreation).format("DD-MM-YYYY hh:mm")
                                    }
                                 </Col>
                              </Row>
                           </>
                        )}
                     </>
                  )}
                  <Row style={{ marginTop: 20 }}>
                     <Button
                        variant="danger" style={{ marginLeft: 15 }}
                        onClick={() => setRedirect(true)}
                     >
                        Cancelar
                     </Button>

                     <Button type="submit" variant="warning" style={{ marginLeft: 25 }}>
                        {paramRoute === "inserir" ? "Cadastrar" : "Editar"}
                     </Button>
                  </Row>
               </Form>
            </Col>
         </Col>
      </>
   );

   

   function updateData(data) {
      setCompanyData(data.data);
      setHoraCriacao(moment(data.data.cpn_dtcreation).format("hh"));
      setHoraUpd(moment(data.data.cpn_dtupdate).format("hh"));
   }
}