export function handleError(label, error) {
  console.log(label, error);
  if (error instanceof TypeError){
    console.log("TypeError!!");
  }
  else if (error instanceof Null){
    console.log("Please write some words");
  }
}
