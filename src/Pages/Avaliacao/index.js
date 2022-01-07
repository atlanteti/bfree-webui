import { useState } from "react";
import { Col } from "react-bootstrap";
import { BackGroundForm } from "../../styles/CommonStyles";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

export function Avalicacao() {
   const [value, setValue] = useState(null);

   const handleChange = (event) => {
      setValue(event.target.value);
   };

   return (
      <Col md={{ span: 8, offset: 2 }}>
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
            </FormControl>
         </BackGroundForm>
      </Col>
   )
}