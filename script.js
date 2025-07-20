// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("portfolio-theme") || "light";
    this.init();
  }

  init() {
    this.applyTheme();
    this.setupThemeToggle();
  }

  applyTheme() {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (this.theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(this.theme);
    }
  }

  setTheme(newTheme) {
    this.theme = newTheme;
    localStorage.setItem("portfolio-theme", newTheme);
    this.applyTheme();
    this.updateThemeButton();
  }

  setupThemeToggle() {
    const themeButton = document.getElementById("theme-toggle");
    if (themeButton) {
      themeButton.addEventListener("click", () => {
        this.setTheme(this.theme === "light" ? "dark" : "light");
      });
      this.updateThemeButton();
    }
  }

  updateThemeButton() {
    const themeButton = document.getElementById("theme-toggle");
    const icon = themeButton?.querySelector(".theme-icon");
    if (icon) {
      icon.innerHTML =
        this.theme === "light"
          ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>'
          : '<circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>';
    }
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.isMenuOpen = false;
    this.activeSection = "home";
    this.init();
  }

  init() {
    this.setupMobileMenuToggle();
    this.setupNavigationLinks();
    this.setupScrollSpy();
  }

  setupMobileMenuToggle() {
    const menuToggle = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener("click", () => {
        this.isMenuOpen = !this.isMenuOpen;
        mobileMenu.style.display = this.isMenuOpen ? "block" : "none";

        const icon = menuToggle.querySelector(".menu-icon");
        if (icon) {
          icon.innerHTML = this.isMenuOpen
            ? '<path d="M18 6L6 18M6 6l12 12"></path>'
            : '<path d="M3 12h18M3 6h18M3 18h18"></path>';
        }
      });
    }
  }

  setupNavigationLinks() {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href");
        this.scrollToSection(href);
      });
    });
  }

  scrollToSection(href) {
    const sectionId = href.slice(1);
    this.closeMobileMenu();

    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const targetPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        left: 0,
        behavior: "smooth",
      });
    } else if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu) {
      mobileMenu.style.display = "none";
    }

    const menuToggle = document.getElementById("mobile-menu-toggle");
    const icon = menuToggle?.querySelector(".menu-icon");
    if (icon) {
      icon.innerHTML = '<path d="M3 12h18M3 6h18M3 18h18"></path>';
    }
  }

  setupScrollSpy() {
    const sections = ["home", "about", "projects", "skills", "contact"];

    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionHeight = element.offsetHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            this.setActiveSection(section);
            break;
          }
        }
      }
    });
  }

  setActiveSection(section) {
    if (this.activeSection !== section) {
      this.activeSection = section;

      // Update navigation links
      document.querySelectorAll(".nav-link").forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${section}`) {
          link.classList.add("active", "text-blue-500");
        } else {
          link.classList.remove("active", "text-blue-500");
        }
      });
    }
  }
}

// Typing Animation
class TypingAnimation {
  constructor(element, phrases, options = {}) {
    this.element = element;
    this.phrases = phrases;
    this.options = {
      typingSpeed: 100,
      deletingSpeed: 50,
      pauseDuration: 2000,
      ...options,
    };

    this.currentPhraseIndex = 0;
    this.currentText = "";
    this.isDeleting = false;

    this.start();
  }

  start() {
    this.type();
  }

  type() {
    const currentPhrase = this.phrases[this.currentPhraseIndex];

    if (this.isDeleting) {
      this.currentText = this.currentText.slice(0, -1);
      this.element.textContent = this.currentText;

      if (this.currentText.length === 0) {
        this.isDeleting = false;
        this.currentPhraseIndex =
          (this.currentPhraseIndex + 1) % this.phrases.length;
        setTimeout(() => this.type(), this.options.typingSpeed);
      } else {
        setTimeout(() => this.type(), this.options.deletingSpeed);
      }
    } else {
      this.currentText = currentPhrase.slice(0, this.currentText.length + 1);
      this.element.textContent = this.currentText;

      if (this.currentText.length === currentPhrase.length) {
        // 👇 Add a timeout to start deleting after pauseDuration
        setTimeout(() => {
          this.isDeleting = true;
          this.type(); // 👈 Recursive call to continue animation
        }, this.options.pauseDuration);
      } else {
        setTimeout(() => this.type(), this.options.typingSpeed);
      }
    }
  }
}

// Intersection Observer for animations
class AnimationObserver {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");

            // Animate skill bars
            if (entry.target.classList.contains("skill-bar")) {
              const progress = entry.target.querySelector(".skill-progress");
              const percentage = progress?.dataset.percentage;
              if (progress && percentage) {
                setTimeout(() => {
                  progress.style.width = percentage + "%";
                }, 200);
              }
            }

            // Animate project cards with stagger
            if (entry.target.classList.contains("project-card")) {
              const delay = parseInt(entry.target.dataset.delay) || 0;
              setTimeout(() => {
                entry.target.classList.add("animate-slide-up");
              }, delay);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );
  }

  observe(element) {
    this.observer.observe(element);
  }
}

// Skills Bar Animation
function createSkillBar(skill) {
  return `
    <div class="skill-bar space-y-2 opacity-0" data-aos="fade-up">
      <div class="flex justify-between items-center">
        <span class="text-lg font-medium text-foreground">${skill.name}</span>
        <span class="text-sm text-muted-foreground">${skill.level}</span>
      </div>
      <div class="w-full bg-muted rounded-full h-3">
        <div class="skill-progress h-3 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1500 ease-out" 
             data-percentage="${skill.percentage}" style="width: 0%"></div>
      </div>
    </div>
  `;
}

// Project Card Component
function createProjectCard(project, index) {
  return `
    <div class="project-card bg-card text-card-foreground rounded-lg border shadow-sm overflow-hidden opacity-0" 
         data-delay="${index * 200}">
      <div class="relative">
        <img src="${project.image}" alt="${project.title} project interface" 
             class="w-full h-48 object-cover transition-transform duration-300 hover:scale-105" />
        <div class="absolute top-4 right-4">
          <span class="inline-flex items-center rounded-full bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
            ${project.category}
          </span>
        </div>
      </div>
      
      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-2xl font-bold text-primary">${project.title}</h3>
        </div>
        
        <p class="text-muted-foreground mb-4">${project.description}</p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          ${project.tags
            .map(
              (tag) => `
            <span class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold">
              ${tag}
            </span>
          `
            )
            .join("")}
        </div>
        
        <div class="flex gap-4">
          ${
            project.githubUrl
              ? `
            <button onclick="window.open('${project.githubUrl}', '_blank')" 
                    class="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </button>
          `
              : ""
          }
          ${
            project.liveUrl
              ? `
            <button onclick="window.open('${project.liveUrl}', '_blank')" 
                    class="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              Live Demo
            </button>
          `
              : ""
          }
        </div>
      </div>
    </div>
  `;
}

// Data
const projects = [
  {
    title: "EnrollX",
    description:
      "A comprehensive course registration platform built with modern web technologies. Features full frontend and backend functionality with secure database integration.",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    tags: ["HTML", "CSS", "React", "Node.js", "TSQL"],
    githubUrl: "https://github.com/CodeWiz04/enrollx",
    category: "Full-Stack",
  },
  {
    title: "Maze Runner Game",
    description:
      "A challenging maze runner game developed in Assembly Language, demonstrating low-level programming skills and system programming concepts.",
    image:
      "mazeRunnerProjectPhoto.png",
    tags: ["Assembly", "System Programming"],
    githubUrl: "https://github.com/CodeWiz04/Maze-Runner-Game",
    category: "Assembly",
  },
  {
    title: "Chess Game",
    description:
      "A complete chess game implementing Object-Oriented Programming principles including classes, inheritance, and polymorphism.",
    image:
      "https://images.unsplash.com/photo-1494972688394-4cc796f9e4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    tags: ["C++", "OOP", "Game Logic"],
    githubUrl: "https://github.com/CodeWiz04/Two-Player-Chess-Game",
    category: "C++ OOP",
  },
  {
    title: "Bejeweled Blitz Game",
    description:
      "A fully functional Bejeweled Blitz game developed as a first-semester project while learning Programming Fundamentals.",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    tags: ["C++", "Game Development", "Algorithms"],
    githubUrl: "https://github.com/CodeWiz04/Bejeweled-Blitz-Game",
    category: "C++",
  },
];

const programmingSkills = [
  {
    name: "C++",
    level: "Advanced",
    percentage: 90,
    color: "from-blue-500 to-purple-600",
  },
  {
    name: "JavaScript",
    level: "Intermediate",
    percentage: 80,
    color: "from-green-500 to-blue-500",
  },
  {
    name: "Assembly",
    level: "Intermediate",
    percentage: 70,
    color: "from-purple-500 to-green-500",
  },
  {
    name: "Python",
    level: "Beginner",
    percentage: 60,
    color: "from-blue-500 to-green-500",
  },
];

const webSkills = [
  {
    name: "HTML/CSS",
    level: "Advanced",
    percentage: 85,
    color: "from-purple-500 to-blue-500",
  },
  {
    name: "React",
    level: "Intermediate",
    percentage: 75,
    color: "from-green-500 to-purple-500",
  },
  {
    name: "TSQL/Database",
    level: "Intermediate",
    percentage: 70,
    color: "from-blue-500 to-purple-500",
  },
  {
    name: "Node.js",
    level: "Beginner",
    percentage: 60,
    color: "from-purple-500 to-green-500",
  },
];

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize theme management
  const themeManager = new ThemeManager();

  // Initialize navigation
  const navigationManager = new NavigationManager();

  // Initialize animation observer
  const animationObserver = new AnimationObserver();

  // Initialize typing animation
  const typingElement = document.getElementById("typing-text");
  if (typingElement) {
    const phrases = ["Computer Science Student", "Problem Solver", "CodeWiz"];
    new TypingAnimation(typingElement, phrases);
  }

  // Render projects
  const projectsContainer = document.getElementById("projects-container");
  if (projectsContainer) {
    projectsContainer.innerHTML = projects
      .map((project, index) => createProjectCard(project, index))
      .join("");

    // Observe project cards for animation
    document.querySelectorAll(".project-card").forEach((card) => {
      animationObserver.observe(card);
    });
  }

  // Render skills
  const programmingSkillsContainer =
    document.getElementById("programming-skills");
  const webSkillsContainer = document.getElementById("web-skills");

  if (programmingSkillsContainer) {
    programmingSkillsContainer.innerHTML = programmingSkills
      .map((skill) => createSkillBar(skill))
      .join("");
  }

  if (webSkillsContainer) {
    webSkillsContainer.innerHTML = webSkills
      .map((skill) => createSkillBar(skill))
      .join("");
  }

  // Observe skill bars for animation
  document.querySelectorAll(".skill-bar").forEach((bar) => {
    animationObserver.observe(bar);
  });

  // Observe other sections for animations
  document.querySelectorAll(".animate-on-scroll").forEach((element) => {
    animationObserver.observe(element);
  });

  // Add smooth scrolling behavior
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerHeight = 80;
        const targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

// Contact functions
function openEmail() {
  window.open("mailto:muhammadshafan2004@gmail.com", "_blank");
}

function openPhone() {
  window.open("tel:+923241503924", "_blank");
}

function openGitHub() {
  window.open("https://github.com/CodeWiz04", "_blank");
}

function openLinkedIn() {
  window.open("https://www.linkedin.com/in/muhammad-shafan-7b0053308/", "_blank");
}

function openTwitter() {
  window.open("https://twitter.com/shafan2004", "_blank");
}

function scrollToProjects() {
  const element = document.getElementById("projects");
  if (element) {
    const headerHeight = 80;
    const targetPosition = element.offsetTop - headerHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
}

function scrollToContact() {
  const element = document.getElementById("contact");
  if (element) {
    const headerHeight = 80;
    const targetPosition = element.offsetTop - headerHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
}
