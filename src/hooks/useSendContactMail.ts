import { useState, useCallback } from "react";

interface ContactMailInput {
  fullName: string;
  companyName: string;
  businessEmail: string;
  phone: string;
  message?: string;
  subject?: string;
}

export const useSendContactMail = () => {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const sendContactMail = useCallback(async ({
    fullName,
    companyName,
    businessEmail,
    phone = "",
    message = "",
    subject = "",
  }: ContactMailInput): Promise<boolean> => {
    setLoading(true);
    setResponseMessage("");

    try {
      // Build the HTML template for the email body
      let htmlContent = `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2>New Access Request</h2>
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Company:</strong> ${companyName}</p>
          <p><strong>Email:</strong> ${businessEmail}</p>
      `;

      if (phone) htmlContent += `<p><strong>Phone:</strong> ${phone}</p>`;
      if (message) htmlContent += `<p><strong>Message:</strong><br/>${message}</p>`;
      
      htmlContent += `</div>`;

      const response = await fetch("/api/mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subject || `Access Request from ${fullName}`,
          message: htmlContent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setResponseMessage(data.error || "Failed to send email.");
        return false;
      }

      setResponseMessage("Email sent successfully!");
      return true;
    } catch (error) {
      console.error("Mail Error:", error);
      setResponseMessage("Something went wrong with the mail server.");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, responseMessage, sendContactMail };
};

export default useSendContactMail;