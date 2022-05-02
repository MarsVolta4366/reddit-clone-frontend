import { useEffect, useState } from 'react'
import './App.css'

// SCSS STYLING BELOW
import './css/style.css'
import LogInFormDialogue from './components/LogInFormDialogue/LogInFormDialogue'
import SignUpFormDialog from './components/SignUpFormDialogue/SignUpFormDialogue'
import TopNavigation from './components/TopNavigation/TopNavigation'
import { AuthenticationContext } from './context/AuthenticationContext'
import CurrentUserContextProvider from './context/CurrentUserContext'
import { createTheme, ThemeProvider } from "@mui/material"
import CreatePostTopBar from './components/CreatePostTopBar/CreatePostTopBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatePostForm from './components/CreatePostForm/CreatePostForm'
import PostsGallery from './components/PostsGallery/PostsGallery'
import TopGrowingCommunities from './components/TopGrowingCommunities/TopGrowingCommunities'
import Profile from './components/Profile/Profile'
import CommentsPage from './components/CommentsPage/CommentsPage'
import CommunityPage from './components/CommunityPage/CommunityPage'

const theme = createTheme({
  components: {
    MuiDialogActions: {
      variants: [
        {
          props: {
            variant: "myDialogActions"
          },
          style: {
            position: "absolute",
            right: 2,
            top: 2
          }
        }
      ]
    },
    MuiButton: {
      variants: [
        {
          props: {
            variant: "blueButton"
          },
          style: {
            height: "35px",
            backgroundColor: "#0079D3",
            color: "white",
            textTransform: "unset !important",
            padding: "0 80px 0 80px",
            borderRadius: "20px",
            marginTop: "10px",
            marginBottom: "40px",
            "&:hover": {
              backgroundColor: "#1986da"
            }
          }
        },
        {
          props: {
            variant: "darkButton"
          },
          style: {
            height: "35px",
            padding: "0",
            margin: "0 10px 0 10px",
            border: "1px solid #212222",
            textTransform: "unset",
            "&:hover": {
              border: "1px solid #424242"
            }
          }
        },
        // {
        //   props: {
        //     variant: "homeButton"
        //   },
        //   style: {
        //     height: "35px",
        //     width: "300px",
        //     padding: "10px",
        //     margin: "0 10px 0 10px",
        //     border: "1px solid #212222",
        //     textTransform: "unset",
        //     "&:hover": {
        //       border: "1px solid #424242"
        //     }
        //   }
        // }
      ]
    },
    MuiInput: {
      variants: [
        {
          props: {
            variant: "darkInput"
          },
          style: {
            color: "white",
            backgroundColor: "#353538",
            border: "1px solid #424242",
            borderRadius: "5px",
            width: "100%",
            marginLeft: "auto",
            height: "35px",
            padding: "10px",
            "&:hover": {
              border: "1px solid white",
              backgroundColor: "#212222"
            },
            "&.Mui-focused": {
              border: "1px solid white",
              backgroundColor: "#212222"
            }
          }
        }
      ]
    },
    MuiMenuItem: {
      variants: [
        {
          props: {
            variant: "darkMenuItem"
          },
          style: {
            color: "white",
            "&:hover": {
              backgroundColor: "#313232"
            }
          }
        },
        {
          props: {
            variant: "darkMenuItemLeft"
          },
          style: {
            color: "white",
            width: "300px",
            "&:hover": {
              backgroundColor: "#313232"
            }
          }
        }
      ]
    }
  }
})

function App() {

  const [toggleSignUp, setToggleSignUp] = useState(() => false)
  const [toggleLogIn, setToggleLogIn] = useState(() => false)
  const [toggleShowPageDialogue, setToggleShowPageDialogue] = useState({ toggled: false, post_id: null })
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4000/posts")
      const resData = await response.json()
      setData(resData)
    }
    fetchData()
  }, [])

  // CHECK USERNAME FOR INVALID CHARACTERS, CALLED ONCHANGE AND IN handleSubmit() in SignUpFormDialogue and LoginFormDialogue
  const validateUsername = (username, setUsernameValid) => {
    const usernamePattern = new RegExp(/^[a-zA-Z0-9_-]*$/)
    const usernameValidated = usernamePattern.test(username)
    if (usernameValidated) {
      return usernameValidated
    } else {
      setUsernameValid(false)
      return usernameValidated
    }
  }

  return (
    <div id="app">
      <CurrentUserContextProvider>
        <AuthenticationContext.Provider value={{
          toggleSignUp, setToggleSignUp, toggleLogIn, setToggleLogIn, validateUsername,
          toggleShowPageDialogue, setToggleShowPageDialogue
        }}>
          <ThemeProvider theme={theme}>
            <Router>
              <TopNavigation />
              <SignUpFormDialog />
              <LogInFormDialogue />
              <Routes>
                <Route path="/" element={
                  <div className="myContainer">
                    <div className="verticalFlexLeft">
                      <CreatePostTopBar />
                      <PostsGallery data={data} />
                    </div>
                    <div className="verticalFlexRight hideOnMediaQuery">
                      <TopGrowingCommunities />
                    </div>
                  </div>
                } />
                <Route path="/createPost" element={
                  <CreatePostForm />
                } />
                <Route path="/profile/:username" element={
                  <Profile />
                } />
                <Route path="/comments/:post_id" element={
                  <CommentsPage />
                } />
                <Route path="/community/:community_name" element={
                  <CommunityPage />
                } />
                <Route path="*" element={
                  <div className="whiteText">404</div>
                } />
              </Routes>
            </Router>
          </ThemeProvider>
        </AuthenticationContext.Provider>
      </CurrentUserContextProvider>
    </div>
  )
}

export default App
