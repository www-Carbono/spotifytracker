'use client'
import Graphics from '../../../../components/grafico'
import React, { useEffect, useState } from 'react'
import { getDetails } from '@/server/services/saveToDatabase'
import { motion } from 'framer-motion'

type ViewsTest = Record<string, unknown>
type monthlylisteners = Record<string, unknown>

// Define a type for the information parameter
interface Information {
  viewsTest: ViewsTest
  monthlylisteners: monthlylisteners
}

const Details = ({
  params
}: {
  params: { id: string; database: string }
}): JSX.Element => {
  const [data, setData] = useState<any>()
  const [type, setType] = useState<any[]>([])
  const [songData, setSongData] = useState<number | bigint | undefined>()
  const [diferencia, setDiferencia] = useState<number>()
  const [graphicsTable, setGraphicsTable] = useState<any>()
  const [graphicsTableResults, setGraphicsTableResults] = useState<string[]>()
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
      .then((information: Information[]) => {
        setData(information)
        if (params.database === 'song') {
          const array: any[] = Object.values(information[0].viewsTest)
          setGraphicsTable(array)
          const dataArray: number = array[array.length - 1]
          const resta =
            array[array.length - 2] !== undefined
              ? array[array.length - 1] - array[array.length - 2]
              : 0
          setSongData(dataArray)
          setDiferencia(resta)
        } else {
          const array: any[] = Object.values(information[0].monthlylisteners)
          setGraphicsTable(array)
          const dataArray: number | undefined = array[array.length - 1]
          const resta =
            array[array.length - 2] !== undefined
              ? array[array.length - 1] - array[array.length - 2]
              : 0
          setDiferencia(resta)
          setSongData(dataArray)
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    console.log(graphicsTable)
    const result: string[] = []

    if (graphicsTable !== undefined) {
      for (let i = 0; i < graphicsTable.length; i++) {
        if (i === 0) {
          // Si no hay anterior, poner 0
          result.push('0')
        } else {
          // Restar el elemento actual con el anterior
          result.push(
            `${graphicsTable[i] - graphicsTable[i - 1] > 0 ? '+' : ''} ${
              graphicsTable[i] - graphicsTable[i - 1]
            }`
          )
        }
      }
      setGraphicsTableResults(result)
      console.log(result)
    }
  }, [graphicsTable])

  const onClickHandle = (): void => {
    window.location.href = '/dashboard'
  }

  return (
    <div className='flex md:justify-center lg:justify-center xl:justify-center p-5'>
      {data && (
        <motion.div
          className='flex gap-8 bg-white rounded-lg shadow-2xl w-[100%] md:w-auto justify-center items-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className='bg-white rounded-lg shadow-lg p-6 w-[100%]'
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className='flex justify-end'>
              <motion.button
                onClick={onClickHandle}
                className='inline-flex shadow-xl items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 p-2 hover:bg-gray-200'
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                Volver
              </motion.button>
            </div>
            <div className='md:w-full md:max-w-4xl'>
              <div>
                <motion.h2
                  className='text-2xl font-bold'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Detalles
                </motion.h2>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Información Detallada de la canción o el Artista seleccionado
                </motion.h3>
              </div>
              <div className='grid gap-8 w-[50%]'>
                <motion.div
                  className='grid md:grid-cols-[200px_1fr] gap-6'
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.img
                    alt='Track Cover'
                    className='rounded-md'
                    height='200'
                    src={data[0].coverlink}
                    style={{
                      aspectRatio: '200/200',
                      objectFit: 'cover'
                    }}
                    width='200'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className='space-y-2'>
                    <h3 className='text-2xl font-bold' />
                    <p className='text-gray-500 dark:text-gray-400' />
                    <div className='flex items-center gap-2'>
                      {params.database !== 'song' ? (
                        <svg
                          className='h-5 w-5'
                          fill='none'
                          height='24'
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          viewBox='0 0 24 24'
                          width='24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                          <circle
                            cx='9'
                            cy='7'
                            r='4'
                          />
                          <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
                          <path d='M16 3.13a4 4 0 0 1 0 7.75' />
                        </svg>
                      ) : (
                        <svg
                          className='h-5 w-5'
                          fill='none'
                          height='24'
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          viewBox='0 0 24 24'
                          width='24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='M9 18V5l12-2v13' />
                          <circle
                            cx='6'
                            cy='18'
                            r='3'
                          />
                          <circle
                            cx='18'
                            cy='16'
                            r='3'
                          />
                        </svg>
                      )}
                      <span>
                        {new Intl.NumberFormat().format(songData ?? 0)}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      {diferencia !== undefined && diferencia > 0 ? (
                        <svg
                          className='h-5 w-5 text-green-500'
                          fill='none'
                          height='24'
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          viewBox='0 0 24 24'
                          width='24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='m5 12 7-7 7 7' />
                          <path d='M12 19V5' />
                        </svg>
                      ) : (
                        <svg
                          className='h-5 w-5 text-red-500'
                          fill='none'
                          height='24'
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          viewBox='0 0 24 24'
                          width='24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path d='m19 12-7 7-7-7' />
                          <path d='M12 5v14' />
                        </svg>
                      )}
                      <span className='md:text-md text-xs font-bold'>
                        {new Intl.NumberFormat().format(diferencia ?? 0)}{' '}
                        {params.database === 'song'
                          ? 'Reproducciones en las ultimas 24 horas'
                          : 'Seguidores/Oyentes Mensuales en las ultimas 24 horas'}
                      </span>
                    </div>
                  </div>
                  <h2 className='mb-10'>
                    {data && (
                      <div className='md:text-center text-sm -mt-5 font-semibold text-left'>
                        {params.database === 'song'
                          ? `${data[0].songName} - ${data[0].artistName}`
                          : `${data[0].artistname}`}
                      </div>
                    )}
                  </h2>
                </motion.div>
                <motion.div
                  className='flex gap-8 justify-center items-center flex-col md:flex-row'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className='w-[100%]'>
                    <h4 className='text-lg font-bold mb-4 md:text-center'>
                      {params.database === 'song'
                        ? 'Total Reproducciones de la Canción'
                        : params.database === 'listeners'
                        ? 'Total Oyentes Mensuales'
                        : 'Total Followers'}
                    </h4>
                    <div>
                      {data && (
                        <div className='flex md:justify-center md:items-center gap-96 md: aspect-[16/9]'>
                          <div>
                            <Graphics
                              info={data[0]}
                              type={[type[0], type[1]]}
                              graphType={'total'}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className='text-lg font-bold mb-4 md:text-center mt-28 md:mt-0'>
                      {params.database === 'song'
                        ? 'Reproducciones Diarias'
                        : params.database === 'listeners'
                        ? 'Oyentes Mensuales Diarios'
                        : 'Followers Diarios'}
                    </h4>
                    <div>
                      {data && (
                        <div className='flex md:justify-center md:items-center gap-96 md:aspect-[16/9]'>
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
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h4 className='text-lg font-bold mb-4'>
                    Reproduciones Mensuales
                  </h4>
                  <div className='relative w-full overflow-auto'>
                    <table className='w-full caption-bottom text-sm'>
                      <thead className='[&_tr]:border-b'>
                        <tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
                          <th className='md:h-12 md:px-4  align-middle font-medium text-xs md:text-sm text-muted-foreground [&:has([role=checkbox])]:pr-0 text-center'>
                            Dia
                          </th>
                          <th className='h-12 px-4  align-middle font-medium text-muted-foreground text-xs md:text-sm [&:has([role=checkbox])]:pr-0 text-center'>
                            Datos Totales
                          </th>
                          <th className='h-12 px-4 align-middle font-medium text-muted-foreground text-xs md:text-sm [&:has([role=checkbox])]:pr-0 text-center'>
                            Diferencia
                          </th>
                        </tr>
                      </thead>
                      <tbody className='[&_tr:last-child]:border-0 text-center'>
                        {params.database === 'song' ? (
                          <>
                            {Object.keys(data[0].viewsTest as string).map(
                              (value, index) => (
                                <tr
                                  key={index}
                                  className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'
                                >
                                  <td className='p-4 align-middle [&:has([role=checkbox])]:pr-0'>
                                    {value}
                                  </td>
                                  <td className='p-4 align-middle [&:has([role=checkbox])]:pr-0'>
                                    {new Intl.NumberFormat().format(
                                      data[0].viewsTest[value] as number
                                    )}
                                  </td>
                                  <td
                                    className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${
                                      graphicsTableResults?.[index][0] === '+'
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                    }`}
                                  >
                                    {graphicsTableResults?.[index][0] ===
                                    '+' ? (
                                      <>
                                        +
                                        {new Intl.NumberFormat().format(
                                          Number(
                                            graphicsTableResults?.[
                                              index
                                            ].substring(1)
                                          )
                                        )}
                                      </>
                                    ) : (
                                      graphicsTableResults?.[index]
                                    )}
                                  </td>
                                </tr>
                              )
                            )}
                          </>
                        ) : (
                          <>
                            {Object.keys(
                              data[0].monthlylisteners as string
                            ).map((value, index) => (
                              <tr
                                key={index}
                                className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'
                              >
                                <td className='p-4 align-middle [&:has([role=checkbox])]:pr-0'>
                                  {value}
                                </td>
                                <td className='p-4 align-middle [&:has([role=checkbox])]:pr-0'>
                                  {new Intl.NumberFormat().format(
                                    data[0].monthlylisteners[value] as number
                                  )}
                                </td>
                                <td
                                  className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${
                                    graphicsTableResults?.[index][0] === '+'
                                      ? 'text-green-500'
                                      : 'text-red-500'
                                  }`}
                                >
                                  {graphicsTableResults?.[index][0] === '+' ? (
                                    <>
                                      +
                                      {new Intl.NumberFormat().format(
                                        Number(
                                          graphicsTableResults?.[
                                            index
                                          ].substring(1)
                                        )
                                      )}
                                    </>
                                  ) : (
                                    graphicsTableResults?.[index]
                                  )}
                                </td>
                              </tr>
                            ))}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default Details
