import { useContext } from "react"
import { Col } from "react-bootstrap"
import ContextLogin from "../../Context/ContextLogin";
import { TopBarContainer } from '../../styles/CommonStyles';

export default function TopBar() {
   const { userEmail, signed } = useContext(ContextLogin)

   return (
      <TopBarContainer>
         <div>
            <strong>B</strong>free
         </div>
         <div className="topbar-user">
            {signed && <p>Usuário: {userEmail}</p>}
         </div>
      </TopBarContainer>
   );
}