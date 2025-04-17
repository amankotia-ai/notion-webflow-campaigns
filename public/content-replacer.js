
(function() {
  // Configuration
  const SUPABASE_URL = 'https://kqfbuyqiylcgxrgpcuqq.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxZmJ1eXFpeWxjZ3hyZ3BjdXFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MDY3NDMsImV4cCI6MjA2MDQ4Mjc0M30.o-Wkh18mqTdv3PpN4GHpimHnx01w7iLv5RVDt23lU80';
  const CACHE_KEY = 'content_rules_cache';
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // Helper function to parse UTM parameters
  function getUtmParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      utm_term: params.get('utm_term'),
      utm_content: params.get('utm_content')
    };
  }

  // Helper function to check cache
  function getCachedRules() {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    try {
      const { rules, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return rules;
      }
    } catch (e) {
      return null;
    }
    
    localStorage.removeItem(CACHE_KEY);
    return null;
  }

  // Helper function to cache rules
  function cacheRules(rules) {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      rules,
      timestamp: Date.now()
    }));
  }

  // Function to fetch rules using Supabase RPC
  async function fetchRules() {
    const params = {
      webpage_url: window.location.origin + window.location.pathname,
      ...getUtmParams()
    };

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_public_rules`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(params)
      });

      if (!response.ok) throw new Error('Failed to fetch rules');
      return await response.json();
    } catch (error) {
      console.error('Error fetching content rules:', error);
      return [];
    }
  }

  // Function to fetch and apply rules
  async function fetchAndApplyRules() {
    // Check cache first
    const cachedRules = getCachedRules();
    if (cachedRules) {
      applyRules(cachedRules);
      return;
    }

    const rules = await fetchRules();
    if (rules && rules.length > 0) {
      cacheRules(rules);
      applyRules(rules);
    }
  }

  // Function to apply rules to the page
  function applyRules(rules) {
    rules.forEach(rule => {
      const element = document.getElementById(rule.element_id);
      if (element) {
        // Store original content if not already stored
        if (!element.dataset.originalContent) {
          element.dataset.originalContent = element.innerHTML;
        }
        element.innerHTML = rule.new_content;
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchAndApplyRules);
  } else {
    fetchAndApplyRules();
  }
})();
