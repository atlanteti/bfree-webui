import axios from 'axios'
import axiosRetry from 'axios-retry'
import { Col, Row } from 'react-bootstrap'
import { Cookies } from 'react-cookie'
import { useParams } from 'react-router-dom';

//Devido a mudança de paradigma do react de funções de classe para funções de componentes, esse wrapper
//Precisa ser utilizado para dar às funções de classe o acesso aos hooks relevantes.
export const withParams = WrappedComponent => props => {
   let param  = useParams();
   let inject = {"match": {}}
   inject.match.params = {...param}
   return <WrappedComponent {...props} {...inject}/>
}

axiosRetry(axios, {
   retries: 3
})

export const request = async ({
   method,
   headers,
   endpoint,
   data,
   params,
   contentType
}) => {

   const baseUrl = process.env.REACT_APP_API_ENDPOINT
   const cookieGetter = new Cookies()
   const token = await cookieGetter.get("auth")
   const config = {
      method: method || 'get',
      baseURL: `${baseUrl}/${endpoint}`,
      data: data || null,
      params: params || null,
      timeout: 5000,
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
      if (result.data.meta.token !== token &&
         window.location.pathname !== "/termos" &&
         window.location.pathname !== "/" &&
         window.location.pathname !== "/avaliacao"
      ) {
         cookieGetter.set("auth", result.data.meta.token, { path: "/" })
      }
      if (result.data.meta.journeys) {
         cookieGetter.set("admin", result.data.meta.journeys.length === 0, { path: "/" })
      }
      else {
         window.Eduzz.Accounts.logout({ env: process.env.REACT_APP_EDUZZ_ENV, redirectTo: window.location.origin })
      }
      cookieGetter.set("userType", result.data.meta.journeys)
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
      if (result.data.meta.status === 201 || result.data.meta.status === 202) {
         window.Eduzz.Accounts.logout({ env: process.env.REACT_APP_EDUZZ_ENV, redirectTo: window.location.origin })
         return
      } else if (result.data.meta.status === 204) {
         let route;
         if (cookieGetter.cookies.userType.includes('PRÉ-VENDA')) {
            route = "/contato"
         } else if (cookieGetter.cookies.userType.includes('CONSULTOR')) {
            route = "/reunioes"
         } else {
            route = "/demandas"
         }
         window.location.replace(process.env.PUBLIC_URL + route)
      } else if (result.data.meta.status === 216) {
         window.location.replace(process.env.PUBLIC_URL + `/editar/dados/${Number(cookieGetter.cookies.user)}/alterar`)
      }
      return result.data
   } catch (error) {
      if(error.code == "ERR_NETWORK") {
         console.log("Network error on", error)
      }
      else {
         try {
            if (error.response.data.meta.status === 203) {
               window.Eduzz.Accounts.logout({ env: process.env.REACT_APP_EDUZZ_ENV, redirectTo: window.location.origin })
               return
            }
         } catch (error) {
            if(error.name == "TypeError") {
               throw new Error("RequestTimeout")
            }
            throw new Error("Request Error", {cause: {code: "No content"}})
         }
      }
   }
}
