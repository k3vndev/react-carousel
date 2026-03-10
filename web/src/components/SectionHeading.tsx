import type { ReactNode } from 'react'
import { cn } from '../utils/cn'

interface Props {
  children: ReactNode
  className?: string
}

export const SectionHeading = ({ children, className }: Props) => (
  <h2 className={cn('text-6xl font-bold', className)}>{children}</h2>
)
