import { MenuItem } from "@mui/material";
import { ValidationTextField } from "../FormFields";

export function HourComponent(props) {
   function handleChange(e) {
      console.log(e)
   }


   return <ValidationTextField
      select
      fullWidth
      onChange={handleChange}
      name={props.name}
      label={props.label}
      InputLabelProps={{
         shrink: true,
         required: false
      }}
   >
      <MenuItem value={"08:00"}>08:00</MenuItem>
   </ValidationTextField>
}