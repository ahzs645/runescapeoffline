// Offline Singleplayer Mode - No Server Required
// This runs the game server as a Web Worker in your browser

const mudclient = require('./src/mudclient');

if (typeof window === 'undefined') {
    throw new Error('rsc-client needs to run in a browser');
}

(async () => {
    const mcContainer = document.createElement('div');
    const mc = new mudclient(mcContainer);

    // Configure client options
    Object.assign(mc.options, {
        middleClickCamera: true,
        mouseWheel: true,
        resetCompass: true,
        zoomCamera: true,
        accountManagement: true,
        mobile: false,
        retryLoginOnDisconnect: false
    });

    // Set to free-to-play (change to true for members content)
    mc.members = false;

    // Create the server as a Web Worker
    const serverWorker = new Worker('./server.bundle.min.js');

    // Start the server with configuration
    serverWorker.postMessage({
        type: 'start',
        config: {
            worldID: 1,
            version: 204,
            members: false,
            experienceRate: 8, // 8x XP rate for singleplayer fun
            fatigue: false,    // Disable fatigue for singleplayer
            rememberCombatStyle: true
        }
    });

    // Wait a moment for the server to initialize
    await new Promise(resolve => setTimeout(resolve, 500));

    // Pass the worker to the client instead of a WebSocket server
    mc.server = serverWorker;
    mc.threadSleep = 10;

    document.body.appendChild(mcContainer);

    // Add fullscreen button
    const fullscreen = document.createElement('button');
    fullscreen.innerText = 'Fullscreen';
    fullscreen.style.cssText = 'position:fixed;bottom:10px;right:10px;padding:10px 20px;cursor:pointer;z-index:1000;';
    fullscreen.onclick = () => {
        mcContainer.requestFullscreen();
    };
    document.body.appendChild(fullscreen);

    // Add info text
    const info = document.createElement('div');
    info.style.cssText = 'position:fixed;top:10px;left:10px;color:#fff;font-family:sans-serif;font-size:12px;z-index:1000;background:rgba(0,0,0,0.7);padding:5px 10px;border-radius:5px;';
    info.innerHTML = 'RuneScape Classic - Offline Singleplayer<br>Create an account to start playing!';
    document.body.appendChild(info);

    // Remove info after 10 seconds
    setTimeout(() => info.remove(), 10000);

    await mc.startApplication(512, 346, 'RuneScape Classic - Offline');
})();
