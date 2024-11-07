function selectRandomItems(items, count) {

    let shuffled = items.slice(0);
    let i = items.length;
    let min = i - count;
    let temp;
    let index;



    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }

    return shuffled.slice(min);
}

//
$(document).ready(function () {
    createBingoBoard();
    $('#bingoCenter').addClass('tapped');
    $('.cell').click(function () {
        $(this).toggleClass('tapped'); // セルのクリックごとにタップをトグル
        $(this).css('color', 'red'); // タップされたセルの文字色を赤に変更
        checkBingo(); // ビンゴ判定

    });
});



// 詳細リンクを追加する関数

function addDetailLink(url, text, cell) {
    let detailLink = $('<a>').attr('href', url).text(text);
    let linkContainer = $('<div>').append(detailLink); // リンクを含む<div>要素を作成
    $(cell).parent().after(linkContainer); // セルの後ろにリンクを含む<div>要素を追加
}



//ビンゴカードに表示させる文字列設定
let strings = [
    "①高輪 パティスリーRyoco",//1
    "②溜池山王 ツッカベッカライカヤヌマ",//2
    "③百貨店 クラブハリエ",//3
    "④催事【冬季限定】SNOW",//4
    "⑤用賀 Ryoura",//5
    "⑥赤坂見附 西洋菓子しろたえ",//6
    "⑦ニューオータニ パティスリー SATSUKI",//7
    "⑧赤坂 リベルターブル",//8
    "⑨目白 エーグルドゥース",//9
    "⑩人形町 シュークリー",//10
    "⑪尾山台 オーボンヴュータン",//11
    "⑫代官山 パティスリー イル・プルー・シュル・ラ・セーヌ",//12
    "⑬淡路町 近江屋洋菓子店",//13
    "⑭水天宮前 オクシタニアル",//14
    "⑮代々木上原 ビヤンネートル",//15
    "⑯神楽坂 オー・メルヴェイユ・ドゥ・フレッド",//16
    "⑰浅草 ルスルス",//17
    "⑱二重橋前 エシレ",//18
    "⑲銀座 シヅカ洋菓子店",//19
    "⑳半蔵門 山本道子の店",//20
    "㉑東京駅 アトリエうかい",//21⓴
    "㉒学芸大学 ポポット",//22
    "㉓丸の内 VIRON",//23
    "㉔茅場町 patisserie ease",//24
    "㉕蔵前 デイリーズマフィン",//25
    "㉖日本橋三越 カフェタナカ",//26
    "㉗蔵前 chigaya",//27
    "㉘門前仲町（屋台） 中澤製菓",//28
    "㉙上野 ジェラテリア マンマミア",//29
    "㉚神楽坂 Patisserie K-Vincent",//30
    "㉛八丁堀 翠江堂【和菓子】",//31
    "㉜日本橋 長門【和菓子】",//32
    "㉝東向島 志”満ん草餅【和菓子】",//33
    "㉞銀座 かずや【和菓子】",//34
    "㉟水天宮前 初音【和菓子】",//35
    "㊱百貨店＆東京駅 富士見堂【和菓子】",//36
    "㊲八重洲 ツバメヤ【和菓子】",//37
    "㊳帝国ホテル いったつみとら堂【和菓子】",//38
    "㊴神保町 ささま【和菓子】",//39
    "㊵銀座 あけぼの【和菓子】",//40
    "㊶日本橋 うさぎや【和菓子】",//41
    "㊷柴又 吉野家【和菓子】",//42
    "㊸等々力 PATISSERIE ASAKO IWAYANAGI",//43
    "㊹清澄白河 Maison heureux",//44
    "㊺東京駅 果実園リーベル",//45
    "㊻八丁堀 氷の音 はなれ【かき氷】",//46
    "㊼銀座 Parlor Vinefru【かき氷】",//47
    "㊽渋谷 PAP.COFFEE【かき氷】",//48
    "㊾南砂町 GOFUKU【かき氷】",//49
    "㊿湯島 サカノウエカフェ【かき氷】",//50
];



//3*3のカード設定
function createBingoBoard() {
    let bingoBoard = $('#bingoBoard');

    // 50種類の文字列からランダムに9つ選択
    let shuffledStrings = selectRandomItems(strings, 9);

    let cellIndex = 0;
    for (let i = 0; i < 3; i++) {
        let row = $('<div class="row"></div>').appendTo(bingoBoard);
        for (let j = 0; j < 3; j++) {
            let cell = $('<div class="cell"></div>').text(shuffledStrings[cellIndex]).appendTo(row); // ランダムな文字列をセルに表示
            cellIndex++;
        }
    }
}


//ビンゴをチェックするためのコード
function checkBingo() {
    let cells = $('.cell').not('#bingoCenter');
    let tappedCells = cells.filter('.tapped');

    let verticalBingo = [0, 1, 2].every(i => $(cells[i]).hasClass('tapped')) ||
        [3, 4, 5].every(i => $(cells[i]).hasClass('tapped')) ||
        [6, 7, 8].every(i => $(cells[i]).hasClass('tapped'));

    let horizontalBingo = [0, 3, 6].every(i => $(cells[i]).hasClass('tapped')) ||
        [1, 4, 7].every(i => $(cells[i]).hasClass('tapped')) ||
        [2, 5, 8].every(i => $(cells[i]).hasClass('tapped'));

    let diagonalBingo = [0, 4, 8].every(i => $(cells[i]).hasClass('tapped')) ||
        [2, 4, 6].every(i => $(cells[i]).hasClass('tapped'));

    if (verticalBingo || horizontalBingo || diagonalBingo) {
        alert('BINGO');
        tappedCells.css('background-color', 'yellow');

    }
}


