import { UseQueryResult } from "@tanstack/react-query"

type DataOrQuery_Props<TData> = {
  input: TData | UseQueryResult<TData>
  render(data: TData): JSX.Element
  loading?: JSX.Element
  error?: JSX.Element
}

export default function DataOrQuery<TData>({
  input,
  render,
  loading = <>Loading...</>,
  error = <>"Error"</>,
}: DataOrQuery_Props<TData>) {
  if (typeof input === "object") {
    const query = input as UseQueryResult<TData>
    if (query.isLoading) return loading
    else if (query.error) return error
    else render((input as any).data)
  } else return render(input)
  throw new Error("DataOrQuery: invalid param")
}