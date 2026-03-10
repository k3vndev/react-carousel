import { useEffect, useRef, useState } from 'react'
import { cn } from '../utils/cn'
import { ChevronIcon } from './icons'

type DropdownSelectProps<T extends string> = {
  value: T
  options: readonly T[]
  onChange: (value: T) => void
  ariaLabel: string
  className?: string
}

export const DropdownSelect = <T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
  className
}: DropdownSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const handleSelect = (nextValue: T) => {
    onChange(nextValue)
    setIsOpen(false)
  }

  return (
    <div className={cn('relative w-fit', className)} ref={dropdownRef}>
      <button
        type='button'
        className='flex items-center text-white/35 hover:text-white/50 px-2 py-1 transition-colors group cursor-pointer'
        onClick={() => setIsOpen(open => !open)}
        aria-haspopup='menu'
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        <span className='text-xs px-2'>{value}</span>
        <ChevronIcon
          className={cn(
            'size-5 group-active:scale-90 transition-transform',
            isOpen ? 'rotate-180' : undefined
          )}
        />
      </button>

      {isOpen ? (
        <ul className='absolute left-0 top-full z-20 min-w-full rounded-xl border border-white/10 bg-black animate-fade-in origin-top anim-scale-0 anim-duration-150 anim-ease-out-cubic font-sans overflow-clip'>
          {options.map(option => {
            const isSelected = option === value

            return (
              <li key={option}>
                <button
                  type='button'
                  className={cn(
                    'w-full text-left text-xs px-3 py-2 transition-colors hover:bg-white/10 cursor-pointer',
                    isSelected ? 'text-white font-bold bg-white/5' : 'text-white/70'
                  )}
                  onClick={() => handleSelect(option)}
                  aria-current={isSelected}
                >
                  {option}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
