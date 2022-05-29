import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { Platform } from 'react-native'

const PLATFORM_CAMERA_PERMISSIONS = {
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
}

const PLATFORM_GALLERY_PERMISSIONS = {
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
}

const PLATFORM_LOCATION_PERMISSIONS = {
    ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
}

const PLATFORM_LOCATION_WHEN_IN_USE = {
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
}

const PLATFORM_MICROPHONE_PERMISSIONS = {
    ios: PERMISSIONS.IOS.MICROPHONE,
    android: PERMISSIONS.ANDROID.RECORD_AUDIO,
}

const REQUEST_PERMISSION_TYPE = {
    camera: PLATFORM_CAMERA_PERMISSIONS,
    gallery: PLATFORM_GALLERY_PERMISSIONS,
    location: PLATFORM_LOCATION_PERMISSIONS,
    locationWhenInUse: PLATFORM_LOCATION_WHEN_IN_USE,
    microPhone: PLATFORM_MICROPHONE_PERMISSIONS,
}

const PERMISSION_TYPE = {
    camera: 'camera',
    gallery: 'gallery',
    location: 'location',
    locationWhenInUse: 'locationWhenInUse',
    microPhone: 'microPhone',
}

class AppPermission {

    checkPermission = async (type): Promise<boolean> => {
        console.log("AppPermission CheckPermission type", type)
        const permission = REQUEST_PERMISSION_TYPE[type][Platform.OS]
        console.log("AppPermission Check Permission ", permission)
        if (!permission) {
            return true
        }
        try {
            const result = await check(permission)
            console.log("AppPermission CheckPermission result ", result)
            if (result === RESULTS.GRANTED) {
                return true
                // return this.requestPermission(permission)
            } else {
                return this.requestPermission(permission)   // here requesting for permission
            }

        } catch (error) {
            console.log("AppPermission CheckPermission error ", error)
            return false
        }
    }

    requestPermission = async (permission): Promise<boolean> => {
        console.log("AppPermission requestPermission  ", permission)
        try {
            const result = await request(permission)
            console.log("AppPermission requestPermission result ", result)
            return result === RESULTS.GRANTED

        } catch (error) {
            console.log("AppPermission requestPermission error ", error)
            return false
        }
    }
}

const Permission = new AppPermission()
export { Permission, PERMISSION_TYPE }


//Permission message for gallery
// const gallery_rationale = {
//     title: "Gallery Permission",
//     message: "This app requires access to the photo library.",
//     buttonNeutral: "Only while using the app!",
//     buttonNegative: "Deny",
//     buttonPositive: "Alow"
// };

// const camera_rationale = {
//     title: "Camera Permission",
//     message: "This app requires access to the camera.",
// };

// //check camera permission 
// export const CheckCameraPermission = ({ cb }) => {
//     console.log("check start");
//     check(PERMISSIONS.IOS.CAMERA).then((result) => {
//         if (result == RESULTS.GRANTED) {
//             cb(true);
//         } else if (result == RESULTS.DENIED || result == RESULTS.BLOCKED) {
//             requestCameraPermission((res) => {
//                 if (res) {
//                     console.log("Camera res", res)
//                 } else {

//                 }
//             })
//             console.log("Camera permission result", result);
//         }

//     })
// }

// //check gallery permission
// export const CheckGalleryPermission = (cb) => {
//     console.log("1. Gallery permission start ");
//     check(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
//         console.log("Gallery permission result", result);
//         if (result == RESULTS.GRANTED) {
//             cb(true);
//         } else if (result == RESULTS.DENIED || result == RESULTS.BLOCKED) {
//             requestGalleryPermission();
//             // console.log("Camera permission result", result);
//         }
//     })
// }

// const requestCameraPermission = () => {
//     return request(PERMISSIONS.IOS.CAMERA, camera_rationale)
//         .then((result) => {
//             return result === true || result === RESULTS.GRANTED;
//         })
// }

// async function requestGalleryPermission() {
//     console.log("2. Gallery permission request start ");
//     await request(PERMISSIONS.IOS.MEDIA_LIBRARY, gallery_rationale)
//         .then((result) => {

//         })

// }