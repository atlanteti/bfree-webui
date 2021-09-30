import { Button, Col, Container, Form, Row } from 'react-bootstrap'
// import SearchBar from '../../../Componentes/SearchBar'
import { request } from '../../../Services/api'
import ExclusionModal from '../../../Componentes/ExclusionModal'
import ListarPagina, { PageHeaderCustomComponent } from '../../../Componentes/ListData'
import {
   ActionCell, ActionHeaderCell,
   RightAlignText,
   TableRow, TextCell, TextHeaderCell, Title,
   HeaderContainer, RowTopMargin, NumberCell,
   MainContainer, MainRow, CustomMenuCol, TableHeader,
   TableData, MainTable, ReportTableData, SearchBarBorder
} from '../../../styles/CommonStyles'
import SortColumn from '../../../Componentes/SortColumn'
import { React } from 'react'
import { CustomMenu } from '../../../Componentes/CustomMenu'
import { CustomAlert } from '../../../Componentes/CustomAlert'
import { CircularProgress, LinearProgress } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import { TextField } from '../../../Componentes/FormFields'
import DatePicker from "react-datepicker";
import moment from 'moment'
import ListUsers from '../../../Componentes/ListUsers'
import ContextLogin from "../../../Context/ContextLogin";

// import { JourneySearchBar } from './JourneySearchBar'

export default class ListarRelatorio extends ListarPagina {
   constructor(props) {
      super(props)
      this.state = {
         ...this.state,
         headerData: [],
         formData: {},
         initialDate: new Date(moment().startOf('week')),
         finalDate: new Date(moment().weekday(7))
      }
      this.filter = {
         initialDate: new Date(moment().startOf('week')),
         finalDate: new Date(moment().weekday(7)),
      }
      this.onChange = this.onChange.bind(this)
      this.requestExportData = this.requestExportData.bind(this)
   }

   async fetchData() {
      let data = await request({
         method: 'get',
         endpoint: 'demands/report-billing',
         params: {
            ...this.state.formData,
            dataInicial: moment(this.filter.initialDate).format('yyyy-MM-DD'),
            dataFinal: moment(this.filter.finalDate).format('yyyy-MM-DD'),
         }
      }).then((data) => {
         let bodyData = data.data.splice(1)
         this.setState({
            headerData: data.data[0]
         })
         const numbers = bodyData.map(line => line.slice(1))
         const numbersTransposed = numbers[0].map((_, colIndex) => numbers.map(row => row[colIndex]))
         const reducedSum = numbersTransposed.map(
            line => line.reduce(
               (partial_sum, accumulator) => Number(partial_sum) + Number(accumulator), 0))
         const lastLine = ["Total"].concat(reducedSum)
         bodyData = bodyData.concat([lastLine])
         data.data = bodyData.map(
            line => line.map(
               (lineData, keyIndex) => { return [data.data[0][keyIndex], lineData] }))
         return data
      })
      return data
   }
   onSubmit(e) {
      e.preventDefault()
      this.fetchAndSetData({page:1})
   }

   PageHeaderCustom() {
      return <HeaderContainer fluid>
         <RowTopMargin >
            <Col>
               <Helmet title={"Relatório"} />
               <Title>{"Relatório"}</Title>
            </Col>
         </RowTopMargin>
      </HeaderContainer>
   }

   TableHeaderCustom(props) {
      return <TableRow {...props}>
      </TableRow>
   }

   renderPagination() {
      return null
   }

   createRecord(user) {
      return <TableRow>{user.map((data) => {
         return <NumberCell>{data}</NumberCell>
      })}</TableRow>
   }

   requestExportData(event, endpointExport, nameFile) {
      event.preventDefault()
      let data = this.searchExportData({ extraParams: this.state.formData, endpointExport, nameFile })
      return
   }

   changeDate(date, id) {
      this.filter = {
         ...this.filter,
         [id]: date ? moment(date).format('yyyy-MM-DD') : null
      }
      this.setState({
         [id]: date
      })
   }

   onChange(event) {
      this.setState({
         formData: {
            ...this.state.formData,
            [event.target.id]: event.target.value.trim()
         }
      })
   }

   render() {
      return <MainContainer>
         <MainRow>
            {/* Layout usado nesse componente deve ser repetido em custommenucol equivalente dentro do arquivo do componente */}
            <CustomMenuCol lg={2}><CustomMenu /></CustomMenuCol>
            <Col>
               <Col>
                  <Container fluid>
                     <CustomAlert
                        showAlertCallback={this.getAlertCallback.bind(this)}
                        redirectCallback={this.redirectCallback.bind(this)}
                     />
                     <Row xs={1}>
                        <this.PageHeaderCustom />
                     </Row>
                     <SearchBarBorder>
                        <Form onSubmit={this.onSubmit.bind(this)}>
                           <Row>
                           <Col>
                              <ListUsers
                                 controlId="usr_cod"
                                 defaultValue={this.context.admin ? null : this.context.user}
                                 defaultUser={this.context.admin ? null : this.context.user}
                                 disabled={!this.context.admin}
                                 onChange={this.context.admin ? this.onChange : null}
                              />
                           </Col>
                              <Col>
                                 <DatePicker
                                    placeholderText="dd/mm/aaaa"
                                    dateFormat="dd/MM/yyyy"
                                    selected={this.state.initialDate}
                                    onChange={(dateSelect) => this.changeDate(dateSelect, "initialDate")}
                                    customInput={
                                       <TextField
                                          Label="Data Inicial"
                                          type="text"
                                       />
                                    }
                                 />
                              </Col>
                              <Col>
                                 <DatePicker
                                    placeholderText="dd/mm/aaaa"
                                    dateFormat="dd/MM/yyyy"
                                    selected={this.state.finalDate}
                                    onChange={(dateSelect) => this.changeDate(dateSelect, "finalDate")}
                                    customInput={
                                       <TextField
                                          Label="Data Final"
                                          type="text"
                                       />
                                    }
                                 />
                              </Col>
                           </Row>
                           <Row>
                              <Col>
                                 <Button type="submit" variant="warning">Buscar</Button>
                                 <Button 
                                    onClick={(event) => this.requestExportData(event, "export-billing", "Relatorio")}
                                    className="ml-2" 
                                    variant="dark"
                                 >
                                    Exportar excel
                                 </Button>
                              </Col>
                           </Row>
                        </Form>
                     </SearchBarBorder>
                     <Row noGutters>
                        <MainTable noData={this.state.noData}>
                           {this.state.responseData === null
                              ?
                              <Row>
                                 <Col md={{ offset: 5 }}><CircularProgress /></Col>
                              </Row>
                              :
                              (
                                 <>
                                    <TableHeader>

                                       <TableRow>
                                          {this.state.headerData.map((column) => {
                                             return (
                                                <TextHeaderCell scope="col">
                                                   {column}
                                                </TextHeaderCell>
                                             )
                                          })}
                                          {/* <this.TableHeaderCustom
                                             sortCallback={this.reorderData.bind(this)}
                                             subscribe={this.subscribe.bind(this)}
                                             wipeAll={this.wipe.bind(this)}
                                             anchorEl={this.state.anchorEl}
                                             idUser={this.state.idUser}
                                             closeMenu={this.closeMenu.bind(this)}
                                             userName={this.state.userName} /> */}
                                       </TableRow>
                                    </TableHeader>
                                    <ReportTableData>
                                       {this.state.responseData.slice(0, -1).map((user) => {
                                          return (
                                             <TableRow>{user.map((data) => {
                                                return <TextCell data-title={data[0]}>{data[1]}</TextCell>
                                             })}</TableRow>
                                          )
                                       })}
                                       {this.state.responseData.slice(-1).map((user) => {
                                          return (
                                             <TableRow>{user.map((data) => {
                                                return <TextCell data-title={data[0].toLowerCase() === "operador" ? "" : data[0]} fontTotal>{data[1]}</TextCell>
                                             })}</TableRow>
                                          )
                                       })}
                                    </ReportTableData>
                                 </>
                              )
                           }
                           {this.createModal()}
                        </MainTable>
                     </Row>
                     <CustomAlert
                        showAlertCallback={this.getNoDataCallback.bind(this)}
                        redirectCallback={this.redirectCallback.bind(this)}
                        noDataAlert={true}
                        noData={this.state.noData} />
                     {this.renderPagination()}
                  </Container>
               </Col>
            </Col>
         </MainRow>
      </MainContainer >
   }
};
ListarRelatorio.contextType = ContextLogin;
