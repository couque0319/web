
# 6장 자바스크립트 기초 정리

## 1️⃣ 자바스크립트 개요

- HTML 문서 내에서 실행되는 **스크립트 언어**
- **인터프리터 언어**로, 별도 컴파일 과정 없이 실행
- **C 언어와 유사한 문법 구조**, 배우기 쉬움
- **동적 타입 언어 (Dynamic Typing)**
- HTML과 CSS를 **동적으로 제어** 가능

```html
<script>
let sum = 0;
for(let n = 0; n < 10; n++) sum += n;
alert("합은 = " + sum);
</script>
```

---

## 2️⃣ 자바스크립트 코드 위치

### HTML 태그 속성 내부

```html
<img src="apple.png"
     onmouseover="this.src='banana.png'"
     onmouseout="this.src='apple.png'">
```

### `<script>` 태그 내부

```html
<script>
  document.write("Hello JavaScript!");
</script>
```

### 외부 파일 연결

```html
<script src="main.js"></script>
```

---

## 3️⃣ 출력 및 대화 상자

### HTML 출력

```javascript
document.write("<h3>Welcome!</h3>");
```

### 대화창 함수

- `alert("메시지")` : 알림창
- `prompt("메시지","기본값")` : 입력창
- `confirm("확인하시겠습니까?")` : 확인/취소 선택창

---

## 4️⃣ 변수와 데이터 타입

| 키워드  | 스코프    | 특징          |
|---------|-----------|---------------|
| `var`   | 함수 단위 | 재선언 가능   |
| `let`   | 블록 단위 | 재선언 불가   |
| `const` | 블록 단위 | 값 변경 불가  |

**데이터 타입**: 숫자(Number), 문자열(String), 불리언(Boolean), 객체(Object), null, undefined

```javascript
let name = "홍길동";
const PI = 3.14;
var age = 20;
```

---

## 5️⃣ 리터럴과 연산자

### ▶ 리터럴

값 자체를 표현한 것 (숫자, 문자열, 불리언 등)

```javascript
let oct = 015;  // 8진수
let hex = 0x15; // 16진수
let str = "그녀는 \"누구세요\"라고 말했다.";
```

### ▶ 주요 연산자

| 종류     | 예시                     | 설명           |
|----------|--------------------------|----------------|
| 산술     | `+, -, *, /, %`          | 기본 연산      |
| 비교     | `==, !=, >, <, >=, <=`   | 참/거짓 반환   |
| 논리     | `&&, ||, !`              | 논리 연산      |
| 조건     | `조건 ? 참 : 거짓`       | 삼항 연산      |
| 비트     | `&, |, ^, ~, <<, >>`     | 비트 연산      |
| 문자열   | `+`                      | 문자열 결합    |

```javascript
"abc" + 23; // "abc23"
23 + "35";  // "2335"
```

---

## 6️⃣ 제어문

### ▶ 조건문

```javascript
if(score >= 90) grade = "A";
else if(score >= 80) grade = "B";
else grade = "F";
```

```javascript
switch(menu) {
  case "에스프레소": price = 2000; break;
  case "카푸치노": price = 3000; break;
  default: price = 0;
}
```

### ▶ 반복문

```javascript
let sum = 0;
for(let i = 0; i <= 10; i++) sum += i;
```

- `while`, `do-while` 문 가능
- `break`: 반복 종료
- `continue`: 다음 반복으로 이동

---

## 7️⃣ 함수

### ▶ 선언과 호출

```javascript
function add(a, b) {
  return a + b;
}
let result = add(10, 20);
```

### ▶ 예제: 구구단 출력

```javascript
function gugudan(n) {
  if(n < 1 || n > 9) return alert("잘못된 입력");
  for(let i = 1; i <= 9; i++)
    document.write(`${n} x ${i} = ${n*i}<br>`);
}
```

---

## 8️⃣ 내장 함수

| 함수                  | 설명                       |
|-----------------------|----------------------------|
| `eval("2*3+4*6")`     | 문자열 수식을 계산         |
| `parseInt("32")`      | 문자열을 정수로 변환       |
| `isNaN("hello")`      | 숫자가 아니면 true 반환    |

---

## 🧭 요약

- 자바스크립트는 HTML과 함께 작동하는 동적 언어
- 변수 선언은 `let`, `const` 사용 권장
- 데이터 타입은 자동으로 결정 (동적 타이핑)
- 조건문과 반복문으로 논리 제어 가능
- 함수로 코드 재사용성 및 유지보수 향상
- 내장 함수로 다양한 연산 수행 가능
