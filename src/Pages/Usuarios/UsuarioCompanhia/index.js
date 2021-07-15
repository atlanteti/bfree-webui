import { useState, useEffect } from "react"
import { CustomMenu } from "../../../Componentes/CustomMenu";
import { Form, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom"

export default function UsuarioCompanhia(props) {
   const userId = Number(props.match.params.userId);

   const [redirect, setRedirect] = useState(false);

   const handleSubmit = async (e) => {
      try {
         e.preventDefault()
         const { data } = await axios({
            method: 'post',
            url: "",
            data: {
            }
         })

      } catch (error) {
         console.log(error)
      }
   };

   const requestData = async (e) => {
      try {
         const { data } = await axios({
            method: 'get',
            url: `http://209.97.146.187:18919/usuarios/procurar/${userId}`,
         })
         console.log(data.data)
      } catch (error) {
         console.log(error)
      }
   }

   useEffect(() => {
      requestData();
   })

   if (redirect) {
      return <Redirect to="/usuarios" />
   }


   return (
      <>
         <CustomMenu />
         <Col >
            <Col style={{ marginTop: 48 }} md={{ span: 4, offset: 3 }}>
               <Form onSubmit={handleSubmit}>
                  <Row bsPrefix="column">
                     <Col>
                        <Form.Group controlId="bdg_name">
                           <Form.Label>Nome: </Form.Label>
                           <Form.Control
                              type="text"
                              // onChange={handleChange}
                              // defaultValue={badges?.bdg_name}
                              required
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId="bdg_cpn_cod">
                           <Form.Label>Empresa: </Form.Label>
                           <Form.Control
                              as="select"
                           // onChange={handleChange}
                           // defaultValue={badges?.bdg_cpn_cod}
                           >
                              {/* (
                              {badges.bdg_jny_cod == null && <option selected value={null}></option>}
                              <>
                                 {companys?.map(company => {
                                    if (badges?.bdg_cpn_cod == company.cpn_cod) {
                                       return (
                                          <option
                                             selected
                                             key={company.cpn_cod}
                                             value={company.cpn_cod}
                                          >
                                             {company.cpn_name}
                                          </option>)
                                    }
                                    return (
                                       <option
                                          key={company.cpn_cod}
                                          value={company.cpn_cod}
                                       >
                                          {company.cpn_name}
                                       </option>)
                                 })}
                                 {badges.bdg_jny_cod == null && (badges.bdg_cpn_cod == null) ? badges.bdg_cpn_cod = null : badges.bdg_cpn_cod}
                              </> */}
                           </Form.Control>
                        </Form.Group>
                     </Col>
                  </Row>
                  <Row style={{ marginTop: 30, marginBottom: 20 }}>
                     <Button
                        variant="danger" style={{ marginLeft: 30 }}
                        onClick={() => setRedirect(true)}
                     >
                        Cancelar
                     </Button>

                     <Button variant="warning" type="submit" style={{ marginLeft: 30 }}>
                        Cadastrar
                     </Button>
                  </Row>
               </Form>
            </Col>
         </Col>
      </>
   );
}