import type { FC } from "react";
import type { PagesBlocksContactTemplate } from "../../tina/__generated__/types";
import { SmartTitle } from "@/components/ui/SmartTitle";
import { SmartSubtext } from "@/components/ui/SmartSubtext";
import { tinaField } from "tinacms/react";
import Image from "next/image";
import { ContactForm } from "@/components/form/ContactForm";

type Props = {
  data: PagesBlocksContactTemplate;
};

export const ContactUsBlock: FC<Props> = ({ data }) => {
  const { header, subtitle, contacts, background } = data;

  return (
    <section
      className="relative overflow-hidden py-10 md:py-20 pb-10 bg-transparent mx-2 md:mx-6 rounded-4xl md:rounded-[40px] px-4 md:px-6"
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
      <div className="flex flex-col gap-6 mx-auto text-center md:text-left w-full max-w-307.5">
        {header && (
          <h2
            data-tina-field={tinaField(data, "header")}
            className="text-gradient md:w-fit md:text-[80px] leading-30"
          >
            {header}
          </h2>
        )}
        <div className="flex flex-col md:flex-row gap-7.5 items-center md:items-start">
          <div className="flex flex-col gap-6">
            {subtitle && (
              <SmartTitle
                as="h3"
                tinaField={tinaField(data, "header")}
                text={subtitle}
                defaultColor="text-background"
                highlightColor="text-primary"
                className="md:text-[60px] md:leading-20 font-semibold"
              />
            )}

            {contacts?.map((contact, index) => (
              <div
                data-tina-field={tinaField(data, `contacts.${index}` as never)}
                className="flex flex-row gap-2 w-fit"
                key={index}
              >
                {contact?.icon && (
                  <Image
                    data-tina-field={tinaField(
                      data,
                      `contacts.${index}.icon` as never
                    )}
                    src={contact.icon}
                    alt="icon"
                    width={32}
                    height={32}
                  />
                )}
                {contact?.description && (
                  <SmartSubtext
                    tinaField={tinaField(
                      data,
                      `contacts.${index}.description` as never
                    )}
                    text={contact.description}
                    className="mx-auto text-[16px] text-white"
                  />
                )}
              </div>
            ))}
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
};
