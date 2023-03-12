/**
 * Instead of adding individual event handler on each category: laptops,
 * cameras, televisions and etc.
 *
 * Event Delegations says that add single event handler on the parent element
 * and takes a advantage of event bubbling because event is going to propagate
 * from target element to its parent element.
 */

document
  .querySelector("#category")
  .addEventListener("click", function handleCategoryClick(e) {
    window.location.href = `/${e.target.id}`;
  });

document
  .querySelector("#signup")
  .addEventListener("keyup", function handleInputChange(e) {
    if (e.target.dataset.uppercase !== undefined) {
      e.target.value = e.target.value.toUpperCase();
    }
  });
