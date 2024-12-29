"use client";
import React from 'react';

interface DataCardProps {
  title: string;
  description: string;
}

export default function DataCard({ title, description }: DataCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}
