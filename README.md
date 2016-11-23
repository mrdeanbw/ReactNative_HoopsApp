
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
