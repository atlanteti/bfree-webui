import { useState } from "react";
import { Alert, Col } from "react-bootstrap";
import { BackGroundForm, BtnBlue } from "../../styles/CommonStyles";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseEndpoint } from "../../Services/config";
import { Helmet } from "react-helmet";

export function Avaliacao() {
   const [avaliation, setAvaliation] = useState(null);
   const [showAlert, setShowAlert] = useState(false);
   const [status, setStatus] = useState("warning");
   const [message, setMessage] = useState(null);

   let query = new URLSearchParams(useLocation().search);

   function getToken() {
      const token = query.get("token");
      return token;
   }

   const handleChange = (event) => {
      setAvaliation(event.target.value);
   };

   async function handleSubmit() {
      try {
         const { data } = await axios({
            method: 'post',
            url: `http://${baseEndpoint}/meetings/confirm`,
            data: {
               token: getToken(),
               rate: avaliation,
            }
         })
         if (data.meta.status === 100) {
            setStatus('success')
            setMessage("Sua avaliação foi enviada, obrigado!")
         } else {
            setStatus('warning')
            setMessage(data.meta.message)
         }
         setShowAlert(true)
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <Col md={{ span: 6, offset: 3 }}>
         <Helmet title="Avaliar Atendimento" />
         {showAlert &&
            <Alert
               variant={status}
               onClose={() => setShowAlert(false)}
               dismissible
               className="mt-6 d-flex justify-content-center"
            >
               {message}
            </Alert>
         }
         <Col>
            <BackGroundForm className="d-flex justify-content-center mt-6">
               <FormControl component="fieldset">
                  <FormLabel component="legend">
                     Como você avalia, em uma escala de 1 a 5, o atendimento do consultor?
                  </FormLabel>
                  <RadioGroup
                     row
                     aria-label="gender"
                     id="avaliation"
                     name="avaliation"
                     value={avaliation}
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
      </Col>
   )
}