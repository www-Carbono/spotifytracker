'use client'
import Graphics from '../../../../components/grafico'
import React, { useEffect, useState } from 'react'
import { getDetails } from '@/server/services/saveToDatabase'
const Details = ({
  params
}: {
  params: { id: string; database: string }
}): JSX.Element => {
  const [data, setData] = useState<any>()
  const [type, setType] = useState<any[]>([])
  const fetchData = async (): Promise<any> => {
    const row = params.database === 'song' ? 'viewsTest' : 'monthlylisteners'
    const database =
      params.database === 'song'
        ? 'spotifytracker'
        : params.database === 'listeners'
        ? 'monthlylistenerstracker'
        : 'followerstracker'
    if (
      params.database === 'song' ||
      params.database === 'listeners' ||
      params.database === 'followers'
    ) {
      setType([database, row])
      const data = await getDetails(database, params.id)
      return data
    } else {
      console.log('not working')
    }
  }
  useEffect(() => {
    fetchData()
      .then((information: any) => {
        setData(information)
        console.log(information)
      })
      .catch((err: any) => {
        console.log(err)
      })
  }, [])

  const onClickHandle = (): void => {
    window.location.href = '/dashboard'
  }
  return (
    <div className='flex justify-center items-center flex-col'>
      <button
        className='mb-10'
        onClick={onClickHandle}
      >
        Back
      </button>
      <h2 className='mb-10'>
        {data && (
          <div>
            {params.database === 'song'
              ? `${data[0].songName} - ${data[0].artistName}`
              : `${data[0].artistname}`}
          </div>
        )}
      </h2>
      {data && (
        <div className='flex justify-center items-center gap-96'>
          <div>
            <Graphics
              info={data[0]}
              type={[type[0], type[1]]}
              graphType={'total'}
            />
          </div>

          <div>
            <Graphics
              info={data[0]}
              type={[type[0], type[1]]}
              graphType={'diferencia'}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Details
