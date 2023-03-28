import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import styled from 'styled-components';

const LogoutBtn = () => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <Button onClick={() => logout()}>
                Sign Out
            </Button>
        )
    )
}

const Button = styled.button`
`

export default LogoutBtn