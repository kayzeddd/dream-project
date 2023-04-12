import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import DreamCard from './DreamCard'
import { useParams } from 'react-router-dom'

const Profile = () => {
    const [saveAllDreams, setSaveAllDreams] = useState(null);
    const [allDreams, setAllDreams] = useState(null);
    const [userData, setUserData] =  useState(null)

    const {userId} = useParams()

    useEffect(()=>{
        if(userId){
            fetch(`http://localhost:8000/user-dreams/${userId}`)
            .then(res => res.json())
            .then(data => {
                setSaveAllDreams(data)
                setAllDreams(data)
            })
            .catch(err => console.log(err))
            
            fetch(`http://localhost:8000/get-user-data/${userId}`)
            .then(res => res.json())
            .then(data => {
                setUserData(data.userData)
            })
            .catch(err => console.log(err))
        }
    }, [userId])

    return(
        <Wrapper>
            <InnerWrapper>
                {allDreams && userData &&
                <>  
                    <UserDiv>
                        <Name>{userData.userData.nickname}</Name>
                    </UserDiv>
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
    margin: 15px;
`


const DreamsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`

const InnerWrapper = styled.div`
    width: 1100px;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`

export default Profile