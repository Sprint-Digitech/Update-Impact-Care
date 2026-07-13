"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { EXTERNAL_SCRIPTS } from "@/config/scripts";
import {
  EKIT_CONFIG,
  ELEMENTOR_FRONTEND_CONFIG,
  ELEMENTSKIT_CONFIG,
  ELEMENTSKIT_PARALLAX,
  MEJS_L10N,
  WP_I18N,
  WPCF7_CONFIG,
  WP_MEDIAELEMENT_SETTINGS,
} from "@/config/inline-scripts";
import { loadScript, runInlineScript } from "@/utils/loadScript";

export function useThemeScripts() {
  useEffect(() => {
    let cancelled = false;

    async function init() {
      runInlineScript(ELEMENTSKIT_CONFIG, "elementskit-config");
      runInlineScript(ELEMENTSKIT_PARALLAX, "elementskit-parallax-config");

      for (const { src, id } of EXTERNAL_SCRIPTS) {
        if (cancelled) return;

        if (id === "wp-i18n-js") {
          await loadScript(src, id);
          runInlineScript(WP_I18N, "wp-i18n-js-after");
          continue;
        }

        if (id === "contact-form-7-js") {
          runInlineScript(WPCF7_CONFIG, "contact-form-7-js-before");
          await loadScript(src, id);
          continue;
        }

        if (id === "elementor-frontend-js") {
          runInlineScript(ELEMENTOR_FRONTEND_CONFIG, "elementor-frontend-js-before");
          await loadScript(src, id);
          continue;
        }

        if (id === "mediaelement-core-js") {
          runInlineScript(MEJS_L10N, "mediaelement-core-js-before");
          await loadScript(src, id);
          continue;
        }

        if (id === "wp-mediaelement-js") {
          runInlineScript(WP_MEDIAELEMENT_SETTINGS, "mediaelement-js-extra");
          await loadScript(src, id);
          continue;
        }

        if (id === "elementskit-elementor-js") {
          runInlineScript(EKIT_CONFIG, "elementskit-elementor-js-extra");
          await loadScript(src, id);
          continue;
        }

        await loadScript(src, id);
      }

      if (!cancelled) {
        window.jQuery?.(window).trigger("elementor/lazyload/observe");
      }
    }

    init().catch((error) => console.error("[theme-scripts]", error));

    return () => {
      cancelled = true;
    };
  }, []);

  // Update active menu item based on current URL
  const pathname = usePathname();
  useEffect(() => {
    const updateActiveMenu = () => {
      // Remove hardcoded active classes
      document.querySelectorAll('.elementskit-navbar-nav .nav-item').forEach(li => {
        li.classList.remove('current-menu-item', 'current-menu-ancestor', 'current-menu-parent', 'active');
        const a = li.querySelector('a');
        if (a) a.classList.remove('active');
      });
      
      // Add active class to the correct item based on current pathname
      document.querySelectorAll('.elementskit-navbar-nav .nav-item > a').forEach(a => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        
        // Match exact or trailing slash variations
        if (href === pathname || href === pathname + '/' || href + '/' === pathname) {
          a.classList.add('active');
          a.parentElement?.classList.add('current-menu-item');
        }
      });
    };

    updateActiveMenu();
    // Re-run after a small delay in case ElementsKit JS modifies the DOM
    setTimeout(updateActiveMenu, 100);
    setTimeout(updateActiveMenu, 500);
    
    // --- ROBUST INITIALIZATION USING POLLING ---
    let sliderInitialized = false;
    let searchInitialized = false;
    
    const initInterval = setInterval(() => {
      // 1. Fix Search Icon Click (Event Delegation)
      if (!searchInitialized) {
        const searchIcons = document.querySelectorAll('.custom-search-icon');
        if (searchIcons.length > 0) {
          searchInitialized = true;
          // Use event delegation on document to catch clicks regardless of when icon is rendered
          document.addEventListener('click', (e) => {
            const target = e.target as Element;
            if (target && (target.matches('.custom-search-icon') || target.closest('.custom-search-icon'))) {
              e.preventDefault();
              e.stopPropagation();
              const query = window.prompt("Search products:");
              if (query) {
                window.location.href = "/products/?search=" + encodeURIComponent(query);
              }
            }
          });
        }
      }
      
      // 2. Fix Home Page Hero Slider Arrows
      if (!sliderInitialized) {
        const slides = document.querySelectorAll('.hero-slide');
        if (slides.length > 0) {
          sliderInitialized = true;
          let currentSlide = 0;
          let slideInterval = setInterval(nextSlide, 5000);
          
          function showSlide(index: number) {
            const currentSlides = document.querySelectorAll('.hero-slide');
            currentSlides.forEach((slide, i) => {
              const el = slide as HTMLElement;
              el.style.opacity = (i === index) ? '1' : '0';
              el.style.animation = 'none'; // Kill CSS animation
              el.style.zIndex = (i === index) ? '1' : '0';
              el.style.transition = 'opacity 0.5s ease-in-out';
            });
            document.querySelectorAll('.hero-dot').forEach((dot, i) => {
               const el = dot as HTMLElement;
               el.style.background = (i === index) ? '#0d2657' : 'rgba(148, 163, 184, 0.8)';
               el.style.animation = 'none';
            });
          }
          
          function nextSlide() {
            const currentSlides = document.querySelectorAll('.hero-slide');
            if (currentSlides.length === 0) return;
            currentSlide = (currentSlide + 1) % currentSlides.length;
            showSlide(currentSlide);
          }
          function prevSlide() {
            const currentSlides = document.querySelectorAll('.hero-slide');
            if (currentSlides.length === 0) return;
            currentSlide = (currentSlide - 1 + currentSlides.length) % currentSlides.length;
            showSlide(currentSlide);
          }
          
          // Event delegation for slider arrows and dots
          document.addEventListener('click', (e) => {
            const target = e.target as Element;
            
            // Next arrow
            if (target.closest('.hero-nav-next')) {
              e.preventDefault();
              clearInterval(slideInterval);
              nextSlide();
              slideInterval = setInterval(nextSlide, 5000);
            }
            
            // Prev arrow
            if (target.closest('.hero-nav-prev')) {
              e.preventDefault();
              clearInterval(slideInterval);
              prevSlide();
              slideInterval = setInterval(nextSlide, 5000);
            }
            
            // Dots
            const dot = target.closest('.hero-dot');
            if (dot) {
              e.preventDefault();
              const allDots = Array.from(document.querySelectorAll('.hero-dot'));
              const index = allDots.indexOf(dot as Element);
              if (index !== -1) {
                clearInterval(slideInterval);
                currentSlide = index;
                showSlide(currentSlide);
                slideInterval = setInterval(nextSlide, 5000);
              }
            }
          });
          
          // Fix pointer events globally for these UI elements so they can be clicked
          const style = document.createElement('style');
          style.textContent = `
            .hero-nav-next, .hero-nav-prev, .hero-dot, .custom-search-icon {
              pointer-events: auto !important;
              cursor: pointer !important;
            }
          `;
          document.head.appendChild(style);
          
          showSlide(0);
        }
      }
      
      // Clear interval if both are initialized or if we are not on home page (for slider)
      if (searchInitialized && sliderInitialized) {
        clearInterval(initInterval);
      }
    }, 500);

    // Clean up interval on unmount
    return () => clearInterval(initInterval);
    
  }, [pathname]);
  
  // Bulletproof mobile menu toggler to avoid React/ElementsKit conflicts
  useEffect(() => {
    const handleMobileToggle = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Handle hamburger or close button click
      const toggler = target.closest('.elementskit-menu-toggler');
      if (toggler) {
        e.preventDefault();
        e.stopPropagation();
        
        const nav = toggler.closest('.ekit_menu_responsive_mobile') || document.querySelector('.ekit_menu_responsive_mobile');
        if (nav) {
          const container = nav.querySelector('.elementskit-menu-container');
          container?.classList.toggle('active');
        }
        return;
      }

      // Handle closing when clicking on a link
      const anchor = target.closest('a');
      if (anchor) {
        const nav = anchor.closest('.ekit_menu_responsive_mobile') || document.querySelector('.ekit_menu_responsive_mobile');
        if (nav) {
          const container = nav.querySelector('.elementskit-menu-container');
          container?.classList.remove('active');
        }
      }
    };

    document.addEventListener('click', handleMobileToggle, true); // Use capture phase to ensure we intercept it

    return () => {
      document.removeEventListener('click', handleMobileToggle, true);
    };
  }, []);
}
