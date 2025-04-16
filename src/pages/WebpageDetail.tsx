
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Copy, Edit, ExternalLink, Globe, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function WebpageDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for demonstration
  const webpage = {
    id: Number(id),
    name: "Landing Page",
    url: "https://example.com/landing",
    campaigns: 3,
    dateAdded: "2023-06-15",
    description: "Main landing page for our product",
    tags: ["Landing", "Product", "Marketing"],
    lastModified: "2023-12-05",
    status: "Active",
    campaignsList: [
      { id: 1, name: "Summer Sale", status: "Active", performance: "High" },
      { id: 2, name: "Product Launch", status: "Scheduled", performance: "Medium" },
      { id: 3, name: "Holiday Special", status: "Draft", performance: "Low" }
    ],
    trackedParameters: ["utm_source", "utm_medium", "utm_campaign", "utm_content"]
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(webpage.url);
    toast.success("URL copied to clipboard");
  };

  const handleDelete = () => {
    // In a real app, this would call an API
    toast.success(`Webpage "${webpage.name}" deleted`);
    // Then redirect to the webpages list
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/webpages">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-medium">{webpage.name}</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleCopyUrl}>
            <Copy className="mr-2 h-3.5 w-3.5" />
            Copy URL
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={webpage.url} target="_blank" rel="noreferrer">
              <ExternalLink className="mr-2 h-3.5 w-3.5" />
              Visit
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/webpages/${id}/edit`}>
              <Edit className="mr-2 h-3.5 w-3.5" />
              Edit
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/campaigns/new?webpage=${id}`}>Create Campaign</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
                Delete Webpage
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* URL display */}
      <div className="flex items-center text-muted-foreground">
        <Globe className="h-4 w-4 mr-2" />
        <a 
          href={webpage.url} 
          target="_blank" 
          rel="noreferrer" 
          className="hover:underline text-muted-foreground flex items-center"
        >
          {webpage.url}
          <ExternalLink className="h-3 w-3 ml-1 inline" />
        </a>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="parameters">UTM Parameters</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Added on</h3>
                  <p>{webpage.dateAdded}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Last modified</h3>
                  <p>{webpage.lastModified}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <Badge variant="outline">{webpage.status}</Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Associated campaigns</h3>
                  <p>{webpage.campaigns}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p className="mt-1">{webpage.description}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Tags</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {webpage.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">No recent activity to display.</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Associated Campaigns</h2>
            <Button asChild>
              <Link to={`/campaigns/new?webpage=${id}`}>
                Create Campaign
              </Link>
            </Button>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2">Campaign Name</th>
                    <th className="text-left pb-2">Status</th>
                    <th className="text-left pb-2">Performance</th>
                    <th className="text-right pb-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {webpage.campaignsList.map(campaign => (
                    <tr key={campaign.id} className="border-b">
                      <td className="py-3">
                        <Link 
                          to={`/campaigns/${campaign.id}`}
                          className="font-medium hover:underline"
                        >
                          {campaign.name}
                        </Link>
                      </td>
                      <td className="py-3">
                        <Badge 
                          variant={
                            campaign.status === "Active" ? "default" : 
                            campaign.status === "Scheduled" ? "secondary" : "outline"
                          }
                        >
                          {campaign.status}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <Badge 
                          variant={
                            campaign.performance === "High" ? "default" : 
                            campaign.performance === "Medium" ? "secondary" : "outline"
                          }
                        >
                          {campaign.performance}
                        </Badge>
                      </td>
                      <td className="py-3 text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/campaigns/${campaign.id}`}>
                            View
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Parameters Tab */}
        <TabsContent value="parameters" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tracked UTM Parameters</CardTitle>
              <CardDescription>Parameters currently being tracked for this webpage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {webpage.trackedParameters.map(param => (
                  <div key={param} className="flex items-center justify-between p-2 border rounded-md">
                    <span>{param}</span>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Webpage Settings</CardTitle>
              <CardDescription>Configure settings for this webpage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">UTM Parameter Configuration</h3>
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <span>Auto-append UTM parameters</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Enabled</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Tracking Options</h3>
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <span>Track page visits</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Enabled</span>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-destructive">Danger Zone</h3>
                <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-md">
                  <div>
                    <h4 className="font-medium">Delete Webpage</h4>
                    <p className="text-sm text-muted-foreground">Permanently delete this webpage and all associated data</p>
                  </div>
                  <Button variant="destructive" size="sm" onClick={handleDelete}>Delete</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
