import { MenuItem } from '@mui/material';
import React from 'react';
import { GenericSelector } from "./GenericSelector";

export const ListUsers = (props) => {
   return <GenericSelector
      {...props}
      populateItems={ListUsersItem}
      endpoint='usuarios/listar-todos' />;
};
const ListUsersItem = (itemList) => {
   return itemList.map(item => {
      return <MenuItem
         key={item.usr_cod}
         value={item.usr_cod}
      >
         {item.usr_name}
      </MenuItem>;
   });
};
