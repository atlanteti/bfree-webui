import { Form, Formik } from 'formik';
import React, { useEffect, useState, useContext } from 'react';
import { useScroll } from '../../../Hooks';
import { Button, Col, Row } from 'react-bootstrap';
import { IoChevronBackCircleSharp } from 'react-icons/io5';
import { ButtonRow } from '../../../Componentes/ButtonRow';
import { DatePickerField, MeetingDatePickerField } from '../../../Componentes/FormikComponents/DatePickerField';
import { DefaultValidationTextField } from '../../../Componentes/FormikComponents/DefaultValidationTextField';
import { ListStatusDemands } from '../../../Componentes/FormikComponents/ListStatusDemands';
import { ListTypeDemand } from '../../../Componentes/FormikComponents/ListTypeDemand';
import { ListUsers } from '../../../Componentes/FormikComponents/ListUsers';
import { ListMessageStatus } from '../../../Componentes/FormikComponents/ListMessageStatus'
import { PhoneInput } from '../../../Componentes/FormikComponents/PhoneInput';
import { StatusHistory } from "../../../Componentes/FormikComponents/StatusHistory";
import { Timestamps } from '../../../Componentes/FormikComponents/Timestamps';
import MeetingCard from "../../../Componentes/MeetingCard"
import { request } from '../../../Services/api';
import yup from "../../../Services/validations";
import { BackGroundForm, BtnBlue, MainTable, TableData, TableHeader, TableRow, TextCell, TextHeaderCell, TitleRegister } from '../../../styles/CommonStyles';
import InputMask from "react-input-mask";
import ContextLogin from "../../../Context/ContextLogin"
import moment from 'moment';
export const DemandForm = (props) => {
   const { userRoles, admin } = useContext(ContextLogin)
   const [primaryData, setPrimaryData] = useState()
   const disableFields = (props.paramRoute !== "inserir")
   const [pageTop, scrollToTop] = useScroll()
   const [freeTime, setFreeTime] = useState()
   const [contacts, setContacts] = useState()
   const [meetingDataRequest, setMeetingData] = useState()
   const disableDateMeeting = userRoles?.length !== 2 && userRoles?.includes("CONSULTOR")
   const showButtons = userRoles?.length !== 2 && userRoles?.includes("PRÉ-VENDA")
   const [fields, setFields] = useState(
      {
         dem_activity: "",
         dem_title: "",
         dem_contact_email: "",
         dem_contact_phone: "",
         dem_cli_cod: "",
         dem_desc: "",
         dem_comments: "",
         dem_usr_cod: "",
         dem_sdm_cod: "",
         dem_tdm_cod: "",
         dem_dtaction: "",
         dem_dtmeet: "",
         dem_hourmeet: ""
      }
   )
   let method = "post"
   let postEndpoint = "demands/cadastrar"
   if (props.paramRoute !== "inserir") {
      postEndpoint = "demands/alterar/" + props.primaryId
      method = "put"
   }
   async function revertStatusMeeting(endPoint) {
      const data = await request({
         method: "put",
         endpoint: `meetings/${endPoint}`,
         params: { dem_cod: primaryData.dem_cod }
      })
      props.showAlert(data.meta)
   }
   async function sendEmail() {
      const data = await request({
         method: "post",
         endpoint: `demands/send-mail`,
         params: { dem_cod: primaryData.dem_cod }
      })
      props.showAlert(data.meta)
   }
   useEffect(() => {
      let tempFields = {}
      const requestData = async () => {
         try {
            const data = await request({
               method: "get",
               endpoint: "demands/procurar/" + props.primaryId,
            });
            if (data.data.meeting) {
               const meetingData = await request({
                  method: "get",
                  endpoint: "meetings/find/" + data.data.meeting.mee_cod,
               })
               data.data["dem_dtmeet"] = meetingData.data.mee_start
               setMeetingData({
                  date: moment(meetingData.data.mee_start).format("DD/MM/YYYY"),
                  start: moment(meetingData.data.mee_start).format("HH:mm"),
                  end: moment(meetingData.data.mee_end).format("HH:mm"),
                  client: meetingData.data.demand.dem_contact_email,
                  consultant: meetingData.data.usuario.usr_email
               })
            }
            setPrimaryData(data.data)
            for (const key of Object.keys(fields)) {
               if (data.data[key] !== null) {
                  if (key === "dem_dtaction") {
                     tempFields[key] = new Date(data.data[key])
                  }
                  else if (key === "dem_dtmeet") {
                     if (data.data[key]) tempFields[key] = new Date(data.data[key])
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
   }, [])
   let validationSchema = yup.object({
      dem_title: yup.string().max(500).required(),                   //Disabled in edit
      dem_contact_email: yup.string().email().max(255),   //Disabled in edit
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
      dem_comments: yup.string().max(500).nullable(true),
      dem_usr_cod: yup.number().required(),                           //Disabled in edit
      dem_sdm_cod: yup.number().required(),
      dem_tdm_cod: yup.number().required(),                            //Disabled in edit
      dem_dtaction: yup.date()
         .when("dem_sdm_cod", {
            is: (demandStatus) => (demandStatus > 1),
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
         dem_comments: yup.string().max(500).nullable(true),
         dem_dtaction: yup.date()
            .when("dem_sdm_cod", {
               is: (demandStatus) => (demandStatus > 1),
               then: yup.date()
                  .required()
                  .nullable()
                  .transform((curr, orig) => orig === '' ? null : curr),
               otherwise: yup.date()
                  .nullable()
                  .transform((curr, orig) => orig === '' ? null : curr)
            }),
         dem_dtmeet: yup.date()
            .when("dem_sdm_cod", {
               is: (demandStatus) => (demandStatus > 1 && demandStatus < 5),
               then: yup.date()
                  .required().nullable()
                  .transform((curr, orig) => orig === '' ? null : curr)
            }),
         dem_hourmeet: yup.string()
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
                        data: {
                           ...values,
                           dem_dtaction: moment(values.dem_dtaction).format("YYYY-MM-DD")
                        },
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
            >{({ setFieldValue, handleChange, submitForm, values }) => (
               <Form id="mainForm">
                  <Row>
                     <Col className="mt-3" xs={12} sm={3}>
                        <DefaultValidationTextField
                           label="Titulo"
                           name="dem_title"
                           type="text"
                           maxLength="500"
                           disabled={disableFields} />
                     </Col>
                     <Col className="mt-3" xs={12} sm={3}>
                        <DefaultValidationTextField
                           label="Email"
                           name="dem_contact_email"
                           type="text"
                           maxLength="255"
                           disabled={true} />
                     </Col>
                     <Col className="mt-3" xs={12} sm={3}>
                        <PhoneInput
                           label="Telefone"
                           name="dem_contact_phone"
                           type="text"
                           maxLength="15"
                           disabled={true} />
                     </Col>
                     <Col className="mt-3" xs={12} sm={3}>
                        <DefaultValidationTextField
                           label="Código do Usuário"
                           name="dem_cli_cod"
                           type="text"
                           maxLength="10"
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
                        />
                     </Col>
                  </Row>
                  <Row>
                     <Col className="mt-3" xs={12} sm={4}>
                        <ListUsers
                           label="Usuário"
                           name="dem_usr_cod"
                           disabled={disableFields && !(primaryData?.dem_sdm_cod == 1 && admin)}
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
                                    if (event.target.value === 2 || event.target.value === 3) {
                                       setFieldValue("dem_dtaction", new Date())
                                    } else {
                                       setFieldValue("dem_dtaction", new Date(matches[0].dsh_dtaction))
                                    }
                                 } else if (event.target.value === 2 || event.target.value === 3) {
                                    setFieldValue("dem_dtaction", new Date())
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
                     <Col className="mt-3" xs={6} sm={3} >
                        <DatePickerField
                           label="Data de Ação"
                           name="dem_dtaction"
                           disabled={userRoles?.length !== 0 && (values.dem_sdm_cod === 2 || values.dem_sdm_cod === 3)}
                        />
                     </Col>
                     {userRoles?.includes("PRÉ-VENDA") ?
                        <Col className="mt-3" xs={6} sm={3} >
                           <ListMessageStatus
                              label="Mensagem Atual"
                              name="dem_activity"
                              disabled={values.dem_sdm_cod > 1} />
                        </Col> : null}
                     {values.dem_sdm_cod !== 1 && values.dem_sdm_cod !== 5 ?
                        <Col className="mt-3" xs={6} sm={6} >
                           <MeetingDatePickerField
                              label="Data da Reunião"
                              name="dem_dtmeet"
                              minDate={new Date()}
                              disabled={disableDateMeeting || values.dem_sdm_cod > 2}
                              onChange={!disableDateMeeting && (async value => {
                                 setFieldValue("dem_dtmeet", value);
                                 if (values.dem_sdm_cod === 2 && values.dem_dtaction !== '') {
                                    setFieldValue("dem_dtaction", new Date())
                                 }
                                 const data = await request({
                                    method: "get",
                                    endpoint: "calendar/get-free-time",
                                    params: {
                                       meetingDay: moment(value).format("YYYY-MM-DD")
                                    }
                                 });
                                 setFreeTime(data.data)
                              })} />
                        </Col> : null
                     }
                  </Row>
                  {(admin && primaryData?.dem_sdm_cod === 3) &&
                     <Row className="mt-3 d-flex justify-content-center">
                        <Col className="d-flex justify-content-center" >
                           <Button
                              variant="light"
                              style={{ color: "#0203ad" }}
                              onClick={() => sendEmail()}
                           >
                              Reenviar Avaliação
                           </Button>
                        </Col>
                     </Row>
                  }
                  {(values.dem_sdm_cod === 2 &&
                     primaryData?.dem_sdm_cod === 2 &&
                     meetingDataRequest &&
                     !showButtons) &&
                     <Row className="d-flex justify-content-center mt-3 mb-3">
                        {/* <Col className="mt-3" xs={6} sm={4}>
                           <Button variant="dark" onClick={() => revertStatusMeeting("transfer")}>
                              Transferir Demanda
                           </Button>
                        </Col> */}
                        <Col className="mt-3" xs={6} sm={3}>
                           <Button variant="secondary" onClick={() => revertStatusMeeting("revert")}>
                              Não compareceu
                           </Button>
                        </Col>
                     </Row>
                  }
                  {primaryData?.dem_cancel_reason && <p><strong>Motivo do cancelamento:</strong> {primaryData?.dem_cancel_reason}</p>}
                  {freeTime && values.dem_sdm_cod > 1 ?
                     <><Row>
                        <Col xs={12}>
                           <MainTable>
                              <TableHeader>
                                 <TextHeaderCell>Horários disponíveis para {moment(values.dem_dtmeet).format("DD/MM/YYYY")}</TextHeaderCell>
                              </TableHeader>
                              <TableData>
                                 {freeTime.length > 0 ? freeTime.map((interval) => {
                                    return <TableRow>
                                       {interval.cal_end ?
                                          <TextCell>{interval.cal_start}-{interval.cal_end}</TextCell> :
                                          <TextCell>{interval.cal_start}</TextCell>
                                       }
                                    </TableRow>
                                 }) :
                                    <TableRow>
                                       <TextCell>
                                          Nenhum horário disponível
                                       </TextCell>
                                    </TableRow>}
                              </TableData>
                           </MainTable>
                        </Col>
                     </Row>
                        <Row>
                           <Col xs={6}>
                              <InputMask
                                 id="dem_hourmeet"
                                 mask={"99:99"}
                                 maskChar=""
                                 disabled={freeTime.length == 0}
                                 onChange={(event) => {
                                    setFieldValue("dem_hourmeet", event.target.value)
                                 }}
                              >
                                 {() => <DefaultValidationTextField
                                    label="Hora da Reunião"
                                    name="dem_hourmeet"
                                    placeholder='00:00'
                                    disabled={freeTime.length == 0}
                                    type="text"
                                    maxLength="6" />}
                              </InputMask>
                           </Col>
                           <Col xs={6}>
                              <Button variant="dark"
                                 disabled={values.dem_hourmeet?.length != "5" || freeTime.length == 0}
                                 onClick={async () => {
                                    const day = moment(values.dem_dtmeet).format("YYYY-MM-DD")
                                    const startHour = values.dem_hourmeet
                                    const endHour = addTwoHours(values.dem_hourmeet)
                                    const dateStart = `${day}T${startHour}`
                                    const dateEnd = `${day}T${endHour}`
                                    let meetingCode = -1;
                                    if (meetingDataRequest) {
                                       meetingCode = primaryData.meeting.mee_cod
                                    }
                                    const data = await request({
                                       method: "post",
                                       endpoint: "meetings/save",
                                       data: {
                                          "mee_cod": meetingCode,
                                          "mee_dem_cod": props.primaryId,
                                          "mee_start": dateStart,
                                       }
                                    })
                                    if (data.meta.status !== 100) {
                                       props.showAlert(data.meta)
                                    }
                                    else {
                                       setContacts({
                                          consult: data.data.usuario.usr_email,
                                          client: data.data.demand.dem_contact_email,
                                          time: moment(data.data.mee_start).format("DD/MM/YYYY - HH:mm"),
                                          endTime: moment(data.data.mee_end).format("HH:mm")
                                       })
                                    }
                                 }}>
                                 {values.dem_hourmeet?.length == "5" ?
                                    `Marcar Reunião De ${values.dem_hourmeet}` : "Escolha um horário"}</Button>
                           </Col>
                        </Row>
                        {contacts ?
                           <Row>
                              <Col>
                                 Reunião marcada! Crie o evento e convide {contacts.consult} e {contacts.client} para a reunião de {contacts.time} a {contacts.endTime}
                              </Col>
                           </Row>
                           : null}
                     </>
                     : null
                  }
                  {(props.paramRoute !== "inserir" && primaryData) ?
                     <>
                        <Timestamps
                           primaryData={primaryData}
                           fieldSuffix="dem_" />
                        {meetingDataRequest ?
                           <MeetingCard meetingData={meetingDataRequest} />
                           : null}
                     </>
                     : null}
                  <Row style={{ marginTop: 25, marginBottom: 31 }} className="d-flex justify-content-center">
                     <Col className="d-flex justify-content-center">
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

function addTwoHours(hour) {
   const newHour = (parseInt(hour.split(":")[0]) + 2) % 24
   const oldMinute = hour.split(":")[1]
   if (newHour < 10)
      return `0${newHour}:${oldMinute}`
   else
      return `${newHour}:${oldMinute}`
}