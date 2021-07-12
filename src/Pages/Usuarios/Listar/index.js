import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Pagination, Row, Col, Button, Alert, Modal, Container } from "react-bootstrap";
import {
   Title,
   MainContainer,
   BtnCadastrar,
   Input,
   LittleBtn,
   Table,
   TableHeader,
   TableRow,
   ColumnTitle,
   ColumnTitleLittle,
   TableData,
   TableCell
} from "./styles.js"
import moment from "moment";

export default function Usuarios() {
   const [usuarios, setUsuarios] = useState(null);
   const [buscar, setBuscar] = useState(null);
   const [page, setPage] = useState({});
   const [showAlert, setShowAlert] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [horaUpd, setHoraUpd] = useState();
   const [horaCriacao, setHoraCriacao] = useState();
   const [idUser, setIdUser] = useState();

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

   async function deletarUsuario(id) {
      console.log(id)
      try {
         const { data } = await axios({
            method: "delete",
            url: `http://209.97.146.187:18919/usuarios/excluir/${id}`,
         });
         console.log(data);
         if (data.meta.status == 209) {
            setShowAlert(true);
            setShowModal(false);
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
      <MainContainer>
         <Col
            sm={{ offset: 1, span: 9 }}//Temporary until styled components
            md={{ offset: 1, span: 9 }}
            lg={{ offset: 2, span: 10 }}
         >
            {showAlert &&
               <Col>
                  <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
                     Não é possivel excluir o registro, pois o mesmo possui ligação com outras tabelas!
                  </Alert>
               </Col>
            }
            <Container>
               <Title>Usuários</Title>
               <Row className="input-group">
                  <Input
                     className="form-control"
                     type="text"
                     placeholder="Digite o nome"
                     onChange={buscarNome}
                     onKeyDown={(e) => buscarEnter(e)}
                     defaultValue={buscar}
                  />
                  <LittleBtn
                     className="input-group-append"
                     onClick={(e) => requestData(e, buscar)}
                     type="button"
                     yellowColor
                  >
                     Buscar
                  </LittleBtn>
                  <BtnCadastrar href={`/cadastrar/usuario/${"inserir"}`} className="btn btn-dark ml-3">
                     Cadastrar
                  </BtnCadastrar>
               </Row>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <ColumnTitle scope="col">ID Eduzz</ColumnTitle>
                        <ColumnTitle scope="col">ID Externo</ColumnTitle>
                        <ColumnTitle scope="col">Status</ColumnTitle>
                        <ColumnTitle columnWidth scope="col">Data de Criação</ColumnTitle>
                        <ColumnTitle columnWidth scope="col">Data de atualização</ColumnTitle>
                        <ColumnTitle scope="col">Ações</ColumnTitle>
                     </TableRow>
                  </TableHeader>
                  <TableData>
                     {usuarios === null
                        ? ""
                        : usuarios.map((usuario) => {
                           return (
                              <TableRow key={usuario.usr_cod}>
                                 <TableCell data-title="ID Eduzz">{usuario.usr_cli_cod}</TableCell>
                                 <TableCell data-title="ID Externo">{usuario.usr_externalid}</TableCell>
                                 <TableCell data-title="Status" className="text">{usuario.statusUser?.sus_name}</TableCell>
                                 <TableCell data-title="ID Data de criação" className="data">
                                    {moment(usuario?.usr_dtcreation).format("a") === "pm" ? (
                                       moment(usuario?.usr_dtcreation).format("DD-MM-YYYY")
                                       + " " + (parseInt(horaCriacao) + 12)
                                       + ":" + moment(usuario?.usr_dtcreation).format("mm")
                                    )
                                       : moment(usuario?.usr_dtcreation).format("DD-MM-YYYY hh:mm")
                                    }
                                 </TableCell>
                                 {usuario.usr_dtupdate == null ? (
                                    <TableCell data-title="Data de Atualização">
                                       <p style={{ color: "transparent" }}>.</p>
                                    </TableCell>)
                                    :
                                    (
                                       <TableCell columnWidth data-title="Data de Atualização" className="data">
                                          {moment(usuario?.usr_dtupdate).format("a") === "pm" ? (
                                             moment(usuario?.usr_dtupdate).format("DD-MM-YYYY")
                                             + " " + (parseInt(horaUpd) + 12)
                                             + ":" + moment(usuario?.usr_dtupdate).format("mm")
                                          )
                                             : moment(usuario?.usr_dtcreation).format("DD-MM-YYYY hh:mm")
                                          }
                                       </TableCell>
                                    )}
                                 <TableCell data-title="Ações" className="acoes">
                                    <Link
                                       className="btn btn-warning"
                                       to={`/editar/${usuario.usr_cod}/${"alterar"}`}
                                    >
                                       Editar
                                    </Link>
                                    <Button className="btn btn-dark" onClick={() => {
                                       setShowModal(true)
                                       setIdUser(usuario.usr_cod)
                                    }}>
                                       Excluir
                                    </Button>
                                 </TableCell>
                                 <Modal show={showModal} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                       <Modal.Title>Erro!</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Você deseja excluir o usuário?</Modal.Body>
                                    <Modal.Footer>
                                       <Button variant="danger" onClick={handleClose}>
                                          Não
                                       </Button>
                                       <Button variant="warning" onClick={() => deletarUsuario(idUser)}>
                                          Excluir
                                       </Button>
                                    </Modal.Footer>
                                 </Modal>
                              </TableRow>
                           );
                        })}
                  </TableData>
               </Table>
               <Pagination style={{marginBottom: 20}}>
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
            </Container>
         </Col >
      </MainContainer>
   );
}
