"use client";

import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Building2, ShieldCheck, Loader2 } from "lucide-react";

const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#6366f1"];

export default function CompanyAnalytics({ role }) {
  const [chartData, setChartData] = useState({ statusChartData: [], industryChartData: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== "admin" && role !== "recruiter") {
      setTimeout(() => setLoading(false), 1000);
      return;
    }

    const fetchCompanyMetrics = async () => {
      try {
        const response = await fetch("/api/companies/analytics/overview");
        const data = await response.json().catch(() => null);
        if (response.ok && data?.success && data?.data) {
          setChartData(data.data);
        }
      } catch (err) {
        console.error("Failed to load company analytics stream:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyMetrics();
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
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground tracking-tight">
                {role === "admin" ? "Global Industry Breakdown" : "My Companies by Industry"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {role === "admin" 
                  ? "Structural registration distribution across global system categories" 
                  : "Structural distribution logs across your registered corporate hubs"}
              </p>
            </div>
          </div>

          <div className="w-full h-[280px] text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.industryChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.4} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} className="capitalize" />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--background)", borderColor: "var(--border)", borderRadius: "12px" }}
                  labelStyle={{ fontWeight: "bold", color: "var(--foreground)" }}
                />
                <Bar dataKey="value" name="Total Registered" fill="var(--primary)" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground tracking-tight">
                {role === "admin" ? "Global Verification Audits" : "My Verification Pipelines"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {role === "admin" 
                  ? "Ecosystem verification pipelines and compliance state records" 
                  : "Compliance states and review indicators for your nodes"}
              </p>
            </div>
          </div>

          <div className="w-full h-[280px] flex items-center justify-center text-xs relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.statusChartData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.statusChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "var(--background)", borderColor: "var(--border)", borderRadius: "12px" }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" className="capitalize text-[11px]" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}