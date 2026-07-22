"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, MapPin, Clock3 } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { SocialLinks } from "@/components/common/social-links";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE } from "@/constants/site";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";
import { cn } from "@/lib/utils";

type SubmitState = "idle" | "success" | "error";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
      <AlertCircle className="size-3.5 shrink-0" />
      {message}
    </p>
  );
}

export function Contact() {
  const [submitState, setSubmitState] = React.useState<SubmitState>("idle");
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", company: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!data.ok) {
        setServerError(
          data.error ??
            `That didn't go through — email me directly at ${SITE.email}.`
        );
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      reset();
    } catch {
      setServerError(`Network error — email me directly at ${SITE.email}.`);
      setSubmitState("error");
    }
  }

  return (
    <section id="contact" className="relative border-t border-border py-28">
      <div className="container-px mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="GET IN TOUCH"
          title={
            <>
              Let&apos;s Build{" "}
              <span className="text-[#10b981] drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                Together
              </span>
            </>
          }
          description="Have a project, a role, or just a question about the stack? I read every message myself."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-5">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <Card className="p-7 sm:p-9">
              <AnimatePresence mode="wait">
                {submitState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                  >
                    <div className="flex size-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-400">
                      <CheckCircle2 className="size-7" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      Message sent.
                    </h3>
                    <p className="max-w-xs text-sm text-muted">
                      Thanks for reaching out — I&apos;ll get back to you within a
                      day or two.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSubmitState("idle")}
                    >
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="flex flex-col gap-5"
                  >
                    {/* Honeypot — hidden from real users, visible to bots */}
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden"
                      aria-hidden="true"
                      {...register("company")}
                    />

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-2"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Jane Doe"
                          aria-invalid={!!errors.name}
                          className={cn(
                            "w-full rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-2 outline-none transition-colors focus:border-accent/50",
                            errors.name && "border-red-400/50"
                          )}
                          {...register("name")}
                        />
                        <FieldError message={errors.name?.message} />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-2"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          placeholder="jane@company.com"
                          aria-invalid={!!errors.email}
                          className={cn(
                            "w-full rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-2 outline-none transition-colors focus:border-accent/50",
                            errors.email && "border-red-400/50"
                          )}
                          {...register("email")}
                        />
                        <FieldError message={errors.email?.message} />
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-2"
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        placeholder="Project Inquiry / Job Opportunity / Question"
                        aria-invalid={!!errors.subject}
                        className={cn(
                          "w-full rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-2 outline-none transition-colors focus:border-accent/50",
                          errors.subject && "border-red-400/50"
                        )}
                        {...register("subject")}
                      />
                      <FieldError message={errors.subject?.message} />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="What are you building, and how can I help?"
                        aria-invalid={!!errors.message}
                        className={cn(
                          "w-full resize-none rounded-lg border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-2 outline-none transition-colors focus:border-accent/50",
                          errors.message && "border-red-400/50"
                        )}
                        {...register("message")}
                      />
                      <FieldError message={errors.message?.message} />
                    </div>

                    {submitState === "error" && serverError && (
                      <div className="flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-xs text-red-300">
                        <AlertCircle className="size-4 shrink-0" />
                        {serverError}
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full sm:w-fit"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        "Send message"
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </Card>
          </Reveal>

          {/* Side panel */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-5">
              <Card className="flex flex-col gap-4 p-7">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {SITE.availability}
                  </span>
                </div>
                <div className="flex flex-col gap-3 border-t border-border pt-4 text-sm text-muted">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="size-4 shrink-0 text-muted-2" />
                    {SITE.location}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock3 className="size-4 shrink-0 text-muted-2" />
                    Usually replies within 24 hours
                  </div>
                </div>
              </Card>

              <Card className="flex flex-1 flex-col gap-4 p-7">
                <h3 className="text-xs font-medium uppercase tracking-wide text-muted-2">
                  Find me elsewhere
                </h3>
                <SocialLinks />
              </Card>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
