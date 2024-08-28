import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "axios"
import { toast } from "react-toastify"
import { Button } from "@nextui-org/react"

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
  username: yup.string().required()
})

const signUp = async (sentData) => {
  const response = await axios.post('http://localhost:5000/api/users', sentData, {withCredentials: true})
  return response.data;
}

const SignUpComponent = () => {

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting}
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  })

  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      navigate('/activateAccount')
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

  const onSubmit = (data) => {
    mutate(data)
  }

  return (
    <section className='w-full'>
          {/* Signup container */}
          <div className="flex max-w-3xl items-center">
              {/* login form */}
              <div className="px-1">
                  <h2 className="font-bold text-2xl text-orange-500 text-center">SignUp</h2>
                  <p className="text-sm mt-4 text-orange-500">New to the platform?</p>

              <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col  gap-4 w-full"
                >
                      <input
                        className={`p-2 mt-8 rounded-xl border-2 outline-none w-full ${
                         errors.username ? "text-red-500 border-red-500" : "text-white  border-orange-500"
                          }`}
                          type="text"
                          name="username"
                          placeholder="Username"
                          {...register("username")}
                      />
                      {errors.username && (
                        <div className="text-red-500 text-sm">
                            {errors.username.message}
                        </div>
                      )}
                      <input
                          className={`p-2 rounded-xl border-2 outline-none w-full ${
                            errors.email ? "text-red-500 border-red-500" : "text-white border-orange-500"
                          }`}
                          type="text"
                          name="email"
                          placeholder="Email"
                          {...register("email")}
                      />
                      {errors.email && (
                        <div className="text-red-500 text-sm">
                            {errors.email.message}
                        </div>
                      )}
                      <div className='relative'>
                        <input
                            className={`p-2 rounded-xl outline-none border-2 w-full ${
                                errors.password ? "text-red-500 border-red-500" : "text-white border-orange-500"
                            }`}
                            type="password"
                            name="password"
                            placeholder="Password"
                            {...register("password")}
                          />
                        </div>
                        {errors.password && (
                          <div className="text-red-500 text-sm">
                            {errors.password.message}
                          </div>
                        )}
                      <Button
                          className="bg-orange-500 rounded-xl py-2 hover:scale-105 duration-300"
                          isDisabled={isSubmitting || isPending}
                          type="submit"
                      >
                          SignUp
                      </Button>
                  </form>

                  
              </div>
              </div>

            
    </section>
  )
}
export default SignUpComponent