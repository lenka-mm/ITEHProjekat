import React from 'react'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Legend, CartesianGrid } from 'recharts';
import { Container, Header } from 'semantic-ui-react'
import useFetch from '../hooks/useFetch'
import { Movie, Order } from '../model';

export default function StatisticsPage() {
  const [orders] = useFetch<Order>('/order');
  const [movies] = useFetch<Movie>('/movie');

  const data = movies.map(movie => {

    return {
      title: movie.title,
      total: orders.reduce((acc, order) => {
        return acc + order.items
          .filter(i => i.movie.id === movie.id)
          .reduce((accI, item) => accI + item.amount * item.price, 0)
      }, 0)
    }
  })

  return (
    <Container>
      <Header textAlign='center'>
        <h1>Dashboard</h1>
      </Header>
      <ResponsiveContainer
        width='100%'
        aspect={1.8}
      >
        <BarChart
          data={data}
        >
          <XAxis dataKey='title' />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Legend />
          <Bar dataKey='total' name='Total income' fill='#8884d8' />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  )
}
