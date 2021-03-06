import { Form } from 'react-bootstrap';

export function CheckBox(props) {
   return (
      <Form.Check
         style={{ marginBottom: 20, color: "#546E7A" }}
         type="checkbox"
         className="my-3 mr-sm-2"
         name={props.name}
         id={props.id || "customControlInline"}
         label={props.label}
         onChange={props.onChange}
         custom
         checked={props.checked}
         defaultValue={props.defaultValue}
      />
   )
}