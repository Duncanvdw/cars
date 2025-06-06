function loadJSON(url, callbackName) {
  const script = document.createElement('script');
  script.src = url + `&callback=${callbackName}`;
  document.body.appendChild(script);
}