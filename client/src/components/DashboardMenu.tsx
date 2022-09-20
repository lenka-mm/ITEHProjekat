import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

export default function DashboardMenu() {
    return (
        <Menu vertical borderless fluid secondary>
            <Menu.Item header>Menu</Menu.Item>
            <Menu.Item as={Link} to='/dashboard'>Dashboard</Menu.Item>
            <Menu.Item as={Link} to='/dashboard/movie'>Movies</Menu.Item>
            <Menu.Item as={Link} to='/dashboard/order'>Orders</Menu.Item>
            <Menu.Item as={Link} to='/dashboard/image'>Random image</Menu.Item>
        </Menu>
    )
}
