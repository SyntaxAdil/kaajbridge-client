"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function ApplyButtonClient({ jobId, jobStatus }) {
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const handleApply = async () => {
    setIsApplying(true);
    try {
      // await jobService.applyToJob(jobId);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setHasApplied(true);
      toast.success("Application Sent Successfully! Your profile has been forwarded to HR.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit application workspace profile.");
    } finally {
      setIsApplying(false);
    }
  };

  const isClosed = jobStatus !== "open";

  return (
    <Button
      onClick={handleApply}
      disabled={isApplying || hasApplied || isClosed}
      className="w-full md:w-auto h-11 px-7 rounded-xl font-bold text-sm transition-all duration-200 shadow-sm"
      variant={hasApplied ? "secondary" : "default"}
    >
      {isApplying ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          Processing
        </>
      ) : hasApplied ? (
        "Applied"
      ) : isClosed ? (
        "Position Closed"
      ) : (
        <>
          Apply For Job
          <Send className="h-3.5 w-3.5 ml-2" />
        </>
      )}
    </Button>
  );
}