'use client'
import React from 'react'


import { useIsMobile } from '../../hooks/useIsMobile'
import { Parcela } from '@/app/types'
import MobileTable from './MobileTable'
import DeskTable from './DeskTable'






type Props = {
  data: Parcela[]
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