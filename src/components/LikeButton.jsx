/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/react"
import { HeartIcon } from "lucide-react"

const LikeButton = ({ liked, action, isPending }) => {

  return (
    <Button
      isIconOnly
      className="text-red-500 data-[hover]:bg-slate-200"
      radius="full"
      variant="light"
      isDisabled={isPending}
      onClick={action}
    >
      <HeartIcon
        className={liked ? "[&>path]:stroke-transparent" : ""}
        fill={liked ? "currentColor" : "none"}
        size={20}
      />
    </Button>
  )
}

export default LikeButton