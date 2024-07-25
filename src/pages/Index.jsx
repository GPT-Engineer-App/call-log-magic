import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

const generateMockData = () => {
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      id: i + 1,
      phoneNumber: `+1 ${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 10000)}`,
      contactName: `Contact ${i + 1}`,
      companyName: `Company ${String.fromCharCode(65 + i % 26)}`,
      salesAgent: `Agent ${String.fromCharCode(65 + i % 5)}`,
      ticketNumber: `TKT-${Math.floor(Math.random() * 10000)}`
    });
  }
  return data;
};

const Index = () => {
  const [calls, setCalls] = useState([]);
  const [filteredCalls, setFilteredCalls] = useState([]);
  const [salesAgent, setSalesAgent] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');
  const [filterAgent, setFilterAgent] = useState('');

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setCalls(generateMockData());
  }, []);

  useEffect(() => {
    setFilteredCalls(
      filterAgent
        ? calls.filter((call) => call.salesAgent.toLowerCase().includes(filterAgent.toLowerCase()))
        : calls
    );
  }, [calls, filterAgent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would submit this data to an API
    console.log('Submitted:', { salesAgent, ticketNumber });
    setSalesAgent('');
    setTicketNumber('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Incoming Calls Dashboard</h1>
      
      <Card className="mb-4">
        <CardHeader>
          <h2 className="text-xl font-semibold">Add Sales Agent Information</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              placeholder="Sales Agent Name"
              value={salesAgent}
              onChange={(e) => setSalesAgent(e.target.value)}
              className="flex-grow"
            />
            <Input
              placeholder="Ticket Number"
              value={ticketNumber}
              onChange={(e) => setTicketNumber(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Submit</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Incoming Calls</h2>
          <div className="flex items-center space-x-2 mt-2">
            <Search className="text-gray-400" />
            <Input
              placeholder="Filter by Sales Agent"
              value={filterAgent}
              onChange={(e) => setFilterAgent(e.target.value)}
              className="flex-grow"
            />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Contact Name</TableHead>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Sales Agent</TableHead>
                  <TableHead>Ticket Number</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCalls.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell>{call.phoneNumber}</TableCell>
                    <TableCell>{call.contactName}</TableCell>
                    <TableCell>{call.companyName}</TableCell>
                    <TableCell>{call.salesAgent}</TableCell>
                    <TableCell>{call.ticketNumber}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;