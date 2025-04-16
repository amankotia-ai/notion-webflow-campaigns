
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // Mock data for demonstration
  const recentWebpages = [
    { id: 1, name: "Landing Page", url: "https://example.com/landing", campaigns: 3 },
    { id: 2, name: "Product Page", url: "https://example.com/product", campaigns: 2 },
    { id: 3, name: "Blog Post", url: "https://example.com/blog/post", campaigns: 1 },
  ];

  const recentCampaigns = [
    { id: 1, name: "Summer Promotion", webpage: "Landing Page", impressions: 1250 },
    { id: 2, name: "Product Launch", webpage: "Product Page", impressions: 845 },
    { id: 3, name: "Email Newsletter", webpage: "Blog Post", impressions: 523 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium">Dashboard</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/webpages/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Webpage
            </Link>
          </Button>
          <Button asChild>
            <Link to="/campaigns/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Campaign
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-center text-lg">
              Recent Webpages
              <Button variant="ghost" size="sm" asChild>
                <Link to="/webpages" className="flex items-center text-sm font-normal">
                  View All <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardTitle>
            <CardDescription>Your recently added webpages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentWebpages.map((page) => (
                <div 
                  key={page.id} 
                  className="p-3 bg-secondary rounded-md hover:bg-accent transition-colors"
                >
                  <div className="font-medium">{page.name}</div>
                  <div className="text-sm text-muted-foreground truncate">{page.url}</div>
                  <div className="text-xs mt-1 text-muted-foreground">{page.campaigns} campaigns</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-center text-lg">
              Recent Campaigns
              <Button variant="ghost" size="sm" asChild>
                <Link to="/campaigns" className="flex items-center text-sm font-normal">
                  View All <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </CardTitle>
            <CardDescription>Your recently created campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentCampaigns.map((campaign) => (
                <div 
                  key={campaign.id} 
                  className="p-3 bg-secondary rounded-md hover:bg-accent transition-colors"
                >
                  <div className="font-medium">{campaign.name}</div>
                  <div className="text-sm text-muted-foreground">Webpage: {campaign.webpage}</div>
                  <div className="text-xs mt-1 text-muted-foreground">{campaign.impressions} impressions</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Guide</CardTitle>
          <CardDescription>How to use UTM Customizer for Webflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-medium mb-2">1. Add Your Webpage</h3>
              <p className="text-sm text-muted-foreground">Register your Webflow page to start customizing content</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-medium mb-2">2. Create Campaigns</h3>
              <p className="text-sm text-muted-foreground">Set up campaigns with specific UTM parameters</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <h3 className="font-medium mb-2">3. Define Content Rules</h3>
              <p className="text-sm text-muted-foreground">Create dynamic content based on UTM parameters</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
