import React, { useEffect, useState } from 'react';
import { request } from '../../Services/api';
import { DefaultValidationTextField } from "./DefaultValidationTextField";
import { MenuItem } from '@mui/material';
import NoDataComp from '../NoDataComp';

export const GenericSelector = ({ label, ...props }) => {
   const [items, setItems] = useState([]);
   useEffect(() => {
      const data = request({
         method: 'get',
         endpoint: props.endpoint
      });
      data.then((data) => {
         setItems(data.data);
      }).catch((error) => {
         console.log(error);
      });
   }, []);
   return <DefaultValidationTextField
      {...props}
      data-cy="data-selector"
      label={label}
      select>
      {props.notRequired && <MenuItem
         key={null}
         value={null}
      >
         <NoDataComp />
      </MenuItem>
      }
      {props.populateItems(items)}
   </DefaultValidationTextField>;
};
