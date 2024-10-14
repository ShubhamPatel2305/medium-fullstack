import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import NavbarContainer from './components/NavbarContainer'
import Publish from './pages/Publish'
import Profile from './pages/Profile'
import OthersProfile from './pages/OthersProfile'
import Hero from './components/Hero'

function App() {

  return (
    <>
    
      <BrowserRouter>
      <NavbarContainer />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/profile/:id' element={<OthersProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App