// ══════════════════════════════════════════
// main.js — Interactivity & Animations
// ══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  /* ────────────────────────────────────
     CURSOR
  ──────────────────────────────────── */
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
    // Ring follows with slight lag via CSS transition on left/top
    ring.style.left = mouseX + 'px';
    ring.style.top  = mouseY + 'px';
  });

  function setCursorHover(on) {
    cursor.classList.toggle('hovering', on);
    ring.classList.toggle('hovering', on);
  }

  function bindHover(selector) {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('mouseenter', () => setCursorHover(true));
      el.addEventListener('mouseleave', () => setCursorHover(false));
    });
  }
  bindHover('a, button, .news-card, .team-card, .gallery-item, .stat-item, .contact-block');

  /* ────────────────────────────────────
     PAGE NAVIGATION
  ──────────────────────────────────── */
  window.showPage = function(id, linkEl) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    const page = document.getElementById('page-' + id);
    if (page) page.classList.add('active');
    if (linkEl) linkEl.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (id === 'team')    buildTeamGrid();
    if (id === 'gallery') buildGallery('all');
    if (id === 'home')    startCounters();

    // Close mobile nav
    document.querySelector('.nav-links').classList.remove('open');
    return false;
  };

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.toggle('open');
    });
  }

  /* ────────────────────────────────────
     HERO BUILDING — MOUSE PARALLAX
  ──────────────────────────────────── */
  const heroVisual   = document.getElementById('heroVisual');
  const heroBuilding = document.getElementById('heroBuilding');
  const parallaxBg   = document.getElementById('parallaxBg');

  if (heroVisual) {
    heroVisual.addEventListener('mousemove', e => {
      const rect = heroVisual.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / rect.width;   // -0.5 … +0.5
      const dy   = (e.clientY - cy) / rect.height;

      // Main building: gentle float
      if (heroBuilding) {
        heroBuilding.style.transform =
          `translate(${dx * 18}px, ${dy * 12}px) rotate(${dx * 1.2}deg)`;
      }

      // Background layer moves opposite (parallax depth)
      if (parallaxBg) {
        parallaxBg.style.transform =
          `translate(${-dx * 28}px, ${-dy * 18}px)`;
      }

      // Building tilt via SVG group
      const buildingMain = document.querySelector('.building-main');
      if (buildingMain) {
        buildingMain.style.transform =
          `perspective(800px) rotateY(${dx * 8}deg) rotateX(${-dy * 5}deg)`;
      }

      // Float elements drift
      document.querySelectorAll('.float-rect').forEach((el, i) => {
        const factor = (i % 2 === 0 ? 1 : -1) * (i + 1);
        el.style.transform = `translate(${dx * 12 * factor}px, ${dy * 8 * factor}px)`;
      });
      document.querySelectorAll('.float-dot').forEach((el, i) => {
        const factor = i % 2 === 0 ? -1.5 : 1.5;
        el.style.transform = `translate(${dx * 15 * factor}px, ${dy * 10 * factor}px)`;
      });

      // Window glow: windows closest to cursor brighten
      document.querySelectorAll('#heroBuildingSvg .win').forEach(win => {
        const wr = win.getBoundingClientRect();
        const wdx = (wr.left + wr.width/2) - e.clientX;
        const wdy = (wr.top  + wr.height/2) - e.clientY;
        const dist = Math.sqrt(wdx*wdx + wdy*wdy);
        const bright = Math.max(0, 1 - dist / 200);
        const base = parseInt(win.getAttribute('fill').replace('#',''), 16);
        const boost = Math.round(bright * 40);
        win.style.filter = boost > 5
          ? `brightness(${1 + bright * 0.8})`
          : 'brightness(1)';
      });
    });

    heroVisual.addEventListener('mouseleave', () => {
      if (heroBuilding) heroBuilding.style.transform = '';
      if (parallaxBg)   parallaxBg.style.transform = '';
      const buildingMain = document.querySelector('.building-main');
      if (buildingMain) buildingMain.style.transform = '';
      document.querySelectorAll('.float-rect, .float-dot').forEach(el => {
        el.style.transform = '';
      });
      document.querySelectorAll('#heroBuildingSvg .win').forEach(w => {
        w.style.filter = '';
      });
    });
  }

  /* ────────────────────────────────────
     TILT CARDS (News, Contact)
  ──────────────────────────────────── */
  function initTiltCards() {
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect  = card.getBoundingClientRect();
        const cx    = rect.left + rect.width  / 2;
        const cy    = rect.top  + rect.height / 2;
        const dx    = (e.clientX - cx) / (rect.width  / 2);
        const dy    = (e.clientY - cy) / (rect.height / 2);
        const tiltX = -dy * 6;
        const tiltY =  dx * 6;

        card.style.transform =
          `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(4px)`;
        card.style.transition = 'transform 0.08s linear, box-shadow 0.08s linear';

        // Subtle highlight follow
        const lightX = ((e.clientX - rect.left) / rect.width)  * 100;
        const lightY = ((e.clientY - rect.top)  / rect.height) * 100;
        card.style.background =
          `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.04) 0%, transparent 70%)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform  = '';
        card.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.5s';
        card.style.background = '';
      });
    });
  }

  /* ────────────────────────────────────
     GALLERY ITEMS — 3D TILT
  ──────────────────────────────────── */
  function initGalleryTilt() {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('mousemove', e => {
        const rect = item.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = (e.clientX - cx) / (rect.width  / 2);
        const dy   = (e.clientY - cy) / (rect.height / 2);

        item.style.transform =
          `perspective(700px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg) translateY(-6px)`;
        item.style.transition = 'transform 0.08s linear, box-shadow 0.08s, border-color 0.08s';

        // SVG building reacts to mouse
        const svg = item.querySelector('svg');
        if (svg) {
          const bldg = svg.querySelector('.proj-building');
          if (bldg) {
            bldg.style.transform = `translate(${dx * 6}px, ${dy * 4}px)`;
            bldg.style.transition = 'transform 0.15s ease-out';
          }
          const trees = svg.querySelectorAll('.proj-tree');
          trees.forEach((t, i) => {
            const dir = i % 2 === 0 ? 1 : -1;
            t.style.transform = `translate(${dx * 10 * dir}px, ${dy * 5}px)`;
            t.style.transition = 'transform 0.2s ease-out';
          });
          const wins = svg.querySelectorAll('.proj-win, .proj-wins rect');
          wins.forEach(w => {
            const dist = Math.abs(dx) + Math.abs(dy);
            w.style.filter = `brightness(${1 + dist * 0.3})`;
          });
          const roof = svg.querySelector('.proj-roof');
          if (roof) {
            roof.style.transform = `translate(${dx * 3}px, ${dy * 2}px)`;
            roof.style.transition = 'transform 0.2s ease-out';
          }
        }
      });

      item.addEventListener('mouseleave', () => {
        item.style.transform  = '';
        item.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s, border-color 0.4s';

        const svg = item.querySelector('svg');
        if (svg) {
          const bldg = svg.querySelector('.proj-building');
          if (bldg) { bldg.style.transform = ''; bldg.style.transition = 'transform 0.5s ease-out'; }
          svg.querySelectorAll('.proj-tree').forEach(t => { t.style.transform = ''; t.style.transition = 'transform 0.5s ease-out'; });
          svg.querySelectorAll('.proj-win, .proj-wins rect').forEach(w => { w.style.filter = ''; });
          const roof = svg.querySelector('.proj-roof');
          if (roof) { roof.style.transform = ''; }
        }
      });
    });
  }

  /* ────────────────────────────────────
     TEAM CARDS — PORTRAIT PARALLAX
  ──────────────────────────────────── */
  function initTeamTilt() {
    document.querySelectorAll('.team-card').forEach(card => {
      const portrait = card.querySelector('.team-portrait');

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const dx   = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
        const dy   = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);

        card.style.transform =
          `perspective(800px) rotateY(${dx * 5}deg) rotateX(${-dy * 3}deg)`;
        card.style.transition = 'transform 0.1s linear';

        if (portrait) {
          const svg = portrait.querySelector('svg');
          if (svg) {
            svg.style.transform = `translate(${dx * 10}px, ${dy * 8}px) scale(1.06)`;
            svg.style.transition = 'transform 0.15s ease-out';
          }
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform  = '';
        card.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)';
        if (portrait) {
          const svg = portrait.querySelector('svg');
          if (svg) { svg.style.transform = ''; svg.style.transition = 'transform 0.6s ease-out'; }
        }
      });
    });
  }

  /* ────────────────────────────────────
     COUNTER ANIMATION
  ──────────────────────────────────── */
  let countersStarted = false;
  function startCounters() {
    if (countersStarted) {
      // Reset and redo
      document.querySelectorAll('.stat-num').forEach(el => {
        el.textContent = '0';
      });
      countersStarted = false;
    }
    setTimeout(() => {
      document.querySelectorAll('.stat-num[data-target]').forEach(el => {
        const target   = parseInt(el.getAttribute('data-target'));
        const duration = 1800;
        const start    = performance.now();

        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = target;
        }
        requestAnimationFrame(tick);
      });
      countersStarted = true;
    }, 400);
  }

  /* ────────────────────────────────────
     BUILD TEAM GRID
  ──────────────────────────────────── */
  let teamBuilt = false;
  function buildTeamGrid() {
    if (teamBuilt) return;
    teamBuilt = true;

    const grid = document.getElementById('teamGrid');
    if (!grid || typeof TEAM_MEMBERS === 'undefined') return;

    TEAM_MEMBERS.forEach((member, i) => {
      const card = document.createElement('div');
      card.className = 'team-card';
      card.innerHTML = `
        <div class="team-portrait">
          ${makePortraitSVG(member.svgBg, member.svgAccent, i)}
          <div class="portrait-overlay"></div>
        </div>
        <div class="team-info">
          <h3 class="team-name">${member.name}</h3>
          <p class="team-role">${member.role}</p>
          <p class="team-bio">${member.bio}</p>
          <div class="team-tags">
            ${member.tags.map(t => `<span class="team-tag">${t}</span>`).join('')}
          </div>
        </div>`;
      grid.appendChild(card);

      // Staggered entrance
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.23,1,0.32,1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 80 + i * 90);
    });

    setTimeout(initTeamTilt, 800);
    setTimeout(() => bindHover('.team-card'), 800);
  }

  /* ────────────────────────────────────
     BUILD GALLERY
  ──────────────────────────────────── */
  let galleryBuilt = false;
  function buildGallery(filter) {
    const masonry = document.getElementById('galleryMasonry');
    if (!masonry || typeof GALLERY_PROJECTS === 'undefined') return;

    if (!galleryBuilt) {
      GALLERY_PROJECTS.forEach((proj, i) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-status', proj.status);
        item.innerHTML = `
          <div class="gallery-img-wrap">
            <svg viewBox="${proj.viewBox}" xmlns="http://www.w3.org/2000/svg"
                 class="gallery-img-inner" style="display:block;aspect-ratio:${proj.aspect};">
              ${proj.svgContent}
            </svg>
          </div>
          <div class="gallery-overlay">
            <div class="gallery-overlay-title">${proj.name}, ${proj.location}</div>
            <div class="gallery-overlay-meta">${proj.type} · ${proj.area} · ${proj.year}</div>
          </div>
          <div class="gallery-caption">
            <span class="gallery-caption-name">${proj.name}</span>
            <span class="gallery-caption-status status-${proj.status}">
              ${proj.status === 'gebaut' ? 'Gebaut' : 'Geplant'}
            </span>
          </div>`;
        masonry.appendChild(item);

        // Entrance animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
          item.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.23,1,0.32,1)';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 60 + i * 60);
      });
      galleryBuilt = true;
      setTimeout(() => {
        initGalleryTilt();
        bindHover('.gallery-item');
      }, 700);
    }

    filterGallery(filter, document.querySelector('.filter-btn.active'));
  }

  window.filterGallery = function(status, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    document.querySelectorAll('.gallery-item').forEach((item, i) => {
      const show = status === 'all' || item.dataset.status === status;
      if (show) {
        item.style.display = '';
        item.style.opacity = '0';
        item.style.transform = 'translateY(12px)';
        setTimeout(() => {
          item.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.23,1,0.32,1)';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, i * 40);
      } else {
        item.style.display = 'none';
      }
    });
  };

  /* ────────────────────────────────────
     SCROLL — FADE IN ELEMENTS
  ──────────────────────────────────── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  function observeReveal(selector) {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.7s ease ${i * 0.08}s, transform 0.7s cubic-bezier(0.23,1,0.32,1) ${i * 0.08}s`;
      observer.observe(el);
    });
  }

  /* ────────────────────────────────────
     INIT
  ──────────────────────────────────── */
  observeReveal('.news-card');
  observeReveal('.stat-item');
  initTiltCards();
  startCounters();

  // Make sure gallery filter button still works
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const status = this.textContent.trim().toLowerCase() === 'alle' ? 'all'
        : this.textContent.trim().toLowerCase() === 'gebaut' ? 'gebaut' : 'geplant';
      window.filterGallery(status, this);
    });
  });

});
