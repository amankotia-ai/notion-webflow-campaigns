
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium">Webpages</h1>
        <Button asChild>
          <Link to="/webpages/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Webpage
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Webpages</CardTitle>
          <CardDescription>Manage your registered webpages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search webpages..."
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
                <TableHead>URL</TableHead>
                <TableHead>Campaigns</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWebpages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No webpages found
                  </TableCell>
                </TableRow>
              ) : (
                filteredWebpages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        {page.name}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      <a 
                        href={page.url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center hover:underline text-muted-foreground"
                      >
                        {page.url}
                        <ExternalLink className="h-3 w-3 ml-1 inline" />
                      </a>
                    </TableCell>
                    <TableCell>{page.campaigns}</TableCell>
                    <TableCell className="text-muted-foreground">{page.dateAdded}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/webpages/${page.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/webpages/${page.id}/edit`}>Edit</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/campaigns/new?webpage=${page.id}`}>Create Campaign</Link>
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
