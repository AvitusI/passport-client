/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/react"
import { Bookmark } from "lucide-react"

const BookmarkButton = ({ bookmarked, action, isPending }) => {

  return (
    <Button
      isIconOnly
      className="text-black data-[hover]:bg-slate-200"
      radius="full"
      variant="light"
      isDisabled={isPending}
      onClick={action}
    >
      <Bookmark
        className={bookmarked ? "[&>path]:stroke-transparent" : ""}
        fill={bookmarked ? "currentColor" : "none"}
        size={20}
      />
    </Button>
  )
}

export default BookmarkButton