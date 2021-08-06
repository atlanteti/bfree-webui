import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import { NumberField, TextField } from '../../../Componentes/FormFields'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function CompanyForm(props) {
   return <CompanyFormBuilder insertDataEndpoint="companies/cadastrar"
      requestDataEndpoint="companies/procurar/"
      editDataEndpoint="companies/alterar/"
      {...props} />
}

export class CompanyFormBuilder extends EditCreateForm {
   formatData() {
      return {
         ...this.state.primaryData,
         cpn_cli_cod: Number(this.state.primaryData.cpn_cli_cod)
      };
   }
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
                           <NumberField
                              controlId="cpn_cli_cod"
                              Label="ID Eduzz:"
                              type="text"
                              maxLength="10"
                              defaultValue={this.state.primaryData?.cpn_cli_cod}
                              errorMessage={this.state.cpn_cli_cod}
                              onChange={this.handleChange}
                              required />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <TextField
                              controlId="cpn_name"
                              Label="Nome:"
                              type="text"
                              defaultValue={this.state.primaryData?.cpn_name}
                              onChange={this.handleChange}
                              errorMessage={this.state.cpn_name}
                              required
                              maxLength="45" />
                        </Col>
                     </Row>
                     {this.props.paramRoute === 'inserir'
                        ? ''
                        : (
                           <>
                              <DateField
                                 controlId="cpn_dtcreation"
                                 Label="Data de criação:"
                                 date={this.state.primaryData?.cpn_dtcreation} />
                              {this.state.primaryData.cpn_dtupdate === null
                                 ? ''
                                 : (
                                    <DateField
                                       controlId="cpn_dtupdate"
                                       Label="Data de atualização:"
                                       date={this.state.primaryData?.cpn_dtupdate} />
                                 )}
                           </>
                        )}
                     <ButtonRow
                        cancelButton={<Button variant="warning" onClick={this.redirectCallback}>Voltar</Button>}
                        confirmButton={<Button variant="dark" type="submit">{this.props.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'}</Button>} />
                  </Form>
               )}
         </>
      )
   }
}
