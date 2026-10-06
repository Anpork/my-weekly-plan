self.addEventListener("install", event => {
    console.log("My Weekly Planner service worker installed");
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    console.log("My Weekly Planner service worker activated");
    event.waitUntil(self.clients.claim());
});

self.addEventListener("notificationclick", event => {
    event.notification.close();

    event.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then(clientList => {
            for (const client of clientList) {
                if ("focus" in client) {
                    return client.focus();
                }
            }

            if (clients.openWindow) {
                return clients.openWindow(
                    "https://anpork.github.io/my-weekly-planner/"
                );
            }
        })
    );
});