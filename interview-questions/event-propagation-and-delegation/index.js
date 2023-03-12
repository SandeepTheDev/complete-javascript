document
  .querySelector("#grandParent")
  .addEventListener("click", function handleClick(e) {
    console.log("#grandParent Clicked!");
  });

document
  .querySelector("#parent")
  .addEventListener("click", function handleClick(e) {
    console.log("#parent Clicked!");
  });

document
  .querySelector("#child")
  .addEventListener("click", function handleClick(e) {
    console.log("#child Clicked!");
  });

// Event Delegation
document
  .querySelector("#signup")
  .addEventListener("keyup", function handleCategoryClick(e) {
    console.log(e.target.value);
    if (e.target.dataset.uppercase != undefined) {
      e.target.value = e.target.value.toUpperCase();
    }
  });
