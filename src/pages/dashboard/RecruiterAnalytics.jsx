"use client";

import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { BarChart3, PieChart, Loader2 } from "lucide-react";
import { jobService } from "../../services/jobs";

export default function RecruiterAnalytics({ role }) {
  const [chartData, setChartData] = useState({ companyChartData: [], typeChartData: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== "admin" && role !== "recruiter") {
      setTimeout(() => setLoading(false), 1000);
      return;
    }

    const fetchMetrics = async () => {
      try {
        const res = await jobService.getJobAnalytics();
        if (res?.success && res?.data) {
          setChartData(res.data);
        }
      } catch (err) {
        console.error("Failed to load analytics engine metrics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, [role]);

  if (role !== "admin" && role !== "recruiter") return null;

  if (loading) {
    return (
      <div className="w-full h-[350px] flex items-center justify-center border border-border rounded-2xl bg-card">
        <Loader2 className="h-7 w-7 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-6 my-6">
      <div className="xl:col-span-2 bg-card rounded-2xl border border-border p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground tracking-tight">
                {role === "admin" ? "Global Job Matrix by Volume" : "My Job Matrix by Volume"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {role === "admin" 
                  ? "Distribution of open vs closed positions across all target hubs" 
                  : "Distribution of open vs closed positions across your corporate slots"}
              </p>
            </div>
          </div>

          <div className="w-full h-[280px] text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.companyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--background)", borderColor: "var(--border)", borderRadius: "12px" }}
                  labelStyle={{ fontWeight: "bold", color: "var(--foreground)" }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Bar dataKey="open" name="Active Openings" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="closed" name="Closed Shells" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <PieChart className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground tracking-tight">Employment Type Streams</h3>
              <p className="text-xs text-muted-foreground">Proportion logs of posted workforce structures</p>
            </div>
          </div>

          <div className="w-full h-[280px] text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData.typeChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" className="capitalize" tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--background)", borderColor: "var(--border)", borderRadius: "12px" }}
                />
                <Area type="monotone" dataKey="value" name="Total Openings" stroke="var(--primary)" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}