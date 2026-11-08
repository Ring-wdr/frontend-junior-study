# Week 1: JavaScript 심화 – 런타임, this, 스코프, 비동기 등

## 자바스크립트 런타임과 이벤트 루프

**핵심 개념**
- JS 실행 모형: 콜스택, 힙, 태스크 큐의 동작
- **런투컴플리션** 특성: 각 이벤트가 완전히 처리된 후 다음으로 넘어감
- **단일 스레드 비동기**: 이벤트 루프가 콜스택이 빌 때마다 큐에서 메시지 처리

**학습 자료**
- MDN – Concurrency model and Event Loop

**참고**
> 자바스크립트 런타임은 '이벤트 루프' 기반 동시성 모델을 갖고 있습니다. 메시지 큐의 이벤트를 하나씩 처리하며, 각 이벤트는 완전히 처리(run-to-completion)된 후에야 다음 이벤트로 넘어갑니다.

---

## `this` 바인딩과 화살표 함수

**핵심 개념**
- **5가지 바인딩 규칙**: 기본 바인딩, 암시적 바인딩, 명시적 바인딩, 생성자 바인딩, 렉시컬 바인딩
- **암시적 바인딩**: 메서드 호출 시 `this`가 점 앞의 객체로 바인딩
- **명시적 바인딩**: `call/apply/bind`로 명시적으로 바인딩
- **화살표 함수**: 자체 `this` 없이 상위 스코프에 정적으로 바인딩

**학습 자료**
- FreeCodeCamp – 자바스크립트 `this` 5가지 규칙

**참고**
> `this` 사용에는 5가지 바인딩 규칙이 있으며, 함수 호출 방식에 따라 어떤 객체를 가리키는지 결정됩니다. 화살표 함수는 예외적으로 자신만의 `this`를 갖지 않고, 정의된 시점의 부모 스코프 `this`를 물려받습니다.

---

## 스코프 체인과 클로저

**핵심 개념**
- **렉시컬 스코프**: 변수 유효범위의 정적 구조
- **클로저**: 함수가 자신의 렉시컬 환경을 기억하여 외부 함수 실행 후에도 그 환경의 변수에 접근
- 클로저 활용: 데이터 은닉, 팩토리 함수 등

**실습 방법**
외부 함수에 변수를 두고 내부 함수에서 그 변수를 접근하는 코드를 작성하면서 클로저 동작을 실감해보세요.

**학습 자료**
- GreatFrontend – 클로저 개념 정리
- MDN Glossary – Closure

---

## 프로미스와 비동기 제어

**핵심 개념**
- **Promise**: 미래의 완료/실패 결과를 표현하는 객체
- **주요 메서드**: `then()`, `catch()`, `finally()`
- **메서드 비교**
  - `Promise.all()`: 모든 프로미스가 이행될 때까지 대기
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
- **FinalizationRegistry**: 객체가 수거될 때 실행할 정리 콜백 등록

**학습 자료**
- JavaScript.info – Map과 Set

**참고**
> 맵(Map)은 객체와 유사하지만 **키 타입에 제한이 없고** 키를 문자열로 변환하지 않습니다. 셋(Set)은 **중복 없는** 값 컬렉션으로, 키 없이 값 자체만 저장합니다.

---

## 은닉 클래스(Hidden Class)와 V8 최적화

**핵심 개념**
- **히든 클래스**: V8 엔진이 동일한 형태의 객체들을 공유하여 프로퍼티 접근 최적화
- **모노모픽 코드**: 객체를 항상 같은 프로퍼티들을 같은 순서로 초기화
- **성능 개선 패턴**: 동적 프로퍼티 추가/삭제 피하기

**디버깅**
Node.js 실행 시 `--trace-maps` 플래그로 히든 클래스 관찰 가능

**학습 자료**
- Dev.to – Hidden Classes: JS의 성능 비밀

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

**학습 자료**
- JavaScript.info – Proxy와 Reflect

**참고**
> **`Proxy`** 객체는 다른 객체를 래핑하여 **기본적인 동작을 가로챈 후 정의**할 수 있게 해줍니다. **`Reflect`**는 이러한 동작들을 수행하는 정적 메서드들을 모아둔 내장 객체로, Proxy 핸들러 내부에서 기본 동작을 호출하는 데 유용합니다.

---

## DSL (Domain-Specific Language) 이해

**개념**
- **DSL**: 특정 분야 문제 해결에 특화된 미니 언어
- 특정 영역의 개념과 규칙으로 구성된 언어

**예시**
- SQL, HTML, 정규표현식
- Terraform의 HCL (Infrastructure as Code)
- React JSX (UI를 위한 DSL)

**학습 의도**
- **메타프로그래밍**의 한 갈래 이해
- 기존 DSL을 활용하는 능력 배양 (DSL 제작은 흔치 않음)

**학습 자료**
- 블로그 – DSL 이해하기

---

## 핵심 자료

- [MDN – JavaScript EventLoop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [FreeCodeCamp – `this` Binding Rules](https://www.freecodecamp.org/news/javascript-this-keyword-binding-rules/)
- [GreatFrontend – Closure](https://www.greatfrontend.com/questions/quiz/what-is-a-closure-and-how-why-would-you-use-one)
- [MDN – Promises Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [MDN – AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [JavaScript.info – Map and Set](https://javascript.info/map-set)
- [Dev.to – Hidden Classes](https://dev.to/maxprilutskiy/hidden-classes-the-javascript-performance-secret-that-changed-everything-3p6c)
- [JavaScript.info – Proxy and Reflect](https://javascript.info/proxy)
