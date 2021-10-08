import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';
import PropTypes from 'prop-types'
import { RequiredField, SelectValidateStyle } from '../../styles/CommonStyles'

export default class ListStatusDemands extends Component {
   constructor(props) {
      super(props);
      this.state = {
         statusDemands: [],
      };
      if (this.props.getSetCallback) {
         this.props.getSetCallback(this.select.bind(this))
      }
   }

   async getStatusDemands() {
      const data = await request({
         method: 'get',
         endpoint: 'status-demands/listar-todos'
      });
      this.setState({
         statusDemands: data.data
      });
   }

   componentDidMount() {
      this.getStatusDemands();
   }

   onChange(e) {
      this.props.onChange(e)
   }

   select(typeStatusCode) {
      this.setState({ selectedValue: typeStatusCode })
      this.props.onChange({
         target: {
            id: this.props.controlId,
            value: String(typeStatusCode),
            selected: true
         }
      })
   }

   render() {
      return <Form.Group controlId={this.props.controlId} /*"companyId"*/>
         <Form.Label style={{color: "#B0BEC5"}}>Status da Demanda:</Form.Label>
         <Form.Control //Form.Select não funciona por razões misteriosas
            style={SelectValidateStyle}
            disabled={this.props.disabled}
            as="select"
            required={this.props.required}
            onChange={this.onChange.bind(this)}
            value={this.props.defaultStatusDemand}>
            <>
               <option value={null} />
               {this.state.statusDemands?.map(statusDemand => {
                  return (
                     <option
                        key={statusDemand.sdm_cod}
                        value={statusDemand.sdm_cod}
                     >
                        {statusDemand.sdm_name}
                     </option>);
               })}
            </>
         </Form.Control>
         <Form.Text className="text-muted">{this.props.Text} {this.props.required ? <RequiredField>Campo obrigatório</RequiredField> : null}</Form.Text>
      </Form.Group>;
   }
}

ListStatusDemands.propTypes = {
   getSetCallback: PropTypes.func,
   defaultStatusDemand: PropTypes.number,
   controlId: PropTypes.number.isRequired,
   onChange: PropTypes.func.isRequired,
   required: PropTypes.bool,
   disabled: PropTypes.bool
}
