import React, { Component } from 'react';
import { request } from '../../Services/api';
import { RequiredField } from '../../styles/CommonStyles';
import { TextField, MenuItem, ListSubheader } from '@mui/material';
import { ValidationTextField } from '../FormFields';
import NoDataComp from '../NoDataComp';
import { DefaultValidateSelectField } from '../DefaultValidateInputs/DefaultValidateSelectField';

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
      return <DefaultValidateSelectField
         {...this.props}
         onChange={this.onChange.bind(this)}
         label="Jornada">
         {this.state.journeys?.map(journey => {
            return (
               <MenuItem
                  key={journey.jny_cod}
                  value={journey.jny_cod}
               >
                  {journey.jny_name}
               </MenuItem>);
         })}
      </DefaultValidateSelectField>
   }
}
