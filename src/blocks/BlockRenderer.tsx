import type { FC } from "react";
import { PagesBlocks } from "../../tina/__generated__/types";
import * as Sections from "@/blocks";

type BlockRendererProps = {
  blocks?: (PagesBlocks | null)[] | null;
};

type ExtractBlock<T, TName> = T extends { __typename: TName } ? T : never;

type BlockTypenames = Exclude<PagesBlocks["__typename"], undefined>;

const componentMap: {
  [K in BlockTypenames]?: FC<{ data: ExtractBlock<PagesBlocks, K> }>;
} = {
  PagesBlocksHeroTemplate: Sections.HeroBlock,
  PagesBlocksIntroTemplate: Sections.IntroductionBlock,
  PagesBlocksContextTemplate: Sections.MarketContextBlock,
  PagesBlocksTargetAudienceTemplate: Sections.TargetAudienceBlock,
  PagesBlocksHowItWorkTemplate: Sections.HowItWorkBlock,
  PagesBlocksFaq: Sections.FaqBlock,
  PagesBlocksFeaturesTemplate: Sections.FeaturesBlock,
  PagesBlocksContactTemplate: Sections.ContactUsBlock,
  PagesBlocksCtaTemplate: Sections.CTABlock,
  PagesBlocksCapabilitiesTemplate: Sections.CapabilitesBlock,
  PagesBlocksIntegrationsTemplate: Sections.IntegrationBlock,
};

const BlockRenderer: FC<BlockRendererProps> = ({ blocks }) => {
  if (!blocks) {
    return null;
  }

  return (
    <>
      {blocks.map((block, index) => {
        if (!block || !block.__typename) {
          return null;
        }
        const Component = componentMap[block.__typename] as FC<{ data: typeof block }>;
        const key = `${block.__typename}-${index}`;

        // console.log('Rendering block:', key, block);
        return Component ? (
          <section id={key} key={key}>
            <Component data={block} />
          </section>
        ) : null;
      })}
    </>
  );
};

export default BlockRenderer;
