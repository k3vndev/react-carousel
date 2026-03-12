import type { ReactNode } from 'react'
import { cn } from '../utils/cn'

interface Props {
  children: ReactNode
  className?: string
}

export const SectionHeading = ({ children, className }: Props) => (
  <h2 className={cn('sm:text-6xl text-5xl font-bold mb-2', className)}>{children}</h2>
)
