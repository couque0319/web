
# 📘 7장. 자바스크립트 객체

## 🎯 학습 목표

1. 객체의 기본 개념 이해  
2. 브라우저 기본 객체(코어 객체) 활용  
3. `Date` 객체 사용  
4. `String` 객체 사용  
5. 배열 생성 및 활용 (`Array` 객체)  
6. `Math` 객체 활용  

---

## 🧩 1. 객체의 기본 개념

- 현실 세계는 **객체들의 집합**  
  - 예) 사람, 자동차, 책상, 은행계좌 등  
- 각 객체는 고유한 **속성(프로퍼티)** 과 **동작(메소드)** 을 가짐  
  ```js
  let account = {
    owner: "황기태",
    code: "111",
    balance: 35000,
    deposit: function() { ... },
    withdraw: function() { ... },
    inquiry: function() { ... }
  };
  ```

---

## 🧱 2. 자바스크립트 객체의 종류

| 유형 | 설명 |
|------|------|
| **코어 객체 (Core Object)** | 자바스크립트 기본 제공 객체. 어디서나 사용 가능 (Array, Date, String, Math 등) |
| **HTML DOM 객체** | HTML 태그를 객체화하여 문서 구조 제어 |
| **브라우저 객체 (BOM)** | 브라우저 제어용 객체 (window, navigator 등) |

---

## ⚙️ 3. 코어 객체 (Core Object)

### 생성 방법
```js
let today = new Date();
let msg = new String("Hello");
```

### 접근 방법
```js
obj.property = value;    // 프로퍼티 변경
let x = obj.property;    // 프로퍼티 값 읽기
obj.method(args);        // 메소드 호출
```

---

## 🧮 4. 배열 (Array)

### 배열의 개념
- 여러 개의 데이터를 순차적으로 저장하는 구조  
- 인덱스는 `0`부터 시작  

```js
let cities = ["Seoul", "New York", "Paris"];
console.log(cities[1]); // "New York"
```

---

### 배열 생성 방법

| 방법 | 코드 예시 |
|------|------------|
| 리터럴(`[]`) | `let week = ["월", "화", "수", "목", "금", "토", "일"];` |
| 생성자(`new Array()`) | `let week = new Array("월", "화", "수");` |

#### 예제
```js
let plots = [20, 5, 8, 15, 20];
for(let i=0; i<plots.length; i++) {
  console.log("*".repeat(plots[i]));
}
```

---

### 배열의 길이 (`length`)
```js
let plots = [0, 15, 20];
console.log(plots.length); // 3

plots.length = 5; // 배열 크기 늘리기
plots.length = 2; // 배열 크기 줄이기
```

---

### `Array` 객체 메소드

| 메소드 | 설명 |
|---------|------|
| `concat()` | 배열을 연결 |
| `join()` | 구분자를 사용해 문자열로 변환 |
| `reverse()` | 배열 순서 반전 |
| `slice(start, end)` | 부분 배열 반환 |
| `sort()` | 배열 정렬 |
| `toString()` | 문자열로 변환 |

---

## 🕓 5. Date 객체

시간과 날짜를 다루는 객체

```js
let now = new Date(); // 현재 시간
let start = new Date(2025, 2, 1); // 2025년 3월 1일
```

| 주요 메소드 | 설명 |
|--------------|------|
| `getFullYear()` | 연도 반환 |
| `getMonth()` | 월 (0~11) |
| `getDate()` | 일 |
| `getHours()` | 시 |
| `getMinutes()` | 분 |
| `getSeconds()` | 초 |

#### 예제
```js
let now = new Date();
document.body.style.backgroundColor = (now.getSeconds() % 2 == 0)
  ? "violet" : "lightskyblue";
```

---

## 🔤 6. String 객체

문자열을 다루는 객체 (불변성 특징)

```js
let hello = new String("Hello");
let result = hello.concat(" JavaScript");
```

| 메소드 | 설명 |
|--------|------|
| `charAt(i)` | i번째 문자 반환 |
| `concat()` | 문자열 결합 |
| `indexOf()` | 부분 문자열 위치 |
| `slice(start, end)` | 부분 문자열 반환 |
| `replace(a, b)` | 문자열 치환 |
| `trim()` | 공백 제거 |
| `split()` | 문자열 분리 |
| `toUpperCase()` | 대문자로 변환 |

---

## 🧮 7. Math 객체

수학 연산 관련 프로퍼티와 메소드 제공 (객체 생성 불필요)

| 메소드 | 설명 |
|---------|------|
| `Math.sqrt(x)` | 제곱근 |
| `Math.PI` | 원주율 |
| `Math.random()` | 0~1 사이 난수 |
| `Math.floor(x)` | 소수점 제거 |

#### 예제 (구구단 랜덤 문제)
```js
function randomInt() {
  return Math.floor(Math.random() * 9) + 1;
}

let ques = randomInt() + "*" + randomInt();
let user = prompt(`${ques} 값은 얼마입니까?`);
alert(user == eval(ques) ? "정답!" : "오답!");
```

---

## 🧍‍♂️ 8. 사용자 객체 만들기

사용자가 직접 객체를 정의하는 세 가지 방법이 있다.

### 1️⃣ `new Object()` 사용
```js
let account = new Object();
account.owner = "황기태";
account.balance = 35000;
account.deposit = function(money) { this.balance += money; };
```

---

### 2️⃣ 리터럴 표기법 `{}` 사용
```js
let account = {
  owner: "황기태",
  balance: 35000,
  deposit: function(money) { this.balance += money; }
};
```

---

### 3️⃣ 프로토타입 (생성자 함수) 사용
```js
function Account(owner, code, balance) {
  this.owner = owner;
  this.code = code;
  this.balance = balance;
  this.inquiry = function() { return this.balance; };
  this.deposit = function(money) { this.balance += money; };
  this.withdraw = function(money) { this.balance -= money; return money; };
}

let acc = new Account("황기태", "111", 35000);
```

---

## 🧠 핵심 요약

| 구분 | 핵심 개념 |
|------|-------------|
| **객체** | 속성과 메소드로 구성된 데이터 구조 |
| **코어 객체** | Array, Date, String, Math |
| **배열** | 다양한 데이터 타입 저장 가능 |
| **String** | 불변, 다양한 텍스트 처리 메소드 |
| **Math** | 수학 계산, 난수 생성 |
| **사용자 객체** | new Object(), {}, prototype 방식으로 생성 |
