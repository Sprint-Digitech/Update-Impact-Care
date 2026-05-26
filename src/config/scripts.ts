/** Script load order (matches original WordPress footer enqueue) */
export const EXTERNAL_SCRIPTS: { src: string; id: string }[] = [
  { src: "/vendor/js/wp-includes/js/jquery/jquery.min.js", id: "jquery-core-js" },
  { src: "/vendor/js/wp-includes/js/jquery/jquery-migrate.min.js", id: "jquery-migrate-js" },
  // Required by theme/Elementskit gallery filters (jQuery.fn.isotope)
  {
    src: "/vendor/plugins/elementskit-lite/widgets/init/assets/js/isotope.pkgd.min.js",
    id: "isotope-js",
  },
  {
    src: "/vendor/js/plugins/elementskit-lite/widgets/init/assets/js/widget-scripts.js",
    id: "ekit-widget-scripts-js",
  },
  { src: "/vendor/js/wp-includes/js/dist/hooks.min.js", id: "wp-hooks-js" },
  { src: "/vendor/js/wp-includes/js/dist/i18n.min.js", id: "wp-i18n-js" },
  { src: "/vendor/js/plugins/contact-form-7/includes/swv/js/index.js", id: "swv-js" },
  { src: "/vendor/js/plugins/contact-form-7/includes/js/index.js", id: "contact-form-7-js" },
  { src: "/vendor/js/theme/dispnsary/assets/js/SmoothScroll.js", id: "SmoothScroll-theme-js" },
  { src: "/vendor/js/theme/dispnsary/assets/js/gsap.min.js", id: "gsap-theme-js" },
  { src: "/vendor/js/theme/dispnsary/assets/js/magiccursor.js", id: "magiccursor-theme-js" },
  { src: "/vendor/js/theme/dispnsary/assets/js/SplitText.js", id: "SplitText-theme-js" },
  { src: "/vendor/js/theme/dispnsary/assets/js/ScrollTrigger.min.js", id: "ScrollTrigger-theme-js" },
  { src: "/vendor/js/theme/dispnsary/assets/js/function.js", id: "theme-js-js" },
  {
    src: "/vendor/js/plugins/elementor/assets/js/webpack.runtime.min.js",
    id: "elementor-webpack-runtime-js",
  },
  {
    src: "/vendor/js/plugins/elementor/assets/js/frontend-modules.min.js",
    id: "elementor-frontend-modules-js",
  },
  { src: "/vendor/js/wp-includes/js/jquery/ui/core.min.js", id: "jquery-ui-core-js" },
  { src: "/vendor/js/plugins/elementor/assets/js/frontend.min.js", id: "elementor-frontend-js" },
  {
    src: "/vendor/js/wp-includes/js/mediaelement/mediaelement-and-player.min.js",
    id: "mediaelement-core-js",
  },
  {
    src: "/vendor/js/wp-includes/js/mediaelement/mediaelement-migrate.min.js",
    id: "mediaelement-migrate-js",
  },
  { src: "/vendor/js/wp-includes/js/mediaelement/wp-mediaelement.min.js", id: "wp-mediaelement-js" },
  {
    src: "/vendor/js/plugins/elementskit-lite/widgets/init/assets/js/jquery.magnific-popup.min.js",
    id: "magnific-popup-js",
  },
  {
    src: "/vendor/js/plugins/elementor/assets/lib/jquery-numerator/jquery-numerator.min.js",
    id: "jquery-numerator-js",
  },
  { src: "/vendor/js/wp-includes/js/imagesloaded.min.js", id: "imagesloaded-js" },
  {
    src: "/vendor/js/plugins/elementskit-lite/widgets/init/assets/js/elementor.js",
    id: "elementskit-elementor-js",
  },
  {
    src: "/vendor/js/plugins/elementskit/widgets/init/assets/js/elementor.js",
    id: "elementskit-elementor-pro-js",
  },
];
