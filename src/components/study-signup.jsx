const SignUp = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
    >
      <div
        className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
      >
        <div
          className="flex flex-col justify-center p-8 md:p-14"
        >
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome back! Please enter your details
          </span>
          <div className="py-4">
            <span className="mb-2 text-md">Email</span>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              className="w-full p-2 border border-gray-300  rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div className="flex justify-between w-full py-4">
            <div className="mr-24">
              <input
                type="checkbox"
                name="ch"
                id="ch"
                className="mr-2"
              />
              <span className="text-md">Remember for 30 days</span>
            </div>
            <span className="font-bold text-md">Forgot password</span>
          </div>
          <div className="flex justify-between mb-4 mt-4">
            <a href="#">
              <img src="/svg/google.svg" />
            </a>
            <a href="#">
              <img src="/svg/github.svg" />
            </a>
            <a href="#">
              <img src="/svg/discord.svg" />
            </a>
          </div>
          <div className="text-center text-gray-400">
            Dont have an account?
            <span className="font-bold text-black ml-24">Sign up for free</span>
          </div>
        </div>
        <div
          className="relative"
        >
          <img
            src="/images/baloon.jpg"
            alt="img"
            className="object-cover w-[400px] h-screen hidden rounded-r-2xl md:block"
          />
          {/* txt on img */}
          <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded
          drop-shadow-lg md:block">
            <span className="text-white text-xl">
              We have been using untitle to kick <br />start every new project and cannot <br />
              imagine working without it
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp