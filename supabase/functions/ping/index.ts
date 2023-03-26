// @ts-ignore
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

console.log('Hello from Functions!')

serve(async () => {
  const data = {
    message: 'pong',
  }

  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
})
