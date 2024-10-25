const openApps = {}; // Tracking open apps

// Handle click to launch app
document.querySelectorAll(".apps").forEach((icon) => {
  icon.addEventListener("click", () => {
    const appName = icon.dataset.app;
    if (!openApps[appName]) {
      launchApp(appName); // Create a new app window if it’s not already open
    } else {
      bringAppToFront(appName); // Bring existing app window to the front
    }
  });
});

function launchApp(appName) {
  // Create app window
  const appWindow = document.createElement("div");
  appWindow.classList.add("app-window");
  appWindow.innerHTML = `<div class="app-header">${appName} <button onclick="closeApp('${appName}')">X</button></div>
                         <div class="app-content">Content for ${appName}</div>`;
  document.getElementById("app-windows").appendChild(appWindow);

  // Store app in openApps object with initial state
  openApps[appName] = {
    element: appWindow,
    minimized: false,
    zIndex: Object.keys(openApps).length + 1,
  };
  bringAppToFront(appName);
}

function bringAppToFront(appName) {
  // Bring the selected app to the top by adjusting zIndex
  const maxZIndex = Math.max(
    ...Object.values(openApps).map((app) => app.zIndex)
  );
  openApps[appName].element.style.zIndex = maxZIndex + 1;
}

function closeApp(appName) {
  // Close and remove app window
  openApps[appName].element.remove();
  delete openApps[appName];
}
