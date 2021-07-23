import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CustomMenu } from "../../../Componentes/CustomMenu";
import { IoArrowDownSharp, IoArrowUpSharp } from "react-icons/io5";
import { Pagination, Col, Button, Alert, Modal, Container, Form } from "react-bootstrap";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
   Title,
   MainContainer,
   BtnCadastrar,
   Table,
   TableHeader,
   TableRow,
   ColumnTitle,
   TableData,
   TableCell,
   SortIcon,
   BtnMenu,
   Icon
} from "../../../styles/styles.js"

export default function Usuarios() {
   const [usuarios, setUsuarios] = useState(null);
   const [buscar, setBuscar] = useState(null);
   const [buscarStatus, setBuscarStatus] = useState(null);
   const [status, setStatus] = useState();
   const [page, setPage] = useState({});
   const [showAlert, setShowAlert] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [idUser, setIdUser] = useState();
   const [count, setCount] = useState(null);
   const [statusArrow, setStatusArrow] = useState({ "0": null, "1": null, "2": null });
   const [anchorEl, setAnchorEl] = useState(null);

   const handleClose = () => setShowModal(false);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const menuClose = () => {
      setAnchorEl(null);
   };

   function pesquisarId(event) {
      const value = event.target.value;
      setBuscar(value);
   }

   function pesquisarStatus(event) {
      const value = event.target.value;
      console.log(value)
      setBuscarStatus(value);
   }

   const buscarEnter = (event) => {
      if (event.keyCode === 13) {
         requestData(event, buscar, buscarStatus, page.current, null, null);
      }
   };

   async function deletarUsuario(id) {
      try {
         const { data } = await axios({
            method: "delete",
            url: `http://209.97.146.187:18920/usuarios/excluir/${id}`,
         });
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

   const requestData = async (e, id = "", status = null, page = 1, columnName, sortOrder) => {
      try {
         if (e) {
            e.preventDefault();
         }
         const { data } = await axios({
            method: "get",
            url: "http://209.97.146.187:18920/usuarios/listar",
            params: {
               param: id,
               statusId: status,
               sort: columnName,
               isDesc: sortOrder,
               page: page,
            },
         });
         setUsuarios(data.data);
         setPage(data.meta.pagination);
      } catch (error) {
         alert(error);
      }
   };

   const requestStatus = async (e) => {
      try {
         const { data } = await axios({
            method: "get",
            url: "http://209.97.146.187:18920/status-users/listar",
         });
         setStatus(data.data);
      } catch (error) {
         alert(error);
      }
   };

   useEffect(() => {
      requestData();
      requestStatus();
   }, []);

   return (
      <MainContainer>
         <CustomMenu />
         <Col
            sm={{ offset: 1, span: 9 }}
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
               <Col
                  sm={{ span: 6 }}
                  style={{
                     alignSelf: "baseline",
                     border: "1px solid rgba(0,0,0,0.20)",
                     padding: 15,
                     borderRadius: 5
                  }}
               >
                  <Form>
                     <Form.Group>
                        <Form.Label>ID Eduzz: </Form.Label>
                        <Form.Control
                           type="text"
                           onChange={pesquisarId}
                           defaultValue={buscar}
                           onKeyDown={(e) => buscarEnter(e)}
                        />
                     </Form.Group>
                     <Form.Group>
                        <Form.Label>Status: </Form.Label>
                        <Form.Control
                           as="select"
                           onChange={pesquisarStatus}
                           onKeyDown={(e) => buscarEnter(e)}
                           defaultValue={buscarStatus}
                        >
                           <option selected value={null}></option>
                           <>
                              {status?.map(stat => {
                                 return (
                                    <option
                                       key={stat.sus_cod}
                                       value={stat.sus_cod}
                                    >
                                       {stat.sus_name}
                                    </option>
                                 )
                              })}
                           </>
                        </Form.Control>
                     </Form.Group>
                  </Form>
                  <Button
                     type="submit"
                     variant="warning"
                     onClick={(e) => requestData(e, buscar, buscarStatus, page.current, null, null)}
                  >
                     Buscar
                  </Button>
                  <BtnCadastrar href={`/cadastrar/usuario/${"inserir"}`} className="btn btn-dark ml-3">
                     Cadastrar
                  </BtnCadastrar>
               </Col>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <ColumnTitle sort scope="col" onClick={(e) => {
                           setStatusArrow({ "0": 1, "1": null, "2": null })
                           if (count == null) {
                              setCount(count + 1);
                              requestData(e, buscar, buscarStatus, page.current, "Usr_cli_cod", false);
                           } else {
                              setCount(null);
                              requestData(e, buscar, buscarStatus, page.current, "Usr_cli_cod", true);
                           }
                        }}>
                           <SortIcon>
                              ID Eduzz {statusArrow[0] == null ? "" :
                                 (
                                    count == null ? <IoArrowUpSharp /> : <IoArrowDownSharp />
                                 )}
                           </SortIcon>
                        </ColumnTitle>
                        <ColumnTitle scope="col" onClick={(e) => {
                           setStatusArrow({ "0": null, "1": 1, "2": null })
                           if (count == null) {
                              setCount(count + 1);
                              requestData(e, buscar, buscarStatus, page.current, "Usr_externalid", false);
                           } else {
                              setCount(null);
                              requestData(e, buscar, buscarStatus, page.current, "Usr_externalid", true);
                           }
                        }}>
                           <SortIcon>
                              ID Externo {statusArrow[1] == null ? "" :
                                 (
                                    count == null ? <IoArrowUpSharp /> : <IoArrowDownSharp />
                                 )}
                           </SortIcon>
                        </ColumnTitle>
                        <ColumnTitle scope="col" onClick={(e) => {
                           setStatusArrow({ "0": null, "1": null, "2": 1 })
                           if (count == null) {
                              setCount(count + 1);
                              requestData(e, buscar, buscarStatus, page.current, "Sus_name", false);
                           } else {
                              setCount(null);
                              requestData(e, buscar, buscarStatus, page.current, "Sus_name", true);
                           }
                        }}>
                           <SortIcon>
                              Status {statusArrow[2] == null ? "" :
                                 (
                                    count == null ? <IoArrowUpSharp /> : <IoArrowDownSharp />
                                 )}
                           </SortIcon>
                        </ColumnTitle>
                        <ColumnTitle columnWidth scope="col">Ações</ColumnTitle>
                     </TableRow>
                  </TableHeader>
                  <TableData>
                     {(usuarios !== null) &&
                        usuarios.map((usuario) => {
                           return (
                              <TableRow key={usuario.usr_cod}>
                                 <TableCell data-title="ID Eduzz">{usuario.usr_cli_cod}</TableCell>
                                 <TableCell data-title="ID Externo">{usuario.usr_externalid}</TableCell>
                                 <TableCell data-title="Status" className="text">{usuario.statusUser?.sus_name}</TableCell>
                                 <TableCell data-title="Ações" className="acoes">
                                    <Link
                                       className="btn btn-warning"
                                       to={`/editar/${usuario.usr_cod}/alterar`}
                                    >
                                       Editar
                                    </Link>
                                    <Button className="btn btn-dark" onClick={() => {
                                       setShowModal(true)
                                       setIdUser(usuario.usr_cod)
                                    }}>
                                       Excluir
                                    </Button>
                                    <Button variant="secondary" className="ml-1" onClick={(event) => {
                                       handleClick(event)
                                       setIdUser(usuario.usr_cod)
                                    }}>
                                       ...
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

                                 <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={menuClose}
                                 >
                                    <Link to={`/usuario-companhia/${idUser}`}>
                                       <MenuItem onClick={handleClose}>
                                          Empresas
                                       </MenuItem>
                                    </Link>
                                    <Link to={`/usuario-jornadas/${idUser}`}>
                                       <MenuItem onClick={handleClose}>
                                          Jornadas
                                       </MenuItem>
                                    </Link>
                                    <Link to={`/usuario-tipodemanda/${idUser}`}>
                                       <MenuItem onClick={handleClose}>
                                          Tipos de Demanda
                                       </MenuItem>
                                    </Link>
                                    <Link to={`/usuario-badges/${idUser}`}>
                                       <MenuItem onClick={handleClose}>
                                          Badges
                                       </MenuItem>
                                    </Link>
                                    <Link to={`/usuario-times/${idUser}`}>
                                       <MenuItem onClick={handleClose}>
                                          Times
                                       </MenuItem>
                                    </Link>
                                 </Menu>
                              </TableRow>
                           );
                        })}
                  </TableData>
               </Table>
               <Pagination style={{ marginBottom: 20 }}>
                  <Pagination.First onClick={(e) => {
                     requestData(e, buscar, buscarStatus, 1, null, null)
                     window.scroll(0, 0)
                  }} />
                  <Pagination.Prev
                     disabled={page.current === 1 ? true : false}
                     onClick={(e) => {
                        requestData(e, buscar, buscarStatus, page.current - 1, null, null)
                        window.scroll(0, 0)
                     }}
                  />
                  {page.current >= 3 ? <Pagination.Ellipsis disabled={true} /> : null}
                  {page.current >= 2 ? (
                     <Pagination.Item
                        onClick={(e) => {
                           requestData(e, buscar, buscarStatus, page.current - 1, null, null)
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
                           requestData(e, buscar, buscarStatus, page.current + 1, null, null)
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
                        requestData(e, buscar, buscarStatus, page.current + 1, null, null)
                        window.scroll(0, 0)
                     }}
                  />
                  <Pagination.Last
                     onClick={(e) => {
                        requestData(e, buscar, buscarStatus, page.total, null, null)
                        window.scroll(0, 0)
                     }}
                  />
               </Pagination>
            </Container>
         </Col >
      </MainContainer>
   );
}
