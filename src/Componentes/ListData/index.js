import Helmet from 'react-helmet'
import { Component, React } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { CustomMenu } from '../CustomMenu'
import CustomPagination from '../CustomPagination'
import { CustomAlert } from '../CustomAlert'
import {
   MainContainer, Title, MainTable, TableHeader, TableData, CustomMenuCol,
   MainRow, PaginationRow, HeaderContainer, RowTopMargin, RightAlignText
} from '../../styles/CommonStyles'
import PropTypes from "prop-types"
import ExclusionModal from '../ExclusionModal'
import { Redirect } from "react-router-dom"
import CircularProgress from '@material-ui/core/CircularProgress'

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
         noData: false
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
      this.columnSortArray = []
   }
   async searchData({ extraParams }) {
      this.requestForm.extraParams = extraParams
      return await this.fetchAndSetData({ page: 1 })
   }

   async reorderData({ sort, isDesc = false }) {
      this.requestForm.sort = sort
      this.requestForm.isDesc = isDesc
      return await this.fetchAndSetData({ page: 1 })
   }

   async fetchAndSetData({ page = '1' }) {
      const data = await this.fetchData(page, this.requestForm.sort, this.requestForm.isDesc, this.requestForm.extraParams)
      this.setState({
         responseMetaData: data.meta,
         responseData: data.data,
         page: data.meta.pagination
      }, () => {
         if (data.data.length === 0) {
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
      window.scroll(0, 0)
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
                     <this.SearchBarCustom
                        filterData={this.searchData} />
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
                                       <this.TableHeaderCustom
                                          sortCallback={this.reorderData.bind(this)}
                                          subscribe={this.subscribe.bind(this)}
                                          wipeAll={this.wipe.bind(this)}
                                          anchorEl={this.state.anchorEl}
                                          idUser={this.state.idUser}
                                          closeMenu={this.closeMenu.bind(this)}
                                          userName={this.state.userName} />
                                    </TableHeader>
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
                     <CustomAlert
                        showAlertCallback={this.getNoDataCallback.bind(this)}
                        redirectCallback={this.redirectCallback.bind(this)}
                        noDataAlert={true}
                        noData={this.state.noData} />
                     <PaginationRow>
                        <CustomPagination
                           fetchAndSetData={this.fetchAndSetData}
                           page={this.state.page} />
                     </PaginationRow>
                  </Container>
               </Col>
            </Col>
         </MainRow>
      </MainContainer>
   }
};

export function PageHeaderCustomComponent(props) {
   return <HeaderContainer fluid>
      <RowTopMargin >
         <Col>
            <Helmet title={`${props.Title}`} />
            <Title>{props.Title}</Title>
         </Col>
         <RightAlignText>
            <Col><Button variant="dark" href={props.href}>Cadastrar</Button></Col>
         </RightAlignText>
      </RowTopMargin>
   </HeaderContainer>
}

PageHeaderCustomComponent.propTypes =
{
   Title: PropTypes.string.isRequired,
   href: PropTypes.string.isRequired
}