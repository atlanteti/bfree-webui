import React, { useState } from 'react';

import axios from "axios";
import { Form, Col, Row, Button, Alert } from 'react-bootstrap';
import DrawerMenu from '../../Componentes/DrawerMenu';
import "./styles.css";

export default function CadastrarCompanhia() {
   const [formData, updateFormData] = useState({});
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
            url: 'http://209.97.146.187:18919/companies/cadastrar',
            data: formData,
         })

         if (data.meta.status == 100) {
            setShowAlert(true);
            setMessage("Companhia Cadastrada!");
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
      <div className="companhia-container">
         {showAlert &&
            <Alert className="msg-alert" variant={statusMsg} onClose={() => setShowAlert(false)} dismissible>
               {message}
            </Alert>
         }
         <DrawerMenu />
         <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={handleSubmit}>
               <Row>
                  <Col>
                     <Form.Group controlId="cpn_cli_cod">
                        <Form.Label>ID Eduzz:</Form.Label>
                        <Form.Control
                           type="number"
                           onChange={handleChange}
                           required
                        />
                     </Form.Group>
                  </Col>
               </Row>
               <Row>
                  <Col md={{ span: 1 }}>
                     <button>
                        Cadastrar
                     </button>
                  </Col>
               </Row>
            </Form>
         </Col>
      </div>
   );
}