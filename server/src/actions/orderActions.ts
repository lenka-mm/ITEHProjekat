import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Movie } from "../entity/Movie";
import { Order } from "../entity/Order";
import { OrderItem } from "../entity/OrderItem";




export async function getAllOrders(req: Request, res: Response) {
  res.json(await AppDataSource.getRepository(Order).find({
    relations: {
      user: true,
      items: {
        movie: {
          genre: true
        }
      }
    }
  }))
}


export interface OrderDTO {
  phone: string,
  address: string,
  items: {
    movieId: number,
    amount: number
  }[]
}


export async function createOrder(req: Request, res: Response) {
  const data = req.body as OrderDTO;
  const user = (req as any).user;
  await AppDataSource.transaction(async manager => {
    const order = await manager.save(Order, {
      phone: data.phone,
      address: data.address,
      user,
      sent: false,
      items: []
    })

    for (let item of data.items) {
      const movie = await manager.findOne(Movie, { where: { id: item.movieId } });
      await manager.save(OrderItem, {
        movie,
        amount: item.amount,
        order
      })
    }
  });
  res.sendStatus(204);
}

export async function sendOrder(req: Request, res: Response) {
  const id = Number(req.params.id)
  await AppDataSource.getRepository(Order).update(id, { sent: true });
  res.sendStatus(204);
}