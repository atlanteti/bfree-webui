import { Col, Container, Form, Row } from 'react-bootstrap'
import { request } from '../../../Services/api'
import ListarPagina from '../../../Componentes/ListData'
import {
   TableRow, TextCell, TextHeaderCell, Title,
   HeaderContainer, RowTopMargin, NumberCell,
   MainContainer, MainRow, TableHeader,
   MainTable, ReportTableData, SearchBarBorder, BtnBlue, DataSearchTitle, ExportContainer
} from '../../../styles/CommonStyles'
import { React } from 'react'
import { CustomMenu } from '../../../Componentes/CustomMenu'
import { CustomAlert } from '../../../Componentes/CustomAlert'
import { CircularProgress } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import { ValidationTextField } from '../../../Componentes/FormFields'
import DatePicker from "react-datepicker";
import moment from 'moment'
import ListUsers from '../../../Componentes/ListUsers'
import ContextLogin from "../../../Context/ContextLogin";
import Restricted from '../../../Context/AccessPermission'
import { AiOutlineUpload } from "react-icons/ai"
import ListTypeDemand from '../../../Componentes/ListTypeDemand'
import NoDataComp from '../../../Componentes/NoDataComp'
import CustomPagination from '../../../Componentes/CustomPagination'

export default class ListarRelatorio extends ListarPagina {
   constructor(props) {
      super(props)
      this.state = {
         ...this.state,
         headerData: [],
         formData: {},
         initialDate: new Date(moment().startOf('isoWeek')),
         finalDate: new Date(moment().weekday(7))
      }
      this.filter = {
         initialDate: new Date(moment().startOf('isoWeek')),
         finalDate: new Date(moment().weekday(7)),
      }
      this.onChange = this.onChange.bind(this)
      this.requestExportData = this.requestExportData.bind(this)
   }

   async fetchData(page) {
      let data = await request({
         method: 'get',
         endpoint: 'demands/report-billing',
         params: {
            page: Number(page),
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
      this.setState({ responseData: null })
      this.fetchAndSetData({ page: 1 })
   }

   PageHeaderCustom() {
      return <HeaderContainer fluid>
         <RowTopMargin >
            <Col>
               <Helmet title={"Relatórios"} />
               <Title>{"Relatórios"}</Title>
            </Col>
         </RowTopMargin>
      </HeaderContainer>
   }

   TableHeaderCustom(props) {
      return <TableRow {...props}>
      </TableRow>
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

   handleSelect = (e) => {
      this.setState(({
         formData: {
            ...this.state.formData,
            [e.target.name]: e.target.value
         },
      }))
   }

   render() {
      return <MainContainer>
         <MainRow>
            {/* Layout usado nesse componente deve ser repetido em custommenucol equivalente dentro do arquivo do componente */}
            <CustomMenu>
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
                           <Col xs={12} md={3} sm={5}>
                              <NoDataComp />
                              <Row>
                                 <Col className="mt-2">
                                    <ListUsers
                                       name="usr_cod"
                                       userJourney="list-has-journey"
                                       fullWidth
                                       defaultValue={this.context.admin ? this.state.formData?.usr_cod : this.context.user}
                                       defaultUser={this.context.admin ? this.state.formData?.usr_cod : this.context.user}
                                       disabled={!this.context.admin}
                                       onChange={this.context.admin ? this.handleSelect : null}
                                    />
                                 </Col>
                              </Row>
                           </Col>
                           {this.context.admin &&
                              <Col className="mt-2" xs={12} md={3} sm={5}>
                                 <NoDataComp />
                                 <ListTypeDemand
                                    onChange={this.handleSelect}
                                    name="tdm_cod"
                                 />
                              </Col>
                           }
                           <Col xs={12} md={6} sm={7}>
                              <DataSearchTitle>Pesquisar por período</DataSearchTitle>
                              <Row>
                                 <Col className="mt-2">
                                    <DatePicker
                                       placeholderText="dd/mm/aaaa"
                                       dateFormat="dd/MM/yyyy"
                                       selected={this.state.initialDate}
                                       onChange={(dateSelect) => this.changeDate(dateSelect, "initialDate")}
                                       customInput={
                                          <ValidationTextField
                                             label="Data Inicial"
                                             type="text"
                                             fullWidth
                                          />
                                       }
                                    />
                                 </Col>
                                 <Col className="mt-2">
                                    <DatePicker
                                       placeholderText="dd/mm/aaaa"
                                       dateFormat="dd/MM/yyyy"
                                       selected={this.state.finalDate}
                                       maxDate={new Date(moment().weekday(7))}
                                       onChange={(dateSelect) => this.changeDate(dateSelect, "finalDate")}
                                       customInput={
                                          <ValidationTextField
                                             label="Data Final"
                                             type="text"
                                             fullWidth
                                          />
                                       }
                                    />
                                 </Col>
                              </Row>
                           </Col>
                           <Col className="mt-3" xs={12} md={2} sm={5}>
                              <NoDataComp />
                              <Row>
                                 <Col>
                                    <BtnBlue type="submit" variant="dark">Buscar</BtnBlue>
                                 </Col>
                              </Row>
                           </Col>
                        </Row>
                     </Form>
                  </SearchBarBorder>
                  <Col>
                     <Row>
                        <Restricted>
                           <ExportContainer onClick={(event) => this.requestExportData(event, "export-billing", "Relatorio")}>
                              <AiOutlineUpload size={23} className="mr-2" /> EXPORTAR EXCEL
                           </ExportContainer>
                        </Restricted>
                     </Row>
                  </Col>
                  <Row noGutters>
                     {this.state.responseData === null
                        ?
                        <Row style={{ flex: 1 }}>
                           <Col className="mt-6 d-flex justify-content-center"><CircularProgress /></Col>
                        </Row>
                        :
                        (
                           <>
                              <MainTable
                                 noData={this.state.noData}
                                 className={`table-borderless ${(this.state.noData || window.screen.width <= 425) ? '' : 'table-responsive'}`}
                              >
                                 <TableHeader>

                                    <TableRow>
                                       {this.state.headerData.map((column) => {
                                          return (
                                             <TextHeaderCell scope="col">
                                                {column}
                                             </TextHeaderCell>
                                          )
                                       })}
                                    </TableRow>
                                 </TableHeader>
                                 <ReportTableData>
                                    {this.state.responseData.slice(0, -1).map((user) => {
                                       return (
                                          <TableRow>{user.map((data) => {
                                             return <TextCell data-title={data[0]} Elipse>{data[1]}</TextCell>
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
                              </MainTable>
                           </>
                        )
                     }
                     {this.createModal()}
                  </Row>
                  <CustomAlert
                     showAlertCallback={this.getNoDataCallback.bind(this)}
                     redirectCallback={this.redirectCallback.bind(this)}
                     noDataAlert={true}
                     noData={this.state.noData} />
                  {this.context.admin && this.renderPagination()}
               </Container>

            </CustomMenu>
         </MainRow>
      </MainContainer >
   }
};
ListarRelatorio.contextType = ContextLogin;
