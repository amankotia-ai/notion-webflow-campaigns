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
import { Link } from "react-router-dom";

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
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild className="hover:bg-gray-100 rounded-xl">
          <Link to="/campaigns">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="space-y-1">
          <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
            {isEditing ? "Edit Campaign" : "Create Campaign"}
          </h1>
          <p className="text-xl text-gray-500 font-normal">
            {isEditing 
              ? "Update your campaign settings and UTM parameters" 
              : "Set up a new campaign with UTM tracking parameters"
            }
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card className="border-0 shadow-sm bg-white rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-900">Basic Information</CardTitle>
              <CardDescription className="text-gray-500">General campaign settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Campaign Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Summer Promotion 2023" 
                        className="border-gray-200 rounded-xl"
                        {...field} 
                      />
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
                    <FormLabel className="text-gray-700 font-medium">Webpage</FormLabel>
                    <Select 
                      onValueChange={onWebpageChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-gray-200 rounded-xl">
                          <SelectValue placeholder="Select a webpage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl border-gray-200">
                        {webpages.map((webpage) => (
                          <SelectItem key={webpage.id} value={webpage.id}>
                            {webpage.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {selectedWebpage && (
                        <div className="text-xs text-gray-500 mt-1">
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
                    <FormLabel className="text-gray-700 font-medium">Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-gray-200 rounded-xl">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl border-gray-200">
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

          {/* UTM Parameters */}
          <Card className="border-0 shadow-sm bg-white rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-gray-900">UTM Parameters</CardTitle>
              <CardDescription className="text-gray-500">Define tracking parameters for this campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="utmSource"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Source (utm_source)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., google, facebook, newsletter" 
                          className="border-gray-200 rounded-xl"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">
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
                      <FormLabel className="text-gray-700 font-medium">Medium (utm_medium)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., cpc, email, social" 
                          className="border-gray-200 rounded-xl"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">
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
                    <FormLabel className="text-gray-700 font-medium">Campaign Name (utm_campaign)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., spring_sale, product_launch" 
                        className="border-gray-200 rounded-xl"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500">
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
                      <FormLabel className="text-gray-700 font-medium">Term (utm_term) - Optional</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., running+shoes" 
                          className="border-gray-200 rounded-xl"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">
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
                      <FormLabel className="text-gray-700 font-medium">Content (utm_content) - Optional</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., logolink, textlink" 
                          className="border-gray-200 rounded-xl"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Identifies what specifically was clicked
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline"
                type="button"
                className="border-gray-300 hover:bg-gray-50 px-6 py-2 rounded-xl font-medium"
                onClick={() => navigate("/campaigns")}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-xl font-medium"
              >
                {isEditing ? "Update Campaign" : "Create Campaign"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
