import { useMemo, useState } from 'react'
import { CodeSnippet } from '../CodeSnippet'
import { ChevronIcon } from '../icons'

const PACKAGE_MANAGERS = ['pnpm', 'npm', 'yarn', 'bun'] as const
type PackageManager = (typeof PACKAGE_MANAGERS)[number]

const dependencyName = '@k3vndev/react-carousel'

const installCommandByManager: Record<PackageManager, string> = {
  pnpm: `pnpm add ${dependencyName}`,
  npm: `npm install ${dependencyName}`,
  yarn: `yarn add ${dependencyName}`,
  bun: `bun add ${dependencyName}`
}

export const InstallDependencyCode = () => {
  const [packageManager, setPackageManager] = useState<PackageManager>('pnpm')

  const installCommand = useMemo(() => installCommandByManager[packageManager], [packageManager])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPackageManager(event.target.value as PackageManager)
  }

  return (
    <CodeSnippet codeStr={installCommand}>
      <div className='relative flex items-center text-white/35 pt-2 w-fit'>
        <span className='text-xs px-2 ml-2'>{packageManager}</span>
        <ChevronIcon className='size-5' />

        <select
          className='absolute inset-0 opacity-0 cursor-pointer text-xs appearance-none px-3'
          value={packageManager}
          onChange={handleChange}
          aria-label='Select package manager'
        >
          {PACKAGE_MANAGERS.map(manager => (
            <option className='bg-black hover:bg-gray-900' key={manager} value={manager}>
              {manager}
            </option>
          ))}
        </select>
      </div>
    </CodeSnippet>
  )
}
