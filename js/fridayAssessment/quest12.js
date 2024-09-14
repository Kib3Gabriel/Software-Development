// Q12.Write a JavaScript function to parse an URL.

function parse_URL(url) {
    const a = new URL(url);

    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port || (a.protocol === 'https:' ? '443' : '80'),  // Use default ports if not provided
        query: a.search,
        params: (function () {
            let ret = {};
            a.searchParams.forEach((value, key) => {
                ret[key] = value;
            });
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname,
        relative: a.href.replace(a.origin, ''),
        segments: a.pathname.replace(/^\//, '').split('/')
    };
}

console.log(parse_URL('https://github.com/pubnub/python/search?utf8=%E2%9C%93&q=python'));

function parseURL(url) {
    const parsed = new URL(url);

    return {
        href: parsed.href,                // The full URL
        protocol: parsed.protocol,        // The protocol (e.g. http:, https:)
        host: parsed.host,                // The full host (e.g. example.com:80)
        hostname: parsed.hostname,        // The domain without port (e.g. example.com)
        port: parsed.port,                // The port (e.g. 80 or 443)
        pathname: parsed.pathname,        // The path (e.g. /some/path/)
        search: parsed.search,            // The query string (e.g. ?key=value)
        hash: parsed.hash,                // The hash (e.g. #section1)
        params: (() => {                  // The search parameters as an object
            let paramsObj = {};
            parsed.searchParams.forEach((value, key) => {
                paramsObj[key] = value;
            });
            return paramsObj;
        })()
    };
}

// Example usage:
const url = "https://www.example.com:8080/path/to/page?name=John&age=30#section2";
console.log(parseURL(url));
