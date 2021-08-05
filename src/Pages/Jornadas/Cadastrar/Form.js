import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { TextField, SelectField } from '../../../Componentes/FormFields'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import ListCompanies from '../../../Componentes/ListCompanies'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function JourneyForm(props) {
   return <JourneyFormBuilder insertDataEndpoint="journeys/cadastrar"
      requestDataEndpoint="journeys/procurar/"
      editDataEndpoint="journeys/alterar/"
      {...props} />
}

export class JourneyFormBuilder extends EditCreateForm {
   render() {
      return (
         <>
            {this.state.loading && this.paramRoute !== 'inserir'
               ?
               <Row>
                  <Col md={{ offset: 6 }}><CircularProgress /></Col>
               </Row>
               :
               (
                  <Form onSubmit={this.handleSubmit} validated={this.state.validated} noValidate>
                     <Row>
                        <Col>
                           <TextField
                              controlId="jny_name"
                              errorMessage={this.state.jny_name}
                              Label="Nome:"
                              type="text"
                              maxLength="45"
                              defaultValue={this.state.primaryData.jny_name}
                              onChange={this.handleChange}
                              required />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <ListCompanies
                              defaultValue={this.props.primaryId}
                              onChange={this.handleChange}
                              controlId="jny_cpn_cod"
                              defaultCompany={this.state.primaryData.jny_cpn_cod}
                              required />
                        </Col>
                     </Row>
                     {this.props.paramRoute === 'inserir'
                        ? ''
                        : (
                           <>
                              <DateField
                                 controlId="jny_dtcreation"
                                 Label="Data de criação:"
                                 date={this.state.primaryData?.jny_dtcreation} />
                              {this.state.primaryData?.jny_dtupdate === null
                                 ? ''
                                 : (
                                    <DateField
                                       controlId="jny_dtupdate"
                                       Label="Data de atualização:"
                                       date={this.state.primaryData?.jny_dtupdate} />
                                 )}
                           </>
                        )}
                     <ButtonRow
                        cancelButton={<Button variant="warning" onClick={this.redirectCallback}>Voltar</Button>}
                        confirmButton={<Button variant="dark" type="submit">{this.props.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'}</Button>} />
                  </Form>
               )
            }
         </>
      )
   }
}
