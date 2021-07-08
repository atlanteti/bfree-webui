import { useEffect, useState } from "react";
import { CustomMenu } from "../../../Componentes/CustomMenu";
import { Link } from "react-router-dom"
import { Button, Pagination, Modal, Table } from 'react-bootstrap';
import { IoCheckboxOutline } from "react-icons/io5";
import "./styles.css";
import moment from "moment";
import axios from "axios";

export default function ListarBadges() {
   const [buscar, setBuscar] = useState("");
   const [page, setPage] = useState({});
   const [badges, setBadges] = useState(null);
   const [idBadge, setIdBadge] = useState(null);

   const [showModal, setShowModal] = useState(false);
   const [horaUpd, setHoraUpd] = useState();
   const [horaCriacao, setHoraCriacao] = useState();

   const handleClose = () => setShowModal(false);

   const requestData = async (e, param = '', page = 1) => {
      try {
         if (e) {
            e.preventDefault();
         }
         const { data } = await axios({
            method: "get",
            url: "http://209.97.146.187:18919/badges/listar",
            params: {
               // name: param,
               page: page,
            },
         });
         setBadges(data.data);
         setPage(data.meta.pagination);
         setHoraCriacao(moment(data.data.bdg_dtcreation).format("hh"))
         setHoraUpd(moment(data.data.bdg_dtupdate).format("hh"))
      } catch (error) {
         alert(error);
      }
   };

   async function deletarBadge(id) {
      console.log(id)
      try {
         const response = await axios({
            method: "delete",
            url: `http://209.97.146.187:18919/badges/excluir/${id}`,
         });
         console.log(response)
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
               <h1>Badges</h1>
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

                  <a href={`/cadastrar/badges/${"inserir"}`} className="btn btn-dark btn-search">
                     Cadastrar
                  </a>
               </div>
               {/* <div className="table-scroll"> */}
               <table className="table">
                  <thead>
                     <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Jornada</th>
                        <th scope="col">Companhia</th>
                        <th scope="col">Mentor</th>
                        <th scope="col">Data de Criação</th>
                        <th scope="col">Data de atualização</th>
                        <th scope="col">Ações</th>
                     </tr>
                  </thead>
                  <tbody>
                     {badges === null
                        ? ""
                        : badges.map((badge) => {
                           return (
                              <tr key={badge.bdg_cod}>
                                 <td data-title="Nome" className="text">{badge.bdg_name}</td>
                                 <td data-title="Jornada" className="text">
                                    {/* para que fique ajustado para mobile */}
                                    {badge.jorney?.jny_name == null ? <p style={{ color: "transparent" }}>.</p> : badge?.jorney.jny_name}
                                 </td>
                                 <td data-title="Companhia" className="text">
                                    {badge.company?.cpn_name == null ? <p style={{ color: "transparent" }}>.</p> : badge?.company?.cpn_name}
                                 </td>
                                 <td data-title="Mentor" className="icon">
                                    <div className="mentor-icon">
                                       {badge?.bdg_mentor == true ? <IoCheckboxOutline align="center" size={25} /> : <p style={{ color: "transparent" }}>.</p>}
                                    </div>
                                 </td>
                                 <td data-title="Data de criação" className="data">
                                    {moment(badge?.bdg_dtcreation).format("a") === "pm" ? (
                                       moment(badge?.bdg_dtcreation).format("DD-MM-YYYY") + " " + (parseInt(horaCriacao) + 12) + ":" + moment(badge?.bdg_dtcreation).format("mm")
                                    )
                                       : moment(badge?.bdg_dtcreation).format("DD-MM-YYYY hh:mm")
                                    }
                                 </td>
                                 {badge.bdg_dtupdate == null ? <td data-title="Data de Atualização"><p style={{ color: "transparent" }}>.</p></td> : (
                                    <td data-title="Data de Atualização" className="data">
                                       {moment(badge?.bdg_dtupdate).format("a") === "pm" ? (
                                          moment(badge?.bdg_dtupdate).format("DD-MM-YYYY") + " " + (parseInt(horaUpd) + 12) + ":" + moment(badge?.bdg_dtupdate).format("mm")
                                       )
                                          : moment(badge?.bdg_dtcreation).format("DD-MM-YYYY hh:mm")
                                       }
                                    </td>
                                 )}
                                 <td data-title="Ações" className="acoes">
                                    <Link to={`/editar-badge/${badge.bdg_cod}/${"alterar"}`} className="btn btn-warning">Editar</Link>
                                    <button className="btn btn-dark" onClick={(e) => {
                                       setShowModal(true)
                                       setIdBadge(badge.bdg_cod)
                                    }}>
                                       Excluir
                                    </button>
                                 </td>
                                 <Modal show={showModal} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                       <Modal.Title>Aviso!</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Você deseja excluir a badge?</Modal.Body>
                                    <Modal.Footer>
                                       <Button variant="danger" onClick={handleClose}>
                                          Não
                                       </Button>
                                       <Button variant="warning" onClick={() => deletarBadge(idBadge)}>
                                          Excluir
                                       </Button>
                                    </Modal.Footer>
                                 </Modal>
                              </tr>
                           );
                        })}
                  </tbody>
               </table>
               {/* </div> */}

               <Pagination style={{ marginTop: 30 }}>
                  <Pagination.First onClick={(e) => requestData(e, buscar, 1)} />
                  <Pagination.Prev
                     disabled={page.current === 1 ? true : false}
                     onClick={(e) => requestData(e, buscar, page.current - 1)}
                  />
                  {page.current >= 3 ? <Pagination.Ellipsis disabled={true} /> : null}
                  {page.current >= 2 ? (
                     <Pagination.Item
                        onClick={(e) => requestData(e, buscar, page.current - 1)}
                     >
                        {page.current - 1}
                     </Pagination.Item>
                  ) : null}
                  <Pagination.Item active>{page.current}</Pagination.Item>
                  {page.total - page.current >= 1 ? (
                     <Pagination.Item
                        onClick={(e) => requestData(e, buscar, page.current + 1)}
                     >
                        {page.current + 1}
                     </Pagination.Item>
                  ) : null}
                  {page.total - page.current >= 2 ? (
                     <Pagination.Ellipsis disabled={true} />
                  ) : null}
                  <Pagination.Next
                     disabled={page.current === page.total ? true : false}
                     onClick={(e) => requestData(e, buscar, page.current + 1)}
                  />
                  <Pagination.Last
                     onClick={(e) => requestData(e, buscar, page.total)}
                  />
               </Pagination>
            </div>
         </div>
      </>
   );
}