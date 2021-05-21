import { useMemo } from "react"
import useSWR from "swr"

interface IUseTags {
  inname: string
}

const useTags = ({ inname }: IUseTags) => {
  const params = useMemo(() => ({ inname: inname }), [inname])
  const tagsQuery = useSWR(
    [
      `/tags?order=desc&sort=popular&site=stackoverflow`, 
      params
    ]
  )
  return tagsQuery
}

export default useTags