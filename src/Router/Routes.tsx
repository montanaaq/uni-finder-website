import App from '../Components/App'
import React, { ReactElement } from 'react'

interface IRoute {
  path: string
  element: ReactElement
}

export const routes: IRoute[] = [
  { path: '/', element: <App /> },
]
