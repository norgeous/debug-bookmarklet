(async () => {
const prev = document.getElementById('debug-tool-panel')
if (prev) prev.remove();
document.body.insertAdjacentHTML(
'beforeend',
`
<div id="debug-tool-panel">

<style>
#debug-tool-panel { position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:1000; padding:30px; background:black; color:white; box-shadow:0 10px 20px #0007; border:1px solid silver; font-size:10px; line-height:14px; font-family:arial; }
#debug-tool-panel button { cursor:pointer; padding:10px; line-height:0; background:#ca55e77e; color:inherit; font-size:inherit; border:none; }
#debug-tool-panel button:hover { color:#0ff; }
#debug-tool-panel #panel-close { position:absolute; right:0; top:0; width:30px; height:30px; }
#debug-tool-panel #layout { display:flex; flex-direction:column; gap:10px; text-align:center; }
#debug-tool-panel #layout button { text-align:left; padding:15px; }
#debug-tool-panel #layout #results { text-align:left; }
#debug-tool-panel #layout td { padding:0 5px; white-space:nowrap; background:transparent; }
#debug-tool-panel #powered-by { font-size:15px; line-height:2em; }
</style>

<button id="panel-close" onclick="document.getElementById('debug-tool-panel').remove()">X</button>

<div id="layout">

<div>powered by: <span id="powered-by">detecting...</span></div>

<button onclick="
(async () => {
  const res = await fetch(window.location, { method:'PURGE' });
  document.querySelector('#debug-tool-panel #results').innerHTML = res.status+' '+res.statusText; 
  if (res.status === 200) window.location.reload();
})();
">☠️&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Request cache PURGE</button>

<button onclick="
(async () => {
  const res = await fetch(window.location.href);
  const h = {}; res.headers.forEach((v,k) => h[k] = v);
  const rows = Object.entries(h).map(([k,v]) => '<tr><td>' + k + '</td><td>' + v + '</td></tr>').join('');
  document.querySelector('#debug-tool-panel #results').innerHTML = '<table>' + rows + '</table>';
})();
">🕵️&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Show page headers</button>

<button onclick="
document.querySelector('body').classList.toggle('ad-skin-active');
">🔄&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Toggle .ad-skin-active</button>

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
  if (h.server) return h.server;
  return 'Unknown';
};
document.querySelector('#debug-tool-panel #powered-by').innerHTML = getPoweredBy();
})();
