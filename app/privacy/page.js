import Link from "next/link";
import {
  Shield,
  Eye,
  Lock,
  Database,
  Mail,
  UserCheck,
  Cookie,
  RefreshCw,
} from "lucide-react";

const sections = [
  {
    id: "information-we-collect",
    icon: Database,
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "Information You Provide",
        body: "When you create an account, place an order, or contact us, we collect: your name, email address, phone number, delivery address, and payment method details (we do not store full card numbers). We also collect information submitted via our Contact Us form.",
      },
      {
        subtitle: "Information Collected Automatically",
        body: "When you visit our website, we automatically collect certain technical information including your IP address, browser type and version, pages visited, time spent on pages, referring URLs, and device information. This data is collected via cookies and similar technologies.",
      },
      {
        subtitle: "Order & Transaction Data",
        body: "We maintain records of all orders placed, including products purchased, quantities, prices, payment method used (not card details), and delivery information to fulfil your order and maintain accurate records.",
      },
    ],
  },
  {
    id: "how-we-use-information",
    icon: Eye,
    title: "2. How We Use Your Information",
    content: [
      {
        subtitle: "To Fulfil Orders",
        body: "We use your personal information to process payments, confirm orders, arrange delivery, send tracking updates, and handle returns or refunds.",
      },
      {
        subtitle: "To Improve Our Service",
        body: "Aggregated, anonymised data helps us understand how our website is used, which products are popular, and where we can improve the shopping experience.",
      },
      {
        subtitle: "To Communicate With You",
        body: "We use your email and phone number to send order confirmations, delivery updates, and responses to your queries. With your consent, we may also send promotional offers, new product announcements, and newsletters. You can opt out at any time.",
      },
      {
        subtitle: "Legal & Compliance",
        body: "We may use or disclose your data where required by law, to comply with legal proceedings, or to protect the rights and safety of FEDORG Naturals, our customers, or others.",
      },
    ],
  },
  {
    id: "data-sharing",
    icon: UserCheck,
    title: "3. Data Sharing & Third Parties",
    content: [
      {
        subtitle: "We Do Not Sell Your Data",
        body: "FEDORG Naturals does not sell, rent, or trade your personal information to any third party for their marketing purposes.",
      },
      {
        subtitle: "Service Providers",
        body: "We share necessary data with trusted service providers who help us operate our business — including payment processors (Razorpay), delivery partners (Delhivery, Shiprocket), and email/SMS service providers. These partners are contractually bound to keep your data secure and use it only for the services they provide to us.",
      },
      {
        subtitle: "Legal Disclosures",
        body: "We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).",
      },
    ],
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "4. Cookies",
    content: [
      {
        subtitle: "What Are Cookies?",
        body: "Cookies are small text files stored on your device when you visit a website. They help us recognise you on return visits and improve your experience.",
      },
      {
        subtitle: "How We Use Cookies",
        body: "We use essential cookies to keep your cart and session active, analytical cookies (via Google Analytics) to understand site usage, and preference cookies to remember your settings like language or display preferences.",
      },
      {
        subtitle: "Managing Cookies",
        body: "You can control or disable cookies through your browser settings. Note that disabling essential cookies may affect site functionality, such as keeping items in your cart.",
      },
    ],
  },
  {
    id: "data-security",
    icon: Lock,
    title: "5. Data Security",
    content: [
      {
        subtitle: "How We Protect Your Data",
        body: "We use SSL/TLS encryption for all data transmitted between your browser and our servers. Payment details are handled by PCI-DSS compliant payment processors. We do not store full payment card numbers. Access to personal data within our company is restricted to authorised personnel only.",
      },
      {
        subtitle: "Data Retention",
        body: "We retain your personal data for as long as your account is active or as needed to provide services. Order records are kept for 7 years to comply with Indian tax regulations. You may request deletion of your account and associated data at any time (subject to legal retention obligations).",
      },
    ],
  },
  {
    id: "your-rights",
    icon: Shield,
    title: "6. Your Rights",
    content: [
      {
        subtitle: "Access & Correction",
        body: "You have the right to access the personal data we hold about you and to request corrections if it is inaccurate or incomplete. Log in to your account to update your profile, or contact us at fedorg@fedorg.in.",
      },
      {
        subtitle: "Deletion",
        body: "You may request that we delete your personal data. We will do so unless we are required by law to retain it (e.g., transaction records). Account deletion requests are processed within 30 days.",
      },
      {
        subtitle: "Opt-Out of Marketing",
        body: 'You can unsubscribe from our marketing emails at any time by clicking the "Unsubscribe" link in any email, or by emailing fedorg@fedorg.in. You will continue to receive transactional emails related to active orders.',
      },
      {
        subtitle: "Data Portability",
        body: "You may request a copy of your personal data in a structured, machine-readable format by contacting us at fedorg@fedorg.in.",
      },
    ],
  },
  {
    id: "children",
    icon: UserCheck,
    title: "7. Children's Privacy",
    content: [
      {
        subtitle: "",
        body: "Our website and services are not directed at children under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal data, please contact us immediately at fedorg@fedorg.in and we will delete it promptly.",
      },
    ],
  },
  {
    id: "changes",
    icon: RefreshCw,
    title: "8. Changes to This Policy",
    content: [
      {
        subtitle: "",
        body: 'We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of significant changes by posting a notice on our website or sending an email. The "Last updated" date at the top of this page indicates when the policy was last revised. Continued use of our website after changes constitutes acceptance of the updated policy.',
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Shield className="w-8 h-8 text-primary-700" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Privacy <span className="text-primary-700">Policy</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Your privacy matters to us. This policy explains what data we
            collect, how we use it, and your rights.
          </p>
          <p className="text-xs text-gray-400 mt-4">
            Last updated: 1 July 2026
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Table of Contents */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Contents
              </p>
              <nav className="space-y-2">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-sm text-gray-500 hover:text-primary-700 transition-colors leading-snug"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Intro */}
            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6">
              <p className="text-sm text-gray-700 leading-relaxed">
                This Privacy Policy describes how{" "}
                <strong>FEDORG Naturals</strong> ("we", "us", or "our")
                collects, uses, and protects the personal information of
                customers and visitors to our website at{" "}
                <a
                  href="https://fedorg.in"
                  className="text-primary-700 font-medium"
                >
                  fedorg.in
                </a>
                . By using our website or placing an order, you agree to the
                practices described in this policy.
              </p>
            </div>

            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <section key={section.id} id={section.id}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-5 pl-0">
                    {section.content.map((block, i) => (
                      <div
                        key={i}
                        className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
                      >
                        {block.subtitle && (
                          <p className="font-semibold text-gray-900 mb-2">
                            {block.subtitle}
                          </p>
                        )}
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {block.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}

            {/* Contact */}
            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-8 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary-700" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Questions about your privacy?
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Contact our privacy team at{" "}
                <a
                  href="mailto:fedorg@fedorg.in"
                  className="text-primary-700 font-medium"
                >
                  fedorg@fedorg.in
                </a>
              </p>
              <p className="text-sm text-gray-500 mb-5">
                FEDORG Naturals, Karnataka, India
              </p>
              <Link href="/contact" className="btn-primary">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
