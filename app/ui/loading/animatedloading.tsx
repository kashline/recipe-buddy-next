import { CircularProgress } from "@mui/material";

export default function AnimatedLoading({ name }: { name: string }) {
  return (
    <div
      style={{
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 1000,
      }}
    >
      <CircularProgress style={{ paddingRight: "3px" }}></CircularProgress>
      {`Loading ${name}...`}
    </div>
  );
}
