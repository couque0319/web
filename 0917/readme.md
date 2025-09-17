
# 웹 프로그래밍 - HTML5 문서 구조화와 웹 폼

## 강의 목표

1. HTML5의 문서 구조화의 목적과 시맨틱 태그에 대해 이해한다.
2. HTML5 시맨틱 태그로 구조화된 웹 페이지를 만들 수 있다.
3. 웹 폼의 목적을 이해한다.
4. 웹 폼의 요소를 활용하여 사용자로부터 입력 받는 웹 페이지를 작성할 수 있다.

## 1. HTML5의 문서 구조화

### 기존 HTML의 한계
- 웹 문서 구조를 표현하는 태그 없음
- `<div>` 태그나 `<table>` 태그로 구조화되어 보이게 작성
- HTML 페이지의 소스를 보면 문서 구조 파악 불가능

### 문서 구조화의 이유
- 검색 엔진이 좋아하는 웹 페이지 작성의 필요성 대두
- 정보 탐색이 중요해진 시대
- 사물인터넷으로 IT 장치들이 스스로 정보 검색하는 시대
- 사용자가 만든 웹 페이지 가치 극대화 – 탐색이 쉽도록 작성

### 시맨틱 웹
웹 문서를 구조화하여 의미 있는 내용 탐색이 용이한 웹

#### 기존 태그와 시맨틱 태그의 차이
- **기존 태그**: `<p>`, `<div>`, `<h1>`, `<h2>` 등 사용. 문서의 구조나 의미 전달 어려움
- **시맨틱 태그**: 문서의 구조와 의미를 전달하는 태그

## 2. HTML5 시맨틱 태그

### 주요 시맨틱 태그

#### `<header>`
- 페이지나 섹션의 머리말 표현
- 페이지 제목, 페이지를 소개하는 간단한 설명

#### `<nav>`
- 하이퍼링크들을 모아 놓은 특별한 섹션
- 페이지 내 목차를 만드는 용도

#### `<section>`
- 문서의 장(chapter, section) 혹은 절을 구성하는 역할
- 일반 문서에 여러 장이 있듯이 웹 페이지에 여러 `<section>` 가능
- 헤딩 태그(`<h1>`~`<h6>`)를 사용하여 절 혹은 섹션의 주제 기입

#### `<article>`
- 본문과 연관 있지만, 독립적인 콘텐트를 담는 영역
- 보조 기사, 블로그 포스트, 댓글 등 기타 독립적인 내용
- `<article>`에 담는 내용이 많은 경우 여러 `<section>` 둘 수 있음

#### `<aside>`
- 본문에서 약간 벗어난 노트나 팁
- 신문, 잡지에서 주요 기사 옆 관련 기사, 삽입 어구로 표시된 논평 등
- 페이지의 오른쪽이나 왼쪽에 주로 배치

#### `<footer>`
- 꼬리말 영역, 주로 저자나 저작권 정보

### 문서의 모양은 구조와 별개
- 시맨틱 태그의 위치와 색, 모양이 자동으로 결정되는 것이 아님
- 개발자가 CSS3를 이용하여 직접 위치와 색, 모양을 지정해야 함

### 기타 시맨틱 태그

#### 시맨틱 블록 태그

**`<figure>`**
- 책이나 보고서 등 본문에 삽입하는 사진, 차트, 삽화, 소스 코드 등을 통상적으로 '그림'으로 표현

**`<details>`와 `<summary>`**
- `<details>`: 상세 정보를 담는 시맨틱 블록 태그
- `<summary>`: `<details>`로 구성되는 블록의 제목 표현

#### 시맨틱 인라인 태그

- **`<mark>`**: 중요한 텍스트임을 표시
- **`<time>`**: 텍스트의 내용이 시간임을 표시
- **`<meter>`**: 주어진 범위나 %의 데이터 량 표시
- **`<progress>`**: 작업의 진행 정도 표시

## 3. HTML5에서 제거된 태그

다음 태그들은 문서의 시맨틱 구조를 저해한다는 이유로 HTML5에서 제거됨:
`<big>`, `<center>`, `<dir>`, `<font>`, `<tt>`, `<u>`, `<xmp>`, `<acronym>`, `<applet>`, `<basefont>`, `<frame>`, `<frameset>`, `<noframes>`, `<strike>`

## 4. 웹 폼 (Web Form)

### 웹 폼의 정의
- 웹 페이지에서 사용자 입력을 받는 폼
- 로그인, 등록, 검색, 예약, 쇼핑 등에 사용

### 폼 요소
폼을 만드는 다양한 태그: `<input>`, `<textarea>`, `<select>` 등

### `<form>` 태그 속성

- **name 속성**: 폼의 이름 지정
- **action 속성**: 폼 데이터를 처리할 웹 서버 응용프로그램의 이름
- **method 속성**: 폼 데이터를 웹 서버로 전송하는 형식 (GET, POST)

```html
<form name="fo" method="get" action="process.php">
    ...
</form>
```

## 5. 폼 요소의 종류

### 텍스트 입력

#### `<input type="text">`
- 한 줄 짜리 입력 창

#### `<input type="password">`
- 암호 입력 창
- 사용자 입력 문자 대신 '*' 등 다른 글자로 출력

#### `<textarea>`
- 여러 줄 입력 창

### 데이터 목록을 가진 텍스트 입력

#### `<datalist>`
- 목록 리스트를 작성하는 태그
- `<option>` 태그로 항목 하나 표현
- `<input type="text">`에 입력 가능한 데이터 목록 제공

```html
나라 : <input type="text" list="countries">
<datalist id="countries">
    <option value="가나">
    <option value="스위스">
    <option value="브라질">
</datalist>
```

### 버튼 만들기

#### `<input>` 태그로 버튼 만들기
```html
<input type="button|reset|submit|image" value="버튼의 문자열">
```

#### `<button>` 태그로 버튼 만들기
```html
<button type="button|reset|submit">버튼의 문자열</button>
```

### 선택형 입력

#### 체크박스 (`<input type="checkbox">`)
- 여러 항목 중 다중 선택 가능

#### 라디오버튼 (`<input type="radio">`)
- name 속성 값이 같은 라디오버튼들이 하나의 그룹 형성
- 그룹 내에서 하나만 선택 가능

#### 콤보 박스 (`<select>`)
- 드롭다운 리스트에 목록 출력
- `<option>` 태그로 항목 하나 표현

### `<label>` 태그로 캡션 만들기

#### 2가지 방법
1. 폼 요소를 `<label>` 태그로 감싸기
```html
<label>사용자 ID : <input type="text"></label>
```

2. for 속성과 id 속성 사용
```html
<label for="loginID">사용자 ID : </label>
<input type="text" id="loginID">
```

### 색 입력 폼

#### `<input type="color">`
- 컬러 다이얼로그 출력
- 사용자로부터 색 선택

```html
<input type="color" value="#00FF00">
```

### 시간 정보 입력 폼 요소

- **`<input type="month">`**: 달 입력
- **`<input type="week">`**: 주 입력
- **`<input type="date">`**: 날짜 입력
- **`<input type="time">`**: 시간 입력
- **`<input type="datetime-local">`**: 로컬 날짜시간 입력

### 숫자 입력

#### `<input type="number">`
- 스핀버튼으로 정교한 값 입력
- min, max, step 속성 사용 가능

#### `<input type="range">`
- 슬라이드 바로 대략적인 값 입력
- `<datalist>`와 함께 사용하여 눈금 표시 가능

### 형식을 가진 텍스트 입력

- **`<input type="email">`**: 이메일 주소 입력
- **`<input type="url">`**: URL 입력
- **`<input type="tel">`**: 전화번호 입력
- **`<input type="search">`**: 검색어 입력

### placeholder 속성
사용자가 입력할 데이터의 힌트를 제공

```html
<input type="email" placeholder="id@host">
```

### 폼 요소의 그룹핑

#### `<fieldset>`과 `<legend>`
- `<fieldset>`: 관련된 폼 요소들을 그룹으로 묶음
- `<legend>`: 그룹의 제목 표시

```html
<fieldset>
    <legend>회원정보</legend>
    이메일 : <input type="email"><br>
    홈페이지 : <input type="url"><br>
    전화번호 : <input type="tel">
</fieldset>
```

## 6. HTML에서의 색 표현

### 색 코드 - #rrggbb
- rr: 빨간색, gg: 초록색, bb: 파란색 농도
- 8비트 범위(0~255)로 16진수(0~FF)로 표기

예시: `#8000FF` - 빨간색 성분 0x80(128), 파란색 성분 0xFF(255)가 혼합된 보라색
