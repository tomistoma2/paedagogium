// Analytics.js
import React, { useEffect, useState } from 'react';

const Analytics = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      var _paq = window._paq = window._paq || [];
      _paq.push(["setExcludedQueryParams", ["id","tid","KEY","key","dlpar","sso_id","ret"]]);
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);
      
      (function() {
        var u="//atlas.is.cuni.cz/matomo/";
        _paq.push(['setTrackerUrl', u+'matomo.php']);
        _paq.push(['setSiteId', '1']);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
      })();

      setInitialized(true);
      console.log("Matomo initialized");
    }
  }, [initialized]);

  return null; // Since this is a utility component, it doesn't render anything
};

export default Analytics;
