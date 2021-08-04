import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import { NumberField, TextField } from '../../../Componentes/FormFields'
import ListTypeDemand from '../../../Componentes/ListTypeDemand'
import ListStatusDemands from '../../../Componentes/ListStatusDemands'
import ListResultDemands from '../../../Componentes/ListResultDemands'
import ListUsers from '../../../Componentes/ListUsers'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function DemandForm(props) {
   return <DemandFormBuilder insertDataEndpoint="demands/cadastrar"
      requestDataEndpoint="demands/procurar/"
      editDataEndpoint="demands/alterar/"
      {...props} />
}

export class DemandFormBuilder extends EditCreateForm {
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
                           <NumberField
                              controlId="dem_cli_cod"
                              Label="ID Eduzz:"
                              type="text"
                              maxLength="10"
                              defaultValue={this.state.primaryData?.dem_cli_cod}
                              onChange={this.handleChange} />
                        </Col>
                        <Col>
                           <TextField
                              controlId="dem_externalid"
                              Label="ID Externo:"
                              maxLength="10"
                              defaultValue={this.state.primaryData?.dem_externalid}
                              type="text"
                              onChange={this.handleChange} />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <TextField
                              controlId="dem_title"
                              Label="Titulo:"
                              required
                              type="text"
                              maxLength="45"
                              defaultValue={this.state.primaryData?.dem_title}
                              onChange={this.handleChange} />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <TextField
                              controlId="dem_desc"
                              Label="Descrição:"
                              required
                              as="textarea"
                              maxLength="200"
                              defaultValue={this.state.primaryData?.dem_desc}
                              onChange={this.handleChange} />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <ListUsers
                              defaultValue={this.props.primaryId}
                              onChange={this.handleChange}
                              required
                              controlId="dem_usr_cod"
                              defaultUser={this.state.primaryData.dem_usr_cod}
                              required />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <ListStatusDemands
                              defaultValue={this.props.primaryId}
                              onChange={this.handleChange}
                              required
                              controlId="dem_sdm_cod"
                              defaultStatusDemand={this.state.primaryData.dem_sdm_cod}
                              required />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <ListResultDemands
                              defaultValue={this.props.primaryId}
                              onChange={this.handleChange}
                              required
                              controlId="dem_rdm_cod"
                              defaultResultDemand={this.state.primaryData.dem_rdm_cod}
                              required />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <ListTypeDemand
                              defaultValue={this.props.primaryId}
                              onChange={this.handleChange}
                              controlId="dem_tdm_cod"
                              defaultTypeDemand={this.state.primaryData.dem_tdm_cod}
                              required
                           />
                        </Col>
                     </Row>
                     {this.props.paramRoute === 'inserir'
                        ? ''
                        : (
                           <>
                              <DateField
                                 controlId="dem_dtcreation"
                                 Label="Data de criação:"
                                 date={this.state.primaryData?.dem_dtcreation} />
                              {this.state.primaryData?.dem_dtupdate === null
                                 ? ''
                                 : (
                                    <DateField
                                       controlId="dem_dtupdate"
                                       Label="Data de atualização:"
                                       date={this.state.primaryData?.dem_dtupdate} />
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
