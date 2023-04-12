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
    min-height: 140px;
    width: auto;
    flex: 0;
`

const NameDiv = styled.div`
    font-weight: bold;
`

const Wrapper = styled.div`
    min-width: 230px;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 5px;
    padding: 20px;
    border: 2px solid white;
`

export default Character