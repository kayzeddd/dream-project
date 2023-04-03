import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAuth0 } from '@auth0/auth0-react'
import DreamCard from './DreamCard'

const AllDreams = () => {
    const [saveAllDreams, setSaveAllDreams] = useState(null);
    const [allDreams, setAllDreams] = useState(null);

    useEffect(()=>{
        fetch(`http://localhost:8000/all-dreams`)
        .then(res => res.json())
        .then(data => {
            setSaveAllDreams(data.allDreams)
            setAllDreams(data.allDreams)
        })
        .catch(err => console.log(err))
    }, [])

    return(
        <Wrapper>
            <InnerWrapper>
                <div>all dreams</div>
                <DreamsWrapper>
                    {allDreams &&
                        allDreams.map( dream => {
                            if(dream.dreamData.finalData.radioValue === "private"){
                                return <></>
                            }
                            return <DreamCard
                                    dreamId={dream._id}
                                    date={dream.date}
                                    userId={dream.userId}
                                    extraData={dream.dreamData.finalData}
                                    dreamData={dream.dreamData.storyData}
                                    charData={dream.dreamData.detailsData}
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

export default AllDreams