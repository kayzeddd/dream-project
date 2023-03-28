import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

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
`

export default LoginBtn