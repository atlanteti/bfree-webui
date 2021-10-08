import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import { NumberField, TextField } from '../../../Componentes/FormFields'
import CircularProgress from '@material-ui/core/CircularProgress'
import { BackGroundForm, BtnSalvar, TitleRegister } from '../../../styles/CommonStyles'
import { IoChevronBackCircleSharp } from "react-icons/io5"

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
                     <ButtonRow
                        cancelButton={<Button variant="light" onClick={this.redirectCallback}><IoChevronBackCircleSharp size={30} color="#E0E7F2" /></Button>}
                        titlePage={<TitleRegister>{this.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Empresa</TitleRegister>}
                     />
                     <BackGroundForm xs={1} className={'mb-2'} noGutters>
                        <Row>
                           <Col xs={12} sm={5}>
                              <NumberField
                                 controlId="cpn_cli_cod"
                                 placeHolder="ID Eduzz"
                                 type="text"
                                 maxLength="10"
                                 defaultValue={this.state.primaryData?.cpn_cli_cod}
                                 errorMessage={this.state.cpn_cli_cod}
                                 onChange={this.handleChange}
                                 required />
                           </Col>
                           <Col xs={12} sm={5}>
                              <TextField
                                 controlId="cpn_name"
                                 placeHolder="Nome"
                                 type="text"
                                 defaultValue={this.state.primaryData?.cpn_name}
                                 onChange={this.handleChange}
                                 errorMessage={this.state.cpn_name}
                                 required
                                 maxLength="45" />
                           </Col>
                           <Col xs={12} sm={2}><BtnSalvar variant="dark" type="submit">Salvar</BtnSalvar></Col>
                        </Row>
                        {this.props.paramRoute === 'inserir'
                           ? ''
                           : (
                              <Row>
                                 <Col>
                                    <DateField
                                       controlId="cpn_dtcreation"
                                       Label="Data de criação:"
                                       date={this.state.primaryData?.cpn_dtcreation} />
                                 </Col>
                                 {this.state.primaryData.cpn_dtupdate === null
                                    ? ''
                                    :
                                    <Col>
                                       <DateField
                                          controlId="cpn_dtupdate"
                                          Label="Data de atualização:"
                                          date={this.state.primaryData?.cpn_dtupdate} />
                                    </Col>
                                 }
                              </Row>
                           )}
                     </BackGroundForm>
                  </Form>
               )}
         </>
      )
   }
}
