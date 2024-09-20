import { useContext } from "react";

import { Route, Routes as RRoutes, useHref, useRouteError } from "react-router-dom";
import App from "../App";
import ContextLogin from "../Context/ContextLogin";
import { Avaliacao } from "../Pages/Avaliacao";
import ListarContatos from "../Pages/Demandas/Listar/Contato";
import ListarReunioes from "../Pages/Demandas/Listar/Reuniões";
import Editar from "../Pages/Editar";
import { Horario } from "../Pages/Horarios";
import { HorarioCalendario } from "../Pages/Horarios/Calendario";
import ListarRelatorio from "../Pages/Relatorio/Listar";
import { TermosCompromisso } from "../Pages/Termos";

import ListarUsuarios from "../Pages/Usuarios/Listar";

import UsuarioBadges from '../Pages/Usuarios/UsuarioBadges';
import UsuarioCompanies from "../Pages/Usuarios/UsuarioCompanhia";
import UsuarioJornadas from '../Pages/Usuarios/UsuarioJornadas';
import UsuarioTimes from '../Pages/Usuarios/UsuarioTimes';
import UsuarioTipoDemanda from '../Pages/Usuarios/UsuarioTipoDemanda';

import ListarCompanhia from '../Pages/Companhia/Listar';

import ListarJornada from '../Pages/Jornadas/Listar';

import ListarBadges from '../Pages/Badges/Listar';

import ListarTipoDemanda from '../Pages/TipoDemanda/Listar';


import ListarTime from '../Pages/Times/Listar';

import ListarDemandas from "../Pages/Demandas/Listar";
import Downloads from "../Pages/Downloads";
import Log from "../Pages/Log";
import CadastrarTipoMentores from "../Pages/Times/TipoMentores";
import UploadSheet from "../Pages/UploadSheet";

import CadastrarBadge from "../Pages/Badges/Cadastrar";
import EditCompanhia from "../Pages/Companhia/Cadastrar";
import CadastrarDadosBancarios from "../Pages/DadosBancarios/Cadastrar";
import CadastrarDemanda from "../Pages/Demandas/Cadastrar";
import CadastrarJornada from "../Pages/Jornadas/Cadastrar";
import { RelatorioGerencial } from "../Pages/RelatorioGerencial";
import CadastrarTime from "../Pages/Times/Cadastrar";
import CadastrarTipoDemanda from "../Pages/TipoDemanda/Cadastrar";
import CadastrarUsuario from "../Pages/Usuarios/Cadastrar";
import Error404 from "../Pages/Error";


function ProtectedRoute({ children }) {
   const { signed, userRoles} = useContext(ContextLogin)
   let isNotAdmin = userRoles?.includes('PRÉ-VENDA') || userRoles?.includes('CONSULTOR')
   let role = isNotAdmin ? "user" : "admin"

   if(role=="user") {

   } else if(role=="admin") {
      
   }
}
export default function Routes() {
   const { signed, userRoles } = useContext(ContextLogin)
   let isNotAdmin = userRoles?.includes('PRÉ-VENDA') || userRoles?.includes('CONSULTOR')
   let role = isNotAdmin ? "user" : "admin"
   const base = useHref('/')

   function ErrorElement() {
      const error = useRouteError()
      if(error.name == "RequestTimeout") {
         return <>Timeout</>
      }
      return <>Houve um erro ao carregar esta página, tente novamente.</>
   }

   return <RRoutes>
      <Route path="/" errorElement={<ErrorElement/>}>
      <Route index path="/" element={<App/>} />
      <Route path="/termos" element={<TermosCompromisso/>} />
      <Route path="/avaliacao" element={<Avaliacao/>} />
         {/* rota de não admin */}
         <Route path="/editar" element={<Editar/>} />
         <Route path="/reunioes" element={<ListarReunioes/>}/>
         <Route path="/contato" element={<ListarContatos/>}/>
         <Route path="/relatorios" element={<ListarRelatorio/>}/>
         <Route index path="/demandas" element={<ListarDemandas/>} />
         <Route path="/usuarios" element={<ListarUsuarios/>} />

         {/* rotas de admin */}
         {/* rotas de editar usuarios */}
         {/* <Route path="/usuarios" element={<ListarUsuarios/>} /> */}
         <Route path="/usuario-companhia/:userId/:userName" element={<UsuarioCompanies/>} />
         <Route path="/usuario-jornadas/:userId/:userName" element={<UsuarioJornadas/>} />
         <Route path="/usuario-badges/:userId/:userName" element={<UsuarioBadges/>} />
         <Route path="/usuario-tipodemanda/:userId/:userName" element={<UsuarioTipoDemanda/>} />
         <Route path="/usuario-times/:userId/:userName" element={<UsuarioTimes/>} />

         {/* rotas de indicadores */}
         <Route path="/relatoriogerencial" element={<RelatorioGerencial/>} />
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
         <Route path="/cadastrar">
            <Route path={`/cadastrar/usuarios/:param`} element={<CadastrarUsuario/>} />
            <Route path={`/cadastrar/companhia/:param`} element={<EditCompanhia/>} />
            <Route path={`/cadastrar/jornadas/:param`} element={<CadastrarJornada/>}/>
            <Route path={`/cadastrar/badges/:param`} element={<CadastrarBadge/>} />
            <Route path={`/cadastrar/tipodemanda/:param`} element={<CadastrarTipoDemanda/>} />
            <Route path={`/cadastrar/times/:param`} element={<CadastrarTime/>} />
            <Route path={`/cadastrar/demandas/:param`} element={<CadastrarDemanda/>} />
         </Route>
         <Route path="/editar">
            <Route path={`/editar/usuarios/:usr_cod/:param`} element={<CadastrarUsuario/>} />
            <Route path={`/editar/companhia/:cpn_cod/:param`} element={<EditCompanhia/>} />
            <Route path={`/editar/jornadas/:jny_cod/:param`} element={<CadastrarJornada/>} />
            <Route path={`/editar/badges/:bdg_cod/:param`} element={<CadastrarBadge/>} />
            <Route path={`/editar/tipodemanda/:tdm_cod/:param`} element={<CadastrarTipoDemanda/>} />
            <Route path={`/editar/times/:tea_cod/:param`} element={<CadastrarTime/>} />
            <Route path={`/editar/demandas/:dem_cod/:param`} element={<CadastrarDemanda/>} />
            <Route path={`/editar/dados/:usr_cod/:param`} element={<CadastrarDadosBancarios/>} />
         </Route>

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
         <Route path='*' element={<Error404/>}/>
      </Route>
   </RRoutes>
}