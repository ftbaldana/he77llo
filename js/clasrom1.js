// Ads completely disabled - safe stub version (FIXED FLOW)

// Dummy adsbygoogle
window.adsbygoogle = window.adsbygoogle || [];

var rewardReadyShowAds = null;

// Dummy adBreak / adConfig (ASYNC FLOW FIXED)
const adBreak = adConfig = function (o) {
    if (!o || typeof o !== "object") return;

    // BEFORE AD (pause vs)
    if (o.beforeAd) o.beforeAd();

    // Reward flow gerekiyorsa sakla
    if (o.beforeReward) {
        o.beforeReward(function () {
            console.log("showAdFn called (fake)");
        });
    }

    // Async simülasyon (EN KRİTİK KISIM)
    setTimeout(() => {

        // Reward verilecekse
        if (o.adViewed) o.adViewed();

        // After ad
        if (o.afterAd) o.afterAd();

        // Finish callback
        if (o.adBreakDone) {
            o.adBreakDone({
                breakType: o.type || "none",
                breakName: o.name || "none",
                breakFormat: "none",
                breakStatus: "completed"
            });
        }

    }, 400);
};


// Init
function InitSDKJs() {
    console.log("SDK Init (Ads Disabled)");

    setTimeout(() => {
        LoadRewardedAdsJs();
        myGameInstance.SendMessage('RHMAdsManager', 'InitSucceed', 'ads-disabled');
    }, 100);
}


// Interstitial (DOĞRU AKIŞ)
function CallInterstitialAdsJs() {
    console.log("Interstitial skipped");

    pauseGameBeforeAds();

    setTimeout(() => {
        resumeGameAfterAds();
    }, 300);
}


// Rewarded preload
function LoadRewardedAdsJs() {
    console.log("Rewarded Ads Fake Loaded");

    setTimeout(() => {
        RewardedAdsLoaded();
    }, 100);
}


// Rewarded show (UNITY SAFE)
function CallRewardedAdsJs() {
    console.log("Rewarded Ads Simulated");

    pauseGameBeforeAds();

    setTimeout(() => {

        // bazı oyunlar bunu bekler
        if (typeof rewardReadyShowAds === "function") {
            rewardReadyShowAds();
        }

        RewardSuccessful();

        // bazı sistemler dismiss bekler
        RewardedAdsDismissed();

        resumeGameAfterAds();

    }, 500);
}


// States
function RewardedAdsLoaded() {
    console.log("Rewarded Ads Available (Fake)");
    myGameInstance.SendMessage('RHMAdsManager', 'isRewardedAdsLoaded', 'true');
}

function RewardedAdsNotLoaded() {
    console.log("Rewarded Ads Not Available");
    myGameInstance.SendMessage('RHMAdsManager', 'isRewardedAdsLoaded', 'false');
}

function RewardedAdsDismissed() {
    console.log("Reward Dismissed");
    myGameInstance.SendMessage('RHMAdsManager', 'RewardedAdsFailed');
}

function RewardSuccessful() {
    console.log("Reward Granted");
    myGameInstance.SendMessage('RHMAdsManager', 'RewardedAdsSuccessfull');
}


// Game control
function pauseGameBeforeAds() {
    try {
        myGameInstance.SendMessage('RHMAdsManager', 'pauseGame');
    } catch (e) {}
}

function resumeGameAfterAds() {
    try {
        myGameInstance.SendMessage('RHMAdsManager', 'resumeGame');
    } catch (e) {}
}