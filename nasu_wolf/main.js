/* --------------参考サイト
’https://sakusaku-techs.com/javascripthtml/canvas/’
’https://developer.mozilla.org/ja/docs/Web/API/HTMLCanvasElement/toBlob’---------- */

/* ------------Firebase(Cloud Storate)内で保存----------------- */
/* import { getStorage, ref, uploadBytes } from "firebase/storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const storage = getStorage(app);
const storageRef = ref(storage, user_name);
// some-childはパスをあらわす

// 'file' comes from the Blob or File API
uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
});




// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "",
authDomain: "wordwolf-d5ae5.firebaseapp.com",
projectId: "wordwolf-d5ae5",
storageBucket: "wordwolf-d5ae5.appspot.com",
messagingSenderId: "443302773500",
appId: "1:443302773500:web:ab59ec14c8ed7fbe908d79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); */

//
// JavaScriptのグローバル変数群
//
var CANVAS_SIZE;
var undoDataStack = [];
var redoDataStack = [];
var mouseDown = false;
const user_name = Math.random();
console.log(user_name);


$(function () {
    //
    // 画面読み込み時のロード処理
    //
    $(document).ready(function () {

        // キャンバスのサイズを設定
        $('#canvas').css('width', '500px');
        $('#canvas').css('height', '500px');

        // キャンバスの属性を設定
        canvas = document.getElementById('canvas');
        canvas.width = 500;
        canvas.height = 500;
        CANVAS_SIZE = canvas.clientWidth;

       /*  // n秒経てば保存する
        window.setTimeout(function () {
            console.log('hello')
            let canvas = document.getElementById('canvas')
            // Blobオブジェクトを作成
            canvas.toBlob(function (user_name) {

        //         console.log(user_name);

                // let newimg = document.createElement('img'),
                //     url = URL.createObjectURL(blob);

                // newimg.onload = function () {
                //     // 無効化されたため、もはやblobを読み取る必要はありません。
                //     URL.revokeObjectURL(url);
                // };

                // newimg.src = url;
                // console.log(newimg);


            }); 

            
            
            
            alert('時間切れ');
        }, 3000);
        // n秒経てば保存データを呼び出す
        window.setTimeout(function () {
            if (localStorage.getItem('canvasmemo')) {
                const canvasmemos = localStorage.getItem('canvasmemo')
                canvasmemos
            }
        }) */

        // 描画開始 → 描画中 → 描画終了
        canvas.addEventListener('mousedown', startDraw, false);
        canvas.addEventListener('mousemove', drawing, false);
        canvas.addEventListener('mouseup', endDraw, false);
    });

    //
    // クリア
    //
    $("#undo").click(function () {

        if (undoDataStack.length <= 0) {
            return;
        }

        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        // canvas内をクリアにする情報
        context.clearRect(0, 0, canvas.width, canvas.height);
        
    });

    /* //
    // redo
    //
    $("#redo").click(function () {

        if (redoDataStack.length <= 0) {
            return;
        }

        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        undoDataStack.unshift(context.getImageData(0, 0, canvas.width, canvas.height));

        var imageData = redoDataStack.shift();
        redoDataStack.context.putImageData(imageData, 0, 0);
    }); */
});

//
// 描画開始
//
function startDraw(event) {

    // 描画前処理をおこないマウス押下状態にする。
    beforeDraw();
    mouseDown = true;

    // クライアント領域からマウス開始位置座標を取得
    wbound = event.target.getBoundingClientRect();
    stX = event.clientX - wbound.left;
    stY = event.clientY - wbound.top;

    // キャンバス情報を取得
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
}

//
// 描画前処理
//
function beforeDraw() {

    // undo領域に描画情報を格納
    redoDataStack = [];
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    undoDataStack.unshift(context.getImageData(0, 0, canvas.width, canvas.height));
}

//
// 描画中処理
//
function drawing(event) {

    // マウスボタンが押されていれば描画中と判断
    if (mouseDown) {
        x = event.clientX - wbound.left;
        y = event.clientY - wbound.top;
        draw(x, y);
    }
}

//
// 描画終了
//
function endDraw(event) {

    // マウスボタンが押されていれば描画中と判断
    if (mouseDown) {
        context.globalCompositeOperation = 'source-over';
        context.setLineDash([]);
        mouseDown = false;
    }
}

//
// 描画
//
function draw(x, y) {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.lineWidth = 2;
    context.lineCap = "round";

    context.globalCompositeOperation = 'source-over';
    context.moveTo(stX, stY);
    context.lineTo(x, y);
    context.stroke();
    stX = x;
    stY = y;
}

const answer = '手を止めてください。これ以上書き込むのは違反です。さて、あなた方3名の中に潜んでいるウルフを見つけ出したください。2分後に投票をしてください。'
//const my_audio = new Audio("")
// できたボタン押したら次のイベント
$('#end').on('click', function () {
    // console.log('できた')
  //  $('#discussion').text(answer); 
    // n秒後に音ならす
  //  my_audio.currentTime = 0; // 再生位置を位置を先頭に戻す
  //  my_audio.play(); // サウンドを再生
    // n秒後に投票ボタン現れる
    window.setTimeout(function () {
        alert('話し合い終了！誰がウルフか投票お願いします。');
    }, 2000);
});

// $('#end').on('click', function () {
//     let music = function () {
//         $('#music').html(<audio autoplay src="audio/countdown.mp3"></audio>)
//     }
//     setTimeout(music, 2000);
// });
/* ----------配列の中身をシャッフル---------- */
//参考サイト'https://gray-code.com/javascript/shuffle-for-item-of-array/'
function arrayShuffle(array) {
    for (let i = (array.length - 1); 0 < i; i--) {
        // 0~(i+1)の範囲で値を取得
        let r = Math.floor(Math.random() * (i + 1));
        // 要素の並び替えを実行
        let tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
    return array;
}
/* let numbers = [1, 1, 2,];

// 配列を1回シャッフルする

for (let i = 0; i < 1; i++) {
    console.log(arrayShuffle(numbers));
} */
// 問題文作成
const quiz = [
    [1, 1, 2],
    [3, 3, 4],
    [5, 5, 6],
    [7, 7, 8],
    [9, 9, 10],
]
// 問題を1回だけランダムに表示
for (let i = 0; i < 1; i++) {
    console.log(arrayShuffle(quiz));
}

const select_quiz = quiz[0];
// 多次元配列の中身をシャッフル
for (let i = 0; i < 1; i++) {
    console.log(arrayShuffle(select_quiz));
    console.log(arrayShuffle(select_quiz[0],length));
}
