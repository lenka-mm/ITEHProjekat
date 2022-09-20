import axios from "axios";
import { Order } from "../model";
import { SERVER } from "../util";
axios.defaults.withCredentials = true;

export interface OrderDTO {
    address: string,
    phone: string,
    items: {
        movieId: number,
        amount: number
    }[]
}

export async function createOrderService(order: Order) {
    await axios.post(SERVER + '/order', {
        address: order.address,
        phone: order.phone,
        items: order.items.map(item => {
            return {
                movieId: item.movie.id,
                amount: item.amount
            }
        })
    } as OrderDTO);
}
export async function checkSent(id: number) {
    await axios.patch(SERVER + '/korpa/' + id);

}