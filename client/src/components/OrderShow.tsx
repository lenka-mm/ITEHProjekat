

import React, { useState } from 'react';
import { Button, Header, Pagination, Segment, Table } from 'semantic-ui-react';
import { Order } from '../model';

interface Props {
    order: Order,
    checkSent: () => void
}

export default function OrderShow(props: Props) {
    const [activePage, setActivePage] = useState(1);

    return (
        <Segment>
            <Header textAlign='center'>
                <b>User</b>: {props.order.user.firstName + ' ' + props.order.user.lastName}
            </Header>
            <Header textAlign='center'>
                <b>Address</b>: {props.order.address}
            </Header>
            <Header textAlign='center'>
                <b>Phone</b>: {props.order.phone}
            </Header>
            <Header textAlign='center'>
                <b>Status</b>: {props.order.sent ? 'Sent' : 'Pending'}
            </Header>
            {
                !props.order.sent && (
                    <Button onClick={props.checkSent}>Send</Button>
                )
            }
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Movie</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Total</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        props.order.items.slice((activePage - 1) * 4, activePage * 4).map(element => {
                            return <Table.Row key={element.movie.id}>
                                <Table.Cell>{element.movie.title}</Table.Cell>
                                <Table.Cell>{element.price}</Table.Cell>
                                <Table.Cell>
                                    {element.amount}
                                </Table.Cell>
                                <Table.Cell>{element.amount * element.price}</Table.Cell>


                            </Table.Row>
                        })
                    }
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            <Pagination
                                totalPages={Math.ceil(props.order.items.length / 4)}
                                activePage={activePage}
                                onPageChange={(e, data) => {
                                    setActivePage(Number(data.activePage))
                                }}
                            />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Total
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            {props.order.items.reduce((acc, element) => {
                                return acc + element.amount * element.price
                            }, 0)}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Segment>
    )
}
