import React, { useContext } from 'react';
import ContextLogin from './ContextLogin';

function Restricted(props) {
   const { admin } = useContext(ContextLogin)
   if (admin) {
      return <>{props.children}</>
   }
   return null
}
export default Restricted