fetch(window.location.href).then((res) => {
  const h = {};
  res.headers.forEach((v,k) => h[k] = v);
  console.table(h);
});
