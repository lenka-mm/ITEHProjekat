

import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Card, Grid, Header, Image } from 'semantic-ui-react'
import { Movie } from '../model'
import { SERVER } from '../util'
interface Props {
    movie: Movie
}
export default withRouter(function MovieCard(props: Props & RouteComponentProps) {
    return (

        <Grid.Row as={Card} link onClick={() => {
            props.history.push(`/movie/${props.movie.id}`)
        }}>
            <Grid.Column width='4'>
                <Image src={`${props.movie.image}`} fluid />
            </Grid.Column>
            <Grid.Column verticalAlign='middle' width='6'>
                <Header>{props.movie.title}</Header>
                <span>Genre: {props.movie.genre.name}</span>
            </Grid.Column>
        </Grid.Row>

    )
}
)