import type { FC } from "react";
import type { PagesBlocksCtaTemplate } from "../../tina/__generated__/types";
import { SmartSubtext } from "@/components/ui/SmartSubtext";
import { tinaField } from "tinacms/react";
import Image from "next/image";
import { CtaButton } from "@/components/CtaButton";
import { SmartTitle } from "@/components/ui/SmartTitle";

type Props = {
  data: PagesBlocksCtaTemplate;
};

export const CTABlock: FC<Props> = ({ data }) => {
  const { header, subtext, background, ctaBtn } = data;

  return (
    <section
      className="relative overflow-hidden py-20 pb-10 bg-transparent mx-6 rounded-[40px] px-6"
      data-tina-field={tinaField(data)}
    >
      {/* Background image */}
      {background && (
        <Image
          src={background}
          alt=""
          fill
          priority
          className="object-cover -z-10"
        />
      )}
      <div className="flex flex-col gap-6 mx-auto text-center items-center w-full max-w-307.5">
        {header && (
          <SmartTitle
            as="h2"
            tinaField={tinaField(data, "header")}
            text={header}
            defaultColor="text-background"
            highlightColor="text-primary"
            className="md:text-[60px] md:leading-17.5 font-bold"
          />
        )}

        {subtext && (
          <SmartSubtext
            tinaField={tinaField(data, "subtext")}
            text={subtext}
            className="text-white max-w-291 mx-auto text-[16px] md:text-[24px]"
          />
        )}

        {ctaBtn && (
          <CtaButton
            tinaField={tinaField(data, "ctaBtn")}
            data={ctaBtn}
            className="w-50"
          />
        )}
      </div>
    </section>
  );
};
