
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Copy,
  Plus,
  PencilLine,
  Trash2,
  ExternalLink
} from "lucide-react";

export default function CampaignDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock campaign data
  const campaign = {
    id: parseInt(id || "1"),
    name: "Summer Promotion",
    webpage: "Landing Page",
    webpageId: 1,
    webpageUrl: "https://example.com/landing",
    utmSource: "email",
    utmMedium: "newsletter",
    utmCampaign: "summer2023",
    utmTerm: "",
    utmContent: "",
    status: "active",
    impressions: 1250,
    clicks: 320,
    conversions: 42,
    dateCreated: "2023-06-15",
    lastUpdated: "2023-06-20"
  };

  // Mock content rules data
  const contentRules = [
    {
      id: 1,
      elementId: "hero-heading",
      elementName: "Hero Heading",
      originalContent: "Welcome to our website!",
      newContent: "Summer Sale is Here!",
      active: true
    },
    {
      id: 2,
      elementId: "cta-button",
      elementName: "CTA Button",
      originalContent: "Learn More",
      newContent: "Get Summer Deals",
      active: true
    },
    {
      id: 3,
      elementId: "feature-description",
      elementName: "Feature Description",
      originalContent: "Our product has many features.",
      newContent: "Limited time summer features available now!",
      active: false
    }
  ];

  // Campaign URL builder
  const campaignUrl = new URL(campaign.webpageUrl);
  campaignUrl.searchParams.append("utm_source", campaign.utmSource);
  campaignUrl.searchParams.append("utm_medium", campaign.utmMedium);
  campaignUrl.searchParams.append("utm_campaign", campaign.utmCampaign);
  if (campaign.utmTerm) campaignUrl.searchParams.append("utm_term", campaign.utmTerm);
  if (campaign.utmContent) campaignUrl.searchParams.append("utm_content", campaign.utmContent);

  // Copy URL function
  const copyUrl = () => {
    navigator.clipboard.writeText(campaignUrl.toString());
    // You would typically show a toast notification here
  };

  // Get status badge
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
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/campaigns">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-medium">{campaign.name}</h1>
          {getStatusBadge(campaign.status)}
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link to={`/campaigns/${id}/edit`}>
              <PencilLine className="mr-2 h-4 w-4" />
              Edit Campaign
            </Link>
          </Button>
          <Button asChild>
            <Link to={`/campaigns/${id}/rules/new`}>
              <Plus className="mr-2 h-4 w-4" />
              Add Content Rule
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Campaign URL</CardTitle>
          <CardDescription>Share this URL to use your dynamic content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input 
              value={campaignUrl.toString()} 
              readOnly 
              className="font-mono text-sm"
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={copyUrl} 
              title="Copy URL"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              asChild
              title="Open in new tab"
            >
              <a href={campaignUrl.toString()} target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content-rules">Content Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Campaign Details</CardTitle>
                <CardDescription>Basic information about this campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between py-1 border-b">
                    <dt className="font-medium">Campaign Name</dt>
                    <dd>{campaign.name}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <dt className="font-medium">Webpage</dt>
                    <dd>
                      <Link to={`/webpages/${campaign.webpageId}`} className="hover:underline">
                        {campaign.webpage}
                      </Link>
                    </dd>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <dt className="font-medium">Date Created</dt>
                    <dd>{campaign.dateCreated}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <dt className="font-medium">Last Updated</dt>
                    <dd>{campaign.lastUpdated}</dd>
                  </div>
                  <div className="flex justify-between py-1">
                    <dt className="font-medium">Status</dt>
                    <dd>{getStatusBadge(campaign.status)}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">UTM Parameters</CardTitle>
                <CardDescription>Parameters used for tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between py-1 border-b">
                    <dt className="font-medium">Source</dt>
                    <dd><code className="bg-secondary px-1 py-0.5 rounded text-sm">{campaign.utmSource}</code></dd>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <dt className="font-medium">Medium</dt>
                    <dd><code className="bg-secondary px-1 py-0.5 rounded text-sm">{campaign.utmMedium}</code></dd>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <dt className="font-medium">Campaign</dt>
                    <dd><code className="bg-secondary px-1 py-0.5 rounded text-sm">{campaign.utmCampaign}</code></dd>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <dt className="font-medium">Term</dt>
                    <dd>
                      {campaign.utmTerm ? (
                        <code className="bg-secondary px-1 py-0.5 rounded text-sm">{campaign.utmTerm}</code>
                      ) : (
                        <span className="text-muted-foreground text-sm">Not set</span>
                      )}
                    </dd>
                  </div>
                  <div className="flex justify-between py-1">
                    <dt className="font-medium">Content</dt>
                    <dd>
                      {campaign.utmContent ? (
                        <code className="bg-secondary px-1 py-0.5 rounded text-sm">{campaign.utmContent}</code>
                      ) : (
                        <span className="text-muted-foreground text-sm">Not set</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Metrics</CardTitle>
              <CardDescription>Analytics for this campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-secondary p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Impressions</div>
                  <div className="text-2xl font-medium">{campaign.impressions.toLocaleString()}</div>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Clicks</div>
                  <div className="text-2xl font-medium">{campaign.clicks.toLocaleString()}</div>
                </div>
                <div className="bg-secondary p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Conversions</div>
                  <div className="text-2xl font-medium">{campaign.conversions.toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content-rules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Content Replacement Rules</CardTitle>
              <CardDescription>Dynamic content based on UTM parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button asChild>
                  <Link to={`/campaigns/${id}/rules/new`}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Rule
                  </Link>
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Element</TableHead>
                    <TableHead>Original Content</TableHead>
                    <TableHead>Replacement Content</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contentRules.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No content rules defined
                      </TableCell>
                    </TableRow>
                  ) : (
                    contentRules.map((rule) => (
                      <TableRow key={rule.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div>{rule.elementName}</div>
                            <div className="text-xs text-muted-foreground">
                              ID: <code>{rule.elementId}</code>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">{rule.originalContent}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{rule.newContent}</TableCell>
                        <TableCell>
                          {rule.active ? (
                            <Badge className="bg-green-500">Active</Badge>
                          ) : (
                            <Badge variant="outline">Inactive</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              asChild
                            >
                              <Link to={`/campaigns/${id}/rules/${rule.id}`}>
                                <PencilLine className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
