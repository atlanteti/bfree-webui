import axios from 'axios'
import { Cookies } from 'react-cookie'
import { Redirect } from 'react-router-dom'
import { baseEndpoint } from './config'

export const request = async ({
   method,
   headers,
   endpoint,
   data,
   params
}) => {

   const baseUrl = baseEndpoint
   const cookieGetter = new Cookies()
   const token = await cookieGetter.get("auth")
   const config = {
      method: method || 'get',
      baseURL: `http://${baseUrl}/${endpoint}`,
      data: data || null,
      params: params || null,
      timeout: 7000,
      headers: {
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
         'Authorization': "Bearer " + token,
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
