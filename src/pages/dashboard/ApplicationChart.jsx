"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CalendarDays, TrendUp } from "lucide-react";

const data = [
  { name: "Jan", applied: 4, interviews: 1 },
  { name: "Feb", applied: 8, interviews: 2 },
  { name: "Mar", applied: 12, interviews: 3 },
  { name: "Apr", applied: 18, interviews: 4 },
  { name: "May", applied: 20, interviews: 5 },
  { name: "Jun", applied: 24, interviews: 6 },
];

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border p-3.5 rounded-xl shadow-xl backdrop-blur-md">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
          {payload[0].payload.name} Performance
        </p>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-6 justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Total Applied
            </span>
            <span className="text-sm font-bold text-foreground">
              {payload[0].value}
            </span>
          </div>
          <div className="flex items-center gap-6 justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              Interviews
            </span>
            <span className="text-sm font-bold text-indigo-500">
              {payload[1].value}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default function ApplicationChart() {
  return (
    <div className="flex-1 w-full rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between min-h-[385px]">
      <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/90">
            Interview Analytics
          </h3>
          <p className="text-2xl font-extrabold tracking-tight text-foreground flex items-baseline gap-1.5">
            +25% <span className="text-xs font-medium text-muted-foreground">vs last month</span>
          </p>
        </div>
        <div className="h-9 px-3 border border-border/80 bg-muted/30 rounded-xl flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" />
          <span>Last 6 Months</span>
        </div>
      </div>

      <div className="w-full h-[240px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorApplied" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.01} />
              </linearGradient>
              <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
              opacity={0.4}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11, fontWeight: 500 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border)", strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="applied"
              stroke="var(--primary)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorApplied)"
            />
            <Area
              type="monotone"
              dataKey="interviews"
              stroke="#6366f1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorInterviews)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}