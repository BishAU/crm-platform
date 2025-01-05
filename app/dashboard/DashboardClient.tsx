'use client';

import Link from 'next/link';
import { 
  Users, Building2, Droplet, Map, MessageSquare, 
  BarChart3, Building
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface Campaign {
  name: string;
  status: string;
  progress: number;
  targetAudience?: string;
}

interface DashboardStats {
  outfalls: number;
  observations: number;
  waterAuthorities: number;
  people: number;
  tickets: {
    open: number;
    inProgress: number;
    resolved: number;
  };
  campaigns: Campaign[];
}

export default function DashboardClient() {
  const [stats, setStats] = useState<DashboardStats>({
    outfalls: 0,
    observations: 0,
    waterAuthorities: 0,
    people: 0,
    tickets: {
      open: 0,
      inProgress: 0,
      resolved: 0
    },
    campaigns: []
  });

  useEffect(() => {
    // Fetch outfalls count
    fetch('/api/outfalls?count=true')
      .then(response => response.json())
      .then(data => {
        setStats(prev => ({
          ...prev,
          outfalls: data.count
        }));
      })
      .catch(error => {
        console.error('Error fetching outfalls count:', error);
      });

    // Fetch observations count
    fetch('/api/observations?count=true')
      .then(response => response.json())
      .then(data => {
        setStats(prev => ({
          ...prev,
          observations: data.count
        }));
      })
      .catch(error => {
        console.error('Error fetching observations count:', error);
      });

    // Fetch water authorities count
    fetch('/api/water-authorities?count=true')
      .then(response => response.json())
      .then(data => {
        setStats(prev => ({
          ...prev,
          waterAuthorities: data.count
        }));
      })
      .catch(error => {
        console.error('Error fetching water authorities count:', error);
      });

    // Fetch people count
    fetch('/api/people?count=true')
      .then(response => response.json())
      .then(data => {
        setStats(prev => ({
          ...prev,
          people: data.count
        }));
      })
      .catch(error => {
        console.error('Error fetching people count:', error);
      });

    // Fetch support tickets stats
    fetch('/api/support/tickets/stats')
      .then(response => response.json())
      .then(data => {
        setStats(prev => ({
          ...prev,
          tickets: {
            open: data.open || 0,
            inProgress: data.inProgress || 0,
            resolved: data.resolved || 0
          }
        }));
      })
      .catch(error => {
        console.error('Error fetching ticket stats:', error);
      });

    // Fetch latest campaigns
    fetch('/api/marketing/campaigns/latest')
      .then(response => response.json())
      .then(data => {
        setStats(prev => ({
          ...prev,
          campaigns: data.campaigns || []
        }));
      })
      .catch(error => {
        console.error('Error fetching campaigns:', error);
      });
  }, []);

  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-ocean-900">Dashboard</h1>
        <h2 className="text-xl text-ocean-700">Welcome back</h2>
      </div>

      {/* Record Count Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/outfalls?view=grid" className="bg-white p-6 rounded-lg shadow-sm border border-ocean-100 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <Droplet className="w-8 h-8 text-ocean-600" />
            <div>
              <p className="text-sm text-ocean-600">Outfalls</p>
              <p className="text-2xl font-bold text-ocean-900">{stats.outfalls}</p>
            </div>
          </div>
        </Link>

        <Link href="/observations?view=grid" className="bg-white p-6 rounded-lg shadow-sm border border-ocean-100 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <Map className="w-8 h-8 text-ocean-600" />
            <div>
              <p className="text-sm text-ocean-600">Observations</p>
              <p className="text-2xl font-bold text-ocean-900">{stats.observations}</p>
            </div>
          </div>
        </Link>

        <Link href="/water-authorities?view=grid" className="bg-white p-6 rounded-lg shadow-sm border border-ocean-100 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <Building className="w-8 h-8 text-ocean-600" />
            <div>
              <p className="text-sm text-ocean-600">Water Authorities</p>
              <p className="text-2xl font-bold text-ocean-900">{stats.waterAuthorities}</p>
            </div>
          </div>
        </Link>

        <Link href="/people?view=grid" className="bg-white p-6 rounded-lg shadow-sm border border-ocean-100 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-ocean-600" />
            <div>
              <p className="text-sm text-ocean-600">People</p>
              <p className="text-2xl font-bold text-ocean-900">{stats.people}</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Support Tickets Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-ocean-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-ocean-900">Support Tickets</h3>
            <Link href="/support" className="text-sm text-ocean-600 hover:text-ocean-700">View all</Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600">Open</p>
              <p className="text-2xl font-bold text-green-700">{stats.tickets.open}</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-600">In Progress</p>
              <p className="text-2xl font-bold text-yellow-700">{stats.tickets.inProgress}</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">Resolved</p>
              <p className="text-2xl font-bold text-blue-700">{stats.tickets.resolved}</p>
            </div>
          </div>
        </div>

        {/* Marketing Campaigns Widget */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-ocean-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-ocean-900">Latest Campaigns</h3>
            <Link href="/marketing" className="text-sm text-ocean-600 hover:text-ocean-700">View all</Link>
          </div>
          <div className="space-y-4">
            {stats.campaigns.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-ocean-900">{campaign.name}</p>
                  <p className="text-sm text-ocean-600">{campaign.status}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-ocean-900">{campaign.progress}%</p>
                  <p className="text-sm text-ocean-600">{campaign.targetAudience || 'All'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
