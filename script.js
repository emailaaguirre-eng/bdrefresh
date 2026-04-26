/* ======================================
   B&D Servicing LLC - Website Scripts
   Interactive Dev-Themed Effects
   ====================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // =============================================
    // 1. MATRIX RAIN CANVAS (Hero Background)
    // =============================================
    const canvas = document.getElementById('matrixCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, columns, drops;
        const chars = '01';
        const fontSize = 14;

        function initMatrix() {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            columns = Math.floor(width / fontSize);
            drops = Array.from({ length: columns }, () => Math.random() * -100);
        }

        function drawMatrix() {
            // Semi-transparent fade for trail effect
            ctx.fillStyle = 'rgba(8, 12, 18, 0.06)';
            ctx.fillRect(0, 0, width, height);

            ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Gradient brightness based on position
                const brightness = Math.random();
                if (brightness > 0.95) {
                    ctx.fillStyle = 'rgba(90, 171, 238, 0.9)'; // bright blue flash
                } else if (brightness > 0.8) {
                    ctx.fillStyle = 'rgba(58, 143, 212, 0.5)';
                } else {
                    ctx.fillStyle = 'rgba(58, 143, 212, 0.15)';
                }

                ctx.fillText(char, x, y);

                // Reset drop to top randomly
                if (y > height && Math.random() > 0.985) {
                    drops[i] = 0;
                }
                drops[i] += 0.4 + Math.random() * 0.3;
            }
        }

        initMatrix();

        let matrixRAF;
        function matrixLoop() {
            drawMatrix();
            matrixRAF = requestAnimationFrame(matrixLoop);
        }

        // Only run when hero is visible (performance)
        const heroSection = document.getElementById('home');
        const matrixObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    matrixLoop();
                } else {
                    cancelAnimationFrame(matrixRAF);
                }
            });
        }, { threshold: 0 });

        if (!prefersReducedMotion) {
            matrixObserver.observe(heroSection);
        }

        // Resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(initMatrix, 200);
        });
    }

    // =============================================
    // 2. TYPING EFFECT (Hero Subtitle)
    // =============================================
    const subtitleEl = document.getElementById('heroSubtitle');
    if (subtitleEl) {
        const text = 'B&D Servicing is an end-to-end development firm with 10+ years of experience building websites, web applications, internal tools, and digital systems shaped around real business needs, not generic templates.';

        if (prefersReducedMotion) {
            // Show text immediately for users who prefer reduced motion
            subtitleEl.textContent = text;
        } else {
            let index = 0;
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            subtitleEl.appendChild(cursor);

            function typeChar() {
                if (index < text.length) {
                    subtitleEl.insertBefore(document.createTextNode(text[index]), cursor);
                    index++;
                    const delay = text[index - 1] === ',' || text[index - 1] === '.' ? 80 : 22 + Math.random() * 18;
                    setTimeout(typeChar, delay);
                }
            }

            // Start typing when hero is visible
            const typingObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(typeChar, 800);
                        typingObserver.disconnect();
                    }
                });
            }, { threshold: 0.2 });

            typingObserver.observe(subtitleEl);
        }
    }

    // =============================================
    // 3. NAVBAR SCROLL EFFECT
    // =============================================
    const navbar = document.getElementById('navbar');

    function handleNavScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // =============================================
    // 4. MOBILE MENU
    // =============================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle && navMenu) {
        function openMenu() {
            mobileMenuToggle.classList.add('active');
            navMenu.classList.add('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
            // Focus first nav link
            const firstLink = navMenu.querySelector('.nav-link');
            if (firstLink) firstLink.focus();
        }

        function closeMenu() {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            mobileMenuToggle.focus();
        }

        mobileMenuToggle.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // Focus trapping inside mobile menu when open
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab' || !navMenu.classList.contains('active')) return;

            const focusableEls = navMenu.querySelectorAll('a, button');
            const firstEl = focusableEls[0];
            const lastEl = focusableEls[focusableEls.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstEl) {
                    e.preventDefault();
                    lastEl.focus();
                }
            } else {
                if (document.activeElement === lastEl) {
                    e.preventDefault();
                    firstEl.focus();
                }
            }
        });
    }

    // =============================================
    // 5. ACTIVE NAV LINK ON SCROLL
    // =============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightActiveSection() {
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection, { passive: true });

    // =============================================
    // 6. SMOOTH SCROLL
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = navbar.offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =============================================
    // 7. SCROLL-TRIGGERED ANIMATIONS
    // =============================================
    const animateElements = document.querySelectorAll('[data-animate]');

    if ('IntersectionObserver' in window) {
        const animObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    animObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });

        animateElements.forEach(el => animObserver.observe(el));
    } else {
        animateElements.forEach(el => el.classList.add('animate-in'));
    }

    // =============================================
    // 8. SERVICE CARD TILT + GLOW FOLLOW
    // =============================================
    const tiltCards = document.querySelectorAll('[data-tilt]');

    if (window.matchMedia('(min-width: 768px) and (hover: hover)').matches) {
        tiltCards.forEach(card => {
            const glow = card.querySelector('.card-glow');

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -4;
                const rotateY = ((x - centerX) / centerX) * 4;

                card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

                if (glow) {
                    glow.style.left = `${x}px`;
                    glow.style.top = `${y}px`;
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                setTimeout(() => { card.style.transition = ''; }, 500);
            });

            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });
        });
    }

    // =============================================
    // 9. PROCESS TIMELINE ANIMATION
    // =============================================
    const processLine = document.getElementById('processLine');
    if (processLine) {
        const processSection = document.querySelector('.process');
        const processObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        processLine.classList.add('filled');
                    }, 400);
                    processObserver.disconnect();
                }
            });
        }, { threshold: 0.3 });

        processObserver.observe(processSection);
    }

    // =============================================
    // 10. COUNTER ANIMATION (Values Metrics)
    // =============================================
    const counters = document.querySelectorAll('[data-count]');

    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'), 10);
                    let current = 0;
                    const duration = 1800;
                    const stepTime = 20;
                    const steps = duration / stepTime;
                    const increment = target / steps;

                    function updateCounter() {
                        current += increment;
                        if (current >= target) {
                            el.textContent = target;
                        } else {
                            el.textContent = Math.floor(current);
                            requestAnimationFrame(() => setTimeout(updateCounter, stepTime));
                        }
                    }

                    updateCounter();
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(el => counterObserver.observe(el));
    }

    // =============================================
    // 10a. TERMINAL DEPLOY ANIMATION
    // =============================================
    const terminalWindow = document.querySelector('.terminal-window');
    if (terminalWindow) {
        const revealLines = terminalWindow.querySelectorAll('.t-reveal');
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReduced) {
            revealLines.forEach(line => line.classList.add('t-visible'));
        } else {
            const startReveal = () => {
                revealLines.forEach((line, i) => {
                    setTimeout(() => line.classList.add('t-visible'), 300 + i * 120);
                });
            };

            if (terminalWindow.classList.contains('animate-in')) {
                startReveal();
            } else {
                const mo = new MutationObserver(() => {
                    if (terminalWindow.classList.contains('animate-in')) {
                        mo.disconnect();
                        startReveal();
                    }
                });
                mo.observe(terminalWindow, { attributes: true, attributeFilter: ['class'] });
            }
        }
    }

    // =============================================
    // 10b. CONTACT FORM HANDLING (PHP)
    // =============================================
    const FORM_ENDPOINT = 'contact/send.php';

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            if (!data.name || !data.email || !data.message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            try {
                const response = await fetch(FORM_ENDPOINT, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                const result = await response.json();

                if (result.success) {
                    this.innerHTML = `
                        <div class="form-success" role="alert" aria-live="polite">
                            <h3>Message Sent!</h3>
                            <p>Thank you for reaching out. We will review your message and get back to you within 24 hours.</p>
                        </div>
                    `;
                } else {
                    throw new Error(result.message || 'Submission failed');
                }
            } catch (err) {
                showFormMessage('Something went wrong. Please try emailing us directly at info@banddservicing.com', 'error');
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.disabled = false;
            }
        });
    }

    function showFormMessage(message, type) {
        const existing = document.querySelector('.form-message');
        if (existing) existing.remove();

        const el = document.createElement('div');
        el.className = `form-message form-message--${type}`;
        el.setAttribute('role', 'alert');
        el.setAttribute('aria-live', 'assertive');
        el.textContent = message;
        el.style.cssText = `
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 0.9rem;
            margin-bottom: 16px;
            background: ${type === 'error' ? 'rgba(224, 82, 82, 0.1)' : 'rgba(46, 196, 162, 0.1)'};
            color: ${type === 'error' ? '#e05252' : '#2ec4a2'};
            border: 1px solid ${type === 'error' ? 'rgba(224, 82, 82, 0.2)' : 'rgba(46, 196, 162, 0.2)'};
        `;
        contactForm.prepend(el);
        setTimeout(() => el.remove(), 5000);
    }

    // =============================================
    // 11. BADGE TEXT CYCLE
    // =============================================
    const badgeText = document.getElementById('badgeText');
    if (badgeText) {
        const messages = [
            'system.status: online',
            'accepting new projects',
            'serving clients nationwide',
            'response_time: < 24hrs'
        ];
        let msgIndex = 0;

        setInterval(() => {
            msgIndex = (msgIndex + 1) % messages.length;
            badgeText.style.opacity = '0';
            badgeText.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                badgeText.textContent = messages[msgIndex];
                badgeText.style.opacity = '1';
            }, 300);
        }, 3500);
    }

    // =============================================
    // 12. SCROLL PARALLAX (Hero background)
    // =============================================
    const heroBg = document.querySelector('.hero-image-bg');
    const heroCanvas = document.getElementById('matrixCanvas');
    const heroEl = document.querySelector('.hero');

    if (heroBg) {
        // Scroll-based parallax - background moves slower than scroll
        function handleScrollParallax() {
            const scrollY = window.scrollY;
            const heroHeight = heroEl ? heroEl.offsetHeight : window.innerHeight;

            if (scrollY <= heroHeight) {
                const offset = scrollY * 0.4;
                heroBg.style.transform = `translateY(${offset}px) scale(1.1)`;
                if (heroCanvas) {
                    heroCanvas.style.transform = `translateY(${offset * 0.3}px)`;
                }
            }
        }

        window.addEventListener('scroll', handleScrollParallax, { passive: true });

        // Mouse-based parallax on desktop
        if (window.matchMedia('(min-width: 768px) and (hover: hover)').matches && heroEl) {
            heroEl.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 15;
                const y = (e.clientY / window.innerHeight - 0.5) * 15;
                const scrollOffset = window.scrollY * 0.4;
                heroBg.style.transform = `translate(${x}px, ${y + scrollOffset}px) scale(1.1)`;
            }, { passive: true });
        }
    }

    // =============================================
    // 13. NETWORK PARTICLE CANVAS (CTA Section)
    // =============================================
    const ctaBg = document.querySelector('.cta-bg-effect');
    if (ctaBg) {
        const particleCanvas = document.createElement('canvas');
        ctaBg.appendChild(particleCanvas);
        const pCtx = particleCanvas.getContext('2d');

        let particles = [];
        const particleCount = 60;
        const connectionDistance = 120;
        let pWidth, pHeight;
        let mouseX = -1000, mouseY = -1000;

        function initParticles() {
            pWidth = particleCanvas.width = ctaBg.offsetWidth;
            pHeight = particleCanvas.height = ctaBg.offsetHeight;
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * pWidth,
                    y: Math.random() * pHeight,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 2 + 1,
                });
            }
        }

        function drawParticles() {
            pCtx.clearRect(0, 0, pWidth, pHeight);

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const opacity = (1 - dist / connectionDistance) * 0.15;
                        pCtx.beginPath();
                        pCtx.strokeStyle = `rgba(90, 171, 238, ${opacity})`;
                        pCtx.lineWidth = 0.5;
                        pCtx.moveTo(particles[i].x, particles[i].y);
                        pCtx.lineTo(particles[j].x, particles[j].y);
                        pCtx.stroke();
                    }
                }

                // Mouse connection
                const mdx = particles[i].x - mouseX;
                const mdy = particles[i].y - mouseY;
                const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mDist < 180) {
                    const opacity = (1 - mDist / 180) * 0.3;
                    pCtx.beginPath();
                    pCtx.strokeStyle = `rgba(46, 196, 162, ${opacity})`;
                    pCtx.lineWidth = 0.8;
                    pCtx.moveTo(particles[i].x, particles[i].y);
                    pCtx.lineTo(mouseX, mouseY);
                    pCtx.stroke();
                }
            }

            // Draw particles
            particles.forEach(p => {
                pCtx.beginPath();
                pCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                pCtx.fillStyle = 'rgba(90, 171, 238, 0.5)';
                pCtx.fill();

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > pWidth) p.vx *= -1;
                if (p.y < 0 || p.y > pHeight) p.vy *= -1;
            });
        }

        initParticles();

        let particleRAF;
        function particleLoop() {
            drawParticles();
            particleRAF = requestAnimationFrame(particleLoop);
        }

        // Only run when CTA section is visible
        const ctaSection = document.querySelector('.cta-section');
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    particleLoop();
                } else {
                    cancelAnimationFrame(particleRAF);
                }
            });
        }, { threshold: 0 });

        ctaObserver.observe(ctaSection);

        // Track mouse over CTA
        ctaSection.addEventListener('mousemove', (e) => {
            const rect = ctaSection.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        }, { passive: true });

        ctaSection.addEventListener('mouseleave', () => {
            mouseX = -1000;
            mouseY = -1000;
        });

        let pResizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(pResizeTimeout);
            pResizeTimeout = setTimeout(initParticles, 200);
        });
    }

    // =============================================
    // 14. CUSTOM CURSOR (Hero + Navbar)
    // =============================================
    if (window.matchMedia('(min-width: 768px) and (hover: hover)').matches) {
        // Create cursor elements
        const cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow';
        document.body.appendChild(cursorGlow);

        // Pixel trail pool
        const pixelPool = [];
        const poolSize = 30;
        for (let i = 0; i < poolSize; i++) {
            const px = document.createElement('div');
            px.className = 'cursor-pixel';
            document.body.appendChild(px);
            pixelPool.push({ el: px, active: false });
        }
        let pixelIndex = 0;
        let lastPixelX = 0;
        let lastPixelY = 0;

        const heroZone = document.querySelector('.hero');
        const navZone = document.querySelector('.navbar');
        let cursorInZone = false;

        function isInHeroZone(e) {
            const heroRect = heroZone.getBoundingClientRect();
            const navRect = navZone.getBoundingClientRect();
            const inHero = e.clientY >= heroRect.top && e.clientY <= heroRect.bottom &&
                           e.clientX >= heroRect.left && e.clientX <= heroRect.right;
            const inNav = e.clientY >= navRect.top && e.clientY <= navRect.bottom &&
                          e.clientX >= navRect.left && e.clientX <= navRect.right;
            return inHero || inNav;
        }

        document.addEventListener('mousemove', (e) => {
            cursorInZone = isInHeroZone(e);

            if (cursorInZone) {
                cursorGlow.classList.add('visible');
                cursorGlow.style.left = `${e.clientX}px`;
                cursorGlow.style.top = `${e.clientY}px`;

                // Spawn pixel squares on movement
                const dist = Math.hypot(e.clientX - lastPixelX, e.clientY - lastPixelY);
                if (dist > 6) {
                    const p = pixelPool[pixelIndex % poolSize];
                    const offsetX = (Math.random() - 0.5) * 12;
                    const offsetY = (Math.random() - 0.5) * 12;
                    const size = 3 + Math.random() * 3;

                    p.el.style.left = `${e.clientX + offsetX}px`;
                    p.el.style.top = `${e.clientY + offsetY}px`;
                    p.el.style.width = `${size}px`;
                    p.el.style.height = `${size}px`;
                    p.el.style.opacity = '0.6';
                    p.el.style.transform = 'none';
                    p.el.style.transition = 'none';

                    // Force reflow then animate out
                    p.el.offsetHeight;
                    p.el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    p.el.style.opacity = '0';
                    p.el.style.transform = `translate(${offsetX * 2}px, ${offsetY * 2 + 8}px)`;

                    pixelIndex++;
                    lastPixelX = e.clientX;
                    lastPixelY = e.clientY;
                }

                // Check if hovering a link or button
                const target = e.target.closest('a, button');
                if (target) {
                    cursorGlow.classList.add('hovering-link');
                } else {
                    cursorGlow.classList.remove('hovering-link');
                }
            } else {
                cursorGlow.classList.remove('visible', 'hovering-link');
            }
        });
    }

    // =============================================
    // 15. MAGNETIC BUTTONS
    // =============================================
    if (window.matchMedia('(min-width: 768px) and (hover: hover)').matches) {
        document.querySelectorAll('.btn-primary, .btn-lg').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
                btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                setTimeout(() => { btn.style.transition = ''; }, 400);
            });

            btn.addEventListener('mouseenter', () => {
                btn.style.transition = 'none';
            });
        });
    }

    // =============================================
    // 16. SCROLL PROGRESS BAR
    // =============================================
    const scrollProgressBar = document.getElementById('scrollProgress');
    if (scrollProgressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            scrollProgressBar.style.width = `${progress}%`;
        }, { passive: true });
    }

    // =============================================
    // 17. BACK TO TOP BUTTON
    // =============================================
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =============================================
    // 18. ENHANCED DOT-GRID PARALLAX
    // =============================================
    if (!prefersReducedMotion) {
        const dotGridSections = document.querySelectorAll('.dot-grid-bg');
        if (dotGridSections.length) {
            window.addEventListener('scroll', () => {
                dotGridSections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                        const offset = (progress - 0.5) * 25;
                        section.style.setProperty('--grid-offset', `${offset}px`);
                    }
                });
            }, { passive: true });
        }
    }

    // =============================================
    // 19. CHATBOT
    // =============================================
    const chatToggle = document.getElementById('chatbotToggle');
    const chatWindow = document.getElementById('chatbotWindow');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');

    if (chatToggle && chatWindow) {

        // --- Response database ---
        const responses = {
            greeting: {
                text: "Hi! I'm the B&D Servicing assistant. I can help you learn about what we build and whether we're a good fit for your project. What can I help with?",
                options: [
                    { label: "What do you build?", action: "services" },
                    { label: "Service menu (ranges)", action: "service_menu" },
                    { label: "Glossary / definitions", action: "glossary_help" },
                    { label: "Can you help with my project?", action: "project_help" },
                    { label: "Pricing & timelines", action: "pricing" },
                    { label: "Talk to the team", action: "contact" }
                ]
            },
            glossary_help: {
                text: "Ask about a specific term (for example: Website, DNS, SSL, SEO, API, Webhooks, CRM, CI/CD, Staging, or Deliverability). I will share a short definition and why it matters.\n\nYou can also open the full service menu with typical budget ranges.",
                options: [
                    { label: "Open service menu", action: "service_menu" },
                    { label: "Back to start", action: "greeting" }
                ]
            },
            service_menu: {
                text: "Here is our full service menu with typical budget ranges. Final quotes always depend on scope, integrations, and timeline.\n\n" + (typeof window !== 'undefined' && window.BD_CHATBOT_KNOWLEDGE && window.BD_CHATBOT_KNOWLEDGE.serviceMenu ? window.BD_CHATBOT_KNOWLEDGE.serviceMenu : '(Service menu file missing: load chatbot-knowledge.js before script.js.)'),
                options: [
                    { label: "Get a quote", action: "contact" },
                    { label: "Glossary / definitions", action: "glossary_help" },
                    { label: "Back to start", action: "greeting" }
                ]
            },
            services: {
                text: "We build a wide range of digital solutions:\n\n\u2022 Custom websites & web applications\n\u2022 Web-based programs (portals, dashboards, SaaS)\n\u2022 Desktop & local applications\n\u2022 AI Agents & AI-powered tools\n\u2022 API integrations & automation\n\u2022 Database design & data systems\n\u2022 E-commerce solutions\n\nWant to know more about a specific area?",
                options: [
                    { label: "Websites & web apps", action: "websites" },
                    { label: "AI & automation", action: "ai" },
                    { label: "Internal tools & dashboards", action: "internal_tools" },
                    { label: "Service menu (ranges)", action: "service_menu" },
                    { label: "Something else", action: "other_service" }
                ]
            },
            websites: {
                text: "Absolutely - we design and build custom websites and web applications from the ground up. Whether it's a professional business site, a client portal, a booking platform, or a full SaaS product, we handle everything from design to deployment.",
                options: [
                    { label: "What about e-commerce?", action: "ecommerce" },
                    { label: "Get a quote", action: "contact" },
                    { label: "Back to services", action: "services" }
                ]
            },
            ai: {
                text: "Yes! We build AI Agents, intelligent chatbots, automated workflows, and custom AI-powered tools. These solutions help businesses automate repetitive tasks, process information faster, and deliver better experiences to their customers.",
                options: [
                    { label: "What kind of AI agents?", action: "ai_detail" },
                    { label: "Get a quote", action: "contact" },
                    { label: "Back to services", action: "services" }
                ]
            },
            ai_detail: {
                text: "Our AI solutions range from customer-facing chatbots and virtual assistants to behind-the-scenes agents that handle data processing, content generation, workflow automation, and intelligent decision-making. We build practical AI that solves real business problems.",
                options: [
                    { label: "Start a project", action: "contact" },
                    { label: "Back to services", action: "services" }
                ]
            },
            internal_tools: {
                text: "This is one of our specialties. We build admin dashboards, approval workflows, reporting tools, CRM integrations, and internal management platforms. Everything is custom-built to match exactly how your team operates.",
                options: [
                    { label: "Get a quote", action: "contact" },
                    { label: "Back to services", action: "services" }
                ]
            },
            ecommerce: {
                text: "We build e-commerce solutions including custom online stores, payment processing, inventory management, and order tracking. Whether you need a full storefront or e-commerce features added to an existing platform, we can help.",
                options: [
                    { label: "Get a quote", action: "contact" },
                    { label: "Back to services", action: "services" }
                ]
            },
            project_help: {
                text: "We'd love to help! What type of project are you thinking about?",
                options: [
                    { label: "I need a website", action: "websites" },
                    { label: "I need a custom app", action: "custom_app" },
                    { label: "I need automation or AI", action: "ai" },
                    { label: "I'm not sure yet", action: "not_sure" }
                ]
            },
            custom_app: {
                text: "We build custom applications of all kinds - web-based programs, desktop software, portals, dashboards, and full platforms. We handle the entire stack: user interface, back-end logic, database, integrations, and deployment.",
                options: [
                    { label: "Desktop apps too?", action: "desktop" },
                    { label: "Get a quote", action: "contact" },
                    { label: "Back to services", action: "services" }
                ]
            },
            desktop: {
                text: "Yes - we build local desktop applications for Windows and Mac in addition to web-based solutions. Whether you need a standalone tool or a system that connects to your web platform, we've got it covered.",
                options: [
                    { label: "Get a quote", action: "contact" },
                    { label: "Back to services", action: "services" }
                ]
            },
            not_sure: {
                text: "No problem at all! That's what our free consultation is for. Just tell us about your business challenge or idea, and we'll help you figure out the best approach. Zero commitment - just a conversation.",
                options: [
                    { label: "Fill out contact form", action: "scroll_contact" },
                    { label: "View our services", action: "services" }
                ]
            },
            pricing: {
                text: "Every project is unique, so we provide custom quotes based on your specific needs. Our custom applications start at $1,499. We offer free consultations where we scope your project and give you a detailed estimate - no obligation.\n\nFor a full line-item menu with typical ranges, open the service menu.",
                options: [
                    { label: "Service menu (ranges)", action: "service_menu" },
                    { label: "How long do projects take?", action: "timeline" },
                    { label: "Get a free quote", action: "contact" },
                    { label: "Back to start", action: "greeting" }
                ]
            },
            timeline: {
                text: "Timelines depend on the scope. A standard website is typically ready in 2-4 weeks. Custom applications usually take 4-8 weeks. More complex builds may run longer. We'll give you a clear timeline during our initial consultation.",
                options: [
                    { label: "Get started", action: "contact" },
                    { label: "Back to start", action: "greeting" }
                ]
            },
            other_service: {
                text: "We're flexible and enjoy solving unique challenges. If your project doesn't fit neatly into a box, reach out anyway - chances are we can help. We've built everything from data migration tools to custom API bridges to AI-powered workflows.",
                options: [
                    { label: "Contact us", action: "contact" },
                    { label: "Back to services", action: "services" }
                ]
            },
            contact: {
                text: "Great choice! The best way to get started is through our contact form. We will review your message and get back to you within 24 hours.",
                options: [
                    { label: "Go to contact form", action: "scroll_contact" },
                    { label: "Call: 602-456-9889", action: "phone" },
                    { label: "Back to start", action: "greeting" }
                ]
            },
            technical: {
                text: "We use modern, industry-standard technologies specifically chosen for each project. Rather than getting into the technical weeds here, we'd love to discuss the best approach for your specific needs in a free consultation.",
                options: [
                    { label: "Schedule a consultation", action: "contact" },
                    { label: "What do you build?", action: "services" }
                ]
            },
            fallback: {
                text: "That's a great question! Our team can give you a thorough answer on that. I'd recommend reaching out through our contact form - we will get back to you within 24 hours.",
                options: [
                    { label: "Go to contact form", action: "scroll_contact" },
                    { label: "Glossary / definitions", action: "glossary_help" },
                    { label: "Ask something else", action: "greeting" }
                ]
            }
        };

        function escapeRegex(str) {
            return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        function formatGlossaryEntry(entry) {
            return `${entry.term}\n\nDefinition: ${entry.definition}\n\nWhy it matters: ${entry.why}`;
        }

        function matchGlossaryEntry(lower) {
            const knowledge = typeof window !== 'undefined' ? window.BD_CHATBOT_KNOWLEDGE : null;
            if (!knowledge || !Array.isArray(knowledge.glossary)) return null;

            const entries = knowledge.glossary.map((e) => {
                const phrases = [e.term, ...(e.keys || [])].filter(Boolean);
                const maxLen = Math.max(...phrases.map((p) => p.length));
                return { entry: e, phrases, maxLen };
            });
            entries.sort((a, b) => b.maxLen - a.maxLen);

            for (const { entry, phrases } of entries) {
                if (entry.term === 'Make' && /\bto make\b|\bmake a\b|\bmake an\b|\bmake sure\b|\bmake sense\b/i.test(lower)) {
                    continue;
                }
                for (const phrase of phrases) {
                    const ph = phrase.toLowerCase();
                    if (!ph) continue;
                    if (ph.length <= 3) {
                        try {
                            const re = new RegExp(`\\b${escapeRegex(ph)}\\b`, 'i');
                            if (re.test(lower)) return entry;
                        } catch {
                            /* ignore */
                        }
                    } else if (lower.includes(ph)) {
                        return entry;
                    }
                }
            }
            return null;
        }

        function resolveChatActionFromText(text) {
            const lower = text.toLowerCase().trim();
            if (!lower) return { kind: 'action', action: 'fallback' };

            if (/(^|\b)(service menu|menu of services|list of services|service catalog|full service menu|pricing menu)\b/i.test(lower)) {
                return { kind: 'action', action: 'service_menu' };
            }
            if (/(^|\b)(glossary|definitions|terminology|technical terms|dictionary)\b/i.test(lower)) {
                return { kind: 'action', action: 'glossary_help' };
            }

            const gloss = matchGlossaryEntry(lower);
            if (gloss) return { kind: 'glossary', entry: gloss };

            return { kind: 'action', action: matchKeywords(lower) };
        }

        // --- Keyword matching for free-text input ---
        const keywordMap = {
            websites: { keys: ['website', 'site', 'web page', 'webpage', 'landing page', 'homepage', 'redesign'], response: 'websites' },
            apps: { keys: ['app', 'application', 'software', 'program', 'platform', 'portal', 'saas'], response: 'custom_app' },
            ai: { keys: ['ai', 'artificial intelligence', 'chatbot', 'bot', 'agent', 'machine learning', 'gpt', 'llm'], response: 'ai' },
            automation: { keys: ['automation', 'automate', 'workflow', 'automated'], response: 'ai' },
            price: { keys: ['price', 'cost', 'how much', 'quote', 'budget', 'afford', 'pricing', 'rate', 'charge', 'fee'], response: 'pricing' },
            time: { keys: ['how long', 'timeline', 'deadline', 'turnaround', 'fast', 'when', 'duration', 'weeks'], response: 'timeline' },
            ecommerce: { keys: ['ecommerce', 'e-commerce', 'shop', 'store', 'sell', 'payment', 'cart', 'product', 'shopify'], response: 'ecommerce' },
            api: { keys: ['api', 'integration', 'connect', 'webhook', 'sync', 'data sync', 'zapier'], response: 'internal_tools' },
            database: { keys: ['database', 'data', 'sql', 'backend', 'server', 'storage'], response: 'internal_tools' },
            desktop: { keys: ['desktop', 'local', 'windows', 'mac', 'native', 'installed'], response: 'desktop' },
            dashboard: { keys: ['dashboard', 'admin', 'panel', 'reporting', 'analytics', 'internal tool', 'crm'], response: 'internal_tools' },
            technical: { keys: ['react', 'node', 'python', 'javascript', 'typescript', 'php', 'mysql', 'postgres', 'docker', 'aws', 'html', 'css', 'framework', 'library', 'stack', 'language', 'code', 'coding', 'angular', 'vue', 'next', 'django', 'flask', 'ruby', 'java', 'swift', 'kotlin'], response: 'technical' },
            contact: { keys: ['contact', 'email', 'call', 'phone', 'talk', 'reach', 'message', 'speak', 'hire', 'consultation'], response: 'contact' },
            hello: { keys: ['hi', 'hello', 'hey', 'howdy', 'greetings', 'good morning', 'good afternoon', 'good evening', 'sup', 'yo'], response: 'greeting' },
            services: { keys: ['services', 'what do you', 'what can you', 'capabilities', 'offer', 'do you build', 'can you build', 'do you make'], response: 'services' },
            help: { keys: ['help', 'can you help', 'need help', 'looking for', 'i need', 'i want'], response: 'project_help' }
        };

        function matchKeywords(input) {
            const lower = input.toLowerCase().trim();
            for (const category of Object.values(keywordMap)) {
                for (const key of category.keys) {
                    if (lower.includes(key)) {
                        return category.response;
                    }
                }
            }
            return 'fallback';
        }

        // --- Chat UI functions ---
        function addBotMessage(text) {
            const msg = document.createElement('div');
            msg.className = 'chat-msg bot';
            msg.textContent = text;
            chatMessages.appendChild(msg);
            scrollChat();
        }

        function addUserMessage(text) {
            const msg = document.createElement('div');
            msg.className = 'chat-msg user';
            msg.textContent = text;
            chatMessages.appendChild(msg);
            scrollChat();
        }

        function addOptions(options) {
            const wrap = document.createElement('div');
            wrap.className = 'chat-options';
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'chat-opt-btn';
                btn.textContent = opt.label;
                btn.addEventListener('click', () => handleAction(opt.action, opt.label));
                wrap.appendChild(btn);
            });
            chatMessages.appendChild(wrap);
            scrollChat();
        }

        function showTyping() {
            const typing = document.createElement('div');
            typing.className = 'chat-typing';
            typing.id = 'chatTyping';
            typing.innerHTML = '<span></span><span></span><span></span>';
            chatMessages.appendChild(typing);
            scrollChat();
        }

        function hideTyping() {
            const typing = document.getElementById('chatTyping');
            if (typing) typing.remove();
        }

        function scrollChat() {
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 50);
        }

        function disablePreviousOptions() {
            chatMessages.querySelectorAll('.chat-options').forEach(wrap => {
                wrap.querySelectorAll('.chat-opt-btn').forEach(btn => {
                    btn.disabled = true;
                    btn.style.opacity = '0.5';
                    btn.style.cursor = 'default';
                });
            });
        }

        function handleAction(action, label) {
            disablePreviousOptions();

            if (label) {
                addUserMessage(label);
            }

            // Special actions
            if (action === 'scroll_contact') {
                addBotMessage("I'll take you to the contact form now. Looking forward to hearing about your project!");
                setTimeout(() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        const navHeight = document.getElementById('navbar').offsetHeight;
                        window.scrollTo({
                            top: contactSection.offsetTop - navHeight,
                            behavior: 'smooth'
                        });
                    }
                    // Close chatbot
                    chatWindow.classList.remove('open');
                    chatToggle.classList.remove('active');
                    chatToggle.setAttribute('aria-expanded', 'false');
                }, 800);
                return;
            }

            if (action === 'phone') {
                addBotMessage("Give us a call at 602-456-9889 - we'd love to hear from you!");
                setTimeout(() => {
                    window.location.href = 'tel:6024569889';
                }, 600);
                return;
            }

            // Standard response
            const resp = responses[action] || responses.fallback;
            showTyping();

            const delay = 400 + Math.random() * 400;
            setTimeout(() => {
                hideTyping();
                addBotMessage(resp.text);
                if (resp.options) {
                    setTimeout(() => addOptions(resp.options), 200);
                }
            }, delay);
        }

        // --- Free text input ---
        function handleUserInput() {
            const text = chatInput.value.trim();
            if (!text) return;

            chatInput.value = '';
            disablePreviousOptions();
            addUserMessage(text);

            const resolved = resolveChatActionFromText(text);

            showTyping();
            const delay = 500 + Math.random() * 500;
            setTimeout(() => {
                hideTyping();
                if (resolved.kind === 'glossary') {
                    addBotMessage(formatGlossaryEntry(resolved.entry));
                    setTimeout(() => addOptions([
                        { label: 'Open service menu', action: 'service_menu' },
                        { label: 'Ask another term', action: 'glossary_help' },
                        { label: 'Talk to the team', action: 'contact' }
                    ]), 200);
                } else {
                    const resp = responses[resolved.action] || responses.fallback;
                    addBotMessage(resp.text);
                    if (resp.options) {
                        setTimeout(() => addOptions(resp.options), 200);
                    }
                }
            }, delay);
        }

        chatSendBtn.addEventListener('click', handleUserInput);
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleUserInput();
        });

        // --- Toggle chat window ---
        let chatInitialized = false;
        chatToggle.addEventListener('click', () => {
            const isOpen = chatWindow.classList.toggle('open');
            chatToggle.classList.toggle('active', isOpen);
            chatToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

            if (isOpen && !chatInitialized) {
                chatInitialized = true;
                setTimeout(() => {
                    handleAction('greeting', null);
                }, 300);
            }

            if (isOpen) {
                setTimeout(() => chatInput.focus(), 400);
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && chatWindow.classList.contains('open')) {
                chatWindow.classList.remove('open');
                chatToggle.classList.remove('active');
                chatToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

});
