import { useState, useEffect } from "react"
import { CustomMenu } from "../../../Componentes/CustomMenu";
import { Form, Col, Row, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom"
import Select from 'react-select';

export default function UsuarioCompanhia(props) {
   const userId = Number(props.match.params.userId);

   const [showAlert, setShowAlert] = useState(false);
   const [message, setMessage] = useState();
   const [statusMsg, setStatusMsg] = useState();

   const [companys, setCompanys] = useState([])
   const [options, setOptions] = useState([])
   const [redirect, setRedirect] = useState(false);

   const onChange = selectedOptions => setOptions(selectedOptions);

   const handleSubmit = async (e) => {
      const cods = []
      options.forEach(item => cods.push({ "cpn_cod": item.value }))
      try {
         e.preventDefault()
         const { data } = await axios({
            method: 'post',
            url: "http://209.97.146.187:18919/user-companies/cadastrar",
            data: {
               user: { "usr_cod": userId },
               companies: cods
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

   const requestData = async (e) => {
      try {
         const { data } = await axios({
            method: 'get',
            url: `http://209.97.146.187:18919/companies/listar-user-company`,
         })

         data.data.map(company => company.usersCompanies.filter(userCompany => userCompany.usc_usr_cod === userId).map(result => {
            options.push({ value: company.cpn_cod, label: company.cpn_name })
         }))

         setCompanys(data.data)
      } catch (error) {
         console.log(error)
      }
   }

   var companysData = companys.filter(company => company.cpn_name !== null).map(result => {
      return ({ value: result.cpn_cod, label: result.cpn_name })
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
                           <Form.Label>ID Eduzz: </Form.Label>
                           <Form.Control
                              type="text"
                              value={userId}
                              disabled
                              required
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Select
                           value={options}
                           isMulti
                           onChange={onChange}
                           name="selectCompanys"
                           options={companysData}
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
                        Cadastrar
                     </Button>
                  </Row>
               </Form>
            </Col>
         </Col>
      </>
   );
}