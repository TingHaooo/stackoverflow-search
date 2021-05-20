import { isEmpty, reject } from 'ramda'
import qs from 'query-string'

const version = "2.2"
const stackoverflowEndpoint = `https://api.stackexchange.com/${version}`

const fetcher = (path: string, params?: any) => {
  const queryString = qs.stringify(reject(isEmpty, params ?? {}))
  const url = isEmpty(queryString) ? 
    stackoverflowEndpoint + path :
    stackoverflowEndpoint + path + '&' + queryString

  return fetch(url)
  .then(res => res.json())
}


export default fetcher