import React, { useState, useEffect } from 'react';

import axios from "axios";
import { Redirect } from 'react-router-dom';

import { Form, Col, Row, Button, Alert, Modal } from 'react-bootstrap';
import { CustomMenu } from '../../../Componentes/CustomMenu';

export default function CadastrarJornada() {
   const [formData, updateFormData] = useState({
      jny_cod: 1
   });
   const [showAlert, setShowAlert] = useState(false);
   const [message, setMessage] = useState();
   const [statusMsg, setStatusMsg] = useState();
   const [redirect, setRedirect] = useState(false);
   const [journeys, setJourneys] = useState();
   const [usuarios, setUsuarios] = useState();


   const handleChange = (e) => {
      updateFormData({ ...formData, [e.target.id]: Number(e.target.value.trim()) })
   };

   const handleSubmit = async (e) => {
      try {
         e.preventDefault()
         const { data } = await axios({
            method: 'post',
            url: 'http://209.97.146.187:18919/user-jorneys/cadastrar',
            data: formData,
         })

         if (data.meta.status == 100) {
            setShowAlert(true);
            setMessage("Jornada Cadastrada!");
            setStatusMsg('success')

            setTimeout(() => {
               setShowAlert(false);
               setTimeout(() => {
                  setRedirect(true);
               }, 1000);
            }, 3000);

         } else {
            setShowAlert(true);
            setMessage("Algo deu errado. Tente novamente!");
            setStatusMsg('warning');
         }
      } catch (error) {
         console.log(error)
      }
   };

   const requestJornadas = async (e) => {
      try {
         if (e) {
            e.preventDefault();
         }
         const { data } = await axios({
            method: "get",
            url: "http://209.97.146.187:18919/jorneys/listar",
         });
         setJourneys(data.data);
      } catch (error) {
         alert(error);
      }
   };

   const requestUsers = async (e) => {
      try {
         if (e) {
            e.preventDefault();
         }
         const { data } = await axios({
            method: "get",
            url: "http://209.97.146.187:18919/usuarios/listar",
         });
         setUsuarios(data.data);
      } catch (error) {
         alert(error);
      }
   };

   useEffect(() => {
      requestUsers();
      requestJornadas();
   }, [])

   if (redirect) {
      return <Redirect to="/jornadas" />
   }

   return (
      <>
         {showAlert &&
            <Col md={{ span: 6, offset: 2 }}>
               <Alert variant={statusMsg} onClose={() => setShowAlert(false)} dismissible>
                  {message}
               </Alert>
            </Col>
         }
         <CustomMenu />
         <Col>
            <Col className="cadastrar-user" md={{ span: 4, offset: 3 }}>
               <Form onSubmit={handleSubmit}>
                  <Row bsPrefix="column">
                     <Col>
                        <Form.Group controlId="jnu_jny_cod">
                           <Form.Label>Nome da jornada: </Form.Label>
                           <Form.Control
                              as="select"
                              onChange={handleChange}
                           >
                              {journeys?.map(status => {
                                 return (<option key={status.jny_cod} value={status.jny_cod}>{status.jny_name}</option>)
                              })}
                           </Form.Control>
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId="jnu_usr_cod">
                           <Form.Label>ID do usuário:</Form.Label>
                           <Form.Control
                              as="select"
                              onChange={handleChange}
                           >
                              {usuarios?.map(usuario => {
                                 return (<option key={usuario.usr_cod} value={usuario.usr_cod}>{usuario.usr_cod}</option>)
                              })}
                           </Form.Control>
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId="jnu_dtcreation">
                           <Form.Label>Data de criação:</Form.Label>
                           <Form.Control
                              type="date"
                              disabled
                              onChange={handleChange}
                           >
                           </Form.Control>
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId="jnu_dtupdate">
                           <Form.Label>Data de atualização:</Form.Label>
                           <Form.Control
                              type="date"
                              disabled
                              onChange={handleChange}
                           >
                           </Form.Control>
                        </Form.Group>
                     </Col>
                  </Row>
                  <Row style={{ marginTop: 30, marginBottom: 20 }}>
                     <Button
                        variant="danger" style={{ marginLeft: 30 }}
                        onClick={() => setRedirect(true)}
                     >
                        Cancelar
                     </Button>

                     <Button variant="warning" style={{ marginLeft: 30 }}>
                        Cadastrar
                     </Button>
                  </Row>
               </Form>
            </Col>
         </Col>
      </>
   );
}