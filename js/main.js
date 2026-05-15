/* CareerBeam — Main JS */

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('img').forEach(function(img) {
    function handleError() {
      if (this.classList.contains('testi-avatar')) {
        /* Replace broken avatar with icon placeholder */
        var ph = document.createElement('div');
        ph.className = 'testi-avatar-ph';
        ph.innerHTML = '<i class="fas fa-user"></i>';
        this.parentNode.replaceChild(ph, this);
      } else {
        this.style.display = 'none';
      }
    }
    img.addEventListener('error', handleError);
    if (img.complete && img.naturalWidth === 0) handleError.call(img);
  });
});

const hamburger = document.getElementById('hamburger');
const sidebar   = document.getElementById('sidebar');
const overlay   = document.getElementById('sidebarOverlay');
const closeBtn  = document.getElementById('sidebarClose');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', openSidebar);
if (closeBtn)  closeBtn.addEventListener('click', closeSidebar);
if (overlay)   overlay.addEventListener('click', closeSidebar);

/* ── Lead Form Modal ─────────────────────────────────── */
function openLeadForm() {
  const modal = document.getElementById('leadModal');
  if (!modal) return;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  // reset to form view
  document.getElementById('leadFormWrap').style.display = 'block';
  document.getElementById('successWrap').style.display  = 'none';
}
function closeLeadForm() {
  const modal = document.getElementById('leadModal');
  if (!modal) return;
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

const leadModal = document.getElementById('leadModal');
if (leadModal) {
  leadModal.addEventListener('click', function(e) {
    if (e.target === leadModal) closeLeadForm();
  });
}

function submitLeadForm(e) {
  e.preventDefault();
  document.getElementById('leadFormWrap').style.display = 'none';
  document.getElementById('successWrap').style.display  = 'block';
}

/* ── Read More for What is CareerBeam (mobile only) ─── */
(function() {
  var p   = document.getElementById('whatIsText');
  var btn = document.getElementById('readMoreBtn');
  if (!p || !btn) return;
  if (window.innerWidth <= 768) {
    p.classList.add('clamped');
    btn.style.display = 'inline-block';
    btn.addEventListener('click', function() {
      var collapsed = p.classList.toggle('clamped');
      btn.textContent = collapsed ? 'Read More' : 'Read Less';
    });
  }
})();

/* ── Testimonial carousel dots (mobile) ─────────────── */
(function() {
  var grid = document.querySelector('.testi-grid');
  var dots = document.querySelectorAll('.testi-dot');
  if (!grid || !dots.length) return;

  function updateDot() {
    var cardWidth = grid.querySelector('.testi-card').offsetWidth;
    var idx = Math.round(grid.scrollLeft / cardWidth);
    dots.forEach(function(d, i) { d.classList.toggle('active', i === idx); });
  }

  grid.addEventListener('scroll', updateDot, { passive: true });

  dots.forEach(function(dot, i) {
    dot.addEventListener('click', function() {
      var cardWidth = grid.querySelector('.testi-card').offsetWidth;
      grid.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
    });
  });
})();

/* ── Contact form ────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.btn');
    btn.textContent = 'Message Sent!';
    btn.style.background = '#16a34a';
    setTimeout(() => {
      btn.textContent = 'SUBMIT NOW';
      btn.style.background = '';
      this.reset();
    }, 3000);
  });
}
