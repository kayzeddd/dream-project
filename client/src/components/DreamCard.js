import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Dream from './create_components/Dream'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { TbTrashX } from 'react-icons/tb'
import { BsEyeFill } from 'react-icons/bs'
import { AiFillLike } from 'react-icons/ai'

const DreamCard = ({likeCount, deleteDream, date, userId, extraData, dreamData, charData, dreamId, viewCount}) => {
    const navigate = useNavigate();
    
    const wordCount = () =>{
        return dreamData.dream.join().split(" ").length
    }

    const formatDate = (d) => {
        return format(new Date(d), "p '·' LLL d y");
      }

    return(
        <WrapperLink
            onClick={ () => {
                navigate(`/dream/${dreamId}`)
            }}
        >
            <TopDiv>
                <Title>{dreamData.name}</Title>
                {deleteDream 
                ?<DeleteIcon onClick={(e) => {
                    e.stopPropagation()
                    deleteDream(dreamId)
                }}/>
                :<Author>Written by  
                    <AuthorLink onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/profile/${userId}`);
                    }}>{userId.split("@")[0]}</AuthorLink>
                </Author>}
            </TopDiv>
            <MidDiv>
                <Summary>Summary: {extraData.summary}</Summary>
                <TypeDiv>
                    <TypeP>Type of dream:</TypeP>
                    {extraData.checkedValues.map( type => {
                        return (
                            <Type>{type}</Type>
                        )
                    })}
                </TypeDiv>
            </MidDiv>
            <BotDiv>
                <ViewCount><ViewsIcon/> {viewCount}</ViewCount>
                <LikeCount><LikeIcon/> {likeCount}</LikeCount>
                <WordCount>word count: {wordCount()}</WordCount>
                <Time>{formatDate(date)}</Time>
            </BotDiv>
        </WrapperLink>
       
    )
}

const LikeIcon = styled(AiFillLike)`
    color: white;
    font-size: 20px;
`

const ViewsIcon = styled(BsEyeFill)`
    color: white;
    font-size: 20px;
`

const DeleteIcon = styled(TbTrashX)`
    font-size: 20px;
`

const LikeCount = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
`

const DeleteBtn = styled.button`
`

const ViewCount = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
`

const AuthorLink = styled.div`
    text-decoration: underline;
    margin-left: 8px;
    font-weight: bold;
    cursor: pointer;
`

const Summary = styled.div`
`
const Type = styled.div`
    margin-left: 5px;
    /* text-decoration: underline; */
    background-color: #ebebeb;
    color: black;
    padding: 0px 5px;
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

const Time = styled.div`
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
    font-size: 25px;
    font-weight: bold;
    text-decoration: underline;
`

const TopDiv = styled.div`
    display: flex;
    justify-content: space-between;
`

const WrapperLink = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 14px;
    padding: 20px 30px;
    border: 3px solid white;
    background-color: #242424;
    border-radius: 15px;
    cursor: pointer;
`


export default DreamCard