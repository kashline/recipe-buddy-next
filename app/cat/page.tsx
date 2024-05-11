import Image from "next/image"

export default function Cat(){
    return(
          <Image
            src="/hobbes-chair.jpg"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Images of the best food you could imagine"
          />
    )
}