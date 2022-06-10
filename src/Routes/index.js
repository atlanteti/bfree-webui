import { useContext } from "react";

import ContextLogin from "../Context/ContextLogin";
import AdminRoutes from "./admin.routes";
import AppRoutes from "./app.routes";
import UserRoutes from "./user.routes";

export default function Routes() {
   const { signed, userRoles } = useContext(ContextLogin)
   let verifyRole = userRoles?.includes('PRÉ-VENDA') || userRoles?.includes('CONSULTOR')
   return signed ? (verifyRole ? <UserRoutes /> : <AdminRoutes />) : <AppRoutes />
}