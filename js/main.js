"use strict";

/*===========ワールドカップのグループリーグのスコアを出力するプログラム===========*/

// 各データの格納場所
let TEAM = []; // チーム名
const _SCORE = []; // 試合情報


// 出力データ
let output = [
    {
        team: TEAM[0], // チーム名
        gameCount: 0, // 試合数
        winCount: 0, // 勝ち数
        drawCount: 0, // 引き分け数
        loseCount: 0, // 負け数
        goalPoints: 0, // 総得点
        concedePoints: 0, // 失点
        goalDifference: 0, // 得失点差
        winningPoints: 0 // 勝ち点
    },
    {
        team: TEAM[1],
        gameCount: 0,
        winCount: 0,
        drawCount: 0,
        loseCount: 0,
        goalPoints: 0,
        concedePoints: 0,
        goalDifference: 0,
        winningPoints: 0
    },
    {
        team: TEAM[2],
        gameCount: 0,
        winCount: 0,
        drawCount: 0,
        loseCount: 0,
        goalPoints: 0,
        concedePoints: 0,
        goalDifference: 0,
        winningPoints: 0
    },
    {
        team: TEAM[3],
        gameCount: 0,
        winCount: 0,
        drawCount: 0,
        loseCount: 0,
        goalPoints: 0,
        concedePoints: 0,
        goalDifference: 0,
        winningPoints: 0
    }
];


/*=================入力データの加工プログラム=================*/

// 入力データを配列にする（入力の変更に対応）

// チーム入力を配列にする
const TEAMS = [];
const inputTeam = document.querySelectorAll('input[name="team"]');
for (let i = 0; i < inputTeam.length; i++) {
    inputTeam[i].addEventListener('change', function () {
        TEAMS[i] = inputTeam[i].value;
        output[i].team = inputTeam[i].value;
    });
}
TEAM = TEAMS;


// 成績入力を配列にする
const inputScore = document.querySelectorAll('input[name="score"]');
for (let i = 0; i < inputScore.length; i++) {
    inputScore[i].addEventListener('change', function () {
        _SCORE[i] = inputScore[i].value;
        // 入力を数値に変換する
        if (!isNaN(_SCORE[i])) {
            _SCORE[i] = inputScore[i].value;
            _SCORE[i] = Number(_SCORE[i]);
        } else {
            _SCORE[i] = inputScore[i].value;
        }
    });
}



// 成績の配列データを1行ずつ二次元配列にする（submitされた時の処理）
let arr = _SCORE;
let num = 4;
let row = [];
let rowArr = [[]];

calc.onclick = () => {
    to2Arr(arr, num);
}
const to2Arr = (arr, num) => {
    for (let x = 0; x < TEAM.length; x++) {
        output[x].gameCount = 0;
        output[x].winCount = 0;
        output[x].drawCount = 0;
        output[x].loseCount = 0;
        output[x].goalPoints = 0;
        output[x].concedePoints = 0;
        output[x].goalDifference = 0;
        output[x].winningPoints = 0;
    }
    arr = _SCORE;
    row = [];
    rowArr = [];
    let tmpArr;
    for (let i = 0; i < arr.length; i += num) {
        tmpArr = arr.slice(i, i + num);
        row.push(tmpArr);
    }
    rowArr.push(row[0]);
    rowArr.push(row[1]);
    rowArr.push(row[2]);
    rowArr.push(row[3]);
    rowArr.push(row[4]);
    rowArr.push(row[5]);


    // 成績を記録する
    for (let i = 0; i < rowArr.length; i++) {
        // 各データを読み込む
        for (let a = 0; a < 2; a++) {
            // 出力データに書き込むためindexを取得する
            let index;
            index = TEAM.indexOf(rowArr[i][a]);
            // 試合数をカウントする
            output[index].gameCount += 1;
            // 得点を記録する
            output[index].goalPoints += rowArr[i][a + 2];
            // 失点を記録する
            if (a == 0) {
                output[index].concedePoints += rowArr[i][a + 3];
            } else {
                output[index].concedePoints += rowArr[i][a + 1];
            }
            // 得失点差を記録する
            output[index].goalDifference = output[index].goalPoints - output[index].concedePoints;
        }

        // どちらの得点が多いか判断する
        let winner; // 勝ちチーム名
        let loser; // 負けチーム名

        // チームAの得点が高い場合
        if (rowArr[i][2] > rowArr[i][3]) {
            winner = rowArr[i][0];
            let index = TEAM.indexOf(winner);
            output[index].winCount += 1;
            output[index].winningPoints += 3;
            loser = rowArr[i][1];
            index = TEAM.indexOf(loser);
            output[index].loseCount += 1;
        }
        // チームBの得点が高い場合
        else if (rowArr[i][2] < rowArr[i][3]) {
            winner = rowArr[i][1];
            let index = TEAM.indexOf(winner);
            output[index].winCount += 1;
            output[index].winningPoints += 3;
            loser = rowArr[i][0];
            index = TEAM.indexOf(loser);
            output[index].loseCount += 1;
        }
        // 同点の場合
        else if (rowArr[i][2] == rowArr[i][3]) {
            let index = TEAM.indexOf(rowArr[i][0]);
            output[index].drawCount += 1;
            output[index].winningPoints += 1;
            index = TEAM.indexOf(rowArr[i][1]);
            output[index].drawCount += 1;
            output[index].winningPoints += 1;
        }
    }

    // 結果を出力する
    // HTMLの作成
    let html;
    html =
        `<tr>
    <th>チーム</th>
    <th>試</th>
    <th>得</th>
    <th>失</th>
    <th>差</th>
    <th>勝</th>
    <th>分</th>
    <th>負</th>
    <th>勝ち点</th>
    </tr>`;

    for (let i = 0; i < output.length; i++) {
        html +=
            "<tr>" +
            "<td>" + output[i].team + "</td>" +
            "<td>" + output[i].gameCount + "</td>" +
            "<td>" + output[i].goalPoints + "</td>" +
            "<td>" + output[i].concedePoints + "</td>" +
            "<td>" + output[i].goalDifference + "</td>" +
            "<td>" + output[i].winCount + "</td>" +
            "<td>" + output[i].drawCount + "</td>" +
            "<td>" + output[i].loseCount + "</td>" +
            "<td>" + output[i].winningPoints + "</td>" +
            "</tr>";
    }

    let _result = document.getElementById("result");
    _result.innerHTML = html;
}