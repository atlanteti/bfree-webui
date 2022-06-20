import { MenuItem } from '@mui/material';
import React from 'react';
import { GenericSelector } from "./GenericSelector";

export const ListCompanies = (props) => {
   return <GenericSelector
      {...props}
      populateItems={ListUsersItem}
      endpoint='companies/listar-todos' />;
};
const ListUsersItem = (itemList) => {
   return itemList.map(item => {
      return <MenuItem
         key={item.cpn_cod}
         value={item.cpn_cod}
      >
         {item.cpn_name}
      </MenuItem>;
   });
};
