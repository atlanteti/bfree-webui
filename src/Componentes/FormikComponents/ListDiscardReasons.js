import { MenuItem } from '@mui/material';
import React from 'react';
import { GenericSelector } from "./GenericSelector";

export const ListDiscardReasons = (props) => {
   return <GenericSelector
      {...props}
      populateItems={ListMessageItem}
      endpoint='demands/list-discards' />;
};
const ListMessageItem = (itemList) => {
   return itemList.map(item => {
      return <MenuItem
         key={item}
         value={item}
      >
         {item}
      </MenuItem>;
   });
};
