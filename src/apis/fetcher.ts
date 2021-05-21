import { isEmpty, reject } from 'ramda'
import qs from 'query-string'

const version = "2.2"
const stackoverflowEndpoint = `https://api.stackexchange.com/${version}`

const fetcher = async (path: string, params?: any) => {
    const queryString = qs.stringify(reject(isEmpty, params ?? {}))
  const url = isEmpty(queryString) ? 
    stackoverflowEndpoint + path :
    stackoverflowEndpoint + path + '&' + queryString

  const res = await fetch(url)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.') as any
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()

}


export default fetcher