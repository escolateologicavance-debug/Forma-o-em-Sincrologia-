const cacheName = 'sincrologia-v1';

// Lista de ativos para cache imediato (Offline First)
const assets = [
  './',
  './index.html',
  './1.html',
  './2.html',
  './3.html',
  './4.html',
  './5.html',
  './6.html',
  './7.html',
  './8.html',
  './9.html',
  './10.html',
  './11.html',
  './logo-192.png',
  './logo-512.png',
  // Mapeamento das 20 imagens das matérias
  './1-img.png', './2-img.png', './3-img.png', './4-img.png', './5-img.png',
  './6-img.png', './7-img.png', './8-img.png', './9-img.png', './10-img.png',
  './11-img.png', './12-img.png', './13-img.png', './14-img.png', './15-img.png',
  './16-img.png', './17-img.png', './18-img.png', './19-img.png', './20-img.png'
];

// Instalação: Salva todos os arquivos no cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Sincrologia: Cache de ativos configurado com sucesso.');
      return cache.addAll(assets);
    })
  );
});

// Ativação: Limpa caches antigos se houver mudança de versão
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
});

// Interceptação: Serve os arquivos do cache quando offline
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});