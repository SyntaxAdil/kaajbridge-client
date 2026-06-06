"use client";

import React, { useState } from "react";
import { SidebarTrigger } from "../../components/ui/sidebar";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../../components/ui/input-group";
import { SearchIcon, Eye, Trash2, CheckCircle, Clock, XCircle, AlertCircle, FileText, ExternalLink } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

const mockApplications = [
  {
    id: "app_01",
    jobTitle: "Frontend Developer (React.js)",
    companyName: "Vercel",
    applicantName: "Md. Abdur Rahman",
    applicantEmail: "abdurrahman@example.com",
    resume: "https://example.com/resumes/abdur_rahman_resume.pdf",
    experience: "mid",
    coverLetter: "I have strong skills in React.js, TailwindCSS, and shadcn/ui. I am looking forward to contributing to your team.",
    expectedSalary: { amount: 45000, currency: "BDT" },
    termsAccepted: true,
    status: "pending",
    appliedDate: "2026-06-05"
  },
  {
    id: "app_02",
    jobTitle: "Full Stack Engineer",
    companyName: "Figma",
    applicantName: "John Doe",
    applicantEmail: "johndoe@example.com",
    resume: "https://example.com/resumes/johndoe.pdf",
    experience: "senior",
    coverLetter: "Experienced MERN stack developer with 5+ years of production experience.",
    expectedSalary: { amount: 120000, currency: "BDT" },
    termsAccepted: true,
    status: "approved",
    appliedDate: "2026-06-02"
  },
  {
    id: "app_03",
    jobTitle: "UI/UX Engineer",
    companyName: "Enosis Solutions",
    applicantName: "Jane Smith",
    applicantEmail: "janesmith@example.com",
    resume: "https://example.com/resumes/janesmith.pdf",
    experience: "entry",
    coverLetter: "Fresh graduate looking for a starter position in web design.",
    expectedSalary: { amount: 25000, currency: "BDT" },
    termsAccepted: true,
    status: "rejected",
    appliedDate: "2026-05-28"
  }
];

export default function ApplicationWrapper() {
  const [applications, setApplications] = useState(mockApplications);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleStatusChange = (id, newStatus) => {
    setApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const handleDelete = (id) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const handleViewDetails = (app) => {
    setSelectedApp(app);
    setIsViewOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge className="text-emerald-600 border-emerald-500/25 bg-emerald-500/8 rounded-full uppercase tracking-wide text-[10px] font-bold px-2.5 py-0.5 border">Approved</Badge>;
      case "rejected":
        return <Badge className="text-rose-600 border-rose-500/25 bg-rose-500/8 rounded-full uppercase tracking-wide text-[10px] font-bold px-2.5 py-0.5 border">Rejected</Badge>;
      default:
        return <Badge className="text-amber-600 border-amber-500/25 bg-amber-500/8 rounded-full uppercase tracking-wide text-[10px] font-bold px-2.5 py-0.5 border">Pending</Badge>;
    }
  };

  return (
    <section className="w-full min-h-screen bg-background px-6 lg:px-10 py-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-border/60">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ms-4 me-2" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Job Applications
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Review, track, and manage student job applications.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-72 lg:w-80 shrink-0">
          <InputGroup className="flex items-center bg-muted/30 rounded-xl border border-border/60 focus-within:border-primary/40 transition-all duration-200">
            <InputGroupAddon className="pl-3.5 pr-1 text-muted-foreground/50">
              <SearchIcon className="h-4 w-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search applications..."
              className="bg-transparent border-none shadow-none focus-visible:ring-0 text-sm py-2.5 placeholder:text-muted-foreground/40 w-full pr-3"
            />
          </InputGroup>
        </div>
      </header>

      {/* Main Table Content */}
      <div className="w-full rounded-2xl border border-border/70 bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-muted/40 border-b border-border/60">
              <tr>
                <th className="p-4 text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground">Applicant</th>
                <th className="p-4 text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground">Position</th>
                <th className="p-4 text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground">Experience</th>
                <th className="p-4 text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground">Expected Salary</th>
                <th className="p-4 text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="p-4 text-center text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    No applications found.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-muted/10 transition-colors">
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground text-sm leading-tight">{app.applicantName}</span>
                        <span className="text-xs text-muted-foreground mt-0.5">{app.applicantEmail}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground text-sm leading-tight">{app.jobTitle}</span>
                        <span className="text-xs text-muted-foreground mt-0.5">{app.companyName}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="capitalize text-xs font-medium text-foreground bg-muted px-2.5 py-1 rounded-md border border-border/40">
                        {app.experience}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-sm text-foreground">
                        {app.expectedSalary.amount.toLocaleString()} {app.expectedSalary.currency}
                      </span>
                    </td>
                    <td className="p-4">{getStatusBadge(app.status)}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* View Details Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewDetails(app)}
                          className="h-8 w-8 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        {/* Change Status Dropdown */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                            >
                              <Clock className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl border-border bg-card p-1 min-w-[130px]">
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(app.id, "pending")}
                              className="flex items-center gap-2 rounded-lg text-xs font-medium text-amber-600 focus:bg-amber-500/5 focus:text-amber-600 cursor-pointer"
                            >
                              <Clock className="h-3.5 w-3.5" />
                              Mark Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(app.id, "approved")}
                              className="flex items-center gap-2 rounded-lg text-xs font-medium text-emerald-600 focus:bg-emerald-500/5 focus:text-emerald-600 cursor-pointer"
                            >
                              <CheckCircle className="h-3.5 w-3.5" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(app.id, "rejected")}
                              className="flex items-center gap-2 rounded-lg text-xs font-medium text-rose-600 focus:bg-rose-500/5 focus:text-rose-600 cursor-pointer"
                            >
                              <XCircle className="h-3.5 w-3.5" />
                              Reject
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Delete Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(app.id)}
                          className="h-8 w-8 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[520px] rounded-2xl border border-border bg-card p-0 overflow-hidden">
          <div className="border-b border-border/60 px-6 pt-5 pb-4 bg-muted/20">
            <DialogHeader>
              <DialogTitle className="text-base font-bold tracking-tight text-foreground">
                Application Details
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                Submitted on {selectedApp?.appliedDate}
              </DialogDescription>
            </DialogHeader>
          </div>

          {selectedApp && (
            <div className="p-6 space-y-5 text-sm">
              {/* Profile Overview */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Applicant</label>
                  <p className="font-bold text-foreground mt-0.5">{selectedApp.applicantName}</p>
                  <p className="text-xs text-muted-foreground">{selectedApp.applicantEmail}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Job Targeting</label>
                  <p className="font-bold text-foreground mt-0.5">{selectedApp.jobTitle}</p>
                  <p className="text-xs text-muted-foreground">{selectedApp.companyName}</p>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border/40">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Experience Level</label>
                  <p className="capitalize font-semibold text-foreground mt-0.5">{selectedApp.experience}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Expected Salary</label>
                  <p className="font-semibold text-foreground mt-0.5">
                    {selectedApp.expectedSalary.amount.toLocaleString()} {selectedApp.expectedSalary.currency}
                  </p>
                </div>
              </div>

              {/* Resume Component Block */}
              <div className="pt-3 border-t border-border/40">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Attached Document</label>
                <div className="flex items-center justify-between mt-1.5 p-3 rounded-xl border border-border/70 bg-muted/30">
                  <div className="flex items-center gap-2.5">
                    <FileText className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-xs font-semibold text-foreground max-w-[240px] truncate">
                      Applicant_Resume_File.pdf
                    </span>
                  </div>
                  <a
                    href={selectedApp.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    View File
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Cover Letter Block */}
              {selectedApp.coverLetter && (
                <div className="pt-3 border-t border-border/40">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Cover Letter</label>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1.5 bg-muted/20 p-3 rounded-xl border border-border/40">
                    {selectedApp.coverLetter}
                  </p>
                </div>
              )}

              {/* Policy Check */}
              {selectedApp.termsAccepted && (
                <div className="flex items-center gap-1.5 pt-3 border-t border-border/40 text-[11px] text-muted-foreground">
                  <AlertCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Applicant accepted all organizational terms and declarations.</span>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}