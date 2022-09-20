

import React from 'react'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import { Button, Container, Embed, Grid, Header, Image } from 'semantic-ui-react';
import { Movie } from '../model'
import { SERVER } from '../util';

interface Props {
    getMovie: (id: number) => Movie | undefined,
    addToOrder: (id: number) => void

}

export default withRouter(function MovieShow(props: Props & RouteComponentProps) {
    const id = Number((props.match.params as any).id);
    const movie = props.getMovie(id);
    if (!movie) {
        return <Redirect to='/' />
    }
    return (
        <div
            style={{
                overflowY: 'auto',
                backgroundImage: `url(${movie.image})`,
                backgroundSize: 'contain'
            }}
        >
            <Container
                style={{ backgroundColor: 'white' }}
            >
                {
                    movie.url && (
                        <Embed active url={movie.url} />
                    )
                }
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Header textAlign='center'>
                        <h1>{movie.title}</h1>

                    </Header>
                    <p>
                        {`Genre: ${movie.genre.name}`}
                    </p>
                    <p>
                        Price: {movie.price}
                    </p>
                    <Header>
                        <h3>Plot</h3>
                    </Header>
                    <p>
                        {movie.plot}
                    </p>
                    <Button color='vk' onClick={() => {
                        props.addToOrder(id)
                    }}>Add to cart</Button>

                </div>
            </Container>
        </div >
    )
}
)