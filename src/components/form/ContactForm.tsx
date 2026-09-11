"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, ContactFormValues } from "./schema";
import { ArrowCircle } from "../icon/ArrowCircle";
import { useEffect, useState } from "react";
import { LeadRequest, useLead } from "@/hooks/useLead";
import useSendContactMail from "@/hooks/useSendContactMail";
import { CheckCircle2, Loader2 } from "lucide-react";

export const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { createLead } = useLead();
  const { sendContactMail, loading } = useSendContactMail();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      businessEmail: "",
      companyName: "",
      phoneNumber: "",
      message: "",
      company_website: "", // Honeypot
    },
  });

  const isPending = form.formState.isSubmitting;

  // Start timer on mount for Bot protection
  useEffect(() => {
    sessionStorage.setItem("form_loaded_at", Date.now().toString());
  }, []);

  const onSubmit = async (values: ContactFormValues) => {
    console.log(values);
    const loadedAt = Number(sessionStorage.getItem("form_loaded_at") || 0);
    const engagementTime = loadedAt ? Date.now() - loadedAt : 0;

    // Bot Protection: Instant submit check (3 seconds)
    if (!loadedAt || engagementTime < 3000) return;

    // Bot Protection: Honeypot check
    if (values.company_website) {
      setIsSubmitted(true);
      return;
    }

    const mailSuccess = await sendContactMail({
      fullName: values.fullName,
      companyName: values.companyName,
      businessEmail: values.businessEmail,
      phone: values.phoneNumber,
      message: values.message,
      subject: "SBOM New Access Request",
    });

    if (mailSuccess) {
      // Background Lead creation (ignored if fails)
      const leadData: LeadRequest = {
        LastName: values.fullName,
        Company: values.companyName,
        Email: values.businessEmail,
        Title: "Unknown Title",
        Phone: values.phoneNumber,
        Description: "New Access Request from SBOM Website Form",
        Status: "NEW",
        LeadSource: "website",
        website_source__c: "sbom-contact-form",
      };

      createLead(leadData);
      setIsSubmitted(true);
      form.reset();
    } else {
      console.error("Something went wrong. Mail not sent.");
    }

    // Analytics: Google Tag Manager / Gtag
    // if (window.gtag) {
    //   window.gtag("event", "generate_lead", {
    //     form_name: "access_request_form",
    //     engagement_time_msec: engagementTime,
    //     page_path: window.location.pathname,
    //   });
    // }

    // Data Persistence: Storage
    // sessionStorage.setItem(
    //   "thank_you_data",
    //   JSON.stringify({
    //     fullName: values.fullName,
    //     email: values.businessEmail,
    //   })
    // );

    // router.push("/thank-you");
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center animate-in fade-in zoom-in duration-500">
        <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
        <h2 className="text-3xl font-bold text-background mb-2">
          Request Sent!
        </h2>
        <p className="text-background/80 max-w-sm">
          Thank you. We have received your request and our team will get back to
          you shortly!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-150 p-2 md:p-7.5 gap-5 rounded-[20px] border border-[#E1E1E1] bg-white">
      <h3 className=" text-[18px] md:text-[22px] font-medium leading-8.5 text-center">
        Secure early access to SBOM Archi and position your organization ahead
        of regulatory enforcement.
      </h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          // onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Validation Errors:", errors))}
          className="space-y-6 max-w-xl"
        >
          {/* HONEYPOT */}
          <div className="hidden">
            <FormField
              control={form.control}
              name="company_website"
              render={({ field }) => (
                <FormControl>
                  <input {...field} tabIndex={-1} autoComplete="off" />
                </FormControl>
              )}
            />
          </div>

          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-semibold">
                  Full Name*
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    className="bg-slate-50/50"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Business Email */}
          <FormField
            control={form.control}
            name="businessEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-semibold">
                  Business Email*
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="john.doe@company.com"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company Name */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-semibold">
                  Company Name*
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Company name"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-semibold">
                  Phone Number*
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phone number"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-semibold">
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your message..."
                    className="resize-none min-h-21.25"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="bg-primary hover:bg-[#00823a] text-white rounded-xl px-4 py-3 text-[16px] leading-6 font-normal flex gap-2 h-12"
            >
              {isPending ? "Submitting..." : "Request Access"}
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowCircle />
              )}
            </Button>
          </div>
          <p className="text-[12px] italic">
            * By submitting this form, you agree to be contacted and receive
            marketing emails. You may unsubscribe at any time.
          </p>
        </form>
      </Form>
    </div>
  );
};
