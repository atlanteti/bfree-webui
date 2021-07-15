import { Button, Row, Col } from "react-bootstrap";
import SearchBar from "../../../Componentes/SearchBar";
import { request } from '../../../Services/api';
import ExclusionModal from "../../../Componentes/ExclusionModal";
import ListarPagina  from "../../../Componentes/ListData";
import {ActionCell, ActionHeaderCell, NumberCell, NumberHeaderCell, 
         SortIcon, TableRow, TextCell, TextHeaderCell } from "../../../styles/styles";
import { Component } from "react";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import {CgArrowsScrollV} from "react-icons/cg"
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

   async fetchData(page, sort, isDesc)
   {
      const data = await request({
         method:"get",
         endpoint:"companies/listar",
         params:{
            page: Number(page),
            sort: sort,
            isDesc: isDesc
         }
      })
      return data
   }
   async reorderData({sort, isDesc=false})
   {
      await this.fetchAndSetData({page: this.state.page.current, sort: sort, isDesc: isDesc})
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

   PageHeaderCustom()
   {
      return "Empresas"
   }

   TableHeaderCustom(props) {
      return <TableRow {...props}>
         <NumberHeaderCell scope="col" variant="Number">
               <SortColumn 
                  label="ID Externo" 
                  attribute="cpn_cli_cod" 
                  sortCallback={props.sortCallback}
                  receiver={props.subscribe}
                  wipeAll={props.wipeAll}/>
         </NumberHeaderCell>
         <TextHeaderCell scope="col" variant="Text"><SortColumn 
                  label="Nome" 
                  attribute="cpn_name" 
                  sortCallback={props.sortCallback}
                  receiver={props.subscribe}
                  wipeAll={props.wipeAll}/></TextHeaderCell>
         <ActionHeaderCell scope="col" variant="Action">Ações</ActionHeaderCell>
      </TableRow>;
   }

   createDataRow(companhia) {
      return <TableRow key={companhia.usr_cod}>
         <NumberCell data-title="ID Eduzz" align="left">{companhia.cpn_cli_cod}</NumberCell>
         <TextCell data-title="Nome" className="text" align="left">{companhia.cpn_name}</TextCell>
         <ActionCell data-title="Ações" align="center">
               <Button variant="warning" href={`/editar-companhia/${companhia.cpn_cod}/alterar`}>Editar</Button>
               <Button variant="dark" onClick={this.openModal}>Excluir</Button>
         </ActionCell>
         <ExclusionModal
            showModal={this.state.showModal}
            closeModal={this.closeModal}
            pageIdentifier="a empresa" //Talvez isso possa ser generalizado para o contexto da página
            deletionCallback={this.deleteCompany}
            identifierCode={companhia.cpn_cod}
            updateListing={this.updateListing.bind(this)}
            showAlert={this.showAlert.bind(this)} />
      </TableRow>;
   }
   
   
};


class SortColumn extends Component
{
   constructor(props)
   {
      super(props)
      this.state = {
         descending: false,
         arrowVisible: false
      }
      this.props.receiver(this.wipe.bind(this))
   }

   wipe(code)
   {
      if(code !== this.code)
      {
         this.setState({
            arrowVisible: false,
            descending: false
         })}
   }

   async reorder()
   {
      this.code = Math.random()
      this.props.wipeAll(this.code)
      await this.props.sortCallback({sort: this.props.attribute, isDesc: this.state.descending} )
      if (!this.state.arrowVisible)
      {
         this.setState({
            arrowVisible: true
         })
      }
      this.setState({
         descending: !this.state.descending
      })
   }
   render()
   {
      return <SortIcon onClick={this.reorder.bind(this)}>
               {this.props.label} 
               {this.state.arrowVisible ?
                  (this.state.descending ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />) : <CgArrowsScrollV/>
               }
             </SortIcon>
   }
}