import React, { useEffect, useState } from 'react'
import yup from "../../../Services/validations";
import { Form, Formik } from 'formik';
import { Col, Row, Button } from 'react-bootstrap'
import { DefaultValidationTextField } from '../../../Componentes/FormikComponents/DefaultValidationTextField';
import { request } from '../../../Services/api';
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { CheckBox } from '../../../Componentes/CheckBox'
import { BackGroundForm, BtnBlue, TitleRegister } from '../../../styles/CommonStyles'
import { IoChevronBackCircleSharp } from "react-icons/io5"
import { ListCompanies } from '../../../Componentes/FormikComponents/ListCompanies';
import ListJourneysControlled from "../../../Componentes/ListJourneysControlled"
import { Timestamps } from '../../../Componentes/FormikComponents/Timestamps';

export const BadgeForm = (props) => {
   const [primaryData, setPrimaryData] = useState()
   const [fields, setFields] = useState(
      {
         bdg_name: "",
         bdg_cpn_cod: "",
         bdg_mentor: false,
         bdg_jny_cod: "",
         bdg_description: "",
         bdg_detail: "",
      }
   )
   const [disableJourney, setDisableJourney] = useState(false);
   const [disableCompany, setDisableCompany] = useState(false);
   let method = "post"
   let postEndpoint = "badges/cadastrar"
   if (props.paramRoute !== "inserir") {
      postEndpoint = "badges/alterar/" + props.primaryId
      method = "put"
   }
   useEffect(() => {
      let tempFields = {}
      const requestData = async () => {
         try {
            const data = await request({
               method: "get",
               endpoint: "badges/procurar/" + props.primaryId,
            });
            setPrimaryData(data.data)
            for (const key of Object.keys(fields)) {
               if (data.data[key] !== null) {
                  tempFields[key] = data.data[key]
               }
               else {
                  tempFields[key] = ""
               }
            }
            if (tempFields['bdg_cpn_cod'] !== "" && tempFields['bdg_jny_cod'] === "") {
               setDisableJourney(true)
            }
            if (tempFields['bdg_jny_cod'] !== "") {
               setDisableCompany(true)
            }
            setFields(tempFields)
         } catch (error) {
            console.log(error);
         }
      }
      if (props.paramRoute !== "inserir") {
         requestData();
      }
   }, [])
   let validationSchema = yup.object({
      bdg_name: yup.string().max(45).required(),
      bdg_description: yup.string().max(400).required(),
      bdg_detail: yup.string().max(400).required(),
   })
   return (
      <>
         <ButtonRow
            cancelButton={<Button variant="light" onClick={props.redirectCallback}><IoChevronBackCircleSharp size={30} color="#BFCADD" /></Button>}
            titlePage={<TitleRegister>{props.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Badge</TitleRegister>}
         />
         <BackGroundForm xs={1} className={'mb-2'} noGutters>
            <Formik
               htmlFor="mainForm"
               initialValues={fields}
               validateOnBlur={false}
               validationSchema={validationSchema}
               onSubmit={
                  async (values, { setSubmitting, setFieldError }) => {
                     const data = await request({
                        method: method,
                        endpoint: postEndpoint,
                        data: {
                           ...values,
                        },
                     });
                     if (data.meta.status === 100) {
                        props.showAlert(data.meta)
                     }
                     else if (data.meta.status === 212) {
                        props.showAlert(data.meta)
                     }
                     if (data.meta.status === 422) {
                        setFieldError(data.data[0].field.toLowerCase(), data.data[0].message)
                     }
                     else {
                        console.log("Uncaught exception")
                     }
                     setSubmitting(false);
                  }
               }
               enableReinitialize
            >{({ setFieldValue, values }) => (
               <Form id="mainForm">
                  <Row>
                     <Col className="mt-3" xs={12} sm={6}>
                        <DefaultValidationTextField
                           name="bdg_name"
                           label="Nome"
                           type="text"
                           maxLength="45"
                        />
                     </Col>
                     <Col className="mt-3" xs={12} sm={6}>
                        <ListCompanies
                           disabled={disableCompany}
                           name="bdg_cpn_cod"
                           label="Empresa"
                           onChange={(event) => {
                              if (event.target.value !== null && event.target.value !== "") {
                                 setDisableJourney(true)
                              }
                              else {
                                 setDisableJourney(false)
                              }
                              setFieldValue("bdg_cpn_cod", event.target.value)
                              setFieldValue("bdg_jny_cod", null)
                           }}
                           notRequired
                        />
                     </Col>
                  </Row>
                  <Row>
                     <Col className="mt-3" xs={12} sm={6}>
                        <CheckBox
                           data-cy="badgeform-mentorshipbadge-checkbox"
                           label="É badge de mentoria?"
                           name="bdg_mentor"
                           onChange={() => setFieldValue("bdg_mentor", !values.bdg_mentor)}
                           checked={values.bdg_mentor}
                        />
                     </Col>
                     <Col className="mt-3" xs={12} sm={6}>
                        <ListJourneysControlled
                           disabled={disableJourney}
                           name="bdg_jny_cod"
                           value={values.bdg_jny_cod}
                           onChange={(event) => {
                              let cpn_value;
                              if (event.jny_cpn_cod !== undefined) {
                                 setDisableCompany(true)
                                 cpn_value = event.jny_cpn_cod
                              }
                              else {
                                 setDisableCompany(false)
                                 cpn_value = ""
                              }
                              setFieldValue("bdg_jny_cod", event.value)
                              setFieldValue("bdg_cpn_cod", cpn_value)
                           }}
                        />
                     </Col>
                  </Row>
                  <Row>
                     <Col className="mt-4">
                        <DefaultValidationTextField
                           name="bdg_description"
                           label="Descrição"
                           type="textarea"
                           maxLength="400"
                           multiline
                           rows={4}
                        />
                     </Col>
                  </Row>
                  <Row>
                     <Col className="mt-4">
                        <DefaultValidationTextField
                           name="bdg_detail"
                           label="Motivadores"
                           type="textarea"
                           maxLength="400"
                           multiline
                           rows={4}
                        />
                     </Col>
                  </Row>
                  {(props.paramRoute !== "inserir" && primaryData) ?
                     <>
                        <Timestamps
                           primaryData={primaryData}
                           fieldSuffix="bdg_" />
                     </>
                     : null}
                  <Row>
                     <Col md={{ offset: 5 }} className="mt-4">
                        <BtnBlue data-cy="badgeform-submit-button" variant="dark" type="submit">Salvar</BtnBlue>
                     </Col>
                  </Row>
               </Form>
            )}
            </Formik>
         </BackGroundForm>
      </>
   )
}