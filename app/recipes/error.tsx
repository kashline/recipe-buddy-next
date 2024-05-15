'use client'
 
import Button from '@/app/ui/button'
import { useEffect } from 'react'
import './[name]/styles.css'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className='error'>
      <h2 className='py-6'><strong>There was an error loading recipes!</strong></h2>
      <h2 className='py-6'>Please try again</h2>
      <Button
        onClick={
          () => {
            return {
              redirect: {
                destination: '/recipes',
                permanent: true,
              }
            }
          }
        }
      >
        Try again
      </Button>
    </div>
  )
}
