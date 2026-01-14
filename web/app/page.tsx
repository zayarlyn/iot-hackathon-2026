"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { washingMachines as initialMachines, WashingMachine } from "./washingMachines";
import { useState } from "react";


export default function Home() {
  // ...existing code...
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col items-center py-16">
      <h1 className="text-4xl font-bold mb-10 text-center text-zinc-900 dark:text-zinc-100">Public Laundry Availability</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl px-4">
        {initialMachines.map((machine) => (
          <Card key={machine.id} className="flex flex-col items-center p-6">
            <CardHeader className="w-full flex flex-col items-center">
              <CardTitle className="text-xl mb-2">{machine.name}</CardTitle>
            </CardHeader>
            <CardContent className="w-full flex flex-col items-center">
              <div
                className={`w-20 h-20 rounded-full mb-4 border-4 ${
                  machine.status === "free"
                    ? "bg-green-500 border-green-600 shadow-green-200"
                    : "bg-red-500 border-red-600 shadow-red-200"
                } shadow-lg transition-colors`}
                aria-label={machine.status === "free" ? "Free" : "Running"}
              />
              <span
                className={`text-lg font-semibold ${
                  machine.status === "free" ? "text-green-600" : "text-red-600"
                } mb-4`}
              >
                {machine.status === "free" ? "Available" : "Running"}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
