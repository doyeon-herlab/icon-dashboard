import { createClient } from '@supabase/supabase-js';

// 공개(anon) 키 — 정적 사이트라 노출되지만, Supabase RLS 정책으로
// categories / icon_meta 두 테이블에만 접근이 허용되어 있습니다.
const SUPABASE_URL = 'https://fuducplooiyrzhkwsdni.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1ZHVjcGxvb2l5cnpoa3dzZG5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwNjQ2NjMsImV4cCI6MjA5NzY0MDY2M30.LiDYiKZ2fK-25K4bxctilMBxaKZ1jfPIWic9AGCIusY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
