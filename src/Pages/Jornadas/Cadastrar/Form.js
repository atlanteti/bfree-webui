import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik';
import yup from "../../../Services/validations";
import { request } from '../../../Services/api';
import { DefaultValidationTextField } from '../../../Componentes/FormikComponents/DefaultValidationTextField';
import { Col, Row, Button } from 'react-bootstrap'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { BackGroundForm, BtnBlue, TitleRegister } from '../../../styles/CommonStyles'
import { IoChevronBackCircleSharp } from "react-icons/io5"
import { Timestamps } from '../../../Componentes/FormikComponents/Timestamps';
import { ListCompanies } from '../../../Componentes/FormikComponents/ListCompanies';

export const JourneyForm = (props) => {
   const [primaryData, setPrimaryData] = useState()
   const [fields, setFields] = useState(
      {
         jny_name: "",
         jny_cpn_cod: "",
      }
   )
   let method = "post"
   let postEndpoint = "journeys/cadastrar"
   if (props.paramRoute !== "inserir") {
      postEndpoint = "journeys/alterar/" + props.primaryId
      method = "put"
   }
   useEffect(() => {
      let tempFields = {}
      const requestData = async () => {
         try {
            const data = await request({
               method: "get",
               endpoint: "journeys/procurar/" + props.primaryId,
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
      jny_name: yup.string().max(45).required(),
      jny_cpn_cod: yup.number().required(),
   })
   return (
      <>
         <ButtonRow
            cancelButton={<Button variant="light" onClick={props.redirectCallback}><IoChevronBackCircleSharp size={30} color="#BFCADD" /></Button>}
            titlePage={<TitleRegister>{props.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Jornada</TitleRegister>}
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
            >{({ }) => (
               <Form id="mainForm">
                  <Row>
                     <Col className="mt-3" xs={12} sm={5}>
                        <DefaultValidationTextField
                           name="jny_name"
                           label="Nome"
                           type="text"
                           maxLength="45"
                        />
                     </Col>
                     <Col className="mt-3" xs={12} sm={5}>
                        <ListCompanies
                           name="jny_cpn_cod"
                           label="Empresa"
                        />
                     </Col>
                     <Col className="mt-4" xs={12} sm={2}>
                        <BtnBlue data-cy="journeyform-submit-button" variant="dark" type="submit">Salvar</BtnBlue>
                     </Col>
                  </Row>
                  {(props.paramRoute !== "inserir" && primaryData) ?
                     <>
                        <Timestamps
                           primaryData={primaryData}
                           fieldSuffix="jny_" />
                     </>
                     : null}
               </Form>
            )}
            </Formik>
         </BackGroundForm>
      </>
   )
}
