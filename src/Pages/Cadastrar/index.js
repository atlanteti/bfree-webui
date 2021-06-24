import React, { useState } from 'react';

import axios from "axios";
import { Form, Col, Row, Button, Alert, Modal } from 'react-bootstrap';
import DrawerMenu from '../../Componentes/DrawerMenu';
import "./styles.css";
import { Redirect } from 'react-router-dom';

export default function Cadastrar() {
   const [formData, updateFormData] = useState({
      usr_sus_cod: 1
   });
   const [showAlert, setShowAlert] = useState(false);
   const [message, setMessage] = useState();
   const [statusMsg, setStatusMsg] = useState();
   const [showModal, setShowModal] = useState(false);
   const [redirect, setRedirect] = useState(false);

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
               }, 2000);
            }, 4000);

         } else {
            setShowAlert(true);
            setMessage("Algo deu errado. Tente novamente!");
            setStatusMsg('warning');
         }

         console.log(data)
      } catch (error) {
         console.log(error)
      }
   };

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
         <DrawerMenu />
         <div className="cadastrar-container">
            <Col className="cadastrar-user" md={{ span: 6, offset: 3 }}>
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
                           <Form.Label>Status</Form.Label>
                           <Form.Control
                              as="select"
                              onChange={handleChange}
                           >
                              <option value={1}>Ativo</option>
                              <option value={2}>Inativo</option>
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

                     <button style={{ marginLeft: 30 }}>
                        Cadastrar
                     </button>
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
         </div>
      </>
   );
}