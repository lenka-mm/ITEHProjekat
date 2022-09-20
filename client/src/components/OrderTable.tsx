

import React from 'react';
import { Table } from 'semantic-ui-react';
import { Order } from '../model';

interface Props {
    orders: Order[],
    activeIndex: number,
    onRowClick: (ind: number) => void
}

export default function OrderTable(props: Props) {
    return (
        <Table selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>USer</Table.HeaderCell>
                    <Table.HeaderCell>Address</Table.HeaderCell>
                    <Table.HeaderCell>Phone</Table.HeaderCell>
                    <Table.HeaderCell>Total</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    props.orders.map((element, index) => {
                        return (
                            <Table.Row key={element.id} active={index === props.activeIndex} onClick={() => {
                                props.onRowClick(index);
                            }}>
                                <Table.Cell>{element.id}</Table.Cell>
                                <Table.Cell>{element.user.firstName + ' ' + element.user.lastName}</Table.Cell>
                                <Table.Cell>{element.address}</Table.Cell>
                                <Table.Cell>{element.phone}</Table.Cell>
                                <Table.Cell>{element.items.reduce((acc, element) => {
                                    return acc + element.amount * element.price;
                                }, 0)}</Table.Cell>
                                <Table.Cell>{element.sent ? 'Sent' : 'Pending'}</Table.Cell>

                            </Table.Row>
                        )
                    })
                }
            </Table.Body>
        </Table>
    )
}
