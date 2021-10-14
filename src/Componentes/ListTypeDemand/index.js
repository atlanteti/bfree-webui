import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';
import PropTypes from 'prop-types'
import { RequiredField, SelectValidateStyle } from '../../styles/CommonStyles'
import { TextField, MenuItem } from '@mui/material';

export default class ListTypeDemand extends Component {
   constructor(props) {
      super(props);
      this.state = {
         typeDemands: [],
      };
      if (this.props.getSetCallback) {
         this.props.getSetCallback(this.select.bind(this))
      }
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

   onChange(e) {
      this.props.onChange(e)
   }

   select(typeDemandCode) {
      this.setState({ selectedValue: typeDemandCode })
      this.props.onChange({
         target: {
            id: this.props.id,
            value: String(typeDemandCode),
            selected: true
         }
      })
   }

   render() {
      return <TextField
         id={this.props.id}
         select
         fullWidth
         name={this.props.name}
         label="Tipos de Demanda"
         disabled={this.props.disabled}
         value={this.props.defaultTypeDemand}
         required={this.props.required}
         onChange={this.onChange.bind(this)}
         InputLabelProps={{
            shrink: true,
            required: false
         }}
         helperText={this.props.required ? <RequiredField>Campo obrigatório</RequiredField> : null}
      >
         <MenuItem value={null} />
         {this.state.typeDemands?.map(typeDemand => {
            return (
               <MenuItem
                  key={typeDemand.tdm_cod}
                  value={typeDemand.tdm_cod}
               >
                  {typeDemand.tdm_name}
               </MenuItem>);
         })}
      </TextField>
      // return <Form.Group controlId={this.props.controlId} /*"companyId"*/>
      //    <Form.Label style={{ color: "#B0BEC5" }}>Tipos de Demanda:</Form.Label>
      //    <Form.Control //Form.Select não funciona por razões misteriosas
      //       style={SelectValidateStyle}
      //       disabled={this.props.disabled}
      //       as="select"
      //       required={this.props.required}
      //       onChange={this.onChange.bind(this)}
      //       value={this.props.defaultTypeDemand}>
      //       <>
      //          <option value={null}></option>
      //          {this.state.typeDemands?.map(typeDemand => {
      //             return (
      //                <option
      //                   key={typeDemand.tdm_cod}
      //                   value={typeDemand.tdm_cod}
      //                >
      //                   {typeDemand.tdm_name}
      //                </option>);
      //          })}
      //       </>
      //    </Form.Control>
      //    <Form.Text className="text-muted">{this.props.Text} {this.props.required ? <RequiredField>Campo obrigatório</RequiredField> : null}</Form.Text>
      // </Form.Group>;
   }
}

ListTypeDemand.propTypes = {
   getSetCallback: PropTypes.func,
   defaultTypeDemand: PropTypes.number,
   id: PropTypes.number.isRequired,
   onChange: PropTypes.func.isRequired,
   required: PropTypes.bool,
   disabled: PropTypes.bool
}
