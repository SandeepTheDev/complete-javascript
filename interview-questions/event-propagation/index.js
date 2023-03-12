document.querySelector("#grandparent").addEventListener(
  "click",
  function handleClick() {
    console.log("Grandparent Clicked!");
  },
  false
);

document.querySelector("#parent").addEventListener(
  "click",
  function handleClick(e) {
    e.stopPropagation();
    console.log("Parent Clicked!");
  },
  false
);

document.querySelector("#child").addEventListener(
  "click",
  function handleClick() {
    console.log("Child Clicked!");
  },
  false
);
