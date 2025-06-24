
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
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>;
      case "draft":
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Draft</Badge>;
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Paused</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">Campaigns</h1>
          <p className="text-xl text-gray-500 font-normal">
            Manage your UTM parameter campaigns and content rules.
          </p>
        </div>
        <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium">
          <Link to="/campaigns/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Link>
        </Button>
      </div>

      {/* Main Content */}
      <Card className="border-0 shadow-sm bg-white rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold text-gray-900">
                All Campaigns
              </CardTitle>
              <CardDescription className="text-gray-500">
                Manage your UTM parameter campaigns
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search campaigns..."
                className="pl-10 border-gray-200 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="border-gray-100">
                <TableHead className="text-gray-600 font-medium">Name</TableHead>
                <TableHead className="text-gray-600 font-medium">Webpage</TableHead>
                <TableHead className="text-gray-600 font-medium">UTM Parameters</TableHead>
                <TableHead className="text-gray-600 font-medium">Status</TableHead>
                <TableHead className="text-gray-600 font-medium">Impressions</TableHead>
                <TableHead className="w-[100px] text-gray-600 font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No campaigns found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id} className="border-gray-100">
                    <TableCell className="font-medium text-gray-900">
                      <div className="flex items-center">
                        <PanelLeft className="h-4 w-4 mr-2 text-gray-400" />
                        <Link to={`/campaigns/${campaign.id}`} className="hover:underline">
                          {campaign.name}
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link 
                        to={`/webpages/${campaign.webpageId}`} 
                        className="flex items-center hover:underline text-gray-500"
                      >
                        <Globe className="h-3 w-3 mr-1 text-gray-400" />
                        {campaign.webpage}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-xs text-gray-600">
                          <span className="font-medium">Source:</span> {campaign.utmSource}
                        </div>
                        <div className="text-xs text-gray-600">
                          <span className="font-medium">Medium:</span> {campaign.utmMedium}
                        </div>
                        <div className="text-xs text-gray-600">
                          <span className="font-medium">Campaign:</span> {campaign.utmCampaign}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                    <TableCell className="text-gray-900">{campaign.impressions.toLocaleString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl border-gray-200">
                          <DropdownMenuItem asChild>
                            <Link to={`/campaigns/${campaign.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/campaigns/${campaign.id}/edit`}>Edit Campaign</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/campaigns/${campaign.id}/rules`}>Edit Content Rules</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
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
