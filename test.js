(() => {
  // const getHeadersXXX = fetch(window.location.href).then((res) => {
  //   const h = {};
  //   res.headers.forEach((v,k) => h[k] = v);
  //   return h;
  // });

  // const purge = async () => {
  //   await fetch(window.location, { method:'PURGE' });
  //   window.location.reload();
  // };

  document.body.insertAdjacentHTML('afterbegin', '<div id="two">two</div>');
})();
