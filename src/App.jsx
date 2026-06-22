import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';

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

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // 아이콘 목록 (DB) — { id, name, purpose, filename }
  const [icons, setIcons] = useState([]);
  // 카테고리 목록 (CRUD) — { id, name }
  const [categories, setCategories] = useState([]);
  // 아이콘별 메타데이터 (카테고리/태그) — { [filename]: { category: categoryId|null, tags: string[] } }
  const [meta, setMeta] = useState({});

  const [showAddIcon, setShowAddIcon] = useState(false);

  // 'all' | 'uncategorized' | categoryId
  const [selectedCategory, setSelectedCategory] = useState('all');
  // 우측 패널에 표시할 아이콘
  const [selectedIcon, setSelectedIcon] = useState(null);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2000);
  };

  // ---- 초기 로드: Supabase에서 아이콘 + 카테고리 + 메타 가져오기 ----
  useEffect(() => {
    (async () => {
      let iconRes = await supabase.from('icons').select('*').order('id');
      // icons 테이블이 비어있으면 코드에 내장된 기본 78개를 1회 시딩
      if (!iconRes.error && (iconRes.data || []).length === 0) {
        await supabase.from('icons').upsert(iconData, { onConflict: 'filename', ignoreDuplicates: true });
        iconRes = await supabase.from('icons').select('*').order('id');
      }

      const [catRes, metaRes] = await Promise.all([
        supabase.from('categories').select('*').order('created_at'),
        supabase.from('icon_meta').select('*'),
      ]);

      if (iconRes.error) {
        // icons 테이블이 아직 없을 때: 내장 데이터로 폴백(추가는 불가)
        showToast('아이콘 테이블이 없어 기본 목록을 표시합니다');
        setIcons(iconData);
      } else {
        setIcons(iconRes.data || []);
      }

      if (!catRes.error) setCategories(catRes.data || []);
      if (!metaRes.error) {
        const m = {};
        (metaRes.data || []).forEach(row => {
          m[row.filename] = { category: row.category_id, tags: row.tags || [] };
        });
        setMeta(m);
      }
      setLoading(false);
    })();
  }, []);

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text).then(() => showToast(`${label} 복사 완료!`));
  };

  const getMeta = (filename) => meta[filename] || { category: null, tags: [] };

  // icon_meta 한 행을 DB에 반영(upsert)하고 로컬 상태도 갱신
  const upsertMeta = async (filename, next) => {
    setMeta(prev => ({ ...prev, [filename]: next }));
    const { error } = await supabase.from('icon_meta').upsert({
      filename,
      category_id: next.category,
      tags: next.tags,
    });
    if (error) showToast('저장 실패: ' + error.message);
  };

  // ---- 카테고리 CRUD ----
  const addCategory = async () => {
    const name = newCategoryName.trim();
    if (!name) return;
    setNewCategoryName('');
    const { data, error } = await supabase.from('categories').insert({ name }).select().single();
    if (error) { showToast('추가 실패: ' + error.message); return; }
    setCategories(prev => [...prev, data]);
  };

  const startEditCategory = (cat) => {
    setEditingCategoryId(cat.id);
    setEditingCategoryName(cat.name);
  };

  const saveEditCategory = async () => {
    const name = editingCategoryName.trim();
    const id = editingCategoryId;
    setEditingCategoryId(null);
    setEditingCategoryName('');
    if (!name) return;
    setCategories(prev => prev.map(c => c.id === id ? { ...c, name } : c));
    const { error } = await supabase.from('categories').update({ name }).eq('id', id);
    if (error) showToast('수정 실패: ' + error.message);
  };

  const deleteCategory = async (id) => {
    if (!window.confirm('이 카테고리를 삭제할까요? 이 카테고리에 속한 아이콘은 미분류로 이동합니다.')) return;
    setCategories(prev => prev.filter(c => c.id !== id));
    // DB의 FK(on delete set null) 덕분에 icon_meta.category_id는 자동으로 null 처리됨 → 로컬도 동기화
    setMeta(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(fn => {
        if (next[fn].category === id) next[fn] = { ...next[fn], category: null };
      });
      return next;
    });
    if (selectedCategory === id) setSelectedCategory('all');
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) showToast('삭제 실패: ' + error.message);
  };

  // ---- 아이콘 메타 수정 ----
  const setIconCategory = (filename, categoryId) => {
    upsertMeta(filename, { ...getMeta(filename), category: categoryId || null });
  };

  const addTag = (filename, tag) => {
    const t = tag.trim();
    if (!t) return;
    const cur = getMeta(filename);
    if (cur.tags.includes(t)) return;
    upsertMeta(filename, { ...cur, tags: [...cur.tags, t] });
  };

  const removeTag = (filename, tag) => {
    const cur = getMeta(filename);
    upsertMeta(filename, { ...cur, tags: cur.tags.filter(x => x !== tag) });
  };

  // ---- 아이콘 추가/삭제 ----
  const addIcon = async ({ name, filename, category, tags }) => {
    const nextId = icons.reduce((mx, i) => Math.max(mx, i.id), 0) + 1;
    const row = { id: nextId, name, filename, purpose: null };
    const { data, error } = await supabase.from('icons').insert(row).select().single();
    if (error) {
      showToast(error.code === '23505' ? '이미 등록된 파일명입니다' : '추가 실패: ' + error.message);
      return false;
    }
    setIcons(prev => [...prev, data]);
    // 카테고리/태그가 입력됐으면 메타도 함께 저장
    if (category || (tags && tags.length)) {
      await upsertMeta(filename, { category: category || null, tags: tags || [] });
    }
    showToast(`"${name}" 아이콘 추가됨`);
    return true;
  };

  const updateIcon = async (icon, fields) => {
    const newName = (fields.name || '').trim();
    const newFilename = (fields.filename || '').trim().toLowerCase();
    if (!newName || !newFilename) { showToast('이름과 파일명을 입력하세요'); return false; }
    if (newFilename !== icon.filename && icons.some(i => i.filename === newFilename)) {
      showToast('이미 등록된 파일명입니다'); return false;
    }
    const { data, error } = await supabase
      .from('icons').update({ name: newName, filename: newFilename }).eq('id', icon.id).select().single();
    if (error) { showToast('수정 실패: ' + error.message); return false; }

    // 파일명이 바뀌면 메타(카테고리/태그) 키도 이전
    if (newFilename !== icon.filename) {
      const cur = meta[icon.filename];
      if (cur) {
        await supabase.from('icon_meta').delete().eq('filename', icon.filename);
        await supabase.from('icon_meta').upsert({ filename: newFilename, category_id: cur.category, tags: cur.tags });
        setMeta(prev => { const n = { ...prev }; delete n[icon.filename]; n[newFilename] = cur; return n; });
      }
    }
    setIcons(prev => prev.map(i => i.id === icon.id ? data : i));
    setSelectedIcon(data);
    showToast('수정되었습니다');
    return true;
  };

  const deleteIcon = async (icon) => {
    if (!window.confirm(`"${icon.name}" 아이콘을 목록에서 삭제할까요?`)) return;
    setIcons(prev => prev.filter(i => i.id !== icon.id));
    if (selectedIcon && selectedIcon.id === icon.id) setSelectedIcon(null);
    const { error } = await supabase.from('icons').delete().eq('id', icon.id);
    if (error) showToast('삭제 실패: ' + error.message);
    // 메타도 정리
    await supabase.from('icon_meta').delete().eq('filename', icon.filename);
    setMeta(prev => { const n = { ...prev }; delete n[icon.filename]; return n; });
  };

  // ---- 필터링 ----
  const term = searchTerm.toLowerCase();
  const filteredIcons = icons.filter(icon => {
    const m = getMeta(icon.filename);
    if (selectedCategory === 'uncategorized' && m.category) return false;
    if (selectedCategory !== 'all' && selectedCategory !== 'uncategorized' && m.category !== selectedCategory) return false;
    if (!term) return true;
    return (
      (icon.name || '').toLowerCase().includes(term) ||
      (icon.filename || '').toLowerCase().includes(term) ||
      (icon.purpose || '').toLowerCase().includes(term) ||
      m.tags.some(t => t.toLowerCase().includes(term))
    );
  });

  const countFor = (catId) => icons.filter(i => {
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
        <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #dee2e6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <h1 style={{ fontSize: '24px', margin: 0, color: '#212529', flexShrink: 0 }}>SIHM 플랫폼 아이콘 카탈로그</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, justifyContent: 'flex-end', minWidth: 0 }}>
            <input
              type="text"
              placeholder="아이콘명, 파일명, 태그 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1, maxWidth: '360px', minWidth: '180px', padding: '10px 16px', fontSize: '14px', borderRadius: '6px', border: '1px solid #ced4da', outline: 'none' }}
            />
            <button
              onClick={() => setShowAddIcon(true)}
              style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 16px', fontSize: '14px', fontWeight: '600', color: '#fff', backgroundColor: '#1971c2', border: 'none', borderRadius: '6px', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              <i className="mdi mdi-plus" /> 아이콘 추가
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#495057' }}>{loading ? '불러오는 중...' : `결과: ${filteredIcons.length}개`}</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
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
          onDelete={() => deleteIcon(selectedIcon)}
          onUpdate={(fields) => updateIcon(selectedIcon, fields)}
          existingFilenames={icons.map(i => i.filename)}
        />
      )}

      {showAddIcon && (
        <AddIconModal
          existingFilenames={icons.map(i => i.filename)}
          categories={categories}
          onClose={() => setShowAddIcon(false)}
          onAdd={addIcon}
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

function IconDetailPanel({ icon, meta, categories, onClose, onCategoryChange, onAddTag, onRemoveTag, onCopy, onDelete, onUpdate, existingFilenames }) {
  const [svg, setSvg] = useState('');
  const [svgState, setSvgState] = useState('loading'); // loading | ok | error
  const [tagInput, setTagInput] = useState('');

  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(icon.name);
  const [editFilename, setEditFilename] = useState(icon.filename);
  const [saving, setSaving] = useState(false);

  // 다른 아이콘을 선택하면 편집 상태 초기화
  useEffect(() => {
    setEditing(false);
    setEditName(icon.name);
    setEditFilename(icon.filename);
  }, [icon.id]);

  // 편집 중에는 입력한 파일명, 아니면 현재 파일명으로 SVG/미리보기
  const previewFilename = (editing ? editFilename.trim().toLowerCase() : icon.filename);

  useEffect(() => {
    if (editing) return; // 편집 중에는 SVG 재요청 생략
    let cancelled = false;
    setSvgState('loading');
    setSvg('');
    fetch(`https://cdn.jsdelivr.net/npm/@mdi/svg/svg/${icon.filename}.svg`)
      .then(r => { if (!r.ok) throw new Error('not found'); return r.text(); })
      .then(text => { if (!cancelled) { setSvg(text); setSvgState('ok'); } })
      .catch(() => { if (!cancelled) setSvgState('error'); });
    return () => { cancelled = true; };
  }, [icon.filename, editing]);

  const efn = editFilename.trim().toLowerCase();
  const dup = efn && efn !== icon.filename && existingFilenames.includes(efn);
  const canSave = editName.trim() && efn && !dup && !saving;

  const save = async () => {
    if (!canSave) return;
    setSaving(true);
    const ok = await onUpdate({ name: editName.trim(), filename: efn });
    setSaving(false);
    if (ok) setEditing(false);
  };

  return (
    <aside style={{ width: '340px', backgroundColor: '#fff', borderLeft: '1px solid #dee2e6', padding: '20px', boxSizing: 'border-box', position: 'fixed', top: 0, right: 0, height: '100vh', overflowY: 'auto', zIndex: 1500, boxShadow: '-4px 0 16px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#868e96', textTransform: 'uppercase', letterSpacing: '0.5px' }}>아이콘 정보</div>
        <button onClick={onClose} style={{ ...btnIcon, fontSize: '20px' }}><i className="mdi mdi-close-circle-outline" /></button>
      </div>

      {/* 1. ID + 아이콘 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '90px', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: '16px', padding: '12px', color: '#343a40' }}>
        <div style={{ fontSize: '56px', lineHeight: 1 }}>
          <i className={`mdi mdi-${previewFilename || 'help-circle-outline'}`}></i>
        </div>
        {editing ? (
          <input value={editName} onChange={(e) => setEditName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && save()}
            style={{ ...modalInput, marginTop: '10px', textAlign: 'center' }} placeholder="아이콘명" />
        ) : (
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#212529', marginTop: '8px' }}>{icon.id}. {icon.name}</div>
        )}
      </div>

      {/* 2. 파일명 */}
      <Field label="파일명">
        {editing ? (
          <>
            <input value={editFilename} onChange={(e) => setEditFilename(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && save()}
              style={{ ...modalInput, fontFamily: 'monospace' }} placeholder="예: bell-outline" />
            <div style={{ height: '16px', fontSize: '11px', color: '#e03131', marginTop: '4px' }}>{dup ? '이미 등록된 파일명입니다.' : ''}</div>
          </>
        ) : (
          <div style={{ fontFamily: 'monospace', fontSize: '13px', color: '#343a40', backgroundColor: '#f1f3f5', padding: '6px 10px', borderRadius: '6px' }}>{icon.filename}</div>
        )}
      </Field>

      <div style={{ marginBottom: '18px' }}>
        {editing ? (
          <button onClick={save} disabled={!canSave} style={{ padding: '6px 14px', fontSize: '13px', fontWeight: '600', border: 'none', backgroundColor: canSave ? '#1971c2' : '#adb5bd', color: '#fff', borderRadius: '6px', cursor: canSave ? 'pointer' : 'not-allowed' }}>{saving ? '저장 중...' : '저장'}</button>
        ) : (
          <button onClick={() => setEditing(true)} style={{ padding: '6px 14px', fontSize: '13px', fontWeight: '600', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#495057', borderRadius: '6px', cursor: 'pointer' }}>수정</button>
        )}
      </div>

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

      <div style={{ borderTop: '1px solid #f1f3f5', paddingTop: '16px', marginTop: '4px' }}>
        <button
          onClick={onDelete}
          style={{ width: '100%', padding: '8px', fontSize: '13px', border: '1px solid #ffc9c9', backgroundColor: '#fff5f5', color: '#e03131', borderRadius: '6px', cursor: 'pointer' }}
        >
          <i className="mdi mdi-trash-can-outline" /> 아이콘 삭제
        </button>
      </div>
    </aside>
  );
}

function AddIconModal({ existingFilenames, categories, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [filename, setFilename] = useState('');
  const [category, setCategory] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fn = filename.trim().toLowerCase();
  const dup = fn && existingFilenames.includes(fn);
  const canSubmit = name.trim() && fn && !dup && !submitting;

  const submit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    const tags = tagsText.split(',').map(t => t.trim()).filter(Boolean);
    const ok = await onAdd({ name: name.trim(), filename: fn, category: category || null, tags });
    setSubmitting(false);
    if (ok) onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: '420px', maxWidth: '90vw', backgroundColor: '#fff', borderRadius: '10px', padding: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', margin: 0, color: '#212529' }}>아이콘 추가</h2>
          <button onClick={onClose} style={{ ...btnIcon, fontSize: '20px' }}><i className="mdi mdi-close-circle-outline" /></button>
        </div>

        {/* 미리보기 — 고정 높이로 출렁임 방지 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '14px', marginBottom: '18px', height: '72px', boxSizing: 'border-box' }}>
          <div style={{ width: '48px', height: '48px', flexShrink: 0, fontSize: '40px', lineHeight: '48px', color: '#343a40', textAlign: 'center' }}>
            <i className={`mdi mdi-${fn || 'help-circle-outline'}`} />
          </div>
          <div style={{ fontSize: '12px', color: '#868e96', lineHeight: 1.5 }}>
            MDI 파일명을 입력하면 미리보기가 표시됩니다.
            <div><a href="https://pictogrammers.com/library/mdi/" target="_blank" rel="noreferrer" style={{ color: '#1971c2' }}>MDI 아이콘 찾기 ↗</a></div>
          </div>
        </div>

        <Field label="아이콘명 *">
          <input autoFocus value={name} onChange={(e) => setName(e.target.value)} style={modalInput} placeholder="예: 알림" />
        </Field>
        <Field label="파일명 *">
          <input value={filename} onChange={(e) => setFilename(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()} style={modalInput} placeholder="예: bell-outline" />
          {/* 높이 고정용 메시지 영역 */}
          <div style={{ height: '16px', fontSize: '11px', color: '#e03131', marginTop: '4px' }}>{dup ? '이미 등록된 파일명입니다.' : ''}</div>
        </Field>
        <Field label="카테고리">
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ ...modalInput, backgroundColor: '#fff' }}>
            <option value="">미분류</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </Field>
        <Field label="태그">
          <input value={tagsText} onChange={(e) => setTagsText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()} style={modalInput} placeholder="예: 알림, 벨, notification" />
        </Field>

        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '10px', fontSize: '14px', border: '1px solid #ced4da', backgroundColor: '#fff', color: '#495057', borderRadius: '6px', cursor: 'pointer' }}>취소</button>
          <button onClick={submit} disabled={!canSubmit} style={{ flex: 1, padding: '10px', fontSize: '14px', border: 'none', backgroundColor: canSubmit ? '#1971c2' : '#adb5bd', color: '#fff', borderRadius: '6px', cursor: canSubmit ? 'pointer' : 'not-allowed' }}>{submitting ? '추가 중...' : '추가'}</button>
        </div>
      </div>
    </div>
  );
}

const modalInput = { width: '100%', padding: '9px 12px', fontSize: '14px', border: '1px solid #ced4da', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' };

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <div style={{ fontSize: '12px', fontWeight: '600', color: '#868e96', marginBottom: '6px' }}>{label}</div>
      {children}
    </div>
  );
}

export default App;
