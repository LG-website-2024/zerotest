import * as Templates from "@/templates";

import type { Collection } from "tinacms";

const Pages: Collection = {
  label: "Pages",
  name: "pages",
  path: "content/pages",
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") {
        return `/`;
      }
      return `/${document._sys.breadcrumbs.join("/")}`;
    },
  },
  format: "json",
  fields: [
    {
      type: "object",
      name: "seo",
      label: "SEO",
      searchable: false,
      fields: [
        {
          type: "string",
          name: "title",
          label: "SEO Title",
        },
        {
          type: "string",
          name: "description",
          label: "Meta Description",
        },
        {
          type: "string",
          name: "canonicalUrl",
          label: "Canonical URL",
        },
        {
          type: "image",
          name: "ogImage",
          label: "Open Graph Image",
        },
        {
          type: "string",
          name: "schemaJson",
          label: "Schema (as JSON string)",
          ui: {
            component: "textarea",
            validate: (value: string) => {
              if (!value?.trim()) {
                return undefined;
              }
              try {
                JSON.parse(value);
                return undefined;
              } catch (e) {
                return `Invalid JSON:${e}`;
              }
            },
          },
        },
      ],
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      searchable: false,
      ui: {
        visualSelector: true,
      },
      templates: [
        Templates.HeroTemplate,
        Templates.IntroductionTemplate,
        Templates.ContextTemplate,
        Templates.TargetAudienceTemplate,
        Templates.HowItWorkTemplate,
        Templates.FaqTemplate,
        Templates.FeaturesTemplate,
        Templates.ContactTemplate,
        Templates.CtaTemplate,
        Templates.CapabilitiesTemplate,
        Templates.IntegrationsTemplate,
      ],
    },
  ],
};

export default Pages;
