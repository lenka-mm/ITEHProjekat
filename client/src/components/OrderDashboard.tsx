

import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Movie, Order } from '../model';
import { checkSent } from '../service/orderService';
import OrderShow from './OrderShow';
import OrderTable from './OrderTable';

export default function OrderDashboard() {
    const [orders, setOrders] = useFetch<Order>('/order');
    const [activeOrder, setActiveOrder] = useState(-1);

    const order = (activeOrder === -1) ? undefined : orders[activeOrder];

    const onRowClick = (ind: number) => {
        setActiveOrder(prev => {
            if (prev === ind) {
                return -1;
            }
            return ind;
        })
    }

    const checkSentOrder = (id?: number) => {
        if (!id) {
            return;
        }
        checkSent(id).then(() => {
            setOrders(prev => {
                return prev.map(element => {
                    if (element.id === id) {
                        return {
                            ...element,
                            sent: true
                        }
                    }
                    return element;
                })
            })
        })
    }
    return (
        <div>
            <OrderTable orders={orders} activeIndex={activeOrder} onRowClick={onRowClick} />
            {
                activeOrder !== -1 && (
                    <OrderShow order={orders[activeOrder]} checkSent={() => {
                        checkSentOrder(order?.id);
                    }} />
                )
            }
        </div>
    )
}
