import { useState, useEffect } from "react";

const T = {
  primaryDefault: "#48AA66", primaryDark: "#3E8A56", primaryBg: "#F6FAF8",
  stateError: "#FF0000", white: "#FFFFFF", grey50: "#F9FAFB", grey100: "#F3F4F6",
  grey200: "#E5E7EB", grey300: "#D1D5DB", grey400: "#9CA3AF", grey500: "#6B7280",
  grey600: "#4B5563", grey800: "#1F2937",
};

const initCats = ["전체","내비게이션","액션","상태","미디어","커머스"];

const initIcons = [
  { id:1,  name:"home",    category:"내비게이션", tags:["홈","메인"],       usedIn:["헤더","사이드바"],   svg:"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" },
  { id:2,  name:"search",  category:"내비게이션", tags:["검색"],            usedIn:["헤더","검색바"],     svg:"M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" },
  { id:3,  name:"menu",    category:"내비게이션", tags:["햄버거","메뉴"],   usedIn:["모바일헤더"],        svg:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" },
  { id:4,  name:"close",   category:"액션",       tags:["닫기","삭제"],     usedIn:["모달","토스트"],     svg:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" },
  { id:5,  name:"add",     category:"액션",       tags:["추가","생성"],     usedIn:["버튼"],              svg:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" },
  { id:6,  name:"edit",    category:"액션",       tags:["수정","편집"],     usedIn:["테이블","카드"],     svg:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" },
  { id:7,  name:"delete",  category:"액션",       tags:["삭제","제거"],     usedIn:["테이블"],            svg:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" },
  { id:8,  name:"check",   category:"상태",       tags:["완료","성공"],     usedIn:["폼","리스트"],       svg:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" },
  { id:9,  name:"warning", category:"상태",       tags:["경고","주의"],     usedIn:["알림","토스트"],     svg:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" },
  { id:10, name:"info",    category:"상태",       tags:["정보","안내"],     usedIn:["툴팁","알림"],       svg:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" },
  { id:11, name:"play",    category:"미디어",     tags:["재생","시작"],     usedIn:["비디오플레이어"],    svg:"M8 5v14l11-7z" },
  { id:12, name:"pause",   category:"미디어",     tags:["일시정지"],        usedIn:["비디오플레이어"],    svg:"M6 19h4V5H6v14zm8-14v14h4V5h-4z" },
  { id:13, name:"volume",  category:"미디어",     tags:["음량","소리"],     usedIn:["비디오플레이어"],    svg:"M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" },
  { id:14, name:"cart",    category:"커머스",     tags:["장바구니","구매"], usedIn:["헤더","상품페이지"], svg:"M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.9 18 9 18h12v-2H9.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 23.45 5H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" },
  { id:15, name:"heart",   category:"커머스",     tags:["찜","즐겨찾기"],   usedIn:["상품카드"],          svg:"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" },
];

const P = {
  search: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  grid:   "M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z",
  list:   "M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z",
  plus:   "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
  close:  "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
  copy:   "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",
  trash:  "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
  edit:   "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
  drag:   "M9 3h2v2H9zm0 4h2v2H9zm0 4h2v2H9zm0 4h2v2H9zm4-12h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z",
  check:  "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
  prev:   "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z",
  next:   "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
  first:  "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z",
  last:   "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z",
};

function Ico(props) {
  var d = props.d;
  var size = props.size || 18;
  var color = props.color || "currentColor";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink:0, display:"block" }}>
      <path d={d} />
    </svg>
  );
}

function useHov() {
  var state = useState(false);
  var h = state[0];
  var setH = state[1];
  return [h, {
    onMouseEnter: function() { setH(true); },
    onMouseLeave: function() { setH(false); }
  }];
}

function BtnPrimary(props) {
  var state = useHov();
  var h = state[0];
  var hov = state[1];
  var sm = props.size === "sm";
  return (
    <button onClick={props.onClick} {...hov} style={{
      display:"flex", alignItems:"center", gap:"4px",
      padding: sm ? "0 10px" : "0 15px", height: sm ? "30px" : "36px",
      border:"none", borderRadius:"4px", cursor:"pointer",
      background: h ? T.primaryDark : T.primaryDefault,
      color: T.white, fontSize:"13px",
    }}>{props.children}</button>
  );
}

function BtnOutline(props) {
  var state = useHov();
  var h = state[0];
  var hov = state[1];
  return (
    <button onClick={props.onClick} {...hov} style={{
      display:"flex", alignItems:"center", gap:"4px",
      padding:"0 15px", height:"36px",
      border:"1px solid " + T.grey300, borderRadius:"4px", cursor:"pointer",
      background: h ? T.grey100 : T.white, color: T.grey600, fontSize:"13px",
    }}>{props.children}</button>
  );
}

function BtnDanger(props) {
  var state = useHov();
  var h = state[0];
  var hov = state[1];
  return (
    <button onClick={props.onClick} {...hov} style={{
      display:"flex", alignItems:"center", gap:"4px",
      padding:"0 15px", height:"36px", border:"none", borderRadius:"4px", cursor:"pointer",
      background: h ? "#DB0000" : T.stateError, color: T.white, fontSize:"13px",
    }}>{props.children}</button>
  );
}

function BtnDelete(props) {
  var state = useHov();
  var h = state[0];
  var hov = state[1];
  return (
    <button onClick={props.onClick} {...hov} style={{ background:"none", border:"none", cursor:"pointer", padding:"4px", display:"flex" }}>
      <Ico d={P.trash} size={18} color={h ? T.stateError : T.grey500} />
    </button>
  );
}

function TblBtn(props) {
  var state = useHov();
  var h = state[0];
  var hov = state[1];
  var danger = props.variant === "danger";
  var hc = danger ? T.stateError : T.primaryDefault;
  var hb = danger ? T.stateError : T.primaryDark;
  return (
    <button title={props.title} onClick={props.onClick} {...hov} style={{
      width:"28px", height:"28px", display:"flex", alignItems:"center", justifyContent:"center",
      border:"1px solid " + (h ? hb : T.grey300),
      borderRadius:"4px", background: h ? T.grey100 : T.white, cursor:"pointer",
    }}>
      <Ico d={props.d} size={16} color={h ? hc : T.grey400} />
    </button>
  );
}

function PageBtn(props) {
  var dis = props.disabled;
  return (
    <button onClick={props.onClick} disabled={dis} style={{
      width:"32px", height:"32px", display:"flex", alignItems:"center", justifyContent:"center",
      border:"1px solid " + (props.active ? T.primaryDefault : T.grey200),
      borderRadius:"4px",
      background: props.active ? T.primaryDefault : dis ? T.grey50 : T.white,
      color: props.active ? T.white : dis ? T.grey300 : T.grey600,
      cursor: dis ? "default" : "pointer", fontSize:"13px", fontWeight: props.active ? 500 : 400,
    }}>{props.children}</button>
  );
}

const PAGE_SIZE = 20;

export default function App() {
  var s0 = useState(initIcons);   var icons = s0[0];    var setIcons = s0[1];
  var s1 = useState(initCats);    var cats = s1[0];     var setCats = s1[1];
  var s2 = useState("전체");      var selCat = s2[0];   var setSelCat = s2[1];
  var s3 = useState("");          var search = s3[0];   var setSearch = s3[1];
  var s4 = useState("grid");      var view = s4[0];     var setView = s4[1];
  var s5 = useState(null);        var selIcon = s5[0];  var setSelIcon = s5[1];
  var s6 = useState(null);        var modal = s6[0];    var setModal = s6[1];
  var s7 = useState(null);        var dragIdx = s7[0];  var setDragIdx = s7[1];
  var s8 = useState(null);        var dragOver = s8[0]; var setDragOver = s8[1];
  var s9 = useState(null);        var editIdx = s9[0];  var setEditIdx = s9[1];
  var s10 = useState("");         var editVal = s10[0]; var setEditVal = s10[1];
  var s11 = useState("");         var newCat = s11[0];  var setNewCat = s11[1];
  var s12 = useState(false);      var copied = s12[0];  var setCopied = s12[1];
  var s13 = useState({ id:"", name:"", category:"", tags:"", usedIn:"", svg:"" });
  var form = s13[0]; var setForm = s13[1];
  var s14 = useState([]);         var mdiResults = s14[0]; var setMdiResults = s14[1];
  var s15 = useState(false);      var mdiLoading = s15[0]; var setMdiLoading = s15[1];
  var s16 = useState("");         var mdiSearch = s16[0];  var setMdiSearch = s16[1];
  var s17 = useState(1);          var page = s17[0];    var setPage = s17[1];

  useEffect(function() {
    var style = document.createElement("style");
    style.textContent = "input:focus,select:focus,textarea:focus{outline:none!important;box-shadow:none!important;border-color:#48AA66!important;}";
    document.head.appendChild(style);
    return function() { document.head.removeChild(style); };
  }, []);

  var filtered = icons.filter(function(ic) {
    var okCat = selCat === "전체" || ic.category === selCat;
    var q = search.toLowerCase();
    return okCat && (!q || ic.name.includes(q) || ic.tags.some(function(t) { return t.includes(q); }));
  });

  var totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  var safePage = Math.min(page, totalPages);
  var paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function goPage(p) { setPage(Math.max(1, Math.min(p, totalPages))); }

  function catCount(c) {
    return c === "전체" ? icons.length : icons.filter(function(i) { return i.category === c; }).length;
  }

  function doUpload() {
    if (!form.name || !form.category || !form.svg) return;
    setIcons(function(p) {
      return p.concat([{
        id: form.id ? Number(form.id) : Date.now(),
        name: form.name, category: form.category,
        tags: form.tags.split(",").map(function(t) { return t.trim(); }).filter(Boolean),
        usedIn: form.usedIn.split(",").map(function(t) { return t.trim(); }).filter(Boolean),
        svg: form.svg,
      }]);
    });
    setForm({ id:"", name:"", category:"", tags:"", usedIn:"", svg:"" });
    setMdiResults([]); setMdiSearch(""); setModal(null);
  }

  function saveEditCat(idx) {
    var old = cats[idx]; var nw = editVal.trim();
    if (!nw || nw === old || cats.includes(nw)) { setEditIdx(null); return; }
    setCats(function(p) { return p.map(function(c, i) { return i === idx ? nw : c; }); });
    setIcons(function(p) { return p.map(function(ic) { return ic.category === old ? Object.assign({}, ic, { category: nw }) : ic; }); });
    if (selCat === old) setSelCat(nw);
    setEditIdx(null);
  }

  function deleteCat(idx) {
    var name = cats[idx];
    if (name === "전체") return;
    setCats(function(p) { return p.filter(function(_, i) { return i !== idx; }); });
    setIcons(function(p) { return p.map(function(ic) { return ic.category === name ? Object.assign({}, ic, { category:"기타" }) : ic; }); });
    if (selCat === name) setSelCat("전체");
  }

  function addCat() {
    var name = newCat.trim();
    if (!name || cats.includes(name)) return;
    setCats(function(p) { return p.concat([name]); });
    setNewCat("");
  }

  function doCopy(name) {
    if (navigator.clipboard) navigator.clipboard.writeText('<Icon name="' + name + '" />');
    setCopied(true);
    setTimeout(function() { setCopied(false); }, 1500);
  }

  function onDragStart(idx) { setDragIdx(idx); }
  function onDragOver(e, idx) { e.preventDefault(); setDragOver(idx); }
  function onDrop(e, idx) {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) { setDragIdx(null); setDragOver(null); return; }
    var nonAll = cats.filter(function(c) { return c !== "전체"; });
    var from = dragIdx - 1; var to = idx - 1;
    if (from < 0 || to < 0) { setDragIdx(null); setDragOver(null); return; }
    var next = nonAll.slice();
    var moved = next.splice(from, 1)[0];
    next.splice(to, 0, moved);
    setCats(["전체"].concat(next));
    setDragIdx(null); setDragOver(null);
  }
  function onDragEnd() { setDragIdx(null); setDragOver(null); }

  function searchMdi(keyword) {
    setMdiSearch(keyword);
    if (!keyword.trim()) { setMdiResults([]); return; }
    setMdiLoading(true);
    fetch("https://api.iconify.design/search?query=" + encodeURIComponent(keyword) + "&prefix=mdi&limit=18")
      .then(function(r) { return r.json(); })
      .then(function(data) {
        setMdiResults((data.icons || []).map(function(icon) { return icon.replace("mdi:", ""); }));
        setMdiLoading(false);
      })
      .catch(function() { setMdiResults([]); setMdiLoading(false); });
  }

  function selectMdiIcon(name) {
    fetch("https://api.iconify.design/mdi/" + name + ".svg?width=24&height=24")
      .then(function(r) { return r.text(); })
      .then(function(svg) {
        var match = svg.match(/d="([^"]+)"/);
        setForm(function(f) { return Object.assign({}, f, { name: name, svg: match ? match[1] : "" }); });
        setMdiResults([]); setMdiSearch("");
      })
      .catch(function() { setForm(function(f) { return Object.assign({}, f, { name: name }); }); });
  }

  function closeModal() { setModal(null); setEditIdx(null); setMdiResults([]); setMdiSearch(""); }

  function setFormKey(key, val) { setForm(function(f) { return Object.assign({}, f, { [key]: val }); }); }

  var inp = {
    width:"100%", boxSizing:"border-box", height:"36px", padding:"0 12px",
    border:"1px solid " + T.grey300, borderRadius:"4px", background:T.white, color:T.grey800, fontSize:"15px",
  };

  // pagination page numbers
  var pageNums = [];
  for (var pi = 1; pi <= totalPages; pi++) {
    if (pi === 1 || pi === totalPages || Math.abs(pi - safePage) <= 2) pageNums.push(pi);
  }
  var pageItems = [];
  for (var qi = 0; qi < pageNums.length; qi++) {
    if (qi > 0 && pageNums[qi] - pageNums[qi-1] > 1) pageItems.push("...");
    pageItems.push(pageNums[qi]);
  }

  return (
    <div style={{ background:T.primaryBg, minHeight:"100vh", position:"relative", fontFamily:"Pretendard,-apple-system,BlinkMacSystemFont,system-ui,sans-serif" }}>

      {/* MODAL */}
      {modal && (
        <div style={{ position:"fixed", inset:0, zIndex:9999, background:"rgba(31,41,55,0.45)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ background:T.white, borderRadius:"8px 8px 0 0", width: modal === "category" ? "420px" : "440px", maxHeight:"85vh", overflowY:"auto", boxShadow:"0 4px 24px rgba(0,0,0,0.12)" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 24px", borderBottom:"1px solid " + T.grey200 }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                <Ico d={modal === "upload" ? P.plus : P.list} size={24} color={T.primaryDefault} />
                <span style={{ fontSize:"16px", fontWeight:500, color:"#333" }}>{modal === "upload" ? "아이콘 업로드" : "카테고리 편집"}</span>
              </div>
              <button onClick={closeModal} style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex" }}>
                <Ico d={P.close} size={24} color={T.grey500} />
              </button>
            </div>

            <div style={{ padding:"20px 24px" }}>
              {modal === "upload" && (
                <div>
                  {/* MDI 검색 */}
                  <div style={{ marginBottom:"16px", padding:"12px", background:T.grey50, borderRadius:"4px", border:"1px solid " + T.grey200 }}>
                    <div style={{ fontSize:"13px", color:T.grey600, marginBottom:"6px" }}>
                      MDI 아이콘 검색 <span style={{ color:T.grey400 }}>— 클릭하면 이름·SVG 자동 입력</span>
                    </div>
                    <input value={mdiSearch} onChange={function(e) { searchMdi(e.target.value); }}
                      placeholder="예: home, trash, pencil..."
                      style={Object.assign({}, inp, { marginBottom:"8px" })} />
                    {mdiLoading && <div style={{ fontSize:"13px", color:T.grey400, textAlign:"center", padding:"8px 0" }}>검색 중...</div>}
                    {!mdiLoading && mdiResults.length > 0 && (
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:"6px" }}>
                        {mdiResults.map(function(name) {
                          return (
                            <div key={name} onClick={function() { selectMdiIcon(name); }} title={name}
                              style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"4px", padding:"8px 4px", borderRadius:"4px", cursor:"pointer", border:"1px solid " + T.grey200, background:T.white }}
                              onMouseEnter={function(e) { e.currentTarget.style.background = "#edf6ef"; }}
                              onMouseLeave={function(e) { e.currentTarget.style.background = T.white; }}>
                              <img src={"https://api.iconify.design/mdi/" + name + ".svg?color=%231F2937"} width={20} height={20} alt={name} />
                              <span style={{ fontSize:"10px", color:T.grey500, textAlign:"center", wordBreak:"break-all", lineHeight:"1.3" }}>{name}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {!mdiLoading && mdiSearch && mdiResults.length === 0 && (
                      <div style={{ fontSize:"13px", color:T.grey400, textAlign:"center", padding:"8px 0" }}>결과 없음</div>
                    )}
                  </div>

                  {[["ID *","id"],["이름 *","name"],["태그","tags"],["사용 위치","usedIn"]].map(function(pair) {
                    var label = pair[0]; var key = pair[1];
                    return (
                      <div key={key} style={{ marginBottom:"14px" }}>
                        <label style={{ display:"block", marginBottom:"4px", fontSize:"15px", color:T.grey800 }}>{label}</label>
                        <input value={form[key]} onChange={function(e) { setFormKey(key, e.target.value); }} style={inp} />
                      </div>
                    );
                  })}
                  <div style={{ marginBottom:"14px" }}>
                    <label style={{ display:"block", marginBottom:"4px", fontSize:"15px", color:T.grey800 }}>카테고리 *</label>
                    <select value={form.category} onChange={function(e) { setFormKey("category", e.target.value); }} style={inp}>
                      <option value="">선택하세요</option>
                      {cats.filter(function(c) { return c !== "전체"; }).map(function(c) { return <option key={c}>{c}</option>; })}
                    </select>
                  </div>
                  <div style={{ marginBottom:"14px" }}>
                    <label style={{ display:"block", marginBottom:"4px", fontSize:"15px", color:T.grey800 }}>SVG Path *</label>
                    <textarea value={form.svg} onChange={function(e) { setFormKey("svg", e.target.value); }} rows={3}
                      style={{ width:"100%", boxSizing:"border-box", padding:"8px 12px", border:"1px solid " + T.grey300, borderRadius:"4px", background:T.white, color:T.grey800, fontSize:"12px", fontFamily:"monospace", resize:"vertical" }} />
                  </div>
                  <div style={{ display:"flex", gap:"8px", justifyContent:"flex-end" }}>
                    <BtnOutline onClick={function() { setModal(null); }}>취소</BtnOutline>
                    <BtnPrimary onClick={doUpload}>업로드</BtnPrimary>
                  </div>
                </div>
              )}

              {modal === "category" && (
                <div>
                  {cats.map(function(cat, idx) {
                    return (
                      <div key={cat} draggable={cat !== "전체"}
                        onDragStart={function() { onDragStart(idx); }}
                        onDragOver={function(e) { onDragOver(e, idx); }}
                        onDrop={function(e) { onDrop(e, idx); }}
                        onDragEnd={onDragEnd}
                        style={{ display:"flex", alignItems:"center", gap:"8px", padding:"10px 0", borderBottom:"1px solid " + T.grey200,
                          background: dragOver === idx && dragIdx !== idx ? T.grey50 : "transparent",
                          opacity: dragIdx === idx ? 0.4 : 1, cursor: cat !== "전체" && editIdx !== idx ? "grab" : "default" }}>
                        <div style={{ color: cat === "전체" ? T.grey200 : T.grey300, display:"flex" }}>
                          <Ico d={P.drag} size={14} color="currentColor" />
                        </div>
                        {editIdx === idx ? (
                          <div style={{ display:"flex", gap:"8px", flex:1 }}>
                            <input autoFocus value={editVal}
                              onChange={function(e) { setEditVal(e.target.value); }}
                              onKeyDown={function(e) { if (e.key === "Enter") saveEditCat(idx); }}
                              style={Object.assign({}, inp, { flex:1 })} />
                            <BtnPrimary size="sm" onClick={function() { saveEditCat(idx); }}>저장</BtnPrimary>
                            <BtnOutline onClick={function() { setEditIdx(null); }}>취소</BtnOutline>
                          </div>
                        ) : (
                          <div style={{ display:"flex", alignItems:"center", gap:"8px", flex:1 }}>
                            <span style={{ flex:1, fontSize:"15px" }}>{cat}</span>
                            <span style={{ fontSize:"13px", color:T.grey400 }}>{catCount(cat)}</span>
                            {cat !== "전체" && (
                              <div style={{ display:"flex", gap:"4px" }}>
                                <TblBtn d={P.edit} onClick={function() { setEditIdx(idx); setEditVal(cat); }} title="수정" variant="primary" />
                                <TblBtn d={P.trash} onClick={function() { deleteCat(idx); }} title="삭제" variant="danger" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div style={{ display:"flex", gap:"8px", margin:"12px 0" }}>
                    <input value={newCat}
                      onChange={function(e) { setNewCat(e.target.value); }}
                      onKeyDown={function(e) { if (e.key === "Enter") addCat(); }}
                      placeholder="새 카테고리 이름"
                      style={Object.assign({}, inp, { flex:1, width:"auto" })} />
                    <BtnPrimary onClick={addCat}>추가</BtnPrimary>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD */}
      <div style={{ padding:"16px" }}>
        <div style={{ display:"flex", height:"calc(100vh - 32px)", borderRadius:"4px", overflow:"hidden", background:T.primaryBg, color:T.grey800 }}>

          {/* Sidebar */}
          <div style={{ width:"180px", flexShrink:0, background:T.white, borderRight:"1px solid " + T.grey200, display:"flex", flexDirection:"column" }}>
            <div style={{ padding:"16px 16px 12px", borderBottom:"1px solid " + T.grey200, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ fontSize:"15px", fontWeight:500, color:T.grey800 }}>카테고리</span>
              <button onClick={function() { setModal("category"); }} style={{ fontSize:"13px", color:T.grey600, background:"none", border:"1px solid " + T.grey300, borderRadius:"4px", padding:"2px 8px", cursor:"pointer" }}>편집</button>
            </div>
            <div style={{ flex:1, overflowY:"auto", padding:"8px" }}>
              {cats.map(function(cat) {
                var active = selCat === cat;
                return (
                  <div key={cat} onClick={function() { setSelCat(cat); setPage(1); }} style={{
                    display:"flex", alignItems:"center", justifyContent:"space-between",
                    padding:"8px 10px", borderRadius:"4px", cursor:"pointer", marginBottom:"2px",
                    background: active ? "#edf6ef" : "transparent",
                    color: active ? T.primaryDefault : T.grey400,
                    fontSize:"15px", fontWeight: active ? 500 : 400,
                  }}>
                    <span>{cat}</span>
                    <span style={{ fontSize:"11px", padding:"1px 6px", borderRadius:"30px", background: active ? T.primaryDefault + "20" : T.grey100, color: active ? T.primaryDefault : T.grey400 }}>
                      {catCount(cat)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main */}
          <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", background:T.primaryBg }}>
            {/* Topbar */}
            <div style={{ padding:"12px 16px", borderBottom:"1px solid " + T.grey200, display:"flex", alignItems:"center", gap:"8px", background:T.white }}>
              <div style={{ flex:1, position:"relative" }}>
                <span style={{ position:"absolute", left:"10px", top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
                  <Ico d={P.search} size={18} color={T.grey400} />
                </span>
                <input value={search} onChange={function(e) { setSearch(e.target.value); setPage(1); }} placeholder="이름 또는 태그 검색"
                  style={{ width:"100%", boxSizing:"border-box", height:"36px", padding:"0 12px 0 36px", border:"1px solid " + T.grey300, borderRadius:"4px", background:T.white, color:T.grey800, fontSize:"15px" }} />
              </div>
              {[["grid",P.grid],["list",P.list]].map(function(pair) {
                var v = pair[0]; var d = pair[1];
                return (
                  <button key={v} onClick={function() { setView(v); }} style={{
                    width:"36px", height:"36px", display:"flex", alignItems:"center", justifyContent:"center",
                    border:"1px solid " + T.grey300, borderRadius:"4px", cursor:"pointer",
                    background: view === v ? T.grey100 : T.white, color: view === v ? T.grey800 : T.grey400,
                  }}>
                    <Ico d={d} size={18} />
                  </button>
                );
              })}
              <BtnPrimary onClick={function() { setModal("upload"); }}>
                <Ico d={P.plus} size={18} color={T.white} /> 업로드
              </BtnPrimary>
            </div>

            {/* Content */}
            <div style={{ flex:1, overflowY:"auto", padding:"16px" }}>
              {view === "grid" ? (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(80px,80px))", gap:"6px" }}>
                  {paged.map(function(ic) {
                    var sel = selIcon && selIcon.id === ic.id;
                    return (
                      <div key={ic.id} onClick={function() { setSelIcon(ic); }} style={{
                        display:"flex", flexDirection:"column", alignItems:"center", gap:"6px",
                        padding:"10px 6px 8px", borderRadius:"4px", cursor:"pointer",
                        border:"1px solid " + (sel ? T.primaryDefault : T.grey200),
                        background: sel ? "#edf6ef" : T.white,
                      }}>
                        <Ico d={ic.svg} size={20} color={sel ? T.primaryDefault : T.grey800} />
                        <span style={{ fontSize:"11px", color: sel ? T.primaryDefault : T.grey500, textAlign:"center", wordBreak:"break-all" }}>{ic.name}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead>
                    <tr style={{ background:T.grey50 }}>
                      {[["ID","left","48px"],["아이콘","center","56px"],["이름","left","auto"],["카테고리","left","90px"],["태그","left","120px"],["사용 위치","left","120px"],["","left","48px"]].map(function(col, i) {
                        return <th key={i} style={{ height:"51px", padding:"0 12px", textAlign:col[1], width:col[2], fontSize:"15px", fontWeight:500, color:T.grey400, borderBottom:"1px solid " + T.grey300, whiteSpace:"nowrap" }}>{col[0]}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {paged.map(function(ic, ri) {
                      var sel = selIcon && selIcon.id === ic.id;
                      return (
                        <tr key={ic.id} onClick={function() { setSelIcon(ic); }} style={{
                          height:"52px", cursor:"pointer",
                          background: sel ? "#edf6ef" : ri % 2 === 0 ? T.primaryBg : T.white,
                          borderBottom:"1px solid " + T.grey300,
                        }}>
                          <td style={{ padding:"0 12px", fontSize:"13px", color:T.grey400 }}>{ic.id}</td>
                          <td style={{ padding:"0 12px", textAlign:"center" }}><Ico d={ic.svg} size={24} color={sel ? T.primaryDefault : T.grey800} /></td>
                          <td style={{ padding:"0 12px", fontSize:"15px", color: sel ? T.primaryDefault : T.grey800, fontWeight: sel ? 500 : 400 }}>{ic.name}</td>
                          <td style={{ padding:"0 12px", fontSize:"13px", color:T.grey500 }}>{ic.category}</td>
                          <td style={{ padding:"0 12px" }}>
                            <div style={{ display:"flex", gap:"4px", flexWrap:"wrap" }}>
                              {ic.tags.slice(0,2).map(function(t) { return <span key={t} style={{ fontSize:"11px", padding:"2px 8px", borderRadius:"30px", background:T.grey100, color:T.grey600 }}>{t}</span>; })}
                            </div>
                          </td>
                          <td style={{ padding:"0 12px", fontSize:"13px", color:T.grey500 }}>{ic.usedIn.join(", ") || "—"}</td>
                          <td style={{ padding:"0 12px" }}>
                            <BtnDelete onClick={function(e) {
                              e.stopPropagation();
                              setIcons(function(p) { return p.filter(function(i) { return i.id !== ic.id; }); });
                              if (sel) setSelIcon(null);
                            }} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
              {filtered.length === 0 && (
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"200px", gap:"8px" }}>
                  <Ico d={P.search} size={32} color={T.grey300} />
                  <span style={{ fontSize:"15px", color:T.grey400 }}>검색 결과가 없습니다</span>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ padding:"10px 16px", borderTop:"1px solid " + T.grey200, background:T.white, display:"flex", alignItems:"center", justifyContent:"center", gap:"4px", flexShrink:0 }}>
                <PageBtn onClick={function() { goPage(1); }} disabled={safePage === 1}><Ico d={P.first} size={14} /></PageBtn>
                <PageBtn onClick={function() { goPage(safePage - 1); }} disabled={safePage === 1}><Ico d={P.prev} size={14} /></PageBtn>
                {pageItems.map(function(item, i) {
                  if (item === "...") return <span key={"d"+i} style={{ width:"32px", textAlign:"center", color:T.grey400, fontSize:"13px" }}>…</span>;
                  return <PageBtn key={item} active={item === safePage} onClick={function() { goPage(item); }}>{item}</PageBtn>;
                })}
                <PageBtn onClick={function() { goPage(safePage + 1); }} disabled={safePage === totalPages}><Ico d={P.next} size={14} /></PageBtn>
                <PageBtn onClick={function() { goPage(totalPages); }} disabled={safePage === totalPages}><Ico d={P.last} size={14} /></PageBtn>
                <span style={{ marginLeft:"8px", fontSize:"13px", color:T.grey400 }}>
                  {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filtered.length)} / {filtered.length}개
                </span>
              </div>
            )}
          </div>

          {/* Detail Panel */}
          {selIcon && (
            <div style={{ width:"216px", flexShrink:0, borderLeft:"1px solid " + T.grey200, background:T.white, display:"flex", flexDirection:"column", padding:"16px", gap:"16px", overflowY:"auto" }}>
              <div style={{ display:"flex", justifyContent:"flex-end" }}>
                <button onClick={function() { setSelIcon(null); }} style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex" }}>
                  <Ico d={P.close} size={20} color={T.grey500} />
                </button>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"10px" }}>
                <div style={{ width:"60px", height:"60px", background:T.primaryBg, border:"1px solid " + T.grey200, borderRadius:"4px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Ico d={selIcon.svg} size={28} color={T.grey800} />
                </div>
                <span style={{ fontSize:"16px", fontWeight:500, color:T.grey800 }}>{selIcon.name}</span>
              </div>
              {[["카테고리",[selIcon.category]],["태그",selIcon.tags],["사용 위치",selIcon.usedIn]].map(function(pair) {
                var label = pair[0]; var items = pair[1];
                return (
                  <div key={label}>
                    <div style={{ fontSize:"11px", color:T.grey400, marginBottom:"6px", textTransform:"uppercase", letterSpacing:"0.06em" }}>{label}</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:"4px" }}>
                      {items.length > 0
                        ? items.map(function(t) { return <span key={t} style={{ fontSize:"13px", padding:"3px 8px", borderRadius:"30px", background:T.grey100, color:T.grey600 }}>{t}</span>; })
                        : <span style={{ fontSize:"13px", color:T.grey300 }}>없음</span>}
                    </div>
                  </div>
                );
              })}
              <div>
                <div style={{ fontSize:"11px", color:T.grey400, marginBottom:"6px", textTransform:"uppercase", letterSpacing:"0.06em" }}>코드 스니펫</div>
                <div style={{ background:T.grey50, border:"1px solid " + T.grey200, borderRadius:"4px", padding:"8px 10px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"6px" }}>
                  <code style={{ fontSize:"11px", fontFamily:"monospace", color:T.grey600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {"<Icon name=\"" + selIcon.name + "\" />"}
                  </code>
                  <button onClick={function() { doCopy(selIcon.name); }} style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex" }}>
                    {copied ? <Ico d={P.check} size={16} color={T.primaryDefault} /> : <Ico d={P.copy} size={16} color={T.grey500} />}
                  </button>
                </div>
              </div>
              <div style={{ marginTop:"auto" }}>
                <BtnDanger onClick={function() { setIcons(function(p) { return p.filter(function(i) { return i.id !== selIcon.id; }); }); setSelIcon(null); }}>
                  <Ico d={P.trash} size={18} color={T.white} /> 삭제
                </BtnDanger>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
