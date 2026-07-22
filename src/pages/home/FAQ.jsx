// components/home/FAQ.jsx
"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "../../components/ui/section-header";
import { HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "../../components/ui/button";

import Link from "next/link";

const faqData = [
  {
    id: "item-1",
    question: "What types of jobs are available for Diploma Engineers?",
    answer:
      "We offer a wide range of tech roles including Frontend Developer, Backend Developer, Full Stack Developer, DevOps Engineer, QA Tester, and more. All positions are specifically curated for Diploma in Engineering graduates.",
  },
  {
    id: "item-2",
    question: "How does the fast-track hiring process work?",
    answer:
      "Our fast-track hiring pipeline connects you directly with hiring managers from partner companies. After creating your profile and portfolio, you can apply to jobs and get interview calls within 24-48 hours.",
  },
  {
    id: "item-3",
    question: "Is KaajBridge free for job seekers?",
    answer:
      "Yes! KaajBridge is completely free for job seekers. We believe in making quality tech careers accessible to all Diploma Engineers. There are no hidden charges or subscription fees.",
  },
  {
    id: "item-4",
    question: "How do I create a project portfolio?",
    answer:
      "You can create your portfolio by adding your projects, skills, and experience to your profile. Our platform helps you showcase your work to top tech companies looking for Diploma Engineers.",
  },
  {
    id: "item-5",
    question: "What companies are hiring on KaajBridge?",
    answer:
      "We partner with 500+ companies ranging from startups to multinational corporations. These include tech giants, fintech companies, e-commerce platforms, and more who are specifically looking for Diploma Engineers.",
  },
  {
    id: "item-6",
    question: "How long does it take to get hired?",
    answer:
      "The hiring timeline varies, but many candidates receive interview calls within 24-48 hours of applying. On average, most engineers get placed within 2-4 weeks through our platform.",
  },
];

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState(faqData);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = faqData.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
    setFilteredFaqs(filtered);
  };

  return (
    <section className="py-16 bg-white dark:bg-[#0a0a0f]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="FAQ"
          subtitle="Got Questions?"
          title="Frequently Asked Questions"
          description="Find answers to the most common questions about KaajBridge and how we help Diploma Engineers land their dream tech jobs."
          className="mb-10"
        />

        {/* Search Bar */}
        <div className="max-w-lg mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HelpCircle className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/50 backdrop-blur-sm pl-10 pr-4 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all"
            />
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {filteredFaqs.length > 0 ? (
            <Accordion
              type="single"
              collapsible
              className="space-y-3"
              defaultValue="item-1"
            >
              {filteredFaqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/50 backdrop-blur-sm px-1 overflow-hidden transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-700"
                >
                  <AccordionTrigger className="px-4 py-4 hover:no-underline group">
                    <span className="text-sm font-medium text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-left">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/50 backdrop-blur-sm">
              <HelpCircle className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-3" />
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">No questions found</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Try adjusting your search term
              </p>
            </div>
          )}
        </div>

        {/* Still Have Questions */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/50 backdrop-blur-sm px-6 py-3">
            <MessageCircle className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
            <span className="text-sm text-zinc-600 dark:text-zinc-300">
              Still have questions?
            </span>
            <Link href="/contact">
              <Button
                variant="link"
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 p-0 h-auto"
              >
                Contact us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}