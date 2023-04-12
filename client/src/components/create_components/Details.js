import React from 'react'
import styled from 'styled-components'
import { useState, useContext, useEffect } from 'react'

const Details = ({dreamData, setDreamData}) => {
    const [charData, setCharData] = useState(() =>{
        return dreamData["charData"] && Object.keys(dreamData["charData"]).length > 0 
                ? dreamData["charData"]
                : {}
    })

    const handleChange = (char, valueId, value) => {
        setCharData({...charData, [char]:{...charData[char], [valueId]:value}})
    }

    const addChar = () => {
        setCharData({...charData, [`char-${Object.keys(charData).length}`]:{}})
    }

    useEffect(()=>{
        setDreamData({...dreamData, charData})
        return () => {
            
        }
    },[charData])

    const render = (charObj) => {
        return Object.keys(charObj).map((key, i) => {
            return (
                <CharDiv key={`key-${i}`}>
                    <NameDiv>
                        <NameLabel htmlFor={`name-${i}`}>Name: </NameLabel>
                        <NameInput
                        id={`name-${i}`}
                        data-char={key}
                        data-key ={"name"}
                        value={charObj[key]["name"]}
                        onChange={(e) => handleChange(e.target.dataset.char, e.target.dataset.key, e.target.value)}/>
                    </NameDiv>
                    <CharDetails>
                        <CharLabel htmlFor={`details-${i}`}>Details: </CharLabel>
                        <CharTextarea
                        id={`details-${i}`}
                        data-char={key}
                        data-key ={"details"}
                        value={charObj[key]["details"]}
                        onChange={(e) => handleChange(e.target.dataset.char, e.target.dataset.key, e.target.value)}/>
                    </CharDetails>
                    <CharImage>
                        <ImgLabel htmlFor={`img-${i}`}>Image URL: </ImgLabel>
                        <ImgInput
                        id={`img-${i}`}
                        data-char={key}
                        data-key ={"img"}
                        value={charObj[key]["img"]}
                        onChange={(e) => handleChange(e.target.dataset.char, e.target.dataset.key, e.target.value)}/>
                    </CharImage>
                </CharDiv>
            )
        })
    }
    
    return (
        <Wrapper>
            <Div>
                <Text>Add Details About the Characters and Places in your Dream!</Text>
            </Div>
            <CharactersDiv>
                { dreamData["charData"] && Object.keys(dreamData["charData"]).length > 0 && render(dreamData["charData"])}
                <AddCharDiv onClick={addChar}><AddDiv>+</AddDiv></AddCharDiv>
            </CharactersDiv>
        </Wrapper>
    )
}

const Div = styled.div`
    display: flex;
    justify-content: center;
`

const Text = styled.div`
    font-size: 24px;
`

const ImgInput = styled.input`

`

const ImgLabel = styled.label`
`

const CharImage = styled.div`
    display: flex;
    flex-direction: column;
`

const CharTextarea = styled.textarea`
    resize: none;
    height: 120px;
    font-size: 16px;
    font-family: 'Walter Turncoat', cursive;
`

const CharLabel = styled.label`
`

const CharDetails = styled.div`
    display: flex;
    flex-direction: column;
`

const NameInput = styled.input`
font-size: 16px;
    font-family: 'Walter Turncoat', cursive;
`

const NameLabel = styled.label`
`

const NameDiv = styled.div`
    display: flex;
    flex-direction: column;
`

const CharDiv = styled.div`
display: flex;
flex-direction: column;
padding: 10px;
row-gap: 15px;
border: 2px solid white;
border-radius: 10px;
height: 280px;
`

const AddCharDiv = styled.div`
    background-color: #242424;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px dashed white;
    border-radius: 10px;
    height: 300px;
    cursor: pointer;

    &:hover{
        background-color: #363535;
    }
`

const AddDiv = styled.div`

`

const CharactersDiv = styled.div`
display: grid;
grid-template-columns: repeat( 3, 380px);
grid-template-rows: 300px;
column-gap: 10px;
row-gap: 10px;
margin-top: 20px;
height: 800px;
`

const Wrapper = styled.div`
    overflow-y: scroll;
`

export default Details