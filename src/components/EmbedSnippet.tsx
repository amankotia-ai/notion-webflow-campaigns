
import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Copy } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface EmbedSnippetProps {
  webpageId: string;
  embedKey: string;
}

export function EmbedSnippet({ webpageId, embedKey }: EmbedSnippetProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const snippetCode = `<!-- Content Replacement Script -->
<script>
  (function(w,d,s,o,f,js,fjs){
    w['ContentReplacer']=o;w[o]=w[o]||function(){
    (w[o].q=w[o].q||[]).push(arguments)};
    w.webpageId = '${webpageId}';
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id='content-replacer-js';js.src=f;js.async=1;
    fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','cr','https://kqfbuyqiylcgxrgpcuqq.supabase.co/storage/v1/object/public/public/content-replacer.js'));
</script>`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(snippetCode);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "The embed snippet has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Input
              value={embedKey}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              className="ml-2"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <pre className="bg-slate-950 text-slate-50 p-4 rounded-md overflow-x-auto">
            <code>{snippetCode}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
