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
        console.log(charObj)
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
            <CharactersDiv>
                { dreamData["charData"] && Object.keys(dreamData["charData"]).length > 0 && render(dreamData["charData"])}
                <AddCharBtn onClick={addChar}>+</AddCharBtn>
            </CharactersDiv>
        </Wrapper>
    )
}
const ImgInput = styled.input`
`

const ImgLabel = styled.label`
`

const CharImage = styled.div`
`

const CharTextarea = styled.textarea`
`

const CharLabel = styled.label`
`

const CharDetails = styled.div`
`

const NameInput = styled.input`
`

const NameLabel = styled.label`
`

const NameDiv = styled.div`
`

const CharDiv = styled.div`
display: flex;
flex-direction: column;
padding: 5px;
border: 2px solid black;
`

const AddCharBtn = styled.button`
`

const CharactersDiv = styled.div`
`

const Wrapper = styled.div`
`

export default Details