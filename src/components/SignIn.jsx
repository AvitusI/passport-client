import { useMutation } from "@tanstack/react-query"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import axios from "axios"
import { Button } from '@nextui-org/react'
import { Sparkles} from "lucide-react"

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
    const response = await axios.post('https://passport-server-production-a778.up.railway.app/api/auth', sentData, { withCredentials: true })
    return response.data
  }

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      updateUser(data)
      queryClient.invalidateQueries(['items'], { refetchActive: true })
      navigate('/feed')
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })

  const onSubmit = (data) => {
    mutate(data)
  }

  return (
      <div className='w-full'>
          {/* login container */}
          <div className="flex items-center">
              {/* login form */}
            <div className="flex flex-col items-center justify-center">
          <div className="w-[300px] max-w-[600px] flex justify-center items-center mt-2">
            <div className="flex gap-2 items-center text-orange-300">
              <Sparkles size={24} />
              <span className="font-custom">ShowNext</span>
            </div>                       
                  </div>
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
                        <input
                             className={`p-2 rounded-xl focus:outline-none border-2 w-full ${
                                errors.password ? "text-red-500 border-red-500" : "text-white border-orange-500"
                              }`}
                            type="password"
                            name="password"
                            placeholder="******"
                            {...register("password")}
                          />
                        {errors.password && (
                        <div className='mt-1 text-red-500 text-sm'>
                          {errors.password.message}
                        </div>
                        )}
                      <Button
                        className="bg-orange-500 rounded-xl py-2 hover:scale-105 duration-300 mt-4"
                        isLoading={isSubmitting || isPending}
                        type="submit"
                      >
                          Login
                      </Button>
                  </form>
              </div>
      </div>

      <Link to={`/requestResetPassword`}>
        <div className="mt-5 hover:italic">
          <p className='text-xs text-orange-500'>Forgot your password?</p>
          </div>
        </Link>
    </div>
  )
}

export default SignInComponent