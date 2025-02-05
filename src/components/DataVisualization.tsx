import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StudentData {
  hours: number;
  fallScore: number;
  winterScore: number;
}

interface DataVisualizationProps {
  data: StudentData[];
}

const DataVisualization = ({ data }: DataVisualizationProps) => {
  const scatterData = data.map((item) => ({
    hours: item.hours,
    growth: item.winterScore - item.fallScore,
  }));

  // Calculate correlation coefficient
  const calculateCorrelation = () => {
    if (data.length < 2) return null;

    const hours = data.map(d => d.hours);
    const growth = data.map(d => d.winterScore - d.fallScore);
    
    const meanHours = hours.reduce((a, b) => a + b) / hours.length;
    const meanGrowth = growth.reduce((a, b) => a + b) / growth.length;
    
    const diffProductSum = hours.reduce((sum, hour, i) => 
      sum + ((hour - meanHours) * (growth[i] - meanGrowth)), 0);
    
    const hoursSqSum = hours.reduce((sum, hour) => 
      sum + Math.pow(hour - meanHours, 2), 0);
    
    const growthSqSum = growth.reduce((sum, g) => 
      sum + Math.pow(g - meanGrowth, 2), 0);
    
    return diffProductSum / Math.sqrt(hoursSqSum * growthSqSum);
  };

  const correlation = calculateCorrelation();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Growth Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid />
              <XAxis 
                type="number" 
                dataKey="hours" 
                name="Hours" 
                label={{ value: 'Hours Spent', position: 'bottom' }}
              />
              <YAxis 
                type="number" 
                dataKey="growth" 
                name="Growth" 
                label={{ value: 'Score Growth', angle: -90, position: 'left' }}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Students" data={scatterData} fill="#2563eb" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        {correlation !== null && (
          <div className="mt-4 text-center">
            <p className="text-lg font-medium">
              Correlation Coefficient: {correlation.toFixed(3)}
            </p>
            <p className="text-sm text-muted-foreground">
              {Math.abs(correlation) < 0.3 ? 'Weak' : 
               Math.abs(correlation) < 0.7 ? 'Moderate' : 'Strong'} 
              {correlation > 0 ? ' positive' : ' negative'} correlation
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataVisualization;