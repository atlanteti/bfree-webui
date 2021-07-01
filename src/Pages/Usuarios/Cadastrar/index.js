import React, { useState, useEffect } from 'react';

import axios from "axios";
import { Redirect } from 'react-router-dom';

import { Form, Col, Row, Button, Alert, Modal } from 'react-bootstrap';
import { CustomMenu } from '../../../Componentes/CustomMenu';
import "./styles.css";

export default function Cadastrar() {
   const [formData, updateFormData] = useState({
      usr_sus_cod: 1
   });
   const [showAlert, setShowAlert] = useState(false);
   const [message, setMessage] = useState();
   const [statusMsg, setStatusMsg] = useState();
   const [showModal, setShowModal] = useState(false);
   const [redirect, setRedirect] = useState(false);
   const [statusSelect, setStatusSelect] = useState();

   const handleClose = () => setShowModal(false);

   const handleChange = (e) => {
      updateFormData({ ...formData, [e.target.id]: Number(e.target.value.trim()) })
   };

   const handleSubmit = async (e) => {
      console.log(formData);
      try {
         e.preventDefault()
         const { data } = await axios({
            method: 'post',
            url: 'http://209.97.146.187:18919/usuarios/cadastrar',
            data: formData,
         })

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
            setMessage("Algo deu errado. Tente novamente!");
            setStatusMsg('warning');
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

   useEffect(() => {
      requestStatus();
   }, [])

   if (redirect) {
      return <Redirect to="/" />
   }

   return (
      <>
         {showAlert &&
            <Alert variant={statusMsg} onClose={() => setShowAlert(false)} dismissible>
               {message}
            </Alert>
         }
         <CustomMenu />
         <Col>
            <Col className="cadastrar-user" md={{ span: 3, offset: 3 }}>
               <Form onSubmit={handleSubmit}>
                  <Row bsPrefix="column">
                     <Col>
                        <Form.Group controlId="usr_cli_cod">
                           <Form.Label>ID Eduzz:</Form.Label>
                           <Form.Control
                              type="number"
                              onChange={handleChange}
                              required
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId="usr_externalid">
                           <Form.Label>ID Externo:</Form.Label>
                           <Form.Control
                              type="number"
                              onChange={handleChange}
                              required
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId="usr_sus_cod">
                           <Form.Label>Status:</Form.Label>
                           <Form.Control
                              as="select"
                              onChange={handleChange}
                           >
                              {statusSelect?.map(status => {
                                 return (<option key={status.sus_cod} value={status.sus_cod}>{status.sus_name}</option>)
                              })}
                           </Form.Control>
                        </Form.Group>
                     </Col>
                  </Row>
                  <Row style={{ marginTop: 30 }}>
                     <Button
                        variant="danger" style={{ marginLeft: 30 }}
                        onClick={() => setShowModal(true)}
                     >
                        Cancelar
                     </Button>

                     <Button variant="warning" style={{ marginLeft: 30 }}>
                        Cadastrar
                     </Button>
                  </Row>
               </Form>
               <Modal show={showModal} onHide={handleClose}>
                  <Modal.Header closeButton>
                     <Modal.Title>Erro!</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Você deseja cancelar o cadastramento de usuário?</Modal.Body>
                  <Modal.Footer>
                     <Button variant="danger" onClick={handleClose}>
                        Não
                     </Button>
                     <Button variant="warning" onClick={() => setRedirect(true)}>
                        Sim
                     </Button>
                  </Modal.Footer>
               </Modal>
            </Col>
         </Col>
      </>
   );
}