import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Upload } from 'lucide-react';

interface StudentData {
  hours: number;
  fallScore: number;
  winterScore: number;
}

interface CsvUploadProps {
  onDataUpload: (data: StudentData[]) => void;
}

const CsvUpload = ({ onDataUpload }: CsvUploadProps) => {
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if it's a CSV file
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
      const data: StudentData[] = [];

      // Skip header row and process each line
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
          const [hours, fallScore, winterScore] = line.split(',').map(Number);
          
          if (isNaN(hours) || isNaN(fallScore) || isNaN(winterScore)) {
            toast({
              title: "Invalid Data",
              description: `Row ${i} contains invalid numbers`,
              variant: "destructive"
            });
            return;
          }

          if (hours < 0 || fallScore < 0 || winterScore < 0) {
            toast({
              title: "Invalid Data",
              description: `Row ${i} contains negative values`,
              variant: "destructive"
            });
            return;
          }

          data.push({ hours, fallScore, winterScore });
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
              <li>Hours spent on program</li>
              <li>Fall benchmark score</li>
              <li>Winter benchmark score</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CsvUpload;