
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Cache-Control': 'public, max-age=300, s-maxage=300', // Cache for 5 minutes
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const webpage_url = url.searchParams.get('url')
    const utm_source = url.searchParams.get('utm_source')
    const utm_medium = url.searchParams.get('utm_medium')
    const utm_campaign = url.searchParams.get('utm_campaign')
    const utm_term = url.searchParams.get('utm_term')
    const utm_content = url.searchParams.get('utm_content')

    if (!webpage_url) {
      return new Response(
        JSON.stringify({ error: 'webpage_url is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Call the get_public_rules function
    const { data, error } = await supabaseClient
      .rpc('get_public_rules', {
        webpage_url,
        p_utm_source: utm_source,
        p_utm_medium: utm_medium,
        p_utm_campaign: utm_campaign,
        p_utm_term: utm_term,
        p_utm_content: utm_content
      })

    if (error) throw error

    return new Response(
      JSON.stringify(data),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
