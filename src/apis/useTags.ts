import { useMemo } from "react"
import useSWR from "swr"
export interface ITagData {
  name: string
}
export interface ITagsRes {
  has_more: boolean,
  items: ITagData[]
}

interface IUseTags {
  inname: string
}


const useTags = <T>({ inname }: IUseTags) => {
  const params = useMemo(() => ({ inname: inname }), [inname])
  const tagsQuery = useSWR<T>(
    [
      `/tags?pagesize=10&order=desc&sort=popular&site=stackoverflow`, 
      params
    ]
  )
  return tagsQuery
}

export default useTags