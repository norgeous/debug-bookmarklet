(() => {
const prev = document.getElementById('debug-tool-panel')
if (prev) prev.remove();
document.body.insertAdjacentHTML(
'beforeend',
`
<div id="debug-tool-panel">

<style>
#debug-tool-panel { position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:1000; padding:30px; background:grey; color:white; box-shadow:0 10px 20px silver; font-size:10px; line-height:11px; }
#debug-tool-panel button { cursor:pointer; padding:10px; line-height:0; }
#debug-tool-panel #panel-close { position:absolute; right:0; top:0; width:30px; height:30px; }
#debug-tool-panel #options { text-align:center; }
#debug-tool-panel #options button { border: 1px solid silver; }
</style>

<button id="panel-close" onclick="document.getElementById('debug-tool-panel').remove()">X</button>

<div id="options">

<button onclick="
const purge = async () => {
  const res = await fetch(window.location, { method:'PURGE' });
  document.querySelector('#debug-tool-panel #results').innerHTML = res.status; 
  if (res.status === 200) window.location.reload();
};
purge();
">PURGE</button>

<button onclick="
const getHeaders = async () => {
  const res = await fetch(window.location.href);
  const h = {}; res.headers.forEach((v,k) => h[k] = v);
  const rows = Object.entries(h).map(([k,v]) => '<tr><td>' + k + '</td><td>' + v + '</td></tr>').join('');
  console.log({rows});
  document.querySelector('#debug-tool-panel #results').innerHTML = '<table>' + rows + '</table>';
};
getHeaders();
">HEADERS</button>

</div>

<div id="results" />

</div>
`,
);
})();
