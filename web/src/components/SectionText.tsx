import type { ReactNode } from 'react'
import { cn } from '../utils/cn'

interface Props {
  children: ReactNode
  className?: string
}

export const SectionText = ({ children, className }: Props) => (
  <p className={cn('sm:text-3xl text-2xl text-pretty font-light', className)}>{children}</p>
)
