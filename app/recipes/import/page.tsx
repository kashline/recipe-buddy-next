"use client";

import * as React from "react";

/**
 * WIP
 * @returns React.JSX.Element
 */
export default function Page() {
  const [url, setUrl] = React.useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  React.useEffect(() => {});
  return (
    <div>
      <div className="flex">
        <label className="text-lavendar-blush pr-2">Import URL:</label>
        <input className="h-6" name="importUrl" onChange={handleChange} />
      </div>
      <button className="shadow-white">Submit</button>
    </div>
  );
}
