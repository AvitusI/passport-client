/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { toast } from "react-toastify"
import { Button } from "@nextui-org/react"
import { queryClient } from "../main"

const schema = yup.object().shape({
  comment: yup.string().required()
})

export const EditCommentComp = ({ comment }) => {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        //resetField , use it to reset the field
        formState: {errors, isSubmitting}
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
        defaultValues: {
            comment: comment?.content,
        } 
    })

    const sendComment = async (sentData) => {
        const { data } = await axios.put(
            `http://localhost:5000/api/comments/${comment._id}`,
            sentData,
            { withCredentials: true }
        )
        return data
    }

    const { mutate, isPending } = useMutation({
        mutationFn: sendComment,
        onSuccess: () => {
            queryClient.invalidateQueries(['post', comment.postId], { refetchActive: true })
            navigate(`/post/${comment.postId}`)
        },
        onError: (error) => {
            toast.error(error.response.data.message)
        }
    })
    
    const doSubmit = async values => {
        mutate({ content: values.comment })
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
                <h1 className="text-center text-2xl mb-4">Edit Your Comment</h1>
                <form onSubmit={handleSubmit(doSubmit)}>
                    <div
                        className="flex flex-col p-2 gap-4"
                    >
                        <textarea
                            id="comment"
                            name="post"
                            className={`mt-3 block w-full h-40 p-2 border-2 rounded-lg focus:outline-none ${
                                errors.comment ? "border-red-700" : "border-orange-500"
                            }`}
                            placeholder="Your content goes here..."
                            {...register("comment")}
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
        <div
            className="hidden sm:w-1/3 sm:flex"
         >
              
          </div>
      </div >
  </>
  )
}