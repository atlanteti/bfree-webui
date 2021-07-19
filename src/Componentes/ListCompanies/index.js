import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';


export default class ListCompanies extends Component {
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


  render() {
    return <Form.Group controlId={this.props.controlId} /*"companyId"*/>
      <Form.Label>Empresa: </Form.Label>
      <Form.Control //Form.Select não funciona por razões misteriosas

        as="select"
        onChange={this.props.onChange}>
        <>
          <option value={null} />
          {this.state.companies?.map(company => {
            return (
              <option
                selected={this.props.defaultCompany?.cpn_cod === company.cpn_cod} //Compilador reclama mas é o único jeito até agora.
                key={company.cpn_cod}
                value={company.cpn_cod}
              >
                {company.cpn_name}
              </option>);
          })}
        </>
      </Form.Control>
    </Form.Group>;
  }
}