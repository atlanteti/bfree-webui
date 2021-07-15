import { Component, React } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { CustomMenu } from '../CustomMenu'
import CustomPagination from '../CustomPagination'
import { CustomAlert } from '../CustomAlert'
import { MainContainer, Title, Table, TableHeader, TableData } from '../../styles/styles'

export default class ListarPagina extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      buscar: '',
      showModal: false,
      responseData: null,
      responseAlertShow: null
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.fetchAndSetData = this.fetchAndSetData.bind(this)
    this.columnSortArray = []
  }

  async fetchAndSetData ({ page = 1, sort, isDesc = false }) {
    const data = await this.fetchData(page, sort, isDesc)
    this.setState({
      responseMetaData: data.meta,
      responseData: data.data,
      page: data.meta.pagination
    })
  }

  getAlertCallback (func) { // Investigar se isso precisa ser um estado
    this.setState({
      responseAlertShow: func
    })
  }

  showAlert (data) {
    this.state.responseAlertShow(data)
    this.updateListing()
    window.scroll(0, 0)
  }

  subscribe (func) {
    this.columnSortArray.push(func)
  }

  wipe (code) {
    this.columnSortArray.map((wipeArrowFunc) => { return wipeArrowFunc(code) })
  }

  async deleteRecord (id) {
    throw new Error('Método abstrato deve ser implementado')
  }

  async fetchData (page) {
    throw new Error('Método abstrato deve ser implementado')
  }

  async SearchData (nome) {
    throw new Error('Método abstrato deve ser implementado')
  }

  async reorderData (sort) {
    throw new Error('Método abstrato deve ser implementado')
  }

  createRecord (record) {
    throw new Error('Método abstrato deve ser implementado')
  }

  openModal () {
    this.setState({ showModal: true })
  }

  closeModal () {
    this.setState({ showModal: false })
  }

  updateListing () {
    this.fetchAndSetData({ page: this.state.page })
  }

  componentDidMount (oldProps) {
    this.updateListing()
  }

  SearchBarCustom () {
    throw new Error('Componente abstrato deve ser implementado')
  }

  TableHeaderCustom () {
    throw new Error('Componente abstrato deve ser implementado')
  }

  PageHeaderCustom () {
    throw new Error('Componente abstrato deve ser implementado')
  }

  redirectCallback () {
    return true // Do nothing
  }

  render () {
    return <MainContainer>
         <Row>
            <Col xs={1} sm={1} md={1} lg={3}><CustomMenu /></Col>
            <Col>
               <Container fluid>
                  <CustomAlert
                     data={this.state.responseMetaData}
                     showAlertCallback={this.getAlertCallback.bind(this)}
                     redirectCallback={this.redirectCallback.bind(this)}/>
                  <Row>
                     <Title>
                        <this.PageHeaderCustom/>
                     </Title>
                  </Row>
                  <this.SearchBarCustom />
                  <Row>
                     <Table>
                        <TableHeader>
                           <this.TableHeaderCustom
                              sortCallback={this.reorderData.bind(this)}
                              subscribe={this.subscribe.bind(this)}
                              wipeAll={this.wipe.bind(this)}/>
                        </TableHeader>
                        <TableData>
                           {this.state.responseData === null
                             ? ''
                             : this.state.responseData.map((companhia) => {
                               return (
                                 this.createRecord(companhia)
                               )
                             })}
                        </TableData>
                     </Table>
                  </Row>
                  <Row>
                        <CustomPagination
                           fetchAndSetData={this.fetchAndSetData}
                           page={this.state.page} />
                  </Row>
               </Container>
            </Col>
         </Row>
      </MainContainer>
  }
}
;