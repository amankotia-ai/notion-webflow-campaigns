
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
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
          Good morning, Alex!
        </h1>
        <p className="text-xl text-gray-500 font-normal">
          Here's what happened while you were away.
        </p>
      </div>

      {/* Stats Summary */}
      <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap gap-4 text-lg">
          <div className="flex items-center gap-2">
            <span className="text-gray-700">There were</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-lg font-medium">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              13 issues
            </span>
            <span className="text-gray-700">and</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Orby resolved 11
            </span>
          </div>
        </div>
        <p className="text-lg text-gray-700">No breaches happened and SLA stayed at 96%.</p>
        <div className="flex items-center gap-2 text-lg">
          <span className="text-gray-700">Here are</span>
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-lg font-medium">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            3 suggestions
          </span>
          <span className="text-gray-700">to improve the pipeline.</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium">
          <Link to="/webpages/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Webpage
          </Link>
        </Button>
        <Button asChild variant="outline" className="border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-xl font-medium">
          <Link to="/campaigns/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Link>
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Webpages Card */}
        <Card className="border-0 shadow-sm bg-white rounded-2xl">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Recent Webpages
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Your recently added webpages
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild className="text-gray-500 hover:text-gray-700">
                <Link to="/webpages" className="flex items-center text-sm font-medium">
                  View All <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentWebpages.map((page) => (
              <div 
                key={page.id} 
                className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="font-medium text-gray-900">{page.name}</div>
                <div className="text-sm text-gray-500 truncate mt-1">{page.url}</div>
                <div className="text-xs text-gray-400 mt-2">{page.campaigns} campaigns</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Campaigns Card */}
        <Card className="border-0 shadow-sm bg-white rounded-2xl">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Recent Campaigns
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Your recently created campaigns
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild className="text-gray-500 hover:text-gray-700">
                <Link to="/campaigns" className="flex items-center text-sm font-medium">
                  View All <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentCampaigns.map((campaign) => (
              <div 
                key={campaign.id} 
                className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="font-medium text-gray-900">{campaign.name}</div>
                <div className="text-sm text-gray-500 mt-1">Webpage: {campaign.webpage}</div>
                <div className="text-xs text-gray-400 mt-2">{campaign.impressions} impressions</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Guide Section */}
      <Card className="border-0 shadow-sm bg-white rounded-2xl">
        <CardHeader className="pb-4">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold text-gray-900">Quick Guide</CardTitle>
            <CardDescription className="text-gray-500">
              How to use UTM Customizer for Webflow
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-3">1. Add Your Webpage</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Register your Webflow page to start customizing content
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-3">2. Create Campaigns</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Set up campaigns with specific UTM parameters
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-3">3. Define Content Rules</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Create dynamic content based on UTM parameters
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
