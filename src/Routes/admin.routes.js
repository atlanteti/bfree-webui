import React from "react";
import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom";

import Cadastros from '../Pages/Cadastros';

import ListarUsuarios from "../Pages/Usuarios/Listar";

import UsuarioCompanies from "../Pages/Usuarios/UsuarioCompanhia";
import UsuarioJornadas from '../Pages/Usuarios/UsuarioJornadas';
import UsuarioBadges from '../Pages/Usuarios/UsuarioBadges';
import UsuarioTipoDemanda from '../Pages/Usuarios/UsuarioTipoDemanda';
import UsuarioTimes from '../Pages/Usuarios/UsuarioTimes'

import ListarCompanhia from '../Pages/Companhia/Listar'

import ListarJornada from '../Pages/Jornadas/Listar'

import ListarBadges from '../Pages/Badges/Listar'

import ListarTipoDemanda from '../Pages/TipoDemanda/Listar'

import Error404 from '../Pages/Error'

import ListarTime from '../Pages/Times/Listar'

import App from "../App";
import ListarDemandas from "../Pages/Demandas/Listar";
import CadastrarTipoMentores from "../Pages/Times/TipoMentores";
import Log from "../Pages/Log";
import UploadSheet from "../Pages/UploadSheet";
import Downloads from "../Pages/Downloads"

import ListarRelatorio from "../Pages/Relatorio/Listar";
import Editar from "../Pages/Editar";
import { RelatorioGerencial } from "../Pages/RelatorioGerencial";
import { Horario } from "../Pages/Horarios";
import ListarReunioes from "../Pages/Demandas/Listar/Reuniões";
import ListarContatos from "../Pages/Demandas/Listar/Contato";
import { Avaliacao } from "../Pages/Avaliacao";
import { HorarioCalendario } from "../Pages/Horarios/Calendario";

export default function AdminRoutes() {
   return (
      <Router basename={process.env.PUBLIC_URL}>
         <Routes>
            {/* rotas de usuarios */}
            <Route path="/usuarios" element={<ListarUsuarios/>} />
            <Route path="/usuario-companhia/:userId/:userName" element={<UsuarioCompanies/>} />
            <Route path="/usuario-jornadas/:userId/:userName" element={<UsuarioJornadas/>} />
            <Route path="/usuario-badges/:userId/:userName" element={<UsuarioBadges/>} />
            <Route path="/usuario-tipodemanda/:userId/:userName" element={<UsuarioTipoDemanda/>} />
            <Route path="/usuario-times/:userId/:userName" element={<UsuarioTimes/>} />

            {/* rotas de indicadores */}
            <Route path="/relatoriogerencial" element={<RelatorioGerencial/>} />
            {/* rotas de horario */}
            <Route path="/horario" element={<Horario/>} />
            {/* rotas de horario */}
            <Route path="/horario-calendario" element={<HorarioCalendario/>} />
            {/* rotas de empresas */}
            <Route path="/companhia" element={<ListarCompanhia/>} />

            {/* rotas de jornadas */}
            <Route path="/jornadas" element={<ListarJornada/>} />

            {/* rotas de badges */}
            <Route path="/badges" element={<ListarBadges/>} />

            {/* rotas tipos de demanda */}
            <Route path="/tipodemanda" element={<ListarTipoDemanda/>} />

            {/* rotas de demandas */}
            <Route path="/demandas" element={<ListarDemandas/>} />

            {/* rotas de times */}
            <Route path="/times" element={<ListarTime/>} />
            <Route path="/tipo-mentores/:tea_cod" element={<CadastrarTipoMentores/>} />
            <Route exact path="/" element={<App/>} />
            <Route path="/cadastrar" element={<Cadastros/>} />
            <Route path="/editar" element={<Editar/>} />

            {/* rotas de upload*/}
            <Route path="/upload" element={<UploadSheet/>} />
            {/* rotas de download*/}
            <Route path="/download" element={<Downloads/>} />
            {/* rotas de log */}
            <Route path="/log" element={<Log/>}></Route>
            {/* rotas de reuniões */}
            <Route path="/reunioes" element={<ListarReunioes/>}></Route>
            {/* rota de fazer contato */}
            <Route path="/contato" element={<ListarContatos/>}></Route>
            {/* rotas de relatorio */}
            <Route path="/relatorios" element={<ListarRelatorio/>} />
            {/* rota de avaliacao */}
            <Route path="/avaliacao" element={<Avaliacao/>} />
            {/*Rota de 404, deve ficar por último sempre */}
            <Route path="*" element={<Error404/>} />
         </Routes>
      </Router>
   );
}