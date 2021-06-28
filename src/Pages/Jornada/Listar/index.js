import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import "./styles.css";
import { Pagination } from "react-bootstrap";
import moment from "moment";
import DrawerMenu from "../../../Componentes/DrawerMenu";

export default function ListarJornada() {
   const [jornada, setJornada] = useState(null);
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

   async function deletarJornada(id) {
      try {
         await axios({
            method: "delete",
            url: `http://209.97.146.187:18919/user-jorneys/excluir/${id}`,
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
            url: "http://209.97.146.187:18919/user-jorneys/listar",
            params: {
               nome: param,
               page: page,
            },
         });
         console.log(data)
         setJornada(data.data);
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
         <DrawerMenu />
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

               <a href="/cadastrar/jornada" className="btn btn-dark btn-search">
                  Cadastrar
               </a>
            </div>
            <table className="table">
               <thead>
                  <tr>
                     <th scope="col">ID da Jornada Usuário</th>
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
                           <tr key={jorn.jnu_cod}>
                              <td>{jorn.jnu_cod}</td>
                              <td>{moment(jorn.jnu_dtcreation).format("DD/MM/YYYY hh:mm a")}</td>
                              <td>{moment(jorn.jnu_dtupdate).format("DD/MM/YYYY hh:mm a")}</td>
                              <td>
                                 <Link to={`/editar-jornada/${jorn.jnu_cod}`} className="btn btn-warning">Editar</Link>
                                 <button className="btn btn-dark" onClick={() => deletarJornada(jorn.jnu_cod)}>
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
