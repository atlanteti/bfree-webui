import React, { useState, useEffect } from 'react';

import { Redirect } from "react-router-dom";
import { Form, Col, Row, Button, Alert } from 'react-bootstrap';
// import "./styles.css";
import moment from "moment";
import { CustomMenu } from '../../../Componentes/CustomMenu';
import { request } from '../../../Services/api';

export default function EditTipoDemanda(props) {
   const [typeDemand, setTypeDemand] = useState({});
   const [companys, setCompanys] = useState(null);
   const [showAlert, setShowAlert] = useState(false);
   const [message, setMessage] = useState();
   const [statusMsg, setStatusMsg] = useState();
   const [redirect, setRedirect] = useState(false);
   const [horaCriacao, setHoraCriacao] = useState(null);
   const [horaUpd, setHoraUpd] = useState(null);

   const paramRoute = props.match.params.param;

   const demandId = Number(props.match.params.tdm_cod);

   const handleChange = (e) => {
      setTypeDemand({ ...typeDemand, [e.target.id]: e.target.value.trim() })
   };

   function insertionResultHandler(data) {
      if (data.meta.status == 100) {
         setShowAlert(true);
         setMessage("Tipo de demanda cadastrada com sucesso!");
         setStatusMsg('success');

         setTimeout(() => {
            setShowAlert(false);
            setTimeout(() => {
               setRedirect(true);
            }, 500);
         }, 1000);
      } else {
         setShowAlert(true);
         setMessage("Algo deu errado. Tente novamente!");
         setStatusMsg('warning');
      }
   }

   async function insertTypeDemand(formData) {
      return await request({
         method: "post",
         endpoint: "types-demand/cadastrar",
         data: formData
      });
   }

   function editResultHandler(data) {
      if (data.meta.status == 100) {
         setRedirect(true);
      }
   }

   async function editTypeDemand(formData) {
      console.log(formData)
      return await request({
         method: "put",
         endpoint: `types-demand/alterar/${demandId}`,
         data: formData,
      });
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      const formData = {
         ...typeDemand,
         tdm_cpn_cod: typeDemand.tdm_cpn_cod == null ? typeDemand.tdm_cpn_cod : Number(typeDemand.tdm_cpn_cod)
      }
      try {
         e.preventDefault()
         let data = null;
         if (paramRoute === "inserir") {
            data = await insertTypeDemand(formData);
            insertionResultHandler(data);
         }
         else {
            data = await editTypeDemand(formData);
            editResultHandler(data);
         }
      } catch (error) {
         console.log(error)
      }
   };

   useEffect(() => {
      const requestData = async () => {
         try {
            const data = await request({
               method: "get",
               endpoint: `types-demand/procurar/${demandId}`
            })
            updateData(data);
         } catch (error) {
            console.log(error)
         }
      };
      const requestCompany = async () => {
         try {
            const data = await request({
               method: "get",
               endpoint: "companies/listar-todos"
            })
            updateCompany(data);
         } catch (error) {
            console.log(error);
         }
      }

      requestCompany();

      if (paramRoute !== "inserir") {
         requestData();
      }

   }, [demandId, paramRoute])
   if (redirect) {
      return <Redirect to="/tipodemanda" />
   }

   return (
      <>
         {showAlert &&
            <Col md={{ offset: 2, span: 5 }}>
               <Alert className="msg-alert" variant={statusMsg} onClose={() => setShowAlert(false)} dismissible>
                  {message}
               </Alert>
            </Col>
         }
         <CustomMenu />
         <Col style={{ marginTop: 48 }}>
            <Col md={{ span: 4, offset: 3 }}>
               <Form onSubmit={handleSubmit}>
                  <Row>
                     <Col>
                        <Form.Group controlId="tdm_name">
                           <Form.Label>Nome: </Form.Label>
                           <Form.Control
                              type="text"
                              onChange={handleChange}
                              defaultValue={typeDemand?.tdm_name}
                              required="required"
                           />
                        </Form.Group>
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                        <Form.Group controlId="tdm_cpn_cod">
                           <Form.Label>Empresa: </Form.Label>
                           <Form.Control
                              as="select"
                              onChange={handleChange}
                              required="required"
                              defaultValue={typeDemand?.tdm_cpn_cod}
                           >
                              {typeDemand?.tdm_cpn_cod == "" && (typeDemand.tdm_cpn_cod = null)}
                              <option selected value={null}></option>
                              <>
                                 {companys?.map(company => {
                                    if (typeDemand?.tdm_cpn_cod == company.cpn_cod) {
                                       return (
                                          <option
                                             selected key={company.cpn_cod}
                                             value={company.cpn_cod}
                                          >
                                             {company.cpn_name}
                                          </option>)
                                    }
                                    return (
                                       <option
                                          key={company.cpn_cod}
                                          value={company.cpn_cod}
                                       >
                                          {company.cpn_name}
                                       </option>)
                                 })}
                              </>
                           </Form.Control>
                        </Form.Group>
                     </Col>
                  </Row>
                  {paramRoute === "alterar" && (
                     <Row bsPrefix="column">
                        <Col>
                           <Form.Group controlId="tdm_dtcreation">
                              <Form.Label>Data de criação: </Form.Label>
                           </Form.Group>
                        </Col>
                        <Col style={{ marginBottom: 20 }}>
                           {moment(typeDemand?.tdm_dtcreation).format("a") === "pm" ? (
                              moment(typeDemand?.tdm_dtcreation).format("DD-MM-YYYY") + " " + (parseInt(horaCriacao) + 12) + ":" + moment(typeDemand?.tdm_dtcreation).format("mm")
                           )
                              : moment(typeDemand?.tdm_dtcreation).format("DD-MM-YYYY hh:mm")
                           }
                        </Col>
                        {typeDemand?.tdm_dtupdate !== null && (
                           <>
                              <Col>
                                 <Form.Group controlId="tdm_dtupdate">
                                    <Form.Label>Data de atualização: </Form.Label>
                                 </Form.Group>
                              </Col>
                              <Col>
                                 {moment(typeDemand?.tdm_dtupdate).format("a") === "pm" ? (
                                    moment(typeDemand?.tdm_dtupdate).format("DD-MM-YYYY") + " " + (parseInt(horaUpd) + 12) + ":" + moment(typeDemand?.tdm_dtupdate).format("mm")
                                 )
                                    : moment(typeDemand?.tdm_dtupdate).format("DD-MM-YYYY hh:mm")
                                 }
                              </Col>
                           </>
                        )}
                     </Row>
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
      setTypeDemand(data.data);
      setHoraCriacao(moment(data.data.cpn_dtcreation).format("hh"));
      setHoraUpd(moment(data.data.cpn_dtupdate).format("hh"));
   }

   function updateCompany(data) {
      setCompanys(data.data);
   }
}