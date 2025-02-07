
import React from 'react';
import CsvUpload from '@/components/CsvUpload';
import DataVisualization from '@/components/DataVisualization';
import DataTable from '@/components/DataTable';

interface RawStudentData {
  testWindow: string;
  score: number;
  hours: number;
}

interface ProcessedStudentData {
  hours: number;
  fallScore: number;
  winterScore: number;
}

const Index = () => {
  const [studentData, setStudentData] = React.useState<ProcessedStudentData[]>([]);

  const processRawData = (rawData: RawStudentData[]): ProcessedStudentData[] => {
    // Group data by hours (assuming same hours for both test windows)
    const groupedData = rawData.reduce((acc, curr) => {
      const key = curr.hours;
      if (!acc[key]) {
        acc[key] = { hours: key, fallScore: 0, winterScore: 0 };
      }
      if (curr.testWindow.toLowerCase() === 'fall') {
        acc[key].fallScore = curr.score;
      } else if (curr.testWindow.toLowerCase() === 'winter') {
        acc[key].winterScore = curr.score;
      }
      return acc;
    }, {} as Record<number, ProcessedStudentData>);

    return Object.values(groupedData).filter(
      data => data.fallScore !== 0 && data.winterScore !== 0
    );
  };

  const handleDataUpload = (rawData: RawStudentData[]) => {
    const processedData = processRawData(rawData);
    setStudentData(processedData);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Student Growth Analysis Tool
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex justify-center">
            <CsvUpload onDataUpload={handleDataUpload} />
          </div>
          
          <div className="w-full">
            <DataVisualization data={studentData} />
          </div>
        </div>

        <div className="w-full">
          <DataTable data={studentData} />
        </div>
      </div>
    </div>
  );
};

export default Index;
