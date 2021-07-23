import { useContext } from "react";

import ContextLogin from "../Context/ContextLogin";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";

export default function Routes() {
   const { signed } = useContext(ContextLogin)

   return signed ? <AuthRoutes /> : <AppRoutes />
}