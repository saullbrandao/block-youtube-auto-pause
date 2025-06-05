browser.webRequest.onBeforeRequest.addListener(
    function (details) {
        try {
            const url = new URL(details.url)

            if (!url.searchParams.has('lact') || url.searchParams.get('lact') === '0') {
                return;
            }

            url.searchParams.set('lact', 0)
            return { redirectUrl: url.toString() }
        }
        catch (e) {
            console.log("Error processing YouTube request:", e.message)
            throw (e)
        }
    },
    { urls: ['https://www.youtube.com/*', 'https://music.youtube.com/*'], types: ['xmlhttprequest'] },
    ['blocking']
);


