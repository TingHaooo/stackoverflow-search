import { useMemo } from "react"
import { useSWRInfinite } from "swr"
import { swrOptions } from "../App"
import fetcher from "./fetcher"

const createGetKey = (params: any) => (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.has_more) return null
  return [
    `/questions?pagesize=20&order=desc&sort=activity&site=stackoverflow&page=${pageIndex + 1}`, 
    params
  ]
}
export interface IQestionData {
  question_id: number
  score: number
  answer_count: number
  view_count: number
  title: string
  link: string
  is_answered: boolean
  owner: {
    display_name: string
    profile_image: string
  }
}
export interface IQestionsRes {
  has_more: boolean,
  items: IQestionData[]
}
interface IUseInfiniteQestions {
  tagged?: string
}

const useInfiniteQestions = <T>({ tagged }: IUseInfiniteQestions) => {
  const params = useMemo(() => ({ tagged }), [tagged])

  // useSWRInfinite doesn't support global config
  const questionsQuery = useSWRInfinite<T>(createGetKey(params), fetcher as any, swrOptions)
  return questionsQuery
}

export default useInfiniteQestions