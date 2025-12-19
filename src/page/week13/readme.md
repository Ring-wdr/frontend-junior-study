# Week 13 — 병렬 처리(Web Workers) & 오프라인 전략(PWA) & IndexedDB

**목표:**

브라우저에서 가능한 **멀티스레딩(Web Worker)**,

오프라인에서도 동작하는 **PWA(Service Worker + Cache Storage)**,

로컬 DB인 **IndexedDB**까지

프론트엔드 고급 개발자가 반드시 알아야 하는 성능·안정성 기술의 기반을 다진다.

---

## 1. 학습 핵심 포인트

---

## 🔹 1) Web Worker — 브라우저의 병렬 처리

자바스크립트는 싱글 스레드지만,

브라우저는 Worker 스레드를 제공해 **CPU 무거운 작업을 offload**할 수 있다.

### ✔ 언제 쓰는가?

- 대량 데이터 파싱(JSON 5~50MB)
- 이미지 변환
- 비디오 처리(FFmpeg WASM)
- 암호화/압축
- 머신러닝 추론
- 메인 스레드 프리즈 방지

### ✔ 기본 사용

**main.js**

```jsx
const worker = new Worker("./worker.js");
worker.postMessage({ count: 50000000 });
worker.onmessage = (e) => console.log(e.data);

```

**worker.js**

```jsx
onmessage = (e) => {
  let sum = 0;
  for (let i = 0; i < e.data.count; i++) sum += i;
  postMessage(sum);
};

```

### ✔ 핵심 개념

- Worker는 DOM에 접근 불가
- postMessage 기반 직렬화 비용 존재
- Transferable Objects(ArrayBuffer)로 복사 비용 제거 가능
- SharedArrayBuffer로 메모리 공유 가능(고급)

---

## 🔹 2) Service Worker & PWA — 오프라인 웹앱의 핵심

Service Worker는 브라우저가 제공하는 **프로그램 가능한 프록시 레이어**.

### ✔ 역할

- 네트워크 요청 가로채기(fetch event)
- Cache Storage 활용
- 백그라운드 동기화
- 푸시 알림
- 오프라인 페이지 제공

### ✔ PWA 구성 요소

1. 웹앱 매니페스트 (manifest.json)
2. Service Worker(sw.js)
3. HTTPS 환경

### ✔ 간단한 캐싱 전략 예시

```jsx
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});

```

### ✔ 대표 캐시 전략

- Cache First
- Network First
- Stale-While-Revalidate
- Network Only
- Cache Only

**Workbox**를 사용하면 캐시 전략을 유연하고 선언적으로 구성 가능.

---

## 🔹 3) IndexedDB — 브라우저 내 로컬 데이터베이스

IndexedDB는 **수 MB~GB까지 저장 가능한 비관계형 DB**

브라우저 로컬에 오프라인 데이터를 저장하기에 최적.

### ✔ 언제 쓰는가?

- 오프라인 우선 앱
- 동기화 기반 앱(노트/할일/문서 편집기)
- 이미지/파일 저장
- React Query의 persist storage
- Web Worker + IndexedDB 조합하여 background sync 처리

### ✔ API 특징

- 비동기
- 트랜잭션 기반
- object store 개념
- vanilla API는 매우 verbose → **idb 라이브러리** 추천

### ✔ 간단 예시 (idb 사용)

```jsx
import { openDB } from "idb";

const db = await openDB("app-db", 1, {
  upgrade(db) {
    db.createObjectStore("todos", { keyPath: "id" });
  }
});

await db.put("todos", { id: 1, text: "hello" });
const item = await db.get("todos", 1);

```

---

## 🔹 4) Offline-first 전략

### ✔ online/offline 감지

```jsx
window.addEventListener("online", fn);
window.addEventListener("offline", fn);

```

### ✔ Background Sync

- 네트워크가 끊길 때 요청을 큐에 담아두고
- 연결 복구되면 자동 재요청
- Service Worker의 sync 이벤트 사용

### ✔ 오프라인 UX 원칙

- "오프라인 모드" 명확히 표시
- 캐시된 데이터임을 알리기
- 장애 복구 시 사용자에게 재시도 옵션 제공
- 영구 오프라인 데이터는 IndexedDB 우선

---

## 🔹 5) Web Worker + Service Worker + IndexedDB 조합 패턴

실무에서 가장 강력한 구조:

1. Web Worker: CPU heavy 작업 수행
2. IndexedDB: 대량 데이터 저장
3. Service Worker: 네트워크 실패 대비

예시:

- 이미지 편집 웹앱
- 오프라인 필기 앱
- 백업/동기화 기능이 있는 모바일 웹앱

---

## 2. 추천 학습 자료 (정상 링크)

### 📘 Web Worker

https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers

### 📘 Service Worker & PWA

https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

https://web.dev/learn/pwa/

### 📘 Workbox (PWA 프레임워크)

https://developer.chrome.com/docs/workbox/

### 📘 IndexedDB

https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API

### 📘 idb 라이브러리

https://github.com/jakearchibald/idb

---

## 3. Week 12 실습 로드맵 (2시간/일 기준)

### Day 1 — Web Worker 기초 실습

- 무거운 연산을 main thread vs worker 비교 체험
- Transferable Objects 실습

### Day 2 — Worker 기반 이미지 처리

- 색상 변환, 썸네일 생성 등을 Worker에서 처리해보기

### Day 3 — Service Worker 설치 & 캐싱

- fetch 이벤트 핸들러 작성
- Cache First · Network First 전략 실험

### Day 4 — Workbox 도입

- runtimeCaching 정의
- stale-while-revalidate 전략 적용
- precache manifest 생성

### Day 5 — IndexedDB 사용

- idb로 todo DB 구성
- offline → online 동기화 시나리오 설계

### Day 6 — Offline-first 앱 조합

- Worker + IDB + Service Worker 연결
- 오프라인에서 생성한 데이터를 online 때 자동 sync

### Day 7 — 미니 프로젝트

예시:

- 오프라인 메모 앱
- 이미지 편집 + 저장 앱
- 오프라인 게시글 작성 → 온라인 자동 업로드

---

## 4. Week 12 최종 목표

- Web Worker로 CPU 부하를 분산할 수 있다
- PWA(Service Worker)로 오프라인에서도 동작하는 앱을 만들 수 있다
- IndexedDB로 대량 데이터를 로컬에 저장하고 sync 구조를 설계할 수 있다
- “병렬 처리 · 캐싱 · 로컬 DB” 를 통합해 **고급 웹앱 아키텍처**를 만들 수 있다