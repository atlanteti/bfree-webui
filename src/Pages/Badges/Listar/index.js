import { useEffect, useState } from "react";
import { CustomMenu } from "../../../Componentes/CustomMenu";
import { Link } from "react-router-dom"
import { Button, Pagination, Modal, Col, Row, Container } from 'react-bootstrap';
import { IoCheckboxOutline } from "react-icons/io5";
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
   TableData,
   TableCell,
   Icon
} from "./styles.js"
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
      <MainContainer>
         <CustomMenu />
         <Col
            sm={{ offset: 1, span: 9 }}//Temporary until styled components
            md={{ offset: 1, span: 9 }}
            lg={{ offset: 2, span: 10 }}
         >
            <Container>
               <Title>Badges</Title>
               <Row className="input-group">
                  <Input
                     className="form-control"
                     type="text"
                     placeholder="Digite o nome"
                     // onChange={buscarNome}
                     // onKeyDown={(e) => buscarEnter(e)}
                     defaultValue={buscar}
                  />
                  <LittleBtn
                     className="input-group-append"
                     onClick={(e) => requestData(e, buscar, page = 1)}
                     type="button"
                     yellowColor
                  >
                     Buscar
                  </LittleBtn>
                  <BtnCadastrar href={`/cadastrar/badges/${"inserir"}`} className="btn btn-dark ml-3">
                     Cadastrar
                  </BtnCadastrar>
               </Row>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <ColumnTitle scope="col">Nome</ColumnTitle>
                        <ColumnTitle scope="col">Jornada</ColumnTitle>
                        <ColumnTitle scope="col">Companhia</ColumnTitle>
                        <ColumnTitle scope="col">Mentor</ColumnTitle>
                        <ColumnTitle columnWidth scope="col">Data de Criação</ColumnTitle>
                        <ColumnTitle columnWidth scope="col">Data de atualização</ColumnTitle>
                        <ColumnTitle scope="col">Ações</ColumnTitle>
                     </TableRow>
                  </TableHeader>
                  <TableData>
                     {badges === null
                        ? ""
                        : badges.map((badge) => {
                           return (
                              <TableRow key={badge.bdg_cod}>
                                 <TableCell data-title="Nome" className="text">{badge.bdg_name}</TableCell>
                                 <TableCell data-title="Jornada" className="text">
                                    {/* para que fique ajustado para mobile */}
                                    {badge.jorney?.jny_name == null ? <p style={{ color: "transparent" }}>.</p> : badge?.jorney.jny_name}
                                 </TableCell>
                                 <TableCell data-title="Companhia" className="text">
                                    {badge.company?.cpn_name == null ? <p style={{ color: "transparent" }}>.</p> : badge?.company?.cpn_name}
                                 </TableCell>
                                 <TableCell data-title="Mentor" className="icon">
                                    <Icon className="mentor-icon">
                                       {badge?.bdg_mentor == true ? <IoCheckboxOutline align="center" size={25} /> : <p style={{ color: "transparent" }}>.</p>}
                                    </Icon>
                                 </TableCell>
                                 <TableCell data-title="Data de criação" className="data">
                                    {moment(badge?.bdg_dtcreation).format("a") === "pm" ? (
                                       moment(badge?.bdg_dtcreation).format("DD-MM-YYYY") 
                                       + " " + (parseInt(horaCriacao) + 12)
                                       + ":" + moment(badge?.bdg_dtcreation).format("mm")
                                    )
                                       : moment(badge?.bdg_dtcreation).format("DD-MM-YYYY hh:mm")
                                    }
                                 </TableCell>
                                 {badge.bdg_dtupdate == null ? <td data-title="Data de Atualização"><p style={{ color: "transparent" }}>.</p></td> : (
                                    <TableCell data-title="Data de Atualização" className="data">
                                       {moment(badge?.bdg_dtupdate).format("a") === "pm" ? (
                                          moment(badge?.bdg_dtupdate).format("DD-MM-YYYY") 
                                          + " " + (parseInt(horaUpd) + 12) 
                                          + ":" + moment(badge?.bdg_dtupdate).format("mm")
                                       )
                                          : moment(badge?.bdg_dtcreation).format("DD-MM-YYYY hh:mm")
                                       }
                                    </TableCell>
                                 )}
                                 <TableCell data-title="Ações" className="acoes">
                                    <Link to={`/editar-badge/${badge.bdg_cod}/${"alterar"}`} className="btn btn-warning">Editar</Link>
                                    <Button className="btn btn-dark" onClick={(e) => {
                                       setShowModal(true)
                                       setIdBadge(badge.bdg_cod)
                                    }}>
                                       Excluir
                                    </Button>
                                 </TableCell>
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
         </Col>
      </MainContainer>
   );
}