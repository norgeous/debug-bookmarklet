(() => {
const prev = document.getElementById('debug-tool-panel')
if (prev) prev.remove();
document.body.insertAdjacentHTML(
'beforeend',
`
<div id="debug-tool-panel">

<style>
#debug-tool-panel {position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:1000; padding:50px; background:grey; color:white;}
</style>


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
  document.querySelector('#debug-tool-panel #results').innerHTML = Object.entries(h).map(([k,v]) => k+': '+v).join('\\n');
};
getHeaders();
">HEADERS</button>

<button onclick="document.getElementById('debug-tool-panel').remove()">X</button>

<pre id="results" />

</div>
`,
);
})();
