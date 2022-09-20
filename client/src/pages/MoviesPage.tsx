

import React, { useState } from 'react';
import { Form, Grid, Header, Pagination } from 'semantic-ui-react';
import MovieCard from '../components/MovieCard';
import { Movie, Genre } from '../model';
import { setDropDownState, setInputState } from '../util';

interface Props {
    movies: Movie[],
    genres: Genre[],
}

export default function Movies(props: Props) {
    const [title, setTitle] = useState('');
    const [genres, setGenres] = useState<number[]>([]);
    const [activePage, setActivePage] = useState(1);
    const validMovie = (movie: Movie) => {
        return movie.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()) && (genres.length === 0 || genres.includes(movie.genre.id))
    }
    const filteredMovies = props.movies.filter(validMovie);
    return (
        <div>
            <br />

            <Header textAlign='center' >
                <h1 className='marginBottom-very'>Search movies</h1>
            </Header>
            <Grid container columns='16' className='marginTop-very'>
                <Grid.Row>
                    <Grid.Column width='4'>

                        <Header>Filter</Header>
                        <Form>
                            <Form.Input value={title} onChange={setInputState(setTitle)} label='Title' />
                            <Form.Dropdown
                                value={genres}
                                onChange={setDropDownState(setGenres)}
                                selection
                                label='Genre'
                                clearable
                                multiple
                                options={props.genres.map(element => {
                                    return {
                                        key: element.id,
                                        value: element.id,
                                        text: element.name
                                    }
                                })}
                            />

                        </Form>

                    </Grid.Column>
                    <Grid.Column width='1'>

                    </Grid.Column>
                    <Grid.Column width='10'>
                        {
                            filteredMovies.length === 0 ? (
                                <Header textAlign='center'>
                                    No result
                                </Header>
                            ) : (
                                <Grid >
                                    {
                                        filteredMovies.slice((activePage - 1) * 4, activePage * 4).map(element => {
                                            return (
                                                <MovieCard key={element.id} movie={element} />
                                            )
                                        })
                                    }
                                    <Grid.Row>
                                        {
                                            filteredMovies.length > 4 && (
                                                <Pagination
                                                    totalPages={Math.ceil(filteredMovies.length / 4)}
                                                    activePage={activePage}
                                                    onPageChange={(e, data) => {
                                                        setActivePage(Number(data.activePage))
                                                    }}
                                                />
                                            )
                                        }
                                    </Grid.Row>
                                </Grid>
                            )
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
