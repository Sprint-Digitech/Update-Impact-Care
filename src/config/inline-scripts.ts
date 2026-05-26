/** WordPress / Elementor / ElementsKit globals required before script bundles run */

export const ELEMENTSKIT_CONFIG = `var elementskit = {
			resturl: '/wp-json/elementskit/v1/',
		}`;

export const ELEMENTSKIT_PARALLAX = `var elementskit_module_parallax_url = "/vendor/plugins/elementskit/modules/parallax/";`;

export const WP_I18N = `wp.i18n.setLocaleData( { 'text direction\\u0004ltr': [ 'ltr' ] } );`;

export const WPCF7_CONFIG = `var wpcf7 = {
    "api": {
        "root": "/wp-json/",
        "namespace": "contact-form-7/v1"
    }
};`;

export const ELEMENTOR_FRONTEND_CONFIG = `var elementorFrontendConfig = {"environmentMode":{"edit":false,"wpPreview":false,"isScriptDebug":false},"i18n":{"shareOnFacebook":"Share on Facebook","shareOnTwitter":"Share on Twitter","pinIt":"Pin it","download":"Download","downloadImage":"Download image","fullscreen":"Fullscreen","zoom":"Zoom","share":"Share","playVideo":"Play Video","previous":"Previous","next":"Next","close":"Close","a11yCarouselPrevSlideMessage":"Previous slide","a11yCarouselNextSlideMessage":"Next slide","a11yCarouselFirstSlideMessage":"This is the first slide","a11yCarouselLastSlideMessage":"This is the last slide","a11yCarouselPaginationBulletMessage":"Go to slide"},"is_rtl":false,"breakpoints":{"xs":0,"sm":480,"md":768,"lg":1025,"xl":1440,"xxl":1600},"responsive":{"breakpoints":{"mobile":{"label":"Mobile Portrait","value":767,"default_value":767,"direction":"max","is_enabled":true},"mobile_extra":{"label":"Mobile Landscape","value":880,"default_value":880,"direction":"max","is_enabled":false},"tablet":{"label":"Tablet Portrait","value":1024,"default_value":1024,"direction":"max","is_enabled":true},"tablet_extra":{"label":"Tablet Landscape","value":1200,"default_value":1200,"direction":"max","is_enabled":false},"laptop":{"label":"Laptop","value":1366,"default_value":1366,"direction":"max","is_enabled":false},"widescreen":{"label":"Widescreen","value":2400,"default_value":2400,"direction":"min","is_enabled":false}},"hasCustomBreakpoints":false},"version":"4.0.9","is_static":false,"experimentalFeatures":{"container":true,"nested-elements":true,"global_classes_should_enforce_capabilities":true,"e_variables":true,"e_opt_in_v4_page":true,"e_components":true,"e_interactions":true,"e_widget_creation":true,"import-export-customization":true},"urls":{"assets":"/vendor/plugins/elementor/assets/","ajaxurl":"/wp-admin/admin-ajax.php","uploadUrl":"/assets/uploads"},"nonces":{"floatingButtonsClickTracking":"a13287d5c7","atomicFormsSendForm":"2d025462da"},"swiperClass":"swiper","settings":{"page":[],"editorPreferences":[]},"kit":{"body_background_background":"classic","active_breakpoints":["viewport_mobile","viewport_tablet"],"global_image_lightbox":"yes","lightbox_enable_counter":"yes","lightbox_enable_fullscreen":"yes","lightbox_enable_zoom":"yes","lightbox_enable_share":"yes","lightbox_title_src":"title","lightbox_description_src":"description"},"post":{"id":13,"title":"Dispnsary%20%E2%80%93%20Medical%20WordPress%20Theme","excerpt":"","featuredImage":false}};`;

export const MEJS_L10N = `var mejsL10n = {"language":"en","strings":{"mejs.download-file":"Download File","mejs.install-flash":"You are using a browser that does not have Flash player enabled or installed. Please turn on your Flash player plugin or download the latest version from https://get.adobe.com/flashplayer/","mejs.fullscreen":"Fullscreen","mejs.play":"Play","mejs.pause":"Pause","mejs.time-slider":"Time Slider","mejs.time-help-text":"Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds.","mejs.live-broadcast":"Live Broadcast","mejs.volume-help-text":"Use Up/Down Arrow keys to increase or decrease volume.","mejs.unmute":"Unmute","mejs.mute":"Mute","mejs.volume-slider":"Volume Slider","mejs.video-player":"Video Player","mejs.audio-player":"Audio Player","mejs.captions-subtitles":"Captions/Subtitles","mejs.captions-chapters":"Chapters","mejs.none":"None","mejs.english":"English"}};`;

export const WP_MEDIAELEMENT_SETTINGS = `var _wpmejsSettings = {"pluginPath":"/vendor/wp-includes/js/mediaelement/","classPrefix":"mejs-","stretching":"responsive","audioShortcodeLibrary":"mediaelement","videoShortcodeLibrary":"mediaelement"};`;

export const EKIT_CONFIG = `var ekit_config = {"ajaxurl":"/wp-admin/admin-ajax.php","nonce":"0c68568172"};`;
