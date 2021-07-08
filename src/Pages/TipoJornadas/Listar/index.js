import { useEffect, useState } from "react";
import { CustomMenu } from "../../../Componentes/CustomMenu";
import moment from "moment";
import { Link } from "react-router-dom"
import axios from "axios";
import { Button, Pagination, Modal } from 'react-bootstrap';

export default function ListarJornadas() {
   const [buscar, setBuscar] = useState("");
   const [page, setPage] = useState({});
   const [jornada, setJornada] = useState(null);
   const [horaUpd, setHoraUpd] = useState();
   const [horaCriacao, setHoraCriacao] = useState();
   const [showModal, setShowModal] = useState(false);

   const handleClose = () => setShowModal(false);

   function buscarNome(event) {
      const value = event.target.value
      setBuscar(value)
   }

   const buscarEnter = (event) => {
      if (event.keyCode === 13) {
         requestData(event, buscar)
      }
   }

   async function deletarJornada(id) {
      try {
         await axios({
            method: "delete",
            url: `http://209.97.146.187:18919/jorneys/excluir/${id}`,
         });
         window.location.reload();
      } catch (error) {
         alert(error);
      }
   }

   const requestData = async (e, param = '', page = 1) => {
      console.log(buscar)
      try {
         if (e) {
            e.preventDefault();
         }
         const { data } = await axios({
            method: "get",
            url: "http://209.97.146.187:18919/jorneys/listar",
            params: {
               name: param,
               page: page,
            },
         });
         console.log(data.data)
         setJornada(data.data);
         setPage(data.meta.pagination);
         setHoraCriacao(moment(data.data.jny_dtcreation).format("hh"))
         setHoraUpd(moment(data.data.jny_dtupdate).format("hh"))
      } catch (error) {
         alert(error);
      }
   };

   useEffect(() => {
      requestData();
   }, []);

   return (
      <>
         <CustomMenu />
         <div className="clientes-container">
            <div className="home-container">
               <h1>Jornadas</h1>
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
                        onClick={(e) => requestData(e, buscar, page = 1)}
                        type="button"
                        variant="warning"
                     >
                        Buscar
                     </Button>
                  </div>

                  <a href={`/cadastrar/jornada/${"inserir"}`} className="btn btn-dark btn-search">
                     Cadastrar
                  </a>
               </div>
               <table className="table">
                  <col style={{ width: 50 }} />
                  <col style={{ width: 100 }} />
                  <col style={{ width: 120 }} />
                  <col style={{ width: 120 }} />
                  <col style={{ width: 50 }} />
                  <thead>
                     <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Companhia</th>
                        <th scope="col">Data de Criação</th>
                        <th scope="col">Data de atualização</th>
                        <th scope="col">Ações</th>
                     </tr>
                  </thead>
                  <tbody>
                     {jornada === null
                        ? ""
                        : jornada.map((jorn) => {
                           return (
                              <tr key={jorn.jny_cod}>
                                 <td data-title="Nome" id="text">{jorn.jny_name}</td>
                                 <td data-title="Companhia" id="text">{jorn.company.cpn_name}</td>
                                 <td data-title="Data de criação" id="data">
                                    {moment(jorn?.jny_dtcreation).format("a") === "pm" ? (
                                       moment(jorn?.jny_dtcreation).format("DD-MM-YYYY") + " " + (parseInt(horaCriacao) + 12) + ":" + moment(jorn?.jny_dtcreation).format("mm")
                                    )
                                       : moment(jorn?.jny_dtcreation).format("DD-MM-YYYY hh:mm")
                                    }
                                 </td>
                                 {jorn.jny_dtupdate == null ? <td data-title="Data de Atualização"><p style={{ color: "transparent" }}>.</p></td> : (
                                    <td data-title="Data de Atualização" id="data">
                                       {moment(jorn?.jny_dtupdate).format("a") === "pm" ? (
                                          moment(jorn?.jny_dtupdate).format("DD-MM-YYYY") + " " + (parseInt(horaUpd) + 12) + ":" + moment(jorn?.jny_dtupdate).format("mm")
                                       )
                                          : moment(jorn?.jny_dtcreation).format("DD-MM-YYYY hh:mm")
                                       }
                                    </td>
                                 )}
                                 <td data-title="Ações" className="acoes">
                                    <Link to={`/editar-jornada/${jorn.jny_cod}/${"alterar"}`} className="btn btn-warning">Editar</Link>
                                    <button className="btn btn-dark" onClick={() => setShowModal(true)}>
                                       Excluir
                                    </button>
                                 </td>
                                 <Modal show={showModal} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                       <Modal.Title>Erro!</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Você deseja excluir a jornada?</Modal.Body>
                                    <Modal.Footer>
                                       <Button variant="danger" onClick={handleClose}>
                                          Não
                                       </Button>
                                       <Button variant="warning" onClick={() => deletarJornada(jorn.jny_cod)}>
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