# 4장 CSS3 스타일 시트 정리

---

## CSS3 개요
- **CSS (Cascading Style Sheet)** : HTML 문서의 외관을 꾸미는 언어
- CSS로 작성된 코드를 **스타일 시트**라고 부름
- CSS 발전 단계 : CSS1 → CSS2 → CSS3 → CSS4(표준화 진행 중)
- 주요 기능
  - 색상과 배경
  - 텍스트 / 폰트
  - 박스 모델(Box Model)
  - 비주얼 효과
  - 리스트, 테이블, UI

---

## CSS3 작성 방법
1. `<style>` 태그 안에 작성
2. HTML 태그의 `style` 속성에 작성
3. 외부 `.css` 파일 작성 후 불러오기 (`<link>`, `@import`)

### 예제 4–2 (CSS3 스타일 시트 적용)
```html
<style>
body { background-color : mistyrose; } 
h3 { color : purple; }
hr { border : 5px solid yellowgreen; }
span { color : blue; font-size : 20px; }
</style>
```

---

## CSS3 규칙
- **상속** : 부모 태그의 스타일이 자식 태그에 상속됨
- **합치기(Cascading) & 오버라이딩** : 동일한 스타일이 중첩되면 우선순위가 높은 스타일이 적용됨
  1. 브라우저 디폴트 스타일
  2. 외부 스타일 시트
  3. `<style>` 태그 내부 선언
  4. 태그의 `style` 속성

---

## 셀렉터(Selector)
- 태그 이름 셀렉터 (예: `h3 { color:brown; }`)
- 클래스 셀렉터 (`.classname`)
- 아이디 셀렉터 (`#idname`)
- 자식 셀렉터 (`div > strong`)
- 자손 셀렉터 (`ul strong`)
- 전체 셀렉터 (`* { color:green; }`)
- 속성 셀렉터 (`input[type=text]`)
- 가상 클래스 셀렉터 (`a:hover`, `li:hover`, `h3:first-letter`)

---

## 색상 지정 방법
- 16진수 코드: `#8A2BE2`
- RGB 코드: `rgb(138, 43, 226)`
- 색 이름: `blueviolet`

```css
div { color : #8A2BE2; }
div { color : rgb(138,43,226); }
div { color : blueviolet; }
```

---

## 텍스트 꾸미기
- `text-decoration: none;` → 밑줄 제거
- `text-align: left|right|center|justify`
- `text-indent: n em;` → 들여쓰기
- `line-through`, `overline` 등

---

## 폰트 제어
- `font-family`
- `font-size`
- `font-style`
- `font-weight`
- **단축 프로퍼티 `font`**:  
  `font: italic bold 20px consolas, sans-serif;`

---

## 박스 모델(Box Model)
- 구성 요소: `margin`, `border`, `padding`, `content`
- 예제 CSS:
```css
div.box {
  width:150px;
  height:50px;
  margin:40px;
  border:30px solid peru;
  padding:20px;
}
```

### 테두리 스타일
- `solid`, `dotted`, `dashed`, `double`, `groove`, `ridge`, `inset`, `outset`

### 둥근 모서리
```css
p { border-radius: 50px; }
p { border-radius: 0px 20px 40px 60px; }
```

### 이미지 테두리
```css
p {
  border: 20px solid lightgray;
  border-image: url("border.png") 30 round;
}
```

---

## 배경 꾸미기
- `background-color`
- `background-image`
- `background-position`
- `background-repeat`
- **단축 프로퍼티**
```css
div {
  background: skyblue url("media/spongebob.png") center center/100px 100px repeat-y;
}
```

---

## 그림자 효과
### 텍스트 그림자
```css
text-shadow: 3px 3px red;
text-shadow: 3px 3px 5px skyblue;
```

### 박스 그림자
```css
box-shadow: 10px 10px red;
box-shadow: 2px 2px 2px black, 0 0 25px blue;
```

---

## 마우스 커서 제어
- `cursor: crosshair`
- `cursor: help`
- `cursor: pointer`
- `cursor: progress`
- `cursor: n-resize`

---

# 5장 CSS3 배치와 동적 효과 정리

---

## 배치 (Layout)
- CSS3로 HTML 태그의 출력 위치를 제어
- 주요 프로퍼티: `display`, `position`, `top/right/bottom/left`, `float`, `z-index`, `visibility`, `overflow`

### 블록/인라인 박스
- 블록 태그 → 블록 박스 (한 줄 전체 차지)
- 인라인 태그 → 인라인 박스 (라인 내 배치)

### display 속성
- `block` : 태그를 블록 박스로 표시
- `inline` : 인라인 박스로 표시
- `inline-block` : 인라인에 배치 + 크기 조절 가능
- `none` : 화면에 보이지 않음

```css
span { display:block; width:100px; height:60px; }
div { display:inline-block; margin:10px; width:60px; height:80px; }
```

---

## position 속성
- `static` : 기본 배치
- `relative` : 원래 위치 기준으로 이동
- `absolute` : 부모 기준 절대 좌표 배치
- `fixed` : 브라우저 화면 기준 고정
- `float` : 좌/우로 띄워 배치

```css
#down:hover { position:relative; left:20px; top:20px; }
#fixed { position:fixed; bottom:10px; right:10px; }
```

### z-index
- 겹치는 요소의 쌓임 순서 제어  
  값이 클수록 위에 표시됨

### visibility
- `visible`, `hidden` (공간은 차지하지만 보이지 않음)

### overflow
- `hidden`, `visible`, `scroll`

---

## 리스트 꾸미기
- `list-style-position` : 마커 위치 지정 (`inside`/`outside`)
- `list-style-type` : circle, square, decimal, roman 등
- `list-style-image` : 사용자 정의 이미지 마커

```css
ul { list-style-type: square; }
ul { list-style-image: url("marker.png"); }
```

### 메뉴바 예제
```css
#menubar ul li {
  display:inline-block;
  list-style-type:none;
  padding:0 15px;
}
#menubar ul li a:hover { color:violet; }
```

---

## 표(Table) 꾸미기
- `border`, `border-collapse:collapse;`
- 셀 크기 : `width`, `height`
- 여백 및 정렬 : `padding`, `text-align`
- 짝수 행 색상 변경 : `nth-child(even)`
- 마우스 오버 효과 : `tr:hover`

```css
tbody tr:nth-child(even) { background:aliceblue; }
tbody tr:hover { background:pink; }
```

---

## 폼(Form) 꾸미기
- 입력 필드 색상: `input[type=text]{ color:red; }`
- 테두리: `border`, `border-radius`
- 반응형 스타일:
  - `:hover` → 마우스 올렸을 때
  - `:focus` → 포커스 받았을 때

```css
input[type=text]:focus { font-size:120%; }
textarea:hover { background:aliceblue; }
```

---

## 동적 효과

### 1. 애니메이션 (animation)
- 단계별 스타일 변화를 지정
```css
@keyframes textColorAnimation {
  0% { color:blue; }
  30% { color:green; }
  100% { color:red; }
}
span {
  animation-name: textColorAnimation;
  animation-duration: 5s;
  animation-iteration-count: infinite;
}
```

### 2. 전환 (transition)
- CSS 속성이 변할 때 서서히 진행
```css
span { transition: font-size 5s; }
span:hover { font-size:500%; }
```

### 3. 변환 (transform)
- 회전, 이동, 확대/축소, 기울임
```css
div { transform: rotate(20deg); }
div { transform: translateY(100px); }
div { transform: scale(3,1); }
div { transform: skew(0deg,-20deg); }
```

---

## 4징 요약
- CSS3는 HTML 문서의 디자인을 담당
- 작성 방식: 내부, 인라인, 외부 파일
- 규칙: 상속과 오버라이딩 존재
- 주요 기능: 색상, 텍스트, 폰트, 박스 모델, 배경, 그림자, 커서 제어


## 5장 요약
- `display`와 `position`으로 배치 제어 가능
- 리스트와 표는 스타일 속성으로 꾸밀 수 있음
- 폼 요소는 `:hover`, `:focus`로 반응형 꾸미기 가능
- CSS3는 애니메이션, 전환, 변환을 지원하여 자바스크립트 없이도 동적 효과 가능

