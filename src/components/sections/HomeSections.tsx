import { Section } from "./Section";
import { HERO_HTML } from "./content/hero";
import { ABOUT_HTML } from "./content/about";
import { SERVICES_HTML } from "./content/services";
import { WHY_CHOOSE_HTML } from "./content/why-choose";
import { HOW_WE_WORK_HTML } from "./content/how-we-work";
import { BY_THE_NUMBERS_HTML } from "./content/by-the-numbers";
import { FAQ_HTML } from "./content/faq";
import { TEAM_HTML } from "./content/team";
import { HEALTH_HTML } from "./content/health";
import { CTA_HTML } from "./content/cta";
import { TESTIMONIALS_HTML } from "./content/testimonials";
import { BLOG_HTML } from "./content/blog";

export function HomeSections() {
  return (
    <div
      data-elementor-type="wp-page"
      data-elementor-id="13"
      className="elementor elementor-13"
      id="content"
      suppressHydrationWarning
    >
      <Section html={HERO_HTML} />
      <Section html={ABOUT_HTML} />
      <Section html={WHY_CHOOSE_HTML} />
      <Section html={HOW_WE_WORK_HTML} />
      <Section html={BY_THE_NUMBERS_HTML} />
      <Section html={FAQ_HTML} />
      <Section html={TEAM_HTML} />
      <Section html={HEALTH_HTML} />
      <Section html={CTA_HTML} />
      <Section html={TESTIMONIALS_HTML} />
      <Section html={BLOG_HTML} />
    </div>
  );
}
