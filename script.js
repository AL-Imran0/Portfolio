// ====================== Theme Toggle ======================
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

function toggleTheme() {
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("preferredTheme", newTheme);
  updateToggleIcon(newTheme);
  showToast(`Switched to ${newTheme} mode`, "info");
}

themeToggle?.addEventListener("click", toggleTheme);

// ================== Load Preferred Theme ==================
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("preferredTheme") || "light";
  root.setAttribute("data-theme", savedTheme);
  updateToggleIcon(savedTheme);
  updateYear();
});

function updateYear() {
  const year = new Date().getFullYear();
  const yearElement = document.getElementById("year");
  if (yearElement) yearElement.textContent = year;
}

// ================ Toggle Icon & Label =====================
function updateToggleIcon(theme) {
  const icon = document.getElementById("theme-icon");
  const label = document.getElementById("theme-label");
  if (icon) icon.textContent = theme === "light" ? "🌞" : "🌙";
  if (label) label.textContent = theme === "light" ? "Light Mode" : "Dark Mode";
}

// ==================== Smooth Scroll =======================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}
initSmoothScroll();

// ================ Active Nav Link Highlight ===============
function highlightActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const link = document.querySelector(`nav a[href="#${section.id}"]`);
    if (
      link &&
      section.offsetTop <= scrollPos &&
      section.offsetTop + section.offsetHeight > scrollPos
    ) {
      document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
      link.classList.add("active");
    }
  });
}
window.addEventListener("scroll", highlightActiveNavLink);

// ==================== Contact Form ========================
const form = document.getElementById("contact-form");

function validateEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function handleSubmit(e) {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    showToast("Please fill in all fields.", "error");
    return;
  }

  if (!validateEmail(email)) {
    showToast("Please enter a valid email address.", "error");
    return;
  }

  showToast(`Thank you ${name}, your message has been sent!`, "success");
  form.reset();
}

form?.addEventListener("submit", handleSubmit);

// ===================== Toast Notification ======================
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", () => toast.remove());
  }, 3000);
}

// =================== Scroll to Top Button =====================
function createScrollTopButton() {
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.id = "scrollTopBtn";
  scrollTopBtn.innerHTML = "⬆";
  scrollTopBtn.title = "Back to top";
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 40px;
    right: 40px;
    padding: 0.75rem 1rem;
    font-size: 1.2rem;
    border-radius: 50%;
    background: var(--primary);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
    z-index: 1000;
  `;
  document.body.appendChild(scrollTopBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.opacity = 1;
      scrollTopBtn.style.pointerEvents = "auto";
    } else {
      scrollTopBtn.style.opacity = 0;
      scrollTopBtn.style.pointerEvents = "none";
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
createScrollTopButton();
