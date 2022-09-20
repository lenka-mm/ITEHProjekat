export interface Movie {
    id?: number,
    title: string,
    plot: string,
    url?: string,
    image: string,
    genre: Genre,
    price: number,
}

export interface Genre {
    id: number,
    name: string,
}
export interface User {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    admin: boolean,

}
export interface Order {
    id?: number,
    user: User,
    sent: boolean,
    address: string,
    phone: string,
    items: OrderItem[]
}
export interface OrderItem {
    id?: number,
    movie: Movie,
    price: number,
    amount: number
}
export interface MovieDTO {

    title: string,
    plot: string,
    url?: string,
    image?: string,
    genreId: number,
    price: number,
}