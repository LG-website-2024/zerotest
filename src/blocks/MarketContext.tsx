import type { FC } from "react";
import type { PagesBlocksContextTemplate } from "../../tina/__generated__/types";
import { SmartTitle } from "@/components/ui/SmartTitle";
import { SmartSubtext } from "@/components/ui/SmartSubtext";
import { tinaField } from "tinacms/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

type Props = {
  data: PagesBlocksContextTemplate;
};

export const MarketContextBlock: FC<Props> = ({ data }) => {
  const { header, subtext, table, subtext2 } = data;

  return (
    <section
      className="relative py-20 pb-20 bg-transparent"
      data-tina-field={tinaField(data)}
    >
      <div
        className="absolute -left-50 -bottom-40 -z-10 h-100 w-100 rounded-full bg-[#1B998B] blur-[200px]"
        aria-hidden="true"
      ></div>
      <div className="flex flex-col gap-6 mx-auto max-w-250 text-center items-center px-4">
        {header && (
          <SmartTitle
            as="h2"
            tinaField={tinaField(data, "header")}
            text={header}
            defaultColor="text-foreground"
            highlightColor="text-primary"
          />
        )}

        {subtext && (
          <SmartSubtext
            tinaField={tinaField(data, "subtext")}
            text={subtext}
            className="text-center mx-auto md:text-[22px] md:leading-7.5 font-medium"
          />
        )}

        {table && (
          <>
            <div className="hidden md:block rounded-[20px] overflow-hidden border-[0.5px] border-[#E1E5E9] shadow-sbom-table">
              <table
                data-tina-field={tinaField(data, "table")}
                className="border-separate border-spacing-0"
              >
                <thead>
                  <tr>
                    {(table.headers ?? []).map((header, index) => (
                      <th
                        data-tina-field={tinaField(
                          data,
                          `table.headers.${index}` as never
                        )}
                        key={index}
                        className={`px-4 py-4.5 w-88.5 text-[22px] font-semibold border-b border-[#E1E5E9] 
                          ${
                            index !== (table.headers?.length ?? 0) - 1
                              ? "border-r"
                              : ""
                          }`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(table.rows ?? []).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {(row?.cells ?? []).map((cell, cellIndex) => (
                        <td
                          data-tina-field={tinaField(
                            data,
                            `table.rows.${rowIndex}.cells.${cellIndex}` as never
                          )}
                          key={cellIndex}
                          className={`prose markdown-content text-left align-top text-[16px] leading-5.75 font-medium p-6 border-[#E1E5E9] 
                            ${
                              rowIndex !== (table.rows?.length ?? 0) - 1
                                ? "border-b"
                                : ""
                            } 
                            ${
                              cellIndex !== (row?.cells?.length ?? 0) - 1
                                ? "border-r"
                                : ""
                            }`}
                        >
                          <TinaMarkdown content={cell?.value} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile "Table": Visible only on small screens */}
            <div className="flex flex-col gap-6 md:hidden px-2">
              {(table.rows ?? []).map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="rounded-[20px] overflow-hidden border-[0.5px] border-[#E1E5E9] shadow-sbom-table bg-white"
                >
                  {(row?.cells ?? []).map((cell, cellIndex) => (
                    <div
                      key={cellIndex}
                      className={`p-4 ${
                        cellIndex !== (row?.cells?.length ?? 0) - 1
                          ? "border-b border-[#E1E5E9]"
                          : ""
                      }`}
                    >
                      <div className="text-[14px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                        {table.headers?.[cellIndex]}
                      </div>
                      <div className="prose markdown-content text-left text-[16px] leading-relaxed font-medium">
                        <TinaMarkdown content={cell?.value} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}

        {subtext2 && (
          <SmartSubtext
            tinaField={tinaField(data, "subtext2")}
            text={subtext2}
            className="text-[10px] md:text-[16px] md:leading-5.75"
          />
        )}
      </div>
    </section>
  );
};
