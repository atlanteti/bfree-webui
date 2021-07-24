import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { creds } from '../creds'

export const request = async ({
  method,
  headers,
  endpoint,
  data,
  params
}) => {
  const baseUrl = '209.97.146.187:18920'

  const config = {
    method: method || 'get',
    baseURL: `http://${baseUrl}/${endpoint}`,
    data: data || null,
    params: params || null,
    timeout: 7000,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization' : creds,
      ...headers
    }
  }

  let result

  try {
    result = await axios(config)
  } catch (error) {
    return <Redirect to="404"/>
  }

  return result.data
}
