# Week 16: TypeScript - 타입 시스템 마스터하기

## 학습 목표

JavaScript에서 TypeScript로의 전환 이유를 이해하고, 기본 타입부터 고급 타입 시스템까지 체계적으로 학습하여 실전에서 TypeScript를 효과적으로 활용할 수 있는 역량을 갖춥니다.

**대상**: JavaScript 기초를 아는 초심자 ~ 주니어 개발자로 성장하고 싶은 분

---

## 1. 왜 TypeScript인가?

**핵심 개념**
- **정적 타입 검사**: 런타임이 아닌 컴파일 타임에 타입 오류 발견
- **개발자 경험(DX)**: IDE 자동완성, 리팩토링 지원, 실시간 오류 표시
- **코드 문서화**: 타입 자체가 코드의 의도를 설명하는 문서 역할
- **대규모 프로젝트**: 팀 협업과 코드 유지보수에 필수적인 안전장치

**JavaScript vs TypeScript 비교**

```javascript
// JavaScript - 런타임에서야 오류 발견
function greet(name) {
  return "Hello, " + name.toUpperCase();
}
greet(123); // 런타임 에러: name.toUpperCase is not a function
```

```typescript
// TypeScript - 컴파일 타임에 오류 발견
function greet(name: string): string {
  return "Hello, " + name.toUpperCase();
}
greet(123); // 컴파일 에러: Argument of type 'number' is not assignable to 'string'
```

**언제 TypeScript를 도입해야 할까?**
- 프로젝트 규모가 커질 때
- 팀원이 늘어날 때
- 장기간 유지보수가 필요할 때
- API 계약이 복잡해질 때

**학습 자료**
- [TypeScript 공식 문서 - Why TypeScript](https://www.typescriptlang.org/why-create-typescript/)
- [Microsoft - TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

---

## 2. 기본 타입 시스템

**원시 타입 (Primitive Types)**

```typescript
// 기본 원시 타입
const name: string = "Alice";
const age: number = 25;
const isActive: boolean = true;
const nothing: null = null;
const notDefined: undefined = undefined;
const uniqueId: symbol = Symbol("id");
const bigNumber: bigint = 9007199254740991n;
```

**배열 타입 (Array Types)**

```typescript
// 두 가지 표기법
const numbers: number[] = [1, 2, 3];
const strings: Array<string> = ["a", "b", "c"];

// 튜플 - 고정 길이와 타입
const point: [number, number] = [10, 20];
const entry: [string, number] = ["age", 25];
```

**객체 타입 (Object Types)**

```typescript
// 인라인 객체 타입
const user: { name: string; age: number } = {
  name: "Alice",
  age: 25,
};

// interface - 확장 가능한 객체 타입 정의
interface User {
  name: string;
  age: number;
  email?: string; // 선택적 속성
  readonly id: number; // 읽기 전용
}

// type alias - 타입에 이름 붙이기
type Point = {
  x: number;
  y: number;
};
```

**interface vs type 선택 기준**
| 특징 | interface | type |
|------|-----------|------|
| 확장(상속) | `extends` 키워드 | `&` (intersection) |
| 선언 병합 | 가능 (같은 이름으로 여러 번 선언) | 불가능 |
| 유니온/튜플 | 불가능 | 가능 |
| 권장 용도 | 객체 구조 정의, API 계약 | 유니온, 복잡한 타입 조합 |

**함수 타입 (Function Types)**

```typescript
// 함수 선언
function add(a: number, b: number): number {
  return a + b;
}

// 화살표 함수
const multiply = (a: number, b: number): number => a * b;

// 함수 타입 표현
type MathOperation = (a: number, b: number) => number;
const divide: MathOperation = (a, b) => a / b;

// 선택적 매개변수와 기본값
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

// 나머지 매개변수
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}
```

**학습 자료**
- [TypeScript Handbook - Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)

---

## 3. 고급 타입

**Union 타입 (|)**

여러 타입 중 하나를 가질 수 있는 타입입니다.

```typescript
// 기본 유니온
type StringOrNumber = string | number;
let value: StringOrNumber = "hello";
value = 42; // OK

// 실용적인 예: API 응답
type ApiResponse<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string };

// 타입 좁히기 (Type Narrowing)
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // string 메서드 사용 가능
  } else {
    console.log(value.toFixed(2)); // number 메서드 사용 가능
  }
}
```

**Intersection 타입 (&)**

여러 타입을 모두 만족해야 하는 타입입니다.

```typescript
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

// 두 인터페이스를 모두 만족
type Person = HasName & HasAge;

const person: Person = {
  name: "Alice",
  age: 25,
};
```

**Literal 타입**

특정 값만 허용하는 타입입니다.

```typescript
// 문자열 리터럴
type Direction = "up" | "down" | "left" | "right";
let move: Direction = "up"; // OK
move = "diagonal"; // Error!

// 숫자 리터럴
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

// as const - 리터럴 타입으로 추론
const config = {
  endpoint: "/api/users",
  method: "GET",
} as const;
// config.method의 타입: "GET" (string이 아님)
```

**Type Assertion (타입 단언)**

```typescript
// as 키워드
const input = document.getElementById("myInput") as HTMLInputElement;
input.value = "Hello";

// 비권장: angle-bracket 문법 (JSX와 충돌)
const input2 = <HTMLInputElement>document.getElementById("myInput");

// Non-null assertion (!)
function processValue(value: string | null) {
  // value가 null이 아님을 확신할 때
  console.log(value!.toUpperCase());
}
```

**참고**
> 타입 단언은 컴파일러에게 "나를 믿어"라고 말하는 것입니다. 남용하면 타입 안전성이 깨지므로, 가능하면 타입 가드를 사용하세요.

**학습 자료**
- [TypeScript Handbook - Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

---

## 4. 제네릭 (Generics)

**왜 제네릭이 필요한가?**

```typescript
// 제네릭 없이 - 타입 정보 손실
function identity(arg: any): any {
  return arg;
}
const result = identity("hello"); // result의 타입: any

// 제네릭 사용 - 타입 정보 보존
function identityGeneric<T>(arg: T): T {
  return arg;
}
const result2 = identityGeneric("hello"); // result2의 타입: string
```

**제네릭 함수**

```typescript
// 기본 제네릭
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 여러 타입 매개변수
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const p = pair("hello", 42); // [string, number]
```

**제네릭 제약 (Constraints)**

```typescript
// extends로 제약 추가
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length); // length 속성 보장됨
  return arg;
}

logLength("hello"); // OK - string has length
logLength([1, 2, 3]); // OK - array has length
logLength(123); // Error! number doesn't have length
```

**keyof와 함께 사용**

```typescript
// 객체의 키만 허용
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 25 };
const name = getProperty(user, "name"); // string
const age = getProperty(user, "age"); // number
getProperty(user, "email"); // Error! "email"은 User의 키가 아님
```

**제네릭 인터페이스와 타입**

```typescript
// 제네릭 인터페이스
interface Box<T> {
  value: T;
}

const stringBox: Box<string> = { value: "hello" };
const numberBox: Box<number> = { value: 42 };

// 제네릭 타입 별칭
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

const success: Result<number> = { success: true, data: 42 };
const failure: Result<number> = { success: false, error: new Error("fail") };
```

**학습 자료**
- [TypeScript Handbook - Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)

---

## 5. 유틸리티 타입

TypeScript가 제공하는 내장 유틸리티 타입으로 타입 변환을 쉽게 할 수 있습니다.

**객체 속성 변환**

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Partial<T> - 모든 속성을 선택적으로
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; }

// Required<T> - 모든 속성을 필수로
interface Config {
  theme?: string;
  language?: string;
}
type RequiredConfig = Required<Config>;
// { theme: string; language: string; }

// Readonly<T> - 모든 속성을 읽기 전용으로
type ReadonlyUser = Readonly<User>;
// { readonly id: number; readonly name: string; readonly email: string; }
```

**속성 선택/제외**

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Pick<T, K> - 특정 속성만 선택
type PublicUser = Pick<User, "id" | "name">;
// { id: number; name: string; }

// Omit<T, K> - 특정 속성 제외
type UserWithoutPassword = Omit<User, "password">;
// { id: number; name: string; email: string; }
```

**Record 타입**

```typescript
// Record<K, V> - 키-값 매핑
type Role = "admin" | "user" | "guest";
type Permissions = Record<Role, string[]>;

const permissions: Permissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"],
};
```

**집합 연산: Extract와 Exclude**

```typescript
type AllTypes = string | number | boolean | null;

// Extract<T, U> - T에서 U에 할당 가능한 타입만 추출
type StringOrNumber = Extract<AllTypes, string | number>;
// string | number

// Exclude<T, U> - T에서 U에 할당 가능한 타입 제외
type NonNullTypes = Exclude<AllTypes, null>;
// string | number | boolean
```

**함수 타입 유틸리티**

```typescript
function createUser(name: string, age: number): User {
  return { id: 1, name, email: "", password: "" };
}

// ReturnType<T> - 함수의 반환 타입 추출
type CreateUserReturn = ReturnType<typeof createUser>;
// User

// Parameters<T> - 함수의 매개변수 타입을 튜플로 추출
type CreateUserParams = Parameters<typeof createUser>;
// [string, number]

// 실용 예: 함수 래퍼 만들기
function withLogging<T extends (...args: any[]) => any>(fn: T) {
  return (...args: Parameters<T>): ReturnType<T> => {
    console.log("Called with:", args);
    return fn(...args);
  };
}
```

**학습 자료**
- [TypeScript Handbook - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

---

## 6. 조건부 타입과 infer

**조건부 타입 기본 문법**

```typescript
// T extends U ? X : Y
// "T가 U에 할당 가능하면 X, 아니면 Y"

type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>;  // "yes"
type B = IsString<number>;  // "no"
```

**분배 조건부 타입 (Distributive Conditional Types)**

유니온 타입에 조건부 타입을 적용하면 각 멤버에 분배됩니다.

```typescript
type ToArray<T> = T extends any ? T[] : never;

// 유니온의 각 멤버에 분배 적용
type Result = ToArray<string | number>;
// string[] | number[] (not (string | number)[])

// 분배 방지하려면 튜플로 감싸기
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type Result2 = ToArrayNonDist<string | number>;
// (string | number)[]
```

**infer 키워드**

조건부 타입 내에서 타입을 추론하여 변수처럼 사용합니다.

```typescript
// 배열 요소 타입 추출
type ElementType<T> = T extends (infer E)[] ? E : never;

type A = ElementType<string[]>;  // string
type B = ElementType<number[]>;  // number
type C = ElementType<string>;    // never

// 함수 반환 타입 추출 (ReturnType 구현)
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Promise 내부 타입 추출 (Awaited 구현)
type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T;

type D = MyAwaited<Promise<Promise<string>>>; // string
```

**실용적인 infer 패턴**

```typescript
// 첫 번째 매개변수 타입 추출
type FirstParam<T> = T extends (first: infer F, ...rest: any[]) => any
  ? F
  : never;

type F = FirstParam<(a: string, b: number) => void>; // string

// 생성자의 인스턴스 타입 추출
type InstanceOf<T> = T extends new (...args: any[]) => infer I ? I : never;

class MyClass {
  name = "test";
}

type Instance = InstanceOf<typeof MyClass>; // MyClass
```

**커스텀 유틸리티 타입 만들기**

```typescript
// 깊은 Partial
type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

// 깊은 Readonly
type DeepReadonly<T> = T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;

// Nullable 만들기
type Nullable<T> = T | null | undefined;
```

**학습 자료**
- [TypeScript Handbook - Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)

---

## 7. 실전 패턴

**Type Guard (타입 가드)**

런타임 검사를 통해 타입을 좁힙니다.

```typescript
// typeof 가드
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + value;
  }
  return padding + value;
}

// instanceof 가드
class Dog {
  bark() { console.log("Woof!"); }
}
class Cat {
  meow() { console.log("Meow!"); }
}

function speak(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// 사용자 정의 타입 가드 (is 키워드)
interface Fish {
  swim(): void;
}
interface Bird {
  fly(): void;
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim(); // Fish로 타입 좁혀짐
  } else {
    pet.fly(); // Bird로 타입 좁혀짐
  }
}
```

**Discriminated Union (판별 유니온)**

공통 리터럴 속성으로 유니온 타입을 구별합니다.

```typescript
// 판별 속성: type
interface Circle {
  type: "circle";
  radius: number;
}

interface Rectangle {
  type: "rectangle";
  width: number;
  height: number;
}

interface Triangle {
  type: "triangle";
  base: number;
  height: number;
}

type Shape = Circle | Rectangle | Triangle;

function getArea(shape: Shape): number {
  switch (shape.type) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}

// 철저한 검사 (Exhaustive Check)
function assertNever(x: never): never {
  throw new Error(`Unexpected value: ${x}`);
}

function getAreaExhaustive(shape: Shape): number {
  switch (shape.type) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
    default:
      // 새로운 Shape 추가 시 컴파일 에러 발생
      return assertNever(shape);
  }
}
```

**Type Branding (타입 브랜딩)**

구조적으로 같은 타입을 명목적으로 구별합니다.

```typescript
// 문제: userId와 postId가 둘 다 string
function getPost(userId: string, postId: string) { /* ... */ }
getPost("post123", "user456"); // 순서 바뀌어도 에러 없음!

// 해결: 브랜드 타입
type UserId = string & { readonly brand: unique symbol };
type PostId = string & { readonly brand: unique symbol };

// 브랜드 타입 생성 함수
function createUserId(id: string): UserId {
  return id as UserId;
}

function createPostId(id: string): PostId {
  return id as PostId;
}

function getPostSafe(userId: UserId, postId: PostId) { /* ... */ }

const userId = createUserId("user456");
const postId = createPostId("post123");

getPostSafe(userId, postId); // OK
getPostSafe(postId, userId); // Error! 순서가 바뀌면 컴파일 에러
```

**실전 예: 검증된 값 브랜딩**

```typescript
type Email = string & { readonly __brand: "Email" };
type ValidatedEmail = Email & { readonly __validated: true };

function isValidEmail(email: string): email is Email {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateEmail(input: string): ValidatedEmail | null {
  if (isValidEmail(input)) {
    return input as ValidatedEmail;
  }
  return null;
}

function sendEmail(to: ValidatedEmail, subject: string) {
  // 검증된 이메일만 받음
}

const email = validateEmail("user@example.com");
if (email) {
  sendEmail(email, "Hello!"); // OK
}
sendEmail("invalid" as any, "Hello!"); // 런타임에는 통과하지만 타입 레벨에서 경고
```

**학습 자료**
- [TypeScript Handbook - Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
- [TypeScript Deep Dive - Discriminated Unions](https://basarat.gitbook.io/typescript/type-system/discriminated-unions)

---

## 핵심 자료

- [TypeScript 공식 핸드북](https://www.typescriptlang.org/docs/handbook/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Type Challenges](https://github.com/type-challenges/type-challenges) - 타입 레벨 프로그래밍 연습
- [Total TypeScript](https://www.totaltypescript.com/) - 고급 TypeScript 학습

---

## Week 16 학습 로드맵

| Day | 주제 | 목표 |
|-----|------|------|
| 1 | 왜 TypeScript인가 + 기본 타입 | JS→TS 전환 이유 이해, 기본 타입 익히기 |
| 2 | 객체 타입 + 함수 타입 | interface, type alias, 함수 타입 시그니처 |
| 3 | 고급 타입 | Union, Intersection, Literal, 타입 좁히기 |
| 4 | 제네릭 | 제네릭 함수, 제약조건, keyof |
| 5 | 유틸리티 타입 | Partial, Pick, Omit, Record, Extract, Exclude |
| 6 | 조건부 타입 + infer | 조건부 타입, 분배, infer 패턴 |
| 7 | 실전 패턴 | Type Guard, Discriminated Union, Branding |

---

## 참고

> TypeScript는 JavaScript의 상위 집합(superset)으로, 모든 유효한 JavaScript 코드는 TypeScript에서도 유효합니다. 타입 시스템을 통해 버그를 사전에 방지하고, IDE 지원을 극대화하며, 코드의 의도를 명확하게 표현할 수 있습니다. 처음에는 타입 작성이 번거롭게 느껴질 수 있지만, 프로젝트가 커질수록 그 가치가 빛납니다.
