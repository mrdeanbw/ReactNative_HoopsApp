package com.hoops;

import com.facebook.react.ReactActivity;
import com.evollu.react.fa.FIRAnalyticsPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;

import android.content.Intent;

public class MainActivity extends ReactActivity {
     
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Hoops";
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
}
