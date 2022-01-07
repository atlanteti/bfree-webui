import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useScroll } from '../../../Hooks';
import { Button, Col, Row } from 'react-bootstrap';
import { IoChevronBackCircleSharp } from 'react-icons/io5';
import { ButtonRow } from '../../../Componentes/ButtonRow';
import { DatePickerField } from '../../../Componentes/FormikComponents/DatePickerField';
import { DefaultValidationTextField } from '../../../Componentes/FormikComponents/DefaultValidationTextField';
import { ListStatusDemands } from '../../../Componentes/FormikComponents/ListStatusDemands';
import { ListTypeDemand } from '../../../Componentes/FormikComponents/ListTypeDemand';
import { ListUsers } from '../../../Componentes/FormikComponents/ListUsers';
import { PhoneInput } from '../../../Componentes/FormikComponents/PhoneInput';
import { StatusHistory } from "../../../Componentes/FormikComponents/StatusHistory";
import { Timestamps } from '../../../Componentes/FormikComponents/Timestamps';
import { request } from '../../../Services/api';
import yup from "../../../Services/validations";
import { BackGroundForm, BtnBlue, TitleRegister } from '../../../styles/CommonStyles';
export const DemandForm = (props) => {
   const [primaryData, setPrimaryData] = useState()
   const disableFields = (props.paramRoute !== "inserir")
   const [pageTop, scrollToTop] = useScroll()
   const [fields, setFields] = useState(
      {
         dem_title: "",
         dem_contact_email: "",
         dem_contact_phone: "",
         dem_desc: "",
         dem_comments: "",
         dem_usr_cod: "",
         dem_sdm_cod: "",
         dem_tdm_cod: "",
         dem_dtaction: "",
      }
   )
   let method = "post"
   let postEndpoint = "demands/cadastrar"
   if (props.paramRoute !== "inserir") {
      postEndpoint = "demands/alterar/" + props.primaryId
      method = "put"
   }
   useEffect(() => {
      const requestData = async () => {
         try {
            const data = await request({
               method: "get",
               endpoint: "demands/procurar/" + props.primaryId,
            });
            setPrimaryData(data.data)
            let tempFields = {}
            for (const key of Object.keys(fields)) {
               if (data.data[key] !== null) {
                  if (key === "dem_dtaction") {
                     tempFields[key] = new Date(data.data[key])
                  }
                  else if (key.includes("phone")) {
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
   let validationSchema = yup.object({
      dem_title: yup.string().max(500).required(),                   //Disabled in edit
      dem_contact_email: yup.string().email().max(255).required(),   //Disabled in edit
      dem_contact_phone: yup.string()                                //Disabled in edit
         .test('valid-phone', "Deve estar no formato (99) 9999-9999 ou (99) 99999-9999",
            (value, context) => {
               if (value !== undefined) {
                  return (!!value.match(/\d{10,11}/) ||
                     value.trim().length >= 14 ||
                     !!value.match(/\(\s{2}\)\s{5,6}-\s{4,5}/));
               }
               return true;
            }),
      dem_desc: yup.string().max(500).required(),
      dem_comments: yup.string().max(500).required(),                 //Disabled in edit
      dem_usr_cod: yup.number().required(),                           //Disabled in edit
      dem_sdm_cod: yup.number().required(),
      dem_tdm_cod: yup.number().required(),                            //Disabled in edit
      dem_dtaction: yup.date()
         .when("dem_sdm_cod", {
            is: (demandStatus) => (demandStatus > 1 && demandStatus < 5),
            then: yup.date()
               .required()
               .nullable()
               .transform((curr, orig) => orig === '' ? null : curr),
            otherwise: yup.date()
               .nullable()
               .transform((curr, orig) => orig === '' ? null : curr)
         }),
   });
   if (props.paramRoute !== "inserir") {
      validationSchema = yup.object({
         dem_desc: yup.string().max(500).required(),
         dem_sdm_cod: yup.number().required(),
         dem_dtaction: yup.date()
            .when("dem_sdm_cod", {
               is: (demandStatus) => (demandStatus > 1 && demandStatus < 5),
               then: yup.date()
                  .required()
                  .nullable()
                  .transform((curr, orig) => orig === '' ? null : curr),
               otherwise: yup.date()
                  .nullable()
                  .transform((curr, orig) => orig === '' ? null : curr)
            }),
      });
   }
   return (
      <div>
         <ButtonRow
            cancelButton={<Button variant="light" onClick={props.redirectCallback}><IoChevronBackCircleSharp size={30} color="#BFCADD" /></Button>}
            titlePage={<TitleRegister ref={pageTop}>{props.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Demanda</TitleRegister>}
         />
         <BackGroundForm xs={1} className={'mb-2'} noGutters>
            <Formik
               htmlFor="mainForm"
               initialValues={fields}
               validationSchema={validationSchema}
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
                           label="Titulo"
                           name="dem_title"
                           type="text"
                           maxLength="500"
                           disabled={disableFields} />
                     </Col>
                     <Col className="mt-3" xs={12} sm={4}>
                        <DefaultValidationTextField
                           label="Email"
                           name="dem_contact_email"
                           type="text"
                           maxLength="255"
                           disabled={disableFields} />
                     </Col>
                     <Col className="mt-3" xs={12} sm={4}>
                        <PhoneInput
                           label="Telefone"
                           name="dem_contact_phone"
                           type="text"
                           maxLength="15"
                           disabled={disableFields} />
                     </Col>
                  </Row>
                  <Row>
                     <Col className="mt-3" >
                        <DefaultValidationTextField
                           label="Descrição"
                           name="dem_desc"
                           type="text"
                           maxLength="500"
                           multiline
                           rows={4}
                        />
                     </Col>
                  </Row>
                  <Row>
                     <Col className="mt-3">
                        <DefaultValidationTextField
                           label="Observações"
                           name="dem_comments"
                           type="text"
                           maxLength="500"
                           multiline
                           rows={4}
                           disabled={disableFields}
                        />
                     </Col>
                  </Row>
                  <Row>
                     <Col className="mt-3" xs={12} sm={4}>
                        <ListUsers
                           label="Usuário"
                           name="dem_usr_cod"
                           disabled={disableFields}
                        />
                     </Col>
                     <Col className="mt-3" xs={12} sm={4}>
                        <ListStatusDemands
                           label="Status da Demanda"
                           name="dem_sdm_cod"
                           onChange={(event) => {
                              if (primaryData && primaryData.demandStatusHistories.length >= 1) {
                                 let matches = primaryData.demandStatusHistories.filter((v) => event.target.value == v.dsh_sdm_cod)
                                 if (matches.length >= 1) {
                                    setFieldValue("dem_dtaction", new Date(matches[0].dsh_dtaction))
                                 } else {
                                    setFieldValue("dem_dtaction", "")
                                 }
                              }
                              handleChange(event)
                           }}
                        />
                     </Col>
                     <Col className="mt-3" xs={12} sm={4}>
                        <ListTypeDemand
                           label="Tipo de Demanda"
                           name="dem_tdm_cod"
                           disabled={disableFields}
                        />
                     </Col>
                  </Row>
                  <Row>
                     <Col className="mt-3" xs={12} sm={6} >
                        <DatePickerField
                           label="Data de Ação"
                           name="dem_dtaction" />
                     </Col>
                  </Row>
                  {(props.paramRoute !== "inserir" && primaryData) ?
                     <Timestamps
                        primaryData={primaryData}
                        fieldSuffix="dem_" /> : null}
                  <Row style={{ marginTop: 25, marginBottom: 31 }}>
                     <Col md={{ offset: 5 }}>
                        <BtnBlue variant="dark" type="submit" onClick={scrollToTop}>Salvar</BtnBlue>
                     </Col>
                  </Row>
               </Form>
            )}
            </Formik>
            {props.paramRoute !== "inserir" ? <StatusHistory primaryData={primaryData} /> : null}
         </BackGroundForm>
      </div>

   );
};
