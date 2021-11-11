(async () => {
const prev = document.getElementById('debug-tool-panel')
if (prev) prev.remove();
document.body.insertAdjacentHTML(
'beforeend',
`
<div id="debug-tool-panel">

<style>
#debug-tool-panel { position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:1000; padding:30px; background:grey; color:white; box-shadow:0 10px 20px #0007; font-size:10px; line-height:14px; font-family:arial; }
#debug-tool-panel button { cursor:pointer; padding:10px; line-height:0; background:transparent; color:inherit; font-size:inherit; }
#debug-tool-panel button:hover { color:silver; }
#debug-tool-panel #panel-close { position:absolute; right:0; top:0; width:30px; height:30px; border:none; }
#debug-tool-panel #layout { display:flex; flex-direction:column; gap:10px; text-align:center; }
#debug-tool-panel #layout button { border: 1px solid silver; }
#debug-tool-panel #layout #results { text-align:left; }
#debug-tool-panel #layout td { padding:0 5px; }
#debug-tool-panel #powered-by { font-size:15px; line-height:2em; }
</style>

<button id="panel-close" onclick="document.getElementById('debug-tool-panel').remove()">X</button>

<div id="layout">

<div>powered by:</div>
<div id="powered-by">detecting...</div>

<button onclick="
const purge = async () => {
  const res = await fetch(window.location, { method:'PURGE' });
  document.querySelector('#debug-tool-panel #results').innerHTML = res.status; 
  if (res.status === 200) window.location.reload();
};
purge();
">☠️ PURGE</button>

<div id="results" />

</div>

</div>
`,
);
const res = await fetch(window.location.href);
const h = {}; res.headers.forEach((v,k) => h[k] = v);
const getPoweredBy = () => {
  if (h['x-powered-by']) return h['x-powered-by'];
  if (h.link?.includes('api.w.org')) return 'Wordpress';
  return 'Unknown';
};
document.querySelector('#debug-tool-panel #powered-by').innerHTML = getPoweredBy();
})();
