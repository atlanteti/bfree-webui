import React, { useEffect, useState } from 'react';

import { Form, Col, Row, Button, Alert } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

import axios from 'axios';
import moment from 'moment';
import { CustomMenu } from '../../../Componentes/CustomMenu';

export default function EditarJornada(props) {
   const [userData, setUserData] = useState({});
   const [redirect, setRedirect] = useState(false);
   const [message, setMessage] = useState();
   const [showAlert, setShowAlert] = useState(false);
   const [jornadas, setJornadas] = useState();
   const [usuarios, setUsuarios] = useState();
   const [user, setUser] = useState();
   const [horaUpd, setHoraUpd] = useState();
   const [horaCriacao, setHoraCriacao] = useState();

   const jornadaId = Number(props.match.params.jnu_cod);

   const handleChange = (e) => {
      setUserData({ ...userData, [e.target.id]: e.target.value.trim() })
   };

   const handleSubmit = async (e) => {
      try {
         e.preventDefault()
         const { data } = await axios({
            method: 'put',
            url: `http://209.97.146.187:18919/user-jorneys/alterar/${jornadaId}`,
            data: {
               ...userData,
               jnu_usr_cod: Number(userData.jnu_usr_cod),
               jnu_jny_cod: Number(userData.jnu_jny_cod)
            },
         })

         if (data.meta.status == 100) {
            setRedirect(true);
         } else {
            setShowAlert(true);
            setMessage("Algo deu errado. Tente novamente!")
         }

      } catch (error) {
         console.log(error)
      }
   };

   const requestUser = async (e) => {
      try {
         if (e) {
            e.preventDefault();
         }
         const { data } = await axios({
            method: "get",
            url: `http://209.97.146.187:18919/user-jorneys/procurar/${jornadaId}`,
         });
         setUser(data.data);
         setHoraCriacao(moment(data.data.jnu_dtcreation).format("hh"))
         setHoraUpd(moment(data.data.jnu_dtupdate).format("hh"))
         console.log(data.data)
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
            url: `http://209.97.146.187:18919/usuarios/listar`,
         });
         setUsuarios(data.data);
      } catch (error) {
         alert(error);
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
         setJornadas(data.data);
      } catch (error) {
         alert(error);
      }
   };

   useEffect(() => {
      requestUsers();
      requestUser();
      requestJornadas();
   }, [])

   if (redirect) {
      return <Redirect to="/jornadas" />
   }

   return (
      <>
         {showAlert &&
            <Col md={{ span: 6, offset: 2 }}>
               <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
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
                              {jornadas?.map(status => {
                                 if (user?.jorney.jny_cod == status.jny_cod) {
                                    return (<option selected key={status.jny_cod} value={status.jny_cod}>{status.jny_name}</option>)
                                 }
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
                                 if (user?.jnu_usr_cod == usuario.usr_cod) {
                                    return (<option selected key={usuario.usr_cod} value={usuario.usr_cod}>{usuario.usr_cod}</option>)
                                 }
                                 return (<option key={usuario.usr_cod} value={usuario.usr_cod}>{usuario.usr_cod}</option>)
                              })}
                           </Form.Control>
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId="jnu_dtcreation">
                           <Form.Label>Data de cadastramento:</Form.Label>
                        </Form.Group>
                     </Col>
                     <Col style={{ marginBottom: 20 }}>
                        {/* formatando data */}
                        {moment(user?.jnu_dtcreation).format("a") === "pm" ? (
                           moment(user?.jnu_dtcreation).format("DD-MM-YYYY") + " " + (parseInt(horaCriacao) + 12) + ":" + moment(user?.jnu_dtcreation).format("mm")
                        )
                           : moment(user?.jnu_dtcreation).format("DD-MM-YYYY hh:mm")
                        }
                     </Col>
                     <Col>
                        <Form.Group controlId="jnu_dtupdate">
                           <Form.Label>Data de atualização:</Form.Label>
                        </Form.Group>
                     </Col>
                     <Col style={{ marginBottom: 20 }}>
                        {/* formatando data */}
                        {moment(user?.jnu_dtupdate).format("a") === "pm" ? (
                           moment(user?.jnu_dtupdate).format("DD-MM-YYYY") + " " + (parseInt(horaUpd) + 12) + ":" + moment(user?.jnu_dtupdate).format("mm")
                        )
                           : moment(user?.jnu_dtupdate).format("DD-MM-YYYY hh:mm")
                        }
                     </Col>
                  </Row>
                  <Row style={{ marginTop: 30, marginBottom: 10 }}>
                     <Button
                        variant="danger" style={{ marginLeft: 30 }}
                        onClick={() => setRedirect(true)}
                     >
                        Cancelar
                     </Button>

                     <Button variant="warning" type="submit" style={{ marginLeft: 30 }}>
                        Alterar
                     </Button>
                  </Row>
               </Form>
            </Col>
         </Col>
      </>
   )
}