import Link from "next/link";

/**
 * Delete recipe landing page.  User is redirected here after successfully deleting a recipe.
 * @returns JSX.Element
 */
export default function Page() {
  return (
    <div>
      <div className="flex">
        <p className="text-lavendar-blush mx-auto">
          Recipe deleted successfully.
        </p>
      </div>
      <div className="flex">
        <Link
          className="text-lavendar-blush border-2 border-gray-500 w-fit px-5 rounded-md hover:border-non-photo-blue h-8 mx-auto"
          href={"/recipes"}
        >
          Return
        </Link>
      </div>
    </div>
  );
}
