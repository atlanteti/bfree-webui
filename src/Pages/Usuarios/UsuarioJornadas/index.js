import { useState, useEffect } from "react"
import { CustomMenu } from "../../../Componentes/CustomMenu";
import { Form, Col, Row, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom"
import Select from 'react-select';

export default function UsuarioJornadas(props) {
   const userId = Number(props.match.params.userId);

   const [showAlert, setShowAlert] = useState(false);
   const [message, setMessage] = useState();
   const [statusMsg, setStatusMsg] = useState();

   const [userData, setUserData] = useState();
   const [journeys, setJourneys] = useState([])
   const [options, setOptions] = useState([])
   const [redirect, setRedirect] = useState(false);

   const onChange = selectedOptions => setOptions(selectedOptions);

   const handleSubmit = async (e) => {
      const cods = []
      options.forEach(item => cods.push({ "jny_cod": item.value }))
      try {
         e.preventDefault()
         const { data } = await axios({
            method: 'post',
            url: "http://209.97.146.187:18919/user-jorneys/cadastrar",
            data: {
               user: { "usr_cod": userId },
               journeys: cods
            }
         })
         if (data.meta.status == 100) {
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
            url: `http://209.97.146.187:18919/jorneys/listar-user-jorney?userId=${userId}`,
         })

         data.data.filter(journey => journey.pertence === "S").map(result => {
            return options.push({ value: result.jny_cod, label: result.jny_name })
         });

         setJourneys(data.data)
      } catch (error) {
         console.log(error)
      }
   }

   const requestUser = async () => {
      try {
         const { data } = await axios({
            method: 'get',
            url: `http://209.97.146.187:18919/usuarios/procurar/${userId}`,
         })
         setUserData(data.data)
      } catch (error) {
         console.log(error)
      }
   };

   var journeyData = journeys.map(result => {
      return ({ value: result.jny_cod, label: result.jny_name })
   })

   useEffect(() => {
      requestData();
      requestUser();
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
                           <Form.Label>ID Eduzz: </Form.Label>
                           <Form.Control
                              type="text"
                              value={userData?.usr_cli_cod}
                              disabled
                              required
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Label>Jornadas: </Form.Label>
                        <Select
                           value={options}
                           isMulti
                           onChange={onChange}
                           name="selectBadges"
                           options={journeyData}
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