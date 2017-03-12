class ScriptRemote {

    constructor() {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyDZd2iv7nI6clDZKhcZWZIlCtrd5ztVJiY",
            authDomain: "remote-pvra.firebaseapp.com",
            databaseURL: "https://remote-pvra.firebaseio.com",
            storageBucket: "remote-pvra.appspot.com",
            messagingSenderId: "952233990276"
        };

        firebase.initializeApp(config);
        var starCountRef = firebase.database().ref('/isActive');
        starCountRef.on('value', function (snapshot) {
            const sky = document.querySelector('a-sky')
            const assets = document.querySelectorAll('.background')
            next(sky, assets)
        });
    }
}

new ScriptRemote();