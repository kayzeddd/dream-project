import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Dream from './create_components/Dream'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const DreamCard = ({date, userId, extraData, dreamData, charData, dreamId}) => {
    const navigate = useNavigate();
    
    const wordCount = () =>{
        return dreamData.dream.split(" ").length
    }

    return(
        <WrapperLink
            onClick={ () => {
                navigate(`/dream/${dreamId}`)
            }}
        >
            <TopDiv>
                <Title>Name: {dreamData.name}</Title>
                <Author>Author:  
                    <AuthorLink onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/profile/${userId}`);
                    }}>{userId}</AuthorLink>
                </Author>
            </TopDiv>
            <MidDiv>
                <Summary>Summary: {extraData.summary}</Summary>
                <TypeDiv>
                    <TypeP>Type of dream:</TypeP>
                    {extraData.checkedValues.map( type => {
                        return (
                            <Type>{type},</Type>
                        )
                    })}
                </TypeDiv>
            </MidDiv>
            <BotDiv>
                <WordCount>word count: {wordCount()}</WordCount>
                <Date>{date}</Date>
            </BotDiv>
        </WrapperLink>
       
    )
}

const AuthorLink = styled.div`
`

const Summary = styled.div`
`
const Type = styled.div`
    margin-left: 5px;
`
const TypeDiv = styled.div`
display: flex;
`
const TypeP = styled.p`
`
const BotDiv = styled.div`
    display: flex;
    justify-content: space-between;
`
const WordCount = styled.div`
`

const Date = styled.div`
`

const MidDiv = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`

const Author = styled.div`
    display: flex;
`

const Title = styled.div`
`

const TopDiv = styled.div`
    display: flex;
    justify-content: space-between;
`

const WrapperLink = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding: 20px 30px;
    border: 2px solid white;
`


export default DreamCard