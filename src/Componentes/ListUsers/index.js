import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';
import PropTypes from 'prop-types'
import { RequiredField, SelectValidateStyle } from '../../styles/CommonStyles'

export default class ListUsers extends Component {
   constructor(props) {
      super(props);
      this.state = {
         users: [],
      };
      if (this.props.getSetCallback) {
         this.props.getSetCallback(this.select.bind(this))
      }
   }

   async getUsers() {
      const data = await request({
         method: 'get',
         endpoint: 'usuarios/listar-todos'
      });
      this.setState({
         users: data.data
      });
   }

   componentDidMount() {
      this.getUsers();
   }

   onChange(e) {
      this.props.onChange(e)
   }

   select(typeUserCode) {
      this.setState({ selectedValue: typeUserCode })
      this.props.onChange({
         target: {
            id: this.props.controlId,
            value: String(typeUserCode),
            selected: true
         }
      })
   }

   render() {
      return <Form.Group controlId={this.props.controlId} /*"companyId"*/>
         <Form.Label>Usuário: {this.props.required ? <RequiredField>*</RequiredField> : null}</Form.Label>
         <Form.Control //Form.Select não funciona por razões misteriosas
            style={SelectValidateStyle}
            disabled={this.props.disabled}
            as="select"
            required={this.props.required}
            onChange={this.onChange.bind(this)}
            value={this.props.defaultUser}>
            <>
               <option value={null} />
               {this.state.users?.map(user => {
                  return (
                     <option
                        key={user.usr_cod}
                        value={user.usr_cod}
                     >
                        {user.usr_name}
                     </option>);
               })}
            </>
         </Form.Control>
      </Form.Group>;
   }
}

ListUsers.propTypes = {
   getSetCallback: PropTypes.func,
   defaultUser: PropTypes.number,
   controlId: PropTypes.number.isRequired,
   onChange: PropTypes.func.isRequired,
   required: PropTypes.bool,
   disabled: PropTypes.bool
}
