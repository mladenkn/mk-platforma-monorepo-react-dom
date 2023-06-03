//@ts-ignore
if (typeof window !== "undefined") {
  //@ts-ignore
  console.log(typeof window)
  throw new Error("Should be used only on server")
}
