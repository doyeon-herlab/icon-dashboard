import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/icon-dashboard/', // GitHub 레포 이름과 동일하게 설정
})
