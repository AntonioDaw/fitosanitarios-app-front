'use client'
import React from 'react'

import MobileTable from './MobileTable'
import DeskTable from './DeskTable'
import { useIsMobile } from '../../hooks/useIsMobile'
import { Cultivo } from '@/app/types'





type Props = {
  data: Cultivo[]
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  query: string
  setQuery: (value: string) => void
  onCreate?: () => void
  perPage?: number
  onDelete?: () => void; 
}

export default function PaginatedTableCultivo(props: Props) {
  const isMobile = useIsMobile()

  return isMobile ? (
    <MobileTable {...props} />
  ) : (
    <DeskTable {...props} />
  )
}