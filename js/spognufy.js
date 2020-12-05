function togleitem(oid, event) {

    if (event == 'add') {
        // 未チェック(class="add")を非表示にして、チェック済(class="remove")を表示する
        $('li.add[no=' + oid + ']').hide();
        $('li.remove[no=' + oid + ']').show();
    } else if (event == 'remove') {
        // チェック済(class="remove")を非表示にして、未チェック(class="add")を表示する
        $('li.add[no=' + oid + ']').show();
        $('li.remove[no=' + oid + ']').hide();
    }
}


/* 【解説Bパート】 "ページロード時にローカルストレージの中をチェック" */
$(function () {
    $('ul .remove').hide();  // お気に入り中の表示は一時的に非表示に。

    // お気に入りリストに存在するか確認
    var key = 'ID';
    var getjson = localStorage.getItem(key);
    var oidlist = JSON.parse(getjson);
    if (oidlist != null) {
        oidlist.forEach(function (oid) {
            togleitem(oid, 'add');
        });
    }
});



/* 【解説Cパート】 "お気に入りに追加機能" */
function addfav(oid) {

    var key = 'ID';                       // キーの名前を指定

    // ローカルストレージから値を取得
    var getjson = localStorage.getItem(key);
    var oidlist = JSON.parse(getjson);

    if (oidlist == null) {
        // 初めて「お気に入りID」というキーがローカルストレージに登録される時の処理
        oidary = new Array(oid);
        var setjson = JSON.stringify(oidary);
        localStorage.setItem(key, setjson);

        togleitem(oid, 'add');

    } else {
        // 既に「お気に入りID」というキーが存在する時
        if (oidlist.indexOf(oid) == -1) {
            // 且つ、まだお気に入りIDに登録されていない時
            oidlist.push(oid);
            var setjson = JSON.stringify(oidlist);
            localStorage.setItem(key, setjson);

            togleitem(oid, 'add');
        }
    }
}

/* 【解説Dパート】 "お気に入りから削除機能" */
function removefav(oid) {

    var key = 'ID';                       // キーの名前を指定

    // ローカルストレージから値を取得
    var getjson = localStorage.getItem(key);
    var oidlist = JSON.parse(getjson);

    if (oidlist != null) {
        // 「お気に入りID」というキーが存在した時
        var checkitem = oidlist.indexOf(oid);     // 配列の何番目に該当のIDがあるかを見る
        if (checkitem != -1) {
            // 「お気に入りID」の中に該当のIDが見つかった時
            oidlist.splice(checkitem, 1);
            var setjson = JSON.stringify(oidlist);
            localStorage.setItem(key, setjson);

            togleitem(oid, 'remove');
        }
    }

}
// ログイン確認
var line = firebase.firestore().collection("line");
var music = firebase.firestore().collection("music");
var ranking = firebase.firestore().collection("music");
let namebox;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {

        console.log(user);
        // let i = `${user.displayName}`;
        // localStorage.setItem("local_name", i);
    }
    else {

    }
    namebox = `${user.displayName}`;
});
// チャット

$("#send").on("click", function () {
    const data = {
        name: namebox,
        text: $("#text").val(),
        time: firebase.firestore.FieldValue.serverTimestamp(),
    }
    line.add(data);
    $("#text").val("");

});
line.orderBy("time", "desc").onSnapshot(function (querySnapshot) {
    const dataArray = [];
    querySnapshot.docs.forEach(function (doc) {
        const data = {
            id: doc.id,
            data: doc.data(),
        }
        dataArray.push(data);
    });
    const tagArray = [];
    dataArray.forEach(function (data) {
        tagArray.push(namebox, `<p class="coment">${data.data.text}</p>`);
    })
    $('.chat-area').html(tagArray);

});
let count1 = 0;
let count2 = 0;
let count3 = 0;
let count4 = 0;
let count5 = 0;
let count6 = 0;

let count;
$("#start_btn1").on("click", function () {

    count1++;
    const data = {
        img: imgbox,
        name: namebox,
        count: count1,
        musictitle: "三文小説",
        time: firebase.firestore.FieldValue.serverTimestamp(),
    }
    music.add(data);
    firebase.firestore().collection("ranking").doc("三文小説").get().then(function (doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            count = doc.data() + 1;

        } else {
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
    firebase.firestore().collection("ranking").doc("三文小説").set({
        "count": count
    });
    // get().then(function (doc) {
    //     console.log(doc.data().count);
    // });
});
$("#start_btn2").on("click", function () {
    count2++;
    const data = {
        img: imgbox2,
        name: namebox,
        count: count2,
        musictitle: "傘",
        time: firebase.firestore.FieldValue.serverTimestamp(),
    }
    music.add(data);
});
$("#start_btn3").on("click", function () {
    count3++;
    const data = {
        img: imgbox3,
        name: namebox,
        count: count3,
        musictitle: "白日",
        time: firebase.firestore.FieldValue.serverTimestamp(),
    }
    music.add(data);
});
$("#start_btn4").on("click", function () {
    count4++;
    const data = {
        img: imgbox4,
        name: namebox,
        count: count4,
        musictitle: "TEENNAGER FOREVER",
        time: firebase.firestore.FieldValue.serverTimestamp(),
    }
    music.add(data);
});
$("#start_btn5").on("click", function () {
    count5++;
    const data = {
        img: imgbox5,
        name: namebox,
        count: count5,
        musictitle: "飛行艇",
        time: firebase.firestore.FieldValue.serverTimestamp(),
    }
    music.add(data);

});
$("#start_btn6").on("click", function () {
    count6++;
    const data = {
        img: imgbox6,
        name: namebox,
        count: count6,
        musictitle: "TokyoRendeZ-vouz",
        time: firebase.firestore.FieldValue.serverTimestamp(),
    }
    music.add(data);
});
console.log(count2);
// 最近再生されたコンテンツ
music.orderBy("time", "desc").limit(3)
    .get()
    .then(function (querySnapshot) {
        const dataArray = [];
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            const data = {
                id: doc.id,
                data: doc.data(),
            }
            dataArray.push(data);
        });
        const tagArray = [];
        const tagArray2 = [];
        const tagArray3 = [];
        const tagArray4 = [];

        dataArray.forEach(function (data) {
            tagArray.push(`<p>${data.data.name}</p>`);
            tagArray2.push(`<p>${data.data.musictitle}</p>`);
            tagArray3.push(`<p>${convertFromFirestoreTimestampToDatetime(data.data.time.seconds)
                }</p>`);
            tagArray4.push(`${data.data.img}`);

        })
        $(".name1").html(tagArray[0]);
        $(".name2").html(tagArray[1]);
        $(".name3").html(tagArray[2]);
        $(".music1").html(tagArray2[0]);
        $(".music2").html(tagArray2[1]);
        $(".music3").html(tagArray2[2]);
        $(".time1").html(tagArray3[0]);
        $(".time2").html(tagArray3[1]);
        $(".time3").html(tagArray3[2]);
        document.getElementById("img").src = tagArray4[0];
        document.getElementById("img2").src = tagArray4[1];
        document.getElementById("img3").src = tagArray4[2];
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

music.orderBy("count", "desc").limit(3)
    .get()
    .then(function (querySnapshot) {
        const dataArray = [];
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            const data = {
                id: doc.id,
                data: doc.data(),
            }
            dataArray.push(data);
        });
        const tagArray = [];
        const tagArray2 = [];
        const tagArray3 = [];
        console.log(dataArray);


        // dataArray.forEach(function (data) {
        //     tagArray.push(`<p>${data.data.name}</p>`);
        //     tagArray2.push(`<p>${data.data.musictitle}</p>`);
        //     tagArray3.push(`<p>${convertFromFirestoreTimestampToDatetime(data.data.time.seconds)
        //         }</p>`);
        //     tagArray4.push(`${data.data.img}`);

        // })
        // $(".name1").html(tagArray[0]);
        // $(".name2").html(tagArray[1]);
        // $(".name3").html(tagArray[2]);
        // $(".music1").html(tagArray2[0]);
        // $(".music2").html(tagArray2[1]);
        // $(".music3").html(tagArray2[2]);
        // $(".time1").html(tagArray3[0]);
        // $(".time2").html(tagArray3[1]);
        // $(".time3").html(tagArray3[2]);
        // document.getElementById("img").src = tagArray4[0];
        // document.getElementById("img2").src = tagArray4[1];
        // document.getElementById("img3").src = tagArray4[2];
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });
// ストレージのルートのリファレンスを取得
var storageRef = firebase.storage().ref();
//ストレージのルートにあるsample.pngのリファレンスを取得    
var imgSample = storageRef.child('sanmonsyousetu.jpg');
var imgSample2 = storageRef.child('kasa.jpg');
var imgSample3 = storageRef.child('hakujitu.jpg');
var imgSample4 = storageRef.child('teenagerforever.png');
var imgSample5 = storageRef.child('ceremony.jpg');
var imgSample6 = storageRef.child('tokyorendez-vous.jpg');
let imgbox;
let imgbox2;
let imgbox3;
let imgbox4;
let imgbox5;
let imgbox6;

imgSample.getDownloadURL().then(function (url) {
    // document.getElementById("img").src = url;
    imgbox = url;
}).catch(function (error) {
    // Handle any errors
    console.log(error);
});
imgSample2.getDownloadURL().then(function (url) {
    // document.getElementById("img").src = url;
    imgbox2 = url;
}).catch(function (error) {
    // Handle any errors
    console.log(error);
});
imgSample3.getDownloadURL().then(function (url) {
    // document.getElementById("img").src = url;
    imgbox3 = url;
}).catch(function (error) {
    // Handle any errors
    console.log(error);
});
imgSample4.getDownloadURL().then(function (url) {
    // document.getElementById("img").src = url;
    imgbox4 = url;
}).catch(function (error) {
    // Handle any errors
    console.log(error);
});
imgSample5.getDownloadURL().then(function (url) {
    // document.getElementById("img").src = url;
    imgbox5 = url;
}).catch(function (error) {
    // Handle any errors
    console.log(error);
});
imgSample6.getDownloadURL().then(function (url) {
    // document.getElementById("img").src = url;
    imgbox6 = url;
    console.log(imgbox6);
}).catch(function (error) {
    // Handle any errors
    console.log(error);
});

// 日時をいい感じの形式にする関数
function convertFromFirestoreTimestampToDatetime(timestamp) {
    const _d = timestamp ? new Date(timestamp * 1000) : new Date();
    const Y = _d.getFullYear();
    const m = (_d.getMonth() + 1).toString().padStart(2, '0');
    const d = _d.getDate().toString().padStart(2, '0');
    const H = _d.getHours().toString().padStart(2, '0');
    const i = _d.getMinutes().toString().padStart(2, '0');
    const s = _d.getSeconds().toString().padStart(2, '0');
    return `${Y}/${m}/${d} ${H}:${i}:${s}`;
}
