import React from 'react'
import styled from 'styled-components'
import { useState, useContext, useEffect } from 'react'

const Dream = ({dreamData, setDreamData}) => {
    const [storyData, setStoryData] = useState(() =>{
        return dreamData["storyData"] && Object.keys(dreamData["storyData"]).length > 0 
                ? dreamData["storyData"]
                : {}
    })

    const handleChange = (id, value) => {
        setStoryData({...storyData, [id]: value})
        
    }

    const handleDream = (id, value) => {
        setStoryData({...storyData, [id]: value.split("\n")})
        
    }

    useEffect(()=>{
        setDreamData({...dreamData, storyData})
        return () => {
            
        }
    },[storyData])

    return (
        <Wrapper>
            <NameDiv>
                <NameLabel for="name">Name of Dream:</NameLabel>
                <NameInput 
                type="text" 
                id="name"
                onChange={(e) => handleChange(e.target.id,e.target.value)}
                value={storyData["name"] ? storyData["name"] : "" }
                />
            </NameDiv>
            <TextDiv>
                <TextLabel for="dream">Dream Description:</TextLabel>
                <TextInput 
                type="text" 
                id="dream"
                onChange={(e) => handleDream(e.target.id,e.target.value)}
                value={storyData["dream"] ? storyData["dream"] : "" }
                />
            </TextDiv>
        </Wrapper>
    )
}

const TextDiv = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`

const TextLabel = styled.label`
`

const TextInput = styled.textarea`
    overflow-y: scroll;
    flex: 1;
    resize: none;
    font-size: 18px;
    font-family: 'Walter Turncoat', cursive;
`

const NameDiv = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`

const NameLabel = styled.label`
`

const NameInput = styled.input`
    font-size: 18px;
    font-family: 'Walter Turncoat', cursive;
`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
flex: 1;
row-gap: 20px;
`

export default Dream