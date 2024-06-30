import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react';

import { UserProvider } from './context/UserContext'
import Home from './pages/Home'
import Feed from './pages/Feed';
import PrivateRoute from './components/PrivateRoute';
import PostPage from './pages/PostPage';
import Profile from './pages/Profile';
import Chatpage from './pages/Chatpage';

const App = () => {
  return (
    <UserProvider>
      <NextUIProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/chat' element={<Chatpage />} />

          <Route element={<PrivateRoute />}>
              <Route path='/feed' element={<Feed />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path='/profile/:userId' element={<Profile />} />
          </Route>
        </Routes>
        </BrowserRouter>
        </NextUIProvider>
    </UserProvider>
  )
}

export default App