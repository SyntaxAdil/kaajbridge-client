// app/contact/page.jsx
import React from "react";
import { MessageSquare, PhoneCall, Mail, HelpCircle, ShieldAlert, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Contact & Support | KaajBridge",
  description: "Get in touch with KaajBridge support for help, inquiries, and assistance.",
};

export default function ContactPage() {
  const whatsappNumber = "01406490781";
  const whatsappUrl = `https://wa.me/88${whatsappNumber}?text=Hello%20KaajBridge%20Support,%20I%20need%20help%20with...`;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-4">
            <HelpCircle className="h-3.5 w-3.5" />
            Support & Help Desk
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            How can we help you today?
          </h1>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            Whether you are facing issues with your account, job applications, or need general assistance as a diploma engineer, our team is ready to support you.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          
          {/* WhatsApp Support Card */}
          <Card className="border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 shadow-sm rounded-2xl flex flex-col justify-between">
            <CardContent className="p-6 sm:p-8 flex flex-col h-full justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 border border-emerald-500/20">
                  <PhoneCall className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  Instant WhatsApp Support
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  Get quick responses directly via WhatsApp. Perfect for urgent queries regarding job listings, company verification, or account recovery.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2">AVAILABLE NUMBER:</p>
                <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-4 tracking-wide">
                  +88 {whatsappNumber}
                </p>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Chat on WhatsApp
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* FAQ & General Help Info Card */}
          <Card className="border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 shadow-sm rounded-2xl flex flex-col justify-between">
            <CardContent className="p-6 sm:p-8 flex flex-col h-full justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5 border border-indigo-500/20">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  Need Platform Guidelines?
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  KaajBridge is built exclusively for diploma engineers. If you have questions about qualification criteria, profile reviews, or employer guidelines, reach out to us.
                </p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  <strong className="text-zinc-700 dark:text-zinc-300">Support Hours:</strong> Saturday to Thursday, 10:00 AM – 8:00 PM (BST). We usually reply within an hour on WhatsApp.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}