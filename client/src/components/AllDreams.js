import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAuth0 } from '@auth0/auth0-react'
import DreamCard from './DreamCard'

const AllDreams = () => {
    const [saveAllDreams, setSaveAllDreams] = useState(null);
    const [allDreams, setAllDreams] = useState(null);
    const [filters, setFilters] = useState({
        date: "--",
        type: [],
      });

    useEffect(()=>{
        fetch(`http://localhost:8000/all-dreams`)
        .then(res => res.json())
        .then(data => {
            console.log(data.allDreams)
            setSaveAllDreams(data.allDreams)
            setAllDreams(data.allDreams)
        })
        .catch(err => console.log(err))
    }, [])

    const dreamTypes = ["mundane", "lucid", "nightmare", "fantasy", "recurring", "prophetic", "epic", "abstract", "past-life", "intimate", "18+", "death", "time-travel", "unwordly", "horror", "religious", "after-life", "alien"]

    const handleFilter = (id, val) => {
        setFilters({...filters, [id]: val});

    }

    const handleCheck = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;

        let typeArr = filters.type;
        if(checked){
            setFilters({...filters, type: [...typeArr, value] })
        }
        else{
            let newArr = typeArr.filter( val => val !== value)
            setFilters({...filters, type: newArr })
        }
    }
    
    useEffect( () => {
        if(allDreams){
            let dreamsArr = [...saveAllDreams];

            if( filters.type.length > 0 ){
                dreamsArr = dreamsArr.filter( dream => {
                    const typeArr = dream.dreamData.finalData.checkedValues;
                    return filters.type.some( type => typeArr.includes(type))
                })
            }

            if( filters.date !== "--" ){
                dreamsArr = dreamsArr.sort( (dreamOne, dreamTwo) => {
                    const date1 = new Date(dreamOne.date);
                    const date2 = new Date(dreamTwo.date);
                    console.log(date1, date2)
                    if(filters.date === "recent"){
                        return date2 - date1
                    }
                    else if(filters.date === "oldest"){
                        return date1 - date2
                    }
                })
            }

            setAllDreams(dreamsArr)
        }  
    }, [filters.date, filters.type])

    return(
        <Wrapper>
            <InnerWrapper>
                <div>all dreams</div>
                <FilterDiv>
                    <DateLabel htmlFor="date">
                        <DateSelect 
                        name="date" 
                        id="date"
                        onChange={(ev) => handleFilter(ev.target.id, ev.target.value)}
                        >
                            <DateOption value="--">--</DateOption>
                            <DateOption value="recent">Most Recent</DateOption>
                            <DateOption value="oldest">Oldest</DateOption>
                        </DateSelect>
                    </DateLabel>
                    <TypeWrapper>
                        {dreamTypes.map( type => {
                            return (
                                <TypeDiv>
                                    <TypeInput type="checkbox" id={type}value={type}name={type} onClick={handleCheck}/>
                                    <TypeLabel htmlFor={type}>{type}</TypeLabel>
                                </TypeDiv>
                            )
                        })}
                    </TypeWrapper>
                </FilterDiv>
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
                                    charData={dream.dreamData.charData}
                                    />
                        })
                    }
                </DreamsWrapper>
            </InnerWrapper>
        </Wrapper>
       
    )
}

const TypeLabel = styled.label`
`

const TypeInput = styled.input`
`

const TypeDiv = styled.div`
`

const TypeWrapper = styled.div`
`

const DateOption = styled.option`
`

const DateSelect = styled.select`
`

const DateLabel = styled.label`
`

const FilterDiv = styled.div`
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

export default AllDreams