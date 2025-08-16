import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Animation configuration
export const animationConfig = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.2,
    verySlow: 2,
  },
  ease: {
    smooth: 'power2.out',
    bounce: 'back.out(1.7)',
    elastic: 'elastic.out(1, 0.3)',
    expo: 'expo.out',
  },
  stagger: {
    fast: 0.1,
    normal: 0.2,
    slow: 0.3,
  },
};

// Page transition animations
export const pageTransitions = {
  fadeIn: (element: HTMLElement | string) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: animationConfig.duration.normal,
        ease: animationConfig.ease.smooth,
      }
    );
  },

  slideInFromLeft: (element: HTMLElement | string) => {
    return gsap.fromTo(
      element,
      { opacity: 0, x: -100 },
      { 
        opacity: 1, 
        x: 0, 
        duration: animationConfig.duration.normal,
        ease: animationConfig.ease.smooth,
      }
    );
  },

  slideInFromRight: (element: HTMLElement | string) => {
    return gsap.fromTo(
      element,
      { opacity: 0, x: 100 },
      { 
        opacity: 1, 
        x: 0, 
        duration: animationConfig.duration.normal,
        ease: animationConfig.ease.smooth,
      }
    );
  },

  scaleIn: (element: HTMLElement | string) => {
    return gsap.fromTo(
      element,
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: animationConfig.duration.normal,
        ease: animationConfig.ease.bounce,
      }
    );
  },
};

// Header animations
export const headerAnimations = {
  logoEntrance: (element: HTMLElement | string) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: -8, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: animationConfig.duration.fast,
        ease: animationConfig.ease.smooth,
      }
    );
  },

  navigationSlideIn: (elements: HTMLElement[] | string) => {
    return gsap.fromTo(
      elements,
      { opacity: 0, y: -20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: animationConfig.duration.normal,
        ease: animationConfig.ease.smooth,
        stagger: animationConfig.stagger.fast,
      }
    );
  },

  mobileMenuSlide: (element: HTMLElement | string) => {
    return gsap.fromTo(
      element,
      { opacity: 0, height: 0 },
      { 
        opacity: 1, 
        height: 'auto', 
        duration: animationConfig.duration.fast,
        ease: animationConfig.ease.smooth,
      }
    );
  },
};

// Hero section animations
export const heroAnimations = {
  titleReveal: (element: HTMLElement | string) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 50, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: animationConfig.duration.slow,
        ease: animationConfig.ease.smooth,
      }
    );
  },

  subtitleFadeIn: (element: HTMLElement | string) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: animationConfig.duration.normal,
        ease: animationConfig.ease.smooth,
        delay: 0.3,
      }
    );
  },

  buttonsStagger: (elements: HTMLElement[] | string) => {
    return gsap.fromTo(
      elements,
      { opacity: 0, y: 20, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: animationConfig.duration.normal,
        ease: animationConfig.ease.bounce,
        stagger: animationConfig.stagger.normal,
        delay: 0.6,
      }
    );
  },

  imageFloat: (element: HTMLElement | string) => {
    gsap.fromTo(
      element,
      { opacity: 0, scale: 0.8, rotation: -5 },
      { 
        opacity: 1, 
        scale: 1, 
        rotation: 0,
        duration: animationConfig.duration.slow,
        ease: animationConfig.ease.smooth,
        delay: 0.4,
      }
    );

    // Continuous floating animation
    return gsap.to(element, {
      y: -10,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  },
};

// Section animations with ScrollTrigger
export const sectionAnimations = {
  fadeInOnScroll: (element: HTMLElement | string, triggerElement?: HTMLElement | string) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: animationConfig.duration.normal,
        ease: animationConfig.ease.smooth,
        scrollTrigger: {
          trigger: triggerElement || element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  },

  slideInFromLeftOnScroll: (element: HTMLElement | string, triggerElement?: HTMLElement | string) => {
    return gsap.fromTo(
      element,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: animationConfig.duration.normal,
        ease: animationConfig.ease.smooth,
        scrollTrigger: {
          trigger: triggerElement || element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  },

  slideInFromRightOnScroll: (element: HTMLElement | string, triggerElement?: HTMLElement | string) => {
    return gsap.fromTo(
      element,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: animationConfig.duration.normal,
        ease: animationConfig.ease.smooth,
        scrollTrigger: {
          trigger: triggerElement || element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  },

  staggerCardsOnScroll: (elements: HTMLElement[] | string, triggerElement?: HTMLElement | string) => {
    return gsap.fromTo(
      elements,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: animationConfig.duration.normal,
        ease: animationConfig.ease.smooth,
        stagger: animationConfig.stagger.normal,
        scrollTrigger: {
          trigger: triggerElement || elements,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  },

  scaleInOnScroll: (element: HTMLElement | string, triggerElement?: HTMLElement | string) => {
    return gsap.fromTo(
      element,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: animationConfig.duration.normal,
        ease: animationConfig.ease.bounce,
        scrollTrigger: {
          trigger: triggerElement || element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  },
};

// Service card animations
export const serviceAnimations = {
  cardHover: (element: HTMLElement | string) => {
    const card = typeof element === 'string' ? document.querySelector(element) : element;
    if (!card) return;

    const icon = card.querySelector('.service-icon');
    const title = card.querySelector('.service-title');
    const description = card.querySelector('.service-description');

    card.addEventListener('mouseenter', () => {
      gsap.to(card, { 
        y: -10, 
        scale: 1.05,
        duration: animationConfig.duration.fast,
        ease: animationConfig.ease.smooth,
      });
      gsap.to(icon, { 
        scale: 1.2, 
        rotation: 360,
        duration: animationConfig.duration.normal,
        ease: animationConfig.ease.bounce,
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { 
        y: 0, 
        scale: 1,
        duration: animationConfig.duration.fast,
        ease: animationConfig.ease.smooth,
      });
      gsap.to(icon, { 
        scale: 1, 
        rotation: 0,
        duration: animationConfig.duration.normal,
        ease: animationConfig.ease.smooth,
      });
    });
  },
};

// Button animations
export const buttonAnimations = {
  pulseOnHover: (element: HTMLElement | string) => {
    const btn = typeof element === 'string' ? document.querySelector(element) : element;
    if (!btn) return;

    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { 
        scale: 1.05,
        duration: animationConfig.duration.fast,
        ease: animationConfig.ease.smooth,
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { 
        scale: 1,
        duration: animationConfig.duration.fast,
        ease: animationConfig.ease.smooth,
      });
    });
  },

  clickRipple: (element: HTMLElement | string) => {
    const btn = typeof element === 'string' ? document.querySelector(element) : element;
    if (!btn) return;

    btn.addEventListener('click', (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const ripple = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = mouseEvent.clientX - rect.left - size / 2;
      const y = mouseEvent.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
      `;

      btn.appendChild(ripple);

      gsap.to(ripple, {
        scale: 2,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => ripple.remove(),
      });
    });
  },
};

// Footer animations
export const footerAnimations = {
  slideUpOnScroll: (element: HTMLElement | string) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: animationConfig.duration.slow,
        ease: animationConfig.ease.smooth,
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  },

  staggerColumns: (elements: HTMLElement[] | string) => {
    return gsap.fromTo(
      elements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: animationConfig.duration.normal,
        ease: animationConfig.ease.smooth,
        stagger: animationConfig.stagger.normal,
        scrollTrigger: {
          trigger: elements,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  },
};

// Utility functions
export const animationUtils = {
  // Initialize all animations for a page
  initPageAnimations: (pageType: 'home' | 'services' | 'contact' | 'booking' | 'tracking') => {
    // Common animations for all pages
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    if (header) {
      headerAnimations.logoEntrance('.logo');
      headerAnimations.navigationSlideIn('nav a');
    }

    if (footer) {
      footerAnimations.slideUpOnScroll(footer);
      footerAnimations.staggerColumns('.footer-column');
    }

    // Page-specific animations
    switch (pageType) {
      case 'home':
        // Hero animations
        heroAnimations.titleReveal('.hero-title');
        heroAnimations.subtitleFadeIn('.hero-subtitle');
        heroAnimations.buttonsStagger('.hero-buttons a');
        heroAnimations.imageFloat('.hero-image');

        // Section animations
        sectionAnimations.fadeInOnScroll('.about-section');
        sectionAnimations.staggerCardsOnScroll('.service-card');
        sectionAnimations.staggerCardsOnScroll('.client-card');
        sectionAnimations.staggerCardsOnScroll('.partner-card');
        sectionAnimations.scaleInOnScroll('.cta-section');

        // Parallax: decorative foreground blobs in Services section
        const servicesParallaxLayers = document.querySelectorAll('.services-section .parallax-layer');
        if (servicesParallaxLayers.length) {
          servicesParallaxLayers.forEach(layer => {
            const el = layer as HTMLElement;
            const speed = parseFloat(el.dataset.speed || '0.35');
            // Ensure GPU acceleration
            el.style.willChange = el.style.willChange || 'transform';

            gsap.fromTo(
              el,
              { yPercent: 10 * speed, xPercent: -5 * speed, force3D: true },
              {
                yPercent: -120 * speed,
                xPercent: 5 * speed,
                ease: 'none',
                force3D: true,
                scrollTrigger: {
                  trigger: '.services-section',
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.5,
                },
              }
            );
          });
        }

        // Parallax: background layers in Services section (true background parallax)
        const servicesBg = document.querySelector('.services-section .services-bg') as HTMLElement | null;
        const servicesParticles = document.querySelector('.services-section .services-particles') as HTMLElement | null;
        const servicesParticles2 = document.querySelector('.services-section .services-particles-2') as HTMLElement | null;

        if (servicesBg) {
          servicesBg.style.willChange = servicesBg.style.willChange || 'transform';
          gsap.fromTo(
            servicesBg,
            { y: -40, force3D: true },
            {
              y: 40,
              ease: 'none',
              force3D: true,
              scrollTrigger: {
                trigger: '.services-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
            }
          );
        }

        if (servicesParticles) {
          servicesParticles.style.willChange = servicesParticles.style.willChange || 'transform, background-position';
          gsap.fromTo(
            servicesParticles,
            { y: -120, backgroundPositionY: '0px', force3D: true },
            {
              y: 120,
              backgroundPositionY: '160px',
              ease: 'none',
              force3D: true,
              scrollTrigger: {
                trigger: '.services-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            }
          );
        }

        if (servicesParticles2) {
          servicesParticles2.style.willChange = servicesParticles2.style.willChange || 'transform, background-position';
          gsap.fromTo(
            servicesParticles2,
            { y: -180, backgroundPositionY: '0px', force3D: true },
            {
              y: 180,
              backgroundPositionY: '-220px',
              ease: 'none',
              force3D: true,
              scrollTrigger: {
                trigger: '.services-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          );
        }
        break;

      case 'services':
        sectionAnimations.fadeInOnScroll('.services-hero');
        sectionAnimations.staggerCardsOnScroll('.service-detail-card');
        break;

      case 'contact':
        sectionAnimations.slideInFromLeftOnScroll('.contact-info');
        sectionAnimations.slideInFromRightOnScroll('.contact-form');
        break;

      case 'booking':
        sectionAnimations.fadeInOnScroll('.booking-form');
        sectionAnimations.staggerCardsOnScroll('.booking-step');
        break;

      case 'tracking':
        sectionAnimations.fadeInOnScroll('.tracking-form');
        sectionAnimations.scaleInOnScroll('.tracking-result');
        break;
    }

    // Add hover animations to buttons and cards
    document.querySelectorAll('.btn, button').forEach(btn => {
      buttonAnimations.pulseOnHover(btn as HTMLElement);
      buttonAnimations.clickRipple(btn as HTMLElement);
    });

    document.querySelectorAll('.service-card, .card').forEach(card => {
      serviceAnimations.cardHover(card as HTMLElement);
    });
  },

  // Refresh ScrollTrigger (useful for dynamic content)
  refreshScrollTrigger: () => {
    if (typeof window !== 'undefined') {
      ScrollTrigger.refresh();
    }
  },

  // Kill all animations
  killAllAnimations: () => {
    gsap.killTweensOf('*');
    if (typeof window !== 'undefined') {
      ScrollTrigger.killAll();
    }
  },

  // Create a timeline for complex animations
  createTimeline: (options?: gsap.TimelineVars) => {
    return gsap.timeline(options);
  },
};

// Export default animation initializer
export const initAnimations = (pageType: 'home' | 'services' | 'contact' | 'booking' | 'tracking') => {
  if (typeof window !== 'undefined') {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        animationUtils.initPageAnimations(pageType);
      });
    } else {
      animationUtils.initPageAnimations(pageType);
    }
  }
};