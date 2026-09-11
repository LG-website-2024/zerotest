import { CtaButtonField } from "@/templates/shared/CtaButtonField";

import type { Collection } from "tinacms";

const Global: Collection = {
  label: "Global Settings",
  name: "global",
  path: "content/global",
  ui: {
    // router: ({ document }) => {
    //   if (document._sys.filename === "home") {
    //     return `/`;
    //   }
    //   return `/${document._sys.breadcrumbs.join("/")}`;
    // },
  },
  format: "json",
  fields: [
    {
      type: "image",
      label: "Logo",
      name: "logo",
    },
    {
      type: "string",
      label: "Logo Alt",
      name: "logoAlt",
    },
    CtaButtonField,
  ],
};

export default Global;
