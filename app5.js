const express = require("express");
const app = express();

const path = require('path');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==3 ) luck = '中吉';
  else if( num==4 ) luck = '小吉';
  else if( num==5 ) luck = '凶吉';
  else if( num==6 ) luck = '大凶';
  else if( num==2 ) luck = '吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  let judgement = ';'
  if (num === 1 ){
    if (hand === 'グー'){
      judgement = 'あいこ';
    }
    else if (hand === 'チョキ'){
      judgement = '負け';
    }
  else if (hand ==='パー'){
    judgement = '勝ち'
  }
}
else if (num === 2 ){
  if (hand === 'グー'){
    judgement = '勝ち';
  }
  else if (hand === 'チョキ'){
    judgement = 'あいこ';
  }
else if (hand ==='パー'){
  judgement = '負け'
}
}
else if (num === 3 ){
  if (hand === 'グー'){
    judgement = '負け';
  }
  else if (hand === 'チョキ'){
    judgement = '勝ち';
  }
else if (hand ==='パー'){
  judgement = 'あいこ'
}}
  // 今はダミーで人間の勝ちにしておく
  if(judgement = '勝ち'){
  win += 1;
  }
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/attimuitehoi", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win ) || 0;
  let total = Number( req.query.total ) || 0;
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 4 + 1 );
  let cpu = '';
  if( num==1 ) cpu = '北';
  else if( num==2 ) cpu = '東';
  else if( num==3 ) cpu = '南';
  else cpu = '西';
let judgement = ';'
if (num === 1 ){
  if (hand === '北'){
    judgement = 'お前の勝ち';
  }
  else if (hand === '東'){
    judgement = 'お前の負け';
  }
  else if (hand === '南'){
    judgement = 'お前の負け';
  }
else if (hand ==='西'){
  judgement = 'お前の負け'
}
}
else if (num === 2 ){
  if (hand === '北'){
    judgement = 'お前の負け';
  }
  else if (hand === '東'){
    judgement = 'お前の勝ち';
  }
  else if (hand === '南'){
    judgement = 'お前の負け';
  }
else if (hand ==='西'){
  judgement = 'お前の負け'
}
}
else if (num === 3 ){
  if (hand === '北'){
    judgement = 'お前の負け';
  }
  else if (hand === '東'){
    judgement = 'お前の負け';
  }
  else if (hand === '南'){
    judgement = 'お前の勝ち';
  }
else if (hand ==='西'){
  judgement = 'お前の負け';
}
}

else if (num === 4 ){
  if (hand === '北'){
    judgement = 'お前の負け';
  }
  else if (hand === '東'){
    judgement = 'お前の負け';
  }
  else if (hand === '南'){
    judgement = 'お前の負け';
  }
else if (hand ==='西'){
  judgement = 'お前の勝ち';
}
}
// 今はダミーで人間の勝ちにしておく
if(judgement == 'お前の勝ち'){
win += 1;
}
total += 1;
const display = {
  your: hand,
  cpu: cpu,
  judgement: judgement,
  win: win,
  total: total
}
res.render( 'attimuitehoi', display );
});


app.get('/guess-number', (req, res) => {
  res.render('guess-number', { result: null });
});
let randomNumber = Math.floor(Math.random() * 10) + 1;
app.post('/guess-number', (req, res) => {
  const userGuess = parseInt(req.body.number, 10);
  let result = '';
  if (userGuess === randomNumber) {
      result = '正解です！';
      randomNumber = Math.floor(Math.random() * 10) + 1; // 新しい数字を生成
  } else if (userGuess > randomNumber) {
      result = '大きすぎます！';
  } else {
      result = '小さすぎます！';
  }
  res.render('guess-number', { result });
});





app.listen(8080, () => console.log("Example app listening on port 8080!"));
