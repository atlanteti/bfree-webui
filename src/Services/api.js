import axios from 'axios'
import { Col, Row } from 'react-bootstrap'
import { Cookies } from 'react-cookie'
import { baseEndpoint } from './config'

export const request = async ({
   method,
   headers,
   endpoint,
   data,
   params,
   contentType
}) => {

   const baseUrl = baseEndpoint
   const cookieGetter = new Cookies()
   const token = await cookieGetter.get("auth")
   const config = {
      method: method || 'get',
      baseURL: `http://${baseUrl}/${endpoint}`,
      data: data || null,
      params: params || null,
      timeout: 120000,
      headers: {
         'Content-Type': contentType || 'application/json',
         'Access-Control-Allow-Origin': '*',
         'Authorization': "Bearer " + token,
         ...headers
      }
   }

   let result

   try {
      result = await axios(config)
      if (result.data.meta.token !== token) {
         cookieGetter.set("auth", result.data.meta.token, { path: "/" })
      }
      if (result.data.meta.status === 422) {
         let Alert = () => {
            return <Row sm={1}>
               {result.data.data.map((element) => {
                  return <Col>{element.message}</Col>
               })}
            </Row>
         }
         result.data.meta.message = <Alert />
      }
      if(result.data.meta.status === 201){
         window.Eduzz.Accounts.logout({ env: "staging", redirectTo: window.location.origin })
         return
      } else if (result.data.meta.status === 204) {
         window.location.replace("/demandas")
      }
      
      return result.data
   } catch (error) {
      try {
         if (error.response.data.meta.status === 203) {
            window.Eduzz.Accounts.logout({ env: "staging", redirectTo: window.location.origin })
            return
         }
      } catch {
         throw new Error("Tratamento de página vazia não feito")
      }
   }
}
