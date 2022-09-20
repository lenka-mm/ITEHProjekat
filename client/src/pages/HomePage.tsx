
import React from 'react'
import { Container, Grid, Header, Segment } from 'semantic-ui-react'
import MovieCard from '../components/MovieCard'
import { Movie } from '../model'


interface Props {
    movies: Movie[]
}

export default function HomePage(props: Props) {
    return (
        <div >
            <div className='pocetnaSlika'>

            </div>
            <Container className='marginTop-very '>
                <Header textAlign='center'>
                    <h1>Welcome</h1>
                </Header>
                <Segment basic className='marginTop-very '>
                    <Header textAlign='center'>
                        <h3>Recommened movies</h3>
                        <br />
                    </Header>
                    <Grid columns='16'>
                        {
                            props.movies.map(element => {
                                return (
                                    <MovieCard movie={element} key={element.id} />
                                )
                            })
                        }
                    </Grid>
                </Segment>
                <br />
                <br />
            </Container>
        </div>
    )
}
