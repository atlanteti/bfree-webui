import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import { Pagination, Button, Modal } from "react-bootstrap";
import moment from "moment";
import { CustomMenu } from "../../../Componentes/CustomMenu";

export default function Companhia() {
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
         window.location.reload();
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
      <div>
         <CustomMenu />
         <div className="clientes-container">
            <div className="home-container">
               <h1>Companhia</h1>
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
               <table className="table">
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
                                 <td data-title="Nome">{companhia.cpn_name}</td>
                                 <td data-title="Data de Criação">
                                    {moment(companhia?.cpn_dtcreation).format("a") === "pm" ? (
                                       moment(companhia?.cpn_dtcreation).format("DD-MM-YYYY") + " " + (parseInt(horaCriacao) + 12) + ":" + moment(companhia?.cpn_dtcreation).format("mm")
                                    )
                                       : moment(companhia?.cpn_dtcreation).format("DD-MM-YYYY hh:mm")
                                    }
                                 </td>
                                 {companhia.cpn_dtupdate == null ? <td></td> :
                                    <td data-title="Data de Atualização">
                                       {moment(companhia?.cpn_dtupdate).format("a") === "pm" ? (
                                          moment(companhia?.cpn_dtupdate).format("DD-MM-YYYY") + " " + (parseInt(horaUpd) + 12) + ":" + moment(companhia?.cpn_dtupdate).format("mm")
                                       )
                                          : moment(companhia?.cpn_dtcreation).format("DD-MM-YYYY hh:mm")
                                       }
                                    </td>}
                                 <td data-title="Ações">
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

               <Pagination className="">
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
      </div>
   );
}
