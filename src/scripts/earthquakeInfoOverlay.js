/*
References:
- Web Dev Simplified (2019). Build a Popup With JavaScript. [online] 
  Youtube. Available at: https://www.youtube.com/watch?v=MBaw_6cPmAw [Accessed 8 Feb. 2024].
*/

// variables for opening, closing buttons and overlay
const openInfoModalButtons = document.querySelectorAll(
  "[data-info-modal-target]"
);
const closeInfoModalButtons = document.querySelectorAll(
  "[data-info-close-button]"
);
const infoOverlay = document.getElementById("earthquakeInfoOverlay");

// When the open button for the modal is clicked, open the modal
openInfoModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.infoModalTarget);
    openInfoModal(modal);
  });
});

// When the close button for the modal is clicked, close the modal
closeInfoModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeInfoModal(modal);
  });
});

// Function to open the modal
function openInfoModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  infoOverlay.classList.add("active");
}

// Function to close the modal
function closeInfoModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  infoOverlay.classList.remove("active");
}
