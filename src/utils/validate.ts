import { z } from "zod";

export const phoneSchema = z
  .string()
  .trim()
  .refine((s) => s.length > 0, {
    message: "Phone number is required",
  })
  .refine(
    (s) => {
      const plusCount = (s.match(/\+/g) ?? []).length;
      return plusCount <= 1 && (!s.includes("+") || s.startsWith("+"));
    },
    {
      message: "“+” must appear once and only at the start.",
    }
  )
  .refine(
    (s) => {
      const extMatch = s.match(/\s*(?:ext\.?|x|#)\s*(\d+)\s*$/i);
      const core = extMatch ? s.slice(0, extMatch.index).trim() : s;
      return /^[\d\s()\-+]+$/.test(core);
    },
    {
      message: "Only digits, spaces, (), +, and - are allowed.",
    }
  )
  .refine(
    (s) => {
      const extMatch = s.match(/\s*(?:ext\.?|x|#)\s*(\d+)\s*$/i);
      const core = extMatch ? s.slice(0, extMatch.index).trim() : s;
      let bal = 0;
      for (const ch of core) {
        if (ch === "(") bal++;
        if (ch === ")") bal--;
        if (bal < 0) return false;
      }
      return bal === 0;
    },
    {
      message: "Unbalanced parentheses.",
    }
  )
  .refine(
    (s) => {
      // separator rules: +123 45-67 allowed
      const extMatch = s.match(/\s*(?:ext\.?|x|#)\s*(\d+)\s*$/i);
      const core = extMatch ? s.slice(0, extMatch.index).trim() : s;
      const noParens = core.replace(/[()]/g, "");
      return /^\+?\d+(?:[ -]\d+)*$/.test(noParens);
    },
    {
      message: "Use digits with single spaces or hyphens between groups.",
    }
  )
  .refine(
    (s) => {
      // digit count: 7–15 digits
      const extMatch = s.match(/\s*(?:ext\.?|x|#)\s*(\d+)\s*$/i);
      const core = extMatch ? s.slice(0, extMatch.index).trim() : s;

      const digits = core.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15;
    },
    {
      message: "Enter 7-15 digits.",
    }
  )
  .refine(
    (s) => {
      // country code cannot start with 0
      if (!s.startsWith("+")) return true;
      const digits = s.replace(/\D/g, "");
      return digits[0] !== "0";
    },
    {
      message: "Country code cannot start with 0.",
    }
  );

const personalEmailProviders = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "protonmail.com",
  "zoho.com",
  "yandex.com",
  "live.com",
  "msn.com",
  "me.com",
  "yahoo.co.uk",
  "yahoo.co.jp",
  "gmx.com",
  "gmx.de",
  "gmx.net",
  "web.de",
  "t-online.de",
  "yahoo.de",
];

export const emailSchema = z
  .email("Invalid email format")
  .trim()
  .min(1, "Email is required")
  .refine(
    (email) => {
      const domain = email.split("@")[1]?.toLowerCase();
      if (!domain) return false;
      return !personalEmailProviders.some((provider) =>
        domain.includes(provider)
      );
    },
    {
      message:
        "Please enter a business email address.",
    }
  );
