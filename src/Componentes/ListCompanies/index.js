import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';
import PropTypes from 'prop-types'
import { RequiredField, SelectValidateStyle } from '../../styles/CommonStyles';
import { TextField, MenuItem } from '@mui/material';
import NoDataComp from '../NoDataComp';
import { DefaultValidateSelectField } from '../DefaultValidateInputs/DefaultValidateSelectField';

export default class ListCompanies extends Component {
   constructor(props) {
      super(props);
      this.state = {
         companies: [],
      };
   }

   async getCompanies() {
      const data = await request({
         method: 'get',
         endpoint: 'companies/listar-todos'
      });
      this.setState({
         companies: data.data
      });
   }

   componentDidMount() {
      this.getCompanies();
   }

   onChange(e) {
      this.props.onChange(e)
   }


   render() {
      return <DefaultValidateSelectField
         {...this.props}
         value={this.props.defaultCompany}
         label="Empresa">
         <MenuItem value={""}><NoDataComp /></MenuItem>
         {this.state.companies?.map(company => {
            return (
               <MenuItem
                  key={company.cpn_cod}
                  value={company.cpn_cod}
               >
                  {company.cpn_name}
               </MenuItem>);
         })}
      </DefaultValidateSelectField>
   }
}
ListCompanies.propTypes = {
   name: PropTypes.string.isRequired,
   validated: PropTypes.bool.isRequired,
   errorMessage: PropTypes.string.isRequired,
   onChange: PropTypes.func.isRequired,
   defaultCompany: PropTypes.number.isRequired
}

