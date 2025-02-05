import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface StudentData {
  hours: number;
  fallScore: number;
  winterScore: number;
}

interface DataEntryFormProps {
  onDataSubmit: (data: StudentData) => void;
}

const DataEntryForm = ({ onDataSubmit }: DataEntryFormProps) => {
  const { toast } = useToast();
  const [hours, setHours] = React.useState('');
  const [fallScore, setFallScore] = React.useState('');
  const [winterScore, setWinterScore] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const hoursNum = parseFloat(hours);
    const fallScoreNum = parseFloat(fallScore);
    const winterScoreNum = parseFloat(winterScore);
    
    if (isNaN(hoursNum) || isNaN(fallScoreNum) || isNaN(winterScoreNum)) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers for all fields.",
        variant: "destructive"
      });
      return;
    }

    if (hoursNum < 0 || fallScoreNum < 0 || winterScoreNum < 0) {
      toast({
        title: "Invalid Input",
        description: "Values cannot be negative.",
        variant: "destructive"
      });
      return;
    }

    onDataSubmit({
      hours: hoursNum,
      fallScore: fallScoreNum,
      winterScore: winterScoreNum
    });

    setHours('');
    setFallScore('');
    setWinterScore('');

    toast({
      title: "Success",
      description: "Student data has been added.",
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Enter Student Data</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="hours" className="text-sm font-medium">
              Hours Spent on Program
            </label>
            <Input
              id="hours"
              type="number"
              step="0.1"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Enter hours"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="fallScore" className="text-sm font-medium">
              Fall Benchmark Score
            </label>
            <Input
              id="fallScore"
              type="number"
              step="0.1"
              value={fallScore}
              onChange={(e) => setFallScore(e.target.value)}
              placeholder="Enter fall score"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="winterScore" className="text-sm font-medium">
              Winter Benchmark Score
            </label>
            <Input
              id="winterScore"
              type="number"
              step="0.1"
              value={winterScore}
              onChange={(e) => setWinterScore(e.target.value)}
              placeholder="Enter winter score"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Add Student Data
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DataEntryForm;