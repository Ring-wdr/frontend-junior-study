# Week 18: WebAssembly와 고성능 웹 애플리케이션

## 학습 목표

**WebAssembly(Wasm)**의 개념과 동작 원리를 이해하고, 브라우저에서 고성능 연산이 필요한 영역을 식별하여 Wasm을 효과적으로 적용하는 방법을 학습합니다. 비디오 편집, 3D 렌더링, 과학 계산, 암호화 등 CPU 집약적인 작업을 웹에서 수행하는 기술을 체득합니다.

**대상**: JavaScript 기초를 아는 초심자 ~ 성능 최적화에 관심 있는 주니어 개발자

---

## 1. WebAssembly란 무엇인가?

**핵심 개념**

- **이진 명령어 포맷**: 브라우저에서 네이티브에 가까운 속도로 실행되는 저수준 바이너리 포맷
- **언어 독립적**: C, C++, Rust, Go 등 다양한 언어에서 컴파일 가능
- **JavaScript 보완**: JavaScript를 대체하는 것이 아닌 성능 병목 구간을 오프로드
- **보안 샌드박스**: 브라우저의 보안 모델 내에서 안전하게 실행

**WebAssembly의 역사**

```
2015년 - WebAssembly 프로젝트 발표 (Mozilla, Google, Microsoft, Apple)
2017년 - 주요 브라우저 MVP 지원 시작
2019년 - W3C 공식 웹 표준으로 채택
2020년~ - SIMD, Threads, GC 등 확장 기능 추가
```

**JavaScript vs WebAssembly 성능 비교**

```javascript
// JavaScript - 해석 및 JIT 컴파일 과정 필요
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.time("JS");
fibonacci(40);
console.timeEnd("JS"); // ~1000ms+
```

```c
// C로 작성 → WebAssembly로 컴파일
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
// Wasm으로 컴파일 후 실행: ~100ms (약 10배 빠름)
```

**언제 WebAssembly를 사용해야 할까?**

| 적합한 경우 | 부적합한 경우 |
|-------------|---------------|
| CPU 집약적 계산 (이미지/비디오 처리) | 간단한 DOM 조작 |
| 3D 렌더링, 게임 엔진 | 일반적인 CRUD 애플리케이션 |
| 암호화, 해싱 연산 | 네트워크 I/O 위주 작업 |
| 과학/수학적 시뮬레이션 | 이미 충분히 빠른 로직 |
| 기존 C/C++/Rust 라이브러리 포팅 | JavaScript로 충분한 경우 |

**학습 자료**
- [WebAssembly 공식 사이트](https://webassembly.org/)
- [MDN - WebAssembly 개념](https://developer.mozilla.org/ko/docs/WebAssembly/Concepts)

---

## 2. WebAssembly 동작 원리

**컴파일 파이프라인**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ 소스 코드   │───▶│  컴파일러   │───▶│  .wasm 파일 │───▶│  브라우저   │
│ (C/Rust 등) │    │ (Emscripten │    │ (바이너리)  │    │   실행      │
│             │    │  /wasm-pack)│    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

**Wasm 모듈 구조**

```
┌─────────────────────────────────────────┐
│            WebAssembly Module            │
├──────────────┬──────────────────────────┤
│   Types      │ 함수 시그니처 정의       │
├──────────────┼──────────────────────────┤
│   Imports    │ JS에서 가져올 함수/메모리 │
├──────────────┼──────────────────────────┤
│   Functions  │ 실제 함수 구현 (바이트코드)│
├──────────────┼──────────────────────────┤
│   Exports    │ JS로 내보낼 함수/메모리   │
├──────────────┼──────────────────────────┤
│   Memory     │ 선형 메모리 (ArrayBuffer) │
├──────────────┼──────────────────────────┤
│   Globals    │ 전역 변수                │
└──────────────┴──────────────────────────┘
```

**JavaScript와 WebAssembly 상호작용**

```javascript
// 1. Wasm 모듈 로드 (권장: instantiateStreaming)
const response = await fetch("module.wasm");
const { instance, module } = await WebAssembly.instantiateStreaming(response, {
  env: {
    // JS에서 Wasm으로 전달할 함수
    consoleLog: (value) => console.log("From Wasm:", value),
  },
});

// 2. Wasm 함수 호출
const result = instance.exports.add(10, 20);
console.log(result); // 30

// 3. 메모리 접근
const memory = new Uint8Array(instance.exports.memory.buffer);
console.log(memory[0]); // Wasm 메모리 읽기
```

**메모리 모델**

```javascript
// WebAssembly.Memory - 선형 메모리
const memory = new WebAssembly.Memory({
  initial: 1, // 초기 페이지 수 (1 페이지 = 64KB)
  maximum: 10, // 최대 페이지 수
});

// TypedArray로 메모리 접근
const view = new Uint8Array(memory.buffer);
view[0] = 255; // 직접 메모리 쓰기

// 메모리 증가
memory.grow(1); // 1 페이지 추가
// 주의: grow 후 기존 view는 무효화됨
```

**학습 자료**
- [MDN - WebAssembly JavaScript API](https://developer.mozilla.org/ko/docs/WebAssembly/JavaScript_interface)
- [WebAssembly 바이너리 스펙](https://webassembly.github.io/spec/core/)

---

## 3. 개발 환경 설정

**주요 도구 체인**

| 언어 | 도구 체인 | 특징 |
|------|-----------|------|
| C/C++ | Emscripten | 가장 성숙, POSIX API 에뮬레이션 |
| Rust | wasm-pack + wasm-bindgen | 메모리 안전, 모던 DX |
| AssemblyScript | asc compiler | TypeScript 유사 문법 |
| Go | TinyGo | 작은 바이너리 크기 |

### Emscripten 설정 (C/C++)

```bash
# Emscripten 설치
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh

# 컴파일
emcc hello.c -o hello.js -s WASM=1
```

### Rust + wasm-pack 설정

```bash
# Rust 설치 후
rustup target add wasm32-unknown-unknown

# wasm-pack 설치
cargo install wasm-pack

# 프로젝트 생성
cargo new --lib my-wasm-project
cd my-wasm-project

# 빌드
wasm-pack build --target web
```

**Cargo.toml 설정**

```toml
[package]
name = "my-wasm-project"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"

[profile.release]
opt-level = "s"      # 크기 최적화
lto = true           # 링크 타임 최적화
```

### AssemblyScript 설정

```bash
# npm으로 설치
npm init -y
npm install --save-dev assemblyscript

# 프로젝트 초기화
npx asinit .

# 빌드
npm run asbuild
```

**학습 자료**
- [Emscripten 공식 문서](https://emscripten.org/docs/getting_started/)
- [wasm-pack 공식 문서](https://rustwasm.github.io/wasm-pack/)
- [AssemblyScript 공식 사이트](https://www.assemblyscript.org/)

---

## 4. Rust로 WebAssembly 개발하기

### 기본 예제: 숫자 계산

```rust
// src/lib.rs
use wasm_bindgen::prelude::*;

// JavaScript에서 호출 가능한 함수
#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}
```

```javascript
// JavaScript에서 사용
import init, { add, fibonacci } from "./pkg/my_wasm_project.js";

await init();
console.log(add(10, 20)); // 30
console.log(fibonacci(10)); // 55
```

### 문자열 처리

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[wasm_bindgen]
pub fn reverse_string(s: &str) -> String {
    s.chars().rev().collect()
}
```

### 구조체와 메서드

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Calculator {
    value: f64,
}

#[wasm_bindgen]
impl Calculator {
    #[wasm_bindgen(constructor)]
    pub fn new(initial: f64) -> Calculator {
        Calculator { value: initial }
    }

    pub fn add(&mut self, n: f64) {
        self.value += n;
    }

    pub fn subtract(&mut self, n: f64) {
        self.value -= n;
    }

    pub fn result(&self) -> f64 {
        self.value
    }
}
```

```javascript
// JavaScript에서 사용
import { Calculator } from "./pkg/my_wasm_project.js";

const calc = new Calculator(100);
calc.add(50);
calc.subtract(30);
console.log(calc.result()); // 120
```

### JavaScript 함수 호출하기

```rust
use wasm_bindgen::prelude::*;

// JavaScript 함수 선언 (extern)
#[wasm_bindgen]
extern "C" {
    // console.log 바인딩
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // alert 바인딩
    fn alert(s: &str);

    // 커스텀 JavaScript 함수
    #[wasm_bindgen(js_name = getCurrentTime)]
    fn get_current_time() -> f64;
}

#[wasm_bindgen]
pub fn run_with_logging() {
    log("Wasm 모듈이 실행되었습니다!");
    let time = get_current_time();
    log(&format!("현재 시간: {}", time));
}
```

**학습 자료**
- [wasm-bindgen 가이드](https://rustwasm.github.io/wasm-bindgen/)
- [Rust and WebAssembly Book](https://rustwasm.github.io/docs/book/)

---

## 5. 고급 기능: SIMD, Threads, GC

### SIMD (Single Instruction, Multiple Data)

벡터 연산을 통해 데이터 병렬 처리를 가속화합니다.

```rust
// Rust에서 SIMD 사용 예시
use std::arch::wasm32::*;

pub fn vector_add(a: &[f32], b: &[f32], result: &mut [f32]) {
    for i in (0..a.len()).step_by(4) {
        unsafe {
            let va = v128_load(a.as_ptr().add(i) as *const v128);
            let vb = v128_load(b.as_ptr().add(i) as *const v128);
            let vr = f32x4_add(va, vb);
            v128_store(result.as_mut_ptr().add(i) as *mut v128, vr);
        }
    }
}
```

**SIMD 지원 확인**

```javascript
const simdSupported = WebAssembly.validate(
  new Uint8Array([
    0x00, 0x61, 0x73, 0x6d, // Magic number
    0x01, 0x00, 0x00, 0x00, // Version
    0x01, 0x05, 0x01, 0x60,
    0x00, 0x01, 0x7b, 0x03, // SIMD 128-bit type
    0x02, 0x01, 0x00, 0x0a,
    0x0a, 0x01, 0x08, 0x00,
    0xfd, 0x0c, 0x00, 0x00,
    0x00, 0x00, 0x0b,
  ])
);
console.log("SIMD 지원:", simdSupported);
```

### Web Workers와 SharedArrayBuffer (멀티스레딩)

```javascript
// main.js
const memory = new WebAssembly.Memory({
  initial: 10,
  maximum: 100,
  shared: true, // SharedArrayBuffer 활성화
});

const worker = new Worker("worker.js");
worker.postMessage({ memory });

// worker.js
self.onmessage = async (e) => {
  const { memory } = e.data;

  const response = await fetch("parallel_module.wasm");
  const { instance } = await WebAssembly.instantiateStreaming(response, {
    env: { memory },
  });

  instance.exports.parallel_compute();
};
```

**COOP/COEP 헤더 설정 (서버)**

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

### Garbage Collection (WasmGC)

WasmGC는 브라우저의 가비지 컬렉터와 통합되어 관리형 언어 지원을 개선합니다.

```
기존 방식:
┌────────────┐
│ Wasm 모듈  │ ─── 자체 GC 구현 필요 ───▶ 오버헤드 큼
└────────────┘

WasmGC:
┌────────────┐
│ Wasm 모듈  │ ─── 브라우저 GC 사용 ───▶ 효율적
└────────────┘
```

**학습 자료**
- [WebAssembly SIMD 스펙](https://github.com/WebAssembly/simd)
- [WebAssembly Threads 스펙](https://github.com/WebAssembly/threads)
- [WasmGC 제안](https://github.com/WebAssembly/gc)

---

## 6. 실전 사용 사례

### 사례 1: 이미지 처리

```rust
// Rust로 이미지 흑백 변환
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn grayscale(data: &mut [u8]) {
    for i in (0..data.len()).step_by(4) {
        let r = data[i] as f32;
        let g = data[i + 1] as f32;
        let b = data[i + 2] as f32;

        // 가중 평균 (인간의 색상 인식 고려)
        let gray = (0.299 * r + 0.587 * g + 0.114 * b) as u8;

        data[i] = gray;     // R
        data[i + 1] = gray; // G
        data[i + 2] = gray; // B
        // Alpha (data[i + 3])는 그대로 유지
    }
}
```

```javascript
// JavaScript에서 Canvas와 통합
import init, { grayscale } from "./pkg/image_processing.js";

await init();

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

// Wasm으로 이미지 처리
grayscale(imageData.data);

// 결과 적용
ctx.putImageData(imageData, 0, 0);
```

### 사례 2: 비디오 코덱

```javascript
// FFmpeg.wasm 사용 예시
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({ log: true });
await ffmpeg.load();

// 파일 로드
ffmpeg.FS("writeFile", "input.mp4", await fetchFile(videoFile));

// 변환 실행
await ffmpeg.run("-i", "input.mp4", "-vf", "scale=640:480", "output.mp4");

// 결과 가져오기
const data = ffmpeg.FS("readFile", "output.mp4");
const videoUrl = URL.createObjectURL(
  new Blob([data.buffer], { type: "video/mp4" })
);
```

### 사례 3: 3D 렌더링 / 게임

```javascript
// Unity WebGL 또는 Unreal Engine HTML5
// - 게임 로직과 렌더링이 Wasm으로 실행
// - Three.js와 Wasm 물리 엔진 결합

import init, { PhysicsWorld } from "./pkg/physics_engine.js";

await init();

const world = new PhysicsWorld();
world.add_sphere(0, 10, 0, 1.0);
world.add_plane(0, 0, 0);

function animate() {
  world.step(1 / 60);
  const positions = world.get_positions();

  // Three.js 메시 위치 업데이트
  objects.forEach((obj, i) => {
    obj.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
  });

  requestAnimationFrame(animate);
}
animate();
```

### 사례 4: 암호화

```rust
use wasm_bindgen::prelude::*;
use sha2::{Sha256, Digest};

#[wasm_bindgen]
pub fn sha256_hash(data: &[u8]) -> Vec<u8> {
    let mut hasher = Sha256::new();
    hasher.update(data);
    hasher.finalize().to_vec()
}

#[wasm_bindgen]
pub fn verify_password(password: &str, hash: &[u8]) -> bool {
    let computed = sha256_hash(password.as_bytes());
    computed == hash
}
```

### 사례 5: 데이터 시각화 (대용량 데이터)

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn compute_histogram(data: &[f32], bins: usize, min: f32, max: f32) -> Vec<u32> {
    let mut histogram = vec![0u32; bins];
    let range = max - min;

    for &value in data {
        if value >= min && value < max {
            let bin = ((value - min) / range * bins as f32) as usize;
            let bin = bin.min(bins - 1);
            histogram[bin] += 1;
        }
    }

    histogram
}

#[wasm_bindgen]
pub fn moving_average(data: &[f32], window: usize) -> Vec<f32> {
    if data.len() < window {
        return data.to_vec();
    }

    let mut result = Vec::with_capacity(data.len() - window + 1);
    let mut sum: f32 = data[..window].iter().sum();

    result.push(sum / window as f32);

    for i in window..data.len() {
        sum = sum - data[i - window] + data[i];
        result.push(sum / window as f32);
    }

    result
}
```

**학습 자료**
- [FFmpeg.wasm](https://ffmpegwasm.netlify.app/)
- [Squoosh (Google 이미지 최적화)](https://squoosh.app/)
- [AutoCAD Web (Autodesk)](https://web.autocad.com/)

---

## 7. 성능 최적화

### 바이너리 크기 최적화

```toml
# Cargo.toml
[profile.release]
opt-level = "z"      # 크기 최소화 ("s"보다 더 작음)
lto = true           # 링크 타임 최적화
codegen-units = 1    # 단일 코드 생성 단위
panic = "abort"      # 패닉 시 즉시 종료 (unwind 제거)
strip = true         # 심볼 제거
```

```bash
# wasm-opt 추가 최적화
wasm-opt -Oz -o output.wasm input.wasm

# Brotli 압축
brotli output.wasm
```

**크기 최적화 체크리스트**

- [ ] 릴리스 빌드 사용 (`--release`)
- [ ] wasm-opt 적용
- [ ] 불필요한 의존성 제거
- [ ] Gzip/Brotli 압축
- [ ] 코드 스플리팅 (필요한 모듈만 로드)

### 런타임 성능 최적화

```javascript
// 1. 스트리밍 컴파일 사용 (병렬 다운로드 + 컴파일)
const { instance } = await WebAssembly.instantiateStreaming(
  fetch("module.wasm"),
  imports
);

// 2. 모듈 캐싱
const cachedModule = await WebAssembly.compileStreaming(fetch("module.wasm"));
// IndexedDB에 저장 후 재사용

// 3. 메모리 사전 할당
const memory = new WebAssembly.Memory({
  initial: 256, // 16MB
  maximum: 1024, // 64MB
});
```

### 메모리 관리 최적화

```rust
// 메모리 풀링으로 할당 최소화
use wasm_bindgen::prelude::*;
use std::cell::RefCell;

thread_local! {
    static BUFFER: RefCell<Vec<u8>> = RefCell::new(Vec::with_capacity(1024 * 1024));
}

#[wasm_bindgen]
pub fn process_with_pool(data: &[u8]) -> Vec<u8> {
    BUFFER.with(|buf| {
        let mut buffer = buf.borrow_mut();
        buffer.clear();
        buffer.extend_from_slice(data);
        // 처리 로직...
        buffer.clone()
    })
}
```

### 프로파일링

```javascript
// 성능 측정
const start = performance.now();
instance.exports.heavy_computation();
const end = performance.now();
console.log(`실행 시간: ${end - start}ms`);

// Chrome DevTools에서 분석
// - Performance 탭에서 Wasm 함수 호출 추적
// - Memory 탭에서 메모리 사용량 확인
```

**학습 자료**
- [Shrinking .wasm Code Size](https://rustwasm.github.io/docs/book/reference/code-size.html)
- [wasm-opt 문서](https://github.com/WebAssembly/binaryen)

---

## 8. JavaScript와의 통합 패턴

### 패턴 1: 동기 호출 (간단한 계산)

```javascript
// 간단한 계산은 직접 호출
const result = wasmModule.exports.add(10, 20);
```

### 패턴 2: 비동기 처리 (무거운 연산)

```javascript
// Web Worker로 분리
// main.js
const worker = new Worker("wasm-worker.js");

worker.postMessage({ task: "process", data: largeDataArray });

worker.onmessage = (e) => {
  const result = e.data;
  updateUI(result);
};
```

```javascript
// wasm-worker.js
let wasmInstance;

(async () => {
  const { instance } = await WebAssembly.instantiateStreaming(
    fetch("heavy_module.wasm")
  );
  wasmInstance = instance;
})();

self.onmessage = (e) => {
  const { task, data } = e.data;

  if (task === "process") {
    const result = wasmInstance.exports.process(data);
    self.postMessage(result);
  }
};
```

### 패턴 3: 청크 처리 (대용량 데이터)

```javascript
async function processInChunks(data, chunkSize = 10000) {
  const results = [];

  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);

    // Wasm 처리
    const result = wasmModule.exports.process_chunk(chunk);
    results.push(result);

    // UI 블로킹 방지
    await new Promise((resolve) => setTimeout(resolve, 0));

    // 진행률 업데이트
    updateProgress((i / data.length) * 100);
  }

  return results;
}
```

### 패턴 4: TypedArray를 통한 메모리 공유

```javascript
// Wasm 메모리에 직접 쓰기
const wasmMemory = wasmModule.exports.memory;
const inputPtr = wasmModule.exports.allocate(dataSize);

// TypedArray 뷰 생성
const inputView = new Float32Array(wasmMemory.buffer, inputPtr, dataSize);

// 데이터 복사
inputView.set(jsFloatArray);

// Wasm 함수 호출 (포인터 전달)
const outputPtr = wasmModule.exports.process(inputPtr, dataSize);

// 결과 읽기
const outputView = new Float32Array(wasmMemory.buffer, outputPtr, dataSize);
const result = new Float32Array(outputView);

// 메모리 해제
wasmModule.exports.deallocate(inputPtr);
wasmModule.exports.deallocate(outputPtr);
```

**학습 자료**
- [Wasm By Example](https://wasmbyexample.dev/)
- [Rust Wasm 게임 오브 라이프 튜토리얼](https://rustwasm.github.io/docs/book/game-of-life/introduction.html)

---

## 9. 디버깅과 테스팅

### 소스맵을 통한 디버깅

```bash
# Emscripten 디버그 빌드
emcc -g4 source.c -o output.js --source-map-base http://localhost:8080/

# Rust 디버그 빌드
wasm-pack build --dev
```

Chrome DevTools에서:
1. Sources 탭 열기
2. Wasm 파일 클릭
3. 원본 소스 코드 (C/Rust)에서 브레이크포인트 설정

### console 로깅

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
    #[wasm_bindgen(js_namespace = console)]
    fn error(s: &str);
}

// 편의 매크로
macro_rules! console_log {
    ($($t:tt)*) => (log(&format!($($t)*)))
}

#[wasm_bindgen]
pub fn debug_function(value: i32) {
    console_log!("Input value: {}", value);
    // 로직...
    console_log!("Processing complete");
}
```

### 테스트

```rust
// Rust 단위 테스트
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 3), 5);
    }
}

// wasm-bindgen 테스트 (브라우저에서 실행)
#[cfg(test)]
mod wasm_tests {
    use super::*;
    use wasm_bindgen_test::*;

    wasm_bindgen_test_configure!(run_in_browser);

    #[wasm_bindgen_test]
    fn test_in_browser() {
        assert_eq!(add(2, 3), 5);
    }
}
```

```bash
# Rust 테스트 실행
cargo test

# 브라우저 테스트 실행
wasm-pack test --chrome --headless
```

### JavaScript 통합 테스트

```javascript
// Jest 또는 Vitest 사용
import { describe, it, expect, beforeAll } from "vitest";
import init, { add, fibonacci } from "../pkg/my_wasm_project.js";

describe("Wasm Module", () => {
  beforeAll(async () => {
    await init();
  });

  it("should add numbers correctly", () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });

  it("should compute fibonacci", () => {
    expect(fibonacci(0)).toBe(0);
    expect(fibonacci(1)).toBe(1);
    expect(fibonacci(10)).toBe(55);
  });
});
```

**학습 자료**
- [Chrome DevTools Wasm 디버깅](https://developer.chrome.com/docs/devtools/wasm)
- [wasm-bindgen-test 문서](https://rustwasm.github.io/wasm-bindgen/wasm-bindgen-test/index.html)

---

## 10. 보안 고려사항

### Wasm 샌드박스

- **메모리 격리**: 각 Wasm 인스턴스는 자체 선형 메모리만 접근
- **시스템 콜 불가**: 직접적인 파일 시스템, 네트워크 접근 불가
- **JavaScript 게이트웨이**: 모든 외부 상호작용은 JS를 통해 수행

### 보안 주의사항

```javascript
// ❌ 위험: 신뢰할 수 없는 Wasm 로드
const maliciousWasm = await fetch("https://untrusted-source.com/module.wasm");
await WebAssembly.instantiateStreaming(maliciousWasm);

// ✅ 안전: 출처 검증
const response = await fetch("module.wasm");
if (!response.url.startsWith("https://trusted-domain.com/")) {
  throw new Error("Untrusted Wasm source");
}

// CSP 헤더 설정
// Content-Security-Policy: script-src 'self' 'wasm-unsafe-eval'
```

### 메모리 안전

```rust
// Rust의 메모리 안전성이 Wasm에도 적용됨
// - 널 포인터 역참조 방지
// - 버퍼 오버플로우 방지
// - use-after-free 방지

// 안전하지 않은 코드는 명시적으로 표시
#[wasm_bindgen]
pub fn safe_function(data: &[u8]) {
    // 경계 검사 자동 수행
    for byte in data {
        // ...
    }
}
```

**참고**
> WebAssembly는 JavaScript와 동일한 보안 샌드박스에서 실행됩니다. 그러나 복잡한 Wasm 모듈은 논리적 취약점을 포함할 수 있으므로, 신뢰할 수 있는 소스의 모듈만 사용하고, 특히 서드파티 Wasm 모듈 사용 시 주의가 필요합니다.

---

## 핵심 자료

- [WebAssembly 공식 사이트](https://webassembly.org/)
- [MDN WebAssembly 문서](https://developer.mozilla.org/ko/docs/WebAssembly)
- [Rust and WebAssembly Book](https://rustwasm.github.io/docs/book/)
- [wasm-bindgen 가이드](https://rustwasm.github.io/wasm-bindgen/)
- [Awesome Wasm](https://github.com/mbasso/awesome-wasm)
- [Made With WebAssembly](https://madewithwebassembly.com/)

---

## Week 18 실습 로드맵 (2시간/일 기준)

---

### Day 1 — WebAssembly 개념과 기초

- WebAssembly의 역사와 필요성 이해
- JavaScript와 Wasm 성능 비교 실험
- 간단한 .wasm 파일 로드 및 실행

### Day 2 — 개발 환경 설정

- Rust + wasm-pack 설치 및 설정
- 첫 번째 Wasm 모듈 빌드
- JavaScript에서 Wasm 함수 호출

### Day 3 — Rust-Wasm 심화

- 구조체와 메서드 바인딩
- 문자열 처리
- JavaScript 함수 호출 (extern)

### Day 4 — 실전 프로젝트: 이미지 처리

- Canvas API와 Wasm 연동
- 이미지 필터 구현 (흑백, 세피아, 블러)
- 성능 측정 및 JS 구현과 비교

### Day 5 — 고급 기능

- SIMD 소개 및 지원 확인
- Web Worker와 Wasm 조합
- SharedArrayBuffer 활용

### Day 6 — 최적화와 디버깅

- 바이너리 크기 최적화
- wasm-opt 사용
- 소스맵 디버깅

### Day 7 — 종합 프로젝트

- 실전 규모의 Wasm 모듈 개발
- 성능 프로파일링
- 프로덕션 배포 준비

---

## 최종 목표

- **WebAssembly 이해**: Wasm의 개념, 동작 원리, 사용 사례를 명확히 이해한다.
- **개발 환경 구축**: Rust/AssemblyScript로 Wasm 모듈을 개발할 수 있다.
- **JavaScript 통합**: Wasm 모듈과 JavaScript 간 효율적인 데이터 교환을 구현한다.
- **성능 최적화**: Wasm 바이너리 크기와 런타임 성능을 최적화할 수 있다.
- **실전 적용**: 이미지 처리, 데이터 시각화 등 실제 사용 사례에 Wasm을 적용한다.

---

## 참고

> WebAssembly는 JavaScript를 대체하는 기술이 아니라 **보완하는 기술**입니다. "이미징, 3D, 암호화 같은 CPU 집약 작업에 최적"이며, 기존 JS 앱의 병목 구간을 Rust나 C/C++로 오프로드하여 성능을 크게 개선할 수 있습니다. 모든 것을 Wasm으로 작성할 필요는 없으며, **적절한 곳에 적절한 도구**를 사용하는 것이 핵심입니다. 먼저 성능 병목을 측정하고, Wasm이 진정한 가치를 제공할 수 있는 영역에만 적용하세요.
