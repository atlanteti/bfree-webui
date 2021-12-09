import { MenuItem } from '@mui/material';
import React from 'react';
import { GenericSelector } from "./GenericSelector";

const ListStatusDemandsItem = (itemList) => {
   return itemList.map(item => {
      return <MenuItem
         key={item.sdm_cod}
         value={item.sdm_cod}
      >
         {item.sdm_name}
      </MenuItem>;
   });
};
export const ListStatusDemands = (props) => {
   return <GenericSelector
      {...props}
      populateItems={ListStatusDemandsItem}
      endpoint='status-demands/listar-todos' />;
};
