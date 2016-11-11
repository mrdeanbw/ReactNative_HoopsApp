react-native bundle --platform ios --entry-file index.ios.js --dev true --bundle-output main.jsbundle --assets-dest ./ios --sourcemap-output ./sourcemap.js

curl https://upload.bugsnag.com/ \
  -F apiKey=25983a784e900e85ae661a2e5685d61a \
  -F appVersion=0.2 \
  -F minifiedUrl="http://localhost:8081/index.ios.bundle?platform=ios&dev=true&minify=false" \
  -F sourceMap=@sourcemap.js \
  -F minifiedFile=@main.jsbundle \
  -F overwrite=true
