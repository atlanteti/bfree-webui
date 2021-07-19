import { Row, Form, Button, Col } from 'react-bootstrap'
import { React, Component } from 'react'
import ListCompanies from '../ListCompanies'
import { SearchBarBorder } from '../../styles/styles'

export default class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formData: {}
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onChange (event) {
    this.setState({
      formData: {
        ...this.state.formData,
        [event.target.id]: event.target.value.trim()
      }
    })
  }

  handleSubmit (event)
  {
    event.preventDefault()
    this.props.filterData({page: 1, extraParams: this.state.formData})
    return
  }
  render () {
    return <SearchBarBorder>
      <Row xs={1} className={'mb-2'} noGutters>
        <Form onSubmit={this.handleSubmit}>
           {this.props.children}
           <Row>
             <Col>
               <Form.Group controlId="name">
                  <Form.Label>{this.props.Label}</Form.Label>
                  <Form.Control
                     type="text"
                     onChange={this.onChange}
                     placeholder={this.props.InputPlaceHolder}/>
               </Form.Group>
             </Col>
             <Col>
               <ListCompanies
                onChange={this.onChange}
                controlId={"companyId"}/>
             </Col>
           </Row>
           <Button variant="warning" type="submit">
              Buscar
           </Button>
        </Form>
         </Row>
    </SearchBarBorder>
  }
}


