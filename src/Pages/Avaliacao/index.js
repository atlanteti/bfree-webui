import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { BackGroundForm, BtnBlue } from "../../styles/CommonStyles";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { useLocation } from "react-router-dom";
import { request } from "../../Services/api";

export function Avalicacao() {
   const [value, setValue] = useState(null);

   let query = new URLSearchParams(useLocation().search);

   function getToken() {
      const token = query.get("/");
      return token;
   }

   async function validateToken() {
      try {
         const data = await request({
            method: "get",
            endpoint: "",
            headers: { token: getToken() }
         })
      } catch (e) {
         console.log(e);
      }
   }
   const handleChange = (event) => {
      setValue(event.target.value);
   };

   const handleSubmit = async () => {
      const data = await request({
         method: 'post',
         endpoint: ''
      })
   }

   useEffect(() => {
      validateToken()
   }, [])

   return (
      <Col md={{ span: 6, offset: 3 }}>
         <BackGroundForm className="d-flex justify-content-center mt-6">
            <FormControl component="fieldset">
               <FormLabel component="legend">
                  Como você avalia, em uma escala de 1 a 5, o atendimento do consultor?
               </FormLabel>
               <RadioGroup
                  row
                  aria-label="gender"
                  id="avaliation"
                  name="cal_avaliation"
                  value={value}
                  onChange={handleChange}
               >
                  <Col className="d-flex justify-content-center mt-3">
                     <FormControlLabel labelPlacement="top" value={1} control={<Radio />} label="1" />
                     <FormControlLabel labelPlacement="top" value={2} control={<Radio />} label="2" />
                     <FormControlLabel labelPlacement="top" value={3} control={<Radio />} label="3" />
                     <FormControlLabel labelPlacement="top" value={4} control={<Radio />} label="4" />
                     <FormControlLabel labelPlacement="top" value={5} control={<Radio />} label="5" />
                  </Col>
               </RadioGroup>
               <Col className="d-flex justify-content-center mt-3">
                  <BtnBlue type="submit" variant="dark" onClick={() => handleSubmit()}>Enviar</BtnBlue>
               </Col>
            </FormControl>
         </BackGroundForm>
      </Col>
   )
}