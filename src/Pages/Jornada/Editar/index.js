import React, { useEffect, useState } from 'react';

import { Form, Col, Row, Button, Alert } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

import axios from 'axios';
import moment from 'moment';
import DrawerMenu from '../../../Componentes/DrawerMenu';

export default function EditarJornada(props) {
   const [userData, setUserData] = useState({});
   const [redirect, setRedirect] = useState(false);
   const [message, setMessage] = useState();
   const [showAlert, setShowAlert] = useState(false);

   const clienteId = Number(props.match.params.jnu_cod);

   const handleChange = (e) => {
      setUserData({ ...userData, [e.target.id]: e.target.value.trim() })
   };

   const handleSubmit = async (e) => {
      try {
         e.preventDefault()
         const { data } = await axios({
            method: 'put',
            url: `http://209.97.146.187:18919/user-jorneys/alterar/${clienteId}`,
            data: {
               ...userData,
               jnu_usr_cod: Number(userData.jnu_usr_cod),
               jnu_jny_cod: Number(userData.jnu_jny_cod)
            },
         })

         console.log(data)
         if (data.meta.status == 100) {
            // setRedirect(true);
         } else {
            setMessage("Algo deu errado. Tente novamente!")
         }

      } catch (error) {
         console.log(error)
      }
   };

   const requestData = async () => {
      try {
         const { data } = await axios({
            method: 'get',
            url: `http://209.97.146.187:18919/user-jorneys/procurar/${clienteId}`,
         })
         setUserData(data.data)
         console.log(data.data);
      } catch (error) {
         console.log(error)
      }
   };

   useEffect(() => {
      requestData();
   }, [])

   if (redirect) {
      return <Redirect to="/jornadas" />
   }

   return (
      <>
         {showAlert &&
            <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
               {message}
            </Alert>
         }
         <DrawerMenu />
         <div className="cadastrar-container">
            <Col className="cadastrar-user" md={{ span: 6, offset: 3 }}>
               <Form onSubmit={handleSubmit}>
                  <Row bsPrefix="column">
                     <Col>
                        <Form.Group controlId="jnu_usr_cod">
                           <Form.Label>ID do usuário na Jornada:</Form.Label>
                           <Form.Control
                              type="number"
                              onChange={handleChange}
                              defaultValue={userData?.jnu_usr_cod}
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId="jnu_jny_cod">
                           <Form.Label>ID do usuário na Jornada:</Form.Label>
                           <Form.Control
                              type="number"
                              onChange={handleChange}
                              defaultValue={userData?.jnu_jny_cod}
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId="jnu_dtcreation">
                           <Form.Label>Data Cadastro</Form.Label>
                           <Form.Control
                              type="date"
                              onChange={handleChange}
                              value={moment(userData?.jnu_dtcreation).format("YYYY-MM-DD")}
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId="jnu_dtupdate">
                           <Form.Label>Dados alterado</Form.Label>
                           <Form.Control
                              type="date"
                              onChange={handleChange}
                              value={moment(userData?.jnu_dtupdate).format("YYYY-MM-DD")}
                           />
                        </Form.Group>
                     </Col>
                  </Row>
                  <Row style={{ marginTop: 30 }}>
                     <Button
                        variant="danger" style={{ marginLeft: 30 }}
                        onClick={() => setRedirect(true)}
                     >
                        Cancelar
                     </Button>

                     <button type="submit" style={{ marginLeft: 30 }}>
                        Editar
                     </button>
                  </Row>
               </Form>
            </Col>
         </div>
      </>
   )
}