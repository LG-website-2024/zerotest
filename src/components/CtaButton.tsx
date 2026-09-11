import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { GlobalCtaBtn, PagesBlocksCtaTemplateCtaBtn, PagesBlocksHeroTemplateCtaBtn } from "../../tina/__generated__/types";
import { VariantProps } from "class-variance-authority";
import { ArrowCircle } from "./icon/ArrowCircle";

type Props = {
  data?: PagesBlocksHeroTemplateCtaBtn | PagesBlocksCtaTemplateCtaBtn | GlobalCtaBtn;
  className?: string;
  tinaField?: string;
};

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
type ButtonSize = VariantProps<typeof buttonVariants>["size"];

export function CtaButton({ data, className = '', tinaField }: Props) {
  if (!data?.label || !data?.url) return null;

  const variant = (data.variant as ButtonVariant) ?? "default";
  const size = (data.size as ButtonSize) ?? "default";

  const isExternal = data.url.startsWith("http");

  return (
    <Button className={className} variant={variant} size={size} data-tina-field={tinaField} asChild>
      <Link
        href={data.url}
        target={data.newTab || isExternal ? "_blank" : undefined}
        rel={data.newTab || isExternal ? "noopener noreferrer" : undefined}
      >
        {data.label}
        <ArrowCircle />
      </Link>
    </Button>
  );
}
