/* eslint-disable react/prop-types */
import  { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

import ImageUploader from "./ImageUploader"
import { Button } from "@nextui-org/react"

const schema = yup.object().shape({
  post: yup.string().required()
})

const EditPostComp = ({ post }) => {

  const [files, setFiles] = useState(false)
  
  const navigate = useNavigate()

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
      post: post?.content,
      image: post?.pic
    } 
  })

  const handleFileUpload = async () => {
    const formData = new FormData()
    formData.append('image', files[0])

    try {
      const response = await axios.post(
        "https://shownext1-7sh63dv9.b4a.run/api/image/upload",
        formData,
        { withCredentials: true }
      )
      return response.data.imageUrl
    } catch (error) {
      console.log(error)
    }
  }

  const sendPost = async (sentData) => {
    const { data } = await axios.put(
      `https://shownext1-7sh63dv9.b4a.run/api/posts/${post._id}`,
      sentData,
      { withCredentials: true }
    )
    return data
  }

  const { mutate, isPending } = useMutation({
    mutationFn: sendPost,
    onSuccess: () => {
      navigate(`/post/${post._id}`)
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
    mutate({ content: values.post, pic: values.image })
  }


  return (
      <>
    <div className="h-screen w-screen p-4 sm:p-6 flex gap-3">
      <div
        className="hidden sm:w-1/3 sm:flex"
      >
              
          </div>
      <div
        className="w-full sm:w-1/3"
      >
             <div className="flex flex-col gap-2 p-2 sm:p-4">
      <h1 className="text-center text-2xl mb-4">Edit Your Post</h1>
      <form onSubmit={handleSubmit(doSubmit)}>
        <div
          className="flex flex-col p-2 gap-4"
        >
        <div className="flex justify-center items-center">
          <Controller
            name="image"
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
          <textarea
            id="post"
            name="post"
            className={`mt-3 block w-full h-40 p-2 border-2 rounded-lg focus:outline-none ${
              errors.post ? "border-red-700" : "border-orange-500"
            }`}
            placeholder="Your content goes here..."
            {...register("post")}
          >
          </textarea>
          <div className="flex justify-end mt-3">
            <Button
              className="bg-orange-500"
              type="submit"
              isDisabled={isSubmitting || isPending}
            >
              Post
            </Button>
          </div>
        </div>
      </form>
    </div> 
  </div>
  <div
        className="hidden sm:w-1/3 sm:flex"
      >
              
          </div>
      </div >
  </>
  )
}

export default EditPostComp