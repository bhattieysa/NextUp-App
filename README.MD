## NEXTUP

After taking clone from repository run the following command in terminal to install the node modules.

# if using yarn
 - yarn install

# if using npm 
 - npm install

After installing the node module following are the changes require in node modules.

1. # At the following location :- [Project-Dir/node_modules/react-native/Libraries/Image/RCTLocalAssetImageLoader.mm]
   Replace the method [-(BOOL)shouldCacheLoadedImages] with the following method

   - (BOOL)shouldCacheLoadedImages
    {
        // UIImage imageNamed handles the caching automatically so we don't want
        // to add it to the image cache.
        return NO;
    }

    - (RCTImageLoaderCancellationBlock)loadImageForURL:(NSURL *)imageURL
                                                size:(CGSize)size
                                                scale:(CGFloat)scale
                                            resizeMode:(RCTResizeMode)resizeMode
                                        progressHandler:(RCTImageLoaderProgressBlock)progressHandler
                                    partialLoadHandler:(RCTImageLoaderPartialLoadBlock)partialLoadHandler
                                    completionHandler:(RCTImageLoaderCompletionBlock)completionHandler
    {
        UIImage *image = RCTImageFromLocalAssetURL(imageURL);
        if (image) {
            if (progressHandler) {
             progressHandler(1, 1);
        }
        completionHandler(nil, image);
        } else {
            NSString *message = [NSString stringWithFormat:@"Could not find image %@", imageURL];
            RCTLogWarn(@"%@", message);
            completionHandler(RCTErrorWithMessage(message), nil);
        }
    
        return nil;
    }


2. # At the following location :- [Project-Dir/node_modules/react-native-google-fit/android/src/main/java/GoogleFitManager.java]

    Replace the line number 199 with the following code :-
    GoogleSignInAccount gsa = GoogleSignIn.getAccountForScopes(mReactContext, new Scope("https://www.googleapis.com/auth/fitness.activity.read"));


 3.  ```Replace the [Project-Dir/node_modules/react-native-mo-video-player] from [Project-Dir/utils/react-native-mo-video-player] ```

4.  # At the following location :- [Project-Dir/node_modules/react-native-mo-video-player/MoVideoPlayer/MoVideoPlayer.js]
 
  Comment the following line numbers :- 67 - dimensionSubscriber.remove()
                                        83 - appStateSubscriber.remove()


After completing the above changes from point [1-4].

Following are the steps need to follow to build the app on both android and ios platform.

# Following are the steps to build on IOS.
  
  1. # if using yarn then run command in terminal -: yarn pods
     # else :- cd ios && pod install && cd ..
  
  After installing pods
  2. # if using yarn then run command in terminal -: yarn xcode
     # else -: "cd ios && open NextUp.xcworkspace"
  
  once project open in xcode then 

  3.  Go to the file in Pods/Development Pods/RNImageCropPicker/ImageCropPicker.m

      Add the following line of code at line number 892.

       if(@available(iOS 15.0, *)) {
            cropVC.modalTransitionStyle = UIModalTransitionStyleCoverVertical;
        }
  
  After making above change close the xcode. 

  4. First remove the js bundle (main.jsbundle) from the following location [Project-Dir/ios/]
     Then run the following command in terminal to create JS bundle for ios

     # if using yarn :- yarn iosBundle

     # else run command in terminal :-  npx react-native bundle --entry-file='index.js' --bundle-output='./ios/main.jsbundle' --dev=false --platform='ios' --assets-dest='./ios'

  After creating the JS bundle for ios you can procedd to for ios build by opening project in xcode as 
  instructed in IOS build step no. 2.
  Once project open in xcode you can procedd for build.


# Following are the steps to build on ANDROID.

   1. First delete the old build folder from the following location [Project-Dir/android/app/]
   2. Then remove the old js bundle (index.android.bundle) from the following location [Project-Dir/android/app/src/main/assets/]

   3. Then run the following command to create android debug build.

      # if using yarn run the following command in terminal :- yarn apk
      
      # else run the following command in terminal :-  npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ && cd android && ./gradlew assembleDebug

    
    Once the process complete for apk in terminal you can find the android apk at the following location:-

    android apk location :- [Project-Dir/android/app/build/outputs/apk/debug]
     

  
  






  




