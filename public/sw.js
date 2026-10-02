self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('push', (event) => {
  const payload = event.data ? event.data.json() : {
    title: 'Notify PWA',
    body: '新しい通知があります。',
  };

  const options = {
    body: payload.body || '新しい通知があります。',
    icon: '/icon.png',
    badge: '/icon.png',
    tag: 'notify-pwa',
    data: payload.data || {},
  };

  event.waitUntil(
    self.registration.showNotification(payload.title || 'Notify PWA', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
