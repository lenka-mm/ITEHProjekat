

import React, { useState } from 'react'
import { Header } from 'semantic-ui-react'
import { Movie, MovieDTO, Genre } from '../model'
import { onRowClick } from '../util'
import MovieForm from './MovieForm'
import MovieTable from './MovieTable'

interface Props {
    movies: Movie[],
    genres: Genre[],
    update: (movie: MovieDTO, id: number) => Promise<void>,
    create: (data: FormData) => Promise<void>,
    delete: (id: number) => Promise<void>
}

export default function MovieDashboard(props: Props) {
    const [activeMovieId, setActiveMovieId] = useState(0)


    return (
        <div>
            <MovieTable active={activeMovieId} onRowClick={onRowClick(setActiveMovieId)} movies={props.movies} />
            <Header textAlign='center'>
                {
                    activeMovieId === 0 ? 'Create movie' : 'Update movie'
                }
            </Header>
            <MovieForm
                delete={async () => {
                    await props.delete(activeMovieId)
                    setActiveMovieId(0);
                }}
                onSubmit={async (data) => {
                    if (activeMovieId === 0) {
                        props.create(data)
                    } else {
                        props.update(data, activeMovieId).then(() => {
                            setActiveMovieId(0);
                        })
                    }
                }} movie={props.movies.find(e => e.id === activeMovieId)}
                genres={props.genres} />
        </div>
    )
}
