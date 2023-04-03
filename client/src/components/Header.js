import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import styled from 'styled-components'
import LoginBtn from './login_components/LoginBtn'
import LogoutBtn from './login_components/LogoutBtn'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Header = () => {
    const { user, isAuthenticated } = useAuth0();

    useEffect(() => {
        console.log(user)
        if(user){
          fetch(`http://localhost:8000/add-user`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "content-Type": "application/json",
            },
            body: JSON.stringify({userId: user.email, userData: user})
          })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch((error) => {
              console.log(error);
            });
        }
      }, [user, isAuthenticated])
    
    return (
        <Wrapper>
            <LeftDiv>
                <NameLink to="/">OTHER WORLD</NameLink>
                <CreateLink to="/all-dreams">All Dreams</CreateLink>
                <CreateLink to="/create-dream">Create Dream</CreateLink>
            </LeftDiv>
            <RightDiv>
                {user &&
                <User to="/user-profile">
                    <Username>Welcome {user.nickname ? user.nickname : user.name}!</Username>
                    <UserImg src={user.picture}/>
                </User>}
                <Login>
                    {!isAuthenticated && <LoginBtn/>}
                    {isAuthenticated && <LogoutBtn/>}
                </Login>
            </RightDiv>
        </Wrapper>
    )
}
const CreateLink = styled(Link)`
    color: white;
    text-decoration: none;
    margin-left: 20px;
`

const NameLink = styled(Link)`
    text-decoration: none;
    color: white;
`

const RightDiv = styled.div`
    display: flex;
`

const LeftDiv = styled.div`
`

const Login = styled.div`
    margin-left: 10px;
    display: flex;
    align-items: center;
`

const Wrapper = styled.div`
    position: relative;
    min-height: 50px;
    max-height: 50px;
    display: flex;
    align-items: center;
    padding: 5px;
    justify-content: space-between;
    /* background-color: #21D4FD;
    background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%); */
`

const User = styled(Link)`
    display: flex;
    align-items: center;
    column-gap: 10px;
    color: white;
    text-decoration: none;
`

const UserImg = styled.img`
    height: 36px;
    border-radius: 50%;
`

const Username = styled.div`
`


export default Header