const SignIn = () => {

    const doSubmit = () => {
        window.location.href = 'http://localhost:5000/api/auth/google'
    }
    
  return (
      <div className="container w-[96px] mx-auto border-solid  border-blue-500 p-4">
              <button onClick={doSubmit} className={`py-1 px-2 rounded text-white bg-orange-700 mb-4`}>
                  Google
          </button>
          <button  className={`py-1 px-2 rounded text-white bg-black mb-4`}>
                  GitHub
          </button>
          <button  className={`py-1 px-2 rounded text-white bg-blue-500`}>
                  Discord
              </button>
      </div>
  )
}

export default SignIn