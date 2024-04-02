/*
References:
- Web Dev Simplified (2019). Build a Popup With JavaScript. [online] 
  Youtube. Available at: https://www.youtube.com/watch?v=MBaw_6cPmAw [Accessed 8 Feb. 2024].
*/

// Get reference to the audio element
const sirenSound = document.getElementById("sirenSound");

// variables for opening, closing buttons and overlay
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

// When the open button for the modal is clicked, start playing the sound
openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
    // Start playing the sound
    sirenSound.play();
  });
});

// When the close button for the modal is clicked, stop playing the sound
closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
    // Stop playing the sound
    sirenSound.pause();
    sirenSound.currentTime = 0; // Reset the sound to the beginning
  });
});

// Function to open the modal
function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

// Function to close the modal
function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
