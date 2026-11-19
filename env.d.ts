/// <reference types="vite/client" />

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'vue-router' {
  import type { Component } from 'vue'

  export function createRouter(options: any): any
  export function createWebHistory(base?: string): any
  export function createWebHashHistory(base?: string): any
  export function createMemoryHistory(base?: string): any
  export function useRoute(): any
  export function useRouter(): any
  export const RouterView: Component
  export const RouterLink: Component
  export type RouteRecordRaw = any
}

