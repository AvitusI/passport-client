import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Tabs, Tab } from "@nextui-org/react"
import { LogIn, ClipboardPen } from 'lucide-react'

import SignInComponent from "../components/SignIn"
import SignUpComponent from "../components/SignUp"

import { useUser } from "../context/UserContext"


function Home() {

  const { user } = useUser()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/feed')
    }
  })

  const doSubmitGoogle = () => {
        window.location.href = 'https://passport-server-production-a778.up.railway.app/api/auth/google'
    }

    const doSubmitGitHub = () => {
        window.location.href = 'https://passport-server-production-a778.up.railway.app/api/auth/github'
    }

    const doSubmitDiscord = () => { 
        window.location.href = 'https://passport-server-production-a778.up.railway.app/api/auth/discord'
  }
  
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-4 w-[340px] max-w-[600px] flex flex-col gap-3">
        <div className="w-full">
      <Tabs radius="full" color="warning">
        <Tab
          key='Login'
          title={
            <div className="flex items-center space-x-2 text-white font-bold pr-5 pl-5">
              <LogIn />
              <span>Login</span>
          </div>
          }
        >
          <SignInComponent />
        </Tab>
        <Tab
          key='Signup'
          title={
            <div className="flex items-center space-x-2 text-white font-bold pr-5 pl-5">
              <ClipboardPen />
              <span>Signup</span>
            </div>
          }
        >
          <SignUpComponent />
        </Tab>

          </Tabs>
        </div>
        
        <div className="w-full">

                <div className="mt-10 grid grid-cols-3 items-center text-orange-500 w-full">
                      <hr className="border-orange-500" />
                      <p className="text-center">OR</p>
                      <hr className="border-orange-500" />
                  </div>

                  <button 
                      onClick={doSubmitGoogle}
                      className='border py-2 w-full rounded-xl mt-5 flex justify-center items-center border-orange-500 hover:scale-105 duration-300'
                  >
                      <img src='/svg/google_icon.svg' alt='google icon' className=' bg-orange-500 rounded-full size-6 mr-3' />
                      <span>Login with Google</span>
                  </button>

                  <button 
                      onClick={doSubmitGitHub}
                      className='border py-2 w-full rounded-xl mt-5 flex justify-center items-center border-orange-500 hover:scale-105 duration-300'
                  >
                      <img src='/svg/github_icon.svg' alt='github icon' className=' bg-orange-500 rounded-full size-6 mr-3' />
                      <span>Login with Github</span>
                  </button>

                  <button 
                      onClick={doSubmitDiscord}
                      className='border py-2 w-full rounded-xl mt-5 flex justify-center items-center border-orange-500 hover:scale-105 duration-300'
                  >
                      <img src='/svg/discord_icon.svg' alt='discord icon' className=' bg-orange-500 rounded-full size-6 mr-3' />
                      <span>Login with Discord</span>
                  </button>
          
          </div>
      </div>
    </div>
  )
}

export default Home