import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css"

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
import Test from './pages/Test';
import EditPost from './pages/EditPost';
import EditProfile from './pages/EditProfile';
import RequestResetPassword from './pages/RequestResetPassword';
import ResetPassword from './pages/ResetPassword';
import Founder from './pages/Founder';
import EditComment from './pages/EditComment';
import Notifications from './pages/Notifications';
import MessageNotifications from './pages/MessageNotifications';
import Bookmark from './pages/Bookmark';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <UserProvider>
      <NextUIProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/activateAccount' element={<Activation />} />
            <Route path='/accountActivate' element={<Activated />} />
            <Route path='/test' element={<Test />} />
            <Route path='/requestResetPassword' element={<RequestResetPassword />} />
            <Route path='/resetPassword' element={<ResetPassword />} />

          <Route element={<PrivateRoute />}>
              <Route path='/feed' element={<Feed />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path='/profile/:userId' element={<Profile />} />
              <Route path='/chat' element={<Chatpage />} />
              <Route path='/post' element={<PostUpload />} />
              <Route path='/explore' element={<Explore />} />
              <Route path='/edit/post/:postId' element={<EditPost />} />
              <Route path='/edit/comment/:commentId' element={<EditComment />} />
              <Route path='/edit/user/:userId' element={<EditProfile />} />
              <Route path='/founder' element={<Founder />} />
              <Route path='/notifications' element={<Notifications />} />
              <Route path='/messageNotifications' element={<MessageNotifications />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/bookmark' element={<Bookmark />} />
            </Route>
            
            <Route path='*' element={<NotFound />} />
        </Routes>
        </BrowserRouter>
        <ToastContainer />
        </NextUIProvider>
    </UserProvider>
  )
}

export default App