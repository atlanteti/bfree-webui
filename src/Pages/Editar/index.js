import React, { useEffect, useState } from 'react';

import { Form, Col, Row, Button } from 'react-bootstrap';
import CustomMenu from "../../Componentes/CustomMenu";
import { Redirect } from "react-router-dom";

import axios from 'axios';
import moment from 'moment';

export default function Editar(props) {
   const [userData, setUserData] = useState({});
   const [redirect, setRedirect] = useState(false);
   const clienteId = Number(props.match.params.usr_cod);

   const handleChange = (e) => {
      setUserData({ ...userData, [e.target.id]: e.target.value.trim() })
   };

   const handleSubmit = async (e) => {
      try {
         e.preventDefault()
         const response = await axios({
            method: 'put',
            url: `http://209.97.146.187:18919/usuarios/alterar/${clienteId}`,
            data: userData,
         })
         console.log(response)
         setRedirect(true);
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
      } catch (error) {
         console.log(error)
      }
   };

   useEffect(() => {
      requestData();
   }, [])

   if (redirect) {
      return <Redirect to="/home" />
   }

   return (
      <>
         <CustomMenu />
         <Col md={{ span: 6 }}>
            <Form onSubmit={handleSubmit}>
               <Row>
                  <Col>
                     <Form.Group controlId="cpfCnpj">
                        <Form.Label>CPF/CNPJ</Form.Label>
                        <Form.Control
                           type="text"
                           name="cpfCnpj"
                           placeholder="Digite o CPF/CNPJ"
                           onChange={handleChange}
                           defaultValue={userData?.cpfCnpj}
                        />
                     </Form.Group>
                  </Col>
                  <Col>
                     <Form.Group controlId="dataCadastro">
                        <Form.Label>Data Cadastro</Form.Label>
                        <Form.Control
                           type="date"
                           onChange={handleChange}
                           value={moment(userData.dataCadastro).format("YYYY-MM-DD")}
                        />
                     </Form.Group>
                  </Col>
               </Row>
               <Row>
                  <Col>
                     <Form.Group controlId="tipoPessoa">
                        <Form.Label>Tipo de Pessoa</Form.Label>
                        <Form.Control
                           as="select"
                           onChange={handleChange}
                           defaultValue={userData?.tipoPessoa}
                        >
                           <option>Pessoa Fisica</option>
                           <option>Pessoa Jurídica</option>
                        </Form.Control>
                     </Form.Group>
                  </Col>
                  <Col>
                     <Form.Group controlId="codigoSap">
                        <Form.Label>Código SAP</Form.Label>
                        <Form.Control
                           type="text"
                           onChange={handleChange}
                           defaultValue={userData?.codigoSap}
                        />
                     </Form.Group>
                  </Col>
               </Row>
               <Form.Group controlId="nome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                     type="text"
                     onChange={handleChange}
                     defaultValue={userData?.nome}
                  />
               </Form.Group>
               <Form.Group controlId="webSite">
                  <Form.Label>Web Site</Form.Label>
                  <Form.Control
                     type="text"
                     onChange={handleChange}
                     defaultValue={userData?.webSite}
                  />
               </Form.Group>
               <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                     type="email"
                     onChange={handleChange}
                     defaultValue={userData?.email}
                  />
               </Form.Group>
               <Row>
                  <Col>
                     <Form.Group controlId="inscricaoEstadual">
                        <Form.Label>Inscrição Estadual</Form.Label>
                        <Form.Control
                           type="text"
                           onChange={handleChange}
                           defaultValue={userData?.inscricaoEstadual}
                        />
                     </Form.Group>
                  </Col>
                  <Col>
                     <Form.Group controlId="cmc">
                        <Form.Label>CMC</Form.Label>
                        <Form.Control
                           type="text"
                           onChange={handleChange}
                           defaultValue={userData?.cmc}
                        />
                     </Form.Group>
                  </Col>
               </Row>
               <Form.Group controlId="emailNfe">
                  <Form.Label>Email NF-e</Form.Label>
                  <Form.Control type="email" onChange={handleChange} defaultValue={userData?.emailNfe} />
               </Form.Group>
               <Form.Group controlId="nomeRepresentante">
                  <Form.Label>Nome Representante</Form.Label>
                  <Form.Control type="text" onChange={handleChange} defaultValue={userData?.nomeRepresentante} />
               </Form.Group>
               <Row  className="d-flex flex-row-reverse">
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