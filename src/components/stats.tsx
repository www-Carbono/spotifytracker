/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'
import React, { useEffect, useState } from 'react'
import { Loader } from './Loader'
import Link from 'next/link'
import { getData } from '@/server/services/saveToDatabase'
import { type OyentesMensuales } from '@/app/types'
import { SearchSong } from './SearchSong'
import { motion } from 'framer-motion'
interface Props {
  type: string
  database: string
  userData: any
}

export const Stats = ({ type, database, userData }: Props): JSX.Element => {
  const [data, setData] = useState<any>([])
  const [newSong, setNewSong] = useState(false)
  const [error, setError] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    setIsLoading(true)
    getData(database, userData.userData.id as string)
      .then((data) => {
        setData(data)
        setIsLoading(false)
      })
      .catch((error) => {
        setError(error)
        setIsLoading(false)
      })
  }, [type, database])

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <p>Error</p>
        ) : (
          <div>
            {type === 'canciones' && (
              <div className='grid gap-8'>
                <div className='bg-white rounded-lg shadow-lg p-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-2xl font-bold'>Trackear Canciones</h2>
                    <button
                      className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 p-2 hover:bg-gray-200'
                      type='button'
                      onClick={() => {
                        setNewSong(!newSong)
                      }}
                    >
                      {newSong ? 'Cerrar' : 'Añadir Canción'}
                    </button>
                  </div>

                  <div className='grid md:grid-cols-1 gap-6'>
                    {newSong && (
                      <div>
                        <h2>Añade Una nueva Canción</h2>
                        <SearchSong type={'track'} />
                      </div>
                    )}

                    <div
                      className='rounded-lg border bg-card text-card-foreground shadow-lg'
                      data-v0-t='card'
                    >
                      <div className='flex flex-col space-y-1.5 p-6'>
                        <h3 className='whitespace-nowrap text-2xl font-semibold leading-none tracking-tight'>
                          Canciones Trackeadas
                        </h3>
                        <p className='text-sm text-muted-foreground'>
                          Aquí encontrarás todas las canciones a las que estás
                          haciendole un seguimiento.
                        </p>
                      </div>
                      <div className='p-6'>
                        <div className='relative w-full overflow-auto'>
                          <table className='w-full caption-bottom text-sm text-center'>
                            <thead className='[&_tr]:border-b'>
                              <tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
                                <th className='h-12 px-2 text-left align-middle font-medium text-muted-foreground text-md'>
                                  Portada
                                </th>
                                <th className='h-12 px-2 align-middle font-medium text-muted-foreground text-md'>
                                  Nombre Canción
                                </th>
                                <th className='h-12 px-2 align-middle font-medium text-muted-foreground text-md'>
                                  Artista
                                </th>
                                <th className='h-12 px-2 align-middle font-medium text-muted-foreground text-md'>
                                  Reproducciones
                                </th>
                                <th className='h-12 px-2 align-middle font-medium text-muted-foreground text-xs'>
                                  Últimas 24h
                                </th>
                                <th className='h-12 px-2 align-middle font-medium text-muted-foreground text-xs'>
                                  Más Information
                                </th>
                              </tr>
                            </thead>

                            <motion.tbody // Agregamos animación a la tbody
                              className='[&_tr:last-child]:border-0'
                              initial={{ opacity: 0 }} // Iniciamos con opacidad 0
                              animate={{ opacity: 1 }} // Hacemos la transición a opacidad 1
                              transition={{ duration: 0.5 }} // Duración de la transición
                            >
                              {data?.map((elemento: any) => (
                                <motion.tr // Agregamos animación a cada fila de la tabla
                                  className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'
                                  key={elemento?.id}
                                  initial={{ opacity: 0, y: -50 }} // Iniciamos con opacidad 0 y movemos hacia arriba
                                  animate={{ opacity: 1, y: 0 }} // Hacemos la transición a opacidad 1 y posición original
                                  transition={{ duration: 0.5, delay: 0.1 }} // Duración de la transición y retraso
                                >
                                  <td className='p-4 align-middle'>
                                    <motion.img // Agregamos animación a la imagen
                                      src={elemento?.coverlink}
                                      alt={elemento?.songName}
                                      height={75}
                                      width={75}
                                      className='block m-auto rounded-md'
                                      initial={{ opacity: 0 }} // Iniciamos con opacidad 0
                                      animate={{ opacity: 1 }} // Hacemos la transición a opacidad 1
                                      transition={{ duration: 0.5, delay: 0.2 }} // Duración de la transición y retraso
                                    />
                                  </td>
                                  <td className='p-4 align-middle'>
                                    <p className='font-medium'>
                                      {elemento?.songName}
                                    </p>
                                  </td>
                                  <td className='p-4 align-middle'>
                                    {elemento?.artistName}
                                  </td>
                                  <td className='p-4 align-middle text-center'>
                                    {elemento?.viewsTest !== null &&
                                      elemento?.viewsTest !== undefined &&
                                      new Intl.NumberFormat().format(
                                        Object.values(
                                          elemento?.viewsTest as number
                                        )[
                                          Object.keys(elemento.viewsTest)
                                            .length - 1
                                        ]
                                      )}
                                  </td>
                                  <td className='p-4 align-middle text-center'>
                                    {elemento?.viewsTest !== null &&
                                    elemento?.viewsTest !== undefined &&
                                    Object.values(
                                      elemento?.viewsTest as number
                                    )[1] === undefined
                                      ? '0'
                                      : elemento?.viewsTest !== null &&
                                        elemento?.viewsTest !== undefined && (
                                          <span
                                            className={
                                              Object.values(
                                                elemento?.viewsTest as number
                                              )[
                                                Object.keys(elemento.viewsTest)
                                                  .length - 1
                                              ] -
                                                Object.values(
                                                  elemento?.viewsTest as number
                                                )[
                                                  Object.keys(
                                                    elemento.viewsTest
                                                  ).length - 2
                                                ] >
                                              0
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                            }
                                          >
                                            +
                                            {new Intl.NumberFormat().format(
                                              Object.values(
                                                elemento?.viewsTest as number
                                              )[
                                                Object.keys(elemento?.viewsTest)
                                                  .length - 1
                                              ] -
                                                Object.values(
                                                  elemento?.viewsTest as number
                                                )[
                                                  Object.keys(
                                                    elemento?.viewsTest
                                                  ).length - 2
                                                ]
                                            )}
                                          </span>
                                        )}
                                  </td>
                                  <td className='p-4 align-middle text-center'>
                                    <Link
                                      href={`/dashboard/song/${elemento.id}`}
                                    >
                                      Click
                                    </Link>
                                  </td>
                                </motion.tr>
                              ))}
                            </motion.tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {type === 'oyentes' && (
              <div className='grid gap-8'>
                <div className='bg-white rounded-lg shadow-lg p-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-2xl font-bold'>Song Tracking</h2>
                    <button
                      className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 p-2 hover:bg-gray-200'
                      type='button'
                      onClick={() => {
                        setNewSong(!newSong)
                      }}
                    >
                      {newSong ? 'Cerrar' : 'Añadir Artista'}
                    </button>
                  </div>

                  <div className='grid md:grid-cols-1 gap-6'>
                    {newSong && (
                      <div>
                        <h2>Añade Un Nuevo Artista</h2>
                        <SearchSong type='artist' />{' '}
                      </div>
                    )}

                    <div
                      className='rounded-lg border bg-card text-card-foreground shadow-lg'
                      data-v0-t='card'
                    >
                      <div className='flex flex-col space-y-1.5 p-6'>
                        <h3 className='whitespace-nowrap text-2xl font-semibold leading-none tracking-tight'>
                          Oyentes Mensuales de Artista Trackeados
                        </h3>
                        <p className='text-sm text-muted-foreground'>
                          Aquí encontrarás todos Oyentes Mensuales de los
                          artistas a los que estás haciendole un seguimiento.
                        </p>
                      </div>
                      <div className='p-6'>
                        <div className='relative w-full overflow-auto'>
                          <table className='w-full caption-bottom text-sm text-center'>
                            <thead className='[&_tr]:border-b'>
                              <tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
                                <th className='h-12 px-2 align-middle font-medium text-muted-foreground'>
                                  Portada
                                </th>
                                <th className='h-12 px-4 align-middle font-medium text-muted-foreground'>
                                  Artista
                                </th>
                                <th className='h-12 px-4 align-middle font-medium text-muted-foreground'>
                                  Oyentes Mensuales
                                </th>
                                <th className='h-12 px-4 align-middle font-medium text-muted-foreground'>
                                  Ultimas 24h
                                </th>
                                <th className='h-12 px-4 align-middle font-medium text-muted-foreground'>
                                  Mas Información
                                </th>
                              </tr>
                            </thead>
                            <motion.tbody // Agregamos animación a la tbody
                              className='[&_tr:last-child]:border-0'
                              initial={{ opacity: 0 }} // Iniciamos con opacidad 0
                              animate={{ opacity: 1 }} // Hacemos la transición a opacidad 1
                              transition={{ duration: 0.5 }} // Duración de la transición
                            >
                              {data?.map((elemento: OyentesMensuales) => (
                                <motion.tr // Agregamos animación a cada fila de la tabla
                                  className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'
                                  key={elemento?.id}
                                  initial={{ opacity: 0, y: -50 }} // Iniciamos con opacidad 0 y movemos hacia arriba
                                  animate={{ opacity: 1, y: 0 }} // Hacemos la transición a opacidad 1 y posición original
                                  transition={{ duration: 0.5, delay: 0.1 }} // Duración de la transición y retraso
                                >
                                  <td className='p-4 align-middle'>
                                    <motion.img // Agregamos animación a la imagen
                                      src={elemento?.coverlink}
                                      alt={elemento?.artistname}
                                      height={75}
                                      width={75}
                                      className='block m-auto rounded-md'
                                      initial={{ opacity: 0 }} // Iniciamos con opacidad 0
                                      animate={{ opacity: 1 }} // Hacemos la transición a opacidad 1
                                      transition={{ duration: 0.5, delay: 0.2 }} // Duración de la transición y retraso
                                    />
                                  </td>
                                  <td className='p-4 align-middle'>
                                    {elemento?.artistname}
                                  </td>
                                  <td className='p-4 align-middle'>
                                    {elemento?.monthlylisteners !== null &&
                                      elemento?.monthlylisteners !==
                                        undefined &&
                                      new Intl.NumberFormat().format(
                                        Object.values(
                                          elemento?.monthlylisteners as number
                                        )[
                                          Object.keys(elemento.monthlylisteners)
                                            .length - 1
                                        ]
                                      )}
                                  </td>
                                  <td className='p-4 align-middle text-center'>
                                    {elemento?.monthlylisteners !== null &&
                                    elemento?.monthlylisteners !== undefined &&
                                    Object.values(
                                      elemento?.monthlylisteners as number
                                    )[1] === undefined
                                      ? '0'
                                      : elemento?.monthlylisteners !== null &&
                                        elemento?.monthlylisteners !==
                                          undefined && (
                                          <span
                                            className={
                                              Object.values(
                                                elemento?.monthlylisteners as number
                                              )[
                                                Object.keys(
                                                  elemento.monthlylisteners
                                                ).length - 1
                                              ] -
                                                Object.values(
                                                  elemento?.monthlylisteners as number
                                                )[
                                                  Object.keys(
                                                    elemento.monthlylisteners
                                                  ).length - 2
                                                ] >
                                              0
                                                ? 'text-green-500 before:content-["+"]'
                                                : 'text-red-500'
                                            }
                                          >
                                            {new Intl.NumberFormat().format(
                                              Object.values(
                                                elemento?.monthlylisteners as Record<
                                                  string,
                                                  number
                                                >
                                              )[
                                                Object.keys(
                                                  elemento?.monthlylisteners
                                                ).length - 1
                                              ] -
                                                Object.values(
                                                  elemento.monthlylisteners as Record<
                                                    string,
                                                    number
                                                  >
                                                )[
                                                  Object.keys(
                                                    elemento.monthlylisteners
                                                  ).length - 2
                                                ]
                                            )}
                                          </span>
                                        )}
                                  </td>
                                  <td className='p-4 align-middle text-center'>
                                    <Link
                                      href={`/dashboard/listeners/${elemento.id}`}
                                    >
                                      Click
                                    </Link>
                                  </td>
                                </motion.tr>
                              ))}
                            </motion.tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {type === 'seguidores' && (
              <div className='grid gap-8'>
                <div className='bg-white rounded-lg shadow-lg p-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-2xl font-bold'>Song Tracking</h2>
                    <button
                      className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 p-2 hover:bg-gray-200'
                      type='button'
                      onClick={() => {
                        setNewSong(!newSong)
                      }}
                    >
                      {newSong ? 'Cerrar' : 'Añadir Artista'}
                    </button>
                  </div>

                  <div className='grid md:grid-cols-1 gap-6'>
                    {newSong && (
                      <div>
                        <h2>Añade Un nuevo artista</h2>
                        <SearchSong type='artistFollowers' />{' '}
                      </div>
                    )}

                    <div
                      className='rounded-lg border bg-card text-card-foreground shadow-lg'
                      data-v0-t='card'
                    >
                      <div className='flex flex-col space-y-1.5 p-6'>
                        <h3 className='whitespace-nowrap text-2xl font-semibold leading-none tracking-tight'>
                          Seguidores de Artista Trackeados
                        </h3>
                        <p className='text-sm text-muted-foreground'>
                          Aquí encontrarás todos los seguidores en spotify de
                          los artistas a los que estás haciendole un
                          seguimiento.
                        </p>
                      </div>
                      <div className='p-6'>
                        <div className='relative w-full overflow-auto'>
                          <table className='w-full caption-bottom text-sm text-center'>
                            <thead className='[&_tr]:border-b'>
                              <tr className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'>
                                <th className='h-12 px-4 align-middle font-medium text-muted-foreground'>
                                  Portada
                                </th>
                                <th className='h-12 px-4 align-middle font-medium text-muted-foreground'>
                                  Artista
                                </th>
                                <th className='h-12 px-4 align-middle font-medium text-muted-foreground'>
                                  Seguidores
                                </th>
                                <th className='h-12 px-4 align-middle font-medium text-muted-foreground'>
                                  Ultimas 24h
                                </th>
                                <th className='h-12 px-4 align-middle font-medium text-muted-foreground'>
                                  Mas Información
                                </th>
                              </tr>
                            </thead>
                            <motion.tbody // Agregamos animación a la tbody
                              className='[&_tr:last-child]:border-0'
                              initial={{ opacity: 0 }} // Iniciamos con opacidad 0
                              animate={{ opacity: 1 }} // Hacemos la transición a opacidad 1
                              transition={{ duration: 0.5 }} // Duración de la transición
                            >
                              {data?.map((elemento: OyentesMensuales) => (
                                <motion.tr // Agregamos animación a cada fila de la tabla
                                  className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'
                                  key={elemento?.id}
                                  initial={{ opacity: 0, y: -50 }} // Iniciamos con opacidad 0 y movemos hacia arriba
                                  animate={{ opacity: 1, y: 0 }} // Hacemos la transición a opacidad 1 y posición original
                                  transition={{ duration: 0.5, delay: 0.1 }} // Duración de la transición y retraso
                                >
                                  <td className='p-4 align-middle'>
                                    <motion.img // Agregamos animación a la imagen
                                      src={elemento?.coverlink}
                                      alt={elemento?.artistname}
                                      height={75}
                                      width={75}
                                      className='block m-auto rounded-md'
                                      initial={{ opacity: 0 }} // Iniciamos con opacidad 0
                                      animate={{ opacity: 1 }} // Hacemos la transición a opacidad 1
                                      transition={{ duration: 0.5, delay: 0.2 }} // Duración de la transición y retraso
                                    />
                                  </td>
                                  <td className='p-4 align-middle'>
                                    {elemento?.artistname}
                                  </td>
                                  <td className='p-4 align-middle'>
                                    {elemento?.monthlylisteners !== null &&
                                      elemento?.monthlylisteners !==
                                        undefined &&
                                      new Intl.NumberFormat().format(
                                        Object.values(
                                          elemento?.monthlylisteners as number
                                        )[
                                          Object.keys(elemento.monthlylisteners)
                                            .length - 1
                                        ]
                                      )}
                                  </td>
                                  <td className='p-4 align-middle text-center'>
                                    {elemento?.monthlylisteners !== null &&
                                    elemento?.monthlylisteners !== undefined &&
                                    Object.values(
                                      elemento?.monthlylisteners as number
                                    )[1] === undefined
                                      ? '0'
                                      : elemento?.monthlylisteners !== null &&
                                        elemento?.monthlylisteners !==
                                          undefined && (
                                          <span
                                            className={
                                              Object.values(
                                                elemento?.monthlylisteners as number
                                              )[
                                                Object.keys(
                                                  elemento.monthlylisteners
                                                ).length - 1
                                              ] -
                                                Object.values(
                                                  elemento?.monthlylisteners as number
                                                )[
                                                  Object.keys(
                                                    elemento.monthlylisteners
                                                  ).length - 2
                                                ] >
                                              0
                                                ? 'text-green-500 before:content-["+"]'
                                                : 'text-red-500'
                                            }
                                          >
                                            {new Intl.NumberFormat().format(
                                              Object.values(
                                                elemento?.monthlylisteners as Record<
                                                  string,
                                                  number
                                                >
                                              )[
                                                Object.keys(
                                                  elemento?.monthlylisteners
                                                ).length - 1
                                              ] -
                                                Object.values(
                                                  elemento.monthlylisteners as Record<
                                                    string,
                                                    number
                                                  >
                                                )[
                                                  Object.keys(
                                                    elemento.monthlylisteners
                                                  ).length - 2
                                                ]
                                            )}
                                          </span>
                                        )}
                                  </td>
                                  <td className='p-4 align-middle text-center'>
                                    <Link
                                      href={`/dashboard/followers/${elemento.id}`}
                                    >
                                      Click
                                    </Link>
                                  </td>
                                </motion.tr>
                              ))}
                            </motion.tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
