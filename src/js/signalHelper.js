function conversionSignalPush(data, pushToDataLayer = true) {
    let signalData = { ...data };

    // grab all url query parameters
    const urlParams = new URLSearchParams(window.location.search);

    // loop through all query parameters and add them to the signalData object if the key exists but the value is empty
    for (const [key, value] of urlParams) {
        if (signalData[key] == null || signalData[key] == '') {
            signalData[key] = value;
        }
    }

    // Checks if media source name is set to default value or empty - if so - trigger signalHandler
    if (signalData.mediaSourceNameCall == 'LD-Broad-OrganicSearch-Multi-Spa-PL' || signalData.mediaSourceNameCall === '' || signalData.mediaSourceNameCall === null) {
        signalData = signalHandler(signalData); // Provides updated signalData with dynamic media source names
    }

    if (pushToDataLayer) {
        window.dataLayer.push({
            'adwordsConversionLabel': signalData.adwordsConversionLabel,
            'brand_id': signalData.brand_id,
            'company': signalData.company,
            'agentLanguage': signalData.agentLanguage,

            'invocaTag': signalData.invocaTag,

            'dnis': signalData.dnis,
            'mediaSourceNameChatPhoneLead': signalData.mediaSourceNameChatPhoneLead,
            'mediaSourceNameChatWebLead': signalData.mediaSourceNameChatWebLead,
            'mediaSourceNameCall': signalData.mediaSourceNameCall,
            'mediaSourceNameWebhook': signalData.mediaSourceNameWebhook,
            'marketingChannel': signalData.marketingChannel ?? null,

            'fbclid': signalData.fbclid,
            'gbraid': signalData.gbraid,
            'gclid': signalData.gclid,
            'msclkid': signalData.msclkid,
            'ttclid': signalData.ttclid,
            'utm_campaign': signalData.utm_campaign,
            'utm_content': signalData.utm_content,
            'utm_medium': signalData.utm_medium,
            'utm_source': signalData.utm_source,
            'utm_term': signalData.utm_term,
            'wbraid': signalData.wbraid,
            'xtm_adgroup': signalData.xtm_adgroup,
            'xtm_network': signalData.xtm_network,
            'xtm_offer': signalData.xtm_offer,
            'xtm_placement': signalData.xtm_placement,
        });
    }

    return signalData;
}

// Pushes data to dataLayer for confirmation page using url query parameters passed from form submission
function confirmationSignalPush() {

    const urlParams = new URLSearchParams(window.location.search);
    let data = {};

    urlParams.forEach((value, key) => {
        data[key] = value;
    });

    window.dataLayer.push({
        'adwordsConversionLabel': data.adwordsConversionLabel ?? null,
        'brand_id': data.brand_id ?? null,
        'company': data.company ?? null,
        'agentLanguage': data.agentLanguage ?? null,
        'invocaTag': data.invocaTag ?? null,
        'dnis': data.dnis ?? null,
        'mediaSourceNameCall': data.mediaSourceName ?? null,
        'mediaSourceNameWebhook': data.mediaSourceName ?? null,
        'fbclid': data.fbclid ?? null,
        'gbraid': data.gbraid ?? null,
        'gclid': data.gclid ?? null,
        'msclkid': data.msclkid ?? null,
        'ttclid': data.ttclid ?? null,
        'utm_campaign': data.utm_campaign ?? null,
        'utm_content': data.utm_content ?? null,
        'utm_medium': data.utm_medium ?? null,
        'utm_source': data.utm_source ?? null,
        'utm_term': data.utm_term ?? null,
        'wbraid': data.wbraid ?? null,
        'xtm_adgroup': data.xtm_adgroup ?? null,
        'xtm_network': data.xtm_network ?? null,
        'xtm_offer': data.xtm_offer ?? null,
        'xtm_placement': data.xtm_placement ?? null,
    });
}

// Dynamically sets media source names based on query parameters
function signalHandler(data) {
    let sigVars = { ...data };

    let referalDomain = document.referrer.toLowerCase().trim().replace(/\/$/, "");
    referalDomain = removeHttp(referalDomain).replace('www.', '');

    const {
        utm_source,
        utm_medium,
        company,
        gclid,
        msclkid,
        fbclid,
        ttclid,
        gbraid,
        wbraid,
        agentLanguage
    } = sigVars;

    const socialDomainPieces = [
        'tiktok.com',
        'youtube.com',
        'vimeo.com',
        'linkedin.com',
        'twitter.com',
        'plus.google.com',
        'orkut.com',
        'friendster.com',
        'livejournal.com',
        'blogspot.com',
        'wordpress.com',
        'friendfeed.com',
        'myspace.com',
        'digg.com',
        'reddit.com',
        'stumbleupon.com',
        'twine.com',
        'yelp.com',
        'mixx.com',
        'delicious.com',
        'tumblr.com',
        'disqus.com',
        'discord.com',
        'intensedebate.com',
        'plurk.com',
        'slideshare.net',
        'backtype.com',
        'netvibes.com',
        'mister-wong.com',
        'diigo.com',
        'flixster.com',
        '12seconds.tv',
        'zooomr.com',
        'identi.ca',
        'jaiku.com',
        'flickr.com',
        'imeem.com',
        'dailymotion.com',
        'photobucket.com',
        'fotolog.com',
        'smugmug.com',
        'classmates.com',
        'myyearbook.com',
        'mylife.com',
        'tagged.com',
        'brightkite.com',
        'ning.com',
        'bebo.com',
        'hi5.com',
        'yuku.com',
        'cafemom.com',
        'xanga.com'
    ];

    let searchDomains = [
        'google',
        'bing',
        'yahoo',
        'baidu',
        'yandex',
        'duckduckgo',
    ]

    function refDomainCheck(arg) {
        return referalDomain.includes(arg);
    }

    function isSearchDomain() {
        return searchDomains.some(domain => refDomainCheck(domain));
    }

    function removeHttp(url) {
        return url.replace(/^https?:\/\//, '');
    }

    // Defaults
    // sigVars.adwordsConversionLabel = 'fhb7CKurpfUBEKmFs9cD'; 
    sigVars.dnis = '888-725-6182';
    sigVars.marketingChannel = 'Direct'
    let mediaSourceName_dyn = `${company}-Broad-OrganicSearch-Multi-Spa-CTD`;

    if (((gclid) || (wbraid) || (gbraid) || (utm_source && utm_source.includes('GSN') || (utm_medium && utm_medium.includes('paid search')))) && refDomainCheck('google')) {
        sigVars.dnis = '888-214-0745';
        sigVars.adwordsConversionLabel = '7cMXCJqSlI4YEKmFs9cD';
        sigVars.marketingChannel = 'Paid Search';
        mediaSourceName_dyn = `${company}-Broad-PaidSearch-Google-${agentLanguage}`;
    } else if (msclkid) {
        sigVars.dnis = '888-225-6851';
        sigVars.marketingChannel = 'Paid Search';
        mediaSourceName_dyn = `${company}-Broad-PaidSearch-Bing-${agentLanguage}`;
    } else if (fbclid) {
        sigVars.dnis = '888-723-5984';
        sigVars.marketingChannel = 'Paid Social';
        mediaSourceName_dyn = `${company}-Broad-PaidSocial-Meta-${agentLanguage}`;
    } else if (ttclid) {
        sigVars.dnis = '877-461-8983';
        sigVars.marketingChannel = 'Paid Social';
        mediaSourceName_dyn = `${company}-Broad-PaidSocial-TT-${agentLanguage}`;
    } else if ((gclid) || (wbraid) || (gbraid) && refDomainCheck('youtube')) {
        sigVars.dnis = '877-461-3694';
        sigVars.marketingChannel = 'Paid Social';
        mediaSourceName_dyn = `${company}-Broad-PaidSocial-YT-${agentLanguage}`;
    }

    if (sigVars.marketingChannel.includes('Direct')) {
        if (utm_source && utm_source.includes('email')) {
            sigVars.dnis = '833-582-4567';
            sigVars.marketingChannel = 'Email';
            mediaSourceName_dyn = `${company}-Broad-Email-CC-KYR1-${agentLanguage}`;
        } else if (isSearchDomain()) {
            if (refDomainCheck('google')) {
                sigVars.dnis = '877-461-9210';
                sigVars.marketingChannel = 'Organic Search-Google'
                mediaSourceName_dyn = `${company}-Broad-OrganicSearch-Google-${agentLanguage}`;
            } else if (refDomainCheck('bing')) {
                sigVars.dnis = '877-461-9185';
                sigVars.marketingChannel = 'Organic Search-Google-Bing'
                mediaSourceName_dyn = `${company}-Broad-OrganicSearch-Bing-${agentLanguage}`;
            } else {
                sigVars.dnis = '877-461-9641';
                sigVars.marketingChannel = 'Organic Search-Google-Other'
                mediaSourceName_dyn = `${company}-Broad-OrganicSearch-Multi-${agentLanguage}`;
            }
        } else if (socialDomainPieces.includes(referalDomain)) {
            if (refDomainCheck('facebook.com')) {
                sigVars.dnis = '877-461-3738';
                sigVars.marketingChannel = 'Organic Social';
                mediaSourceName_dyn = `${company}-Broad-OrganicSocial-Meta-${agentLanguage}`;
            } else if (refDomainCheck('youtube.com')) {
                sigVars.dnis = '877-461-5822';
                sigVars.marketingChannel = 'Youtube Organic Social' // Organic Social 
                mediaSourceName_dyn = `${company}-Broad-OrganicSocial-YT-${agentLanguage}`;
            } else if (refDomainCheck('tiktok.com')) {
                sigVars.dnis = '877-461-5820';
                sigVars.marketingChannel = 'Tiktok Organic Social' // Organic Social 
                mediaSourceName_dyn = `${company}-Broad-OrganicSocial-TT-${agentLanguage}`;
            } else {
                sigVars.dnis = '877-461-5867';
                sigVars.marketingChannel = 'Organic Social' // Organic Social  
                mediaSourceName_dyn = `${company}-Broad-OrganicSocial-Other-${agentLanguage}`;
            };
        } else if (referalDomain) {
            if (referalDomain.length > 0) {
                sigVars.dnis = '877-461-5820';
                sigVars.marketingChannel = 'Referral'; // Referring URL   
                mediaSourceName_dyn = `${company}-Broad-Referral-Multi-${agentLanguage}`;
            };
        };
    };

    sigVars.mediaSourceNameChatWebLead = `${mediaSourceName_dyn}-CWL`;
    sigVars.mediaSourceNameChatPhoneLead = `${mediaSourceName_dyn}-CPL`;
    sigVars.mediaSourceNameCall = `${mediaSourceName_dyn}-PL`;
    sigVars.mediaSourceNameWebhook = `${mediaSourceName_dyn}-WL`;

    return sigVars;
}