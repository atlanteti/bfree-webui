import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';
import PropTypes from 'prop-types'
import { RequiredField } from '../../styles/CommonStyles'

export default class ListResultDemands extends Component {
   constructor(props) {
      super(props);
      this.state = {
         resultDemands: [],
      };
      if (this.props.getSetCallback) {
         this.props.getSetCallback(this.select.bind(this))
      }
   }

   async getResultDemands() {
      const data = await request({
         method: 'get',
         endpoint: 'results-demand/listar-todos'
      });
      this.setState({
         resultDemands: data.data
      });
   }

   componentDidMount() {
      this.getResultDemands();
   }

   onChange(e) {
      this.props.onChange(e)
   }

   select(typeResultCode) {
      this.setState({ selectedValue: typeResultCode })
      this.props.onChange({
         target: {
            id: this.props.controlId,
            value: String(typeResultCode),
            selected: true
         }
      })
   }

   render() {
      return <Form.Group controlId={this.props.controlId} /*"companyId"*/>
         <Form.Label>Resultado da Demanda: {this.props.required ? <RequiredField>*</RequiredField> : null}</Form.Label>
         <Form.Control //Form.Select não funciona por razões misteriosas
            disabled={this.props.disabled}
            as="select"
            required={this.props.required}
            onChange={this.onChange.bind(this)}
            value={this.props.defaultResultDemand}>
            <>
               <option value={null} />
               {this.state.resultDemands?.map(resultDemand => {
                  return (
                     <option
                        key={resultDemand.rdm_cod}
                        value={resultDemand.rdm_cod}
                     >
                        {resultDemand.rdm_name}
                     </option>);
               })}
            </>
         </Form.Control>
      </Form.Group>;
   }
}

ListResultDemands.propTypes = {
   getSetCallback: PropTypes.func,
   defaultResultDemand: PropTypes.number,
   controlId: PropTypes.number.isRequired,
   onChange: PropTypes.func.isRequired,
   required: PropTypes.bool,
   disabled: PropTypes.bool
}
