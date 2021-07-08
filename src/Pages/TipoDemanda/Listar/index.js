import { useEffect, useState } from "react";
import { CustomMenu } from "../../../Componentes/CustomMenu";
import { Link } from "react-router-dom"
import { Button, Pagination, Modal, Table } from 'react-bootstrap';
import { IoCheckboxOutline } from "react-icons/io5";
import "./styles.css";
import moment from "moment";
import axios from "axios";

export default function ListarTipoDemanda() {
   const [buscar, setBuscar] = useState("");
   const [page, setPage] = useState({});
   const [typeDemand, setTypeDemand] = useState(null);
   const [idDemand, setIdDemand] = useState(null);

   const [showModal, setShowModal] = useState(false);

   const handleClose = () => setShowModal(false);

   const requestData = async (e, param = '', page = 1) => {
      try {
         if (e) {
            e.preventDefault();
         }
         const { data } = await axios({
            method: "get",
            url: "http://209.97.146.187:18919/types-demand/listar",
            params: {
               // name: param,
               page: page,
            },
         });
         console.log(data)
         setTypeDemand(data.data);
         setPage(data.meta.pagination);
      } catch (error) {
         alert(error);
      }
   };

   async function deleteDemand(id) {
      try {
         await axios({
            method: "delete",
            url: `http://209.97.146.187:18919/types-demand/excluir/${id}`,
         });
         window.location.reload();
      } catch (error) {
         alert(error);
      }
   }

   useEffect(() => {
      requestData();
   }, []);

   return (
      <>
         <CustomMenu />
         <div className="clientes-container">
            <div className="home-container">
               <h1>Tipo Demanda</h1>
               <div className="input-group">
                  <input
                     className="form-control search-user"
                     type="text"
                     placeholder="Digite o nome"
                     // onChange={buscarNome}
                     // onKeyDown={(e) => buscarEnter(e)}
                     defaultValue={buscar}
                  />
                  <div className="input-group-append">
                     <Button
                        onClick={(e) => requestData(e, buscar, page = 1)}
                        type="button"
                        variant="warning"
                     >
                        Buscar
                     </Button>
                  </div>

                  <a href={`/cadastrar/tipodemanda/${"inserir"}`} className="btn btn-dark btn-search">
                     Cadastrar
                  </a>
               </div>
               <table className="table">
                  <col style={{ width: 200 }} />
                  <col style={{ width: 150 }} />
                  <col style={{ width: 50 }} />
                  <thead>
                     <tr>
                        <th scope="col">Empresa</th>
                        <th scope="col">Demanda</th>
                        <th scope="col">Ações</th>
                     </tr>
                  </thead>
                  <tbody>
                     {typeDemand === null
                        ? ""
                        : typeDemand?.map((tDemand) => {
                           return (
                              <tr key={tDemand?.tdm_cod}>
                                 <td data-title="Demanda" className="text">
                                    {tDemand?.company?.cpn_name == null ? <p style={{ color: "transparent" }}>.</p> : tDemand?.company?.cpn_name}
                                 </td>
                                 <td data-title="Nome" className="text">
                                    {tDemand?.tdm_name == null ? <p style={{ color: "transparent" }}>.</p> : tDemand?.tdm_name}
                                 </td>
                                 <td data-title="Ações" className="acoes">
                                    <Link className="btn btn-warning" to={`/editar-tipodemanda/${tDemand.tdm_cod}/${"alterar"}`}>Editar</Link>
                                    <button className="btn btn-dark" onClick={() => { setShowModal(true) }}>
                                       Excluir
                                    </button>
                                 </td>
                                 <Modal show={showModal} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                       <Modal.Title>Aviso!</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Você deseja excluir a Demanda?</Modal.Body>
                                    <Modal.Footer>
                                       <Button variant="danger" onClick={handleClose}>
                                          Não
                                       </Button>
                                       <Button variant="warning" onClick={() => deleteDemand(tDemand.tdm_cod)}>
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
      </>
   );
}