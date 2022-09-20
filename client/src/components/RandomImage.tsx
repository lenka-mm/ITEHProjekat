import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Button, Card, Container, Image } from 'semantic-ui-react';

export default function RandomImage() {

    const [url, setUrl] = useState('');
    const load = () => {
        axios.get('https://picsum.photos/1200/720', {
            withCredentials: false
        }).then(res => {
            setUrl(res.request.responseURL)
        })
    }
    useEffect(() => {
        load();
    }, [])


    if (url === '') {
        return null
    }
    return (

        <>
            <Image src={url} />
            <Button fluid className='marginButton' primary onClick={load}>New image</Button>

        </>

    )
}
