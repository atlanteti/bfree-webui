import { Redirect } from "react-router-dom";
import { Form, Col, Row, Button, Alert } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { Title } from "./styles.js"
import moment from "moment";
import axios from "axios";
import { CustomMenu } from "../../../Componentes/CustomMenu";

export default function EditTJornadas(props) {
   const [jornada, setJornada] = useState();
   const [companys, setCompanys] = useState();

   const [horaUpd, setHoraUpd] = useState();
   const [horaCriacao, setHoraCriacao] = useState();

   const [redirect, setRedirect] = useState(false);
   const [showAlert, setShowAlert] = useState(false);
   const [message, setMessage] = useState();
   const [statusMsg, setStatusMsg] = useState();

   const paramRoute = props.match.params.param;
   const jornadaId = props.match.params.jny_cod;

   

   const handleChange = (e) => {
      setJornada({ ...jornada, [e.target.id]: e.target.value.trim() })
   };

   const handleSubmit = async (e) => {
      
      try {
         e.preventDefault()
         if (paramRoute === "inserir") {
            const { data } = await axios({
               method: 'post',
               url: 'http://209.97.146.187:18919/jorneys/cadastrar',
               data: {
                  ...jornada,
                  jny_cpn_cod: Number(jornada.jny_cpn_cod)
               }
            })

            if (data.meta.status == 100) {
               setShowAlert(true);
               setMessage("Jornada cadastrada com sucesso!");
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
         } else {
            const { data } = await axios({
               method: 'put',
               url: `http://209.97.146.187:18919/jorneys/alterar/${jornadaId}`,
               data: {
                  ...jornada,
                  jny_cpn_cod: Number(jornada.jny_cpn_cod)
               },
            })

            if (data.meta.status == 100) {
               setRedirect(true);
            }
         }
      } catch (error) {
         
      }
   };

   const requestCompanys = async (e) => {
      try {
         const { data } = await axios({
            method: "get",
            url: "http://209.97.146.187:18919/companies/listar"
         })
         setCompanys(data.data);
         
      } catch (error) {
         
      }
   }

   const requestData = async () => {
      try {
         const { data } = await axios({
            method: 'get',
            url: `http://209.97.146.187:18919/jorneys/procurar/${jornadaId}`,
         })
         
         setJornada(data.data)
         setHoraCriacao(moment(data.data.usr_dtcreation).format("hh"))
         setHoraUpd(moment(data.data.usr_dtupdate).format("hh"))
      } catch (error) {
         
      }
   };

   useEffect(() => {
      requestData();
      requestCompanys();
   }, [])

   if (redirect) {
      return <Redirect to="/jornadas" />
   }

   return (
      <>
         {showAlert &&
            <Col md={{ span: 8, offset: 2 }}>
               <Alert variant={statusMsg} onClose={() => setShowAlert(false)} dismissible>
                  {message}
               </Alert>
            </Col>
         }
         <Title>{paramRoute === "inserir" ? "Cadastrar" : "Editar"} Jornada</Title>
         <CustomMenu />
         <Col >
            <Col style={{ marginTop: 48 }} md={{ span: 4, offset: 3 }}>
               <Form onSubmit={handleSubmit}>
                  <Row bsPrefix="column">
                     <Col>
                        <Form.Group controlId="jny_name">
                           <Form.Label>Nome: </Form.Label>
                           <Form.Control
                              type="text"
                              onChange={handleChange}
                              defaultValue={jornada?.jny_name}
                              required
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId="jny_cpn_cod">
                           <Form.Label >Empresa: </Form.Label>
                           <Form.Control
                              as="select"
                              required="required"
                              onChange={handleChange}
                              defaultValue={jornada?.jny_cpn_cod}
                           >
                              <option value={null}></option>
                              {companys?.map(company => {
                                 return (<option key={company.cpn_cod} value={company.cpn_cod}>{company.cpn_name}</option>)
                              })}
                           </Form.Control>
                        </Form.Group>
                     </Col>
                  </Row>
                  {paramRoute === "inserir" ? '' : (
                     <Row bsPrefix="column">
                        <Col>
                           <Form.Group controlId="jny_dtcreation">
                              <Form.Label>Data de criação: </Form.Label>
                           </Form.Group>
                        </Col>
                        <Col style={{ marginBottom: 20 }}>

                           {moment(jornada?.jny_dtcreation).format("a") === "pm" ? (
                              moment(jornada?.jny_dtcreation).format("DD-MM-YYYY") + " " + (parseInt(horaCriacao) + 12) + ":" + moment(jornada?.jny_dtcreation).format("mm")
                           )
                              : moment(jornada?.jny_dtcreation).format("DD-MM-YYYY hh:mm")
                           }
                        </Col>
                        {jornada?.jny_dtupdate === null ? "" : (
                           <>
                              <Col>
                                 <Form.Group controlId="jny_dtupdate">
                                    <Form.Label>Data de atualização: </Form.Label>
                                 </Form.Group>
                              </Col>
                              <Col>
                                 {moment(jornada?.jny_dtupdate).format("a") === "pm" ? (
                                    moment(jornada?.jny_dtupdate).format("DD-MM-YYYY") + " " + (parseInt(horaUpd) + 12) + ":" + moment(jornada?.jny_dtupdate).format("mm")
                                 )
                                    : moment(jornada?.jny_dtcreation).format("DD-MM-YYYY hh:mm")
                                 }
                              </Col>
                           </>
                        )}
                     </Row>
                  )}
                  <Row style={{ marginTop: 30, marginBottom: 20 }}>
                     <Button
                        variant="danger" style={{ marginLeft: 30 }}
                        onClick={() => setRedirect(true)}
                     >
                        Cancelar
                     </Button>

                     <Button variant="warning" type="submit" style={{ marginLeft: 30 }}>
                        {paramRoute === "inserir" ? "Cadastrar" : "Editar"}
                     </Button>
                  </Row>
               </Form>
            </Col>
         </Col>
      </>
   );
}