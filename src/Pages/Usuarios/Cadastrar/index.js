import React, { useState, useEffect } from 'react';

import axios from "axios";
import { Redirect } from 'react-router-dom';
import moment from "moment";

import { Form, Col, Row, Button, Alert, Modal } from 'react-bootstrap';
import { CustomMenu } from '../../../Componentes/CustomMenu';
import "./styles.css";

export default function EditUsuarios(props) {
   const [formData, updateFormData] = useState({
      usr_sus_cod: 1,
   });
   const [showAlert, setShowAlert] = useState(false);
   const [message, setMessage] = useState();
   const [statusMsg, setStatusMsg] = useState();
   const [redirect, setRedirect] = useState(false);
   const [statusSelect, setStatusSelect] = useState();
   const [statusUser, setStatusUser] = useState();
   const [horaUpd, setHoraUpd] = useState();
   const [horaCriacao, setHoraCriacao] = useState();

   const handleChange = (e) => {
      updateFormData({ ...formData, [e.target.id]: e.target.value.trim() })
   };

   const paramRoute = props.match.params.route;
   const clienteId = Number(props.match.params.usr_cod);

   const handleSubmit = async (e) => {
      console.log(formData);
      try {
         e.preventDefault()
         if (paramRoute === "inserir") {
            const { data } = await axios({
               method: 'post',
               url: 'http://209.97.146.187:18919/usuarios/cadastrar',
               data: {
                  ...formData,
                  usr_cli_cod: Number(formData.usr_cli_cod),
                  usr_externalid: formData.usr_externalid,
                  usr_sus_cod: Number(formData.usr_sus_cod)
               },
            })
            console.log(data)
            if (data.meta.status == 100) {
               setShowAlert(true);
               setMessage("Usuario Cadastrado!");
               setStatusMsg('success')

               setTimeout(() => {
                  setShowAlert(false);
                  setTimeout(() => {
                     setRedirect(true);
                  }, 1000);
               }, 3000);

            } else {
               setShowAlert(true);
               setMessage(data.meta.message);
               setStatusMsg('warning');
            }
         } else {
            const { data } = await axios({
               method: 'put',
               url: `http://209.97.146.187:18919/usuarios/alterar/${clienteId}`,
               data: {
                  ...formData,
                  usr_cli_cod: Number(formData.usr_cli_cod),
                  usr_externalid: formData.usr_externalid,
                  usr_sus_cod: Number(formData.usr_sus_cod)
               },
            })
            if (data.meta.status == 100) {
               setRedirect(true);
            } else {
               setShowAlert(true);
            }
         }
      } catch (error) {
         console.log(error)
      }
   };

   const requestStatus = async (e) => {
      try {
         if (e) {
            e.preventDefault();
         }
         const { data } = await axios({
            method: "get",
            url: "http://209.97.146.187:18919/status-users/listar",
         });
         setStatusSelect(data.data);
      } catch (error) {
         alert(error);
      }
   };

   const requestData = async () => {
      try {
         const { data } = await axios({
            method: 'get',
            url: `http://209.97.146.187:18919/usuarios/procurar/${clienteId}`,
         })
         console.log(data.data)
         updateFormData(data.data)
         setStatusUser(data.data.statusUser.sus_name);
         setHoraCriacao(moment(data.data.usr_dtcreation).format("hh"))
         setHoraUpd(moment(data.data.usr_dtupdate).format("hh"))
      } catch (error) {
         console.log(error)
      }
   };

   function preventNonNumericalInput(e) {
      e = e || window.event;
      var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
      var charStr = String.fromCharCode(charCode);

      if (!charStr.match(/^[0-9]+$/))
         e.preventDefault();
   }

   useEffect(() => {
      if (paramRoute === "alterar") {
         requestData();
      }
      requestStatus();
   }, [])

   if (redirect) {
      return <Redirect to="/usuarios" />
   }

   return (
      <>
         {showAlert &&
            <Col md={{ span: 8, offset: 2 }}>
               <Alert variant={statusMsg} onClose={() => setShowAlert(false)} dismissible>
                  {message}
               </Alert>
            </Col>
         }
         <CustomMenu />
         <Col >
            <Col style={{ marginTop: 48 }} md={{ span: 4, offset: 3 }}>
               <Form onSubmit={handleSubmit}>
                  <Row bsPrefix="column">
                     <Col>

                        <Form.Group controlId="usr_cli_cod">
                           <Form.Label>ID Eduzz:</Form.Label>
                           <Form.Control
                              type="number"
                              onChange={handleChange}
                              defaultValue={formData?.usr_cli_cod}
                              pattern="[1-9]"
                              required
                              onKeyPress={(e) => preventNonNumericalInput(e)}
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId="usr_externalid">
                           <Form.Label >ID Externo:</Form.Label>
                           <Form.Control
                              type="text"
                              required
                              maxLength="10"
                              onChange={handleChange}
                              defaultValue={formData?.usr_externalid}
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId="usr_sus_cod">
                           <Form.Label>Status: </Form.Label>
                           <Form.Control
                              as="select"
                              required
                              onChange={handleChange}
                              value={formData?.usr_sus_cod}
                           >
                              {statusSelect?.map(status => {
                                 if (statusUser == status.sus_name) {
                                    return (<option selected key={status.sus_cod} value={status.sus_cod}>{status.sus_name}</option>)
                                 }
                                 return (<option key={status.sus_cod} value={status.sus_cod}>{status.sus_name}</option>)
                              })}
                           </Form.Control>
                        </Form.Group>
                     </Col>
                  </Row>
                  {paramRoute === "inserir" ? '' : (
                     <Row bsPrefix="column">
                        <Col>
                           <Form.Group controlId="usr_dtcreation">
                              <Form.Label>Data de criação: </Form.Label>
                           </Form.Group>
                        </Col>
                        <Col style={{ marginBottom: 20 }}>
                           {/* formatando data */}
                           {moment(formData?.usr_dtcreation).format("a") === "pm" ? (
                              moment(formData?.usr_dtcreation).format("DD-MM-YYYY") + " " + (parseInt(horaCriacao) + 12) + ":" + moment(formData?.usr_dtcreation).format("mm")
                           )
                              : moment(formData?.usr_dtcreation).format("DD-MM-YYYY hh:mm")
                           }
                        </Col>
                        {formData.usr_dtupdate === null ? "" : (
                           <>
                              <Col>
                                 <Form.Group controlId="usr_dtupdate">
                                    <Form.Label>Data de atualização: </Form.Label>
                                 </Form.Group>
                              </Col>
                              <Col>
                                 {/* formatando data */}
                                 {moment(formData?.usr_dtupdate).format("a") === "pm" ? (
                                    moment(formData?.usr_dtupdate).format("DD-MM-YYYY") + " " + (parseInt(horaUpd) + 12) + ":" + moment(formData?.usr_dtupdate).format("mm")
                                 )
                                    : moment(formData?.usr_dtcreation).format("DD-MM-YYYY hh:mm")
                                 }
                              </Col>
                           </>
                        )}
                     </Row>
                  )}
                  <Row style={{ marginTop: 30, marginBottom: 20 }}>
                     <Button
                        variant="danger" style={{ marginLeft: 30 }}
                        onClick={() => setRedirect(true)}
                     >
                        Cancelar
                     </Button>

                     <Button variant="warning" type="submit" style={{ marginLeft: 30 }}>
                        {paramRoute === "inserir" ? "Cadastrar" : "Editar"}
                     </Button>
                  </Row>
               </Form>
            </Col>
         </Col>
      </>
   );
}