import { useSearchParams, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { Button } from "@nextui-org/react"
import { toast } from "react-toastify"

const schema = yup.object().shape({
    password: yup.string().required().min(6)
})

const resetPassword = async (sentData) => {
    const { data } = await axios.post(
        "http://localhost:5000/api/users/resetPassword",
        sentData,
        { withCredentials: true }
    )

    return data;
}

export default function ResetPassword() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const userId = searchParams.get("id")
    const token = searchParams.get("token")

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema)
    })

    const { mutate, isPending } = useMutation({
        mutationFn: resetPassword,
        onSuccess: (data) => {
            navigate('/')
            toast.success(data.message)
        },
        onError: (data) => {
            toast.error(data.message)
        }
    })

    const onSubmit = (data) => {
        mutate({...data, token, userId})
    } 

    return (
        <div className="h-screen flex justify-center items-center p-4">
            <div className="border-2 border-orange-500 p-6 rounded-lg flex flex-col gap-2 w-[400px]">
                <div className="flex justify-center gap-4 p-2 border-b-1 border-orange-500 items-center">
                    <p className="text-2xl font-bold text-center">New Password</p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-6 w-full"
                >
                    <input
                        className={`p-2 mt-8 rounded-xl border-2 outline-none w-full ${
                         errors.password ? "text-red-500 border-red-500" : "text-white  border-orange-500"
                          }`}
                          type="password"
                          name="password"
                          placeholder="Password"
                          {...register("password")}
                      />
                      {errors.password && (
                        <div className="text-red-500 text-sm">
                            {errors.password.message}
                        </div>
                    )}
                    <Button
                          className="bg-orange-500 rounded-xl py-2 hover:scale-105 duration-300"
                          disabled={isSubmitting || isPending}
                          type="submit"
                      >
                          Submit
                      </Button>
                </form>
            </div>
        </div>
    )
}