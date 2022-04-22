import { Form, Formik } from 'formik';
import React, { useState, useEffect, useContext } from 'react';
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
import ContextLogin from '../../../Context/ContextLogin';
export const DadosBancariosForm = (props) => {
   const { admin } = useContext(ContextLogin)
   const disableInput = admin && true
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
   const entryRequestEndpoint = "bank-data/find-by-user/";
   let postEndpoint = "bank-data/save"
   useEffect(() => {
      const requestData = async () => {
         try {
            const data = await request({
               method: "get",
               endpoint: entryRequestEndpoint + props.primaryId,
            });
            let tempFields = {}
            for (const key of Object.keys(fields)) {
               if (data.data[key] !== null) {
                  if (key.includes("cpf")) {
                     tempFields[key] = cpfMask(data.data[key])
                  } else {
                     tempFields[key] = data.data[key]
                  }
               } else {
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
   return (
      <React.Fragment>
         <ButtonRow
            cancelButton={<Button variant="light" onClick={props.redirectCallback}><IoChevronBackCircleSharp size={30} color="#BFCADD" /></Button>}
            titlePage={<TitleRegister>Dados Bancários</TitleRegister>}
         />
         <BackGroundForm xs={1} className={'mb-2'} noGutters>
            <Formik
               htmlFor="mainForm"
               initialValues={fields}
               validateOnBlur={false}
               validationSchema={yup.object({
                  bkd_cpf: yup.string().required()
                     .test('valid-cpf', "O CPF deve estar no formato 111.111.111-11",
                        (value, context) => {
                           if (value !== undefined) {
                              return (!!value.match(/\d{10,11}/) ||
                                 value.trim().length >= 14)
                           }
                           return true
                        }),
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
                        method: "post",
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
                        if (data.data.errors[0].field.includes('cpf')) {
                           fields.bkd_cpf = cpfMask(values.bkd_cpf)
                        }
                        setFieldError(data.data.errors[0].field.toLowerCase(), data.data.errors[0].message)
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
                           disabled={disableInput}
                        />
                     </Col>
                     <Col className="mt-3" xs={12} sm={4}>
                        <PixType
                           label="Tipo do Pix"
                           name="bkd_typepix"
                           disabled={disableInput}
                        />
                     </Col>
                     <Col className="mt-3" xs={12} sm={4}>
                        <DefaultValidationTextField
                           label="Pix"
                           name="bkd_pix"
                           type="text"
                           maxLength="45"
                           disabled={disableInput}
                        />
                     </Col>
                  </Row>
                  <Row>
                     <Col className="mt-3" xs={12} sm={3}>
                        <BankType
                           label="Banco"
                           name="bkd_bak_cod"
                           disabled={disableInput}
                        />
                     </Col>
                     <Col className="mt-3" xs={12} sm={3}>
                        <DefaultValidationTextField
                           onKeyPress={preventNonNumericalInput}
                           label="Agência"
                           name="bkd_agency"
                           type="text"
                           maxLength="4"
                           disabled={disableInput}
                        />
                     </Col>
                     <Col className="mt-3" xs={12} sm={3}>
                        <DefaultValidationTextField
                           onKeyPress={preventNonNumericalInput}
                           label="Conta"
                           name="bkd_account"
                           type="text"
                           maxLength="12"
                           disabled={disableInput}
                        />
                     </Col>
                     <Col className="mt-3" xs={12} sm={3}>
                        <AccountType
                           label="Tipo de Conta"
                           name="bkd_tpaccount"
                           disabled={disableInput}
                        />
                     </Col>
                  </Row>
                  {!admin &&
                     <Row>
                        <Col className="mt-3" md={{ offset: 5 }}>
                           <BtnBlue variant="dark" type="submit">Salvar</BtnBlue>
                        </Col>
                     </Row>
                  }
               </Form>
            )}
            </Formik>
         </BackGroundForm>
      </React.Fragment>
   );
};
