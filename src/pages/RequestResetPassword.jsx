import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import { Button } from "@nextui-org/react"
import { toast } from "react-toastify"

const schema = yup.object().shape({
    email: yup.string().email().required()
})

const requestResetPassword = async (sentData) => {
    const { data } = await axios.post("https://shownext-tav7bg80.b4a.run/api/users/requestResetPassword", sentData, { withCredentials: true });
    return data
}

export default function RequestResetPassword() {

    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors, isSubmitting }
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    })

    const { mutate, isPending } = useMutation({
        mutationFn: requestResetPassword,
        onSuccess: () => {
            toast.success("Email sent successfully")
            resetField("email");
        },
        onError: () => {
            toast.error("Network error")
        }
    })

    const onSubmit = (data) => {
        mutate(data);
    }

    return (
        <div className="h-screen flex justify-center items-center p-4">
            <div className="border-2 border-orange-500 p-6 rounded-lg flex flex-col gap-2 w-[400px]">
                <div className="flex justify-center gap-4 p-2 border-b-1 border-orange-500 items-center">
                    <p className="text-2xl font-bold text-center">Reset Password</p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-6 w-full"
                >
                    <input
                        className={`p-2 mt-8 rounded-xl border-2 outline-none w-full ${
                         errors.email ? "text-red-500 border-red-500" : "text-white  border-orange-500"
                          }`}
                          type="email"
                          name="email"
                          placeholder="Email"
                          {...register("email")}
                      />
                      {errors.email && (
                        <div className="text-red-500 text-sm">
                            {errors.email.message}
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