
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
interface Props {
    active: boolean,
    children: React.ReactNode,
    path: string,
    redirect?: string
}

export default function ConditionalRoute(props: Props) {

    return (
        <Route path={props.path} >
            {
                props.active ? (
                    props.children
                ) : (
                    <Redirect to={props.redirect || ''} />
                )
            }
        </Route>
    )
}
