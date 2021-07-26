import axios from 'axios'
import { Cookies } from 'react-cookie'
import { Redirect } from 'react-router-dom'

const prodServer = '209.97.146.187:18919'
const devServer = '209.97.146.187:18920'

export const request = async ({
   method,
   headers,
   endpoint,
   data,
   params
}) => {

   const baseUrl = devServer
   const cookieGetter = new Cookies()
   const token = cookieGetter.get("auth")
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
