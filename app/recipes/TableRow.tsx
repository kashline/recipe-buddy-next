'use client';

import Image from "next/image"
import { useRouter } from 'next/navigation';
import friendifyWords from "../lib/utils/wordfriendifier";
import './TableRow.scss'

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
    const friendlyName = friendifyWords(name)
    return (
        <tr
            key={index}
            className="table-row"
            onClick={handleOnClick}
        >
            <td className="whitespace-nowrap py-3 pl-6 pr-3">
                <button className="tablerowbutton">
                    <div className="flex items-center gap-3">
                    <Image
                        src={image || '/chef-icon.png'}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`Delicious ${friendlyName}`}
                        />
                        <p style={{color: 'black'}}>{friendlyName}</p>
                    </div>
                </button>
            </td>
            <td className="whitespace-nowrap px-3 py-3">
                <p style={{color: 'black'}}>
                    {difficulty}
                </p>
            </td>
            <td className="whitespace-nowrap px-3 py-3">
                <p style={{color: 'black'}}>
                    {length}
                </p>
            </td>
        </tr>
    )
}