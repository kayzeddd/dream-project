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
            navigate(`/dream/${data.dreamId}`)
            })
          .catch(err => console.log(err))
    }

    return (
        <Wrapper>
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
    padding: 30px 50px;
    display: flex;
    flex-direction: column;
`

const ButtonDiv = styled.div`
    display: flex;
`

const Button1 = styled.button`
    flex: 1;
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
const TabContainer = styled.div`
    width: 1300px;
    margin-top: 20px;
    padding: 15px;
    border: 3px solid white;
    border-radius: 15px;
    background-color: #242424;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
`

export default CreateDream