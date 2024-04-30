import React from 'react'
import './loader.css'
export const Loader = (): JSX.Element => {
  return (
    <svg
      viewBox='25 25 50 50'
      className='svg'
    >
      <circle
        className='circle'
        r='20'
        cy='50'
        cx='50'
      ></circle>
    </svg>
  )
}
