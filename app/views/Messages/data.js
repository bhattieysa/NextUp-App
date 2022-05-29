export const userId = 12
let otherId = 15

// Type of Data to be deal in Chat
export const TEXT_TYPE = "TEXT_TYPE";
export const IMAGE_TYPE = "IMAGE_TYPE";
export const VIDEO_TYPE = "VIDEO_TYPE";
export const BANNER_TYPE = "BANNER_TYPE";


// User 
let user1 = {
    _id: userId,
    _avatar: require("./user1.jpeg"),
    _name: "Jason Mamoa"
}


let user2 = {
    _id: otherId,
    _avatar: require("./user2.jpeg"),
    _name: "Mike Lenon"
}

// Messages Data set
const MessgeData = [
    {
        _id: 10,
        _user: user1,
        _type: TEXT_TYPE,
        _msg: "Ullamco quis enim incididunt consequat quis consectetur consequat esse cupidatat non voluptate non qui magna. Sint consequat mollit incididunt commodo in nostrud. Ut voluptate adipisicing anim adipisicing esse reprehenderit magna dolor laboris duis consequat nisi id deserunt. Nisi incididunt ut officia Lorem minim. Reprehenderit elit ut eiusmod reprehenderit enim nisi mollit laboris commodo proident consequat qui dolor nostrud. Ea nulla consequat deserunt voluptate ad sit aliqua est ea enim culpa commodo. Duis est veniam aliquip ipsum adipisicing minim adipisicing esse id laboris aliqua.",
        _time: "12.30 AM"
    },
    {
        _id: 0,
        _user: user1,
        _type: TEXT_TYPE,
        _msg: "Hi Mike! How are you ?",
        _time: "12.30 AM"
    },
    {
        _id: 1,
        _type: BANNER_TYPE,
        _banner: {
            title: "Lorem enim labore laborum in.",
            desc: "Labore sit laboris enim labore Lorem officia adipisicing et ea mollit aliqua excepteur irure.",
            primaryBtn: "Ok",
            SecondaruBtn: "Cancel"
        },
        _time: "12.30 AM"
    },
    {
        _id: 2,
        _user: user2,
        _type: TEXT_TYPE,
        _msg: "Hello Jason!",
        _time: "12.30 AM"
    },
    {
        _id: 3,
        _user: user1,
        _type: IMAGE_TYPE,
        src: '/Users/cis/Library/Developer/CoreSimulator/Devices/E7350577-8CF8-462B-B1E8-6FBEA1AAB8BF/data/Containers/Data/Application/9415ED7F-5AEC-4AE8-81BE-369637A7A257/tmp/react-native-image-crop-picker/06514C27-25ED-4741-89CF-DA8BDAFB7D32.jpg',
        _time: "12.30 AM"
    },
    {
        _id: 4,
        _user: user2,
        _type: VIDEO_TYPE,
        src: 'https://muxed.s3.amazonaws.com/ink.mp4',//require("./user1.jpeg"),
        _time: "12.30 AM"
    },
    {
        _id: 5,
        _user: user1,
        _type: BANNER_TYPE,
        _banner: {
            title: "Elit cillum ut",
            desc: "Aute exercitation magna eiusmculpa est aliquip nostrud ullamco aute esse deserunt.",
            primaryBtn: "Ok",
            SecondaruBtn: "Cancel"
        },
        _time: "12.30 AM"
    }
]


// List of users as per type
export const messageList = {
    Palyer: [
        { user: user1, type: 'TEXT_TYPE', msg: 'Hello World, How r u?', time: '10.30 AM' },
        { user: user2, type: 'TEXT_TYPE', msg: 'By the way, How r u?', time: '10.30 AM' }
    ],
    Coach: [
        { user: user1, type: 'TEXT_TYPE', msg: 'Hello Coach, How r u?', time: '11.30 AM' },
        { user: user2, type: 'TEXT_TYPE', msg: 'By the way Sam, How r u?', time: '12.30 PM' }
    ],
    Trainer: [
        { user: user1, type: 'TEXT_TYPE', msg: 'Hello Jimm, How r u?', time: '11.00 AM' },
        { user: user2, type: 'TEXT_TYPE', msg: 'What about the timming?', time: '2.30 PM' }
    ],
    Others: [
        { user: user1, type: 'TEXT_TYPE', msg: 'Hello Tony, How r u?', time: '12.00 AM' },
        { user: user2, type: 'TEXT_TYPE', msg: 'Lets have a game today', time: '4.30 PM' }
    ]
}

export default MessgeData