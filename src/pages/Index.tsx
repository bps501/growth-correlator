import React from 'react';
import CsvUpload from '@/components/CsvUpload';
import DataVisualization from '@/components/DataVisualization';
import DataTable from '@/components/DataTable';

interface StudentData {
  hours: number;
  fallScore: number;
  winterScore: number;
}

const Index = () => {
  const [studentData, setStudentData] = React.useState<StudentData[]>([]);

  const handleDataUpload = (data: StudentData[]) => {
    setStudentData(data);
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