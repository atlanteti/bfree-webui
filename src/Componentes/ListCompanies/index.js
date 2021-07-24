import { Form } from 'react-bootstrap';
import { React, Component } from 'react';
import { request } from '../../Services/api';
import PropTypes from 'prop-types'
export default class ListCompanies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
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
        value={this.props.defaultCompany}>
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

ListCompanies.propTypes = {
  getSetCallback: PropTypes.func,
  defaultCompany: PropTypes.number,
  controlId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool
}
