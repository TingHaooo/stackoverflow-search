import { useMemo } from "react"
import { useSWRInfinite } from "swr"
import { swrOptions } from "../App"
import fetcher from "./fetcher"

const createGetKey = (params: any) => (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.has_more) return null
  return [
    `/answers?pagesize=20&order=desc&sort=activity&site=stackoverflow&page=${pageIndex + 1}`, 
    params
  ]
}

interface IUseInfiniteQestions {
  tagged?: string
}

const useInfiniteQestions = ({ tagged }: IUseInfiniteQestions) => {
  const params = useMemo(() => ({ tagged }), [tagged])

  // useSWRInfinite doesn't support global config
  const questionsQuery = useSWRInfinite(createGetKey(params), fetcher, swrOptions)
  return questionsQuery
}

export default useInfiniteQestions