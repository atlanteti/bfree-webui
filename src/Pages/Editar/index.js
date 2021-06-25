import React, { useEffect, useState } from 'react';

import { Form, Col, Row, Button, Alert } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

import axios from 'axios';
import moment from 'moment';
import DrawerMenu from '../../Componentes/DrawerMenu';

export default function Editar(props) {
   const [userData, setUserData] = useState({});
   const [redirect, setRedirect] = useState(false);
   const [message, setMessage] = useState();
   const [statusMsg, setStatusMsg] = useState();
   const [statusSelect, setStatusSelect] = useState();
   const [showAlert, setShowAlert] = useState(false);
   const [statusUser, setStatusUser] = useState();

   const clienteId = Number(props.match.params.usr_cod);

   const handleChange = (e) => {
      setUserData({ ...userData, [e.target.id]: e.target.value.trim() })
   };

   const handleSubmit = async (e) => {
      console.log(statusUser);
      try {
         e.preventDefault()
         const { data } = await axios({
            method: 'put',
            url: `http://209.97.146.187:18919/usuarios/alterar/${clienteId}`,
            data: {
               ...userData,
               usr_externalid: Number(userData.usr_externalid),
               usr_sus_cod: Number(userData.usr_sus_cod)
            },
         })

         if (data.meta.status == 100) {
            setRedirect(true);
         }

      } catch (error) {
         console.log(error)
      }
   };

   const requestData = async () => {
      try {
         const { data } = await axios({
            method: 'get',
            url: `http://209.97.146.187:18919/usuarios/procurar/${clienteId}`,
         })
         setUserData(data.data)
         setStatusUser(data.data.statusUser.sus_name);
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
      requestData();
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
         <DrawerMenu />
         <div className="cadastrar-container">
            <Col className="cadastrar-user" md={{ span: 6, offset: 3 }}>
               <Form onSubmit={handleSubmit}>
                  <Row bsPrefix="column">
                     <Col>
                        <Form.Group controlId="usr_dtcreation">
                           <Form.Label>Data Cadastro</Form.Label>
                           <Form.Control
                              type="date"
                              onChange={handleChange}
                              value={moment(userData?.usr_dtcreation).format("YYYY-MM-DD")}
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId="usr_dtupdate">
                           <Form.Label>Dados alterado</Form.Label>
                           <Form.Control
                              type="date"
                              onChange={handleChange}
                              value={moment(userData?.usr_dtupdate).format("YYYY-MM-DD")}
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId="usr_externalid">
                           <Form.Label>ID Externo:</Form.Label>
                           <Form.Control
                              type="number"
                              onChange={handleChange}
                              defaultValue={userData?.usr_externalid}
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