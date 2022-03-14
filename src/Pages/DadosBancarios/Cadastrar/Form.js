import { Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useScroll } from "../../../Hooks"
import { Button, Col, Row } from 'react-bootstrap';
import { request } from '../../../Services/api';
import yup from "../../../Services/validations";
import { BackGroundForm, BtnBlue, TitleRegister } from '../../../styles/CommonStyles';
import { DefaultValidationTextField, preventNonNumericalInput } from '../../../Componentes/FormikComponents/DefaultValidationTextField';
import { Timestamps } from '../../../Componentes/FormikComponents/Timestamps';
import { ButtonRow } from '../../../Componentes/ButtonRow';
import { IoChevronBackCircleSharp } from 'react-icons/io5';
export const DadosBancariosForm = (props) => {
   const [primaryData, setPrimaryData] = useState()
   const [fields, setFields] = useState(
      {
         usr_name: "",
         usr_phone: "",
         usr_email: "",
         usr_cli_cod: "",
         usr_externalid: "",
         usr_sus_cod: "",
      }
   )
   const [pageTop, scrollToTop] = useScroll()
   let method = "post"
   const entryRequestEndpoint = "usuarios/procurar/";
   let postEndpoint = "usuarios/cadastrar"
   if (props.paramRoute !== "inserir") {
      postEndpoint = "usuarios/alterar/" + props.primaryId
      method = "put"
   }
   useEffect(() => {
      const requestData = async () => {
         try {
            const data = await request({
               method: "get",
               endpoint: entryRequestEndpoint + props.primaryId,
            });
            setPrimaryData(data.data)
            let tempFields = {}
            for (const key of Object.keys(fields)) {
               if (data.data[key] !== null) {
                  if (key.includes("phone")) {
                     tempFields[key] = data.data[key].replace(/[^\d]g/, "")
                  }
                  else {
                     tempFields[key] = data.data[key]
                  }
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
   }, [props])
   return (
      <React.Fragment>
         <ButtonRow
            cancelButton={<Button variant="light" onClick={props.redirectCallback}><IoChevronBackCircleSharp size={30} color="#BFCADD" /></Button>}
            titlePage={<TitleRegister ref={pageTop}>{props.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Dados Bancários</TitleRegister>}
         />
         <BackGroundForm xs={1} className={'mb-2'} noGutters>
            <Formik
               htmlFor="mainForm"
               initialValues={fields}
               validationSchema={yup.object({
                  usr_name: yup.string().max(200).required(),
                  usr_phone: yup.string().required()
                     .test('valid-phone', "Deve estar no formato (99) 9999-9999 ou (99) 99999-9999",
                        (value, context) => {
                           if (value !== undefined) {
                              return (!!value.match(/\d{10,11}/) ||
                                 value.trim().length >= 14)
                           }
                           return true
                        }),
                  usr_email: yup.string().email().required(),
                  usr_cli_cod: yup.string().max(10).required(),
                  usr_externalid: yup.string().max(10),
                  usr_sus_cod: yup.number().required(),
               })}
               onSubmit={
                  async (values, { setSubmitting, setFieldError }) => {
                     Object.keys(values).forEach((key) => {
                        if (key && key.includes("phone")) {
                           values[key] = values[key].replaceAll(/[^\d]/g, "")
                        }
                     })
                     const data = await request({
                        method: method,
                        endpoint: postEndpoint,
                        data: values,
                     });
                     if (data.meta.status == 100) {
                        props.showAlert(data.meta)
                     }
                     else if (data.meta.status == 212) {
                        props.showAlert(data.meta)
                     }
                     if (data.meta.status == 422) {
                        setFieldError(data.data[0].field.toLowerCase(), data.data[0].message)
                        props.showAlert(
                           {
                              responseType: "WARNING",
                              message: "Alguns campos não foram preenchidos corretamente"
                           }
                        )
                     }
                     else {
                        console.log("Uncaught exception")
                     }
                     setSubmitting(false);
                  }
               }
               enableReinitialize
            >{({ setFieldValue, handleChange, submitForm }) => (
               <Form id="mainForm">
                  <Row>
                     <Col className="mt-3" xs={12} sm={4}>
                        <DefaultValidationTextField
                           onKeyPress={preventNonNumericalInput}
                           label="CPF"
                           name="usr_name"
                           type="text"
                           maxLength="15" />
                     </Col>
                     <Col className="mt-3" xs={12} sm={4}>
                        <DefaultValidationTextField
                           label="Tipo do Pix"
                           name="usr_email"
                           type="text"
                           maxLength="45" />
                     </Col>
                     <Col className="mt-3" xs={12} sm={4}>
                        <DefaultValidationTextField
                           label="Pix"
                           name="usr_email"
                           type="text"
                           maxLength="45" />
                     </Col>
                  </Row>
                  <Row>
                     <Col className="mt-3" xs={12} sm={3}>
                        <DefaultValidationTextField
                           label="Banco"
                           name="usr_cli_cod"
                           type="text"
                           maxLength="10" />
                     </Col>
                     <Col className="mt-3" xs={12} sm={3}>
                        <DefaultValidationTextField
                           label="Agência"
                           name="usr_externalid"
                           type="text"
                           maxLength="10" />
                     </Col>
                     <Col className="mt-3" xs={12} sm={3}>
                        <DefaultValidationTextField
                           onKeyPress={preventNonNumericalInput}
                           label="Conta"
                           name="usr_externalid"
                           type="text"
                           maxLength="10" />
                     </Col>
                     <Col className="mt-3" xs={12} sm={3}>
                        <DefaultValidationTextField
                           label="Tipo de Conta"
                           name="usr_externalid"
                           type="text"
                           maxLength="10" />
                     </Col>
                  </Row>
                  {(props.paramRoute !== "inserir" && primaryData) ?
                     <Timestamps
                        primaryData={primaryData}
                        fieldSuffix="usr_" /> : null}
                  <Row>
                     <Col className="mt-3" md={{ offset: 5 }}>
                        <BtnBlue variant="dark" type="submit" onClick={scrollToTop}>Salvar</BtnBlue>
                     </Col>
                  </Row>
               </Form>
            )}
            </Formik>
         </BackGroundForm>
      </React.Fragment>
   );
};
