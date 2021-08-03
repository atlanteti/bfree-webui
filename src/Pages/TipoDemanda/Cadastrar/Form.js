import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { TextField} from '../../../Componentes/FormFields'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import ListCompanies from '../../../Componentes/ListCompanies'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function TypeDemandForm (props) {
  return <TypeDemandFormBuilder insertDataEndpoint="types-demand/cadastrar"
                        requestDataEndpoint="types-demand/procurar/"
                        editDataEndpoint="types-demand/alterar/"
                        {...props}/>
}

export class TypeDemandFormBuilder extends EditCreateForm {
   formatData()
   {
      return this.state.primaryData
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
              <Form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col>
                        <TextField
                          controlId="tdm_name"
                          Label="Nome:"
                          type="text"
                          defaultValue={this.state.primaryData?.tdm_name}
                          onChange={this.handleChange} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <ListCompanies
                          defaultValue={this.props.primaryId}
                          onChange={this.handleChange}
                          controlId="tdm_cpn_cod"
                          defaultCompany={this.state.primaryData.tdm_cpn_cod ? this.state.primaryData.tdm_cpn_cod : ""}
                          />
                    </Col>
                  </Row>
                  {this.props.paramRoute === 'inserir'
                    ? ''
                    : (
                        <>
                          <DateField
                              controlId="tdm_dtcreation"
                              Label="Data de criação:"
                              date={this.state.primaryData?.tdm_dtcreation} />
                          {this.state.primaryData?.tdm_dtupdate === null
                              ? ''
                              : (
                                <DateField
                                    controlId="tdm_dtupdate"
                                    Label="Data de atualização:"
                                    date={this.state.primaryData?.tdm_dtupdate} />
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
