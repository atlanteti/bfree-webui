import React, { useState, useRef } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { UploadContainer } from '../../styles/CommonStyles';
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
      <UploadContainer>
         <Row>
            <Col md={8} sm={6}>
               <input
                  ref={inputRef}
                  onChange={handleDisplayFileDetails}
                  className="d-none"
                  type="file" />
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
            <UploadContainer md={3} sm={6} style={{
               alignSelf: "center",
               marginBottom: "22px"
            }}>
               <Button md={{ span: 2 }} style={{ whiteSpace: "nowrap" }} variant="register" onClick={handleUpload} >SELECIONAR ARQUIVO</Button>
            </UploadContainer>
         </Row>
      </UploadContainer>
   </Container>
}