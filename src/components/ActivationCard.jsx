import { MailCheck } from "lucide-react";

const ActivationCard = () => {
  return (
      <div className="border-2 border-orange-500 p-4 rounded-lg flex flex-col gap-2">
          <div className="flex justify-center gap-4 p-2 border-b-1 border-orange-500 items-center">
              <MailCheck />
              <p className="text-2xl font-bold">Email Sent</p>
          </div>
          <div className="p-2 mt-1">
              <p className="mb-1">
                  We have sent an activation link to your Gmail account.
              </p>
              <p>
                  Use it to activate your account.
              </p>
          </div>
    </div>
  )
}

export default ActivationCard