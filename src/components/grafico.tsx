'use client'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js'

import Chart from 'chart.js/auto'

interface Song {
  id: string
  songName: string
  artistName: string
  coverlink: string
  songlink: string
  viewsTest: Record<string, number>
  userId: string
}
type SongProperty = keyof Song

interface Props {
  info: Song
  type: [string, SongProperty]
  graphType: 'total' | 'diferencia'
}

const Graphics: React.FC<Props> = ({
  info, // Informacion de la canción, vamos a obtener los valores
  type, // Nombre de la Base de Datos y la row del json.
  graphType // Si ponemos 'total' > Reproducciones totales , si ponemos 'diferencia' > Diferencia del dia anterior (el if)
}): JSX.Element => {
  let text = ''
  if (type[0] === 'spotifytracker') {
    text = 'Reproducciones'
  }

  if (type[0] === 'monthlylistenerstracker') {
    text = 'Oyentes Mensuales'
  }

  if (type[0] === 'followerstracker') {
    text = 'Seguidores'
  }

  const [axeX, setAxeX] = useState<string[]>([])
  const [axeY, setAxeY] = useState<string[] | number[]>([])
  const [label, setLabel] = useState<string>('')
  // const databaseName = type[0]
  const databaseRow = type[1]
  const graphicData = info[databaseRow]

  useEffect(() => {
    const entries = Object.entries(graphicData)
    const entriesSort = entries.sort((a, b) => {
      const [dayA, monthA] = a[0].split('/').map(Number)
      const [dayB, monthB] = b[0].split('/').map(Number)

      if (monthA !== monthB) {
        return monthA - monthB
      }
      return dayA - dayB
    })
    const sortedGraphic = Object.fromEntries(entriesSort)
    setAxeX(Object.keys(sortedGraphic))
    if (graphType === 'total') {
      setAxeY(Object.values(sortedGraphic))
      setLabel(`Total ${text}`)
    } else {
      const realValues = Object.values(sortedGraphic)
      const arrayViews = []
      setLabel(`${text} Diarias`)
      arrayViews.push(0)
      if (realValues.length > 1) {
        for (const [index] of realValues.entries()) {
          const diferencia = realValues[index + 1] - realValues[index]
          if (!isNaN(diferencia)) {
            arrayViews.push(diferencia)
          }
        }
      }
      setAxeY(arrayViews)
    }
  }, [])

  const data = {
    labels: axeX, // Dias
    datasets: [
      {
        label,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        showLine: true,
        data: axeY // Reproducciones,
      }
    ]
  }

  Chart.register(CategoryScale)

  return (
    <div className='scale-90 md:scale-100 md:w-[100%]'>
      <Line
        data={data as any}
        width={400}
        height={400}
      />
    </div>
  )
}

export default Graphics
