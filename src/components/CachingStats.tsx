
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

interface CachingStatsProps {
  webpageId: string;
}

export function CachingStats({ webpageId }: CachingStatsProps) {
  const [timeRange, setTimeRange] = useState('24h');

  const { data: stats, isLoading } = useQuery({
    queryKey: ['cachingStats', webpageId, timeRange],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('caching_stats')
        .select('*')
        .eq('webpage_id', webpageId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    }
  });

  const cacheHitRate = stats?.length
    ? (stats.filter(s => s.cache_hit).length / stats.length * 100).toFixed(1)
    : 0;

  const avgResponseTime = stats?.length
    ? (stats.reduce((acc, s) => acc + s.response_time, 0) / stats.length).toFixed(1)
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Statistics</CardTitle>
        <CardDescription>Cache hit rate and response times</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Cache Hit Rate</p>
            <p className="text-2xl font-bold">{cacheHitRate}%</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Avg Response Time</p>
            <p className="text-2xl font-bold">{avgResponseTime}ms</p>
          </div>
        </div>
        
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="created_at"
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleString()}
              />
              <Line
                type="monotone"
                dataKey="response_time"
                stroke="#8884d8"
                name="Response Time (ms)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
