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
import Activation from './pages/Activation';
import Activated from './pages/Activated';
import PostUpload from './pages/PostUpload';
import Explore from './pages/Explore';
import Explore2 from './pages/Explore2';

const App = () => {
  return (
    <UserProvider>
      <NextUIProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/activateAccount' element={<Activation />} />
            <Route path='/accountActivate' element={<Activated />} />
            <Route path='/explore2' element={<Explore2 />} />

          <Route element={<PrivateRoute />}>
              <Route path='/feed' element={<Feed />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path='/profile/:userId' element={<Profile />} />
              <Route path='/chat' element={<Chatpage />} />
              <Route path='/post' element={<PostUpload />} />
              <Route path='/explore' element={<Explore />} />
          </Route>
        </Routes>
        </BrowserRouter>
        </NextUIProvider>
    </UserProvider>
  )
}

export default App