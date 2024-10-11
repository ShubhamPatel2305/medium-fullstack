import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import NavbarContainer from './components/NavbarContainer'
import Publish from './pages/Publish'
import Profile from './pages/Profile'

function App() {

  return (
    <>
    
      <BrowserRouter>
      <NavbarContainer />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App