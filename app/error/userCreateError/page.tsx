import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Error creating local user! Please try again.</h1>
      <Link href="/">Return home</Link>
    </div>
  );
}
