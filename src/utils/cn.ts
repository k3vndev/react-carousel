import { twMerge } from 'tailwind-merge'
export const cn = (...classes: (string | undefined)[]) => twMerge(classes.filter(Boolean).join(' '))
