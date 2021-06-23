import React from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap'
import navLogo from '../../Assets/Images/logo-atlante.png'
import './index.css'

const CustomMenu = () => {
   return (
      <div className="nav-container">
         <Navbar bg="light" expand="lg">
            {/* <Navbar.Brand href="/">
               <img
                  alt="Home Page"
                  src={navLogo}
                  width="194"
                  height="45"
                  className="d-inline-block align-top"
               />
            </Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
               <Nav>
                  <Nav.Link href="/"> Página Inicial </Nav.Link>
                  <Nav.Link href="/cadastrar">Cadastrar </Nav.Link>
                  {/* <Nav.Link> Usuário: admin </Nav.Link>
                  <Nav.Link href="#"> Login </Nav.Link> */}
               </Nav>
            </Navbar.Collapse>
         </Navbar>
         {/* <Nav id="secondary-nav">
            <NavDropdown title="Tabelas" className="nav-dropdown">
               <NavDropdown.Item >Action</NavDropdown.Item>
               <NavDropdown.Divider />
               <NavDropdown.Item >Separated link</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Cadastros" className="nav-dropdown">
               <NavDropdown.Item>
                     Clientes
               </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Atividades" className="nav-dropdown">
               <NavDropdown.Item >Action</NavDropdown.Item>
               <NavDropdown.Divider />
               <NavDropdown.Item >Separated link</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Inventário" className="nav-dropdown">
               <NavDropdown.Item >Action</NavDropdown.Item>
               <NavDropdown.Divider />
               <NavDropdown.Item >Separated link</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Reparo" className="nav-dropdown">
               <NavDropdown.Item >Action</NavDropdown.Item>
               <NavDropdown.Divider />
               <NavDropdown.Item >Separated link</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Consultas" className="nav-dropdown">
               <NavDropdown.Item >Action</NavDropdown.Item>
               <NavDropdown.Divider />
               <NavDropdown.Item >Separated link</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Relatórios" className="nav-dropdown">
               <NavDropdown.Item >Action</NavDropdown.Item>
               <NavDropdown.Divider />
               <NavDropdown.Item >Separated link</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Ferramentas" className="nav-dropdown">
               <NavDropdown.Item >Action</NavDropdown.Item>
               <NavDropdown.Divider />
               <NavDropdown.Item >Separated link</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Configurações" className="nav-dropdown">
               <NavDropdown.Item >Action</NavDropdown.Item>
               <NavDropdown.Divider />
               <NavDropdown.Item >Separated link</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Perfil" className="nav-dropdown">
               <NavDropdown.Item >Action</NavDropdown.Item>
               <NavDropdown.Divider />
               <NavDropdown.Item >Separated link</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Ajuda" className="nav-dropdown">
               <NavDropdown.Item >Action</NavDropdown.Item>
               <NavDropdown.Divider />
               <NavDropdown.Item >Separated link</NavDropdown.Item>
            </NavDropdown>
         </Nav> */}
      </div>
   );
}

export default CustomMenu;