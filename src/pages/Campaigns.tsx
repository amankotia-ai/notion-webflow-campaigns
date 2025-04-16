
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, MoreHorizontal, PanelLeft, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function Campaigns() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for demonstration
  const campaigns = [
    { 
      id: 1, 
      name: "Summer Promotion", 
      webpage: "Landing Page", 
      webpageId: 1,
      utmSource: "email", 
      utmMedium: "newsletter", 
      utmCampaign: "summer2023", 
      status: "active", 
      impressions: 1250, 
      dateCreated: "2023-06-15" 
    },
    { 
      id: 2, 
      name: "Product Launch", 
      webpage: "Product Page", 
      webpageId: 2,
      utmSource: "facebook", 
      utmMedium: "social", 
      utmCampaign: "launch2023", 
      status: "active", 
      impressions: 845, 
      dateCreated: "2023-06-12" 
    },
    { 
      id: 3, 
      name: "Email Newsletter", 
      webpage: "Blog Post", 
      webpageId: 3,
      utmSource: "email", 
      utmMedium: "campaign", 
      utmCampaign: "weekly", 
      status: "draft", 
      impressions: 523, 
      dateCreated: "2023-06-10" 
    },
    { 
      id: 4, 
      name: "Google Ads", 
      webpage: "Landing Page", 
      webpageId: 1,
      utmSource: "google", 
      utmMedium: "cpc", 
      utmCampaign: "brand", 
      status: "active", 
      impressions: 2105, 
      dateCreated: "2023-06-08" 
    },
    { 
      id: 5, 
      name: "Instagram Promotion", 
      webpage: "Product Page", 
      webpageId: 2,
      utmSource: "instagram", 
      utmMedium: "social", 
      utmCampaign: "influencer", 
      status: "paused", 
      impressions: 750, 
      dateCreated: "2023-06-05" 
    },
  ];

  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    campaign.webpage.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.utmSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.utmCampaign.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "paused":
        return <Badge variant="secondary">Paused</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium">Campaigns</h1>
        <Button asChild>
          <Link to="/campaigns/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Campaigns</CardTitle>
          <CardDescription>Manage your UTM parameter campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search campaigns..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Webpage</TableHead>
                <TableHead>UTM Parameters</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Impressions</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No campaigns found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <PanelLeft className="h-4 w-4 mr-2 text-muted-foreground" />
                        <Link to={`/campaigns/${campaign.id}`} className="hover:underline">
                          {campaign.name}
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link 
                        to={`/webpages/${campaign.webpageId}`} 
                        className="flex items-center hover:underline"
                      >
                        <Globe className="h-3 w-3 mr-1 text-muted-foreground" />
                        {campaign.webpage}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-xs">
                          <span className="font-medium">Source:</span> {campaign.utmSource}
                        </div>
                        <div className="text-xs">
                          <span className="font-medium">Medium:</span> {campaign.utmMedium}
                        </div>
                        <div className="text-xs">
                          <span className="font-medium">Campaign:</span> {campaign.utmCampaign}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                    <TableCell>{campaign.impressions.toLocaleString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/campaigns/${campaign.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/campaigns/${campaign.id}/edit`}>Edit Campaign</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/campaigns/${campaign.id}/rules`}>Edit Content Rules</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
