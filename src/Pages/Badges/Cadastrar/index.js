import { useState, useEffect, React } from 'react'
import { CustomMenu } from '../../../Componentes/CustomMenu'
import { Form, Col, Row, Button, Alert } from 'react-bootstrap'
import { Title } from './styles.js'
import moment from 'moment'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default function EditBadges(props) {
   const [redirect, setRedirect] = useState(false)
   const [showAlert, setShowAlert] = useState(false)
   const [message, setMessage] = useState()
   const [statusMsg, setStatusMsg] = useState()

   const [horaUpd, setHoraUpd] = useState()
   const [horaCriacao, setHoraCriacao] = useState()

   const [badges, setBadges] = useState({
      bdg_mentor: false
   })
   const [companys, setCompanys] = useState()
   const [jornada, setJornada] = useState()

   const [jornadaSelecionada, setJornadaSelecionada] = useState(null)
   const [status, setStatus] = useState(null)
   const [statusJorn, setStatusJorn] = useState(false)

   const paramRoute = props.match.params.param
   const badgeId = props.match.params.bdg_cod

   const handleChange = async (e) => {
      if (e.target.id === 'bdg_jny_cod') {
         jornada.filter(filterJornada => filterJornada.jny_cod === e.target.value.trim()).map(jorn => {
            setStatus(true)
            return setJornadaSelecionada(jorn)
         })
      }

      setBadges({ ...badges, [e.target.id]: e.target.value.trim() })

      if (e.target.id === 'bdg_jny_cod') {
         if (e.target.value === '') {
            setStatus(false)
         } else {
            setStatus(true)
         }
      }

      if (e.target.id === 'bdg_cpn_cod') {
         if (e.target.value === '') {
            setStatusJorn(false)
         } else {
            setStatusJorn(true)
         }
      }
   }

   const handleChangeMentor = (e) => {
      console.log(e.target.value)
      if (badges.bdg_mentor) {
         setBadges({ ...badges, [e.target.name]: false })
      } else {
         setBadges({ ...badges, [e.target.name]: true })
      }
   }

   const handleSubmit = async (e) => {
      try {
         e.preventDefault()
         if (paramRoute === 'inserir') {
            const { data } = await axios({
               method: 'post',
               url: 'http://209.97.146.187:18919/badges/cadastrar',
               data: {
                  ...badges,
                  bdg_jny_cod: badges.bdg_jny_cod == null ? (badges.bdg_jny_cod) : Number(badges.bdg_jny_cod),
                  bdg_cpn_cod: badges.bdg_cpn_cod == null ? (badges.bdg_cpn_cod) : Number(badges.bdg_cpn_cod)
               }
            })

            if (data.meta.status === 100) {
               setShowAlert(true)
               setMessage('Badge criada com sucesso!')
               setStatusMsg('success')

               setTimeout(() => {
                  setShowAlert(false)
                  setTimeout(() => {
                     setRedirect(true)
                  }, 500)
               }, 1000)
            } else {
               setShowAlert(true)
               setMessage('Algo deu errado. Tente novamente!')
               setStatusMsg('warning')
            }
         } else {
            const { data } = await axios({
               method: 'put',
               url: `http://209.97.146.187:18919/badges/alterar/${badgeId}`,
               data: {
                  ...badges,
                  bdg_jny_cod: badges.bdg_jny_cod == null ? (badges.bdg_jny_cod) : Number(badges.bdg_jny_cod),
                  bdg_cpn_cod: badges.bdg_cpn_cod == null ? (badges.bdg_cpn_cod) : Number(badges.bdg_cpn_cod)
               }
            })

            if (data.meta.status === 100) {
               setRedirect(true)
            }
         }
      } catch (error) {

      }
   }

   const requestCompanys = async () => {
      try {
         const { data } = await axios({
            method: 'get',
            url: 'http://209.97.146.187:18919/companies/listar-todos'
         })
         setCompanys(data.data)
      } catch (error) {

      }
   }

   const requestJorneys = async () => {
      try {
         const { data } = await axios({
            method: 'get',
            url: 'http://209.97.146.187:18919/jorneys/listar-todos'
         })
         setJornada(data.data)
      } catch (error) {

      }
   }

   const requestData = async () => {
      try {
         if (paramRoute === 'alterar') {
            const { data } = await axios({
               method: 'get',
               url: `http://209.97.146.187:18919/badges/procurar/${badgeId}`
            })

            setBadges(data.data)
            setHoraCriacao(moment(data.data.bdg_dtcreation).format('hh'))
            setHoraUpd(moment(data.data.bdg_dtupdate).format('hh'))
         }
      } catch (error) {

      }
   }

   if (jornadaSelecionada != null) {
      badges.bdg_cpn_cod = jornadaSelecionada.company.cpn_cod
   }

   useEffect(() => {
      requestData()
      requestCompanys()
      requestJorneys()
   }, [])

   if (redirect) {
      return <Redirect to="/badges" />
   }

   return (
      <>
         {showAlert &&
            <Col md={{ span: 5, offset: 2 }}>
               <Alert variant={statusMsg} onClose={() => setShowAlert(false)} dismissible>
                  {message}
               </Alert>
            </Col>
         }
         <Title>{paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Badge</Title>
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
                              onChange={handleChange}
                              defaultValue={badges?.bdg_name}
                              required
                           />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId="bdg_jny_cod">
                           <Form.Label>Jornadas: </Form.Label>
                           <Form.Control
                              as="select"
                              onChange={handleChange}
                              defaultValue={badges?.bdg_jny_cod}
                              disabled={statusJorn}
                           >
                              {badges.bdg_jny_cod === "" && (badges.bdg_jny_cod = null)}
                              <option selected value={null}></option>
                              <>
                                 {jornada?.map(jorn => {
                                    if (badges?.bdg_jny_cod === jorn.jny_cod) {
                                       return (
                                          <option
                                             selected key={jorn.jny_cod}
                                             value={jorn.jny_cod}
                                          >
                                             {jorn.jny_name}
                                          </option>)
                                    }
                                    return (
                                       <option
                                          key={jorn.jny_cod}
                                          value={jorn.jny_cod}
                                       >
                                          {jorn.jny_name}
                                       </option>)
                                 })}
                              </>
                           </Form.Control>
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group controlId="bdg_cpn_cod">
                           <Form.Label>Empresa: </Form.Label>
                           <Form.Control
                              as="select"
                              onChange={handleChange}
                              defaultValue={badges?.bdg_cpn_cod}
                              disabled={status}
                              name="bdg_cpn"
                           >
                              (
                              {badges.bdg_jny_cod == null && <option selected value={null}></option>}
                              <>
                                 {companys?.map(company => {
                                    if (badges?.bdg_cpn_cod === company.cpn_cod) {
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
                              </>
                           </Form.Control>
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Check
                           type="checkbox"
                           className="my-1 mr-sm-2"
                           id="customControlInline"
                           name="bdg_mentor"
                           label="Mentor"
                           custom
                           checked={badges.bdg_mentor}
                           onChange={handleChangeMentor}
                           defaultValue={badges.bdg_mentor}
                        />
                     </Col>
                  </Row>
                  {paramRoute === 'alterar' && (
                     <Row bsPrefix="column">
                        <Col>
                           <Form.Group controlId="bdg_dtcreation">
                              <Form.Label>Data de criação: </Form.Label>
                           </Form.Group>
                        </Col>
                        <Col style={{ marginBottom: 20 }}>
                           {moment(badges?.bdg_dtcreation).format('a') === 'pm'
                              ? (
                                 moment(badges?.bdg_dtcreation).format('DD-MM-YYYY') + ' ' + (parseInt(horaCriacao) + 12) + ':' + moment(badges?.bdg_dtcreation).format('mm')
                              )
                              : moment(badges?.bdg_dtcreation).format('DD-MM-YYYY hh:mm')
                           }
                        </Col>
                        {badges?.bdg_dtupdate !== null && (
                           <>
                              <Col>
                                 <Form.Group controlId="bdg_dtupdate">
                                    <Form.Label>Data de atualização: </Form.Label>
                                 </Form.Group>
                              </Col>
                              <Col>
                                 {moment(badges?.bdg_dtupdate).format('a') === 'pm'
                                    ? (
                                       moment(badges?.bdg_dtupdate).format('DD-MM-YYYY') + ' ' + (parseInt(horaUpd) + 12) + ':' + moment(badges?.bdg_dtupdate).format('mm')
                                    )
                                    : moment(badges?.bdg_dtupdate).format('DD-MM-YYYY hh:mm')
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
                        {paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'}
                     </Button>
                  </Row>
               </Form>
            </Col>
         </Col>
      </>
   )
}
