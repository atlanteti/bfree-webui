import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';
import PropTypes from 'prop-types'
import { RequiredField, SelectValidateStyle } from '../../styles/CommonStyles'
import { TextField, MenuItem } from '@mui/material';
import { ValidationTextField } from '../FormFields';

export default class ListUserStatusControlled extends Component {
   constructor(props) {
      super(props);
      this.state = {
         statuses: []
      };
   }

   async getStatus() {
      const data = await request({
         method: 'get',
         endpoint: 'status-users/listar-todos'
      });
      this.setState({
         statuses: data.data
      });
   }

   componentDidMount() {
      this.getStatus();
   }

   onChange(event) {
      this.props.onChange(event)
   }

   render() {
      return <ValidationTextField
         id={this.props.id}
         select
         fullWidth
         name={this.props.name}
         label="Status"
         value={this.props.value}
         required={this.props.required}
         onChange={this.onChange.bind(this)}
         InputLabelProps={{
            shrink: true,
            required: false
         }}
         helperText={this.props.required ? <RequiredField>Campo obrigatório</RequiredField> : null}
      >
         <MenuItem value={null} />
         {this.state.statuses?.map(status => {
            return (
               <MenuItem
                  key={status.sus_cod}
                  value={status.sus_cod}
               >
                  {status.sus_name}
               </MenuItem>);
         })}
      </ValidationTextField>
      // return <Form.Group controlId={this.props.controlId} /*"companyId"*/>
      //    <Form.Label style={{color: "#B0BEC5"}}>Status:</Form.Label>
      //    <Form.Control //Form.Select não funciona por razões misteriosas
      //       style={SelectValidateStyle}

      //       required={this.props.required}
      //       as="select"
      //       onChange={this.onChange.bind(this)}
      //       disabled={this.props.disabled}
      //       value={this.props.value}>
      //       <>
      //          <option value={null} />
      //          {this.state.statuses?.map(status => {
      //             return (
      //                <option
      //                   key={status.sus_cod}
      //                   value={status.sus_cod}
      //                >
      //                   {status.sus_name}
      //                </option>);
      //          })}
      //       </>
      //    </Form.Control>
      //    <Form.Text className="text-muted">{this.props.Text} {this.props.required ? <RequiredField>Campo obrigatório</RequiredField> : null}</Form.Text>
      //    <Form.Control.Feedback type="invalid">{this.props.errorMessage}</Form.Control.Feedback>
      // </Form.Group>;
   }
}
ListUserStatusControlled.propTypes =
{
   required: PropTypes.bool,
   value: PropTypes.string.isRequired,
   disabled: PropTypes.string,
   controlId: PropTypes.string.isRequired
}