import { useIsMobile } from "@/app/hooks/useIsMobile"
import { User } from "@/app/types"
import DeskTable from "./DeskTable"
import MobileTable from "./MobileTable"


type Props = {
  data: User[]
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  query: string
  setQuery: (value: string) => void
  onCreate?: () => void
  perPage?: number
  onDelete?: () => void; 
}

export default function PaginatedTable(props: Props) {
  const isMobile = useIsMobile()

  return isMobile ? (
    <MobileTable {...props} />
  ) : (
    <DeskTable {...props} />
  )
}