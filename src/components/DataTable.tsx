import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StudentData {
  hours: number;
  fallScore: number;
  winterScore: number;
}

interface DataTableProps {
  data: StudentData[];
}

const DataTable = ({ data }: DataTableProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Student Data Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hours Spent</TableHead>
              <TableHead>Fall Score</TableHead>
              <TableHead>Winter Score</TableHead>
              <TableHead>Growth</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.hours.toFixed(1)}</TableCell>
                <TableCell>{item.fallScore.toFixed(1)}</TableCell>
                <TableCell>{item.winterScore.toFixed(1)}</TableCell>
                <TableCell>{(item.winterScore - item.fallScore).toFixed(1)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DataTable;