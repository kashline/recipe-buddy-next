import friendifywords from "./wordfriendifier";

test("capitalizes the first letter in each word", () => {
  expect(friendifywords("chicken parm")).toBe("Chicken Parm");
});
