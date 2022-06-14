(function () {

  const styleHref = './custom_configuration/plugins/raise-hand-notification/assets/css/style.css';
  let toastContainer;

  function load() {

    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = styleHref;
    document.head.appendChild(style);

		window.PEX.actions$.ofType('[Conference] Buzz Changed').subscribe((action) => {
      const buzzTime = action.payload.buzzTime;
      const username = action.payload.name;
      if (buzzTime) {
        notifyRiseHand(username);
      }
    });

  }
  
  function unload() {
    document.querySelector('link[href="' + styleHref + '"]').remove();
    console.log('Raise Hand Notification Plugin', 'Unloaded');
  }

  function notifyRiseHand(username) {

    if (!toastContainer) {
      const stageContainer = document.getElementById('conference-stage-container');
      const toastContainer = document.createElement('div');
      toastContainer.className = 'toast-container';
      stageContainer.appendChild(toastContainer);
    }

    let toast = document.getElementById('toast');
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `${username} has raised a hand`;
    document.querySelector('.toast-container').appendChild(toast);
    setTimeout( () => toast.remove(), 5000);
  }

  PEX.pluginAPI.registerPlugin({
    id: 'raise-hand-notification-plugin-1.0',
    load: load,
    unload: unload
  });

})();