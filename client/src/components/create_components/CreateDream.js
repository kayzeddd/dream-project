import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import Dream from './Dream'
import Details from './Details'
import FinalTouches from './FinalTouches'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

const CreateDream = () => {
    const [tab, setTab] = useState(1);
    const [dreamData, setDreamData] = useState({});
    const {user} = useAuth0() 
    const navigate = useNavigate()

    const postDream = () => {
        const date = new Date()
        fetch("http://localhost:8000/add-dream", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              dreamData, userId: user.email, userData: user, date
            }),
          })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            navigate(`/dream/${data.dreamId}`)
            })
          .catch(err => console.log(err))
    }

    return (
        <Wrapper>
            <div>Create Dreams</div>
            <TabContainer>
                <ButtonDiv>
                    <Button1 onClick={() => setTab(1)}>1. Dream</Button1>
                    <Button1 onClick={() => setTab(2)}>2. Details</Button1>
                    <Button1 onClick={() => setTab(3)}>3. Final Touches</Button1>
                </ButtonDiv>
                <Tabs>
                    {tab === 1 && <Dream dreamData={dreamData} setDreamData={setDreamData}/>}
                    {tab === 2 && <Details dreamData={dreamData} setDreamData={setDreamData}/>}
                    {tab === 3 && <FinalTouches dreamData={dreamData} setDreamData={setDreamData} postDream={postDream}/>}
                </Tabs>
            </TabContainer>

        </Wrapper>
    )
}


const Tabs = styled.div`
    height: 800px;
    border: 2px solid white;
    padding: 50px;
    display: flex;
    flex-direction: column;
    background-color: #abbbd4;
`

const ButtonDiv = styled.div`
    display: flex;
`

const Button1 = styled.button`
    flex: 1;
    font-size: 18px;
`
const Button2 = styled.button``
const Button3 = styled.button``
const Button4 = styled.button``

const TabContainer = styled.div`
    width: 1300px;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
`

export default CreateDream