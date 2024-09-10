/* eslint-disable react/prop-types */
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Tooltip, Image } from "@nextui-org/react"
import { ImagePlus } from 'lucide-react'

function ImageUploader({ imageUrl, onFieldChange, setFiles }) {
    
    const convertFileToUrl = file => URL.createObjectURL(file)

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles);
        onFieldChange(convertFileToUrl(acceptedFiles[0]))
    }, [])

    const {
        getRootProps,
        getInputProps
    } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
        },
        maxSize:  4  *  1024  *  1024
    })

  return (
      <div
          className="flex justify-center items-center border border-orange-500 border-dashed rounded-md focus:outline-none size-40"
          {...getRootProps()}
      >
          <input
              {...getInputProps}
              id='image'
              className="cursor-pointer hidden"
          />
          {imageUrl ? (
              <Tooltip content="Change the image">
                  <Image
                      src={imageUrl}
                      alt="avatar"
                      className="size-40 object-cover"
                  />
              </Tooltip>
          ) : (
                  <div className="flex flex-col items-center pt-2 p-4 gap-3">
                      <p className="text-sm text-center">Drag &apos;n&apos; drop, or click to select image files</p>
                      <span className="text-xs text-center text-gray-400">(max size - 4 Mb)</span>
                      <ImagePlus size={36} />
                  </div>
          )}
          
    </div>
  )
}

export default ImageUploader