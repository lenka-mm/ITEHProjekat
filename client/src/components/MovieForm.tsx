

import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Button, Form, Ref } from 'semantic-ui-react'
import { Movie, MovieDTO, Genre } from '../model'
import { setDropDownState, setInputState } from '../util';

interface Props {
    movie?: Movie,
    onSubmit: (movie: any) => Promise<void>,
    delete?: () => Promise<void>
    genres: Genre[],
}

export default function MovieForm(props: Props) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [genreId, setGenreId] = useState(0);
    const [plot, setPlot] = useState('')
    const imageRef = useRef<HTMLDivElement>(null);
    const fileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTitle(props.movie?.title || '')
        setPrice(props.movie ? props.movie.price + '' : '');
        setGenreId(props.movie?.genre.id || 0);
        setPlot(props.movie?.plot || '');

    }, [props.movie])

    return (
        <>
            <Form onSubmit={() => {
                if (props.movie) {
                    props.onSubmit({
                        price: Number(price),
                        title,
                        plot,
                        genreId
                    } as MovieDTO)
                    return;
                }
                const data = new FormData();
                data.append('price', price)
                data.append('title', title)
                data.append('plot', plot)
                data.append('genreId', genreId + '')
                if (!imageRef.current) {

                    return;
                }
                const fileElement = fileRef.current?.lastChild?.lastChild as HTMLInputElement;

                if (!fileElement.files) {
                    return;
                }
                const imageElement = imageRef.current?.lastChild?.lastChild as HTMLInputElement;

                if (!imageElement.files) {
                    return;
                }
                if (fileElement.files.length > 0)
                    data.append('file', fileElement.files[0]);

                data.append('image', imageElement.files[0]);
                props.onSubmit(data);
            }}>
                <Form.Input required value={title} onChange={setInputState(setTitle)} label='Title' />
                <Form.Input required value={price} onChange={setInputState(setPrice)} label='Price' type='number' />


                {
                    !props.movie && (
                        <>
                            <Ref innerRef={imageRef}>
                                <Form.Input required label='Image' type='file' />
                            </Ref>
                            <Ref innerRef={fileRef}>
                                <Form.Input label='Movie' type='file' />
                            </Ref>
                        </>
                    )
                }

                <Form.Dropdown value={genreId} onChange={setDropDownState(setGenreId)} selection label='Genre' clearable options={props.genres.map(element => {
                    return {
                        key: element.id,
                        value: element.id,
                        text: element.name
                    }
                })} />
                <Form.TextArea required value={plot} onChange={setInputState(setPlot)} label='Plot' />
                <Form.Button fluid>Sacuvaj</Form.Button>
            </Form>
            {
                props.movie && (
                    <Button className='marginButton' fluid negative onClick={() => {
                        if (props.delete) {
                            props.delete();
                        }
                    }}>Delete</Button>
                )
            }
        </>
    )
}
