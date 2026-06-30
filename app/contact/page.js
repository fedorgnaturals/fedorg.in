"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Loader2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "fedorg@fedorg.in",
    href: "mailto:fedorg@fedorg.in",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "7510209632",
    href: "tel:+917510209632",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Karnataka, India",
    href: "#",
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: "Mon–Sat, 9 AM – 6 PM",
    href: null,
  },
];

const subjects = [
  "Order related query",
  "Product information",
  "Bulk / wholesale enquiry",
  "Return or refund",
  "Partnership / collaboration",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (form.phone && !/^\d{10}$/.test(form.phone))
      e.phone = "Enter valid 10-digit number";
    if (!form.subject) e.subject = "Please select a subject";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    // TODO: replace with real API call → api.post('/contact', form)
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    toast.success("Message sent! We'll get back to you soon.", { icon: "📬" });
  };

  const f = (key) => ({
    value: form[key],
    onChange: (e) => {
      setForm((s) => ({ ...s, [key]: e.target.value }));
      if (errors[key]) setErrors((s) => ({ ...s, [key]: "" }));
    },
  });

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Message Sent!
          </h2>
          <p className="text-gray-500 mb-6">
            Thanks for reaching out, <strong>{form.name}</strong>! We&apos;ll
            reply to <strong>{form.email}</strong> within 24 hours.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
              });
            }}
            className="btn-secondary text-sm"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Get in <span className="text-primary-700">Touch</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Have a question, bulk order enquiry, or just want to say hello?
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-gray-900">Contact Details</h2>
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-primary-50 transition-colors"
              >
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-medium text-gray-800 hover:text-primary-700 transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-gray-800">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden h-48 bg-gray-100 flex items-center justify-center border border-gray-200">
              <div className="text-center text-gray-400">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Chennai, Tamil Nadu</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Arjun Sharma"
                    className={`input-field ${errors.name ? "border-red-400" : ""}`}
                    {...f("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className={`input-field ${errors.email ? "border-red-400" : ""}`}
                    {...f("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone{" "}
                    <span className="text-gray-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    className={`input-field ${errors.phone ? "border-red-400" : ""}`}
                    {...f("phone")}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Subject *
                  </label>
                  <select
                    className={`input-field ${errors.subject ? "border-red-400" : ""}`}
                    {...f("subject")}
                  >
                    <option value="">Select a subject…</option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Message *
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can help…"
                  className={`input-field resize-none ${errors.message ? "border-red-400" : ""}`}
                  {...f("message")}
                />
                <div className="flex justify-between mt-1">
                  {errors.message ? (
                    <p className="text-red-500 text-xs">{errors.message}</p>
                  ) : (
                    <span />
                  )}
                  <p className="text-xs text-gray-400">
                    {form.message.length} chars
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-3 text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                We typically respond within 24 hours on working days.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
