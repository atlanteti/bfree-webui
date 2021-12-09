import { MenuItem } from '@mui/material';
import React from 'react';
import { GenericSelector } from "./GenericSelector";

const ListTypeDemandItem = (itemList) => {
   {
      return itemList.map(typeDemand => {
         return (
            <MenuItem
               key={typeDemand.tdm_cod}
               value={typeDemand.tdm_cod}
            >
               {typeDemand.tdm_name}
            </MenuItem>);
      });
   }
};
export const ListTypeDemand = (props) => {
   return <GenericSelector
      {...props}
      populateItems={ListTypeDemandItem}
      endpoint='types-demand/listar-todos' />;
};
