
import { BarChart3, ChevronDown, ArrowRight, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-notion-border">
        <div>
          <div className="text-sm text-notion-subtle">Analytics</div>
          <h1 className="text-3xl font-bold text-[#37352f] tracking-tight">UTM Campaign Performance</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-notion-border text-notion-text gap-1 h-8">
            <span>This Month</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button className="notion-blue-button">Export Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="border border-notion-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-notion-subtle">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,842</div>
            <div className="text-xs text-green-600 mt-1 flex items-center">
              <span>↑ 12.5% from previous month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-notion-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-notion-subtle">Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,259</div>
            <div className="text-xs text-green-600 mt-1 flex items-center">
              <span>↑ 8.3% from previous month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-notion-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-notion-subtle">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21.5%</div>
            <div className="text-xs text-red-600 mt-1 flex items-center">
              <span>↓ 2.1% from previous month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white border border-notion-border rounded-md overflow-hidden">
        <div className="flex justify-between items-center px-4 py-3 border-b border-notion-border">
          <div className="font-medium">Campaign Performance</div>
          <Tabs defaultValue="month" className="w-auto">
            <TabsList className="bg-[#f7f6f3] p-[2px]">
              <TabsTrigger value="week" className="text-xs">Week</TabsTrigger>
              <TabsTrigger value="month" className="text-xs">Month</TabsTrigger>
              <TabsTrigger value="quarter" className="text-xs">Quarter</TabsTrigger>
              <TabsTrigger value="year" className="text-xs">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="h-[300px] flex items-center justify-center bg-[#fbfbfa] p-4">
          <div className="flex flex-col items-center text-notion-subtle">
            <BarChart3 className="h-12 w-12 mb-2 opacity-20" />
            <div className="text-sm">Chart data will appear here</div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-notion-border rounded-md overflow-hidden">
        <div className="px-4 py-3 border-b border-notion-border font-medium">
          Recent Campaigns
        </div>
        <div>
          <Table className="notion-table">
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>Conv. Rate</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Spring Sale 2025</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    <CheckCircle className="h-3 w-3" />
                    <span>Active</span>
                  </span>
                </TableCell>
                <TableCell>facebook</TableCell>
                <TableCell>2,345</TableCell>
                <TableCell>432</TableCell>
                <TableCell>18.4%</TableCell>
                <TableCell className="text-notion-subtle">Apr 10, 2025</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-blue">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Product Launch</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    <CheckCircle className="h-3 w-3" />
                    <span>Active</span>
                  </span>
                </TableCell>
                <TableCell>twitter</TableCell>
                <TableCell>1,872</TableCell>
                <TableCell>365</TableCell>
                <TableCell>19.5%</TableCell>
                <TableCell className="text-notion-subtle">Apr 8, 2025</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-blue">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Newsletter Promo</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                    <Clock className="h-3 w-3" />
                    <span>Scheduled</span>
                  </span>
                </TableCell>
                <TableCell>email</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0%</TableCell>
                <TableCell className="text-notion-subtle">Apr 6, 2025</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-blue">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Winter Sale 2024</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                    <AlertCircle className="h-3 w-3" />
                    <span>Ended</span>
                  </span>
                </TableCell>
                <TableCell>multiple</TableCell>
                <TableCell>5,438</TableCell>
                <TableCell>982</TableCell>
                <TableCell>18.1%</TableCell>
                <TableCell className="text-notion-subtle">Jan 15, 2025</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-blue">
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Blog Promotion</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                    <AlertCircle className="h-3 w-3" />
                    <span>Ended</span>
                  </span>
                </TableCell>
                <TableCell>linkedin</TableCell>
                <TableCell>1,245</TableCell>
                <TableCell>187</TableCell>
                <TableCell>15.0%</TableCell>
                <TableCell className="text-notion-subtle">Dec 22, 2024</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-blue">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="px-4 py-3 text-center border-t border-notion-border">
          <Button variant="ghost" size="sm" className="text-blue-600 font-medium flex items-center gap-1 mx-auto">
            <span>View All Campaigns</span>
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-notion-border rounded-md overflow-hidden">
          <div className="px-4 py-3 border-b border-notion-border font-medium">
            Top UTM Sources
          </div>
          <div className="px-4 py-3">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>facebook</span>
                  <span className="font-medium">42%</span>
                </div>
                <div className="notion-progress-bar">
                  <div className="notion-progress-bar-fill" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>google</span>
                  <span className="font-medium">28%</span>
                </div>
                <div className="notion-progress-bar">
                  <div className="notion-progress-bar-fill" style={{ width: '28%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>twitter</span>
                  <span className="font-medium">15%</span>
                </div>
                <div className="notion-progress-bar">
                  <div className="notion-progress-bar-fill" style={{ width: '15%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>linkedin</span>
                  <span className="font-medium">10%</span>
                </div>
                <div className="notion-progress-bar">
                  <div className="notion-progress-bar-fill" style={{ width: '10%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>other</span>
                  <span className="font-medium">5%</span>
                </div>
                <div className="notion-progress-bar">
                  <div className="notion-progress-bar-fill" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-notion-border rounded-md overflow-hidden">
          <div className="px-4 py-3 border-b border-notion-border font-medium">
            Top Performing Pages
          </div>
          <div className="px-4 py-3">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>/landing-page</span>
                  <span className="font-medium">1,245 clicks</span>
                </div>
                <div className="notion-progress-bar">
                  <div className="notion-progress-bar-fill" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>/product</span>
                  <span className="font-medium">856 clicks</span>
                </div>
                <div className="notion-progress-bar">
                  <div className="notion-progress-bar-fill" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>/pricing</span>
                  <span className="font-medium">543 clicks</span>
                </div>
                <div className="notion-progress-bar">
                  <div className="notion-progress-bar-fill" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>/blog/new-features</span>
                  <span className="font-medium">421 clicks</span>
                </div>
                <div className="notion-progress-bar">
                  <div className="notion-progress-bar-fill" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>/contact</span>
                  <span className="font-medium">287 clicks</span>
                </div>
                <div className="notion-progress-bar">
                  <div className="notion-progress-bar-fill" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
