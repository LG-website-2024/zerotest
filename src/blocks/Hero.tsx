import Image from "next/image";
import type { FC } from "react";
import type { PagesBlocksHeroTemplate } from "../../tina/__generated__/types";
import { CtaButton } from "@/components/CtaButton";
import { SmartTitle } from "@/components/ui/SmartTitle";
import { SmartSubtext } from "@/components/ui/SmartSubtext";
import { tinaField } from "tinacms/react";

type Props = {
  data: PagesBlocksHeroTemplate;
};

export const HeroBlock: FC<Props> = ({ data }) => {
  const { header, subtext, image, background, ctaBtn, subtext2 } = data;

  return (
    <section
      className="relative overflow-hidden pt-30 pb-15 bg-transparent"
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

      <div className="flex flex-col gap-6 mx-auto max-w-6xl text-center items-center px-4">
        {header && (
          <SmartTitle
            tinaField={tinaField(data, "header")}
            text={header}
            defaultColor="text-background"
            highlightColor="text-primary"
          />
        )}

        {subtext && (
          <SmartSubtext
            tinaField={tinaField(data, "subtext")}
            text={subtext}
            className="text-white/80 text-center max-w-235.5 mx-auto"
          />
        )}

        {ctaBtn && (
          <CtaButton
            tinaField={tinaField(data, "ctaBtn")}
            data={ctaBtn}
            className="w-50"
          />
        )}

        {subtext2 && (
          <SmartSubtext
            tinaField={tinaField(data, "subtext2")}
            text={subtext2}
            className="text-primary text-center mx-auto"
          />
        )}

        {image?.src && (
          <div className="relative mx-auto max-w-243 rounded-md border-12 border-white shadow-2xl" data-tina-field={tinaField(data, "image")}>
            <Image
              src={image.src}
              alt="Product screenshot"
              width={1200}
              height={800}
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
};
