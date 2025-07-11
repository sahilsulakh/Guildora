
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Calendar, Users, Clock, MapPin, Settings } from "lucide-react";

interface EventManagementProps {
  selectedServer: string;
}

const events = [
  {
    id: 1,
    title: "Summer Gaming Tournament",
    description: "Annual gaming competition with prizes for top players",
    startDate: "2024-08-15",
    endDate: "2024-08-30",
    participants: 156,
    status: "upcoming",
    location: "Gaming Channels",
    tasks: 12,
  },
  {
    id: 2,
    title: "Creative Art Contest",
    description: "Monthly art showcase featuring community artwork",
    startDate: "2024-07-01",
    endDate: "2024-07-31",
    participants: 89,
    status: "active",
    location: "Art Gallery",
    tasks: 8,
  },
  {
    id: 3,
    title: "Code Sprint Challenge",
    description: "48-hour coding marathon with team collaboration",
    startDate: "2024-06-15",
    endDate: "2024-06-17",
    participants: 45,
    status: "completed",
    location: "Dev Channels",
    tasks: 6,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "text-green-400 bg-green-500/20 border-green-500/30";
    case "upcoming":
      return "text-blue-400 bg-blue-500/20 border-blue-500/30";
    case "completed":
      return "text-gray-400 bg-gray-500/20 border-gray-500/30";
    default:
      return "text-gray-400 bg-gray-500/20 border-gray-500/30";
  }
};

export const EventManagement = ({ selectedServer }: EventManagementProps) => {
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    maxParticipants: "",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Event Management</h1>
          <p className="text-gray-400">Create and manage events for {selectedServer}</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-white/10 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">Create New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Event Title</label>
                  <Input 
                    placeholder="Enter event title..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Location</label>
                  <Input 
                    placeholder="Event location or channel..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Description</label>
                <Textarea 
                  placeholder="Describe the event..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 resize-none"
                  rows={3}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Start Date</label>
                  <Input 
                    type="date"
                    className="bg-white/5 border-white/10 text-white"
                    value={newEvent.startDate}
                    onChange={(e) => setNewEvent({...newEvent, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">End Date</label>
                  <Input 
                    type="date"
                    className="bg-white/5 border-white/10 text-white"
                    value={newEvent.endDate}
                    onChange={(e) => setNewEvent({...newEvent, endDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Max Participants</label>
                  <Input 
                    type="number"
                    placeholder="100"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    value={newEvent.maxParticipants}
                    onChange={(e) => setNewEvent({...newEvent, maxParticipants: e.target.value})}
                  />
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Create Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg leading-tight">{event.title}</CardTitle>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm line-clamp-2">{event.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300">{event.location}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">{event.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-400" />
                    <span className="text-orange-400">{event.tasks} tasks</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 text-white border border-purple-500/30">
                  View Details
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
