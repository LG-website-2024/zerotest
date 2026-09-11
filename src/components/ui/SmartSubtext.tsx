"use client";
import React from "react";

interface SmartSubtextProps {
  text: string;
  className?: string;
  tinaField?: string;
}

export const SmartSubtext = ({ text, className = "", tinaField }: SmartSubtextProps) => {
  if (!text) return null;

  const words = text.split(/(\s+)/);

  return (
    <p className={`whitespace-pre-line leading-relaxed ${className}`} data-tina-field={tinaField}>
      {words.map((word, i) => {
        if (word.match(/^\s+$/)) {
          return <React.Fragment key={i}>{word}</React.Fragment>;
        }

        return (
          <span
            key={i}
            className="animate-reveal opacity-0 inline-block"
            style={{ 
              animationDelay: `${0.5 + i * 0.01}s` 
            }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
};