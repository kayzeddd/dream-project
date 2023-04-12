import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import styled from 'styled-components'
import LoginBtn from './login_components/LoginBtn'
import LogoutBtn from './login_components/LogoutBtn'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { GiDreamCatcher } from 'react-icons/gi'

const Header = () => {
    const { user, isAuthenticated } = useAuth0();

    useEffect(() => {
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
            .then(data => {
                // console.log(data)
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }, [user, isAuthenticated])
    
    return (
        <Wrapper>
            <LeftDiv>
                <LogoNameDiv to="/">
                    <DreamCatcher/>
                    <NameLink>OTHER WORLD</NameLink>
                </LogoNameDiv>
                <DreamLinks>
                    <CreateLink to="/all-dreams">Read Dreams</CreateLink>
                    {isAuthenticated && <CreateLink to="/create-dream">Create Dream</CreateLink>}
                </DreamLinks>
            </LeftDiv>
            {/* <MidDiv>
                <CreateLink to="/all-dreams">All Dreams</CreateLink>
                {isAuthenticated && <CreateLink to="/create-dream">Create Dream</CreateLink>}
            </MidDiv> */}
            <RightDiv>
                {!isAuthenticated &&
                    <MessageDiv>Sign in or Create an Account to Start Creating Dreams!</MessageDiv>
                }
                {user &&
                <User to="/user-profile">
                    <Username>Welcome <Bold>{user.nickname ? user.nickname : user.name}</Bold>!</Username>
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

const Bold = styled.span`
    font-weight: bold;
    text-decoration: underline;

`

const MessageDiv = styled.div`
    font-weight: 300;
`

const DreamLinks = styled.div`
margin-left: 80px;
`

const DreamCatcher = styled(GiDreamCatcher)`
    font-size: 50px;
`

const MidDiv = styled.div`
`

const LogoNameDiv = styled(Link)`
    display: flex;
    align-items: center;
    column-gap: 10px;
    padding: 5px 7px;
    border-radius: 5px;
    text-decoration: none;
    color: white;
    font-weight: bold;
    
    &:hover{
        background-color:#404040;
    }
`

const CreateLink = styled(Link)`
    color: white;
    text-decoration: none;
    padding: 20px 20px;
    border-radius: 5px;
    font-weight: bold;

    &:hover{
        background-color:#404040;
    }
`

const NameLink = styled.div`
    text-decoration: none;
    color: white;
    font-size: 25px;
`

const RightDiv = styled.div`
    display: flex;
    column-gap: 20px;
    align-items: center;
`

const LeftDiv = styled.div`
    display: flex;
    align-items: center;
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
    padding: 10px 50px;
    justify-content: space-between;
    font-size: 20px;
    background-color: #242424;
    border-bottom: 2px solid white;
    /* background-color: #21D4FD;
    background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%); */
`

const User = styled(Link)`
    flex: 1;
    display: flex;
    align-items: center;
    column-gap: 10px;
    color: white;
    text-decoration: none;
    padding: 10px 7px;
    border-radius: 5px;

    &:hover{
        background-color:#404040;
    }
`

const UserImg = styled.img`
    height: 36px;
    border-radius: 50%;
`

const Username = styled.div`
`


export default Header