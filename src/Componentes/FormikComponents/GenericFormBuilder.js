import { Form, Formik } from 'formik';
import React from 'react';
import { Button } from 'react-bootstrap';
import { request } from '../../../Services/api';
import yup from "../../../Services/validations";
import { BackGroundForm } from '../../../styles/CommonStyles';
import { DefaultValidationTextField } from './DefaultValidationTextField';

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
                  console.log(data);
                  setSubmitting(false);
               }}
         >{({ setFieldValue, handleChange }) => (
            <Form id="mainForm">
               <DefaultValidationTextField
                  label="First Name"
                  name="placeholder"
                  type="text"
                  maxLength="6"
                  onChange={(e) => {
                     setFieldValue("controlledByAnother", e.target.value);
                     handleChange(e);
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
      </BackGroundForm>
   );
};
