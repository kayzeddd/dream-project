import React from 'react'
import styled from 'styled-components'
import { useState, useContext, useEffect } from 'react'


const FinalTouches = ({dreamData, setDreamData, postDream}) => {
    const [finalData, setFinalData] = useState(() =>{
        return dreamData["finalData"] && Object.keys(dreamData["finalData"]).length > 0 
                ? dreamData["finalData"]
                : {}
    })

    const [checkedValues, setCheckedValues] = useState(() => {
        return dreamData["finalData"]?.checkedValues && dreamData["finalData"].checkedValues.length > 0
                ? dreamData["finalData"].checkedValues
                : []
    })

    const [privacySetting, setPrivacySetting] = useState( () => {
        return dreamData["finalData"]?.privacySetting 
                ? dreamData["finalData"].privacySetting 
                : ""
    })

    const handleChange = (id, value) => {
        setFinalData({...finalData, [id]: value})
        
    }

    useEffect(()=>{
        setDreamData({...dreamData, finalData:{...finalData, checkedValues, privacySetting}})
        return () => {
            
        }
    },[finalData, checkedValues, privacySetting])

    const dreamTypes = ["mundane", "lucid", "nightmare", "fantasy", "recurring", "prophetic", "epic", "abstract", "past-life", "intimate", "18+", "death", "time-travel", "unwordly", "horror", "religious", "after-life", "alien"]

    const handleCheck = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;

        if(checked){
            setCheckedValues([...checkedValues, value])
        }
        else{
            setCheckedValues(checkedValues.filter( val => val !== value))
        }
    }

    const handleRadio = (e) => {
        setPrivacySetting(e.target.value)
    }

    return (
        <Wrapper>
            <SummaryDiv>
                <SummaryLabel htmlFor='summary'>Summary:</SummaryLabel>
                <SummaryTextarea 
                type="text"
                id="summary" 
                onChange={(e) => handleChange(e.target.id,e.target.value)}
                value={finalData["summary"] ? finalData["summary"] : "" }
                />
            </SummaryDiv>
            <MeaningDiv>
                <MeaningLabel htmlFor="name">Meaning Behind Dream:</MeaningLabel>
                <MeaningTextarea 
                type="text" 
                id="meaning"
                onChange={(e) => handleChange(e.target.id,e.target.value)}
                value={finalData["meaning"] ? finalData["meaning"] : "" }
                />
            </MeaningDiv>
            <TypeDiv>
                <Fieldset>
                    <LegendDiv>Type of Dream:</LegendDiv>
                    <TypeWrapper>
                        {dreamTypes.map( type => {
                            return (
                                <div>
                                    <TypeInput
                                    type="checkbox"
                                    value={type}
                                    id={type}
                                    checked={checkedValues.includes(type)}
                                    onChange={handleCheck}
                                    />
                                    <TypeLabel htmlFor={type}>{type}</TypeLabel>
                                </div>
                            )
                        })}
                    </TypeWrapper>
                </Fieldset>
            </TypeDiv>
            <SettingsDiv>
                <Fieldset2>
                    <Legend2>Privacy Setting:</Legend2>
                    <div>
                        <SettingDiv>
                            <SettingInput
                            type="radio" id="private" name="privacy" value="private"
                            onChange={handleRadio}
                            defaultChecked={dreamData["finalData"]?.privacySetting === "private" }/>
                            <SettingLabel for="private">private</SettingLabel>
                        </SettingDiv>
                        <SettingDiv>
                            <SettingInput type="radio" id="public" name="privacy" value="public"
                            onChange={handleRadio}
                            defaultChecked={dreamData["finalData"]?.privacySetting === "public" }
                            />
                            <SettingLabel for="public">public</SettingLabel>
                        </SettingDiv>
                    </div>
                </Fieldset2>
            </SettingsDiv>
            <ImageDiv>
                
            </ImageDiv>
            <CreateDiv>
                <CreateBtn onClick={postDream}>Create Dream!</CreateBtn>
            </CreateDiv>
        </Wrapper>
    )
}

const TypeWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 10px;
    width: 960px;
`

const SummaryTextarea = styled.textarea`
    flex: 1;
    height: 100px;
    resize: none;
    font-size: 18px;
    font-family: 'Walter Turncoat', cursive;
`

const SummaryLabel = styled.label`
    width: 230px;
    text-align:end;
    margin-right: 10px;
`

const SummaryDiv = styled.div`
    display: flex;
    row-gap: 8px
`

const SettingLabel = styled.label`

`

const SettingInput = styled.input`
    
`

const SettingDiv = styled.div`

`

const Legend2 = styled.div`
width: 230px;
    text-align:end;
    margin-right: 10px;
`

const Fieldset2 = styled.fieldset`
display: flex;
`

const TypeLabel = styled.label`
`

const TypeInput = styled.input`
`

const LegendDiv = styled.div`
width: 230px;
    text-align:end;
    margin-right: 10px;
`

const Fieldset = styled.fieldset`
display: flex;
`

const SelectType = styled.select`
`

const CreateDiv = styled.div`
    display: flex;
    justify-content: center;
`

const CreateBtn = styled.button`
    margin-top: 20px;
    width: 500px;
    font-size: 25px;
    font-weight: bold;
    padding: 10px 16px;
    background-color: white;
    color: black;
    border: 3px solid black;
    border-radius: 10px;
    cursor: pointer;

    &:hover{
        background-color: white;
    }
`

const ImageDiv = styled.div`
`

const SettingsDiv = styled.div`
`

const TypeDiv = styled.div`
`

const MeaningTextarea = styled.textarea`
flex: 1;
    height: 100px;
    resize: none;
    font-size: 18px;
    font-family: 'Walter Turncoat', cursive;
`

const MeaningLabel = styled.label`
width: 230px;
    text-align:end;
    margin-right: 10px;
`

const MeaningDiv = styled.div`
    display: flex;

    row-gap: 8px;
`

const Wrapper = styled.div`
flex: 1;
display: flex;
flex-direction: column;
row-gap: 40px;
`

export default FinalTouches