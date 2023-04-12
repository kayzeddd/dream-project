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
        views: "--",
        likes: "--",
      });

    useEffect(()=>{
        fetch(`http://localhost:8000/all-dreams`)
        .then(res => res.json())
        .then(data => {
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
                    return filters.type.every( type => typeArr.includes(type))
                })
            }

            if( filters.date !== "--" ){
                dreamsArr = dreamsArr.sort( (dreamOne, dreamTwo) => {
                    const date1 = new Date(dreamOne.date);
                    const date2 = new Date(dreamTwo.date);
                    if(filters.date === "recent"){
                        return date2 - date1
                    }
                    else if(filters.date === "oldest"){
                        return date1 - date2
                    }
                })
            }

            if( filters.views !== "--"){
                dreamsArr = dreamsArr.sort( (dreamOne, dreamTwo) => {
                    const dreamViews1 = dreamOne.viewerArr.length;
                    const dreamViews2 = dreamTwo.viewerArr.length;
                    if(filters.views === "most-viewed"){
                        return dreamViews2 - dreamViews1
                    }
                    else if(filters.views === "least-viewed"){
                        return dreamViews1 - dreamViews2
                    }
                })
            }

            if( filters.likes !== "--"){
                dreamsArr = dreamsArr.sort( (dreamOne, dreamTwo) => {
                    const dreamLikes1 = dreamOne.likesArr.length;
                    const dreamLikes2 = dreamTwo.likesArr.length;
                    if(filters.likes === "most-liked"){
                        return dreamLikes2 - dreamLikes1
                    }
                    else if(filters.likes === "least-liked"){
                        return dreamLikes1 - dreamLikes2
                    }
                })
            }

            setAllDreams(dreamsArr)
        }  
    }, [filters.date, filters.type, filters.views, filters.likes])

    return(
        <Wrapper>
            <InnerWrapper>
                <FilterDiv>
                    <TopFilters>
                        <DateLabel htmlFor="date">Filter by Time:
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
                        <ViewsLabel htmlFor="views">Filter by Views:
                            <ViewsSelect
                            name="views"
                            id="views"
                            onChange={(ev) => handleFilter(ev.target.id, ev.target.value)}
                            >
                                <ViewsOption value="--">--</ViewsOption>
                                <ViewsOption value="most-viewed">Most Viewed</ViewsOption>
                                <ViewsOption value="least-viewed">Least Viewed</ViewsOption>
                            </ViewsSelect>
                        </ViewsLabel>
                        <LikesLabel htmlFor="likes">Fitler by Likes:
                            <LikesSelect
                            name="likes"
                            id="likes"
                            onChange={(ev) => handleFilter(ev.target.id, ev.target.value)}
                            >
                                <LikesOption value="--">--</LikesOption>
                                <LikesOption value="most-liked">Most Liked</LikesOption>
                                <LikesOption value="least-liked">Least Liked</LikesOption>
                            </LikesSelect>
                        </LikesLabel>
                    </TopFilters>
                    <TypeSelectDiv>
                        <TypeText>Type of Dream:</TypeText>
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
                    </TypeSelectDiv>
                    <NumDreams>Number of Dreams: <NumSpan>{allDreams ? allDreams.length : 0}</NumSpan></NumDreams>
                </FilterDiv>
                <DreamsWrapper>
                    {allDreams && 
                        allDreams.map( dream => {
                            if(dream.dreamData.finalData.privacySetting === "private"){
                                return <></>
                            }
                            return <DreamCard
                                    likeCount={dream.likesArr.length}
                                    viewCount={dream.viewerArr.length}
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


const NumSpan = styled.span`
    background-color: #242424;
    padding: 2px 5px;
    font-weight: bold;
`

const NumDreams = styled.div`
    margin-top: 10px;
`

const TopFilters = styled.div`
    display: flex;
    column-gap: 20px;
    justify-content: center;
`

const TypeText = styled.div`
margin-bottom: 10px;
`

const LikesOption = styled.option`
`

const LikesSelect = styled.select`
`

const LikesLabel = styled.label`
`

const ViewsOption = styled.option`
`

const ViewsSelect = styled.select`
`

const ViewsLabel = styled.label`
`

const TypeLabel = styled.label`
`

const TypeInput = styled.input`
`

const TypeDiv = styled.div`
`

const TypeWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 10px;
`

const TypeSelectDiv = styled.div`
`

const DateOption = styled.option`
`

const DateSelect = styled.select`
`

const DateLabel = styled.label`
`

const FilterDiv = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    background-color:#404040;
    border: 2px solid white;
    margin: 10px 0px;
    padding: 20px;
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