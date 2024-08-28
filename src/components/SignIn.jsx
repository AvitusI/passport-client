import { useMutation } from "@tanstack/react-query"
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import axios from "axios"
import { Button } from '@nextui-org/react'

import { toast } from "react-toastify"

import { useUser } from "../context/UserContext"
import { queryClient } from "../main"

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5)
})

const SignInComponent = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  })

  const navigate = useNavigate()
  const { updateUser } = useUser()

  // The function to send the request to the server
  const loginUser = async (sentData) => {
    const response = await axios.post('http://localhost:5000/api/auth', sentData, { withCredentials: true })
    return response.data
  }

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      updateUser(data)
      queryClient.invalidateQueries(['items'], { refetchActive: true })
      navigate('/feed')
    },
    onError: () => {
      toast.error("Incorrect credentials")
    }
  })

  const onSubmit = (data) => {
    mutate(data)
  }

  return (
      <div className='w-full'>
          {/* login container */}
          <div className="flex max-w-3xl items-center">
              {/* login form */}
              <div className="px-1">
                  <h2 className="font-bold text-2xl text-orange-500 text-center">Login</h2>
                  <p className="text-sm mt-4 text-orange-500">If you already a member, easily log in</p>

                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col  gap-4 w-full">
                      <input
                          className={`p-2 mt-8 rounded-xl border-2 outline-none w-full ${
                            errors.email ? "text-red-500 border-red-500" : "text-white border-orange-500"
                          }`}
                          type="text"
                          name="email"
                          placeholder="Email"
                          {...register("email")}
                        />
                          {errors.email && (
                            <div className='mt-1 text-red-400 text-sm'>
                              {errors.email.message}
                            </div>
                          )}
                      <div className='relative'>
                        <input
                             className={`p-2 rounded-xl focus:outline-none border-2 w-full ${
                                errors.password ? "text-red-500 border-red-500" : "text-white border-orange-500"
                              }`}
                            type="password"
                            name="password"
                            placeholder="******"
                            {...register("password")}
                          />
                        </div>
                        {errors.password && (
                        <div className='mt-1 text-red-500 text-sm'>
                          {errors.password.message}
                        </div>
                        )}
                      <Button
                        className="bg-orange-500 rounded-xl py-2 hover:scale-105 duration-300"
                        isLoading={isSubmitting || isPending}
                        type="submit"
                      >
                          Login
                      </Button>
                  </form>

                  
              </div>
              </div>

            
    </div>
  )
}

export default SignInComponent