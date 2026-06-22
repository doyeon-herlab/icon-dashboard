import React, { useState } from 'react';

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

  const handleCopy = (filename) => {
    navigator.clipboard.writeText(filename).then(() => {
      setToastMessage(`"${filename}" 가 복사되었습니다!`);
      setTimeout(() => setToastMessage(''), 2000);
    });
  };

  const filteredIcons = iconData.filter(icon => 
    icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    icon.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    icon.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css" />
      
      <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #dee2e6' }}>
        <h1 style={{ fontSize: '24px', margin: '0 0 8px 0', color: '#212529' }}>SIHM 플랫폼 아이콘 카탈로그</h1>
        <p style={{ color: '#6c757d', margin: 0, fontSize: '14px' }}>총 {iconData.length}개의 표준 자산</p>
      </div>

      <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="아이콘명, 파일명, 용도 검색..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px 16px', fontSize: '14px', borderRadius: '6px', border: '1px solid #ced4da', outline: 'none' }}
        />
        <div style={{ fontSize: '14px', color: '#495057', whiteSpace: 'nowrap' }}>결과: {filteredIcons.length}개</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
        {filteredIcons.map(icon => (
          <div 
            key={icon.id} 
            onClick={() => handleCopy(icon.filename)}
            style={{ backgroundColor: '#fff', border: '1px solid #e9ecef', borderRadius: '8px', padding: '16px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            <div style={{ fontSize: '36px', color: '#495057', marginBottom: '12px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className={`mdi mdi-${icon.filename}`}></i>
            </div>
            <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px', color: '#212529' }}>{icon.name}</div>
            <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#6c757d', backgroundColor: '#f1f3f5', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginBottom: '8px' }}>{icon.filename}</div>
            <div style={{ fontSize: '12px', color: '#868e96', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', minHeight: '32px' }}>{icon.purpose}</div>
          </div>
        ))}
      </div>

      {toastMessage && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', background: '#212529', color: '#fff', padding: '10px 16px', borderRadius: '6px', fontSize: '13px', zIndex: 1000, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;
