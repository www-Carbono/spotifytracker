import React from 'react'
import Wave from 'react-wavify'
const WaveComponent = (): JSX.Element => {
  return (
    <Wave
      fill='#111827'
      paused={false}
      style={{ display: 'flex', marginTop: '-20px', rotate: '180deg' }}
      options={{
        height: 20,
        amplitude: 20,
        speed: 0.2,
        points: 6
      }}
    />
  )
}

export default WaveComponent
