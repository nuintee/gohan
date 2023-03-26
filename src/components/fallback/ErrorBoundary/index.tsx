import React from 'react'

import { ErrorBoundary as Boundary } from 'react-error-boundary'
import ErrorFallBack from '../ErrorFallback'

const ErrorBoundary = ({ children }: { children: React.ReactChild }) => {
  return <Boundary FallbackComponent={ErrorFallBack}>{children}</Boundary>
}

export default ErrorBoundary
