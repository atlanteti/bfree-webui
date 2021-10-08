import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';
import { SelectValidateStyle } from '../../styles/CommonStyles';


export default class ListCompaniesControlled extends Component {
   constructor(props) {
      super(props);
      this.state = {
         companies: []
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
      this.props.onChange(e);
   }

   render() {
      return <Form.Group controlId={this.props.controlId} /*"companyId"*/>
         <Form.Label style={{color: "#B0BEC5"}}>Empresa: </Form.Label>
         <Form.Control //Form.Select não funciona por razões misteriosas
            style={SelectValidateStyle}
            disabled={this.props.disabled}
            as="select"
            onChange={this.onChange.bind(this)}
            value={this.props.value}>
            <>
               <option value={null} />
               {this.state.companies?.map(company => {
                  return (
                     <option
                        key={company.cpn_cod}
                        value={company.cpn_cod}
                     >
                        {company.cpn_name}
                     </option>);
               })}
            </>
         </Form.Control>
         <Form.Control.Feedback type="invalid">{this.props.errorMessage}</Form.Control.Feedback>
      </Form.Group>;
   }
}
