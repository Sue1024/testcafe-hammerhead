asyncTest('cross domain messaging between windows', function () {
    expect(4);

    var iframe = document.createElement('iframe');

    iframe.src = getCrossDomainPageUrl('../data/cross-domain/target-url.html');
    document.body.appendChild(iframe);

    var messageCounter = 0;

    window.onmessage = function (e) {
        strictEqual(e.origin, 'http://target_url');

        messageCounter += parseInt(e.data, 10);

        if (messageCounter >= 4) {
            iframe.parentNode.removeChild(iframe);
            window.onmessage = null;
            start();
        }
    };
});
