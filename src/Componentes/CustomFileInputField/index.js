import React, { useState, useRef } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { InputTextField } from '../FormFields';
export default function CustomFileInputField(props) {
   const inputRef = useRef(null);

   const handleUpload = () => {
      inputRef.current?.click()
   }
   const handleDisplayFileDetails = () => {
      inputRef.current?.files &&
         props.onChange(inputRef.current.files)

   }
   return <Container fluid>
      <Col>
         <Row>
            <input
               ref={inputRef}
               onChange={handleDisplayFileDetails}
               className="d-none"
               type="file" />
            <Col>
               <InputTextField
                  fullWidth
                  onClick={handleUpload}
                  onChange={props.onChange}
                  label={"Arquivo"}
                  value={props.filename}
                  style={{ caretColor: "transparent" }}
                  helperText="Número máximo de linhas: 500">
               </InputTextField>
            </Col>
            <Col style={{
               alignSelf: "center",
               marginBottom: "22px"
            }} xs={3}>
               <Button style={{ whiteSpace: "nowrap" }} variant="register" onClick={handleUpload} >SELECIONAR ARQUIVO</Button>
            </Col>
         </Row>
      </Col>
   </Container>
}