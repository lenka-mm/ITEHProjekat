import React, { useState } from 'react';
import { Button, Form, Grid, Header, Input, Pagination, Table } from 'semantic-ui-react';
import { OrderItem } from '../model';
import { setInputState } from '../util';


interface Props {
    items: OrderItem[],
    removeItem: (id: number) => void,
    changeItem: (item: OrderItem, amount: number) => void,
    orderUp: (phone: string, address: string) => Promise<void>
}

export default function CartPage(props: Props) {
    const [activePage, setActivePage] = useState(1);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('')



    return (
        <Grid container columns='16'>
            <Grid.Row>
                <Grid.Column width='16'>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Movie</Table.HeaderCell>
                                <Table.HeaderCell>Price</Table.HeaderCell>
                                <Table.HeaderCell>Amount</Table.HeaderCell>
                                <Table.HeaderCell>Total</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                props.items.slice((activePage - 1) * 4, activePage * 4).map(element => {
                                    return (
                                        <Table.Row key={element.movie.id}>
                                            <Table.Cell>{element.movie.title}</Table.Cell>
                                            <Table.Cell>{element.price}</Table.Cell>
                                            <Table.Cell>
                                                <Input min='1' type='number' value={element.amount} onChange={(e) => {
                                                    const value = e.currentTarget.value;
                                                    props.changeItem(element, Number(value));
                                                }} />
                                            </Table.Cell>
                                            <Table.Cell>{element.amount * element.price}</Table.Cell>

                                            <Table.Cell>
                                                <Button negative icon='remove' onClick={() => {
                                                    props.removeItem(element.movie.id!)
                                                }} />
                                            </Table.Cell>
                                        </Table.Row>)
                                })
                            }
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='2'>
                                    <Pagination
                                        totalPages={Math.ceil(props.items.length / 4)}
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
                                    {props.items.reduce((acc, element) => {
                                        return acc + element.amount * element.price
                                    }, 0)}
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <Grid.Column width='10'>
                    <Header textAlign='center'>
                        <h3>
                            Please fill the data
                        </h3>
                    </Header>
                    <Form onSubmit={() => {
                        props.orderUp(phone, address).then(() => {
                            alert('You have successfully ordered movies')
                        })

                    }}>
                        <Form.Input required value={address} onChange={setInputState(setAddress)} label='Address' />
                        <Form.Input required value={phone} onChange={setInputState(setPhone)} label='Phone' />
                        <Form.Button disabled={props.items.length === 0} primary fluid >Order</Form.Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
