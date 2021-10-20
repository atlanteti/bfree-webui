import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';
import { SelectValidateStyle, RequiredField } from '../../styles/CommonStyles';
import { TextField, MenuItem, ListSubheader } from '@mui/material';
import { ValidationTextField } from '../FormFields';
import NoDataComp from '../NoDataComp';


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
      return <ValidationTextField
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
         <MenuItem value={null}><NoDataComp /></MenuItem>
         {this.state.journeys?.map(journey => {
            return (
               <MenuItem
                  key={journey.jny_cod}
                  value={journey.jny_cod}
               >
                  {journey.jny_name}
               </MenuItem>);
         })}
      </ValidationTextField>
   }
}
