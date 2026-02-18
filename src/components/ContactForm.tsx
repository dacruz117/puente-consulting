"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

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
      alert("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
        <h3 className="text-xl font-bold text-primary mb-2">Thank you!</h3>
        <p className="text-body">
          We&apos;ve received your message and will get back to you soon.
        </p>
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
          Name
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
          Email
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
          Service Interest
        </label>
        <select
          id="service"
          name="service"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-body focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="">Select a service...</option>
          <option value="college-advising">College Advising</option>
          <option value="business-startup">Business Start-Up</option>
          <option value="both">Both</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-primary mb-1">
          Message
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
        Send Message
      </button>
    </form>
  );
}
