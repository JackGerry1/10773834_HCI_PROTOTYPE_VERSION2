/*
References:
- Web Dev Simplified (2019). Build a Popup With JavaScript. [online] 
  Youtube. Available at: https://www.youtube.com/watch?v=MBaw_6cPmAw [Accessed 8 Feb. 2024].
*/

// variables for opening, closing buttons and overlay
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

// when the open button for the modal is clicked, find any corresponding elements
// with the id of #modal and open them
openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

// when a modal is open and the close button is clicked close whatever modal is currently opened/active
closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

// opens the modal and sets an active class to reveal it, if it can't find a modal return without opening the modal
function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

// closes the modal and remove an active class from the modal elements to hide it 
function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
