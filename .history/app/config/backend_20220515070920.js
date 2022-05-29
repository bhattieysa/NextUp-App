import React, { useState, useEffect } from 'react';

// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import config from '.';
import {
    AccessToken,
    GraphRequest,
    LoginManager,
    GraphRequestManager,
} from 'react-native-fbsdk';

// import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';

import { Alert } from 'react-native'

// import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';
import { showErrorAlert } from '../utils/info';
import { FacebookParams, GoogleParams } from '../constants/constant';
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
import firebase from './firebase'
import auth from '@react-native-firebase/auth';
let user = null;


class Backend {

    constructor() {
        // GoogleSignin.configure({
        //     webClientId: config.webClientId,
        //     offlineAccess: false,
        // });
    }

    async handleFacebookLogin() {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    }
    async fetchAndUpdateCredentialState() {
        if (user === null) {
            return (false, 'N/A')
            //   updateCredentialStateForUser('N/A');
        } else {
            const credentialState = await appleAuth.getCredentialStateForUser(user);
            return (true, credentialState)
        }
    }
    async handleAppleLogin(cb) {
        console.warn('Beginning Apple Authentication');
        if (!appleAuth.isSupported) {

            alert('Apple Authentication is not supported on this device.')
            return
        }
        // start a login request
        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });

            console.log('appleAuthRequestResponse', appleAuthRequestResponse);

            const {
                user: newUser,
                email,
                nonce,
                identityToken,
                realUserStatus /* etc */,
            } = appleAuthRequestResponse;

            user = newUser;

            const data = await this.fetchAndUpdateCredentialState()

            console.log(data);

            if (identityToken) {
                // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
                console.log(nonce, identityToken);
            } else {
                // no token - failed sign-in?
            }

            if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
                console.log("I'm a real person!");
            }

            console.warn(`Apple Authentication Completed, ${user}, ${email}`);
        } catch (error) {
            if (error.code === appleAuth.Error.CANCELED) {
                console.warn('User canceled Apple Sign in.');
            } else {
                console.error(error);
            }
        }
    }

    // firebaseGoogleLogin = async () => {
    //     debugger
    //     // add any configuration settings here:
    //     await GoogleSignin.hasPlayServices();
    //     const userInfo = await GoogleSignin.signIn();
    //     const credential = auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
    //     // const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
    //     debugger
    //     return auth().signInWithCredential(credential)
    //     // console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));

    // }


    onAppleButtonPress = async () => {
        // Start the sign-in request
        debugger
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
        debugger
        // Ensure Apple returned a user identityToken
        if (!appleAuthRequestResponse.identityToken) {
            throw 'Apple Sign-In failed - no identify token returned';
        }

        // Create a Firebase credential from the response
        const { identityToken, nonce } = appleAuthRequestResponse;
        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
        debugger
        // Sign the user in with the credential
        return auth().signInWithCredential(appleCredential);
    }

    handleImperativeLogin(id, cb) {
        debugger
        if (id == 0) {
            this.handleFacebookLogin().then(e => {
                cb(e);
            })
        }
        else if (id == 1) {
            this.onAppleButtonPress().then(e => {
                cb(e);
            })
        }
        else {
            debugger
            // this.firebaseGoogleLogin().then(e => {
            //     debugger;
            //     // console.log(e)
            //     cb(e);
            // })
        }
    }

    // checkEmailExist(email, cb) {
    //     auth().signInWithEmailAndPassword(email, '98959685848585').then((e) => {
    //         console.log(e)
    //     }).catch(error => {
    //         console.log(error.code)
    //         if (error.code !== 'auth/user-not-found') {
    //             cb(true)
    //         } else {
    //             cb(false)
    //         }
    //     })
    // }

    handleLoginWithEmailAndPass(email, pass, cb) {
        auth()
            .createUserWithEmailAndPassword(email, pass)
            .then((e) => {
                cb(true, e)
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {

                    auth().signInWithEmailAndPassword(email, pass).then((e) => {
                        cb(true, e)
                    }).catch(error => {
                        cb(false, error.userInfo.message)
                    })

                    // cb(true, 'old')
                    // console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    cb(false, error.userInfo.message)

                }

                console.error(error);
            });
    }

    isEmailExist(email, cb) {
        auth()
            .fetchSignInMethodsForEmail(email)
            .then((e) => {
                if (e.length > 0) {
                    cb(true, e)
                } else {
                    cb(false, e)
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    updateUserPassword(oldPass, newPass, cb) {
        debugger
        var user = auth().currentUser
        const emailCred = auth.EmailAuthProvider.credential(user._user.email, oldPass);
        debugger
        auth().currentUser.reauthenticateWithCredential(emailCred).then(() => {
            // User successfully reauthenticated.
            debugger
            auth().currentUser.updatePassword(newPass)
                .then(() => {
                    debugger
                    console.log("PasswordUpdated:")
                    cb(true);
                })
                .catch(error => {
                    debugger
                    alert(error);
                    console.log("Erorrr", error)
                    cb(false);
                })

        })
            .catch(error => {
                debugger
                console.log('Password change fail', error);
                cb(false);
            });
    }
}

export default new Backend