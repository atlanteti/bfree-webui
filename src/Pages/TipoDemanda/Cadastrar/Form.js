import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import ListCompanies from '../../../Componentes/ListCompanies'
import CircularProgress from '@material-ui/core/CircularProgress'
import { BackGroundForm, BtnBlue, TitleRegister } from '../../../styles/CommonStyles'
import { IoChevronBackCircleSharp } from "react-icons/io5"
import { InputTextField } from '../../../Componentes/FormFields'

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
                  <Form onSubmit={this.handleSubmit} validated={this.state.validated}>
                     <ButtonRow
                        cancelButton={<Button variant="light" onClick={this.redirectCallback}><IoChevronBackCircleSharp size={30} color="#BFCADD" /></Button>}
                        titlePage={<TitleRegister>{this.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Tipos de Demandas</TitleRegister>}
                     />
                     <BackGroundForm xs={1} className={'mb-2'} noGutters>
                        <Row>
                           <Col className="mt-3" xs={12} sm={5}>
                              <InputTextField
                                 id="tdm_name"
                                 label="Nome"
                                 type="text"
                                 maxLength="45"
                                 defaultValue={this.state.primaryData?.tdm_name}
                                 onChange={this.handleChange}
                                 errorMessage={this.state.tdm_name}
                                 required
                                 fullWidth
                              />
                           </Col>
                           <Col className="mt-3" xs={12} sm={5}>
                              <ListCompanies
                                 name="tdm_cpn_cod"
                                 defaultValue={this.props.primaryId}
                                 onChange={this.handleSelect}
                                 errorMessage={this.state.tdm_cpn_cod}
                                 defaultCompany={this.state.primaryData.tdm_cpn_cod ? this.state.primaryData.tdm_cpn_cod : ""}
                                 required />
                           </Col>
                           <Col className="mt-4">
                              <BtnBlue variant="dark" type="submit">Salvar</BtnBlue>
                           </Col>
                        </Row>
                        {this.props.paramRoute === 'inserir'
                           ? ''
                           : (
                              <Row className="mt-6">
                                 <Col md={{ offset: 1 }} xs={12} sm={5}>
                                    <DateField
                                       controlId="tdm_dtcreation"
                                       Label="Data de criação:"
                                       date={this.state.primaryData?.tdm_dtcreation} />
                                 </Col>
                                 {this.state.primaryData?.tdm_dtupdate === null
                                    ? ''
                                    : <Col xs={12} sm={5}>
                                       <DateField
                                          controlId="tdm_dtupdate"
                                          Label="Data de atualização:"
                                          date={this.state.primaryData?.tdm_dtupdate} />
                                    </Col>}
                              </Row>
                           )}
                        <Row>
                        </Row>
                     </BackGroundForm>
                  </Form>
               )}
         </>
      )
   }
}
