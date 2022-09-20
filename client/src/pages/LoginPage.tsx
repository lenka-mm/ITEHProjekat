import React, { useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Button, Form, Header, Segment } from 'semantic-ui-react'
import { setInputState } from '../util';

interface Props {
    onSubmit: (email: string, password: string) => void
}

export default withRouter(function LoginPage(props: Props & RouteComponentProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (

        <Segment>
            <Header textAlign='center'>Login page</Header>
            <Form onSubmit={() => {
                props.onSubmit(email, password);
            }} >
                <Form.Input value={email} onChange={setInputState(setEmail)} label='Email' required />
                <Form.Input value={password} onChange={setInputState(setPassword)} label='Password' required />
                <Form.Button fluid primary>Login</Form.Button>
            </Form>
            <div className='marginTop'>
                <Button fluid onClick={() => {
                    props.history.push('/register')
                }}>No account?</Button>
            </div>
        </Segment>
    )
}
)