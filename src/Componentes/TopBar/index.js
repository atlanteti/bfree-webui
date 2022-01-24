import { useContext } from "react"
import ContextLogin from "../../Context/ContextLogin";
import { TopBarContainer } from '../../styles/CommonStyles';

export default function TopBar() {
   const { userEmail, signed } = useContext(ContextLogin)

   return (
      <TopBarContainer>
         <div>
            <span>{" "}</span><strong>B</strong>free
         </div>
         <div>
            {signed && <p>usuário: {userEmail}</p>}
         </div>
      </TopBarContainer>
   );
}