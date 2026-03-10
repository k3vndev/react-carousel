import { useMemo, useState } from 'react'
import { CodeSnippet } from '../CodeSnippet'
import { DropdownSelect } from '../DropdownSelect'

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

  return (
    <CodeSnippet codeStr={installCommand}>
      <DropdownSelect
        value={packageManager}
        options={PACKAGE_MANAGERS}
        onChange={setPackageManager}
        ariaLabel='Select package manager'
        className='pt-2'
      />
    </CodeSnippet>
  )
}
