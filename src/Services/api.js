import axios from 'axios'
import { Cookies } from 'react-cookie'
import { Redirect } from 'react-router-dom'

export const request = async ({
   method,
   headers,
   endpoint,
   data,
   params
}) => {

   const baseUrl = '209.97.146.187:18920'
   const cookieGetter = new Cookies()
   const token = cookieGetter.get("auth")
   const tokenTeste = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCBTZXNzaW9uIjoiY2QyMTRlOTQtMWFkYS00MTI4LWJmMzUtOGRjZjAxNjY3N2ZhIiwiSUQgQWNjb3VudCI6IjY2MmEyOGRhLTA3MWEtNDIyNy04NTViLTM0MWQxODI2OTk0NyIsIklEIEVkdXp6IjoiNjQ1NzkwMTkiLCJuYmYiOjE2MjYxMDk3NDYsImV4cCI6MTYyNjExMzM0NiwiaWF0IjoxNjI2MTA5NzQ2fQ.tK6aA6cTFmutNcVb8lmxFEm14hU9MUWXQi72oIf8RX4'
   const config = {
      method: method || 'get',
      baseURL: `http://${baseUrl}/${endpoint}`,
      data: data || null,
      params: params || null,
      timeout: 7000,
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
         // 'Authorization': "Bearer " + token,
         'Authorization': "Bearer " + tokenTeste,
         ...headers
      }
   }

   let result

   try {
      result = await axios(config)
   } catch (error) {
      return <Redirect to="404" />
   }

   return result.data
}
