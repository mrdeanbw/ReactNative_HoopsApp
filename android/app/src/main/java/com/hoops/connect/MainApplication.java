package com.hoops.connect;

import android.app.Application;
import com.bugsnag.BugsnagReactNative;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactApplication;
import com.airbnb.android.react.maps.MapsPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.horcrux.svg.SvgPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.imagepicker.ImagePickerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.bugsnag.BugsnagReactNative;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        FacebookSdk.sdkInitialize(getApplicationContext());
        AppEventsLogger.activateApp(this);
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
            new MapsPackage(),
            new FIRMessagingPackage(),
            new LottiePackage(),
            new RNDeviceInfo(),
                new SvgPackage(),
                new MapsPackage(),
                new ReactNativeI18n(),
                new RNFetchBlobPackage(),
                new FIRMessagingPackage(),
                new FBSDKPackage(mCallbackManager),
                new ImagePickerPackage(),
                BugsnagReactNative.getPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}
