// Tilt effect for photo cards only
const photoCards = document.querySelectorAll('#galleryContent .card');
photoCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const rotateX = (deltaY / rect.height) * -20;
    const rotateY = (deltaX / rect.width) * 20;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
});

// Section control
const gallery = document.getElementById('galleryContent');
const videoEditing = document.getElementById('video-editing-section');
const aboutWrap = document.getElementById('about-section');
const contactSection = document.getElementById('contact-section');
const aboutBtn = document.getElementById('loadAbout');
const photoBtn = document.getElementById('showGallery');
const videoBtn = document.getElementById('showVideoEditing');
const contactBtn = document.getElementById('showContact');

const navLinks = document.querySelectorAll('.nav-link, .nav-header');

function clearActiveLinks() {
  navLinks.forEach(link => link.classList.remove('active'));
}

function showLegend(show) {
  const toggle = document.getElementById('legendToggle');
  const panel = document.getElementById('legendPanel');
  if (!toggle) return;

  toggle.style.display = show ? 'flex' : 'none';
  if (!show && panel) panel.style.display = 'none';
}

// About section
aboutBtn.addEventListener('click', e => {
  e.preventDefault();
  gallery.style.display = 'none';
  videoEditing.style.display = 'none';
  contactSection.style.display = 'none';
  aboutWrap.style.display = 'block';

  clearActiveLinks();
  aboutBtn.classList.add('active');
  showLegend(true);
});

// Photography section with fade animation
photoBtn.addEventListener('click', e => {
  e.preventDefault();
  aboutWrap.style.display = 'none';
  videoEditing.style.display = 'none';
  contactSection.style.display = 'none';

  // Reset animation
  gallery.classList.remove('fade');
  void gallery.offsetWidth; // Trigger reflow
  gallery.classList.add('fade');

  gallery.style.display = 'block';

  clearActiveLinks();
  photoBtn.classList.add('active');
  showLegend(false);
});

// Video Editing section
videoBtn.addEventListener('click', e => {
  e.preventDefault();
  aboutWrap.style.display = 'none';
  gallery.style.display = 'none';
  contactSection.style.display = 'none';

  // Reset animation
  videoEditing.classList.remove('fade');
  void videoEditing.offsetWidth; // Trigger reflow
  videoEditing.classList.add('fade');

  videoEditing.style.display = 'block';

  clearActiveLinks();
  videoBtn.classList.add('active');
  showLegend(false);
});

// Contact section
contactBtn.addEventListener('click', e => {
  e.preventDefault();
  aboutWrap.style.display = 'none';
  gallery.style.display = 'none';
  videoEditing.style.display = 'none';

  // Reset animation
  contactSection.classList.remove('fade');
  void contactSection.offsetWidth; // Trigger reflow
  contactSection.classList.add('fade');

  contactSection.style.display = 'block';

  clearActiveLinks();
  contactBtn.classList.add('active');
  showLegend(false);
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show success message
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (in production, this would be a real fetch request)
    setTimeout(() => {
      submitBtn.textContent = 'Message Sent!';
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        this.reset();
      }, 2000);
    }, 1000);
  });
}

// Legend toggle
const toggle = document.getElementById('legendToggle');
const panel = document.getElementById('legendPanel');

if (toggle && panel) {
  toggle.addEventListener('click', e => {
    e.stopPropagation();
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', e => {
    if (!panel.contains(e.target) && e.target !== toggle) {
      panel.style.display = 'none';
    }
  });
}

// Set initial state
clearActiveLinks();
photoBtn.classList.add('active');
showLegend(false);