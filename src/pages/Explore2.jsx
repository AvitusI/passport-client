import { Button, Image } from "@nextui-org/react"
import { Card, CardBody, CardFooter } from "@nextui-org/react"
import { Heart, StarIcon, EyeIcon } from "lucide-react" 

const Explore2 = () => {
  return (
      <div className="bg-black w-full min-h-screen flex justify-center items-center gap-3">
          {/*Card*/}
          <div className="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
              {/*Image*/}
              <div className="w-full">
                  <Image src="/images/honey.jpg" className="h-40 object-cover rounded-xl w-full" />
                  </div>
              <div className="p-2">
                  {/*Heading*/}
                  <h2 className="font-bold text-lg text-black">Heading</h2>
                  {/*Description*/}
                  <p className="text-sm text-gray-600">
                      Lorem ipsum hhhar hhhun bbah nsggs aga gatarva hahatt agafrraa yhqyy gagt gatra hyar aee gatg afra gtra gagr
                  </p>
              </div>
              {/*CTA*/}
              <div className="m-2">
                  <a role="button" href="#" className="text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700" >
                      Learn More
                  </a>
              </div>
          </div>

          <Card className="py-4 w-50 bg-gray-200 text-black transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
              {/*
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">Daily Mix</p>
                    <small className="text-default-500">12 Tracks</small>
                    <h4 className="font-bold text-large">Frontend Radio</h4>
              </CardHeader>
              */}
                <CardBody className="overflow-visible py-2">
                    <Image
                        alt="Card background"
                        className="size-40 object-cover rounded-xl"
                        src="/images/honey.jpg"
                        width="full"
                    />
              </CardBody>
              <CardFooter>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                      See Profile
                  </Button>
              </CardFooter>
          </Card>
          
          <div className="card">
        <Image
          src="/images/honey.jpg" alt="honey"
          className="w-full h-full object-cover rounded-bl-none rounded-br-none"
        />

        <div className="p-5 flex flex-col gap-3">
          {/*badge*/}
          <div className="flex items-center gap-2">
            <span className="badge">stock ready</span>
            <span className="badge">official store</span>
          </div>

          {/*product title*/}
          <h2 className="product-title" title="Sweet honey">
            Sweet honey 
          </h2>

          {/*product-price*/}
          <div>
            <span className="text-xl font-bold">
              Tsh 5000
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm line-through opacity-50">
                Tsh 7000
              </span>
              <span className="discount-percent">
                save 20%
              </span>
            </div>
          </div>

          {/*product  rating*/}
          <span className="flex items-center mt-1">
            <StarIcon fill="gold" className="text-gold" />
            <StarIcon fill="gold" className="text-gold"/>
            <StarIcon fill="gold" className="text-gold"/>
            <StarIcon fill="gold" className="text-gold"/>
            <StarIcon fill="gold" className="text-gold" />
            <span className="text-xs ml-2 text-gray-500">
              20k reviews
            </span>
          </span>

          {/*procuct action button*/}
          <div className="mt-5 flex gap-2">
            <button className="button-primary">
              Add to cart
            </button>
            <button className="button-icon">
              <Heart className="opacity-50"/>
            </button>
            <button className="button-icon">
              <EyeIcon className="opacity-50"/>
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Explore2