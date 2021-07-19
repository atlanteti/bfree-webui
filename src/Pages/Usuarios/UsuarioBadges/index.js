import { useState, useEffect } from "react"
import { CustomMenu } from "../../../Componentes/CustomMenu";
import { Form, Col, Row, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom"
import Select from 'react-select';

export default function UsuarioBadges(props) {
   const userId = Number(props.match.params.userId);

   const [showAlert, setShowAlert] = useState(false);
   const [message, setMessage] = useState();
   const [statusMsg, setStatusMsg] = useState();

   const [badges, setBadges] = useState([])
   const [selected, setSelected] = useState([])
   const [redirect, setRedirect] = useState(false);

   const onChange = selectedOptions => setSelected(selectedOptions);

   const handleSubmit = async (e) => {
      const valuesUser = []
      selected.forEach(item => valuesUser.push({ "cpn_cod": item.value }))
      try {
         e.preventDefault()
         const { data } = await axios({
            method: 'post',
            url: "http://209.97.146.187:18919/user-companies/cadastrar",
            data: {
               user: { "usr_cod": userId },
               badges: valuesUser
            }
         })
         if (data.meta.status === 100) {
            setShowAlert(true);
            setMessage("Dados alterado com sucesso!");
            setStatusMsg('success')

            setTimeout(() => {
               setShowAlert(false);
               setTimeout(() => {
                  setRedirect(true);
               }, 1000);
            }, 1000);
         } else {
            setShowAlert(true);
            setMessage("Algo deu errado. Tente novamente!");
            setStatusMsg('warning');
         }
      } catch (error) {
         console.log(error)
      }
   };

   const requestData = async () => {
      try {
         const { data } = await axios({
            method: 'get',
            url: `http://209.97.146.187:18919/companies/listar-user-company`,
         })
         // revisar os valores
         data.data.map(badges => badges.usersBadges.filter(userBadges => userBadges.usc_usr_cod === userId).map(() => {
            return selected.push({ value: badges.bdg_cod, label: badges.bdg_name })
         }))

         setBadges(data.data)
      } catch (error) {
         console.log(error)
      }
   }

   var badgesData = badges.filter(badge => badge.bdg_name !== null).map(result => {
      return ({ value: result.bdg_cod, label: result.bdg_name })
   })

   useEffect(() => {
      requestData();
   }, [])

   if (redirect) {
      return <Redirect to="/usuarios" />
   }

   return (
      <>
         {showAlert &&
            <Col md={{ span: 4, offset: 3 }} style={{ marginTop: 20 }}>
               <Alert variant={statusMsg} onClose={() => setShowAlert(false)} dismissible>
                  {message}
               </Alert>
            </Col>
         }
         <CustomMenu />
         <Col >
            <Col style={{ marginTop: 48 }} md={{ span: 4, offset: 3 }}>
               <Form onSubmit={handleSubmit}>
                  <Row bsPrefix="column">
                     <Col>
                        <Form.Group>
                           <Form.Label>ID do Usuário: </Form.Label>
                           <Form.Control
                              type="text"
                              value={userId}
                              disabled
                              required
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Label>Badges: </Form.Label>
                        <Select
                           value={selected}
                           isMulti
                           onChange={onChange}
                           name="selectBadges"
                           options={badgesData}
                           className="basic-multi-select"
                           classNamePrefix="select"
                        />
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
                        Editar
                     </Button>
                  </Row>
               </Form>
            </Col>
         </Col>
      </>
   );
}