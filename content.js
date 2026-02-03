/*
DSMaster
Twitch Raid Player Pauser - content.js
2/3/26
V1.2
*/

(function () {
    //manifest only loads this script on the twitch domain
    const targetNode = document.querySelector("video"); //target is video element
    const config = { attributes: true }; //enable observing of attributes for mutationobserver
    const callback = function(mutationList, observer) { //main func
        for(const mutation of mutationList) { 
            if (mutation.type === 'attributes') {
                if (mutation.attributeName === 'src') { //if the src= attribute changed in a <video> element...
                    const collection = document.getElementsByClassName("player-ad-notice"); //check if the ads are being played (so don't pause)
                    if (collection[0] !== undefined && collection[0].clientHeight === 30) { //just had to find something that changed to hook into for check
                        console.log("[Twitch Raid Player Pauser] Ads playing. Not pausing.")
                    } else if (new URL(window.location.href).searchParams.get("referrer") === "raid") { //otherwise, if src changed (like in a raid) and the link at this time has referrer=raid...
                        targetNode.pause(); //actual pause of the video
                        console.log("[Twitch Raid Player Pauser] Twitch player paused.")
                        setTimeout(rePause, 5000); //just in case there is weird loading stuff, just pause again after 5s
                    }
                }
                //console.log('Attribute changed:', mutation.attributeName);
            }
        }
    };

    const observer = new MutationObserver(callback); //create mutationobserver
    observer.observe(targetNode, config); //call it

    const rePause = () => { //func to pause video
        const videoNode = document.querySelector("video");
        videoNode.pause();
        console.log("[Twitch Raid Player Pauser] Twitch player repaused.")
    }

    // if (url.searchParams.get("referrer") === "raid") { //check if redirect from raid
    //     console.log("[Twitch Raid Player Pauser] Raid referrer detected. Attempting to pause the Twitch player...");

    //     const pausePlayer = () => { //pause twitch player function
    //         const player = document.querySelector("video"); //select <video> element from DOM
    //         if (player && player.getAttribute("src")) { //check to ensure player is initialized and that it has "src" attribute; <video src="something">; the player is actually loaded when the "src" attribute is added
    //             player.pause();
    //             console.log("[Twitch Raid Player Pauser] Twitch player paused.");
    //         } else {
    //             console.log("[Twitch Raid Player Pauser] Twitch player not fully loaded. Retrying...");
    //             setTimeout(pausePlayer, 1000); //retry after 1000ms; may have to adjust to fine-tune; if it happens too quickly, the player will "pause" but reload and still play
    //         }
    //     };

    //     pausePlayer();
    // } else {
    //     //console.log("[Twitch Raid Player Pauser] No raid detected.");
    // }
})();
  