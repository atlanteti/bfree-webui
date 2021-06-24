import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import { Pagination } from "react-bootstrap";
import moment from "moment";

export default function Usuarios() {
   const [usuarios, setUsuarios] = useState(null);
   const [buscar, setBuscar] = useState(null);
   const [page, setPage] = useState({});

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
         await axios({
            method: "delete",
            url: `http://209.97.146.187:18919/usuarios/excluir/${id}`,
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
            url: "http://209.97.146.187:18919/usuarios/listar",
            params: {
               nome: param,
               page: page,
            },
         });
         setUsuarios(data.data);
         setPage(data.meta.pagination);
      } catch (error) {
         alert(error);
      }
   };

   useEffect(() => {
      requestData();
   }, []);

   return (
      <div className="clientes-container">
         <div className="home-container">
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
                  <button
                     onClick={(e) => requestData(e, buscar)}
                     type="button"
                     className=""
                  >
                     Buscar
                  </button>
               </div>

               <a href="/cadastrar/usuario" className="btn btn-dark btn-search">
                  Cadastrar
               </a>
            </div>
            <table className="table">
               <thead>
                  <tr>
                     <th scope="col">ID Eduzz</th>
                     <th scope="col">ID Externo</th>
                     <th scope="col">Data de Criação</th>
                     <th scope="col">Data de atualização</th>
                     <th scope="col">Status</th>
                     <th scope="col">Ações</th>
                  </tr>
               </thead>
               <tbody>
                  {usuarios === null
                     ? ""
                     : usuarios.map((usuario) => {
                        return (
                           <tr key={usuario.usr_cod}>
                              <td>{usuario.usr_cli_cod}</td>
                              <td>{usuario.usr_externalid}</td>
                              <td>{moment(usuario.usr_dtcreation).format("DD/MM/YYYY h:mm a")}</td>
                              <td>{moment(usuario.usr_dtupdate).format("DD/MM/YYYY h:mm a")}</td>
                              <td>{usuario.statusUser.sus_name}</td>
                              <td>
                                 <Link className="btn btn-warning" to={`/editar/${usuario.usr_cod}`}>Editar</Link>
                                 <button className="btn btn-dark" onClick={() => deletarUsuario(usuario.usr_cod)}>
                                    Excluir
                                 </button>
                              </td>
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
   );
}
