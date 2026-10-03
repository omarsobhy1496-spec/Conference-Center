/* script.js — المنطق بس. التعديل بيتم في data.js */
var current = BUILDINGS[0].id, filter = "all", lastBtn = null;

function el(tag, cls, html) {
  var e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
}
function label(s) { return s === "free" ? "Available · متاح" : "Occupied · مشغول"; }
function building(id) { return BUILDINGS.filter(function (b) { return b.id === id; })[0]; }
function uniqueIds(b) {
  var seen = {}, out = [];
  b.floors.forEach(function (f) { f.rooms.forEach(function (r) { if (!seen[r]) { seen[r] = 1; out.push(r); } }); });
  return out;
}

function renderTabs() {
  var host = document.getElementById("tabs");
  host.innerHTML = "";
  BUILDINGS.forEach(function (b) {
    var ids = uniqueIds(b);
    var free = ids.filter(function (k) { return STATUS[k] === "free"; }).length;
    var t = el("button", "tab",
      '<span class="tab-en">' + b.en + '</span><span class="tab-ar" dir="rtl" lang="ar">' + b.ar + '</span>' +
      '<span class="tab-count">' + free + " of " + ids.length + " available</span>");
    t.type = "button";
    t.setAttribute("role", "tab");
    t.setAttribute("aria-selected", b.id === current);
    t.addEventListener("click", function () { current = b.id; render(); });
    host.appendChild(t);
  });
}

function renderBuilding() {
  var b = building(current), host = document.getElementById("building");
  host.innerHTML = "";
  var ids = uniqueIds(b);
  var free = ids.filter(function (k) { return STATUS[k] === "free"; }).length;
  document.getElementById("nFree").textContent = free;
  document.getElementById("nBusy").textContent = ids.length - free;

  b.floors.forEach(function (fl) {
    var nf = fl.rooms.filter(function (r) { return STATUS[r] === "free"; }).length;
    var f = el("section", "floor");
    f.appendChild(el("div", "floor-head",
      '<span class="code">' + fl.code + '</span><span class="fname">' + fl.en + '</span>' +
      '<span class="fname-ar" dir="rtl" lang="ar">' + fl.ar + '</span>' +
      '<span class="fcount">' + nf + " of " + fl.rooms.length + " available</span>"));
    var grid = el("div", "rooms"), shown = 0;
    fl.rooms.forEach(function (id) {
      var sp = SPACES[id], s = STATUS[id];
      if (filter !== "all" && s !== filter) return;
      shown++;
      var btn = el("button", "room",
        '<span class="rname">' + sp.en + '</span><span class="rname-ar" dir="rtl" lang="ar">' + sp.ar + '</span>' +
        '<span class="rmeta"><span><span class="dot"></span>' + label(s) + '</span>' +
        (sp.shared ? '<span class="shared">SHARED</span>' : "") + '</span>');
      btn.type = "button";
      btn.dataset.s = s;
      btn.setAttribute("aria-haspopup", "dialog");
      btn.setAttribute("aria-label", sp.en + " " + sp.ar + ", " + (s === "free" ? "available" : "occupied") + ". Show details.");
      btn.addEventListener("click", function () { openInfo(id, b, fl, btn); });
      grid.appendChild(btn);
    });
    if (!shown) grid.appendChild(el("div", "empty", filter === "free" ? "No available spaces on this floor." : "No occupied spaces on this floor."));
    f.appendChild(grid);
    host.appendChild(f);
  });
}

function render() { renderTabs(); renderBuilding(); }

function openInfo(id, b, fl, btn) {
  lastBtn = btn;
  var sp = SPACES[id], s = STATUS[id];
  document.getElementById("infoWhere").textContent = b.en + " · " + (sp.shared ? "Multiple levels" : fl.en);
  document.getElementById("infoName").textContent = sp.en;
  document.getElementById("infoAr").textContent = sp.ar;
  var st = document.getElementById("infoStatus");
  st.dataset.s = s;
  st.textContent = label(s);
  var body = document.getElementById("infoBody");
  body.innerHTML = "";
  var lines = sp.info && sp.info.length ? sp.info : ["لا توجد معلومات مضافة لهذا المكان بعد."];
  lines.forEach(function (t) { var p = document.createElement("p"); p.textContent = t; body.appendChild(p); });
  document.getElementById("info").hidden = false;
  document.getElementById("infoClose").focus();
}
function closeInfo() {
  document.getElementById("info").hidden = true;
  if (lastBtn && document.body.contains(lastBtn)) lastBtn.focus();
}

document.querySelectorAll(".chip").forEach(function (c) {
  c.addEventListener("click", function () {
    filter = c.dataset.f;
    document.querySelectorAll(".chip").forEach(function (x) { x.setAttribute("aria-pressed", x === c); });
    renderBuilding();
  });
});
document.getElementById("infoClose").addEventListener("click", closeInfo);
document.getElementById("info").addEventListener("click", function (e) { if (e.target === this) closeInfo(); });
document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !document.getElementById("info").hidden) closeInfo(); });
render();
