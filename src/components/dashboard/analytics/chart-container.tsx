"use client";

import React, { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartContainerProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function CustomChartContainer({ title, description, children }: ChartContainerProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-full h-[300px] flex items-center justify-center">
          <div className="w-full h-full max-w-full max-h-full">
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
