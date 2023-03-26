#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "staging" ]] ; then
  # Proceed with the build
    echo "✅ - Build can proceed"
  exit 1;

# Include main "$VERCEL_GIT_COMMIT_REF" == "main", due to using workflow
else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi