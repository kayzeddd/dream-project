import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useEffect } from "react";

import React from 'react'

const LoginBtn = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();


  return (
    !isAuthenticated && (
        <Button onClick={() => loginWithRedirect()}>
            Sign In
        </Button>
    )
  )
}

const Button = styled.button`
      color: white;
  background-color: transparent;
  border: 2px solid white;
  border-radius: 5px;
  font-size: 18px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover{
        background-color:#404040;
    }
`

export default LoginBtn