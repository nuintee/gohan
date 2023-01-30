import React, { Children } from 'react'

import { ErrorBoundary as Boundary } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const ErrorBoundary = ({ children }: { children: React.ReactChild }) => {
  return <Boundary FallbackComponent={ErrorFallback}>{children}</Boundary>
}

export default ErrorBoundary
