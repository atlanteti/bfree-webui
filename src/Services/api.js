import axios from 'axios';

export const request = async ({
   method,
   headers,
   endpoint,
   data,
   params,
}) => {

   const baseUrl = "209.97.146.187:18919"

   const config = {
      method: method || 'get',
      baseURL: `http://${baseUrl}/${endpoint}`,
      data: data || null,
      params: params || null,
      timeout: 7000,
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': "*",
         ...headers,
      },
   };

   let result;

   try {
      result = await axios(config);
   } catch (error) {
      result = "ERROR"; //TODO: error handling
   }

   return result.data;
};