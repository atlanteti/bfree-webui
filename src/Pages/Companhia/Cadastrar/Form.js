import React from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { DateField } from '../../../Componentes/DateField'
import { ButtonRow } from '../../../Componentes/ButtonRow'
import { EditCreateForm } from '../../../Componentes/EditCreateForm/index'
import { NumberField, InputTextField } from '../../../Componentes/FormFields'
import CircularProgress from '@material-ui/core/CircularProgress'
import { BackGroundForm, BtnBlue, TitleRegister } from '../../../styles/CommonStyles'
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
                        cancelButton={<Button variant="light" onClick={this.redirectCallback}><IoChevronBackCircleSharp size={30} color="#BFCADD" /></Button>}
                        titlePage={<TitleRegister>{this.paramRoute === 'inserir' ? 'Cadastrar' : 'Editar'} Empresa</TitleRegister>}
                     />
                     <BackGroundForm xs={1} className={'mb-2'} noGutters>
                        <Row>
                           <Col className="mt-3" xs={12} sm={5}>
                              <NumberField
                                 id="cpn_cli_cod"
                                 label="ID Eduzz"
                                 type="text"
                                 maxLength="10"
                                 validated={this.state.validated}
                                 defaultValue={this.state.primaryData?.cpn_cli_cod}
                                 errorMessage={this.state.cpn_cli_cod}
                                 onChange={this.handleChange}
                                 required
                              />
                           </Col>
                           <Col className="mt-3" xs={12} sm={5}>
                              <InputTextField
                                 id="cpn_name"
                                 label="Nome da Empresa"
                                 maxLength="45"
                                 validated={this.state.validated}
                                 defaultValue={this.state.primaryData?.cpn_name}
                                 errorMessage={this.state.cpn_name}
                                 onChange={this.handleChange}
                                 required
                              />
                           </Col>
                           <Col className="mt-4" xs={12} sm={2}>
                              <BtnBlue variant="dark" type="submit">Salvar</BtnBlue>
                           </Col>
                        </Row>
                        {this.props.paramRoute === 'inserir'
                           ? ''
                           : (
                              <Row className="mt-6">
                                 <Col md={{ offset: 1 }} xs={12} sm={5}>
                                    <DateField
                                       controlId="cpn_dtcreation"
                                       Label="Data de criação:"
                                       date={this.state.primaryData?.cpn_dtcreation} />
                                 </Col>
                                 {this.state.primaryData.cpn_dtupdate === null
                                    ? ''
                                    :
                                    <Col xs={12} sm={5}>
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
