import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import { Pagination, Button } from "react-bootstrap";
import moment from "moment";
import { CustomMenu } from "../../../Componentes/CustomMenu";

export default function ListarJornadaUsuarios() {
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
      <div>
         <CustomMenu />
         <div className="clientes-container">
            <div className="home-container">
               <h1>Jornada de usuário</h1>
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

                  <a href="/cadastrar/jornada" className="btn btn-dark btn-search">
                     Cadastrar
                  </a>
               </div>
               <table className="table">
                  <col style={{ width: 150 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
                  <col style={{ width: 50 }} />
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
                                 <td data-title="ID da Jornada Usuário">{jorn.jnu_cod}</td>
                                 <td data-title="Data de Criação">{moment(jorn.jnu_dtcreation).format("DD/MM/YYYY hh:mm a")}</td>
                                 <td data-title="Data de atualização">{moment(jorn.jnu_dtupdate).format("DD/MM/YYYY hh:mm a")}</td>
                                 <td data-title="Ações" id="acoes">
                                    <Link to={`/editar-jornada-usuario/${jorn.jnu_cod}`} className="btn btn-warning">Editar</Link>
                                    <button className="btn btn-dark" onClick={() => deletarJornada(jorn.jnu_cod)}>
                                       Excluir
                                    </button>
                                 </td>
                              </tr>
                           );
                        })}
                  </tbody>
               </table>

               <Pagination>
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
