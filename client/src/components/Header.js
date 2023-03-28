import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import styled from 'styled-components'
import LoginBtn from './login_components/LoginBtn'
import LogoutBtn from './login_components/LogoutBtn'

const Header = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        <Wrapper>
            {user &&
            <User>
                <UserImg/>
                <Username>{user.nickname ? user.nickname : user.name}</Username>
            </User>}
            <LoginBtn/>
            <LogoutBtn/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
`

const User = styled.div`
`

const UserImg = styled.img`
`

const Username = styled.div`
`


export default Header