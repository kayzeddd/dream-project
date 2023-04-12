import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAuth0 } from '@auth0/auth0-react'
import DreamCard from './DreamCard'

const UserProfile = () => {
    const [saveAllDreams, setSaveAllDreams] = useState(null);
    const [allDreams, setAllDreams] = useState(null);
    const [tab, setTab] = useState(0)

    const {user, isAuthenticated} = useAuth0();

    useEffect(()=>{
        if(user && tab === 0){
            fetchUserDreams()
        }

        if(user && tab === 1){
            fetchSavedDreams()
        }
    }, [user, tab])

    const fetchUserDreams = () => {
        fetch(`http://localhost:8000/user-dreams/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setSaveAllDreams(data)
                setAllDreams(data)
            })
            .catch(err => console.log(err))
    }

    const fetchSavedDreams = () => {
        fetch(`http://localhost:8000/get-saved-dreams/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setSaveAllDreams(data.savedDreams)
                setAllDreams(data.savedDreams)
            })
            .catch(err => console.log(err))
    }

    const deleteDream = (dreamId) => {
        fetch(`http://localhost:8000/delete-dream/${dreamId}`,{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then( res => res.json())
        .then(data => {
            fetchUserDreams()
        })
        .catch( err => console.log(err))
    }

    const deleteSavedDream = (dreamId) => {
        fetch(`http://localhost:8000/delete-saved-dream`,{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: user.email, dreamId })
        })
        .then( res => res.json())
        .then(data => {
            fetchSavedDreams()
        })
        .catch( err => console.log(err))
    }

    return(
        <Wrapper>
            <InnerWrapper>
            {allDreams && user &&
                <>
                    <UserDiv>
                            <Name>{user.nickname}</Name>
                    </UserDiv>
                    <ButtonDiv>
                        <UserDreamsBtn onClick={() => setTab(0)}>My Dreams</UserDreamsBtn>
                        <SavedDreamsBtn onClick={() => setTab(1)}>Saved Dreams</SavedDreamsBtn>
                    </ButtonDiv>
                    <DreamsWrapper>
                            {allDreams.map( dream => {
                                return <DreamCard
                                        likeCount={dream.likesArr.length}
                                        viewCount={dream.viewerArr.length}
                                        dreamId={dream._id}
                                        date={dream.date}
                                        userId={dream.userData.email}
                                        extraData={dream.dreamData.finalData}
                                        dreamData={dream.dreamData.storyData}
                                        charData={dream.dreamData.charData}
                                        deleteDream={tab === 0? deleteDream: deleteSavedDream}
                                        />
                            })}
                    </DreamsWrapper>
                </>
                }
            </InnerWrapper>
        </Wrapper>
       
    )
}


const Name = styled.div`
    font-weight: bold;
    font-size: 35px;
    text-decoration: underline;
    color: black;
`

const UserDiv = styled.div`
    display: flex;
    justify-content: center;
`

const SavedDreamsBtn = styled.button`
    font-size: 20px;
    font-weight: bold;
    padding: 7px 16px;
    background-color: #ebebeb;
    color: black;
    border: 3px solid black;
    border-radius: 10px;
    cursor: pointer;
    width: 180px;

    &:hover{
        background-color: white;
    }
`

const UserDreamsBtn = styled(SavedDreamsBtn)`
`

const ButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    column-gap: 20px;
    margin-top: 10px;
`

const DreamsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin-top: 15px;
`

const InnerWrapper = styled.div`
    width: 1100px;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`

export default UserProfile