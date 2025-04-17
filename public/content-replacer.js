
(function() {
  // Configuration
  const RULES_ENDPOINT = 'https://kqfbuyqiylcgxrgpcuqq.supabase.co/functions/v1/get-rules';
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

  // Function to fetch and apply rules
  async function fetchAndApplyRules() {
    // Check cache first
    const cachedRules = getCachedRules();
    if (cachedRules) {
      applyRules(cachedRules);
      return;
    }

    // Build query params
    const params = new URLSearchParams({
      url: window.location.origin + window.location.pathname,
      ...getUtmParams()
    });

    try {
      const response = await fetch(`${RULES_ENDPOINT}?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch rules');
      
      const rules = await response.json();
      cacheRules(rules);
      applyRules(rules);
    } catch (error) {
      console.error('Error fetching content rules:', error);
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
