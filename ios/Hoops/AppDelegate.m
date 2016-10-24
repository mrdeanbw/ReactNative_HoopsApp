/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"

#import "Firebase.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <UserNotifications/UserNotifications.h>

@implementation AppDelegate 

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  //initialise firebase
  [FIRApp configure];
  
#if defined(__IPHONE_10_0) && __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_10_0
  UNAuthorizationOptions authOptions =
  UNAuthorizationOptionAlert
  | UNAuthorizationOptionSound
  | UNAuthorizationOptionBadge;
  [[UNUserNotificationCenter currentNotificationCenter]
   requestAuthorizationWithOptions:authOptions
   completionHandler:^(BOOL granted, NSError * _Nullable error) {
     NSLog(@"%@ and %i", @"well done", granted);
     NSString *token = [[FIRInstanceID instanceID] token];
     NSLog(@"%@", token);
   }
   ];
  
  // For iOS 10 display notification (sent via APNS)
  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];
  // For iOS 10 data message (sent via FCM)
  [[FIRMessaging messaging] setRemoteMessageDelegate:self];
#endif
  
  [[UIApplication sharedApplication] registerForRemoteNotifications];

  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];

  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Hoops"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {

  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
                                                                openURL:url
                                                      sourceApplication:sourceApplication
                                                             annotation:annotation
                  ];
  // Add any custom logic here.
  return handled;
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center  willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  NSLog( @"Handle push from foreground" );
  // custom code to handle push while app is in the foreground
  NSLog(@"%@", notification.request.content.userInfo);
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler
{
  NSLog( @"Handle push from background or closed" );
  // if you set a member variable in didReceiveRemoteNotification, you  will know if this is from closed or background
  NSLog(@"%@", response.notification.request.content.userInfo);
}

- (void)applicationReceivedRemoteMessage:(FIRMessagingRemoteMessage *)remoteMessage
{
  NSLog(@"Handle FIRMessaging remote message");
  NSLog(@"%@", remoteMessage.appData);
}

- (void)tokenRefreshNotification:(NSNotification *)notification {
  // Note that this callback will be fired everytime a new token is generated, including the first
  // time. So if you need to retrieve the token as soon as it is available this is where that
  // should be done.
  NSString *refreshedToken = [[FIRInstanceID instanceID] token];
  NSLog(@"InstanceID token: %@", refreshedToken);
  
  // Connect to FCM since connection may have failed when attempted before having a token.
  //[self connectToFcm];
  
  // TODO: If necessary send token to application server.
}

@end
