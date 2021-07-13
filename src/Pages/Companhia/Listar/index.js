import "./styles.css";
import { Button, Row, Col } from "react-bootstrap";
import SearchBar from "../../../Componentes/SearchBar";
import { displayDate } from "../../../Componentes/DateField";
import { request } from '../../../Services/api';
import ExclusionModal from "../../../Componentes/ExclusionModal";
import ListarPagina  from "../../../Componentes/ListData";

export default class ListarCompanhia extends ListarPagina
{
   async deleteCompany(id)
   {
      const data = await request({
         method: "delete",
         endpoint:"companies/excluir/"+id
      })
      return data
   }

   async fetchData(page)
   {
      const data = await request({
         method:"get",
         endpoint:"companies/listar",
         params:{
            page: Number(page)
         }
      })
      return data
   }

   async SearchData(nome)
   {
      const data = await request({
         method:"get",
         endpoint:"companies/listar",
         params:
         {
            nome:nome
         }
      })
      return data
   }
   SearchBarCustom() {
      return <SearchBar
      InputPlaceholder="Insira o nome da empresa"
      ButtonLabel="Cadastrar"
      RegisterEndpoint="/cadastrar/companhia/inserir" />;
      }

   TableHeaderCustom() {
      return <tr>
      <th scope="col">ID Eduzz</th>
      <th scope="col">Nome</th>
      <th scope="col">Data de Criação</th>
      <th scope="col">Data de atualização</th>
      <th scope="col">Ações</th>
   </tr>;
   }
   PageHeaderCustom()
   {
      return <h1>A empresa</h1>
   }
   createDataRow(companhia) {
      return <tr key={companhia.usr_cod}>
         <td data-title="ID Eduzz">{companhia.cpn_cli_cod}</td>
         <td data-title="Nome" className="text">{companhia.cpn_name}</td>
         <td data-title="Data de Criação" className="data">
            {displayDate(companhia?.cpn_dtcreation)}
         </td>
         {companhia.cpn_dtupdate == null ? <td data-title="Data de Atualização"><p style={{ color: "transparent" }}>.</p></td> :
            <td data-title="Data de Atualização" className="data">
               {displayDate(companhia?.cpn_dtupdate)}
            </td>}
         <td data-title="Ações">
            <Row noGutters>
               <Col className={"mb-1 mr-1"}><Button block variant="primary" href={`/editar-companhia/${companhia.cpn_cod}/alterar`}>Editar</Button></Col>
               <Col className={"mr-1"}><Button block variant="danger" onClick={this.openModal}>Excluir</Button></Col>
            </Row>
         </td>
         <ExclusionModal
            showModal={this.state.showModal}
            closeModal={this.closeModal}
            pageIdentifier="a empresa" //Talvez isso possa ser generalizado para o contexto da página
            deletionCallback={this.deleteCompany}
            identifierCode={companhia.cpn_cod}
            updateListing={this.updateListing.bind(this)}
            showAlert={this.showAlert.bind(this)} />
      </tr>;
   }
   
   
};

