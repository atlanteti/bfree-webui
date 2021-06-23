import React, { useState } from 'react';

import axios from "axios";
import { Form, Col, Row, Button, Alert } from 'react-bootstrap';
import CustomMenu from '../../Componentes/CustomMenu';
import DrawerMenu from '../../Componentes/DrawerMenu';

export default function Cadastrar() {
   const [formData, updateFormData] = useState({
      usr_sus_cod: 1
   });
   const [showAlert, setShowAlert] = useState(false);
   const [message, setMessage] = useState();
   const [statusMsg, setStatusMsg] = useState();

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
         } else {
            setShowAlert(true);
            setMessage("Algo deu errado!");
            setStatusMsg('warning');
         }

         console.log(data)
      } catch (error) {
         console.log(error)
      }
   };

   return (
      <>
         {showAlert &&
            <Alert variant={statusMsg} onClose={() => setShowAlert(false)} dismissible>
               {message}
            </Alert>
         }
         <DrawerMenu />
         <Col md={{ span: 6, offset: 2}}>
            <Form onSubmit={handleSubmit}>
               <Row>
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
               <Row>
                  <Col md={{ span: 1, offset: 10 }}>
                     <Button variant="primary" type="submit">
                        Cadastrar
                     </Button>
                  </Col>
               </Row>
            </Form>
         </Col>
      </>
   );
}