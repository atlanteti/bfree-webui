import { Redirect } from "react-router-dom";
import { Form, Col, Row, Button, Alert } from 'react-bootstrap';
import { useState } from "react";
import moment from "moment";
import { CustomMenu } from "../../../Componentes/CustomMenu";

export default function EditTJornadas() {
   const [jornada, setJornada] = useState();
   const [horaUpd, setHoraUpd] = useState();
   const [horaCriacao, setHoraCriacao] = useState();
   const [redirect, setRedirect] = useState(false);

   const handleChange = (e) => {
      setJornada({ ...jornada, [e.target.id]: e.target.value.trim() })
   };

   const handleSubmit = async (e) => {
      // try {
      //    e.preventDefault()
      //    if (paramRoute === "inserir") {
      //       const { data } = await axios({
      //          method: 'post',
      //          url: 'http://209.97.146.187:18919/companies/cadastrar',
      //          data: {
      //             ...companyData,
      //             cpn_cli_cod: Number(companyData.cpn_cli_cod)
      //          },
      //       })

      //       if (data.meta.status == 100) {
      //          setShowAlert(true);
      //          setMessage("Companhia cadastrada com sucesso!");
      //          setStatusMsg('success')

      //          setTimeout(() => {
      //             setShowAlert(false);
      //             setTimeout(() => {
      //                setRedirect(true);
      //             }, 2000);
      //          }, 4000);
      //       } else {
      //          setShowAlert(true);
      //          setMessage("Algo deu errado.Tente novamente!");
      //          setStatusMsg('warning');
      //       }
      //       console.log(data)
      //    } else {
      //       const { data } = await axios({
      //          method: 'put',
      //          url: `http://209.97.146.187:18919/companies/alterar/${companyId}`,
      //          data: {
      //             ...companyData,
      //             cpn_cli_cod: Number(companyData.cpn_cli_cod)
      //          },
      //       })

      //       if (data.meta.status == 100) {
      //          setRedirect(true);
      //       }
      //    }
      // } catch (error) {
      //    console.log(error)
      // }
   };

   function preventNonNumericalInput(e) {
      e = e || window.event;
      var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
      var charStr = String.fromCharCode(charCode);

      if (!charStr.match(/^[0-9]+$/))
         e.preventDefault();
   }

   if (redirect) {
      return <Redirect to="/jornada" />
   }
   return (
      <>
         <CustomMenu />
         <Col >
            <Col style={{ marginTop: 48 }} md={{ span: 4, offset: 3 }}>
               <Form onSubmit={handleSubmit}>
                  <Row bsPrefix="column">
                     <Col>

                        <Form.Group controlId="jny_name">
                           <Form.Label>ID Eduzz:</Form.Label>
                           <Form.Control
                              type="number"
                              onChange={handleChange}
                              defaultValue={jornada?.jny_name}
                              pattern="[1-9]"
                              required
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId="jny_cpn_cod">
                           <Form.Label >ID Externo:</Form.Label>
                           <Form.Control
                              type="number"
                              required
                              pattern="[1-9]"
                              maxLength="10"
                              onKeyPress={(e) => preventNonNumericalInput(e)}
                              onChange={handleChange}
                              defaultValue={jornada?.jny_cpn_cod}
                           />
                        </Form.Group>
                     </Col>
                  </Row>
                  {/* {paramRoute === "inserir" ? '' : (
                     <Row bsPrefix="column">
                        <Col>
                           <Form.Group controlId="usr_dtcreation">
                              <Form.Label>Data de criação: </Form.Label>
                           </Form.Group>
                        </Col>
                        <Col style={{ marginBottom: 20 }}>
                           
                           {moment(jornada?.usr_dtcreation).format("a") === "pm" ? (
                              moment(jornada?.usr_dtcreation).format("DD-MM-YYYY") + " " + (parseInt(horaCriacao) + 12) + ":" + moment(jornada?.usr_dtcreation).format("mm")
                           )
                              : moment(jornada?.usr_dtcreation).format("DD-MM-YYYY hh:mm")
                           }
                        </Col>
                        {jornada.usr_dtupdate === null ? "" : (
                           <>
                              <Col>
                                 <Form.Group controlId="usr_dtupdate">
                                    <Form.Label>Data de atualização: </Form.Label>
                                 </Form.Group>
                              </Col>
                              <Col>
                                
                                 {moment(jornada?.usr_dtupdate).format("a") === "pm" ? (
                                    moment(jornada?.usr_dtupdate).format("DD-MM-YYYY") + " " + (parseInt(horaUpd) + 12) + ":" + moment(jornada?.usr_dtupdate).format("mm")
                                 )
                                    : moment(jornada?.usr_dtcreation).format("DD-MM-YYYY hh:mm")
                                 }
                              </Col>
                           </>
                        )}
                     </Row>
                  )} */}
                  <Row style={{ marginTop: 30, marginBottom: 20 }}>
                     <Button
                        variant="danger" style={{ marginLeft: 30 }}
                        onClick={() => setRedirect(true)}
                     >
                        Cancelar
                     </Button>

                     <Button variant="warning" type="submit" style={{ marginLeft: 30 }}>
                        {/* {paramRoute === "inserir" ? "Cadastrar" : "Editar"} */} Cadastrar
                     </Button>
                  </Row>
               </Form>
            </Col>
         </Col>
      </>
   );
}