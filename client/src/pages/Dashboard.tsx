import React from 'react'
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router'
import { Grid, Header } from 'semantic-ui-react'
import DashboardMenu from '../components/DashboardMenu'
import MovieDashboard from '../components/MovieDashboard'
import OrderDashboard from '../components/OrderDashboard'
import RandomImage from '../components/RandomImage'
import { Movie, MovieDTO, Genre } from '../model'
import StatisticsPage from './StatisticsPage'

interface Props {
    movies: Movie[],
    genres: Genre[],
    update: (movie: MovieDTO, id: number) => Promise<void>,
    create: (data: FormData) => Promise<void>,
    delete: (id: number) => Promise<void>
}

export default withRouter(function Dashboard(props: Props & RouteComponentProps) {
    return (
        <Grid columns='16' padded>
            <Grid.Column width='2'>
                <DashboardMenu />
            </Grid.Column>
            <Grid.Column width='13'>
                <Switch>
                    <Route path={`${props.match.path}/movie`}>
                        <MovieDashboard create={props.create} update={props.update} delete={props.delete} genres={props.genres} movies={props.movies} />
                    </Route>
                    <Route path={`${props.match.path}/order`}>
                        <OrderDashboard />
                    </Route>
                    <Route path={`${props.match.path}/image`}>
                        <RandomImage />
                    </Route>
                    <Route path={`${props.match.path}/`}>
                        <StatisticsPage />
                    </Route>
                </Switch>
            </Grid.Column>
        </Grid>
    )
}
)