import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import { BooleanField, TextField } from '../../../Componentes/FormFields'
import ListCompanies from '../../../Componentes/ListCompanies'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function TeamForm(props) {
   return <TeamFormBuilder insertDataEndpoint="teams/cadastrar"
      requestDataEndpoint="teams/procurar/"
      editDataEndpoint="teams/alterar/"
      {...props} />
}

export class TeamFormBuilder extends EditCreateForm {
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
               <Form onSubmit={this.handleSubmit}>
                  <Row>
                     <Col>
                        <TextField
                           controlId="tea_name"
                           Label="Nome:"
                           type="text"
                           defaultValue={this.state.primaryData?.tea_name}
                           onChange={this.handleChange} />
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                     <ListCompanies
                           defaultValue={this.props.primaryId}
                           onChange={this.handleChange}
                           controlId="tea_cpn_cod"
                           defaultCompany={this.state.primaryData.tea_cpn_cod ? this.state.primaryData.tea_cpn_cod : null} />
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                        <BooleanField Label="Status:"
                           onTrue="Ativo"
                           onFalse="Inativo"
                           controlId="tea_active"
                           key="tea_active"
                           onChange={this.handleChange}
                           register={true}
                           value={this.state.primaryData?.tea_active}/>
                     </Col>
                  </Row>
                  {this.props.paramRoute === 'inserir'
                     ? ''
                     : (
                        <>
                           <DateField
                              controlId="tea_dtcreation"
                              Label="Data de criação:"
                              date={this.state.primaryData?.tea_dtcreation} />
                           {this.state.primaryData?.tea_dtupdate === null
                              ? ''
                              : (
                                 <DateField
                                    controlId="tea_dtupdate"
                                    Label="Data de atualização:"
                                    date={this.state.primaryData?.tea_dtupdate} />
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
