import Image from "next/image";

export default function Page() {
  return (
    <div
      style={{
        textAlign: "center",
        alignContent: "center",
        color: "white",
      }}
    >
      <h1 style={{ color: "white" }}>Welcome to the lessons page!</h1>
      <p>
        Our dedicated chef LLM&apos;s will guide you through any recipe you can
        think of, but here you can get guidance on a curated list of
        easy-to-start recipes.
      </p>
      <p>Select one below to get started.</p>
      <table>
        <button style={{ height: "100%", color: "white" }}>
          <table style={{ color: "white" }}>
            <td>Easy homemade pizza</td>
            <td>
              <Image
                src={`https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg`}
                alt="Delicious cheese pizza"
                width={500}
                height={500}
              />
            </td>
          </table>
          <td>
            Quick and easy, this recipe will give you a great homecooked meal
            and teach you the basics on making bread and sauces from scratch!
            Substitute for vegitarian, vegan, or gluten free!
          </td>
        </button>
      </table>
      <button style={{ width: "100%", height: "100%" }}>asdoifasoidjf</button>
    </div>
  );
}
