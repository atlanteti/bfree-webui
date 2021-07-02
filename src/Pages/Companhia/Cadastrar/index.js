import React, { useState } from 'react';

import { Redirect } from "react-router-dom";
import axios from "axios";
import { Form, Col, Row, Button, Alert, Modal } from 'react-bootstrap';
import "./styles.css";
import { CustomMenu } from '../../../Componentes/CustomMenu';

export default function CadastrarCompanhia(props) {
   const [formData, updateFormData] = useState({});
   const [showAlert, setShowAlert] = useState(false);
   const [message, setMessage] = useState();
   const [statusMsg, setStatusMsg] = useState();
   const [redirect, setRedirect] = useState(false);

   const paramRoute = props.match.params.route;

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
            setMessage("Companhia cadastrada com sucesso!");
            setStatusMsg('success')

            setTimeout(() => {
               setShowAlert(false);
               setTimeout(() => {
                  setRedirect(true);
               }, 2000);
            }, 4000);
         } else {
            setShowAlert(true);
            setMessage("Algo deu errado.Tente novamente!");
            setStatusMsg('warning');
         }

         console.log(data)
      } catch (error) {
         console.log(error)
      }
   };

   if (redirect) {
      return <Redirect to="/companhia" />
   }

   return (
      <>
         {showAlert &&
            <Alert className="msg-alert" variant={statusMsg} onClose={() => setShowAlert(false)} dismissible>
               {message}
            </Alert>
         }
         <CustomMenu />
         <Col style={{ marginTop: 20 }}>
            <Col md={{ span: 3, offset: 3 }}>
               <Form onSubmit={handleSubmit}>
                  <Row>
                     <Col>
                        <Form.Group controlId="cpn_name">
                           <Form.Label>Nome: </Form.Label>
                           <Form.Control
                              type="text"
                              onChange={handleChange}
                              required
                           />
                        </Form.Group>
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                        <Form.Group controlId="cpn_cli_cod">
                           <Form.Label>ID Eduzz: </Form.Label>
                           <Form.Control
                              type="number"
                              onChange={handleChange}
                              required
                           />
                        </Form.Group>
                     </Col>
                  </Row>
                  <Row style={{ marginTop: 10 }}>
                     <Button
                        variant="danger" style={{ marginLeft: 15 }}
                        onClick={() => setRedirect(true)}
                     >
                        Cancelar
                     </Button>

                     <Button type="submit" variant="warning" style={{ marginLeft: 25 }}>
                        Cadastrar
                     </Button>
                  </Row>
               </Form>
            </Col>
         </Col>
      </>
   );
}