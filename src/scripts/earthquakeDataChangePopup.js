/*
References:
- Web Dev Simplified (2019). Build a Popup With JavaScript. [online] 
  Youtube. Available at: https://www.youtube.com/watch?v=MBaw_6cPmAw [Accessed 8 Feb. 2024].
*/


// variables for opening, closing buttons and overlay for change earthquake data modal
const openChangeModalButtons = document.querySelectorAll(
  "[data-change-modal-target]"
);
const closeChangeModalButtons = document.querySelectorAll(
  "[data-change-modal-close-button]"
);
const changeOverlay = document.getElementById("changeEarthquakeDataOverlay");

// When the open button for the change earthquake data modal is clicked, open the modal
openChangeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modalId = button.dataset.changeModalTarget;
    const modal = document.querySelector(modalId);
    openChangeModal(modal);
  });
});

// When the close button for the change earthquake data modal is clicked, close the modal
closeChangeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeChangeModal(modal);
  });
});

// Function to open the modal
function openChangeModal(modal) {
  if (modal == null || changeOverlay == null) return;
  modal.classList.add("active");
  changeOverlay.classList.add("active");
}

// Function to close the modal
function closeChangeModal(modal) {
  if (modal == null || changeOverlay == null) return;
  modal.classList.remove("active");
  changeOverlay.classList.remove("active");
}
