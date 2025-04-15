import Image from "next/image";

/**
 * Displays a comment with the author's picture and comment date
 * @param param0
 * @returns React.JSX.Element
 */
export default function CommentWindow({
  data,
  props,
}: {
  data: any;
  props?: any;
}) {
  const parsedDate = new Date(Date.parse(data.updatedAt));
  const date = `${parsedDate.getHours()}:${parsedDate.getMinutes()} ${parsedDate.getMonth() + 1}/${parsedDate.getDate()} ${parsedDate.getFullYear()}`;
  return (
    <div className="mb-14 mx-auto">
      <div className="flex">
        <div>
          <Image
            src={data.User.image}
            alt="profile image"
            width={50}
            height={50}
          />
          <p className="text-lavendar-blush text-sm opacity-50">
            {data.User.name}
          </p>
        </div>
        <div className="w-full my-auto mx-auto">
          <p>{data.comment}</p>
        </div>
      </div>
      <div className="float-right opacity-50 text-xs">{date}</div>
      <hr
        style={{
          height: "1px",
          border: "none",
          backgroundColor: "gray",
          width: "100%",
        }}
        className="py-0 my-0 mt-4"
      />
    </div>
  );
}
