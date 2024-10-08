import Helmet from 'react-helmet'
import { Component, React } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { CustomMenu } from '../CustomMenu'
import CustomPagination from '../CustomPagination'
import { CustomAlert } from '../CustomAlert'
import {
   MainContainer, Title, MainTable, TableHeader, TableData, CustomMenuCol,
   MainRow, HeaderContainer, RowTopMargin, RightAlignText
} from '../../styles/CommonStyles'
import PropTypes from "prop-types"
import ExclusionModal from '../ExclusionModal'
import CircularProgress from '@material-ui/core/CircularProgress'
import Restricted from '../../Context/AccessPermission'
import { request } from "../../Services/api";
import moment from 'moment';
import { Link } from 'react-router-dom'
import { Cookies } from 'react-cookie';
import { Buffer } from 'buffer';

const cookies = new Cookies();
export default class ListarPagina extends Component {
   constructor(props) {
      super(props)
      this.state = {
         page: 1,
         buscar: '',
         showModal: false,
         responseData: null,
         responseAlertShow: null,
         noDataAlertShow: null,
         redirect: false,
         noData: false,
         user: cookies.get('user'),
         journeys: cookies.get('userType')
      }
      this.requestForm = {
         extraParams: {},
         sort: null,
         isDesc: null,
      }
      this.openModal = this.openModal.bind(this)
      this.closeModal = this.closeModal.bind(this)
      this.fetchAndSetData = this.fetchAndSetData.bind(this)
      this.searchData = this.searchData.bind(this)
      this.listSchedule = this.listSchedule.bind(this)
      this.columnSortArray = []
   }
   async searchData({ extraParams }) {
      this.requestForm.extraParams = extraParams
      return await this.fetchAndSetData({ page: 1 })
   }

   async searchExportData({ extraParams, endpointExport, nameFile }) {
      const s2ab = (s) => {
         var buf = new ArrayBuffer(s.length);
         var view = new Uint8Array(buf);
         for (var i = 0; i != s.length; ++i) view[i] = String.fromCharCode(s[i]) & 0xFF;
         return buf;
      }
      const data = await request({
         method: 'get',
         endpoint: `demands/${endpointExport}`,
         params: {
            ...extraParams,
            dataInicial: nameFile !== "Demandas" ? moment(this.filter.initialDate).format('yyyy-MM-DD') : null,
            dataFinal: nameFile !== "Demandas" ? moment(this.filter.finalDate).format('yyyy-MM-DD') : null,
         }
      })
      var file = new Blob([new Uint8Array(Buffer.from(data.data, 'base64'))], { type: "application/vnd.ms-excel" })
      const url = window.URL.createObjectURL(file)
      var relatorio = window.document.createElement('a');

      relatorio.setAttribute("download", `${nameFile}.xlsx`)
      relatorio.href = url
      // Append anchor to body.
      document.body.appendChild(relatorio)
      relatorio.click();


      // Remove anchor from body
      document.body.removeChild(relatorio)
      return
   }
   async reorderData({ sort, isDesc = false }) {
      this.requestForm.sort = sort
      this.requestForm.isDesc = isDesc
      return await this.fetchAndSetData({ page: 1 })
   }

   async fetchAndSetData({ page = '1' }) {
      const data = await this.fetchData(page, this.requestForm.sort, this.requestForm.isDesc, this.requestForm.extraParams)
      .then(((data) => {
         this.setState({
            responseMetaData: data.meta,
            responseData: data.data,
            page: data.meta.pagination
         }, () => {
            if(!data.data) {
               this.setState({
                  noData: true
               }, () => {
                  this.state.noDataAlertShow({
                     message: "Nenhum registro encontrado",
                     responseType: "Success"
                  })
               })
            }
            else if (data.data.length === 0) {
               this.setState({
                  noData: true
               }, () => {
                  this.state.noDataAlertShow({
                     message: "Nenhum registro encontrado",
                     responseType: "Success"
                  })
               })
            }
            else {
               this.setState({
                  noData: false
               })
            }
         })
      }))
      .catch((error) => {
               this.setState({
                  responseMetaData: "",
                  responseData: [],
                  page: "",
                  noData: true
               }, () => {
                  this.state.noDataAlertShow({
                     message: "Um erro fez com que fosse impossível encontrar esses dados, tente novamente.",
                     responseType: "Success"
                  })
            })
            return
         })
   }

   async listSchedule() {
      const data = await request({
         method: 'post',
         endpoint: `meetings/create-list-of-week`,
      })
      this.state.responseAlertShow(data.meta)
   }

   getAlertCallback(func) { // Investigar se isso precisa ser um estado
      this.setState({
         responseAlertShow: func
      })
   }
   getNoDataCallback(func) {
      this.setState({
         noDataAlertShow: func
      })
   }
   showAlert(data) {
      this.state.responseAlertShow(data)
      this.updateListing()
   }

   subscribe(func) {
      this.columnSortArray.push(func)
   }

   wipe(code) {
      this.columnSortArray.map((wipeArrowFunc) => { return wipeArrowFunc(code) })
   }

   async deleteRecord(id) {
      throw new Error('Método abstrato deve ser implementado')
   }

   async fetchData(page) {
      throw new Error('Método abstrato deve ser implementado')
   }

   createRecord(record) {
      throw new Error('Método abstrato deve ser implementado')
   }

   openModal() {
      this.setState({ showModal: true })
   }

   closeModal() {
      this.setState({ showModal: false })
   }

   updateListing() {
      this.fetchAndSetData({ page: this.state.page.current })
   }

   componentDidMount(oldProps) {
      this.updateListing()
   }

   SearchBarCustom() {
      throw new Error('Componente abstrato deve ser implementado')
   }

   TableHeaderCustom() {
      throw new Error('Componente abstrato deve ser implementado')
   }

   PageHeaderCustom() {
      throw new Error('Componente abstrato deve ser implementado')
   }
   createModal() {
      return <ExclusionModal
         showModal={this.state.showModal}
         closeModal={this.closeModal}
         pageIdentifier={this.state.modalIdentifier} // Talvez isso possa ser generalizado para o contexto da página
         deletionCallback={this.deleteRecord}
         identifierCode={this.state.deletionId}
         updateListing={this.updateListing.bind(this)}
         showAlert={this.showAlert.bind(this)} />
   }
   redirectCallback() {
      return true // Do nothing
   }
   closeMenu() {
      this.setState({
         anchorEl: null,
         idUser: null
      })
   }
   render() {
      return <MainContainer>
         <MainRow>
            <CustomMenu >
               <Container fluid>
                  <CustomAlert
                     showAlertCallback={this.getAlertCallback.bind(this)}
                     redirectCallback={this.redirectCallback.bind(this)}
                  />
                  <Row xs={1}>
                     <this.PageHeaderCustom />
                  </Row>
                  <this.SearchBarCustom
                     filterData={this.searchData}
                     exportData={this.searchExportData}
                     listSchedule={this.listSchedule}
                  />
                  <Row noGutters>
                     <MainTable noData={this.state.noData}
                        className={`table-borderless ${(this.state.noData || window.screen.width <= 425) ? '' : 'table-responsive'}`}
                        style={{ marginBottom: 0 }}>
                        {this.state.responseData === null
                           ?
                           <Row>
                              <Col md={{ offset: 5 }}><CircularProgress /></Col>
                           </Row>
                           :
                           (
                              <>
                                 {this.state.responseData.length ?
                                 <TableHeader>
                                    <this.TableHeaderCustom
                                       sortCallback={this.reorderData.bind(this)}
                                       subscribe={this.subscribe.bind(this)}
                                       wipeAll={this.wipe.bind(this)}
                                       anchorEl={this.state.anchorEl}
                                       idUser={this.state.idUser}
                                       closeMenu={this.closeMenu.bind(this)}
                                       userName={this.state.userName} />
                                 </TableHeader> : null
                                 }
                                 <TableData>
                                    {this.state.responseData.map((companhia) => {
                                       return (
                                          this.createRecord(companhia)
                                       )
                                    })}
                                 </TableData>
                              </>
                           )
                        }
                        {this.createModal()}
                     </MainTable>
                  </Row>
                  <Row noGutters>{this.renderPagination()}</Row>
                  <CustomAlert
                     showAlertCallback={this.getNoDataCallback.bind(this)}
                     redirectCallback={this.redirectCallback.bind(this)}
                     noDataAlert={true}
                     noData={this.state.noData} />
               </Container>
            </CustomMenu>
         </MainRow>
      </MainContainer >
   }

   renderPagination() {
      return !this.state.noData ?
         (<CustomPagination
            fetchAndSetData={this.fetchAndSetData}
            page={this.state.page} />
         ) : null
   }
};

export function PageHeaderCustomComponent(props) {
   return <HeaderContainer fluid>
      <Row style={{marginTop: "1rem"}}>
         <Col>
            <Helmet title={`${props.Title}`} />
            <Title>{props.Title}</Title>
         </Col>
         <Col style={{textAlign:"end"}}>
            <Restricted>
               <Link to={props.href}>
                  <Button variant="register" style={{color: "white"}}>
                     + CADASTRAR {props.Title.toUpperCase()}
                  </Button>
               </Link>
            </Restricted>
         </Col>
      </Row>
   </HeaderContainer>
}

PageHeaderCustomComponent.propTypes =
{
   Title: PropTypes.string.isRequired,
   href: PropTypes.string.isRequired
}
