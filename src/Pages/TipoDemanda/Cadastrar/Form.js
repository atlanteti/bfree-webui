import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik';
import yup from "../../../Services/validations";
import { request } from '../../../Services/api';
import { Col, Row, Button } from 'react-bootstrap'
import { DefaultValidationTextField } from '../../../Componentes/FormikComponents/DefaultValidationTextField';
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { BackGroundForm, BtnBlue, TitleRegister } from '../../../styles/CommonStyles'
import { IoChevronBackCircleSharp } from "react-icons/io5"
import { Timestamps } from '../../../Componentes/FormikComponents/Timestamps';
import { ListCompanies } from '../../../Componentes/FormikComponents/ListCompanies';

export const TypeDemandForm = (props) => {
   const [primaryData, setPrimaryData] = useState()
   const [fields, setFields] = useState(
      {
         tdm_name: "",
         tdm_cpn_cod: "",
      }
   )
   let method = "post"
   let postEndpoint = "types-demand/cadastrar"
   if (props.paramRoute !== "inserir") {
      postEndpoint = "types-demand/alterar/" + props.primaryId
      method = "put"
   }
   useEffect(() => {
      let tempFields = {}
      const requestData = async () => {
         try {
            const data = await request({
               method: "get",
               endpoint: "types-demand/procurar/" + props.primaryId,
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
      tdm_name: yup.string().max(45).required(),
      tdm_cpn_cod: yup.number().required(),
   })
   return (
      <>
         <ButtonRow
            cancelButton={<Button variant="light" onClick={props.redirectCallback}><IoChevronBackCircleSharp size={30} color="#BFCADD" /></Button>}
            titlePage={<TitleRegister>{props.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Tipos de Demandas</TitleRegister>}
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
                           name="tdm_name"
                           label="Nome"
                           type="text"
                           maxLength="45"
                        />
                     </Col>
                     <Col className="mt-3" xs={12} sm={5}>
                        <ListCompanies
                           name="tdm_cpn_cod"
                           label="Empresa"
                        />
                     </Col>
                     <Col className="mt-4" xs={12} sm={2}>
                        <BtnBlue variant="dark" type="submit">Salvar</BtnBlue>
                     </Col>
                  </Row>
                  {(props.paramRoute !== "inserir" && primaryData) ?
                     <>
                        <Timestamps
                           primaryData={primaryData}
                           fieldSuffix="tdm_" />
                     </>
                     : null}
               </Form>
            )}
            </Formik>
         </BackGroundForm>
      </>
   )
}
