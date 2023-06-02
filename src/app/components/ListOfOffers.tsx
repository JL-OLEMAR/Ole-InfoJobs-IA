import { Badge, Button, Card, Flex, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from '@tremor/react'
import { Offer } from '../types'

export function ListOfOffers({ offers }: { offers: Offer[] }) {
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
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.province}</TableCell>
              <TableCell>{item.experienceMin}</TableCell>
              {/* <TableCell>{item.teleworking}</TableCell> */}
              <TableCell className='text-center'>
                <Button size='xs' variant='secondary' color='gray'>
                  Revisar oferta
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
