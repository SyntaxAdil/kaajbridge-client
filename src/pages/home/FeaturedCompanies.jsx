// components/home/FeaturedCompanies.jsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeader } from "../../components/ui/section-header";
import CompanyCard from "../my-companies/CompanyCard";
import { Button } from "../../components/ui/button";
import { companyService } from "../../services/company";





export function FeaturedCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const result = await companyService.getAllCompanies({
          page: 1,
          limit: 20,
          sort: "newest",
        });
        setCompanies(result?.data || []);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
        // Fallback data
        setCompanies([
          { _id: "1", name: "Google", companyLogo: null, totalJobs: 12 },
          { _id: "2", name: "Microsoft", companyLogo: null, totalJobs: 8 },
          { _id: "3", name: "Amazon", companyLogo: null, totalJobs: 15 },
          { _id: "4", name: "Meta", companyLogo: null, totalJobs: 6 },
          { _id: "5", name: "Apple", companyLogo: null, totalJobs: 4 },
          { _id: "6", name: "Netflix", companyLogo: null, totalJobs: 3 },
          { _id: "7", name: "Google", companyLogo: null, totalJobs: 12 },
          { _id: "8", name: "Microsoft", companyLogo: null, totalJobs: 8 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Duplicate companies for seamless scrolling effect
  const duplicatedCompanies = [...companies, ...companies, ...companies];

  if (loading) {
    return (
      <section className="py-16 bg-zinc-50/50 dark:bg-[#0a0a0f]/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded mb-4" />
            <div className="h-4 w-96 bg-zinc-200 dark:bg-zinc-800 rounded mb-8" />
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="min-w-[160px] h-[120px] bg-zinc-200 dark:bg-zinc-800 rounded-xl flex-shrink-0" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (companies.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-zinc-50/50 dark:bg-[#0a0a0f]/50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Trusted Companies"
          subtitle="Our Partners"
          title="Companies Hiring Diploma Engineers"
          description="Join 500+ companies that trust KaajBridge to find their next engineering talent."
          className="mb-10"
        />

        {/* Marquee - First Row */}
        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-zinc-50/80 dark:from-[#0a0a0f]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-zinc-50/80 dark:from-[#0a0a0f]/80 to-transparent z-10 pointer-events-none" />
          
          <Marquee
            pauseOnHover
            className="gap-6 py-4"
            speed={40}
          >
            {duplicatedCompanies.slice(0, 12).map((company, index) => (
              <CompanyCard isPrivete={false} key={`${company._id}-${index}`} company={company} />
            ))}
          </Marquee>
        </div>

       
        {/* View All Button */}
        {companies.length > 0 && (
          <div className="flex justify-center mt-10">
            <Link href="/companies">
              <Button
                variant="outline"
                className="group rounded-full px-8 py-6 text-sm font-medium border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/50 backdrop-blur-sm hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all duration-200"
              >
                <span>View All Companies</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}