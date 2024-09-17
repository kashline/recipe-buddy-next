"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import friendifyWords from "../lib/utils/wordfriendifier";
import "./TableRow.scss";

export default function TableRow({
  name,
  image,
  difficulty,
  length,
  index,
}: {
  name: string;
  image: string;
  difficulty: string;
  length: string;
  index: number;
}) {
  const router = useRouter();
  const handleOnClick = () => {
    router.push(`/recipes/${name}`);
  };
  const friendlyName = friendifyWords(name);
  return (
    <tr key={index} className="table-row">
      <td
        style={{
          height: "100px",
        }}
      >
        <div
          style={{
            height: "100%",
            margin: "auto",
            paddingTop: "10px",
          }}
        >
          <button
            className="tablerowbutton"
            style={{
              height: "100%",
              width: "100%",
            }}
            onClick={handleOnClick}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                margin: "auto",
              }}
            >
              <Image
                src={image || "/chef-icon.png"}
                style={{
                  marginRight: 2,
                  borderRadius: 9999,
                  position: "relative",
                }}
                width={50}
                height={100}
                alt={`Delicious ${friendlyName}`}
              />
              <p
                style={{
                  color: "black",
                  margin: "auto",
                }}
              >
                {friendlyName}
              </p>
            </div>
          </button>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <p style={{ color: "black" }}>{difficulty}</p>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <p style={{ color: "black" }}>{length}</p>
      </td>
    </tr>
  );
}
