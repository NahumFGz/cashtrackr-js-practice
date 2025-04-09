'use client'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function ProgressBar() {
  return (
    <>
      <div className='flex justify-center p-10'>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: '#F59E0B',
            trailColor: '#e1e1e1',
            textColor: '#F59E0B',
            textSize: '8px',
          })}
          text={`50% gastado`}
          value={50}
        />
      </div>
    </>
  )
}
