import { Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { request } from '../../../Services/api';
import yup from "../../../Services/validations";
import { BackGroundForm, BtnBlue, TitleRegister } from '../../../styles/CommonStyles';
import { DefaultValidationTextField, preventNonNumericalInput } from '../../../Componentes/FormikComponents/DefaultValidationTextField';
import { BankType } from '../../../Componentes/FormikComponents/ListBanks';
import { AccountType } from '../../../Componentes/FormikComponents/ListAccountType';
import { PixType } from '../../../Componentes/FormikComponents/ListPixType';
import { ButtonRow } from '../../../Componentes/ButtonRow';
import { IoChevronBackCircleSharp } from 'react-icons/io5';
import { cpfMask } from '../../../Componentes/DadosBancarioComponents';
export const DadosBancariosForm = (props) => {
   const [primaryData, setPrimaryData] = useState()
   const [fields, setFields] = useState(
      {
         bkd_cpf: "",
         bkd_pix: "",
         bkd_typepix: "",
         bkd_agency: "",
         bkd_account: "",
         bkd_tpaccount: "",
         bkd_bak_cod: ""
      }
   )
   let method = "post"
   const entryRequestEndpoint = "find-by-user/";
   let postEndpoint = "bank-data/save"
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
   }, [props])
   return (
      <React.Fragment>
         <ButtonRow
            cancelButton={<Button variant="light" onClick={props.redirectCallback}><IoChevronBackCircleSharp size={30} color="#BFCADD" /></Button>}
            titlePage={<TitleRegister>{props.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Dados Bancários</TitleRegister>}
         />
         <BackGroundForm xs={1} className={'mb-2'} noGutters>
            <Formik
               htmlFor="mainForm"
               initialValues={fields}
               validationSchema={yup.object({
                  bkd_cpf: yup.string().max(15).required(),
                  bkd_typepix: yup.string().required(),
                  bkd_pix: yup.string().max(45).required(),
                  bkd_agency: yup.string().max(4).required(),
                  bkd_account: yup.number().required(),
                  bkd_tpaccount: yup.string().required(),
                  bkd_bak_cod: yup.string().required()
               })}
               onSubmit={
                  async (values, { setSubmitting, setFieldError }) => {
                     Object.keys(values).forEach((key) => {
                        if (key && key.includes("cpf")) {
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
                           name="bkd_cpf"
                           type="text"
                           maxLength="15"
                           value={fields.bkd_cpf}
                           onChange={(event) =>
                              setFields({ ...fields, bkd_cpf: cpfMask(event.target.value) })
                           }
                        />
                     </Col>
                     <Col className="mt-3" xs={12} sm={4}>
                        <PixType
                           label="Tipo do Pix"
                           name="bkd_typepix"
                        />
                     </Col>
                     <Col className="mt-3" xs={12} sm={4}>
                        <DefaultValidationTextField
                           label="Pix"
                           name="bkd_pix"
                           type="text"
                           maxLength="45" />
                     </Col>
                  </Row>
                  <Row>
                     <Col className="mt-3" xs={12} sm={3}>
                        <BankType
                           label="Banco"
                           name="bkd_bak_cod"
                        />
                     </Col>
                     <Col className="mt-3" xs={12} sm={3}>
                        <DefaultValidationTextField
                           onKeyPress={preventNonNumericalInput}
                           label="Agência"
                           name="bkd_agency"
                           type="text"
                           maxLength="4" />
                     </Col>
                     <Col className="mt-3" xs={12} sm={3}>
                        <DefaultValidationTextField
                           onKeyPress={preventNonNumericalInput}
                           label="Conta"
                           name="bkd_account"
                           type="text"
                           maxLength="12" />
                     </Col>
                     <Col className="mt-3" xs={12} sm={3}>
                        <AccountType
                           label="Tipo de Conta"
                           name="bkd_tpaccount"
                        />
                     </Col>
                  </Row>
                  <Row>
                     <Col className="mt-3" md={{ offset: 5 }}>
                        <BtnBlue variant="dark" type="submit">Salvar</BtnBlue>
                     </Col>
                  </Row>
               </Form>
            )}
            </Formik>
         </BackGroundForm>
      </React.Fragment>
   );
};
