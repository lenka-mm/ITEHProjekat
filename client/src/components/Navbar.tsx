

import React from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { User } from '../model'

interface Props {
    user?: User,
    logout: () => Promise<void>
}

export default withRouter(function Navbar(props: Props & RouteComponentProps) {
    return (
        <Menu borderless fluid >
            <Menu.Item header>Cinema</Menu.Item>
            {
                props.user ? (
                    <>

                        <Menu.Item as={Link} to='/'>Home</Menu.Item>
                        <Menu.Item as={Link} to='/movie'>Explore movies</Menu.Item>
                        {
                            props.user.admin && (
                                <Menu.Item as={Link} to='/dashboard'>Dashboard</Menu.Item>
                            )
                        }
                        <Menu.Menu position='right'>
                            <Menu.Item as={Link} to='/cart' icon='cart' />
                            <Menu.Item onClick={() => {
                                props.logout().then(() => {
                                    props.history.push('/')
                                })
                            }}>Logout</Menu.Item>
                        </Menu.Menu>
                    </>
                ) : (
                    <Menu.Menu position='right'>
                        <Menu.Item as={Link} to='/login'>Login</Menu.Item>
                        <Menu.Item as={Link} to='/register'>Register</Menu.Item>
                    </Menu.Menu>
                )
            }


        </Menu>
    )
})
