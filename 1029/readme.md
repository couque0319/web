# 📘 8장. HTML DOM과 document 객체

## 🧩 1. HTML DOM의 개념

### 💡 정의

**DOM(Document Object Model)**: HTML 문서의 각 태그를 객체로 표현한 모델

- 각 HTML 태그 = 하나의 DOM 객체
- HTML 태그의 포함관계에 따라 **트리 구조(DOM 트리)** 로 구성됨

### 💻 DOM 트리의 루트

**document 객체**

브라우저는 HTML 로딩 시:
1. document 객체 생성
2. 태그를 읽어 DOM 객체 생성
3. 화면에 출력
4. 로딩 완료 시 DOM 트리 완성
5. DOM 변경 시 브라우저가 화면 자동 갱신

---

## 🧱 2. DOM 객체의 구성 요소

| 구성 요소 | 설명 |
|----------|------|
| **Property** | HTML 태그 속성 반영 (예: id, innerHTML) |
| **Method** | 태그 제어 함수 (예: click(), setAttribute()) |
| **Collection** | 자식 DOM 객체들의 집합 (children, firstElementChild 등) |
| **Event Listener** | HTML 이벤트 리스너 (예: onclick, onload) |
| **CSS3 Style** | 태그의 CSS 속성 접근 (style.color, style.border 등) |

---

## 🔍 3. DOM 객체 제어

### 📘 예제: id를 이용한 접근
```html
<p id="firstP">안녕하세요</p>
<script>
let p = document.getElementById("firstP");
p.style.color = "red"; // 글자색 변경
</script>
```

### ⚙️ 예제: 버튼 클릭 시 스타일 변경
```javascript
function change() {
  let span = document.getElementById("mySpan");
  span.style.color = "green";
  span.style.fontSize = "30px";
  span.style.border = "3px dotted magenta";
}
```

---

## 🧠 4. innerHTML 프로퍼티

**기능**: HTML 태그 내부 콘텐츠를 변경

**예:**
```javascript
p.innerHTML = "나의 <img src='puppy.png'> 강아지";
```

HTML 구조를 문자열로 입력하면 브라우저가 태그로 해석해 출력함.

---

## 🪞 5. this 키워드

**의미**: 현재 객체 자신을 가리킴

**DOM 이벤트에서 사용:**
```html
<button onclick="this.style.backgroundColor='orange'">버튼</button>
```

**또는 함수에 인자로 전달:**
```html
<button onclick="change(this, '30px', 'red')">버튼</button>
```

---

## 🧭 6. document 객체

### 🧩 역할

- HTML 문서 전체를 대표하는 최상위 객체
- 모든 DOM 접근의 시작점 (window.document 또는 document)
- 스타일 시트 없음 (직접 CSS 제어 불가)

### 주요 프로퍼티 예시

| 프로퍼티 | 설명 |
|----------|------|
| **location, URL** | 현재 문서의 주소 |
| **title** | 문서 제목 |
| **domain** | 도메인 이름 |
| **body, head** | 문서의 주요 영역 객체 |
| **readyState** | 문서 로딩 상태 |
| **referrer** | 이전 페이지 주소 |

---

## 🔎 7. DOM 객체 검색 메소드

| 메소드 | 설명 |
|--------|------|
| `getElementById("id")` | id로 단일 객체 찾기 |
| `getElementsByTagName("태그")` | 태그 이름으로 여러 객체 찾기 |
| `getElementsByClassName("클래스")` | 클래스 이름으로 여러 객체 찾기 |

### 예제
```javascript
let spans = document.getElementsByTagName("span");
for (let i = 0; i < spans.length; i++) {
  spans[i].style.color = "orchid";
}
```

---

## 🧾 8. document.write() / writeln()

### ⚙️ 사용 방식
```javascript
document.write("<h3>Welcome</h3>");
document.writeln("한 줄 띄기");
```

- HTML 문서가 로드 중일 때만 유효
- 이미 로드된 문서에 사용하면 기존 내용이 사라짐

---

## 🔐 9. document.open() / close()

- `open()`: 현재 문서의 DOM 트리를 지우고 새 문서 작성 시작
- `close()`: 작성 종료 후 출력 완료

**새 창에 출력도 가능:**
```javascript
let win = window.open("", "outWin");
win.document.open();
win.document.write("<h3>안녕하세요</h3>");
win.document.close();
```

---

## 🧰 10. DOM의 동적 생성 및 삭제

### 생성
```javascript
let newDIV = document.createElement("div");
newDIV.innerHTML = "새로 생성된 DIV입니다.";
newDIV.style.backgroundColor = "yellow";
```

### 삽입
```javascript
parent.appendChild(newDIV);
```

### 삭제
```javascript
parent.removeChild(newDIV);
```

**클릭 시 자신을 삭제하도록 설정 가능:**
```javascript
newDIV.onclick = function() {
  this.parentElement.removeChild(this);
};
```

---

## 📄 요약

| 주요 개념 | 핵심 내용 |
|----------|----------|
| **DOM** | HTML 태그를 객체로 표현한 모델 |
| **document** | DOM 트리의 루트이자 HTML 전체 제어 객체 |
| **innerHTML** | 콘텐츠 변경 |
| **style** | CSS 제어 |
| **getElement...()** | DOM 검색 |
| **createElement / appendChild / removeChild** | 동적 추가/삭제 |
| **write() / open() / close()** | 문서 생성 및 출력 제어 |

---

# 📘 9장. 이벤트(Event)와 이벤트 리스너

## 🧩 1. 이벤트의 개념

### 💡 이벤트(Event)

- 사용자의 행동(마우스 클릭, 키 입력 등) 또는
- 브라우저의 상태 변화(문서 로딩, 타이머 종료 등) 를
- 자바스크립트 코드에 알려주는 **통지(notification)**.

### 💡 이벤트 리스너(Event Listener)

이벤트 발생 시 실행되는 자바스크립트 코드.

### 주요 이벤트 종류

| 이벤트 | 설명 |
|--------|------|
| **click** | 마우스 클릭 |
| **dblclick** | 마우스 더블클릭 |
| **keydown, keyup** | 키 누름 / 키 뗌 |
| **load** | 문서나 이미지 로딩 완료 |
| **resize** | 윈도우 크기 변경 |
| **submit, reset** | 폼 전송 / 초기화 |

---

## 🧱 2. 이벤트 리스너 작성 방법

### ✅ 방법 1. HTML 태그 내 직접 작성
```html
<p onmouseover="this.style.backgroundColor='orchid'"
   onmouseout="this.style.backgroundColor='white'">
마우스를 올리면 배경색 변경
</p>
```

### ✅ 방법 2. DOM 객체의 이벤트 프로퍼티 사용
```javascript
let p = document.getElementById("p");
p.onmouseover = over;
p.onmouseout = out;

function over() { p.style.backgroundColor = "orchid"; }
function out()  { p.style.backgroundColor = "white"; }
```

### ✅ 방법 3. addEventListener() 메소드 사용
```javascript
p.addEventListener("mouseover", over);
p.addEventListener("mouseout", out);
```

- **장점**: 하나의 객체에 여러 리스너 등록 가능
- **형식**: `addEventListener(이벤트명, 함수, useCapture)`

### ✅ 방법 4. 익명 함수 사용
```javascript
p.onmouseover = function() {
  this.style.backgroundColor = "orchid";
};
p.addEventListener("mouseout", function() {
  this.style.backgroundColor = "white";
});
```

---

## 🔍 3. 이벤트 객체 (Event Object)

### 💡 개념

이벤트 발생 시 자동으로 생성되어
**이벤트 관련 정보(타입, 타겟, 좌표, 키값 등)** 를 담는 객체.

### 이벤트 객체 전달 방식
```javascript
function f(e) { alert(e.type); }      // e에 이벤트 객체 전달
obj.onclick = f;                      // 일반 함수
obj.onclick = function(e) { ... }     // 익명 함수
```
```html
<button onclick="f(event)">버튼</button> <!-- HTML 태그 -->
```

### 📋 주요 프로퍼티

| 프로퍼티 | 설명 |
|----------|------|
| **type** | 이벤트 종류 |
| **target** | 이벤트가 발생한 객체 |
| **currentTarget** | 현재 이벤트를 처리 중인 객체 |
| **defaultPrevented** | 기본 동작이 취소되었는가 |
| **cancelable** | 기본 동작 취소 가능 여부 |

---

## 🚫 4. 기본 동작 취소 (preventDefault)

### 💡 디폴트 행동 예시

| 태그 | 기본 동작 |
|------|----------|
| `<a>` | 링크 이동 |
| `<form>` | 데이터 전송 |
| `<input type="checkbox">` | 체크 상태 변경 |

### 💻 취소 방법
```html
<a href="https://naver.com" onclick="return false">이동 안 됨</a>
<a href="https://naver.com" onclick="event.preventDefault()">이동 안 됨</a>
```

**또는 함수에서:**
```javascript
function noAction(e) {
  e.preventDefault();
}
```

---

## 🔁 5. 이벤트 흐름(Event Flow)

### 💡 흐름 단계

1. **Capturing Phase** – window → target까지 전달
2. **Target Phase** – 이벤트 타겟 도착
3. **Bubbling Phase** – target → window로 전파

### 📘 등록 예시
```javascript
button.addEventListener("click", captureFunc, true);  // 캡처 단계
button.addEventListener("click", bubbleFunc, false);  // 버블 단계
```

- 기본값은 **false** (버블 단계)

### 🔹 이벤트 전파 중단
```javascript
event.stopPropagation();
```

---

## 🖱️ 6. 마우스 이벤트

| 이벤트 | 설명 |
|--------|------|
| **onclick** | 클릭 |
| **ondblclick** | 더블클릭 |
| **onmousedown / onmouseup** | 누름 / 뗌 |
| **onmouseover / onmouseout** | 마우스 진입 / 이탈 |
| **onwheel** | 마우스 휠 회전 |
| **onmousemove** | 이동 시 호출 |
| **oncontextmenu** | 오른쪽 클릭 시 메뉴 표시 |

### 📘 예제: onwheel로 테두리 두께 조정
```javascript
function wheel(e, obj) {
  if (e.wheelDelta < 0) width--;
  else width++;
  obj.style.borderWidth = width + "px";
}
```

### 📘 예제: 마우스 위치 추적
```javascript
function where(e) {
  console.log(e.clientX, e.clientY);
}
```

---

## 🌐 7. 문서 및 이미지 로딩 이벤트

### 🔸 onload

- window나 document, img 태그 로딩 완료 시 호출
- 페이지 초기화 코드에 주로 사용
```html
<body onload="init()">
```
```javascript
window.onload = function() { alert("페이지 로드 완료"); }
```

### 🔸 이미지 로딩 후 작업
```javascript
let img = document.getElementById("myImg");
img.onload = function() {
  alert(img.width + "x" + img.height);
};
img.src = "banana.png";
```

### 🔸 new Image() 활용
```javascript
let banana = new Image();
banana.src = "banana.png";
document.getElementById("target").src = banana.src;
```

---

## 🧍 8. 폼(Form) 관련 이벤트

### 🔹 onfocus / onblur

포커스를 얻거나 잃을 때 발생.
```javascript
function checkFilled(obj) {
  if (obj.value == "") obj.focus();
}
```

### 🔹 라디오 버튼과 체크박스
```javascript
let cities = document.getElementsByName("city");
for (let c of cities)
  if (c.checked) alert(c.value);
```

**체크박스 계산:**
```javascript
function calc(box) {
  sum += box.checked ? +box.value : -box.value;
  document.getElementById("sumtext").value = sum;
}
```

### 🔹 select와 onchange
```html
<select id="fruits" onchange="drawImage()">
  <option value="banana.png">바나나</option>
</select>
```
```javascript
function drawImage() {
  let sel = document.getElementById("fruits");
  img.src = sel.options[sel.selectedIndex].value;
}
```

---

## ⌨️ 9. 키보드 이벤트

| 이벤트 | 설명 |
|--------|------|
| **onkeydown** | 키가 눌려질 때 |
| **onkeypress** | 문자 키 입력 시 |
| **onkeyup** | 키가 떼어질 때 |
```javascript
function whatKeyDown(e) {
  console.log(e.key, e.code);
}
```

### 📘 응용 예제: 방향키로 셀 이동

`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight` 키로 3×3 표 내 이동.

---

## 📮 10. onsubmit / onreset

- **onreset**: reset 버튼 클릭 시 (false 반환 → 초기화 취소)
- **onsubmit**: submit 버튼 클릭 시 (false 반환 → 전송 취소)
- `<form>` 태그에 작성해야 함.
```html
<form onsubmit="return checkForm()" onreset="return confirm('리셋할까요?')">
```

---

## 📄 요약

| 주제 | 핵심 개념 |
|------|----------|
| **이벤트** | 사용자 입력 또는 시스템 변화의 통지 |
| **이벤트 리스너** | 이벤트에 응답하는 코드 |
| **이벤트 객체** | 이벤트의 정보(타입, 타겟, 좌표 등) |
| **이벤트 흐름** | Capturing → Target → Bubbling |
| **마우스 이벤트** | 클릭, 이동, 휠, 컨텍스트 메뉴 등 |
| **onload** | 문서/이미지 로딩 완료 시 실행 |
| **폼 이벤트** | focus, blur, change, submit, reset |
| **키 이벤트** | 키 입력 시 호출되는 리스너 |
