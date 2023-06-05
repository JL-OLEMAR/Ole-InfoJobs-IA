'use client'

import { Fragment, useState } from 'react'
import { Badge, Button, Card, Flex, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from '@tremor/react'

import Score from './Score'
import { Offer } from '../types'

export function ListOfOffers({ offers }: { offers: Offer[] }) {
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({})
  const [scores, setScores] = useState<{
    [key: string]: {
      score: number
      message: string
    }
  }>({})

  const handleClick = async (id: string) => {
    setIsLoading(prevLoading => ({
      ...prevLoading,
      [id]: true
    }))

    const res = await fetch(`/api/check-description?id=${id}`, {
      headers: { 'Content-Type': 'application/json' }
    })
    const json = await res.json()

    setScores(preScores => ({
      ...preScores,
      [id]: json // ['123abc']: { score: 1 al 9, message: 'la oferta es muy buena....' }
    }))

    setIsLoading(prevLoading => ({
      ...prevLoading,
      [id]: false
    }))
  }

  return (
    <Card>
      <Flex justifyContent='start' className='space-x-2'>
        <Title>Ofertas de trabajo de InfoJobs</Title>
        <Badge color='gray'>{offers.length}</Badge>
      </Flex>
      <Text className='mt-2'>las últimas ofertas de trabajo</Text>

      <Table className='mt-6'>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Puesto</TableHeaderCell>
            <TableHeaderCell>Provincia</TableHeaderCell>
            <TableHeaderCell>Experiencia</TableHeaderCell>
            {/* <TableHeaderCell>Modalidad</TableHeaderCell> */}
            <TableHeaderCell className='text-center'>Acción</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {offers.map((item) => (
            <Fragment key={item.id}>
              <TableRow
                className='hover:bg-sky-300 transition-colors cursor-pointer'
                onClick={() => { window.open(item.link, '_blank') }}
              >

                <TableCell>{item.title}</TableCell>
                <TableCell>{item.province}</TableCell>
                <TableCell>{item.experienceMin}</TableCell>
                {/* <TableCell>{item.teleworking}</TableCell> */}
                <TableCell className='text-center'>
                  <Button
                    disabled={Boolean(scores[item.id])}
                    loading={isLoading[item.id]}
                    loadingText='Revisando...'
                    onClick={async (event) => {
                      event.stopPropagation()
                      await handleClick(item.id)
                    }}
                    size='xs' variant='secondary' color='gray'
                  >
                    Revisar oferta
                  </Button>
                </TableCell>
              </TableRow>

              {/* { score: (1 al 9), message: 'la oferta es muy buena....' } */}
              <Score {...scores[item.id]} />
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
