import { useEffect, useState,Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import { Pagination, Button, Modal, Container, Row, Col, Table } from "react-bootstrap";
import moment from "moment";
import { CustomMenu } from "../../../Componentes/CustomMenu";
import SearchBar from "../../../Componentes/SearchBar";
import { displayDate } from "../../../Componentes/DateField";
import { request } from '../../../Services/api';
import ExclusionModal from "../../../Componentes/ExclusionModal";
import CustomPagination from "../../../Componentes/CustomPagination";

export default class ListarCompanhia extends Component
{
   constructor(props)
   {
      super(props)
      this.state = {
         page: 1,
         buscar: "",
         showModal: false,
         ListedData: null
      }
      this.openModal = this.openModal.bind(this)
      this.closeModal = this.closeModal.bind(this)
      this.fetchAndSetData = this.fetchAndSetData.bind(this)
   }
   async deleteCompany(id)
   {
      const data = await request({
         method: "delete",
         endpoint:"companies/excluir/"+id
      })
      return data
   }

   async fetchAndSetData({page})
   {
      const data = await this.fetchData(page)
      this.setState({
         ListedData: data.data,
         page: data.meta.pagination
      })
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
   openModal()
   {
      this.setState({showModal:true})
   }
   closeModal()
   {
      this.setState({showModal:false})
   }
   updateListing()
   {
      this.fetchAndSetData({page: this.state.page})
   }
   componentDidMount()
   {
      this.updateListing()
   }
   render()
   {
      return <Container fluid>
      <Row>
         <Col xs={1} sm={1} md={1} lg={3}><CustomMenu/></Col>
         <Col>
            <SearchBar 
               InputPlaceholder="teste"
               ButtonLabel="Cadastrar"
               RegisterEndpoint="/cadastrar/companhia/inserir"/>
            <Row>
               <Table>
                  <thead>
                     <tr>
                        <th scope="col">ID Eduzz</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Data de Criação</th>
                        <th scope="col">Data de atualização</th>
                        <th scope="col">Ações</th>
                     </tr>
                  </thead>
                  <tbody>
                     {this.state.ListedData === null
                        ? ""
                        : this.state.ListedData.map((companhia) => {
                           return (
                              <tr key={companhia.usr_cod}>
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
                                    pageIdentifier="a companhia"
                                    deletionCallback={this.deleteCompany}
                                    identifierCode={companhia.cpn_cod}
                                    updateListing={this.updateListing.bind(this)}
                                    />
                              </tr>
                           );
                        })}
                  </tbody>
               </Table>
            </Row>
            <Row span={5} offset={3} className="mt-3">
               <Col>
                  <CustomPagination 
                     fetchAndSetData = {this.fetchAndSetData}
                     page = {this.state.page}/>
               </Col>
            </Row>
         </Col>
      </Row>
   </Container>
   }


};
function ListarCompanhia2() {
   const [companhia, setCompanhia] = useState(null);
   const [buscar, setBuscar] = useState(null);
   const [page, setPage] = useState({});
   const [horaUpd, setHoraUpd] = useState();
   const [horaCriacao, setHoraCriacao] = useState();
   const [showModal, setShowModal] = useState(false);

   const handleClose = () => setShowModal(false);

   function buscarNome(event) {
      const value = event.target.value;
      setBuscar(value);
   }

   const buscarEnter = (event) => {
      if (event.keyCode === 13) {
         requestData(event, buscar);
      }
   };

   async function deletarCompanhia(id) {
      try {
         await axios({
            method: "delete",
            url: `http://209.97.146.187:18919/companies/excluir/${id}`,
         });
         // window.location.reload();
      } catch (error) {
         alert(error);
      }
   }

   const requestData = async (e, param = "", page = 1) => {
      try {
         if (e) {
            e.preventDefault();
         }
         const { data } = await axios({
            method: "get",
            url: "http://209.97.146.187:18919/companies/listar",
            params: {
               nome: param,
               page: page,
            },
         });
         setHoraCriacao(moment(data.data.cpn_dtcreation).format("hh"))
         setHoraUpd(moment(data.data.cpn_dtupdate).format("hh"))
         setCompanhia(data.data);
         setPage(data.meta.pagination);
      } catch (error) {
         alert(error);
      }
   };

   useEffect(() => {
      requestData();
   }, []);
   return (
      <Container fluid>
         <Row>
            <Col xs={1} sm={1} md={1} lg={3}><CustomMenu/></Col>
            <Col>
               <SearchBar />
               <Row>
                  <Table>
                     <thead>
                        <tr>
                           <th scope="col">ID Eduzz</th>
                           <th scope="col">Nome</th>
                           <th scope="col">Data de Criação</th>
                           <th scope="col">Data de atualização</th>
                           <th scope="col">Ações</th>
                        </tr>
                     </thead>
                     <tbody>
                        {companhia === null
                           ? ""
                           : companhia.map((companhia) => {
                              return (
                                 <tr key={companhia.usr_cod}>
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
                                          <Col className={"mb-1 mr-1"}><Button block variant="primary" href={`/editar-companhia/${companhia.cpn_cod}/"alterar"`}>Editar</Button></Col>
                                          <Col className={"mr-1"}><Button block variant="danger" onClick={()=>setShowModal(true)}>Excluir</Button></Col>
                                       </Row>
                                    </td>
                                    {/* <td data-title="Ações" className="acoes">
                                       <Link className="btn btn-warning" to={`/editar-companhia/${companhia.cpn_cod}/"alterar"`}>Editar</Link>
                                       <button className="btn btn-dark" onClick={() => setShowModal(true)}>
                                          Excluir
                                       </button>
                                    </td> */}
                                    <Modal show={showModal} onHide={handleClose}>
                                       <Modal.Header closeButton>
                                          <Modal.Title>Erro!</Modal.Title>
                                       </Modal.Header>
                                       <Modal.Body>Você deseja excluir a companhia?</Modal.Body>
                                       <Modal.Footer>
                                          <Button variant="danger" onClick={handleClose}>
                                             Não
                                          </Button>
                                          <Button variant="warning" onClick={() => deletarCompanhia(companhia.cpn_cod)}>
                                             Excluir
                                          </Button>
                                       </Modal.Footer>
                                    </Modal>
                                 </tr>
                              );
                           })}
                     </tbody>
                  </Table>
               </Row>
               <Row span={5} offset={3} className="mt-3">
                  <Col>
                     <Pagination className="pagination">
                        <Pagination.First onClick={(e) => {
                           requestData(e, buscar, 1)
                           window.scroll(0, 0)
                        }} />
                        <Pagination.Prev
                           disabled={page.current === 1 ? true : false}
                           onClick={(e) => {
                              requestData(e, buscar, page.current - 1)
                              window.scroll(0, 0)
                           }}
                        />
                        {page.current >= 3 ? <Pagination.Ellipsis disabled={true} /> : null}
                        {page.current >= 2 ? (
                           <Pagination.Item
                              onClick={(e) => {
                                 requestData(e, buscar, page.current - 1)
                                 window.scroll(0, 0)
                              }}
                           >
                              {page.current - 1}
                           </Pagination.Item>
                        ) : null}
                        <Pagination.Item active>{page.current}</Pagination.Item>
                        {page.total - page.current >= 1 ? (
                           <Pagination.Item
                              onClick={(e) => {
                                 requestData(e, buscar, page.current + 1)
                                 window.scroll(0, 0)
                              }}
                           >
                              {page.current + 1}
                           </Pagination.Item>
                        ) : null}
                        {page.total - page.current >= 2 ? (
                           <Pagination.Ellipsis disabled={true} />
                        ) : null}
                        <Pagination.Next
                           disabled={page.current === page.total ? true : false}
                           onClick={(e) => {
                              requestData(e, buscar, page.current + 1)
                              window.scroll(0, 0)
                           }}
                        />
                        <Pagination.Last
                           onClick={(e) => {
                              requestData(e, buscar, page.total)
                              window.scroll(0, 0)
                           }}
                        />
                     </Pagination>
                  </Col>
               </Row>
            </Col>
         </Row>
      </Container>
   )
   return (
      <div>
         <CustomMenu />
         <div className="clientes-container">
            <div className="home-container">
               <h1>Empresa</h1>
               <div className="input-group">
                  <input
                     className="form-control search-user"
                     type="text"
                     placeholder="Digite o nome"
                     onChange={buscarNome}
                     onKeyDown={(e) => buscarEnter(e)}
                     defaultValue={buscar}
                  />
                  <div className="input-group-append">
                     <Button
                        onClick={(e) => requestData(e, buscar)}
                        type="button"
                        variant="warning"
                     >
                        Buscar
                     </Button>
                  </div>

                  <a href={`/cadastrar/companhia/${"inserir"}`} className="btn btn-dark btn-search">
                     Cadastrar
                  </a>
               </div>
               <Table>
                  <thead>
                     <th>Id Eduzz</th>
                  </thead>
               </Table>
               <table className="table">
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 115 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <thead>
                     <tr>
                        <th scope="col">ID Eduzz</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Data de Criação</th>
                        <th scope="col">Data de atualização</th>
                        <th scope="col">Ações</th>
                     </tr>
                  </thead>
                  <tbody>
                     {companhia === null
                        ? ""
                        : companhia.map((companhia) => {
                           return (
                              <tr key={companhia.usr_cod}>
                                 <td data-title="ID Eduzz">{companhia.cpn_cli_cod}</td>
                                 <td data-title="Nome" className="text">{companhia.cpn_name}</td>
                                 <td data-title="Data de Criação" className="data">
                                    {moment(companhia?.cpn_dtcreation).format("a") === "pm" ? (
                                       moment(companhia?.cpn_dtcreation).format("DD-MM-YYYY") + " " + (parseInt(horaCriacao) + 12) + ":" + moment(companhia?.cpn_dtcreation).format("mm")
                                    )
                                       : moment(companhia?.cpn_dtcreation).format("DD-MM-YYYY hh:mm")
                                    }
                                 </td>
                                 {companhia.cpn_dtupdate == null ? <td data-title="Data de Atualização"><p style={{ color: "transparent" }}>.</p></td> :
                                    <td data-title="Data de Atualização" className="data">
                                       {moment(companhia?.cpn_dtupdate).format("a") === "pm" ? (
                                          moment(companhia?.cpn_dtupdate).format("DD-MM-YYYY") + " " + (parseInt(horaUpd) + 12) + ":" + moment(companhia?.cpn_dtupdate).format("mm")
                                       )
                                          : moment(companhia?.cpn_dtcreation).format("DD-MM-YYYY hh:mm")
                                       }
                                    </td>}
                                 <td data-title="Ações" className="acoes">
                                    <Link className="btn btn-warning" to={`/editar-companhia/${companhia.cpn_cod}/${"alterar"}`}>Editar</Link>
                                    <button className="btn btn-dark" onClick={() => setShowModal(true)}>
                                       Excluir
                                    </button>
                                 </td>
                                 <Modal show={showModal} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                       <Modal.Title>Erro!</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Você deseja excluir a companhia?</Modal.Body>
                                    <Modal.Footer>
                                       <Button variant="danger" onClick={handleClose}>
                                          Não
                                       </Button>
                                       <Button variant="warning" onClick={() => deletarCompanhia(companhia.cpn_cod)}>
                                          Excluir
                                       </Button>
                                    </Modal.Footer>
                                 </Modal>
                              </tr>
                           );
                        })}
                  </tbody>
               </table>

               <Pagination className="pagination">
                  <Pagination.First onClick={(e) => {
                     requestData(e, buscar, 1)
                     window.scroll(0, 0)
                  }} />
                  <Pagination.Prev
                     disabled={page.current === 1 ? true : false}
                     onClick={(e) => {
                        requestData(e, buscar, page.current - 1)
                        window.scroll(0, 0)
                     }}
                  />
                  {page.current >= 3 ? <Pagination.Ellipsis disabled={true} /> : null}
                  {page.current >= 2 ? (
                     <Pagination.Item
                        onClick={(e) => {
                           requestData(e, buscar, page.current - 1)
                           window.scroll(0, 0)
                        }}
                     >
                        {page.current - 1}
                     </Pagination.Item>
                  ) : null}
                  <Pagination.Item active>{page.current}</Pagination.Item>
                  {page.total - page.current >= 1 ? (
                     <Pagination.Item
                        onClick={(e) => {
                           requestData(e, buscar, page.current + 1)
                           window.scroll(0, 0)
                        }}
                     >
                        {page.current + 1}
                     </Pagination.Item>
                  ) : null}
                  {page.total - page.current >= 2 ? (
                     <Pagination.Ellipsis disabled={true} />
                  ) : null}
                  <Pagination.Next
                     disabled={page.current === page.total ? true : false}
                     onClick={(e) => {
                        requestData(e, buscar, page.current + 1)
                        window.scroll(0, 0)
                     }}
                  />
                  <Pagination.Last
                     onClick={(e) => {
                        requestData(e, buscar, page.total)
                        window.scroll(0, 0)
                     }}
                  />
               </Pagination>
            </div>
         </div>
      </div>
   );
}

