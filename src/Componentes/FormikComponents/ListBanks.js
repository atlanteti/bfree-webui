import { MenuItem } from '@mui/material';
import { GenericSelector } from "./GenericSelector";

const ListBankTypeItem = (itemList) => {
   return itemList?.map((item, index) => {
      return (
         <MenuItem
            key={index}
            value={item.bak_cod}
         >
            {item.bak_name}
         </MenuItem>);
   });
};

export function BankType(props) {
   return <GenericSelector
      {...props}
      populateItems={ListBankTypeItem}
      endpoint='banks/list'
   />
}