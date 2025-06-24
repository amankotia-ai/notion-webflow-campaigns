
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Globe, ExternalLink, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Webpages() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for demonstration
  const webpages = [
    { id: 1, name: "Landing Page", url: "https://example.com/landing", campaigns: 3, dateAdded: "2023-06-15" },
    { id: 2, name: "Product Page", url: "https://example.com/product", campaigns: 2, dateAdded: "2023-06-12" },
    { id: 3, name: "Blog Post", url: "https://example.com/blog/post", campaigns: 1, dateAdded: "2023-06-10" },
    { id: 4, name: "About Us", url: "https://example.com/about", campaigns: 0, dateAdded: "2023-06-05" },
    { id: 5, name: "Contact Page", url: "https://example.com/contact", campaigns: 2, dateAdded: "2023-06-01" },
  ];

  const filteredWebpages = webpages.filter(page => 
    page.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    page.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">Webpages</h1>
          <p className="text-xl text-gray-500 font-normal">
            Manage your registered webpages and their campaigns.
          </p>
        </div>
        <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium">
          <Link to="/webpages/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Webpage
          </Link>
        </Button>
      </div>

      {/* Main Content */}
      <Card className="border-0 shadow-sm bg-white rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold text-gray-900">
                All Webpages
              </CardTitle>
              <CardDescription className="text-gray-500">
                Manage your registered webpages
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
                placeholder="Search webpages..."
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
                <TableHead className="text-gray-600 font-medium">URL</TableHead>
                <TableHead className="text-gray-600 font-medium">Campaigns</TableHead>
                <TableHead className="text-gray-600 font-medium">Date Added</TableHead>
                <TableHead className="w-[100px] text-gray-600 font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWebpages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No webpages found
                  </TableCell>
                </TableRow>
              ) : (
                filteredWebpages.map((page) => (
                  <TableRow key={page.id} className="border-gray-100">
                    <TableCell className="font-medium text-gray-900">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-gray-400" />
                        {page.name}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      <a 
                        href={page.url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center hover:underline text-gray-500"
                      >
                        {page.url}
                        <ExternalLink className="h-3 w-3 ml-1 inline" />
                      </a>
                    </TableCell>
                    <TableCell className="text-gray-900">{page.campaigns}</TableCell>
                    <TableCell className="text-gray-500">{page.dateAdded}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl border-gray-200">
                          <DropdownMenuItem asChild>
                            <Link to={`/webpages/${page.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/webpages/${page.id}/edit`}>Edit</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/campaigns/new?webpage=${page.id}`}>Create Campaign</Link>
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
