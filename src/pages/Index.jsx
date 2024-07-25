import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const generateMockData = () => {
  const data = [];
  const agents = ['Agent A', 'Agent B', 'Agent C', 'Agent D', 'Agent E'];
  for (let i = 0; i < 20; i++) {
    data.push({
      id: i + 1,
      phoneNumber: `+1 ${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 10000)}`,
      contactName: `Contact ${i + 1}`,
      companyName: `Company ${String.fromCharCode(65 + i % 26)}`,
      salesAgent: agents[i % agents.length],
      ticketNumber: `TKT-${Math.floor(Math.random() * 10000)}`
    });
  }
  return data;
};

const Index = () => {
  const [calls, setCalls] = useState([]);
  const [filteredCalls, setFilteredCalls] = useState([]);
  const [filterAgent, setFilterAgent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCall, setCurrentCall] = useState(null);
  const [salesAgent, setSalesAgent] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setCalls(generateMockData());
  }, []);

  useEffect(() => {
    setFilteredCalls(
      filterAgent
        ? calls.filter((call) => call.salesAgent === filterAgent)
        : calls
    );
  }, [calls, filterAgent]);

  const handleActionClick = (call) => {
    setCurrentCall(call);
    setSalesAgent(call.salesAgent);
    setTicketNumber(call.ticketNumber);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would submit this data to an API
    console.log('Submitted:', { id: currentCall.id, salesAgent, ticketNumber });
    setIsModalOpen(false);
    // Update the call in the local state
    const updatedCalls = calls.map(call => 
      call.id === currentCall.id ? { ...call, salesAgent, ticketNumber } : call
    );
    setCalls(updatedCalls);
  };

  const uniqueAgents = [...new Set(calls.map(call => call.salesAgent))];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Incoming Calls Dashboard</h1>
      
      <Card className="mb-4">
        <CardHeader>
          <h2 className="text-xl font-semibold">Filter by Sales Agent</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {uniqueAgents.map((agent) => (
              <Button
                key={agent}
                variant={filterAgent === agent ? "default" : "outline"}
                onClick={() => setFilterAgent(agent === filterAgent ? '' : agent)}
              >
                {agent}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Incoming Calls</h2>
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
                  <TableHead>Action</TableHead>
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
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => handleActionClick(call)}>
                        <AlertCircle className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Call Information</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="salesAgent" className="text-right">
                  Sales Agent
                </label>
                <Input
                  id="salesAgent"
                  value={salesAgent}
                  onChange={(e) => setSalesAgent(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="ticketNumber" className="text-right">
                  Ticket Number
                </label>
                <Input
                  id="ticketNumber"
                  value={ticketNumber}
                  onChange={(e) => setTicketNumber(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;