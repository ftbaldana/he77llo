// Ads completely disabled - safe stub version
// Keeps all functions but prevents errors and keeps game flow working

// Dummy adsbygoogle
window.adsbygoogle = window.adsbygoogle || [];

// Dummy adBreak / adConfig
const adBreak = adConfig = function (o) {
    // Immediately simulate successful flow without ads
    if (o && typeof o === "object") {
        // Simulate callbacks safely
        if (o.beforeAd) o.beforeAd();
        if (o.beforeReward) o.beforeReward(() => {});
        if (o.adViewed) o.adViewed();
        if (o.afterAd) o.afterAd();
        if (o.adBreakDone) {
            o.adBreakDone({
                breakType: o.type || "none",
                breakName: o.name || "none",
                breakFormat: "none",
                breakStatus: "completed"
            });
        }
    }
};

var rewardReadyShowAds = null;

// Init (instant success)
function InitSDKJs() {
    console.log("SDK Init (Ads Disabled)");

    setTimeout(() => {
        LoadRewardedAdsJs();
        myGameInstance.SendMessage('RHMAdsManager', 'InitSucceed', 'ads-disabled');
    }, 100);
}

// Interstitial (skip but keep flow)
function CallInterstitialAdsJs() {
    console.log("Interstitial skipped");
    pauseGameBeforeAds();
    resumeGameAfterAds();
}

// Rewarded load (always available)
function LoadRewardedAdsJs() {
    console.log("Rewarded Ads Fake Loaded");
    RewardedAdsLoaded();
}

// Rewarded show (instant success)
function CallRewardedAdsJs() {
    console.log("Rewarded Ads Simulated");

    pauseGameBeforeAds();

    setTimeout(() => {
        RewardSuccessful();
        resumeGameAfterAds();
    }, 300);
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
