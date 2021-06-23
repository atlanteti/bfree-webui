import React, { useEffect, useState } from 'react';

import { Form, Col, Row, Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

import axios from 'axios';
import moment from 'moment';
import DrawerMenu from '../../Componentes/DrawerMenu';

export default function Editar(props) {
   const [userData, setUserData] = useState({});
   const [redirect, setRedirect] = useState(false);
   const [userStatus, setUserStatus] = useState();
   const clienteId = Number(props.match.params.usr_cod);

   const handleChange = (e) => {
      setUserData({ ...userData, [e.target.id]: e.target.value.trim() })
   };

   const handleSubmit = async (e) => {
      console.log(Number(userData.usr_externalid));
      try {
         e.preventDefault()
         const { data } = await axios({
            method: 'put',
            url: `http://209.97.146.187:18919/usuarios/alterar/${clienteId}`,
            data: { ...userData, usr_externalid: Number(userData.usr_externalid) },
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
         setUserStatus(data.data.statusUsuario.sus_name);
      } catch (error) {
         console.log(error)
      }
   };

   useEffect(() => {
      requestData();
   }, [])

   if (redirect) {
      return <Redirect to="/" />
   }

   return (
      <>
         <DrawerMenu />
         <Col md={{ span: 6, offset: 2}}>
            <Form onSubmit={handleSubmit}>
               <Row>
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
               </Row>
               <Row>
                  <Col md={6}>
                     <Form.Group controlId="statusUsuario">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                           as="select"
                           onChange={handleChange}
                           defaultValue={userStatus}
                        >
                           <option>Ativo</option>
                           <option>Inativo</option>
                        </Form.Control>
                     </Form.Group>
                  </Col>
               </Row>
               <Row className="d-flex flex-row-reverse">
                  <Button variant="primary" type="submit">
                     Alterar
                  </Button>
                  <Button
                     style={{ marginRight: "10px" }}
                     variant="danger"
                     onClick={() => setRedirect(true)}
                  >
                     Cancelar
                  </Button>
               </Row>
            </Form>
         </Col>
      </>
   )
}