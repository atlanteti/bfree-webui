import { MenuItem } from '@mui/material';
import React from 'react';
import { GenericSelector } from "./GenericSelector";

const ListUserStatusItem = (itemList) => {
   {
      return itemList.map(status => {
         return (
            <MenuItem
               key={status.sus_cod}
               value={status.sus_cod}
            >
               {status.sus_name}
            </MenuItem>)
      });
   }
};
export const ListUserStatus = (props) => {
   return <GenericSelector
      {...props}
      populateItems={ListUserStatusItem}
      endpoint='status-users/listar-todos' />;
};
