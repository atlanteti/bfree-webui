import { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { CustomMenu } from "../CustomMenu";
import CustomPagination from "../CustomPagination";
import { CustomAlert } from "../CustomAlert";
import { MainContainer } from "../../styles/styles";


export default class ListarPagina extends Component {
   constructor(props) {
      super(props);
      this.state = {
         page: 1,
         buscar: "",
         showModal: false,
         responseData: null,
         responseAlertShow: null,
      };
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.fetchAndSetData = this.fetchAndSetData.bind(this);
   }

   async fetchAndSetData({ page }) {
      const data = await this.fetchData(page);
      this.setState({
         responseMetaData: data.meta,
         responseData: data.data,
         page: data.meta.pagination,
      });
   }

   getAlertCallback(func) {
      this.setState({
         responseAlertShow: func
      });
   }

   showAlert(data) {
      this.state.responseAlertShow(data);
      this.updateListing();
      window.scroll(0, 0);
   }

   async deleteCompany(id) {
      throw new Error("Método abstrato deve ser implementado");
   }

   async fetchData(page) {
      throw new Error("Método abstrato deve ser implementado");
   }

   async SearchData(nome) {
      throw new Error("Método abstrato deve ser implementado");
   }

   createDataRow(companhia) {
      throw new Error("Método abstrato deve ser implementado");
   }

   openModal() {
      this.setState({ showModal: true });
   }

   closeModal() {
      this.setState({ showModal: false });
   }

   updateListing() {
      this.fetchAndSetData({ page: this.state.page });
   }

   componentDidMount(oldProps) {
      this.updateListing();
   }

   SearchBarCustom() {
      throw new Error("Componente abstrato deve ser implementado");
   }
   TableHeaderCustom() {
      throw new Error("Componente abstrato deve ser implementado");
   }
   PageHeaderCustom()
   {
      throw new Error("Componente abstrato deve ser implementado");
   }
   redirectCallback()
   {
      return true //Do nothing
   }
   render() {
      return <MainContainer fluid>
         <Row>
            <Col xs={1} sm={1} md={1} lg={3}><CustomMenu /></Col>
            <Col>
               <CustomAlert
                  data={this.state.responseMetaData}
                  showAlertCallback={this.getAlertCallback.bind(this)} 
                  redirectCallback={this.redirectCallback.bind(this)}/>
               <Row className="justify-center">
                  <this.PageHeaderCustom/>
               </Row>
               <this.SearchBarCustom />
               <Row>
                  <Table>
                     <thead>
                        <this.TableHeaderCustom />
                     </thead>
                     <tbody>
                        {this.state.responseData === null
                           ? ""
                           : this.state.responseData.map((companhia) => {
                              return (
                                 this.createDataRow(companhia)
                              );
                           })}
                     </tbody>
                  </Table>
               </Row>
               <Row className="mt-3 justify-content-md-center">
                     <CustomPagination
                        fetchAndSetData={this.fetchAndSetData}
                        page={this.state.page} />
               </Row>
            </Col>
         </Row>
      </MainContainer>;
   }

}
;
