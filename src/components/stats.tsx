/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'
import React, { useEffect, useState } from 'react'
import { Loader } from './Loader'
import Link from 'next/link'
import { getData } from '@/server/services/saveToDatabase'
import { type OyentesMensuales } from '@/app/types'
interface Props {
  type: string
  database: string
  userData: any
}

export const Stats = ({ type, database, userData }: Props): JSX.Element => {
  const [data, setData] = useState<any>([])
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
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>Error</p>
      ) : (
        <div>
          {type === 'canciones' && (
            <div>
              <p
                className='text-center pb-10'
                style={{ color: 'green' }}
              >
                Spotify Actualizado
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Portada</th>
                    <th>Nombre</th>
                    <th>Artista</th>
                    <th>Reproducciones</th>
                    <th>Aumento 24h</th>
                    <th>Mas Info</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((elemento: any) => (
                    <tr
                      className='text-center'
                      key={elemento?.id}
                    >
                      <td>
                        <img
                          src={elemento?.coverLink}
                          alt={elemento?.songName}
                          height={75}
                          width={75}
                          className='block m-auto'
                        />
                      </td>
                      <td>{elemento?.songName}</td>
                      <td>{elemento?.artistName}</td>
                      <td>
                        {elemento?.viewsTest !== null &&
                          elemento?.viewsTest !== undefined &&
                          Object.values(elemento?.viewsTest as number)[
                            Object.keys(elemento.viewsTest).length - 1
                          ]}
                      </td>
                      <td>
                        {elemento?.viewsTest !== null &&
                        elemento?.viewsTest !== undefined &&
                        Object.values(elemento?.viewsTest as number)[1] ===
                          undefined
                          ? '0'
                          : elemento?.viewsTest !== null &&
                            elemento?.viewsTest !== undefined && (
                              <span
                                className={
                                  Object.values(elemento?.viewsTest as number)[
                                    Object.keys(elemento.viewsTest).length - 1
                                  ] -
                                    Object.values(
                                      elemento?.viewsTest as number
                                    )[
                                      Object.keys(elemento.viewsTest).length - 2
                                    ] >
                                  0
                                    ? 'text-green-500'
                                    : 'text-red-500'
                                }
                              >
                                +
                                {Object.values(
                                  elemento?.viewsTest as number
                                )[1] -
                                  Object.values(
                                    elemento?.viewsTest as number
                                  )[0]}
                              </span>
                            )}
                      </td>
                      <td>
                        {' '}
                        <Link href={`/dashboard/song/${elemento.id}`}>
                          Click{' '}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {type === 'oyentes' && (
            <div>
              <p
                className='text-center pb-10'
                style={{ color: 'green' }}
              >
                Spotify Actualizado
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Portada</th>
                    <th>Artista</th>
                    <th>Oyentes Mensuales</th>
                    <th>Aumento 24h</th>
                    <th>Mas Info</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((elemento: any) => (
                    <tr
                      key={elemento?.id}
                      className='text-center'
                    >
                      <td>
                        <img
                          src={elemento?.coverlink}
                          alt={elemento?.artistname}
                          height={75}
                          width={75}
                          className='block m-auto'
                        />
                      </td>
                      <td>{elemento?.artistname}</td>
                      <td>
                        {elemento?.monthlylisteners !== null &&
                          elemento?.monthlylisteners !== undefined &&
                          Object.values(elemento?.monthlylisteners as number)[
                            Object.keys(elemento.monthlylisteners).length - 1
                          ]}
                      </td>
                      <td>
                        {elemento?.monthlylisteners !== null &&
                        elemento?.monthlylisteners !== undefined &&
                        Object.values(
                          elemento?.monthlylisteners as number
                        )[1] === undefined
                          ? '0'
                          : elemento?.monthlylisteners !== null &&
                            elemento?.monthlylisteners !== undefined && (
                              <span
                                className={
                                  Object.values(
                                    elemento?.monthlylisteners as number
                                  )[
                                    Object.keys(elemento.monthlylisteners)
                                      .length - 1
                                  ] -
                                    Object.values(
                                      elemento?.monthlylisteners as number
                                    )[
                                      Object.keys(elemento.monthlylisteners)
                                        .length - 2
                                    ] >
                                  0
                                    ? "text-green-500 before:content-['+']"
                                    : " text-red-500 before:content-['-'] "
                                }
                              >
                                {Object.values(
                                  elemento?.monthlylisteners as Record<
                                    string,
                                    number
                                  >
                                )[
                                  Object.keys(elemento?.monthlylisteners)
                                    .length - 1
                                ] -
                                  Object.values(
                                    elemento.monthlylisteners as Record<
                                      string,
                                      number
                                    >
                                  )[
                                    Object.keys(elemento.monthlylisteners)
                                      .length - 2
                                  ]}
                              </span>
                            )}
                      </td>
                      <td>
                        {' '}
                        <Link href={`/dashboard/listeners/${elemento.id}`}>
                          Click{' '}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {type === 'seguidores' && (
            <div>
              <p
                className='text-center pb-10'
                style={{ color: 'green' }}
              >
                Spotify Actualizado
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Portada</th>
                    <th>Artista</th>
                    <th>Seguidores</th>
                    <th>Aumento 24h</th>
                    <th>Mas Info</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((elemento: OyentesMensuales) => (
                    <tr
                      key={elemento?.id}
                      className='text-center'
                    >
                      <td>
                        <img
                          src={elemento?.coverlink}
                          alt={elemento?.artistname}
                          height={75}
                          width={75}
                          className='block m-auto'
                        />
                      </td>
                      <td>{elemento?.artistname}</td>
                      <td>
                        {elemento?.monthlylisteners !== null &&
                          elemento?.monthlylisteners !== undefined &&
                          Object.values(elemento?.monthlylisteners as number)[
                            Object.keys(elemento.monthlylisteners).length - 1
                          ]}
                      </td>
                      <td>
                        {elemento?.monthlylisteners !== null &&
                        elemento?.monthlylisteners !== undefined &&
                        Object.values(
                          elemento?.monthlylisteners as number
                        )[1] === undefined
                          ? '0'
                          : elemento?.monthlylisteners !== null &&
                            elemento?.monthlylisteners !== undefined && (
                              <span
                                className={
                                  Object.values(
                                    elemento?.monthlylisteners as number
                                  )[
                                    Object.keys(elemento.monthlylisteners)
                                      .length - 1
                                  ] -
                                    Object.values(
                                      elemento?.monthlylisteners as number
                                    )[
                                      Object.keys(elemento.monthlylisteners)
                                        .length - 2
                                    ] >
                                  0
                                    ? "text-green-500 before:content-['+']"
                                    : " text-red-500 before:content-['-'] "
                                }
                              >
                                {Object.values(
                                  elemento?.monthlylisteners as Record<
                                    string,
                                    number
                                  >
                                )[
                                  Object.keys(elemento?.monthlylisteners)
                                    .length - 1
                                ] -
                                  Object.values(
                                    elemento.monthlylisteners as Record<
                                      string,
                                      number
                                    >
                                  )[
                                    Object.keys(elemento.monthlylisteners)
                                      .length - 2
                                  ]}
                              </span>
                            )}
                      </td>
                      <td>
                        {' '}
                        <Link href={`/dashboard/followers/${elemento.id}`}>
                          Click{' '}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
