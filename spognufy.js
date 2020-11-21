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

})

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