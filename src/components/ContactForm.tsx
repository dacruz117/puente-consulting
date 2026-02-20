"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
      setSubmitted(true);
    } catch {
      alert(t.contactForm.errorMessage);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
        <h3 className="text-xl font-bold text-primary mb-2">{t.contactForm.thankYou}</h3>
        <p className="text-body">{t.contactForm.receivedMessage}</p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 space-y-6"
    >
      <input type="hidden" name="form-name" value="contact" />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">
          {t.contactForm.name}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-body focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">
          {t.contactForm.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-body focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-primary mb-1">
          {t.contactForm.serviceInterest}
        </label>
        <select
          id="service"
          name="service"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-body focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="">{t.contactForm.selectService}</option>
          <option value="college-advising">{t.contactForm.collegeAdvising}</option>
          <option value="business-startup">{t.contactForm.businessStartup}</option>
          <option value="both">{t.contactForm.both}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-primary mb-1">
          {t.contactForm.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-body focus:outline-none focus:ring-2 focus:ring-accent resize-vertical"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-accent text-white font-semibold py-3 rounded-lg hover:bg-accent-light transition-colors"
      >
        {t.contactForm.sendMessage}
      </button>
    </form>
  );
}
