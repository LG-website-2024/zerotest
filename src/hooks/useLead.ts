import { useState, useCallback } from "react";

export type LeadRequest = {
  LastName: string;
  Company: string;
  Email: string;
  Title: string;
  Phone: string;
  Description?: string;
  Status: string;
  LeadSource?: string;
  website_source__c?: string;
};

export const useLead = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createLead = useCallback(async (req: LeadRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create lead");
      }

      return { success: true, data: result };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return { error, loading, createLead };
};