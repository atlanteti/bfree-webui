import { React, Component } from 'react';
import { request } from '../../Services/api';
import PropTypes from 'prop-types'
import { TextField, MenuItem } from '@mui/material';
import NoDataComp from '../NoDataComp';
import { DefaultValidateSelectField } from '../DefaultValidateInputs/DefaultValidateSelectField';

export default class ListTypeDemand extends Component {
   constructor(props) {
      super(props);
      this.state = {
         typeDemands: [],
      };
   }

   async getTypeDemands() {
      const data = await request({
         method: 'get',
         endpoint: 'types-demand/listar-todos'
      });
      this.setState({
         typeDemands: data.data
      });
   }

   componentDidMount() {
      this.getTypeDemands();
   }

   render() {
      return <DefaultValidateSelectField
         {...this.props}
         value={this.props.defaultTypeDemand}
         label="Tipos de Demanda">
         {this.state.typeDemands?.map(typeDemand => {
            return (
               <MenuItem
                  key={typeDemand.tdm_cod}
                  value={typeDemand.tdm_cod}
               >
                  {typeDemand.tdm_name}
               </MenuItem>);
         })}
      </DefaultValidateSelectField>
   }
}

ListTypeDemand.propTypes = {
   defaultTypeDemand: PropTypes.number,
   onChange: PropTypes.func.isRequired,
   required: PropTypes.bool,
   disabled: PropTypes.bool
}
