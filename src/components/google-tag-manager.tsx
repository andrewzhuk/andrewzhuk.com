import React from 'react'
const GTM_ID = 'GTM-TF88ZLGM'

export const GoogleTagManager = () => {
  return (
    <>
      <script
        // key="gtm-script"
        id="google-tag-manager"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
      >
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer', '${GTM_ID}');
        `}
      </script>
      <noscript
      // key="gtm-noscript"
      >
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>
    </>
  )
}

export default GoogleTagManager
