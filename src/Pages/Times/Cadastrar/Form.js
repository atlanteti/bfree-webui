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
import { MenuItem } from '@mui/material';

export const TeamForm = (props) => {
   const [primaryData, setPrimaryData] = useState()
   const [fields, setFields] = useState(
      {
         tea_name: "",
         tea_cpn_cod: "",
         tea_active: ""
      }
   )
   let method = "post"
   let postEndpoint = "teams/cadastrar"
   if (props.paramRoute !== "inserir") {
      postEndpoint = "teams/alterar/" + props.primaryId
      method = "put"
   }
   useEffect(() => {
      let tempFields = {}
      const requestData = async () => {
         try {
            const data = await request({
               method: "get",
               endpoint: "teams/procurar/" + props.primaryId,
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
      tea_name: yup.string().max(45).required(),
      tea_active: yup.bool().required()
   })
   return (
      <>
         <ButtonRow
            cancelButton={<Button variant="light" onClick={props.redirectCallback}><IoChevronBackCircleSharp size={30} color="#BFCADD" /></Button>}
            titlePage={<TitleRegister>{props.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Time</TitleRegister>}
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
                     <Col className="mt-3" xs={12} sm={3}>
                        <DefaultValidationTextField
                           name="tea_name"
                           label="Nome"
                           type="text"
                           maxLength="45"
                        />
                     </Col>
                     <Col className="mt-3" xs={12} sm={3}>
                        <ListCompanies
                           name="tea_cpn_cod"
                           label="Empresa"
                        />
                     </Col>
                     <Col className="mt-3" xs={12} sm={3}>
                        <DefaultValidationTextField
                           name="tea_active"
                           label="Status"
                           select>
                           <MenuItem key={1} value={true}>Ativo</MenuItem>
                           <MenuItem key={2} value={false}>Inativo</MenuItem>
                        </DefaultValidationTextField>
                     </Col>
                     <Col className="mt-4" xs={12} sm={2}>
                        <BtnBlue variant="dark" type="submit">Salvar</BtnBlue>
                     </Col>
                  </Row>
                  {(props.paramRoute !== "inserir" && primaryData) ?
                     <>
                        <Timestamps
                           primaryData={primaryData}
                           fieldSuffix="tea_" />
                     </>
                     : null}
               </Form>
            )}
            </Formik>
         </BackGroundForm>
      </>
   )
}
