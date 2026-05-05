import type React from 'react'

export type ReactChildren =
	| string
	| React.ReactNode
	| [string | React.ReactNode][]
