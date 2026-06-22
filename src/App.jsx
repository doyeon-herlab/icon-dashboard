import React, { useState, useEffect } from 'react';

// 78 items from '260326_아이콘 리스트.xlsx'
const iconData = [
  { "id": 1, "name": "쓰레기통", "purpose": "삭제", "filename": "trash-can-outline" },
  { "id": 2, "name": "다운로드", "purpose": "다운로드", "filename": "tray-arrow-down" },
  { "id": 3, "name": "연필", "purpose": "수정", "filename": "pencil-outline" },
  { "id": 4, "name": "연필박스", "purpose": "액션 버튼", "filename": "pencil-box-outline" },
  { "id": 5, "name": "돋보기", "purpose": "검색", "filename": "magnify" },
  { "id": 6, "name": "정보 확인", "purpose": "MSDS, 상세 정보, 물질 정보 등 모든 파일 및 정보의 확인", "filename": "eye-outline" },
  { "id": 7, "name": "파일", "purpose": "모달 제목", "filename": "file-outline" },
  { "id": 8, "name": "사업장", "purpose": "사업장 목록, 조직 트리 사업장명", "filename": "domain" },
  { "id": 9, "name": "사업장 정보", "purpose": "사업장 관리 사이드 메뉴(사업장 정보)", "filename": "briefcase-outline" },
  { "id": 10, "name": "조직 관리", "purpose": "사업장 관리 사이드 메뉴(조직 관리)", "filename": "account-group-outline" },
  { "id": 11, "name": "기본 정보", "purpose": "기본 정보, 안내 문구", "filename": "information-outline" },
  { "id": 12, "name": "주소 정보", "purpose": "주소 정보", "filename": "map-marker-outline" },
  { "id": 13, "name": "담당자 정보", "purpose": "담당자 정보", "filename": "account-outline" },
  { "id": 14, "name": "부서", "purpose": "부서 관리 조직 트리 부서명", "filename": "account-multiple-outline" },
  { "id": 15, "name": "제품작업 목록", "purpose": "화학물질 사이드 메뉴(제품 관리), 근골격계 사이드 메뉴(작업 관리)", "filename": "file-document-outline" },
  { "id": 16, "name": "물질 정보", "purpose": "화학물질 사이드 메뉴(물질 정보)", "filename": "file-find-outline" },
  { "id": 17, "name": "조사평가", "purpose": "화학물질 사이드 메뉴(위험성 평가), 근골격계 사이드 메뉴(유해요인조사)", "filename": "alert-outline" },
  { "id": 18, "name": "개선대책 목록", "purpose": "화학물질 사이드 메뉴(개선 활동)", "filename": "clipboard-text-outline" },
  { "id": 19, "name": "개선대책 수립 후", "purpose": "개선대책 수립 후", "filename": "clipboard-check-outline" },
  { "id": 20, "name": "개선대책 수립 전", "purpose": "개선대책 수립 전", "filename": "clipboard-outline" },
  { "id": 21, "name": "제품 등록", "purpose": "제품 등록 탭 제목, 구매 금지 해제 처리", "filename": "file-upload-outline" },
  { "id": 22, "name": "구매 금지", "purpose": "구매 금지 탭 제목, 구매 금지 처리", "filename": "file-cancel-outline" },
  { "id": 23, "name": "PDF", "purpose": "MSDS 파일 (PDF)", "filename": "file-pdf-box" },
  { "id": 24, "name": "워드", "purpose": "MSDS 파일 (워드)", "filename": "file-word-box" },
  { "id": 25, "name": "엑셀", "purpose": "MSDS 파일 (엑셀)", "filename": "file-excel-box" },
  { "id": 26, "name": "PNG", "purpose": "MSDS 파일 (PNG)", "filename": "file-png-box" },
  { "id": 27, "name": "JPG", "purpose": "MSDS 파일 (JPG)", "filename": "file-jpg-box" },
  { "id": 28, "name": "기타 확장자", "purpose": "MSDS 파일 (기타 확장자)", "filename": "text-box" },
  { "id": 29, "name": "사용 중", "purpose": "사용 중, 재사용 처리", "filename": "file-check-outline" },
  { "id": 30, "name": "사용 중단", "purpose": "사용 중단", "filename": "file-remove-outline" },
  { "id": 31, "name": "경고표지", "purpose": "경고표지", "filename": "shield-alert-outline" },
  { "id": 32, "name": "진행 중", "purpose": "진행 중", "filename": "progress-helper" },
  { "id": 33, "name": "미생성", "purpose": "미생성", "filename": "cancel" },
  { "id": 34, "name": "완료", "purpose": "완료", "filename": "checkbox-marked-circle-outline" },
  { "id": 35, "name": "불가", "purpose": "불가, 모달 창 닫기", "filename": "close-circle-outline" },
  { "id": 36, "name": "사용 정보", "purpose": "위험성평가 사용 정보", "filename": "form-select" },
  { "id": 37, "name": "보고서 생성", "purpose": "보고서 생성 탭 제목", "filename": "text-box-plus-outline" },
  { "id": 38, "name": "보고서 목록", "purpose": "보고서 목록 탭 제목", "filename": "text-box-outline" },
  { "id": 39, "name": "렌치", "purpose": "작업장 상황 조사 전", "filename": "wrench-outline" },
  { "id": 40, "name": "렌치체크", "purpose": "작업장 상황 조사 후", "filename": "wrench-check-outline" },
  { "id": 41, "name": "업로드", "purpose": "영상/사진 업로드 전", "filename": "tray-arrow-up" },
  { "id": 42, "name": "사진", "purpose": "영상/사진 업로드(사진)", "filename": "file-image-outline" },
  { "id": 43, "name": "영상", "purpose": "영상/사진 업로드(영상)", "filename": "file-video-outline" },
  { "id": 44, "name": "대표 자세", "purpose": "대표 자세", "filename": "human" },
  { "id": 45, "name": "결과", "purpose": "설문 결과", "filename": "table" },
  { "id": 46, "name": "응답자 정보", "purpose": "응답자 정보", "filename": "account-box-outline" },
  { "id": 47, "name": "근무 환경", "purpose": "근무 환경", "filename": "briefcase-account-outline" },
  { "id": 48, "name": "개인 활동", "purpose": "개인 활동", "filename": "run" },
  { "id": 49, "name": "건강 이력", "purpose": "건강 이력", "filename": "hospital-box-outline" },
  { "id": 50, "name": "목", "purpose": "증상 부위 목", "filename": "head-outline" },
  { "id": 51, "name": "어깨", "purpose": "증상 부위 어깨", "filename": "human-greeting-variant" },
  { "id": 52, "name": "팔", "purpose": "증상 부위 팔/팔꿈치", "filename": "arm-flex-outline" },
  { "id": 53, "name": "손", "purpose": "증상 부위 손/손목/손가락", "filename": "hand-back-left-outline" },
  { "id": 54, "name": "허리", "purpose": "증상 부위 허리", "filename": "tshirt-crew-outline" },
  { "id": 55, "name": "다리", "purpose": "증상 부위 다리", "filename": "seat-legroom-normal" },
  { "id": 56, "name": "추가 질문", "purpose": "추가 질문", "filename": "comment-question-outline" },
  { "id": 57, "name": "마이페이지", "purpose": "마이페이지", "filename": "account-circle-outline" },
  { "id": 58, "name": "멤버십 정보", "purpose": "멤버십 정보", "filename": "badge-account-horizontal-outline" },
  { "id": 59, "name": "사용량 정보", "purpose": "사용량 정보", "filename": "chart-bar" },
  { "id": 60, "name": "판매처 정보", "purpose": "판매처 정보", "filename": "office-building-outline" },
  { "id": 61, "name": "베이직 멤버십", "purpose": "베이직 멤버십", "filename": "star-outline" },
  { "id": 62, "name": "스탠다드 멤버십", "purpose": "스탠다드 멤버십", "filename": "star" },
  { "id": 63, "name": "프리미엄 멤버십", "purpose": "프리미엄 멤버십", "filename": "crown" },
  { "id": 64, "name": "저장", "purpose": "저장", "filename": "content-save-outline" },
  { "id": 65, "name": "엑셀 다운로드", "purpose": "엑셀 다운로드", "filename": "microsoft-excel" },
  { "id": 66, "name": "AI", "purpose": "AI", "filename": "creation-outline" },
  { "id": 67, "name": "대표자세 편집", "purpose": "대표 자세 선택 전", "filename": "human-edit" },
  { "id": 68, "name": "멤버십 변경", "purpose": "멤버십 변경", "filename": "star-circle-outline" },
  { "id": 69, "name": "오류 신고", "purpose": "오류 신고", "filename": "alert-circle-outline" },
  { "id": 70, "name": "로그아웃", "purpose": "로그아웃", "filename": "logout" },
  { "id": 71, "name": "체크", "purpose": "규제 물질 표시", "filename": "check" },
  { "id": 72, "name": "삼각형", "purpose": "규제 물질 표시, 고독성 물질 표시", "filename": "triangle-outline" },
  { "id": 73, "name": "달력", "purpose": "달력", "filename": "calendar-blank" },
  { "id": 74, "name": "더하기", "purpose": "등록, 추가, 생성 등 버튼 텍스트 앞", "filename": "plus" },
  { "id": 75, "name": "설정", "purpose": "금지 사유 설정", "filename": "true-variant" },
  { "id": 76, "name": "워드 다운로드", "purpose": "워드 다운로드", "filename": "microsoft-word" },
  { "id": 77, "name": "초기화", "purpose": "입력값 초기화", "filename": "restore" },
  { "id": 78, "name": "복사", "purpose": "복사", "filename": "content-copy" }
];

const LS_CATEGORIES = 'icon-dashboard.categories';
const LS_META = 'icon-dashboard.meta'; // { [filename]: { category: categoryId|null, tags: string[] } }

const loadLS = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // 카테고리 목록 (CRUD) — { id, name }
  const [categories, setCategories] = useState(() => loadLS(LS_CATEGORIES, []));
  // 아이콘별 메타데이터 (카테고리/태그)
  const [meta, setMeta] = useState(() => loadLS(LS_META, {}));

  // 'all' | 'uncategorized' | categoryId
  const [selectedCategory, setSelectedCategory] = useState('all');
  // 우측 패널에 표시할 아이콘
  const [selectedIcon, setSelectedIcon] = useState(null);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');

  useEffect(() => { localStorage.setItem(LS_CATEGORIES, JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem(LS_META, JSON.stringify(meta)); }, [meta]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2000);
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text).then(() => showToast(`${label} 복사 완료!`));
  };

  const getMeta = (filename) => meta[filename] || { category: null, tags: [] };

  // ---- 카테고리 CRUD ----
  const addCategory = () => {
    const name = newCategoryName.trim();
    if (!name) return;
    setCategories([...categories, { id: Date.now().toString(), name }]);
    setNewCategoryName('');
  };

  const startEditCategory = (cat) => {
    setEditingCategoryId(cat.id);
    setEditingCategoryName(cat.name);
  };

  const saveEditCategory = () => {
    const name = editingCategoryName.trim();
    if (name) {
      setCategories(categories.map(c => c.id === editingCategoryId ? { ...c, name } : c));
    }
    setEditingCategoryId(null);
    setEditingCategoryName('');
  };

  const deleteCategory = (id) => {
    if (!window.confirm('이 카테고리를 삭제할까요? 이 카테고리에 속한 아이콘은 미분류로 이동합니다.')) return;
    setCategories(categories.filter(c => c.id !== id));
    // 해당 카테고리를 쓰던 아이콘 메타 초기화
    setMeta(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(fn => {
        if (next[fn].category === id) next[fn] = { ...next[fn], category: null };
      });
      return next;
    });
    if (selectedCategory === id) setSelectedCategory('all');
  };

  // ---- 아이콘 메타 수정 ----
  const setIconCategory = (filename, categoryId) => {
    setMeta(prev => ({ ...prev, [filename]: { ...getMeta(filename), category: categoryId || null } }));
  };

  const addTag = (filename, tag) => {
    const t = tag.trim();
    if (!t) return;
    const cur = getMeta(filename);
    if (cur.tags.includes(t)) return;
    setMeta(prev => ({ ...prev, [filename]: { ...cur, tags: [...cur.tags, t] } }));
  };

  const removeTag = (filename, tag) => {
    const cur = getMeta(filename);
    setMeta(prev => ({ ...prev, [filename]: { ...cur, tags: cur.tags.filter(x => x !== tag) } }));
  };

  // ---- 필터링 ----
  const term = searchTerm.toLowerCase();
  const filteredIcons = iconData.filter(icon => {
    const m = getMeta(icon.filename);
    if (selectedCategory === 'uncategorized' && m.category) return false;
    if (selectedCategory !== 'all' && selectedCategory !== 'uncategorized' && m.category !== selectedCategory) return false;
    if (!term) return true;
    return (
      icon.name.toLowerCase().includes(term) ||
      icon.filename.toLowerCase().includes(term) ||
      icon.purpose.toLowerCase().includes(term) ||
      m.tags.some(t => t.toLowerCase().includes(term))
    );
  });

  const countFor = (catId) => iconData.filter(i => {
    const c = getMeta(i.filename).category;
    if (catId === 'all') return true;
    if (catId === 'uncategorized') return !c;
    return c === catId;
  }).length;

  return (
    <div style={{ display: 'flex', fontFamily: 'sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css" />

      {/* ===== 좌측 SNB ===== */}
      <aside style={{ width: '240px', flexShrink: 0, backgroundColor: '#fff', borderRight: '1px solid #dee2e6', padding: '20px 12px', boxSizing: 'border-box', minHeight: '100vh' }}>
        <div style={{ fontSize: '12px', fontWeight: '700', color: '#868e96', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '0 8px 8px' }}>카테고리</div>

        <SnbItem label="전체" active={selectedCategory === 'all'} count={countFor('all')} onClick={() => setSelectedCategory('all')} />
        <SnbItem label="미분류" active={selectedCategory === 'uncategorized'} count={countFor('uncategorized')} onClick={() => setSelectedCategory('uncategorized')} />

        <div style={{ borderTop: '1px solid #f1f3f5', margin: '8px 0' }} />

        {categories.map(cat => (
          <div key={cat.id} style={{ position: 'relative' }}>
            {editingCategoryId === cat.id ? (
              <div style={{ display: 'flex', gap: '4px', padding: '4px 8px' }}>
                <input
                  autoFocus
                  value={editingCategoryName}
                  onChange={(e) => setEditingCategoryName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveEditCategory()}
                  style={{ flex: 1, padding: '6px 8px', fontSize: '13px', border: '1px solid #ced4da', borderRadius: '4px', outline: 'none', minWidth: 0 }}
                />
                <button onClick={saveEditCategory} style={btnIcon}><i className="mdi mdi-check" /></button>
              </div>
            ) : (
              <div className="snb-row" style={{ display: 'flex', alignItems: 'center', borderRadius: '6px', backgroundColor: selectedCategory === cat.id ? '#e7f5ff' : 'transparent' }}>
                <div
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{ flex: 1, padding: '8px 8px', fontSize: '14px', cursor: 'pointer', color: selectedCategory === cat.id ? '#1971c2' : '#495057', fontWeight: selectedCategory === cat.id ? '600' : '400', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >
                  {cat.name} <span style={{ color: '#adb5bd', fontSize: '12px' }}>{countFor(cat.id)}</span>
                </div>
                <button title="수정" onClick={() => startEditCategory(cat)} style={btnIcon}><i className="mdi mdi-pencil-outline" /></button>
                <button title="삭제" onClick={() => deleteCategory(cat.id)} style={{ ...btnIcon, color: '#e03131' }}><i className="mdi mdi-trash-can-outline" /></button>
              </div>
            )}
          </div>
        ))}

        <div style={{ display: 'flex', gap: '4px', marginTop: '8px', padding: '0 4px' }}>
          <input
            placeholder="카테고리 추가..."
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCategory()}
            style={{ flex: 1, padding: '7px 8px', fontSize: '13px', border: '1px solid #ced4da', borderRadius: '4px', outline: 'none', minWidth: 0 }}
          />
          <button onClick={addCategory} style={{ ...btnIcon, color: '#1971c2' }}><i className="mdi mdi-plus" /></button>
        </div>
      </aside>

      {/* ===== 메인 ===== */}
      <main style={{ flex: 1, padding: '20px', minWidth: 0 }}>
        <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #dee2e6' }}>
          <h1 style={{ fontSize: '24px', margin: '0 0 8px 0', color: '#212529' }}>SIHM 플랫폼 아이콘 카탈로그</h1>
          <p style={{ color: '#6c757d', margin: 0, fontSize: '14px' }}>총 {iconData.length}개의 표준 자산</p>
        </div>

        <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="아이콘명, 파일명, 용도, 태그 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, padding: '10px 16px', fontSize: '14px', borderRadius: '6px', border: '1px solid #ced4da', outline: 'none' }}
          />
          <div style={{ fontSize: '14px', color: '#495057', whiteSpace: 'nowrap' }}>결과: {filteredIcons.length}개</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {filteredIcons.map(icon => {
            return (
              <div
                key={icon.id}
                onClick={() => setSelectedIcon(icon)}
                style={{ backgroundColor: '#fff', border: selectedIcon && selectedIcon.id === icon.id ? '2px solid #1971c2' : '1px solid #e9ecef', borderRadius: '8px', padding: '16px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <div style={{ fontSize: '36px', color: '#495057', marginBottom: '12px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className={`mdi mdi-${icon.filename}`}></i>
                </div>
                <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px', color: '#212529' }}>{icon.id}. {icon.name}</div>
                <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#868e96' }}>{icon.filename}</div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ===== 우측 상세 패널 ===== */}
      {selectedIcon && (
        <IconDetailPanel
          icon={selectedIcon}
          meta={getMeta(selectedIcon.filename)}
          categories={categories}
          onClose={() => setSelectedIcon(null)}
          onCategoryChange={(catId) => setIconCategory(selectedIcon.filename, catId)}
          onAddTag={(tag) => addTag(selectedIcon.filename, tag)}
          onRemoveTag={(tag) => removeTag(selectedIcon.filename, tag)}
          onCopy={handleCopy}
        />
      )}

      {toastMessage && (
        <div style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: '#212529', color: '#fff', padding: '10px 16px', borderRadius: '6px', fontSize: '13px', zIndex: 2000, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

const btnIcon = {
  border: 'none', background: 'transparent', cursor: 'pointer', color: '#868e96',
  fontSize: '15px', padding: '6px 6px', display: 'flex', alignItems: 'center', borderRadius: '4px',
};

function SnbItem({ label, active, count, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', color: active ? '#1971c2' : '#495057', fontWeight: active ? '600' : '400', backgroundColor: active ? '#e7f5ff' : 'transparent' }}
    >
      <span>{label}</span>
      <span style={{ color: '#adb5bd', fontSize: '12px' }}>{count}</span>
    </div>
  );
}

function IconDetailPanel({ icon, meta, categories, onClose, onCategoryChange, onAddTag, onRemoveTag, onCopy }) {
  const [svg, setSvg] = useState('');
  const [svgState, setSvgState] = useState('loading'); // loading | ok | error
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    let cancelled = false;
    setSvgState('loading');
    setSvg('');
    fetch(`https://cdn.jsdelivr.net/npm/@mdi/svg/svg/${icon.filename}.svg`)
      .then(r => { if (!r.ok) throw new Error('not found'); return r.text(); })
      .then(text => { if (!cancelled) { setSvg(text); setSvgState('ok'); } })
      .catch(() => { if (!cancelled) setSvgState('error'); });
    return () => { cancelled = true; };
  }, [icon.filename]);

  return (
    <aside style={{ width: '340px', flexShrink: 0, backgroundColor: '#fff', borderLeft: '1px solid #dee2e6', padding: '20px', boxSizing: 'border-box', position: 'sticky', top: 0, alignSelf: 'flex-start', height: '100vh', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#868e96', textTransform: 'uppercase', letterSpacing: '0.5px' }}>아이콘 정보</div>
        <button onClick={onClose} style={{ ...btnIcon, fontSize: '20px' }}><i className="mdi mdi-close-circle-outline" /></button>
      </div>

      {/* 1. ID + 아이콘 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '90px', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: '16px', padding: '12px', color: '#343a40' }}>
        <div style={{ fontSize: '56px', lineHeight: 1 }}>
          <i className={`mdi mdi-${icon.filename}`}></i>
        </div>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#212529', marginTop: '8px' }}>{icon.id}. {icon.name}</div>
      </div>

      {/* 2. 파일명 */}
      <Field label="파일명">
        <div style={{ fontFamily: 'monospace', fontSize: '13px', color: '#343a40', backgroundColor: '#f1f3f5', padding: '6px 10px', borderRadius: '6px' }}>{icon.filename}</div>
      </Field>

      {/* 3. SVG 코드 */}
      <Field label="SVG 코드">
        {svgState === 'loading' && <div style={{ fontSize: '13px', color: '#adb5bd' }}>불러오는 중...</div>}
        {svgState === 'error' && <div style={{ fontSize: '13px', color: '#e03131' }}>SVG를 찾을 수 없습니다 ({icon.filename}).</div>}
        {svgState === 'ok' && (
          <>
            <pre style={{ fontSize: '11px', fontFamily: 'monospace', backgroundColor: '#f1f3f5', padding: '10px', borderRadius: '6px', overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all', maxHeight: '160px', overflowY: 'auto', margin: '0 0 8px 0', color: '#343a40' }}>{svg}</pre>
            <button
              onClick={() => onCopy(svg, 'SVG 코드')}
              style={{ width: '100%', padding: '8px', fontSize: '13px', border: '1px solid #1971c2', backgroundColor: '#1971c2', color: '#fff', borderRadius: '6px', cursor: 'pointer' }}
            >
              <i className="mdi mdi-content-copy" /> SVG 복사
            </button>
          </>
        )}
      </Field>

      {/* 4. 카테고리 */}
      <Field label="카테고리">
        <select
          value={meta.category || ''}
          onChange={(e) => onCategoryChange(e.target.value)}
          style={{ width: '100%', padding: '8px 10px', fontSize: '14px', border: '1px solid #ced4da', borderRadius: '6px', outline: 'none', backgroundColor: '#fff' }}
        >
          <option value="">미분류</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        {categories.length === 0 && <div style={{ fontSize: '11px', color: '#adb5bd', marginTop: '4px' }}>좌측에서 카테고리를 먼저 추가하세요.</div>}
      </Field>

      {/* 태그 */}
      <Field label="태그">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
          {meta.tags.length === 0 && <span style={{ fontSize: '12px', color: '#adb5bd' }}>등록된 태그 없음</span>}
          {meta.tags.map(t => (
            <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#1971c2', backgroundColor: '#e7f5ff', padding: '3px 8px', borderRadius: '12px' }}>
              {t}
              <i className="mdi mdi-close" style={{ cursor: 'pointer', fontSize: '13px' }} onClick={() => onRemoveTag(t)} />
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <input
            placeholder="태그 입력 후 Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { onAddTag(tagInput); setTagInput(''); } }}
            style={{ flex: 1, padding: '7px 10px', fontSize: '13px', border: '1px solid #ced4da', borderRadius: '6px', outline: 'none', minWidth: 0 }}
          />
          <button onClick={() => { onAddTag(tagInput); setTagInput(''); }} style={{ ...btnIcon, color: '#1971c2' }}><i className="mdi mdi-plus" /></button>
        </div>
      </Field>
    </aside>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <div style={{ fontSize: '12px', fontWeight: '600', color: '#868e96', marginBottom: '6px' }}>{label}</div>
      {children}
    </div>
  );
}

export default App;
