/* eslint-disable react/prop-types */
import { useState } from "react"
import { Button } from "@nextui-org/react"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, Controller } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import ImageUploader from "../PostUploadComps/ImageUploader"

const schema = yup.object().shape({
    username: yup.string().required().min(3),
    bio: yup.string().max(250)
})

export const EditProfileComp = ({ user }) => {

    console.log(user)

    const [files, setFiles] = useState(false)

    const navigate = useNavigate();

    const {
    control,
    register,
    handleSubmit,
    //resetField , use it to reset the field
    formState: {errors, isSubmitting}
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      username: user?.username,
        avatar: user?.avatar,
      bio: user?.bio,
    } 
  })
    
    const handleFileUpload = async () => {
    const formData = new FormData()
    formData.append('image', files[0])

    try {
      const response = await axios.post(
        "http://localhost:5000/api/image/upload",
        formData,
        { withCredentials: true }
      )
      return response.data.imageUrl
    } catch (error) {
      console.log(error)
    }
    }
    
    const sendProfile = async (sentData) => {
        const { data } = await axios.put(
            `http://localhost:5000/api/users/${user._id}`,
            sentData,
            { withCredentials: true }
        )
        return data
    }

    const { mutate, isPending } = useMutation({
        mutationFn: sendProfile,
        onSuccess: () => {
            navigate(`/profile/${user._id}`)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const doSubmit = async values => {
        if (files.length > 0) {
            const newUrl = await handleFileUpload(files)
            if (newUrl) {
                values.image = newUrl
            }
        }
        mutate({ username: values.username, avatar: values.avatar, bio: values.bio })
    }
    
    return (
        <div className="min-h-screen flex justify-center p-4">
          <div className="flex flex-col gap-4 p-2 rounded-lg w-[400px]">
                <form onSubmit={handleSubmit(doSubmit)}>
                    <div className="flex flex-col p-2 gap-4">
                        <div className="flex flex-col justify-center items-center rounded-full">
                            <p className="text-xl mb-2">Avatar</p>
                            <Controller
                                name="avatar"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <ImageUploader
                                        onFieldChange={field.onChange}
                                        setFiles={setFiles}
                                        imageUrl={field.value}
                                    />
                                )}
                            />
                        </div>
                        <p className="text-xl mt-4">Username</p>
                        <input
                            className={`p-2 rounded-xl border-2 outline-none w-full ${
                                errors.username ? "text-red-500 border-red-500" : "text-white border-orange-500"
                            }`}
                            type="text"
                            name="username"
                            placeholder="Username"
                            {...register("username")}
                        />
                        <p className="text-xl mt-2">Bio</p>
                        <textarea
                            id="bio"
                            name="bio"
                            className={`block w-full h-40 p-2 border-2 rounded-lg focus:outline-none ${
                                errors.bio ? "border-red-700" : "border-orange-500"
                            }`}
                            placeholder="Your Bio... (maximum 250 characters)"
                            {...register("bio")}
                        >
                        </textarea>
                        <div className="flex justify-end mt-3">
                            <Button
                                className="bg-orange-500"
                                type="submit"
                                isDisabled={isSubmitting || isPending}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
              </form>
          </div>
      </div>
    )
}