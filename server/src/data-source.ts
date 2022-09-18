import "reflect-metadata"
import { DataSource } from "typeorm"
import { Genre } from "./entity/Genre"
import { Movie } from "./entity/Movie"
import { Order } from "./entity/Order"
import { OrderItem } from "./entity/OrderItem"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "cinema",
    logging: false,
    entities: [User, Genre, Movie, Order, OrderItem],
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
})
