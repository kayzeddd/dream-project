import { useEffect, useState } from "react";
import dreamcatcher from "../images/dream-catcher.png"
import styled from "styled-components";

const Home = () => {

    // useEffect( () => {
    //     fetch('http://localhost:8000/')
    //     .then( res => res.json())
    //     .then( data => console.log(data))
    //     .catch( err => console.log(err))
    // }, [])

    return (
        <Wrapper>
            <InnerWrapper>
                <TextDiv>
                    <TextWrapper>
                        <Text>A third of our lifetime is spent in the world of dreams</Text>
                    </TextWrapper>
                    <TextWrapper>
                        <Text>Capture these dreams as they may teach you more than you might think </Text>
                    </TextWrapper>
                    <TextWrapper>
                        <Text>Other World is a place where you can share those adventures!</Text>
                    </TextWrapper>
                </TextDiv>
                {/* <DreamCatcher src={dreamcatcher}/> */}
                <QuoteDiv>
                    <Quote>"The future belongs to those who believe in the beauty of their dreams."</Quote>
                    <Quote>- Eleanor Roosevelt</Quote>
                </QuoteDiv>
            </InnerWrapper>
        </Wrapper>
    )
}
const TextWrapper = styled.div`
display: flex;
`

const QuoteDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Quote = styled.div`
    background-color: #242424;
    color: white;
    padding: 5px 10px;
`

const Text = styled.div`
    background-color: #242424;
    color: white;
    padding: 5px 10px;
    font-size: 30px;
`

const TextDiv = styled.div`
display: flex;
flex-direction: column;
    row-gap: 18px;
`

const DreamCatcher = styled.img`
    height: 50px;
    width: 30px;

`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 30px;
`

const InnerWrapper = styled.div`
    margin-top: 85px;
    height: 75vh;
    color: black;   
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-style: italic;
`

export default Home