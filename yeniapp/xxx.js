const express = require('express');
const session = require('express-session');

const app = express();

// Oturum için bir anahtar (secret) belirleyin
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true,
}));

app.get('/', (req, res) => {
  // Oturum değişkenini kontrol et
  if (req.session.username) {
    res.send(`Merhaba, ${req.session.username}!`);
  } else {
    res.send('Oturum başlatılmamış.');
  }
});

app.get('/index.html', (req, res) => {
  // Kullanıcı adını oturum değişkenine kaydet
  req.session.username = 'kullanici123';
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  // Oturumu sonlandır
  req.session.destroy((err) => {
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('Sunucu 3000 portunda çalışıyor');
});
