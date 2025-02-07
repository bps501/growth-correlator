
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface RawStudentData {
  testWindow: string;
  score: number;
  hours: number;
}

interface CsvUploadProps {
  onDataUpload: (data: RawStudentData[]) => void;
}

const CsvUpload = ({ onDataUpload }: CsvUploadProps) => {
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a CSV file",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      const data: RawStudentData[] = [];

      // Skip header row and process each line
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
          const [testWindow, scoreStr, hoursStr] = line.split(',').map(s => s.trim());
          const score = Number(scoreStr);
          const hours = Number(hoursStr);
          
          if (isNaN(score) || isNaN(hours)) {
            toast({
              title: "Invalid Data",
              description: `Row ${i} contains invalid numbers`,
              variant: "destructive"
            });
            return;
          }

          if (hours < 0 || score < 0) {
            toast({
              title: "Invalid Data",
              description: `Row ${i} contains negative values`,
              variant: "destructive"
            });
            return;
          }

          if (!['fall', 'winter'].includes(testWindow.toLowerCase())) {
            toast({
              title: "Invalid Data",
              description: `Row ${i} has invalid test window. Must be "fall" or "winter"`,
              variant: "destructive"
            });
            return;
          }

          data.push({ testWindow, score, hours });
        }
      }

      if (data.length === 0) {
        toast({
          title: "Error",
          description: "No valid data found in CSV file",
          variant: "destructive"
        });
        return;
      }

      onDataUpload(data);
      toast({
        title: "Success",
        description: `Uploaded ${data.length} student records`,
      });
      
      // Reset the file input
      event.target.value = '';
    };

    reader.readAsText(file);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Upload Student Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="csvFile" className="text-sm font-medium">
              Upload CSV File
            </label>
            <Input
              id="csvFile"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="cursor-pointer"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            <p>CSV file should have the following columns:</p>
            <ul className="list-disc list-inside mt-1">
              <li>Test window (fall or winter)</li>
              <li>Score</li>
              <li>Hours spent on program</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CsvUpload;
