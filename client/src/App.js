import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRef } from "react";
import styled from "styled-components";
import Home from "./components/Home";
import Header from "./components/Header";
import GlobalStyles from "./GlobalStyles";
import CreateDream from "./components/create_components/CreateDream";
import stars2 from "./videos/stars2.mp4";
import cave from "./images/cave.jpg"
import AllDreams from "./components/AllDreams";
import UserProfile from "./components/UserProfile";
import DreamDetails from "./components/DreamDetails";
import Profile from "./components/Profile";

const App = () => {
  const vidRef = useRef(null)

  const handlePlay = () => {
    vidRef.current.playbackRate = 0.2; 
    vidRef.current.play(); 
  };

  return (
    <BrowserRouter>
    <GlobalStyles/>
        <Wrapper>
            <InnerWrapper>
              {/* <Video ref={vidRef} autoPlay muted loop onCanPlay={handlePlay}>
                    <Source src={stars2} type="video/mp4" />
              </Video> */}
              <Wallpaper>
                <Image src={cave}/>
              </Wallpaper>
                        <Header/>
              <Main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-dream" element={<CreateDream/>}/>
                    <Route path="/all-dreams" element={<AllDreams/>}/>
                    <Route path="/profile/:userId" element={<Profile/>}/>
                    <Route path="/user-profile" element={<UserProfile/>}/>
                    <Route path="/dream/:dreamId" element={<DreamDetails/>}/>
                </Routes>
              </Main>
            </InnerWrapper>
        </Wrapper>
    </BrowserRouter>
  );
}

const Image = styled.img`
position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`

const Wallpaper = styled.div`
`

const InnerWrapper = styled.div`
   position: relative;
   height: 100%;
   display: flex;
   flex-direction: column;
    flex: 1;
`

const Wrapper = styled.div`
  min-height: 100vh;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  font-size: 18px;
  color: white;
  background-color: black;
`

const Main = styled.div`
/* position: relative; */
  /* flex: 1; */
  /* background-color: #FF3CAC;
  background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%); */

`

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const Source = styled.source``;

export default App;
