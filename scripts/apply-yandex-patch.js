const fs = require('fs');
const path = require('path');

const files = [
  'node_modules/yandex-mobile-ads/android/src/main/java/com/yandexmobileads/YandexMobileAdsModule.kt',
  'node_modules/yandexmobileads/android/src/main/java/com/yandexmobileads/YandexMobileAdsModule.kt',
  'node_modules/yandex-mobile-ads/android/src/main/java/com/yandexmobileads/app_open/YandexAppOpenAdModule.kt',
  'node_modules/yandex-mobile-ads/android/src/main/java/com/yandexmobileads/interstitial/YandexInterstitialAdModule.kt',
  'node_modules/yandex-mobile-ads/android/src/main/java/com/yandexmobileads/rewarded/YandexRewardedAdModule.kt',
];

const replacements = [
  { from: /currentActivity\?\.let \{ activity ->/g, to: 'reactContext.currentActivity?.let { activity ->' },
  { from: /currentActivity\?\.runOnUiThread/g, to: 'context.currentActivity?.runOnUiThread' },
  { from: /val activity = currentActivity/g, to: 'val activity = context.currentActivity' },
  { from: /if \(currentActivity == null \|\| currentActivity\?\.isFinishing == true\)/g, to: 'if (context.currentActivity == null || context.currentActivity?.isFinishing == true)' },
];

let changedAny = false;

for (const rel of files) {
  const p = path.resolve(process.cwd(), rel);
  if (!fs.existsSync(p)) continue;
  try {
    let content = fs.readFileSync(p, 'utf8');
    let changed = false;
    for (const { from, to } of replacements) {
      if (from.test(content)) {
        content = content.replace(from, to);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(p, content, 'utf8');
      changedAny = true;
      console.log(`[apply-yandex-patch] Patched ${rel}`);
    }
  } catch (e) {
    // ignore to keep CI running
  }
}

if (!changedAny) {
  console.log('[apply-yandex-patch] No changes applied');
}


