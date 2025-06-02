'use client'
import React from 'react'

import MobileTable from './cultivos/MobileTable'
import DeskTable from './cultivos/DeskTable'
import { useIsMobile } from '../hooks/useIsMobile'


type Item = {
  id: number
  nombre: string
  icono_url: string
  tipo: string
}

type Props = {
  data: Item[]
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  query: string
  setQuery: (value: string) => void
  onCreate?: () => void
  perPage?: number
}

export default function PaginatedTable(props: Props) {
  const isMobile = useIsMobile()

  return isMobile ? (
    <MobileTable {...props} />
  ) : (
    <DeskTable {...props} />
  )
}