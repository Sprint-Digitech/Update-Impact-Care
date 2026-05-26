import { STYLESHEETS } from "@/config/stylesheets";
import { INLINE_STYLES } from "@/config/inline-styles";

export function Stylesheets() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
      />
      {STYLESHEETS.map((href) => (
        <link
          key={href}
          rel="stylesheet"
          href={`${href.split("?")[0]}?v=fontfix`}
        />
      ))}
      {INLINE_STYLES.map(({ id, content }) => (
        <style key={id} id={id} dangerouslySetInnerHTML={{ __html: content }} />
      ))}
      <style
        id="elementor-lazyload"
        dangerouslySetInnerHTML={{
          __html: `
				.e-con.e-parent:nth-of-type(n+4):not(.e-lazyloaded):not(.e-no-lazyload),
				.e-con.e-parent:nth-of-type(n+4):not(.e-lazyloaded):not(.e-no-lazyload) * {
					background-image: none !important;
				}
				@media screen and (max-height: 1024px) {
					.e-con.e-parent:nth-of-type(n+3):not(.e-lazyloaded):not(.e-no-lazyload),
					.e-con.e-parent:nth-of-type(n+3):not(.e-lazyloaded):not(.e-no-lazyload) * {
						background-image: none !important;
					}
				}
				@media screen and (max-height: 640px) {
					.e-con.e-parent:nth-of-type(n+2):not(.e-lazyloaded):not(.e-no-lazyload),
					.e-con.e-parent:nth-of-type(n+2):not(.e-lazyloaded):not(.e-no-lazyload) * {
						background-image: none !important;
					}
				}
			`,
        }}
      />
    </>
  );
}
