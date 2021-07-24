import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';

export default class ListCompanies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      selectedValue: this.props.defaultCompany
    };
    if (this.props.getSetCallback)
    {
      this.props.getSetCallback(this.select.bind(this))
    }
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

  onChange(e) 
  {
    this.setState({selectedValue: e.target.value})
    this.props.onChange(e)
  }

  select(companyCode)
  {
    this.setState({selectedValue: companyCode})
    this.props.onChange({
      target:{
        id: this.props.controlId,
        value: String(companyCode),
        selected: true}})
  }

  render() {
    return <Form.Group controlId={this.props.controlId} /*"companyId"*/>
      <Form.Label>Empresa: </Form.Label>
      <Form.Control //Form.Select não funciona por razões misteriosas
        disabled={this.props.disabled}
        as="select"
        onChange={this.onChange.bind(this)}
        value={this.state.selectedValue}>
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
    </Form.Group>;
  }
}
