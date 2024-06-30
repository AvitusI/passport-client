import { Tabs, Tab } from "@nextui-org/react"
import { LogIn, ClipboardPen } from 'lucide-react'

import SignInComponent from "../components/SignIn"
import SignUpComponent from "../components/SignUp"


function Home() {

  const doSubmitGoogle = () => {
        window.location.href = 'http://localhost:5000/api/auth/google'
    }

    const doSubmitGitHub = () => {
        window.location.href = 'http://localhost:5000/api/auth/github'
    }

    const doSubmitDiscord = () => { 
        window.location.href = 'http://localhost:5000/api/auth/discord'
  }
  
  return (
    <div className="flex justify-center items-center">
    <div className="min-h-screen p-4 sm:w-1/3">
      <Tabs  color="orange-500" aria-label="Options">
        <Tab
          key='Login'
          title={
            <div className="flex items-center space-x-2 text-orange-500">
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
            <div className="flex items-center space-x-2 text-orange-500">
              <ClipboardPen />
              <span>Signup</span>
            </div>
          }
        >
          <SignUpComponent />
        </Tab>

      </Tabs>

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

                  <div className='mt-5 py-4'>
                      <p className='text-xs text-orange-500'>Forgot your password?</p>
                  </div>
        </div>
      </div>
  )
}

export default Home