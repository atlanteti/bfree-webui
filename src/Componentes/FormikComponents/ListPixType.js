import { MenuItem } from '@mui/material';
import { GenericSelector } from "./GenericSelector";

const ListPixTypeItem = (itemList) => {
   {
      return itemList?.map((item, index) => {
         return (
            <MenuItem
               key={index}
               value={item.tpi_cod}
            >
               {item.tpi_name}
            </MenuItem>);
      });
   }
};

export function PixType(props) {
   return <GenericSelector
      {...props}
      populateItems={ListPixTypeItem}
      endpoint='type-pix/list'
   />
}