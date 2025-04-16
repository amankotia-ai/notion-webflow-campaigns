
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Form schema
const campaignFormSchema = z.object({
  name: z.string().min(2, "Campaign name is required"),
  webpageId: z.string().min(1, "Please select a webpage"),
  utmSource: z.string().min(1, "Source is required"),
  utmMedium: z.string().min(1, "Medium is required"),
  utmCampaign: z.string().min(1, "Campaign is required"),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
  status: z.enum(["draft", "active", "paused"])
});

type CampaignFormValues = z.infer<typeof campaignFormSchema>;

export default function CampaignForm() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  
  // Mock data for demonstration
  const webpages = [
    { id: "1", name: "Landing Page", url: "https://example.com/landing" },
    { id: "2", name: "Product Page", url: "https://example.com/product" },
    { id: "3", name: "Blog Post", url: "https://example.com/blog/post" },
    { id: "4", name: "About Us", url: "https://example.com/about" },
    { id: "5", name: "Contact Page", url: "https://example.com/contact" },
  ];

  // Default values for form
  const defaultValues: CampaignFormValues = isEditing 
    ? {
        name: "Summer Promotion",
        webpageId: "1",
        utmSource: "email",
        utmMedium: "newsletter",
        utmCampaign: "summer2023",
        utmTerm: "",
        utmContent: "",
        status: "active"
      }
    : {
        name: "",
        webpageId: "",
        utmSource: "",
        utmMedium: "",
        utmCampaign: "",
        utmTerm: "",
        utmContent: "",
        status: "draft"
      };

  // Form setup
  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues
  });

  // Selected webpage info
  const [selectedWebpage, setSelectedWebpage] = useState<typeof webpages[0] | undefined>(
    isEditing ? webpages.find(wp => wp.id === defaultValues.webpageId) : undefined
  );

  // Handle webpage selection change
  const onWebpageChange = (value: string) => {
    const webpage = webpages.find(wp => wp.id === value);
    setSelectedWebpage(webpage);
    form.setValue("webpageId", value);
  };

  // Form submission handler
  const onSubmit = (data: CampaignFormValues) => {
    console.log("Form data submitted:", data);
    
    // In a real application, you would save the data here
    // For now, redirect to the campaigns list
    navigate("/campaigns");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-medium">
          {isEditing ? "Edit Campaign" : "Create Campaign"}
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
              <CardDescription>General campaign settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campaign Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Summer Promotion 2023" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="webpageId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Webpage</FormLabel>
                    <Select 
                      onValueChange={onWebpageChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a webpage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {webpages.map((webpage) => (
                          <SelectItem key={webpage.id} value={webpage.id}>
                            {webpage.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {selectedWebpage && (
                        <div className="text-xs truncate mt-1">
                          URL: {selectedWebpage.url}
                        </div>
                      )}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">UTM Parameters</CardTitle>
              <CardDescription>Define tracking parameters for this campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="utmSource"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source (utm_source)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., google, facebook, newsletter" {...field} />
                      </FormControl>
                      <FormDescription>
                        Identifies which site sent the traffic
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="utmMedium"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medium (utm_medium)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., cpc, email, social" {...field} />
                      </FormControl>
                      <FormDescription>
                        Identifies what type of link was used
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="utmCampaign"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campaign Name (utm_campaign)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., spring_sale, product_launch" {...field} />
                    </FormControl>
                    <FormDescription>
                      Identifies a specific product promotion or strategic campaign
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="utmTerm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Term (utm_term) - Optional</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., running+shoes" {...field} />
                      </FormControl>
                      <FormDescription>
                        Identifies search terms
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="utmContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content (utm_content) - Optional</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., logolink, textlink" {...field} />
                      </FormControl>
                      <FormDescription>
                        Identifies what specifically was clicked
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                type="button"
                onClick={() => navigate("/campaigns")}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Update Campaign" : "Create Campaign"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
