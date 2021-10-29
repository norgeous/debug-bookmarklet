(() => {
document.body.insertAdjacentHTML(
'afterbegin',
`
<style>
#debug-tool-panel {position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:1000; padding:50px; background:grey; color:white;}
</style>

<pre id="debug-tool-panel">

<button onclick="
const purge = async () => {
  const res = await fetch(window.location, { method:'PURGE' });
  window.location.reload();
};
purge();
">PURGE</button>

<button onclick="
const getHeaders = async () => {
  const res = await fetch(window.location.href);
  const h = {};
  res.headers.forEach((v,k) => h[k] = v);
  document.querySelector('#debug-tool-panel').innerHTML = Object.entries(h).map(([k,v]) => k+': '+v).join('\\n');
};
getHeaders();
">HEADERS</button>

</pre>
`,
);
})();
