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
        console.log(dreamData)
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
            <TypeDiv>
                <Fieldset>
                    <Legend>Type of Dream:</Legend>
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
                </Fieldset>
            </TypeDiv>
            <SettingsDiv>
                <Fieldset2>
                    <Legend2>Privacy Setting:</Legend2>
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
                </Fieldset2>
            </SettingsDiv>
            <MeaningDiv>
                <MeaningLabel htmlFor="name">Interpretation of Dream:</MeaningLabel>
                <MeaningTextarea 
                type="text" 
                id="meaning"
                onChange={(e) => handleChange(e.target.id,e.target.value)}
                value={finalData["meaning"] ? finalData["meaning"] : "" }
                />
            </MeaningDiv>
            <ImageDiv>
                
            </ImageDiv>
            <CreateBtn onClick={postDream}>Create Dream!</CreateBtn>
        </Wrapper>
    )
}

const SummaryTextarea = styled.textarea`
`

const SummaryLabel = styled.label`
`

const SummaryDiv = styled.div`
`

const SettingLabel = styled.label`
`

const SettingInput = styled.input`
`

const SettingDiv = styled.div`
`

const Legend2 = styled.legend`
`

const Fieldset2 = styled.fieldset`
`

const TypeLabel = styled.label`
`

const TypeInput = styled.input`
`

const Legend = styled.legend`
`

const Fieldset = styled.fieldset`
`

const SelectType = styled.select`
`

const CreateBtn = styled.button`
margin-top: auto;
margin-bottom: 0px;
`

const ImageDiv = styled.div`
`

const SettingsDiv = styled.div`
`

const TypeDiv = styled.div`
`

const MeaningTextarea = styled.textarea`
`

const MeaningLabel = styled.label`
`

const MeaningDiv = styled.div`
`

const Wrapper = styled.div`
flex: 1;
display: flex;
flex-direction: column;

`

export default FinalTouches