"use client";

const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  console.log(event);
};

export default function Page() {
  return (
    <div style={{ width: "100%", height: 500 }}>
      <h1
        style={{
          color: "white",
          textAlign: "center",
          paddingTop: 50,
          fontSize: 25,
        }}
      >
        Choose a buddy
      </h1>
      <div
        style={{
          height: 200,
          paddingLeft: 100,
          paddingRight: 100,
          marginTop: 20,
        }}
      >
        <button
          style={{
            border: "solid",
            borderColor: "gray",
            borderRadius: 10,
            width: "100%",
            height: "100%",
          }}
          onClick={onClick}
        >
          <div
            style={{
              border: "solid",
              borderColor: "white",
              height: "80%",
              margin: 20,
            }}
          >
            <h1 style={{ color: "white" }}>Chef MacAllister</h1>
          </div>
        </button>
      </div>
    </div>
  );
}
