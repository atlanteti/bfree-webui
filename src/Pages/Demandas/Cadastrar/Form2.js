import { Accordion, AccordionDetails, AccordionSummary, MenuItem } from '@mui/material';
import { Form, Formik, useField, useFormikContext } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { MdOutlineExpandMore } from 'react-icons/md';
import InputMask from "react-input-mask";
import { DateField, DateFieldStatus } from '../../../Componentes/DateField';
import { ValidationTextField } from '../../../Componentes/FormFields';
import ContextLogin from '../../../Context/ContextLogin';
import { request } from '../../../Services/api';
import yup from "../../../Services/validations";
import { BackGroundForm, BtnBlue, MainTable, TableData, TableHeader, TextCell } from '../../../styles/CommonStyles';
import { StatusAccordionHeader, TableRowStatus, TextHeaderStatus } from './styles';
function preventLeadingWhitespace(event) {
   event = event || window.event;
   var charCode = (typeof event.which == "undefined") ? event.keyCode : event.which;
   var charStr = String.fromCharCode(charCode);

   if (charStr.match(/[\s]/) && event.target.selectionStart === 0)
      event.preventDefault();
}


export const DatePickerField = ({ ...props }) => {
   const { setFieldValue } = useFormikContext();
   const [field] = useField(props);
   let val = field.value
   let formattedVal = new Date(val)
   return (
      <DatePicker
         {...field}
         {...props}
         placeholderText="dd/mm/aaaa"
         dateFormat="dd/MM/yyyy"
         selected={(val && formattedVal) || null}
         onChange={val => {
            setFieldValue(field.name, val);
         }}
         customInput={
            <DefaultValidationTextField
               {...props}
               selected={(val && formattedVal) || null}
               fullWidth={false}
               label={props.label}
            />
         }
      />
   );
};
const ListTypeDemandItem = (itemList) => {
   {
      return itemList.map(typeDemand => {
         return (
            <MenuItem
               key={typeDemand.tdm_cod}
               value={typeDemand.tdm_cod}
            >
               {typeDemand.tdm_name}
            </MenuItem>);
      })
   }
}
const ListStatusDemandsItem = (itemList) => {
   return itemList.map(item => {
      return <MenuItem
         key={item.sdm_cod}
         value={item.sdm_cod}
      >
         {item.sdm_name}
      </MenuItem>
   })
}
const ListTypeDemand = (props) => {
   return <GenericSelector
      {...props}
      populateItems={ListTypeDemandItem}
      endpoint='types-demand/listar-todos'
   />
}
const ListStatusDemands = (props) => {
   return <GenericSelector
      {...props}
      populateItems={ListStatusDemandsItem}
      endpoint='status-demands/listar-todos'
   />
}
const ListUsers = (props) => {
   return <GenericSelector
      {...props}
      populateItems={ListUsersItem}
      endpoint='usuarios/listar-todos'
   />
}
const ListUsersItem = (itemList) => {
   return itemList.map(item => {
      return <MenuItem
         key={item.usr_cod}
         value={item.usr_cod}
      >
         {item.usr_name}
      </MenuItem>
   })
}
const GenericSelector = ({ label, ...props }) => {
   const [items, setItems] = useState([])
   useEffect(() => {
      const data = request({
         method: 'get',
         endpoint: props.endpoint
      });
      data.then((data) => {
         setItems(data.data)
      }).catch((error) => {
         console.log(error)
      })
   }, [])
   return <DefaultValidationTextField
      {...props}
      label={label}
      select>
      {props.populateItems(items)}
   </DefaultValidationTextField>
}
const DefaultValidationTextField = ({ label, ...props }) => {
   const [field, meta] = useField(props)
   return (
      <>
         <ValidationTextField
            fullWidth
            onKeyPress={preventLeadingWhitespace}
            InputLabelProps={{
               shrink: true,
               required: false
            }}
            inputProps={{
               maxLength: props.maxLength
            }}
            label={label}
            {...field}
            error={!!meta.error && meta.touched}
            helperText={meta.error ?? " "}
            {...props} />
      </>
   )
}
function PhoneInput(props) {
   const [field, meta] = useField(props)
   let mask = "(99) 9999-99999"
   if (field.value != undefined) {
      const emptySpaces = field.value.match(/ /g || [])
      if (emptySpaces !== null && emptySpaces.length === 1 && field.value.length === 15) {
         mask = "(99) 99999-9999"
      }
   }
   return <InputMask
      id={field.name}
      mask={mask}
      maskChar=" "
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      disabled={props.disabled}
   >
      {() =>
         <ValidationTextField
            fullWidth
            value={field.value}
            id={field.name}
            label={props.label}
            helperText={meta.error}
            error={!!meta.error && meta.touched}
            disabled={props.disabled}
            InputLabelProps={{
               shrink: true,
               required: false
            }} />}
   </InputMask>
}


// And now we can use these
const GenericFormBuilder = () => {
   return (
      <BackGroundForm>
         <Formik
            htmlFor="mainForm"
            initialValues={{
               placeholder: "",
            }}
            validationSchema={yup.object({
               placeholder: yup.string()

            })}
            onSubmit={
               async (values, { setSubmitting }) => {
                  const data = await request({
                     method: "post",
                     endpoint: "demands/cadastrar",
                     data: values,
                  });
                  console.log(data)
                  setSubmitting(false);
               }
            }
         >{({ setFieldValue, handleChange }) => (
            <Form id="mainForm">
               <DefaultValidationTextField
                  label="First Name"
                  name="placeholder"
                  type="text"
                  maxLength="6"
                  onChange={(e) => {
                     setFieldValue("controlledByAnother", e.target.value)
                     handleChange(e)
                  }} />
               <DefaultValidationTextField
                  label="First Name"
                  name="controlledByAnother"
                  type="text"
                  maxLength="6" />

               <Button type="submit">Submit</Button>
            </Form>
         )}
         </Formik>
      </BackGroundForm >
   );
};

export const DemandFormBuilder2 = (props) => {
   const [demand, setDemand] = useState()
   const [primaryData, setPrimaryData] = useState()
   const [loading, setLoading] = useState(true)
   const contextAdmin = useContext(ContextLogin)
   const disableFields = (contextAdmin.admin && props.paramRoute !== "inserir")
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
      <BackGroundForm xs={1} className={'mb-2'} noGutters>
         <Formik
            htmlFor="mainForm"
            initialValues={fields}
            validationSchema={yup.object({
               placeholder: yup.string(),
               dem_title: yup.string().max(500).required(),
               dem_contact_email: yup.string().email().max(255).required(),
               dem_contact_phone: yup.string()
                  .test('valid-phone', "Deve estar no formato (99) 9999-9999 ou (99) 99999-9999",
                     (value, context) => {
                        if (value !== undefined) {
                           return (!!value.match(/\d{10,11}/) ||
                              value.trim().length >= 14 ||
                              !!value.match(/\(\s{2}\)\s{5,6}-\s{4,5}/))
                        }
                        return true
                     }),
               dem_desc: yup.string().max(500).required(),
               dem_comments: yup.string().max(500).required(),
               dem_usr_cod: yup.number().required(),
               dem_sdm_cod: yup.number().required(),
               dem_tdm_cod: yup.number().required(),
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
            })}
            onSubmit={
               async (values, { setSubmitting, setFieldValue, setFieldError }) => {
                  const data = await request({
                     method: method,
                     endpoint: postEndpoint,
                     data: values,
                  });
                  if (data.meta.status == 422) {
                     setFieldError(data.data[0].field.toLowerCase(), data.data[0].message)
                  }
                  setSubmitting(false);
               }
            }
            enableReinitialize
         >{({ setFieldValue, handleChange }) => (
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
               {props.paramRoute !== "inserir" ? <Timestamps primaryData={primaryData} /> : null}
               <Row style={{ marginTop: 25, marginBottom: 31 }}>
                  <Col md={{ offset: 5 }}>
                     <BtnBlue variant="dark" type="submit">Salvar</BtnBlue>
                  </Col>
               </Row>
            </Form>
         )}
         </Formik>
         {props.paramRoute !== "inserir" ? <StatusHistory primaryData={primaryData} /> : null}
      </BackGroundForm>

   );
};
const Timestamps = (props) => {
   return <Row className="mt-6">
      <Col md={{ offset: 1 }} xs={12} sm={5}>
         <DateField
            controlId="dem_dtcreation"
            Label="Data de criação:"
            date={props.primaryData?.dem_dtcreation} />
      </Col>
      {props.primaryData?.dem_dtupdate === null
         ? ''
         : <Col xs={12} sm={5}>
            <DateField
               controlId="dem_dtupdate"
               Label="Data de atualização:"
               date={props.primaryData?.dem_dtupdate} />
         </Col>
      }
   </Row>

}
const StatusHistory = (props) => {
   return <Accordion>
      <AccordionSummary
         expandIcon={<MdOutlineExpandMore />}
         aria-controls="panel1a-content"
         id="panel1a-header"
      >
         <StatusAccordionHeader>Histórico de Alterações de Status:</StatusAccordionHeader>
      </AccordionSummary>
      <AccordionDetails>
         <Row noGutters>
            <MainTable className={"table-borderless"}>
               <TableHeader>
                  <TextHeaderStatus>
                     Status:
                  </TextHeaderStatus>
                  <TextHeaderStatus>
                     Data de Alteração:
                  </TextHeaderStatus>
                  <TextHeaderStatus>
                     Data de Ação:
                  </TextHeaderStatus>
               </TableHeader>
               <TableData>
                  {props.primaryData?.demandStatusHistories.map(
                     (entry) => {
                        return <TableRowStatus>
                           <TextCell data-title="Status:">
                              {entry.statusDemand.sdm_name}
                           </TextCell>
                           <TextCell data-title="Data de alteração:">
                              <DateFieldStatus
                                 controlId="dsh_dtcreation"
                                 Label=""
                                 date={entry.dsh_dtcreation} />
                           </TextCell>
                           <TextCell data-title="Data de ação:">
                              <DateFieldStatus
                                 controlId="dsh_dtaction"
                                 Label=""
                                 noHour={true}
                                 date={entry.dsh_dtaction} />
                           </TextCell>
                        </TableRowStatus>
                     })}
               </TableData>
            </MainTable>
         </Row>
      </AccordionDetails>
   </Accordion>
}