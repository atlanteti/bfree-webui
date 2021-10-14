import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';
import { SelectValidateStyle, RequiredField } from '../../styles/CommonStyles';
import { TextField, MenuItem, ListSubheader } from '@mui/material';


export default class ListJourneysControlled extends Component {
   constructor(props) {
      super(props);
      this.state = {
         journeys: []
      };
   }

   async getJourneys() {
      const data = await request({
         method: 'get',
         endpoint: 'journeys/listar-todos'
      });
      this.setState({
         journeys: data.data
      });
   }

   componentDidMount() {
      this.getJourneys();
   }

   onChange(event) {
      if (event.target.value !== null) {
         const jny_cpn_cod = this.state.journeys.filter((journey) => { return journey.jny_cod == event.target.value; })[0].jny_cpn_cod;
         let journeyWithCompany = {
            ...event,
            value: event.target.value,
            jny_cpn_cod: jny_cpn_cod
         };
         this.props.onChange(journeyWithCompany);
      }
      else {
         this.props.onChange(event);
      }
   }
   render() {
      return <TextField
         id={this.props.id}
         select
         fullWidth
         name={this.props.name}
         disabled={this.props.disabled}
         label="Jornada"
         value={this.props.value}
         onChange={this.onChange.bind(this)}
         InputLabelProps={{
            shrink: true,
         }}
         helperText={this.props.required ? <RequiredField>Campo obrigatório</RequiredField> : null}
      >
         <MenuItem value={null} />
         {this.state.journeys?.map(journey => {
            return (
               <MenuItem
                  key={journey.jny_cod}
                  value={journey.jny_cod}
               >
                  {journey.jny_name}
               </MenuItem>);
         })}
      </TextField>
      // return <Form.Group controlId={this.props.controlId} /*"companyId"*/>
      //    <Form.Label style={{color: "#B0BEC5"}}>Jornada: </Form.Label>
      //    <Form.Control //Form.Select não funciona por razões misteriosas
      //       style={SelectValidateStyle}
      //       required={this.props.required}
      //       as="select"
      //       onChange={this.onChange.bind(this)}
      //       disabled={this.props.disabled}
      //       value={this.props.value}>
      //       <>
      //          <option value={null} />
      //          {this.state.journeys?.map(journey => {
      //             return (
      //                <option
      //                   key={journey.jny_cod}
      //                   value={journey.jny_cod}
      //                >
      //                   {journey.jny_name}
      //                </option>);
      //          })}
      //       </>
      //    </Form.Control>
      //    <Form.Control.Feedback type="invalid">{this.props.errorMessage}</Form.Control.Feedback>
      // </Form.Group>;
   }
}
