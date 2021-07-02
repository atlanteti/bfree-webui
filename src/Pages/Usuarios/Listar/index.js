import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import { Pagination, Row, Col, Button, Alert } from "react-bootstrap";
import moment from "moment";

export default function Usuarios() {
   const [usuarios, setUsuarios] = useState(null);
   const [buscar, setBuscar] = useState(null);
   const [page, setPage] = useState({});
   const [showAlert, setShowAlert] = useState(false);
   const [horaUpd, setHoraUpd] = useState();
   const [horaCriacao, setHoraCriacao] = useState();

   function buscarNome(event) {
      const value = event.target.value;
      setBuscar(value);
   }

   const buscarEnter = (event) => {
      if (event.keyCode === 13) {
         requestData(event, buscar);
      }
   };

   async function deletarUsuario(id) {
      try {
         const { data } = await axios({
            method: "delete",
            url: `http://209.97.146.187:18919/usuarios/excluir/${id}`,
         });
         if (data.meta.status == 209) {
            setShowAlert(true);
         } else {
            window.location.reload();
         }
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
            url: "http://209.97.146.187:18919/usuarios/listar",
            params: {
               nome: param,
               page: page,
            },
         });
         console.log(data)
         setUsuarios(data.data);
         setPage(data.meta.pagination);
         setHoraCriacao(moment(data.data.usr_dtcreation).format("hh"))
         setHoraUpd(moment(data.data.usr_dtupdate).format("hh"))
      } catch (error) {
         alert(error);
      }
   };

   useEffect(() => {
      requestData();
   }, []);

   return (
      <div className="clientes-container">
         {showAlert &&
            <Col>
               <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
                  Não é possivel excluir o registro, pois o mesmo possui ligação com outras tabelas!
               </Alert>
            </Col>
         }
         <div className="home-container">
            <h1>Usuários</h1>
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

               <a href={`/cadastrar/usuario/${"inserir"}`} className="btn btn-dark btn-search">
                  Cadastrar
               </a>
            </div>
            <table className="table">
               <thead>
                  <tr>
                     <th scope="col">ID Eduzz</th>
                     <th scope="col">ID Externo</th>
                     <th scope="col">Status</th>
                     <th scope="col">Data de Criação</th>
                     <th scope="col">Data de atualização</th>
                     <th scope="col">Ações</th>
                  </tr>
               </thead>
               <tbody>
                  {usuarios === null
                     ? ""
                     : usuarios.map((usuario) => {
                        return (
                           <tr key={usuario.usr_cod}>
                              <td data-title="ID Eduzz">{usuario.usr_cli_cod}</td>
                              <td data-title="ID Externo">{usuario.usr_externalid}</td>
                              <td data-title="Status">{usuario.statusUser?.sus_name}</td>
                              <td data-title="ID Data de criação">
                                 {moment(usuario?.usr_dtcreation).format("a") === "pm" ? (
                                    moment(usuario?.usr_dtcreation).format("DD-MM-YYYY") + " " + (parseInt(horaCriacao) + 12) + ":" + moment(usuario?.usr_dtcreation).format("mm")
                                 )
                                    : moment(usuario?.usr_dtcreation).format("DD-MM-YYYY hh:mm")
                                 }
                              </td>
                              {usuario.usr_dtupdate == null ? <td></td> : (
                                 <td data-title="Data de Atualização">
                                    {moment(usuario?.usr_dtupdate).format("a") === "pm" ? (
                                       moment(usuario?.usr_dtupdate).format("DD-MM-YYYY") + " " + (parseInt(horaUpd) + 12) + ":" + moment(usuario?.usr_dtupdate).format("mm")
                                    )
                                       : moment(usuario?.usr_dtcreation).format("DD-MM-YYYY hh:mm")
                                    }
                                 </td>
                              )}
                              <td data-title="Ações">
                                 <Link className="btn btn-warning" to={`/editar/${usuario.usr_cod}/${"alterar"}`}>Editar</Link>
                                 <button className="btn btn-dark" onClick={() => deletarUsuario(usuario.usr_cod)}>
                                    Excluir
                                 </button>
                              </td>
                           </tr>
                        );
                     })}
               </tbody>
            </table>

            <Pagination className="pagination">
               <Pagination.First onClick={(e) => requestData(e, buscar, 1)} />
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
   );
}
