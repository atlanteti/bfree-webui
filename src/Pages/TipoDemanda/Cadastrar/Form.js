import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { TextField } from '../../../Componentes/FormFields'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import ListCompanies from '../../../Componentes/ListCompanies'
import CircularProgress from '@material-ui/core/CircularProgress'
import { BackGroundForm, BtnSalvar, TitleRegister } from '../../../styles/CommonStyles'
import { IoChevronBackCircleSharp } from "react-icons/io5"

export default function TypeDemandForm(props) {
   return <TypeDemandFormBuilder insertDataEndpoint="types-demand/cadastrar"
      requestDataEndpoint="types-demand/procurar/"
      editDataEndpoint="types-demand/alterar/"
      {...props} />
}

export class TypeDemandFormBuilder extends EditCreateForm {
   formatData() {
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
                  <Form onSubmit={this.handleSubmit} validated={this.state.validated} noValidate>
                     <ButtonRow
                        cancelButton={<Button variant="light" onClick={this.redirectCallback}><IoChevronBackCircleSharp size={30} color="#E0E7F2" /></Button>}
                        titlePage={<TitleRegister>{this.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Tipos de Demandas</TitleRegister>}
                     />
                     <BackGroundForm xs={1} className={'mb-2'} noGutters>
                        <Row>
                           <Col xs={12} sm={6}>
                              <TextField
                                 controlId="tdm_name"
                                 errorMessage={this.state.tdm_name}
                                 placeHolder="Nome"
                                 type="text"
                                 maxLength="45"
                                 defaultValue={this.state.primaryData?.tdm_name}
                                 onChange={this.handleChange}
                                 required />
                           </Col>
                           <Col xs={12} sm={6}>
                              <ListCompanies
                                 defaultValue={this.props.primaryId}
                                 onChange={this.handleChange}
                                 controlId="tdm_cpn_cod"
                                 errorMessage={this.state.tdm_cpn_cod}
                                 defaultCompany={this.state.primaryData.tdm_cpn_cod ? this.state.primaryData.tdm_cpn_cod : ""}
                                 required />
                           </Col>
                        </Row>
                        <Row>
                           <Col md={{ offset: 5 }}>
                              <BtnSalvar variant="dark" type="submit">Salvar</BtnSalvar>
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
                     </BackGroundForm>
                  </Form>
               )}
         </>
      )
   }
}
