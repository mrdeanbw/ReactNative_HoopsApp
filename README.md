
# Instructions for building

`npm install -g react-native-cli rnpm`

`npm install`
`rnpm link`

Make sure you have CocoaPods installed https://cocoapods.org/
`cd ios && pod install`

Make sure you have the Facebook SDK in your ~/Documents as per facebook instructions https://developers.facebook.com/docs/ios/getting-started/#download

`npm run ios`

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
