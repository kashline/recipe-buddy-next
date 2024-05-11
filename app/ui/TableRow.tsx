'use client';

import Image from "next/image"
import { useRouter } from 'next/navigation';

export default function TableRow(
    {
        name,
        image,
        difficulty,
        length,
        index
    }: {
     name: string,
     image: string,
     difficulty: string,
     length: string,
     index: number
    })
    {
    const router = useRouter()
    const handleOnClick = () =>{
        router.push(`/recipes/${name}`)
    }
    return (
    <tr
        key={index}
        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
        onClick={handleOnClick}
    >
        <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
            <Image
                src={image || '/chef-icon.png'}
                className="mr-2 rounded-full"
                width={28}
                height={28}
                alt={`Delicious ${name}`}
                />
                <p>{name}</p>
        </div>
        </td>
        <td className="whitespace-nowrap px-3 py-3">
            {difficulty}
        </td>
        <td className="whitespace-nowrap px-3 py-3">
            {length}
        </td>
    </tr>
    )
}