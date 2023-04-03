import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import anon from "../images/anon-profile.png"

const Character = ({ charData }) => {
    return (
        <Wrapper>
            <NameDiv>{charData.name}</NameDiv>
            <Img src={charData.img ? charData.img : anon}/>
            <Description>{charData.details}</Description>
        </Wrapper>
    )
}

const Description = styled.div`
`

const Img = styled.img`
    height: 200px;
    width: auto;
`

const NameDiv = styled.div`
`

const Wrapper = styled.div`
    width: 210px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 2px solid white;
`

export default Character