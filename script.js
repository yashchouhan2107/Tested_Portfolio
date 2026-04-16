// Supabase Initialization
const SUPABASE_URL = 'https://kxhqcieygyszmkcznjcb.supabase.co';
const SUPABASE_KEY = 'sb_publishable__zSxjXVSVvoFVZazIhMEcQ_BPKWfAkh';
let supabaseClient = null;

// Vanta.js 3D Background Initialization
document.addEventListener("DOMContentLoaded", () => {
    if (window.VANTA && document.querySelector("#vanta-bg")) {
        VANTA.WAVES({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x050505, // Dark base
            shininess: 30.00,
            waveHeight: 15.00,
            waveSpeed: 0.50,
            zoom: 0.85
        });
    }

    // Vanilla Tilt 3D Effects
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

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
            <div class="modal-content glass-card tilt-card">
                <span id="close-modal" class="close-btn">&times;</span>
                <div class="section-title" style="margin-bottom:20px; text-align:left;">
                    <h2 style="font-size:2rem; margin-bottom:10px;">Let's Talk</h2>
                    <p style="font-size:0.95rem;">Fill out the details below and I'll get back to you shortly.</p>
                </div>
                <form id="contact-form" class="career-form">
                    <div class="form-group">
                        <input type="text" placeholder="Your Name" required>
                     </div>
                    <div class="form-group">
                         <input type="email" placeholder="Email Address" required>
                    </div>
                    <div class="form-group">
                         <textarea rows="4" placeholder="How can I help you?" required></textarea>
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
        if (btn.textContent.includes("Let's Talk") || btn.textContent.includes("Contact") || btn.textContent.includes("Ask a Question")) {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                contactModal.classList.add("active");
                if (window.VanillaTilt) {
                    VanillaTilt.init(document.querySelectorAll("#contact-modal .tilt-card"), {
                        max: 10,
                        speed: 400,
                        glare: true,
                        "max-glare": 0.2
                    });
                }
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

    // Initialize Supabase Client if library is loaded
    if (window.supabase) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
    
    // Form Handlers
    const contactForm = document.getElementById("contact-form");
    if (contactForm && supabaseClient) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector("button[type='submit']");
            const originalText = btn.textContent;
            btn.textContent = "Sending...";
            btn.disabled = true;

            const inputs = contactForm.querySelectorAll("input, textarea");
            const name = inputs[0].value;
            const email = inputs[1].value;
            const message = inputs[2].value;

            const { data, error } = await supabaseClient
                .from('contact_messages')
                .insert([{ name, email, message }]);

            if (error) {
                console.error("Supabase Error:", error);
                btn.textContent = "Failed to Send";
                btn.style.background = "#ff5f56";
            } else {
                btn.textContent = "Message Sent!";
                btn.style.background = "#27c93f";
                contactForm.reset();
            }

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = "";
                btn.disabled = false;
            }, 3000);
        });
    }

    const careerForm = document.getElementById("career-form");
    if (careerForm && supabaseClient) {
        careerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const btn = careerForm.querySelector("button[type='submit']");
            const originalText = btn.textContent;
            btn.textContent = "Submitting...";
            btn.disabled = true;

            const inputs = careerForm.querySelectorAll("input, textarea, select");
            const name = inputs[0].value;
            const email = inputs[1].value;
            const position = inputs[2].value;
            const portfolio_url = inputs[3].value;
            const about = inputs[4].value;

            const { data, error } = await supabaseClient
                .from('job_applications')
                .insert([{ name, email, position, portfolio_url, about }]);

            if (error) {
                console.error("Supabase Error:", error);
                btn.textContent = "Application Failed";
                btn.style.background = "#ff5f56";
            } else {
                btn.textContent = "Application Submitted!";
                btn.style.background = "#27c93f";
                careerForm.reset();
            }

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = "";
                btn.disabled = false;
            }, 4000);
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
