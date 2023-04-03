import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import Character from './Character'

const DreamDetails = () => {
    const {dreamId} = useParams();
    const [dreamData, setDreamData] = useState(null);
    const [allData, setAllData] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:8000/dream/${dreamId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setDreamData(data.dreamData)
            setAllData(data)
        })
        .catch(err => console.log(err))
    }, [])

    return(
        <Wrapper>
            Dream Details
            {dreamData &&
            <DreamDiv>
                <InfoDiv>
                    <AuthorDiv>
                        <Author>{allData.userId}</Author>
                        <AuthorImg src={allData.userData.picture}/>
                    </AuthorDiv>
                    <Date>{allData.date}</Date>
                </InfoDiv>
                <Title>{dreamData.storyData.name}</Title>
                <CharactersDiv>
                    {Object.keys(dreamData.detailsData).map( char => {
                        return <Character charData={dreamData.detailsData[char]}/>
                    })}
                </CharactersDiv>
                <DreamText>{dreamData.storyData.dream}</DreamText>
                <MeaningDiv>Interpretation/Meaning of dream: {dreamData.finalData.meaning}</MeaningDiv>
            </DreamDiv>}
        </Wrapper>
    )
}

const MeaningDiv = styled.div`
`

const Date = styled.div`
`

const Author = styled.div`
`

const AuthorImg = styled.img`
    height: 50px;
    width: auto;
`

const AuthorDiv = styled.div`
    display: flex;
`

const InfoDiv = styled.div`
    display: flex;
    flex-direction: column;
`

const DreamText = styled.div`
`

const DreamDiv = styled.div`
`

const CharactersDiv = styled.div`
    display: flex;
    overflow-x: scroll;
`

const Title = styled.div`
`

const Wrapper = styled.div`
`

export default DreamDetails