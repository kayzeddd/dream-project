import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import Character from './Character'
import { useAuth0 } from '@auth0/auth0-react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

const DreamDetails = () => {
    const {dreamId} = useParams();
    const [dreamData, setDreamData] = useState(null);
    const [allData, setAllData] = useState(null);
    const [comment, setComment] = useState("");
    const [liked, setLiked] = useState(null)
    const { user, isAuthenticated } = useAuth0();

    useEffect(() => {
        if(dreamId){getData()}
    }, [dreamId])

    const formatDate = (d) => {
        return format(new Date(d), "p '·' LLL d y");
      }

    const getData = () => {
        fetch(`http://localhost:8000/dream/${dreamId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user ? user.email : null
            }),
          })
        .then(res => res.json())
        .then(data => {
            setDreamData(data.dreamData)
            setAllData(data)
            if(user && !data.likesArr.includes(user.email)){
                setLiked(false)
            }
            else if(user){
                setLiked(true)
            }
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
              dreamId, userData: user, comment
            }),
          })
          .then(res => res.json())
          .then(data => {
            setComment("")
            getData()
            })
          .catch(err => console.log(err))
    }
    
    const saveDream = () => {
        fetch("http://localhost:8000/save-dream", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              dreamId, userData: user
            }),
          })
          .then(res => res.json())
          .then(data => {
                // console.log(data)
            })
          .catch(err => console.log(err))
    }

    const handleLike = () => {
        console.log(dreamId, user.email)
        fetch("http://localhost:8000/like-dream", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              dreamId, userId: user.email
            }),
          })
          .then(res => res.json())
          .then(data => {
            getData()
          })
          .catch(err => console.log(err))
    }

    return(
        <Wrapper>
            <InnerWrapper>
                {dreamData && allData && user &&
                <>
                    <DreamDiv>
                        {/* <Wrapper1> */}
                            <InfoDiv>
                                <Title>{dreamData.storyData.name}</Title>
                                <AuthorDiv>
                                    <AuthorLink to={`/profile/${allData.userData.email}`}>Written by: <Bold>{allData.userData.nickname}</Bold></AuthorLink>
                                    {/* <AuthorImg src={allData.userData.picture}/> */}
                                    <AuthorImg src={user.nickname === allData.userData.nickname ? user.picture : allData.userData.picture}/>
                                </AuthorDiv>
                                <LikeViewDiv>
                                    <LikeDiv>Likes:<Bold> {allData.likesArr.length}</Bold></LikeDiv>
                                    <ViewDiv>Views: <Bold>{allData.viewerArr.length}</Bold></ViewDiv>
                                </LikeViewDiv>
                                <Time>{formatDate(allData.date)}</Time>
                            </InfoDiv>
                            <Text>Characters and places:</Text>
                            <CharactersDiv>
                                {Object.keys(dreamData.charData).map( char => {
                                    return <Character charData={dreamData.charData[char]}/>
                                })}
                            </CharactersDiv>
                        {/* </Wrapper1> */}
                        <DreamWrapper>
                            <DreamText>{dreamData.storyData.dream.map( para => {
                                return <DreamPara>{para}</DreamPara>
                            })}</DreamText>
                        </DreamWrapper>
                        <MeaningDiv><MeaningText>Meaning behind dream: </MeaningText>{dreamData.finalData.meaning}</MeaningDiv>
                        <LineDiv>
                            <Line></Line>
                        </LineDiv>
                    </DreamDiv>
                    {isAuthenticated &&
                        <UserLoggedInDiv>
                            <LikeSaveDiv>
                                {liked !== null && <LikeBtn onClick={handleLike}>{liked ? "Unlike" : "Like Dream!"}</LikeBtn>}
                                <SaveDreamBtn onClick={saveDream}>Save Dream!</SaveDreamBtn>
                            </LikeSaveDiv>
                            <AddCommentDiv>
                                <CommentText>Add a Comment:</CommentText>
                                <CommentTextarea onChange={(e) => {
                                    setComment(e.target.value)
                                }} value={comment}></CommentTextarea>
                                <PostBtn disabled={comment === ""? true : false} onClick={postComment}>Post Comment!</PostBtn>
                            </AddCommentDiv>
                        </UserLoggedInDiv>}
                    <CommentsDiv>
                        <CommentsBold>All Comments:</CommentsBold>
                        <Container>
                            <CommentsWrapper>
                                {allData.commentsArr.map(comment => {
                                    return (
                                        <CommentDiv>
                                            <Comment>"{comment.comment}"</Comment>
                                            <CommentAuthor>-{comment.userData.nickname}</CommentAuthor>
                                        </CommentDiv>
                                    )
                                })}
                            </CommentsWrapper>
                        </Container>
                    </CommentsDiv>
                </>
                }
            </InnerWrapper>
        </Wrapper>
    )
}

const LineDiv = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0px;
`

const Line = styled.div`
    border-top: 3px solid white;
    border-radius: 20px;
    width: 600px;
`

const Text = styled.div`
    margin-top: 30px;
    font-weight: bold;
    text-align: center;
    font-size: 20px;
`

const Wrapper1 = styled.div`
    display: flex;
    justify-content: space-between;
`

const UserLoggedInDiv = styled.div`
`

const ViewDiv = styled.div`
`

const LikeDiv = styled.div`
`

const LikeViewDiv = styled.div`
    display: flex;
    column-gap: 20px;
`

const DreamPara = styled.div`
`

const InnerWrapper = styled.div`
    width: 950px;
    background-color: #242424;
    padding: 40px 50px;
    border: 3px solid white;
    margin-top: 10px;
    border-radius: 10px;
`

const LikeBtn = styled.button`
    font-size: 20px;
    font-weight: bold;
    padding: 7px 16px;
    background-color: #ebebeb;
    color: black;
    border: 3px solid black;
    border-radius: 10px;
    cursor: pointer;

    &:hover{
        background-color: white;
    }
`

const SaveDreamBtn = styled.button`
    font-size: 20px;
    font-weight: bold;
    padding: 7px 16px;
    background-color: #ebebeb;
    color: black;
    border: 3px solid black;
    border-radius: 10px;
    cursor: pointer;

    &:hover{
        background-color: white;
    }

`

const Bold = styled.span`
    font-weight: bold;
`

const CommentsBold = styled.span`
    font-weight: bold;
    margin-bottom: 10px;
`

const Container = styled.div`
    display: flex;
    justify-content: center;
`

const CommentAuthor = styled.div`
    font-weight: bold;
    align-self: flex-end;
`

const CommentDiv = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid white;
    padding: 15px;
    width: 750px;
`

const CommentsWrapper = styled.div`
    width: 850px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const PostBtn = styled.button`
    align-self: flex-end;
    font-size: 16px;
    font-weight: bold;
    padding: 5px 10px;
    background-color: #ebebeb;
    color: black;
    border: none;
    border-top: 3px solid black;
    border-left: 3px solid black;
    cursor: pointer;

    &:hover{
        background-color: white;
    }
`

const LikeSaveDiv = styled.div`
display: flex;
justify-content: center;
column-gap: 80px;
`

const CommentText = styled.div`
    border-radius: 15px;
    color: black;
    margin-left: 5px;
    font-weight: bold;
`

const CommentTextarea = styled.textarea`
    resize: none;
    height: 140px;
    border: none;
    font-size: 18px;
    font-family: 'Walter Turncoat', cursive;
    background-color: #ebebeb;

    &:focus{
        outline: none;
    }
`

const AddCommentDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 900px;
    border-radius: 15px;
    margin-top: 25px;
    background-color: #ebebeb;
`

const Comment = styled.div`
`

const CommentsDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 30px;

`

const MeaningDiv = styled.div`
    margin-top: 30px;
`

const MeaningText = styled.div`
    font-weight: bold;
`

const Time = styled.div`
`

const AuthorLink = styled(Link)`
    color: white;
    text-decoration: none;
`

const AuthorImg = styled.img`
    height: 40px;
    width: auto;
    margin-left: 10px;
`

const AuthorDiv = styled.div`
    display: flex;
    align-items: center;
`

const InfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`

const DreamText = styled.div`
    width: 780px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 15px;
`

const DreamWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const DreamDiv = styled.div`
`

const CharactersDiv = styled.div`
    display: flex;
    overflow-x: scroll;
    max-height: 400px;
    margin-top: 10px;
`

const Title = styled.div`
    font-weight: bold;
    font-size: 38px;
    text-decoration: underline;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`

export default DreamDetails