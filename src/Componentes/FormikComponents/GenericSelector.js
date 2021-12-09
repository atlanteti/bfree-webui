import React, { useEffect, useState } from 'react';
import { request } from '../../Services/api';
import { DefaultValidationTextField } from "./DefaultValidationTextField";



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
      label={label}
      select>
      {props.populateItems(items)}
   </DefaultValidationTextField>;
};
