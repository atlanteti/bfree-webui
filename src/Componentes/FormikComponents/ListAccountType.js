import { MenuItem } from '@mui/material';
import { GenericSelector } from "./GenericSelector";

const ListAccountTypeItem = (itemList) => {
   return itemList?.map((item, index) => {
      return (
         <MenuItem
            key={index}
            value={item}
         >
            {item}
         </MenuItem>);
   });
};

export function AccountType(props) {
   return <GenericSelector
      {...props}
      populateItems={ListAccountTypeItem}
      endpoint='bank-data/list-type-account'
   />
}