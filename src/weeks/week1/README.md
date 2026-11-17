# Week 1: JavaScript 심화 – 실행 컨텍스트, 클로저, 이벤트 루프, V8 내부 동작

## 실행 컨텍스트와 환경 레코드

**핵심 개념**
- **실행 컨텍스트**: 전역 코드, 함수 호출, 모듈, eval마다 만들어져 콜 스택에 쌓임
- **구성 요소**: LexicalEnvironment, VariableEnvironment, Realm, ScriptOrModule
- **환경 레코드**: Declarative, Function, Object, Global, Module. `[[OuterEnv]]` 연결이 스코프 체인
- **생성 단계와 실행 단계**: `var`는 `undefined`로 초기화, `let`/`const`는 바인딩만 생성(TDZ), 함수 선언은 함수 객체까지 생성
- 현재 명세에서 `this`는 함수 환경 레코드의 `[[ThisValue]]`에 저장

**학습 자료**
- ECMAScript 명세 – Executable Code and Execution Contexts
- MDN – Hoisting, Temporal dead zone

---

## 스코프 체인과 클로저

**핵심 개념**
- **렉시컬 스코프**: 함수 객체가 만들어질 때의 환경이 `[[Environment]]` 내부 슬롯에 저장됨
- **클로저**: 함수와 그 함수가 정의된 렉시컬 환경의 조합. 값이 아니라 변수(바인딩)를 캡처
- 외부 함수의 실행 컨텍스트는 사라져도 환경 레코드는 참조가 남아 있는 한 GC되지 않음

**자주 틀리는 지점**
- 같은 환경을 공유하는 클로저끼리는 변경이 서로 보임(복사가 아닌 참조)
- `for (var …)`는 바인딩 하나, `for (let …)`는 반복마다 새 환경 레코드
- Stale closure: 오래된 렌더링의 환경을 붙잡은 콜백

**엔진 관점**
- V8은 캡처되는 변수만 힙의 Context 객체에 할당
- 같은 스코프의 클로저는 Context 하나를 공유 → 누수 패턴의 원인
- DevTools `console.dir(fn)`의 `[[Scopes]]`에서 확인

**학습 자료**
- GreatFrontend – 클로저 개념 정리
- MDN – Closures

---

## `this` 바인딩과 화살표 함수

**핵심 개념**
- **5가지 바인딩 규칙**: 기본 바인딩, 암시적 바인딩, 명시적 바인딩, 생성자 바인딩, 렉시컬 바인딩
- **우선순위**: `new` > `call/apply/bind` > 메서드 호출 > 기본 바인딩
- **화살표 함수**: 자체 `this`가 없어 스코프 체인으로 바깥 `this`를 찾음. `call`/`bind`로 변경 불가
- **바인딩 유실**: 메서드를 변수에 담거나 콜백으로 넘기면 `this`가 사라짐
- **클래스 필드 화살표 함수**: 인스턴스에 고정되지만 인스턴스마다 함수 생성

**학습 자료**
- FreeCodeCamp – 자바스크립트 `this` 5가지 규칙

---

## 자바스크립트 런타임과 이벤트 루프

**핵심 개념**
- JS 실행 모형: 콜스택, 힙, 태스크 큐, 마이크로태스크 큐
- **런투컴플리션**: 태스크 하나를 끝까지 실행한 뒤 다음으로 넘어감
- **마이크로태스크**: 콜 스택이 빌 때마다 큐가 빌 때까지 전부 처리. 그 사이 태스크와 렌더링은 끼어들지 못함
- **한 바퀴**: 태스크 1개 → 마이크로태스크 전부 → (렌더링 시점이면) rAF → 스타일 → 레이아웃 → 페인트
- `async/await`는 `Promise.then`의 문법적 변형. `await` 뒤는 마이크로태스크로 실행
- 마이크로태스크 기아, `requestAnimationFrame`과 `setTimeout`의 차이, Node.js(libuv) 페이즈

**학습 자료**
- MDN – Concurrency model and Event Loop
- HTML 명세 – Event loop processing model

---

## 프로미스와 비동기 제어

**핵심 개념**
- **Promise**: 미래의 완료/실패 결과를 표현하는 객체
- **주요 메서드**: `then()`, `catch()`, `finally()`
- **메서드 비교**
  - `Promise.all()`: 모든 프로미스가 이행될 때까지 대기
  - `Promise.allSettled()`: 성공/실패와 무관하게 모두 완료될 때까지 대기
  - `Promise.race()`: 가장 먼저 완료된 결과 반환
  - `Promise.any()`: 가장 먼저 이행된 결과 반환
  - `Promise.withResolvers()`: resolve/reject 제어자를 한꺼번에 획득

**추가 학습**
- **AbortController**: `fetch` 같은 비동기 작업 취소 방법

**실습 아이디어**
- `fetch` 요청을 `AbortController`로 취소
- `Promise.any()`로 여러 프로미스 중 가장 먼저 이행된 결과 받기

**학습 자료**
- MDN – Promise 사용법 가이드
- MDN – AbortController

---

## 고급 자료구조 (Map/Set, WeakRef 등)

**Map과 Set**
- **Map**: 키로 어떤 타입이든 사용 가능한 키-값 쌍 컬렉션
  - 메서드: `map.set()`, `map.get()`
- **Set**: 중복 없는 값들의 모음
  - 메서드: `set.add()`, `set.has()`

**약한 참조 컬렉션**
- **WeakMap/WeakSet**: 객체를 참조하되 가비지 컬렉션 방해 없음
- **WeakRef**: 객체를 GC 대상으로 남기면서 참조
- **FinalizationRegistry**: 객체가 수거된 뒤 실행할 정리 콜백 등록 (메모리와 GC 섹션에서 다룸)

**학습 자료**
- JavaScript.info – Map과 Set

**참고**
> 맵(Map)은 객체와 유사하지만 **키 타입에 제한이 없고** 키를 문자열로 변환하지 않습니다. 셋(Set)은 **중복 없는** 값 컬렉션으로, 키 없이 값 자체만 저장합니다.

---

## V8 컴파일 파이프라인

**핵심 개념**
- **계층형 실행**: Parser(lazy parsing) → Ignition(바이트코드 인터프리터) → Sparkplug(baseline) → Maglev(mid-tier) → TurboFan(optimizing)
- **FeedbackVector**: 실행 중 관찰한 타입을 기록. 모든 최적화의 근거
- **추측 최적화**: "지금까지 본 타입이 계속된다"고 가정하고 가드와 함께 특화된 기계어 생성
- **디옵트(deoptimization)**: 가정이 깨지면 최적화 코드를 버리고 바이트코드로 복귀

**실습**
- `node --allow-natives-syntax --trace-opt --trace-deopt add.js`
- `node --print-bytecode --print-bytecode-filter=add add.js`

**학습 자료**
- V8 Blog – Ignition, Sparkplug, Maglev, TurboFan 소개 글

---

## 히든 클래스(Hidden Class)와 인라인 캐시

**핵심 개념**
- **히든 클래스(Map)**: 프로퍼티 이름과 오프셋을 기록. 같은 순서로 같은 프로퍼티를 추가한 객체는 전이 트리의 같은 노드를 공유
- **인라인 캐시(IC)**: 접근 지점마다 히든 클래스와 오프셋을 캐시. Monomorphic(1개) → Polymorphic(2~4개) → Megamorphic(5개 이상)
- **프로퍼티 저장**: in-object, properties 배열(fast 모드), dictionary 모드(`delete` 등으로 전환, 느림)
- **Elements kinds**: `PACKED_SMI` → `PACKED_DOUBLE` → `PACKED_ELEMENTS`, `HOLEY`. 전이는 일방향
- **숫자 표현**: Smi(즉시 값)와 HeapNumber(힙 할당)

**주의**
이런 최적화는 핫 패스에서만 의미가 있습니다. 일반 코드는 가독성이 먼저이고, 최적화는 프로파일링 후에 합니다.

**디버깅**
- `node --allow-natives-syntax`에서 `%HaveSameMap(a, b)`, `%HasFastProperties(obj)`, `%DebugPrint(obj)`
- `--log-maps` 플래그로 히든 클래스 생성 로그 기록 (예전 이름은 `--trace-maps`)

**학습 자료**
- V8 Blog – Fast properties in V8, Elements kinds in V8
- Dev.to – Hidden Classes: JS의 성능 비밀

---

## 메모리 모델과 가비지 컬렉션

**핵심 개념**
- **스택과 힙**: 스택에는 프레임과 즉시 값, 힙에는 객체·함수·클로저 Context·문자열
- **도달 가능성**: 루트에서 참조를 따라 도달할 수 없는 객체가 수거 대상. 순환 참조도 수거됨
- **세대별 GC**: Young 세대는 Scavenger(Minor GC), 힙 전체는 Mark-Compact(Major GC)
- **Orinoco**: Parallel, Incremental, Concurrent 기법으로 메인 스레드 멈춤 시간 단축
- **누수 패턴**: 해제하지 않은 리스너·타이머, 계속 커지는 캐시, detached DOM, 공유 Context
- **FinalizationRegistry**: 실행 시점이 보장되지 않으므로 보조 용도로만 사용

**실습**
- `node --trace-gc app.js`
- DevTools Memory 탭에서 힙 스냅샷 두 개 비교

**학습 자료**
- V8 Blog – Trash talk: the Orinoco garbage collector
- MDN – Memory management

---

## Proxy와 Reflect를 활용한 메타프로그래밍

**Proxy의 역할**
- 객체의 기본 동작(프로퍼티 접근, 할당, 함수 호출 등) 가로채기
- 인터셉터를 통한 **기본 동작 커스터마이징**

**실습 예시**
- 객체 접근 시 로그 남기기
- 존재하지 않는 프로퍼티 접근 시 디폴트 값 제공

**Reflect의 역할**
- Proxy로 가로챈 동작들을 수행하는 정적 메서드 제공
- Proxy 핸들러 내부에서 원본 동작 포워딩
- `receiver`를 넘겨야 상속 구조에서 getter의 `this`가 올바르게 유지됨

**더 알아둘 점**
- **불변식(invariant)**: 트랩의 결과가 target의 실제 상태와 모순되면 TypeError
- **반응성**: Vue 3의 `reactive`는 get 트랩에서 추적, set 트랩에서 재실행
- Proxy를 거친 접근은 일반 프로퍼티 접근보다 느림

**학습 자료**
- JavaScript.info – Proxy와 Reflect

**참고**
> **`Proxy`** 객체는 다른 객체를 래핑하여 **기본적인 동작을 가로챈 후 정의**할 수 있게 해줍니다. **`Reflect`**는 이러한 동작들을 수행하는 정적 메서드들을 모아둔 내장 객체로, Proxy 핸들러 내부에서 기본 동작을 호출하는 데 유용합니다.

---

## 핵심 자료

- [MDN – JavaScript EventLoop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [FreeCodeCamp – `this` Binding Rules](https://www.freecodecamp.org/news/javascript-this-keyword-binding-rules/)
- [ECMAScript – Execution Contexts](https://tc39.es/ecma262/#sec-execution-contexts)
- [GreatFrontend – Closure](https://www.greatfrontend.com/questions/quiz/what-is-a-closure-and-how-why-would-you-use-one)
- [MDN – Promises Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [MDN – AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [JavaScript.info – Map and Set](https://javascript.info/map-set)
- [V8 Blog – Maglev](https://v8.dev/blog/maglev)
- [V8 Blog – Fast properties](https://v8.dev/blog/fast-properties)
- [V8 Blog – Elements kinds](https://v8.dev/blog/elements-kinds)
- [V8 Blog – Orinoco GC](https://v8.dev/blog/trash-talk)
- [Dev.to – Hidden Classes](https://dev.to/maxprilutskiy/hidden-classes-the-javascript-performance-secret-that-changed-everything-3p6c)
- [JavaScript.info – Proxy and Reflect](https://javascript.info/proxy)
