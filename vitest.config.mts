/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
        alias: {
            '@/': path.resolve(__dirname, './src'),
            '@/components': path.resolve(__dirname, './src/app/components'),
            '@/context': path.resolve(__dirname, './src/app/context'),
            '@/utils': path.resolve(__dirname, './src/app/utils'),
        }
    }
})