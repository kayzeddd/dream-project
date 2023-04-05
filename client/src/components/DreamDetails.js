import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import Character from './Character'

const DreamDetails = () => {
    const {dreamId} = useParams();
    const [dreamData, setDreamData] = useState(null);
    const [allData, setAllData] = useState(null);
    const [comment, setComment] = useState("");
    const [reload, setReload] = useState(true)

    useEffect(() => {
        getData()
    }, [reload, dreamId])

    const getData = () => {
        fetch(`http://localhost:8000/dream/${dreamId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setDreamData(data.dreamData)
            setAllData(data)
        })
        .catch(err => console.log(err))
    }

    const postComment = () =>{
        fetch("http://localhost:8000/add-comment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              dreamId, userData: allData.userData, comment
            }),
          })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            setComment("")
            getData()
            })
          .catch(err => console.log(err))
    }

    return(
        <Wrapper>
            Dream Details
            {dreamData && allData &&
            <>
                <DreamDiv>
                    <InfoDiv>
                        <AuthorDiv>
                            <Author>{allData.userId}</Author>
                            {/* <AuthorImg src={allData.userData.picture}/> */}
                            <AuthorImg src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}/>
                        </AuthorDiv>
                        <Date>{allData.date}</Date>
                    </InfoDiv>
                    <Title>{dreamData.storyData.name}</Title>
                    <CharactersDiv>
                        {Object.keys(dreamData.charData).map( char => {
                            return <Character charData={dreamData.charData[char]}/>
                        })}
                    </CharactersDiv>
                    <DreamText>{dreamData.storyData.dream}</DreamText>
                    <MeaningDiv>Interpretation/Meaning of dream: {dreamData.finalData.meaning}</MeaningDiv>
                </DreamDiv>
                <CommentsDiv>
                <div>Add a Comment:</div>
                    <AddCommentDiv>
                        <CommentTextarea onChange={(e) => {
                            setComment(e.target.value)
                        }} value={comment}></CommentTextarea>
                        <PostBtn onClick={postComment}>Add Comment</PostBtn>
                    </AddCommentDiv>
                    {allData.commentsArr.map(comment => {
                        return (
                            <CommentDiv>
                                <CommentAuthor>{comment.userData.nickname}</CommentAuthor>
                                <Comment>{comment.comment}</Comment>
                            </CommentDiv>
                        )
                    })}
                </CommentsDiv>
            </>
            }
        </Wrapper>
    )
}

const CommentAuthor = styled.div`
`

const CommentDiv = styled.div`
`

const PostBtn = styled.button`
    align-self: flex-end;
`

const CommentTextarea = styled.textarea`
    resize: none;
    height: 140px;
    border: none;

    &:focus{
        outline: none;
    }
`

const AddCommentDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 900px;
    background-color: white;
`

const Comment = styled.div`
`

const CommentsDiv = styled.div`
    display: flex;
    flex-direction: column;
`

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