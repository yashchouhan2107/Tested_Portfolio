

document.addEventListener("DOMContentLoaded", () => {
    // Background Animation
    initBackgroundAnimation();


    // Navbar Scroll Effect
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // ScrollSpy Logic
    const sections = document.querySelectorAll("section[id]");
    const navLinksList = document.querySelectorAll(".nav-links a[href^='#']:not(.btn-primary-sm)");

    const scrollSpy = () => {
        let current = "hero"; // Default to hero
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinksList.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", scrollSpy);
    scrollSpy(); // Initial call to set active state on load

    // Mobile Menu Toggle (Basic)
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
            if(navLinks.style.display === "flex") {
                navLinks.style.flexDirection = "column";
                navLinks.style.position = "absolute";
                navLinks.style.top = "70px";
                navLinks.style.left = "0";
                navLinks.style.width = "100%";
                navLinks.style.background = "rgba(5,5,5,0.95)";
                navLinks.style.padding = "20px 0";
                navLinks.style.backdropFilter = "blur(10px)";
                navLinks.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
            }
        });
    }

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Reveal Up
    const revealUpElements = document.querySelectorAll(".reveal-up");
    revealUpElements.forEach((el) => {
        gsap.fromTo(el, 
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Reveal Right
    const revealRightElements = document.querySelectorAll(".reveal-right");
    revealRightElements.forEach((el) => {
        gsap.fromTo(el, 
            { x: -50, opacity: 0 },
            { 
                x: 0, 
                opacity: 1, 
                duration: 1, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            
            // Close all
            faqItems.forEach(faq => faq.classList.remove("active"));
            
            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add("active");
            }
        });
    });

    // Typewriter Effect for Code Reveal
    const codeSnippet = `import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LuxuryExperience() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize 3D context
    initWebGLContext();
    setIsLoaded(true);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="premium-container"
    >
      <Enhanced3DScene quality="ultra" />
    </motion.div>
  );
}`;

    const codeElement = document.getElementById("typewriter-code-magic");
    let i = 0;
    let isTyping = false;

    function typeWriter() {
        if (i < codeSnippet.length) {
            codeElement.textContent += codeSnippet.charAt(i);
            i++;
            
            // Auto-scroll to bottom of terminal
            const terminalBody = codeElement.closest('.terminal-body');
            if (terminalBody) {
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
            
            setTimeout(typeWriter, 20 + Math.random() * 30);
        }
    }

    if (codeElement) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isTyping) {
                    isTyping = true;
                    setTimeout(typeWriter, 800);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        
        const terminalWindow = document.getElementById("magic-terminal");
        if (terminalWindow) {
            observer.observe(terminalWindow);
        }
    }

    // Contact Modal Injection and Logic
    const contactModalHTML = `
        <div id="contact-modal" class="modal-overlay">
            <div class="modal-content glass-card">
                <span id="close-modal" class="close-btn">&times;</span>
                <div class="section-title" style="margin-bottom:20px; text-align:left;">
                    <h2 style="font-size:2rem; margin-bottom:10px;">Let's Talk</h2>
                    <p style="font-size:0.95rem;">Fill out the details below and I'll get back to you shortly.</p>
                </div>
                <form id="contact-form" action="https://formsubmit.co/yashchouhan2107@gmail.com" method="POST" class="career-form">
                    <input type="hidden" name="_subject" value="New Contact Message">
                    <input type="hidden" name="_captcha" value="false">
                    <div class="form-group">
                        <input type="text" name="name" placeholder="Your Name" required>
                     </div>
                    <div class="form-group">
                         <input type="email" name="email" placeholder="Email Address" required>
                    </div>
                    <div class="form-group">
                         <textarea name="message" rows="4" placeholder="How can I help you?" required></textarea>
                     </div>
                    <button type="submit" class="btn-primary lg" style="width:100%;">Send Message</button>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', contactModalHTML);
    
    const contactModal = document.getElementById("contact-modal");
    const openContactBtns = document.querySelectorAll("a[href*='#contact'], .btn-primary-sm, .btn-secondary");
    const closeModalBtn = document.getElementById("close-modal");

    openContactBtns.forEach(btn => {
        if (btn.textContent.includes("Let's Talk") || btn.textContent.includes("Contact") || btn.textContent.includes("Ask a Question") || btn.textContent.includes("Get in Touch")) {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                contactModal.classList.add("active");
                document.body.style.overflow = "hidden";
                // VanillaTilt removed as per request
            });
        }
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            contactModal.classList.remove("active");
        });
    }

    if (contactModal) {
        contactModal.addEventListener("click", (e) => {
            if (e.target === contactModal) {
                contactModal.classList.remove("active");
            }
        });
    }



    // Preloader Logic
    window.addEventListener('load', () => {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.classList.add('hidden');
            // optionally remove entirely from DOM after transition
            setTimeout(() => {
                loader.style.display = 'none';
            }, 800);
        }
    });

    // Magnetic Buttons Logic
    const magneticElements = document.querySelectorAll('.btn-primary, .btn-primary-sm, .magnetic');
    
    magneticElements.forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.classList.add('magnet-active');
            
            gsap.to(el, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        el.addEventListener('mouseleave', () => {
            el.classList.remove('magnet-active');
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
});

function initBackgroundAnimation() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    // Three.js Setup
    const scene = new THREE.Scene();
    // Add fog to blend the horizon into the dark background
    scene.fog = new THREE.FogExp2(0x050505, 0.012);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Position camera higher up, looking slightly down at the terrain
    camera.position.set(0, 15, 60);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: false // Disabled antialiasing for raw performance
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(1); // Force pixel ratio to 1 to drastically reduce GPU load

    const group = new THREE.Group();
    scene.add(group);

    // Create a high-definition plane for the flowing terrain
    // Size: 250x250, Segments: 40x40. Segment size = 250/40 = 6.25
    const segmentSize = 250 / 40;
    const geometry = new THREE.PlaneGeometry(250, 250, 40, 40);
    geometry.rotateX(-Math.PI / 2); // Lay it flat

    // Wireframe material for the high-tech structural look
    const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0xff416c,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });

    // Solid dark material behind the wireframe to give depth and obscure back-lines
    // Setting transparent to false drastically improves rendering performance
    const solidMaterial = new THREE.MeshBasicMaterial({
        color: 0x050505,
        transparent: false
    });

    const meshSolid = new THREE.Mesh(geometry, solidMaterial);
    const meshWire = new THREE.Mesh(geometry, wireMaterial);
    
    // Slightly offset the solid mesh to prevent z-fighting
    meshSolid.position.y = -0.1;
    
    group.add(meshSolid);
    group.add(meshWire);

    // Track original Y positions to animate them
    const pos = geometry.attributes.position;
    const originalY = new Float32Array(pos.count);
    const randomOffsets = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) {
        originalY[i] = pos.getY(i);
        randomOffsets[i] = Math.random() * Math.PI * 2;
    }

    // Add floating ambient particles (Cyber-dust)
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 400;
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        particlePos[i * 3] = (Math.random() - 0.5) * 200; // x
        particlePos[i * 3 + 1] = Math.random() * 40;      // y (height)
        particlePos[i * 3 + 2] = (Math.random() - 0.5) * 200; // z
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particlesMat = new THREE.PointsMaterial({
        color: 0xff416c,
        size: 0.5,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.05;
        mouseY = (event.clientY - windowHalfY) * 0.05;
    });

    // Scroll Interaction
    let scrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Animate the terrain vertices using overlapping sine waves
        // The waves will travel along the Z-axis to simulate perfectly smooth forward motion
        const forwardSpeed = 6; 

        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const z = pos.getZ(i);
            
            // Shift the Z coordinate based on time to make the waves roll forward continuously
            const flowZ = z - elapsedTime * forwardSpeed;

            // Multi-layered waves for organic fluid look
            const wave1 = Math.sin(x * 0.05 + elapsedTime * 0.8) * 2;
            const wave2 = Math.cos(flowZ * 0.05) * 2; // Forward rolling wave
            const wave3 = Math.sin((x + flowZ) * 0.03) * 2.5; // Diagonal rolling wave
            
            // Micro-ripples
            const noise = Math.sin(randomOffsets[i] + elapsedTime * 2) * 0.3;

            pos.setY(i, originalY[i] + wave1 + wave2 + wave3 + noise);
        }
        pos.needsUpdate = true;
        
        // Gentle rotation of the whole horizon
        group.rotation.y = Math.sin(elapsedTime * 0.1) * 0.1;

        // Ambient particles drifting
        particles.position.y = Math.sin(elapsedTime * 0.2) * 2;
        particles.rotation.y = elapsedTime * 0.02;

        // Camera parallax based on mouse and scroll
        const targetCamX = mouseX;
        // As you scroll down, the camera dips closer to the fluid terrain
        const targetCamY = 15 - mouseY - scrollY * 0.015; 

        camera.position.x += (targetCamX - camera.position.x) * 0.02;
        camera.position.y += (targetCamY - camera.position.y) * 0.05;
        camera.lookAt(0, 5, 0);

        renderer.render(scene, camera);
    }

    animate();

    // Resize handling
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
}
