
# Instructions for building

`npm install -g react-native-cli rnpm`

`npm install`
`rnpm link`

Make sure you have CocoaPods installed https://cocoapods.org/

`cd ios && pod install`

Make sure you have the Facebook SDK in your ~/Documents as per facebook instructions https://developers.facebook.com/docs/ios/getting-started/#download

## Xcode
After the previous POD install step, open the project using `ios/Hoops.xcworkspace`
Otherwise you'll experience errors with GoogleToolbox dependencies.

`npm run ios`

# Google Play Service Android

In order for react native maps to work, make sure your android sdk manager is upto date 'Support Repository / Google Repository'

If you are testing on Genymotion Emulator you need to set up Google Play support.
You can follow the instructions to set it up here.
https://github.com/codepath/android_guides/wiki/Genymotion-2.0-Emulators-with-Google-Play-support


# Debugging

Follow these instructions to install redux debugger
https://github.com/jhen0409/react-native-debugger

Add this patch to open the debugger
https://github.com/jhen0409/react-native-debugger/tree/master/patch

# Lint

`npm run lint` to lint the entire project
`./node_modules/.bin/eslint $FILENAME` to run lint a specific file

# Bugsnag / Sourcemaps

There is an addition to React's xcode build script - output a sourcemap and upload
it to bugsnag when building in release mode.

To manually upload sourcemaps to bugsnag:

```bash
react-native-cli bundle \
  --entry-file index.ios.js \
  --platform ios \
  --dev false \
  --reset-cache \
  --bundle-output ./bundle.min.js \
  --assets-dest ./ios/assets \
  --sourcemap-output ./sourcemap.js

#Make sure you use the right appVersion
curl https://upload.bugsnag.com/ \
    -F apiKey=25983a784e900e85ae661a2e5685d61a \
    -F appVersion=0.2 \
    -F minifiedUrl="main.jsbundle" \
    -F sourceMap=@bundle.min.js \
    -F minifiedFile=@sourcemap.js \
    -F overwrite=true

#Curl should return an "OK" response.
```
