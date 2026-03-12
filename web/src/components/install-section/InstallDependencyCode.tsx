import { useMemo, useState } from 'react'
import { PACKAGE_NAME } from '../../consts'
import { CodeSnippet } from '../CodeSnippet'
import { DropdownSelect } from '../DropdownSelect'

const PACKAGE_MANAGERS = ['pnpm', 'npm', 'yarn', 'bun'] as const
type PackageManager = (typeof PACKAGE_MANAGERS)[number]

const installCommandByManager: Record<PackageManager, string> = {
  pnpm: `pnpm add ${PACKAGE_NAME}`,
  npm: `npm install ${PACKAGE_NAME}`,
  yarn: `yarn add ${PACKAGE_NAME}`,
  bun: `bun add ${PACKAGE_NAME}`
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
