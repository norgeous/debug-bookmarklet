(() => {

const getHeaders = async () => {
  const res = await fetch(window.location.href);
  const h = {};
  res.headers.forEach((v,k) => h[k] = v);
  return h;
};

const purge = async () => {
  await fetch(window.location, { method:'PURGE' });
  window.location.reload();
};

document.body.insertAdjacentHTML(
'afterbegin',
`
<style>
body {background:red;}
#debug-tool-panel {position:fixed; top:50%; left:50%}
</style>

<div id="debug-tool-panel">
PANEL
</div>
`,
);

})();
