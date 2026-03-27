document.addEventListener('DOMContentLoaded', () => {

  // Slideshow text
  const textElement = document.querySelector('.slideshow-text');
  if (textElement) {
    const words = ['Aspiring Web Designer', 'Developer'];
    let index = 0;

    setInterval(() => {
      textElement.style.opacity = 0;

      setTimeout(() => {
        index = (index + 1) % words.length;
        textElement.textContent = words[index];
        textElement.style.opacity = 1;
      }, 500); // Fade duration
    }, 3000); // Change text every 3 seconds
  }

  // Scroll reveal and active nav link
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");
  const cards = document.querySelectorAll(".service-card");

  const handleScroll = () => {
    const scrollY = window.pageYOffset;
    const triggerBottom = window.innerHeight * 0.85;

    // Scroll reveal for cards
    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < triggerBottom) {
        card.classList.add("visible");
      } else {
        card.classList.remove("visible");
      }
    });

    // Active nav link highlighting
    let currentSectionId = 'home';
    sections.forEach(current => {
      const sectionTop = current.offsetTop - 100; // Offset for sticky nav
      if (scrollY >= sectionTop) {
        currentSectionId = current.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSectionId) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Run on page load to set initial state
});