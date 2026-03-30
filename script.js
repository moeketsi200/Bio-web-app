const textElement = document.querySelector('.slideshow-text');
const words = ['Software Engineer', 'Web Designer', 'UI/UX Designer'];
let index = 0;

setInterval(() => {
  textElement.style.opacity = 0;

  setTimeout(() => {
    index = (index + 1) % words.length;
    textElement.textContent = words[index];
    textElement.style.opacity = 1;
  }, 500); // Fade duration
}, 3000); // Change text every 3 seconds

// Scroll reveal for services
window.addEventListener("scroll", () => {
  const cards = document.querySelectorAll(".service-card");
  const triggerBottom = window.innerHeight * 0.85;

  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < triggerBottom) {
      card.classList.add("visible");
    } else {
      card.classList.remove("visible");
    }
  });
});