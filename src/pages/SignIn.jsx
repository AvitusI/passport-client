const SignIn = () => {

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
      <div className="container w-[96px] mx-auto border-solid  border-blue-500 p-4">
            <button onClick={doSubmitGoogle} className={`py-1 px-2 rounded text-white bg-orange-700 mb-4`}>
                  Google
          </button>
          <button onClick={doSubmitGitHub} className={`py-1 px-2 rounded text-white bg-black mb-4`}>
                  GitHub
          </button>
          <button onClick={doSubmitDiscord} className={`py-1 px-2 rounded text-white bg-blue-500`}>
                  Discord
              </button>
      </div>
  )
}

export default SignIn