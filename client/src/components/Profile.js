import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import DreamCard from './DreamCard'
import { useParams } from 'react-router-dom'

const Profile = () => {
    const [saveAllDreams, setSaveAllDreams] = useState(null);
    const [allDreams, setAllDreams] = useState(null);

    const {userId} = useParams()

    useEffect(()=>{
        if(userId){
            fetch(`http://localhost:8000/user-dreams/${userId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setSaveAllDreams(data)
                setAllDreams(data)
            })
            .catch(err => console.log(err))}
    }, [userId])

    return(
        <Wrapper>
            <InnerWrapper>
                <div>Profile</div>
                <DreamsWrapper>
                    {allDreams &&
                        allDreams.map( dream => {
                            return <DreamCard
                                    dreamId={dream._id}
                                    date={dream.date}
                                    userId={userId}
                                    extraData={dream.dreamData.finalData}
                                    dreamData={dream.dreamData.storyData}
                                    charData={dream.dreamData.charData}
                                    />
                        })
                    }
                </DreamsWrapper>
            </InnerWrapper>
        </Wrapper>
       
    )
}


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