import React from 'react'
import { useState, useEffect } from "react";

const T = {
  primaryDefault: "#48AA66",
  primaryDark:    "#3E8A56",
  primaryBg:      "#F6FAF8",
  stateError:     "#FF0000",
  white:          "#FFFFFF",
  grey50:         "#F9FAFB",
  grey100:        "#F3F4F6",
  grey200:        "#E5E7EB",
  grey300:        "#D1D5DB",
  grey400:        "#9CA3AF",
  grey500:        "#6B7280",
  grey600:        "#4B5563",
  grey800:        "#1F2937",
};

const Font = {
  headingSmall:  { fontSize:"16px", fontWeight:500, lineHeight:"150%" },
  headingXSmall: { fontSize:"15px", fontWeight:500, lineHeight:"150%" },
  bodyMedium:    { fontSize:"15px", fontWeight:400, lineHeight:"150%" },
  bodySmall:     { fontSize:"13px", fontWeight:400, lineHeight:"150%" },
  bodyXSmall:    { fontSize:"11px", fontWeight:400, lineHeight:"150%" },
};

const initCats = ["전체","내비게이션","액션","상태","미디어","커머스"];
const initIcons = [
  { id:1,  name:"home",    category:"내비게이션", tags:["홈","메인"],       usedIn:["헤더","사이드바"],    svg:"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" },
  { id:2,  name:"search",  category:"내비게이션", tags:["검색"],            usedIn:["헤더","검색바"],      svg:"M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" },
  { id:3,  name:"menu",    category:"내비게이션", tags:["햄버거","메뉴"],   usedIn:["모바일헤더"],         svg:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" },
  { id:4,  name:"close",   category:"액션",       tags:["닫기","삭제"],     usedIn:["모달","토스트"],      svg:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" },
  { id:5,  name:"add",     category:"액션",       tags:["추가","생성"],     usedIn:["버튼"],               svg:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" },
  { id:6,  name:"edit",    category:"액션",       tags:["수정","편집"],     usedIn:["테이블","카드"],      svg:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" },
  { id:7,  name:"delete",  category:"액션",       tags:["삭제","제거"],     usedIn:["테이블"],             svg:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" },
  { id:8,  name:"check",   category:"상태",       tags:["완료","성공"],     usedIn:["폼","리스트"],        svg:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" },
  { id:9,  name:"warning", category:"상태",       tags:["경고","주의"],     usedIn:["알림","토스트"],      svg:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" },
  { id:10, name:"info",    category:"상태",       tags:["정보","안내"],     usedIn:["툴팁","알림"],        svg:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" },
  { id:11, name:"play",    category:"미디어",     tags:["재생","시작"],     usedIn:["비디오플레이어"],     svg:"M8 5v14l11-7z" },
  { id:12, name:"pause",   category:"미디어",     tags:["일시정지"],        usedIn:["비디오플레이어"],     svg:"M6 19h4V5H6v14zm8-14v14h4V5h-4z" },
  { id:13, name:"volume",  category:"미디어",     tags:["음량","소리"],     usedIn:["비디오플레이어"],     svg:"M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" },
  { id:14, name:"cart",    category:"커머스",     tags:["장바구니","구매"], usedIn:["헤더","상품페이지"],  svg:"M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.9 18 9 18h12v-2H9.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 23.45 5H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" },
  { id:15, name:"heart",   category:"커머스",     tags:["찜","즐겨찾기"],   usedIn:["상품카드"],           svg:"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" },
];

const D = {
  search: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  grid:   "M3 3h7v7H3zm0 11h7v7H3zm11-11h7v7h-7zm0 11h7v7h-7z",
  list:   "M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z",
  plus:   "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
  close:  "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
  copy:   "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",
  trash:  "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
  edit:   "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
  drag:   "M9 3h2v2H9zm0 4h2v2H9zm0 4h2v2H9zm0 4h2v2H9zm4-12h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z",
};

const Ico = ({ d, size=18, color="currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink:0, display:"block" }}>
    <path d={d} />
  </svg>
);

const useHover = () => {
  const [h, setH] = useState(false);
  return [h, { onMouseEnter:()=>setH(true), onMouseLeave:()=>setH(false) }];
};

const PrimaryBtn = ({ children, onClick, size="md" }) => {
  const [h, hov] = useHover();
  return (
    <button onClick={onClick} {...hov} style={{
      display:"flex", alignItems:"center", gap:"4px",
      padding: size==="sm" ? "0 10px" : "0 15px",
      height: size==="sm" ? "30px" : "36px",
      border:"none", borderRadius:"4px", cursor:"pointer",
      background: h ? T.primaryDark : T.primaryDefault,
      color: T.white, ...Font.bodySmall,
    }}>{children}</button>
  );
};

const OutlineBtn = ({ children, onClick }) => {
  const [h, hov] = useHover();
  return (
    <button onClick={onClick} {...hov} style={{
      display:"flex", alignItems:"center", gap:"4px",
      padding:"0 15px", height:"36px",
      border:`1px solid ${T.grey300}`, borderRadius:"4px", cursor:"pointer",
      background: h ? T.grey100 : T.white,
      color: T.grey600, ...Font.bodySmall,
    }}>{children}</button>
  );
};

const DangerBtn = ({ children, onClick }) => {
  const [h, hov] = useHover();
  return (
    <button onClick={onClick} {...hov} style={{
      display:"flex", alignItems:"center", gap:"4px",
      padding:"0 15px", height:"36px",
      border:"none", borderRadius:"4px", cursor:"pointer",
      background: h ? "#DB0000" : T.stateError,
      color: T.white, ...Font.bodySmall,
    }}>{children}</button>
  );
};

const DeleteBtn = ({ onClick }) => {
  const [h, hov] = useHover();
  return (
    <button onClick={onClick} {...hov} style={{ background:"none", border:"none", cursor:"pointer", padding:"4px", display:"flex" }}>
      <Ico d={D.trash} size={18} color={h ? T.stateError : T.grey500} />
    </button>
  );
};

const TableBtn = ({ d, onClick, title, variant="primary" }) => {
  const [h, hov] = useHover();
  const hoverColor  = variant==="danger" ? T.stateError : T.primaryDefault;
  const hoverBorder = variant==="danger" ? T.stateError : T.primaryDark;
  return (
    <button title={title} onClick={onClick} {...hov} style={{
      width:"28px", height:"28px", display:"flex", alignItems:"center", justifyContent:"center",
      border:`1px solid ${h ? hoverBorder : T.grey300}`,
      borderRadius:"4px", background: h ? T.grey100 : T.white, cursor:"pointer",
    }}>
      <Ico d={d} size={16} color={h ? hoverColor : T.grey400} />
    </button>
  );
};

export default function App() {
  const [icons, setIcons]     = useState(initIcons);
  const [cats, setCats]       = useState(initCats);
  const [selCat, setSelCat]   = useState("전체");
  const [search, setSearch]   = useState("");
  const [view, setView]       = useState("grid");
  const [selIcon, setSelIcon] = useState(null);
  const [modal, setModal]     = useState(null);
  const [dragIdx, setDragIdx] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [editIdx, setEditIdx] = useState(null);
  const [editVal, setEditVal] = useState("");
  const [newCat, setNewCat]   = useState("");
  const [copied, setCopied]   = useState(false);
  const [form, setForm]       = useState({ id:"", name:"", category:"", tags:"", usedIn:"", svg:"" });

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      input:focus, select:focus, textarea:focus {
        outline: none !important;
        box-shadow: none !important;
        border-color: #48AA66 !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const filtered = icons.filter(ic => {
    const okCat = selCat==="전체" || ic.category===selCat;
    const q = search.toLowerCase();
    return okCat && (!q || ic.name.includes(q) || ic.tags.some(t => t.includes(q)));
  });

  const catCount = c => c==="전체" ? icons.length : icons.filter(i => i.category===c).length;

  const doUpload = () => {
    if (!form.name || !form.category || !form.svg) return;
    setIcons(p => [...p, {
      id: form.id ? Number(form.id) : Date.now(),
      name: form.name,
      category: form.category,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      usedIn: form.usedIn.split(",").map(t => t.trim()).filter(Boolean),
      svg: form.svg,
    }]);
    setForm({ id:"", name:"", category:"", tags:"", usedIn:"", svg:"" });
    setModal(null);
  };

  const saveEditCat = idx => {
    const old = cats[idx], nw = editVal.trim();
    if (!nw || nw===old || cats.includes(nw)) { setEditIdx(null); return; }
    setCats(p => p.map((c,i) => i===idx ? nw : c));
    setIcons(p => p.map(ic => ic.category===old ? { ...ic, category:nw } : ic));
    if (selCat===old) setSelCat(nw);
    setEditIdx(null);
  };

  const deleteCat = idx => {
    const name = cats[idx];
    if (name==="전체") return;
    setCats(p => p.filter((_,i) => i!==idx));
    setIcons(p => p.map(ic => ic.category===name ? { ...ic, category:"기타" } : ic));
    if (selCat===name) setSelCat("전체");
  };

  const addCat = () => {
    const name = newCat.trim();
    if (!name || cats.includes(name)) return;
    setCats(p => [...p, name]);
    setNewCat("");
  };

  const doCopy = name => {
    navigator.clipboard?.writeText(`<Icon name="${name}" />`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const onDragStart = idx => setDragIdx(idx);
  const onDragOver  = (e, idx) => { e.preventDefault(); setDragOver(idx); };
  const onDrop      = (e, idx) => {
    e.preventDefault();
    if (dragIdx===null || dragIdx===idx) { setDragIdx(null); setDragOver(null); return; }
    const nonAll = cats.filter(c => c!=="전체");
    // dragIdx와 idx는 cats 배열 기준 인덱스 (0="전체"), 실제 nonAll 인덱스는 -1
    const fromNonAll = dragIdx - 1;
    const toNonAll   = idx - 1;
    if (fromNonAll < 0 || toNonAll < 0) { setDragIdx(null); setDragOver(null); return; }
    const next = [...nonAll];
    const [moved] = next.splice(fromNonAll, 1);
    next.splice(toNonAll, 0, moved);
    setCats(["전체", ...next]);
    setDragIdx(null);
    setDragOver(null);
  };
  const onDragEnd = () => { setDragIdx(null); setDragOver(null); };

  const inputStyle = {
    width:"100%", boxSizing:"border-box", height:"36px", padding:"0 12px",
    border:`1px solid ${T.grey300}`, borderRadius:"4px",
    background:T.white, color:T.grey800, ...Font.bodyMedium,
  };

  return (
    <div style={{ padding:"16px", background:T.primaryBg, minHeight:"672px", position:"relative", fontFamily:"Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif" }}>

      {/* ── MODAL ── */}
      {modal && (
        <div style={{
          position:"absolute", inset:0, zIndex:9999,
          background:"rgba(31,41,55,0.45)",
          display:"flex", alignItems:"center", justifyContent:"center",
          borderRadius:"4px",
        }}>
          <div style={{
            background:T.white,
            borderRadius:"8px 8px 0 0",
            width: modal==="category" ? "420px" : "400px",
            maxHeight:"80vh", overflowY:"auto",
            boxShadow:"0 4px 24px rgba(0,0,0,0.12)",
          }}>
            {/* Header */}
            <div style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"20px 24px", borderBottom:`1px solid ${T.grey200}`,
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                <Ico d={modal==="upload" ? D.plus : D.list} size={24} color={T.primaryDefault} />
                <span style={{ ...Font.headingSmall, color:"#333333" }}>
                  {modal==="upload" ? "아이콘 업로드" : "카테고리 편집"}
                </span>
              </div>
              <button onClick={() => { setModal(null); setEditIdx(null); }} style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex" }}>
                <Ico d={D.close} size={24} color={T.grey500} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding:"20px 24px" }}>
              {modal==="upload" && (
                <div>
                  {[["ID *","id"],["이름 *","name"],["태그","tags"],["사용 위치","usedIn"]].map(([label, key]) => (
                    <div key={key} style={{ marginBottom:"14px" }}>
                      <label style={{ display:"block", marginBottom:"4px", ...Font.bodyMedium, color:T.grey800 }}>{label}</label>
                      <input
                        value={form[key]}
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                        style={inputStyle}
                      />
                    </div>
                  ))}
                  <div style={{ marginBottom:"14px" }}>
                    <label style={{ display:"block", marginBottom:"4px", ...Font.bodyMedium, color:T.grey800 }}>카테고리 *</label>
                    <select
                      value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      style={{ ...inputStyle }}
                    >
                      <option value="">선택하세요</option>
                      {cats.filter(c => c!=="전체").map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div style={{ marginBottom:"14px" }}>
                    <label style={{ display:"block", marginBottom:"4px", ...Font.bodyMedium, color:T.grey800 }}>SVG Path *</label>
                    <textarea
                      value={form.svg}
                      onChange={e => setForm(f => ({ ...f, svg: e.target.value }))}
                      rows={3}
                      style={{ width:"100%", boxSizing:"border-box", padding:"8px 12px", border:`1px solid ${T.grey300}`, borderRadius:"4px", background:T.white, color:T.grey800, ...Font.bodySmall, fontFamily:"monospace", resize:"vertical" }}
                    />
                  </div>
                  <div style={{ display:"flex", gap:"8px", justifyContent:"flex-end", marginTop:"8px" }}>
                    <OutlineBtn onClick={() => setModal(null)}>취소</OutlineBtn>
                    <PrimaryBtn onClick={doUpload}>업로드</PrimaryBtn>
                  </div>
                </div>
              )}

              {modal==="category" && (
                <div>
                  <div style={{ marginBottom:"12px" }}>
                    {cats.map((cat, idx) => (
                      <div
                        key={cat}
                        draggable={cat!=="전체"}
                        onDragStart={() => onDragStart(idx)}
                        onDragOver={e => onDragOver(e, idx)}
                        onDrop={e => onDrop(e, idx)}
                        onDragEnd={onDragEnd}
                        style={{
                          display:"flex", alignItems:"center", gap:"8px",
                          padding:"10px 0", borderBottom:`1px solid ${T.grey200}`,
                          background: dragOver===idx && dragIdx!==idx ? T.grey50 : "transparent",
                          opacity: dragIdx===idx ? 0.4 : 1,
                          transition:"background 0.1s",
                          cursor: cat!=="전체" && editIdx!==idx ? "grab" : "default",
                        }}
                      >
                        <div style={{ flexShrink:0, color: cat==="전체" ? T.grey200 : T.grey300, display:"flex" }}>
                          <Ico d={D.drag} size={14} color="currentColor" />
                        </div>

                        {editIdx===idx ? (
                          <>
                            <input
                              autoFocus
                              value={editVal}
                              onChange={e => setEditVal(e.target.value)}
                              onKeyDown={e => e.key==="Enter" && saveEditCat(idx)}
                              style={{ flex:1, height:"36px", padding:"0 12px", border:`1px solid ${T.primaryDefault}`, borderRadius:"4px", ...Font.bodyMedium }}
                            />
                            <PrimaryBtn size="sm" onClick={() => saveEditCat(idx)}>저장</PrimaryBtn>
                            <OutlineBtn onClick={() => setEditIdx(null)}>취소</OutlineBtn>
                          </>
                        ) : (
                          <>
                            <span style={{ flex:1, ...Font.bodyMedium }}>{cat}</span>
                            <span style={{ ...Font.bodySmall, color:T.grey400, marginRight:"4px" }}>{catCount(cat)}</span>
                            {cat!=="전체" && (
                              <>
                                <TableBtn d={D.edit}  onClick={() => { setEditIdx(idx); setEditVal(cat); }} title="수정" variant="primary" />
                                <TableBtn d={D.trash} onClick={() => deleteCat(idx)} title="삭제" variant="danger" />
                              </>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex", gap:"8px", marginBottom:"16px" }}>
                    <input
                      value={newCat}
                      onChange={e => setNewCat(e.target.value)}
                      onKeyDown={e => e.key==="Enter" && addCat()}
                      placeholder="새 카테고리 이름"
                      style={{ flex:1, height:"36px", padding:"0 12px", border:`1px solid ${T.grey300}`, borderRadius:"4px", background:T.white, color:T.grey800, ...Font.bodyMedium }}
                    />
                    <PrimaryBtn onClick={addCat}>추가</PrimaryBtn>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── DASHBOARD ── */}
      <div style={{
        display:"flex", height:"640px", borderRadius:"4px", overflow:"hidden",
        background:T.primaryBg, color:T.grey800, position:"relative",
      }}>

        {/* Sidebar */}
        <div style={{ width:"180px", flexShrink:0, background:T.white, borderRight:`1px solid ${T.grey200}`, display:"flex", flexDirection:"column" }}>
          <div style={{ padding:"16px 16px 12px", borderBottom:`1px solid ${T.grey200}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <span style={{ ...Font.headingXSmall, color:T.grey800 }}>카테고리</span>
            <button onClick={() => setModal("category")} style={{ ...Font.bodySmall, color:T.grey600, background:"none", border:`1px solid ${T.grey300}`, borderRadius:"4px", padding:"2px 8px", cursor:"pointer" }}>
              편집
            </button>
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"8px" }}>
            {cats.map(cat => {
              const active = selCat===cat;
              return (
                <div
                  key={cat}
                  onClick={() => setSelCat(cat)}
                  style={{
                    display:"flex", alignItems:"center", justifyContent:"space-between",
                    padding:"8px 10px", borderRadius:"4px", cursor:"pointer", marginBottom:"2px",
                    background: active ? "#edf6ef" : "transparent",
                    color: active ? T.primaryDefault : T.grey400,
                    ...Font.bodyMedium, fontWeight: active ? 500 : 400,
                  }}
                >
                  <span>{cat}</span>
                  <span style={{
                    ...Font.bodyXSmall, padding:"1px 6px", borderRadius:"30px",
                    background: active ? T.primaryDefault+"20" : T.grey100,
                    color: active ? T.primaryDefault : T.grey400,
                  }}>{catCount(cat)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", background:T.primaryBg }}>

          {/* Top bar */}
          <div style={{ padding:"12px 16px", borderBottom:`1px solid ${T.grey200}`, display:"flex", alignItems:"center", gap:"8px", background:T.white }}>
            <div style={{ flex:1, position:"relative" }}>
              <span style={{ position:"absolute", left:"10px", top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
                <Ico d={D.search} size={18} color={T.grey400} />
              </span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="이름 또는 태그 검색"
                style={{ width:"100%", boxSizing:"border-box", height:"36px", padding:"0 12px 0 36px", border:`1px solid ${T.grey300}`, borderRadius:"4px", background:T.white, color:T.grey800, ...Font.bodyMedium }}
              />
            </div>
            {[["grid", D.grid], ["list", D.list]].map(([v, d]) => (
              <button key={v} onClick={() => setView(v)} style={{
                width:"36px", height:"36px", display:"flex", alignItems:"center", justifyContent:"center",
                border:`1px solid ${T.grey300}`, borderRadius:"4px", cursor:"pointer",
                background: view===v ? T.grey100 : T.white,
                color: view===v ? T.grey800 : T.grey400,
              }}>
                <Ico d={d} size={18} />
              </button>
            ))}
            <PrimaryBtn onClick={() => setModal("upload")}>
              <Ico d={D.plus} size={18} color={T.white} /> 업로드
            </PrimaryBtn>
          </div>

          {/* Icon area */}
          <div style={{ flex:1, overflowY:"auto", padding:"16px" }}>
            {view==="grid" ? (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(108px,1fr))", gap:"8px" }}>
                {filtered.map(ic => {
                  const sel = selIcon?.id===ic.id;
                  return (
                    <div
                      key={ic.id}
                      onClick={() => setSelIcon(ic)}
                      style={{
                        display:"flex", flexDirection:"column", alignItems:"center", gap:"8px",
                        padding:"16px 8px 12px", borderRadius:"4px", cursor:"pointer",
                        border:`1px solid ${sel ? T.primaryDefault : T.grey200}`,
                        background: sel ? "#edf6ef" : T.white,
                      }}
                    >
                      <Ico d={ic.svg} size={24} color={sel ? T.primaryDefault : T.grey800} />
                      <span style={{ ...Font.bodyXSmall, color: sel ? T.primaryDefault : T.grey500, textAlign:"center" }}>{ic.name}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ background:T.grey50 }}>
                    {[["ID","left","48px"],["아이콘","center","56px"],["이름","left","auto"],["카테고리","left","90px"],["태그","left","120px"],["사용 위치","left","120px"],["","left","48px"]].map(([h, align, w], i) => (
                      <th key={i} style={{ height:"51px", padding:"0 12px", textAlign:align, width:w, ...Font.headingXSmall, color:T.grey400, borderBottom:`1px solid ${T.grey300}`, fontWeight:500, whiteSpace:"nowrap" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((ic, ri) => {
                    const sel = selIcon?.id===ic.id;
                    return (
                      <tr
                        key={ic.id}
                        onClick={() => setSelIcon(ic)}
                        style={{
                          height:"52px", cursor:"pointer",
                          background: sel ? "#edf6ef" : ri%2===0 ? T.primaryBg : T.white,
                          borderBottom:`1px solid ${T.grey300}`,
                        }}
                      >
                        <td style={{ padding:"0 12px", ...Font.bodySmall, color:T.grey400 }}>{ic.id}</td>
                        <td style={{ padding:"0 12px", textAlign:"center", width:"56px" }}>
                          <Ico d={ic.svg} size={24} color={sel ? T.primaryDefault : T.grey800} />
                        </td>
                        <td style={{ padding:"0 12px", ...Font.bodyMedium, color:sel ? T.primaryDefault : T.grey800, fontWeight:sel ? 500 : 400 }}>{ic.name}</td>
                        <td style={{ padding:"0 12px", ...Font.bodySmall, color:T.grey500 }}>{ic.category}</td>
                        <td style={{ padding:"0 12px" }}>
                          <div style={{ display:"flex", gap:"4px", flexWrap:"wrap" }}>
                            {ic.tags.slice(0,2).map(t => (
                              <span key={t} style={{ ...Font.bodyXSmall, padding:"2px 8px", borderRadius:"30px", background:T.grey100, color:T.grey600 }}>{t}</span>
                            ))}
                          </div>
                        </td>
                        <td style={{ padding:"0 12px", ...Font.bodySmall, color:T.grey500 }}>{ic.usedIn.join(", ")||"—"}</td>
                        <td style={{ padding:"0 12px", width:"48px" }}>
                          <DeleteBtn onClick={e => { e.stopPropagation(); setIcons(p => p.filter(i => i.id!==ic.id)); if (sel) setSelIcon(null); }} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            {filtered.length===0 && (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"200px", gap:"8px", color:T.grey400 }}>
                <Ico d={D.search} size={32} color={T.grey300} />
                <span style={Font.bodyMedium}>검색 결과가 없습니다</span>
              </div>
            )}
          </div>
        </div>

        {/* Detail Panel */}
        {selIcon && (
          <div style={{ width:"216px", flexShrink:0, borderLeft:`1px solid ${T.grey200}`, background:T.white, display:"flex", flexDirection:"column", padding:"16px", gap:"16px", overflowY:"auto" }}>
            <div style={{ display:"flex", justifyContent:"flex-end" }}>
              <button onClick={() => setSelIcon(null)} style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex" }}>
                <Ico d={D.close} size={20} color={T.grey500} />
              </button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"10px" }}>
              <div style={{ width:"60px", height:"60px", background:T.primaryBg, border:`1px solid ${T.grey200}`, borderRadius:"4px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Ico d={selIcon.svg} size={28} color={T.primaryDefault} />
              </div>
              <span style={{ ...Font.headingSmall, color:T.grey800 }}>{selIcon.name}</span>
            </div>
            {[["카테고리",[selIcon.category]],["태그",selIcon.tags],["사용 위치",selIcon.usedIn]].map(([label, items]) => (
              <div key={label}>
                <div style={{ ...Font.bodyXSmall, color:T.grey400, marginBottom:"6px", textTransform:"uppercase", letterSpacing:"0.06em" }}>{label}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"4px" }}>
                  {items.length > 0
                    ? items.map(t => <span key={t} style={{ ...Font.bodySmall, padding:"3px 8px", borderRadius:"30px", background:T.grey100, color:T.grey600 }}>{t}</span>)
                    : <span style={{ ...Font.bodySmall, color:T.grey300 }}>없음</span>
                  }
                </div>
              </div>
            ))}
            <div>
              <div style={{ ...Font.bodyXSmall, color:T.grey400, marginBottom:"6px", textTransform:"uppercase", letterSpacing:"0.06em" }}>코드 스니펫</div>
              <div style={{ background:T.grey50, border:`1px solid ${T.grey200}`, borderRadius:"4px", padding:"8px 10px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"6px" }}>
                <code style={{ ...Font.bodyXSmall, fontFamily:"monospace", color:T.grey600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                  {`<Icon name="${selIcon.name}" />`}
                </code>
                <button onClick={() => doCopy(selIcon.name)} style={{ background:"none", border:"none", cursor:"pointer", padding:0, flexShrink:0, display:"flex" }}>
                  {copied
                    ? <Ico d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" size={16} color={T.primaryDefault} />
                    : <Ico d={D.copy} size={16} color={T.grey500} />
                  }
                </button>
              </div>
            </div>
            <div style={{ marginTop:"auto" }}>
              <DangerBtn onClick={() => { setIcons(p => p.filter(i => i.id!==selIcon.id)); setSelIcon(null); }}>
                <Ico d={D.trash} size={18} color={T.white} /> 삭제
              </DangerBtn>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
