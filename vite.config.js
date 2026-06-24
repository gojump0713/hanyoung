import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages는 https://gojump0713.github.io/hanyoung/ 경로로 서비스되므로 base를 '/hanyoung/'로 둡니다.
// Vercel 등 루트(/)로 배포할 경우 환경변수 DEPLOY_TARGET=root 로 빌드하면 base가 '/'가 됩니다.
const base = process.env.DEPLOY_TARGET === 'root' ? '/' : '/hanyoung/'

export default defineConfig({
  base,
  plugins: [react()],
})
