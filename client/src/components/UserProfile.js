import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAuth0 } from '@auth0/auth0-react'
import DreamCard from './DreamCard'

const UserProfile = () => {
    const [saveAllDreams, setSaveAllDreams] = useState(null);
    const [allDreams, setAllDreams] = useState(null);

    const {user, isAuthenticated} = useAuth0();

    useEffect(()=>{
        if(user){
            fetch(`http://localhost:8000/user-dreams/${user.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setSaveAllDreams(data.dreamsArr)
                setAllDreams(data.dreamsArr)
            })
            .catch(err => console.log(err))}
    }, [user])

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
                                    userId={user.email}
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

export default UserProfile