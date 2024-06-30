import { EyeIcon } from "lucide-react"

const SignUpComponent = () => {
  return (
    <section className='w-full'>
          {/* Signup container */}
          <div className="flex max-w-3xl items-center">
              {/* login form */}
              <div className="px-1">
                  <h2 className="font-bold text-2xl text-orange-500 text-center">SignUp</h2>
                  <p className="text-sm mt-4 text-orange-500">New to the platform?</p>

                  <form action="" className="flex flex-col  gap-4 w-full">
                      <input
                          className="p-2 mt-8 rounded-xl border focus:border-orange-500 focus:border-2 focus:outline-none w-full"
                          type="text"
                          name="username"
                          placeholder="Username" />
                      <input
                          className="p-2 rounded-xl border focus:border-orange-500 focus:border-2 focus:outline-none w-full"
                          type="text"
                          name="email"
                          placeholder="Email" />
                      <div className='relative'>
                        <input
                            className="p-2 rounded-xl focus:outline-none border focus:border-orange-500 focus:border-2 w-full"
                            type="password"
                            name="password"
                              placeholder="Password" />
                            <EyeIcon className="absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                      <button
                        className="bg-orange-500 rounded-xl py-2 hover:scale-105 duration-300"
                      >
                          SignUp
                      </button>
                  </form>

                  
              </div>
              </div>

            
    </section>
  )
}
export default SignUpComponent