import React from 'react'
import { Table } from 'semantic-ui-react'
import { Movie } from '../model'
interface Props {
    movies: Movie[],
    active: number,
    onRowClick: (val: number) => void
}
export default function MovieTable(props: Props) {
    return (
        <Table selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Genre</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Plot</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    props.movies.map(element => {
                        return <Table.Row key={element.id} active={props.active === element.id} onClick={() => {
                            props.onRowClick(element.id || 0);
                        }} >
                            <Table.Cell>{element.title}</Table.Cell>
                            <Table.Cell>{element.genre.name}</Table.Cell>
                            <Table.Cell>{element.price}</Table.Cell>
                            <Table.Cell>{element.plot}</Table.Cell>
                        </Table.Row>
                    })
                }
            </Table.Body>
        </Table>
    )
}
