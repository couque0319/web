
# HTML 기초 가이드

## 강의 목표
1. 웹 페이지를 만드는 기초적인 HTML 태그들을 안다
2. HTML5 기본 문서를 만들 수 있다
3. 웹 페이지에 이미지, 표, 하이퍼링크를 삽입할 수 있다
4. 인라인 프레임을 사용하여 웹 페이지에 다른 웹 페이지를 내장할 수 있다
5. 오디오 비디오를 웹 페이지에 삽입할 수 있다

## HTML 페이지 기본 구조

### HTML5 페이지의 필수 태그
- `<!DOCTYPE html>` - HTML5 문서임을 알리는 지시어
- `<html>`, `<head>`, `<title>`, `<body>` 태그

```html
<!DOCTYPE html>
<!--이 부분은 주석문입니다. 웹 브라우저는 주석을 화면에 출력하지 않습니다.-->
<html>
<head>
    문서제목, 자바스크립트 코드, CSS 스타일 정의, 메타데이터정의
</head>
<body>
    문서의 본문 텍스트, 이미지, 테이블, 자바스크립트 코드, 동영상 등
</body>
</html>
```

### HTML 태그의 특징
- **시작태그와 종료태그**: `<html> ... </html>`, `<title>문서의 제목입니다</title>`
- **시작 태그만 있는 경우**: `<br>`
- **대소문자 구분 없음**: `<HTML>` 또는 `<html>` 모두 가능
- 속성 값에 불필요한 공백 문자는 HTML5 표준에 어긋남

## 기본 HTML 요소들

### 문서 제목과 헤딩
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>첫 타이틀</title>
</head>
<body>
    <h1>1장 홈페이지 만들기</h1>
    <h2>1절 HTML 언어</h2>
    <h3>1. 웹</h3>
    <h4>1.1 인터넷</h4>
    <h5>1.1.1 네트워크</h5>
    <h6>1.1.1.1. 통신</h6>
</body>
</html>
```

### 단락과 텍스트 포맷팅
- `<p>` - 단락 나누기
- `<hr>` - 수평선 그리기
- `<br>` - 줄바꿈
- `<pre>` - 개발자 포맷 그대로 출력

### 텍스트 꾸미기 태그
- `<b>` - 진하게
- `<strong>` - 중요한 (강조)
- `<em>` - 강조
- `<i>` - 이탤릭
- `<small>` - 작은 문자
- `<del>` - 삭제선
- `<ins>` - 밑줄 (추가)
- `<sup>` - 윗첨자
- `<sub>` - 아래첨자
- `<mark>` - 하이라이팅

### 특수 문자 표현
HTML5는 유니코드 문자셋과 UTF-8 코드 체계를 사용합니다.

| 문자 | 엔터티 표현 | 코드값 표현 |
|------|-------------|-------------|
| < | `&lt;` | `&#60;` |
| > | `&gt;` | `&#62;` |
| © | `&copy;` | `&#169;` |
| ∑ | `&sum;` | `&#8721;` |
| ÷ | `&divide;` | |
| √ | `&radic;` | |
| " | `&quot;` | `&#34;` |
| 공백 | `&nbsp;` | |

## 블록 태그와 인라인 태그

### 블록 태그
- 항상 새 라인에서 시작하여 출력
- 양 옆에 다른 콘텐트를 배치하지 않고 한 라인 독점 사용
- 예시: `<p>`, `<h1>`, `<div>`, `<ul>`
- 가장 많이 사용되는 블록 태그: `<div>`

### 인라인 태그
- 블록 속에 삽입되어 블록의 일부로 출력
- 예시: `<strong>`, `<a>`, `<img>`, `<span>`
- 가장 많이 사용되는 인라인 태그: `<span>`

## 메타 데이터

### 메타 태그들
메타 태그들은 `<head>` 태그 안에 작성합니다.
- `<base>`, `<link>`, `<script>`, `<style>`, `<title>`, `<meta>`

### 주요 메타 태그 사용 예
```html
<head>
    <meta charset="utf-8">
    <meta name="author" content="황기태">
    <meta name="description" content="입학 요령에 대한 자세한 사항">
    <meta name="keywords" content="컴퓨터, 소프트웨어, 스마트폰">
    <link type="text/css" rel="stylesheet" href="mystyle.css">
    <base href="http://www.mysite.com/score/">
</head>
```

## 이미지 삽입

### `<img>` 태그
```html
<img src="media/Elvis1.jpg" width="150" height="200" alt="Elvis">
<img src="http://example.com/image.png" alt="온라인 이미지" width="100" height="100">
```

**지원하는 이미지 형식**: BMP, GIF, PNG, JPG(JPEG), animated-GIF

## 리스트 만들기

### 순서 있는 리스트 (`<ol>`)
```html
<ol type="A">
    <li>물을 끓인다.</li>
    <li>라면과 스프를 넣는다.</li>
    <li>파를 썰어 넣는다.</li>
    <li>5분 후 먹는다.</li>
</ol>
```

### 순서 없는 리스트 (`<ul>`)
```html
<ul>
    <li>감자탕</li>
    <li>스파게티</li>
    <li>올레국수</li>
</ul>
```

### 정의 리스트 (`<dl>`)
```html
<dl>
    <dt><strong>Internet Explorer</strong></dt>
    <dd>마이크로소프트에서 만든 브라우저</dd>
    <dt><strong>Firefox</strong></dt>
    <dd>Mozilla 재단에서 오픈 소스로 만든 브라우저</dd>
</dl>
```

### 중첩 리스트
리스트 안에 다른 리스트를 포함할 수 있습니다.

## 표 만들기

### 표 구조
```html
<table border="1">
    <caption>표제목</caption>
    <thead>
        <tr><th>이름</th><th>HTML</th><th>CSS</th></tr>
    </thead>
    <tfoot>
        <tr><th>합</th><th>225</th><th>230</th></tr>
    </tfoot>
    <tbody>
        <tr><td>황기태</td><td>80</td><td>70</td></tr>
        <tr><td>이재문</td><td>95</td><td>99</td></tr>
    </tbody>
</table>
```

### 표 관련 태그
- `<table>` - 표 전체 컨테이너
- `<caption>` - 표 제목
- `<thead>` - 헤딩 셀 그룹
- `<tbody>` - 데이터 셀 그룹
- `<tfoot>` - 바닥 셀 그룹
- `<tr>` - 행 (여러 `<td>`, `<th>` 포함)
- `<th>` - 열 제목(헤딩) 셀
- `<td>` - 데이터 셀

## 하이퍼링크

### 기본 링크
```html
<!-- 같은 사이트의 다른 페이지 -->
<a href="picturepage.html">클릭하면 사진 페이지로 이동합니다.</a>

<!-- 다른 웹 사이트 -->
<a href="http://www.naver.com">네이버</a>

<!-- 이미지 링크 -->
<a href="http://www.naver.com">
    <img src="naver.png" alt="네이버사이트">
</a>
```

### target 속성
- `_blank` - 새로운 브라우저 윈도우(탭) 생성
- `_self` - 현재 윈도우
- `_parent` - 부모 윈도우
- `_top` - 최상위 브라우저 윈도우
- `윈도우이름` - 대상 윈도우 이름

### 앵커 (Anchor)
```html
<!-- 앵커 생성 -->
<h3 id="love">Love me tender</h3>

<!-- 앵커로 이동하는 링크 -->
<a href="#love">Love me tender</a>
```

### 파일 다운로드
```html
<a href="media/Elvis.png" download>엘비스 이미지 다운로드</a>
<a href="media/chapter9.pdf" download>PDF 다운로드</a>
```

## 인라인 프레임

### `<iframe>` 태그
```html
<iframe src="iframe1.html" width="200" height="150">
    브라우저는 iframe 태그를 지원하지 않습니다.
</iframe>
```

### srcdoc 속성
```html
<iframe src="iframe1.html" width="200" height="80"
        srcdoc="<html><head></head><body>hello</body></html>">
</iframe>
```

### 프레임과 target 활용
```html
<iframe src="sitelist.html" name="left" width="200" height="300"></iframe>
<iframe src="http://www.w3c.org" name="right" width="300" height="300"></iframe>

<!-- left 프레임의 링크 -->
<a href="http://www.w3c.org" target="right">W3C</a>
```

## 미디어 삽입

### 비디오 삽입
```html
<video src="bear.mp4" width="320" height="240" controls>
    브라우저가 video 태그를 지원하지 않습니다.
</video>

<!-- 다중 소스 -->
<video width="320" height="240" controls>
    <source src="bear.mp4" type="video/mp4">
    <source src="bear.ogg" type="video/ogg">
    브라우저가 video 태그를 지원하지 않습니다.
</video>
```

### 비디오 태그 속성
- `controls` - 재생 제어 버튼 표시
- `autoplay` - 자동 재생 (보안상 제한됨)
- `loop` - 반복 재생
- `muted` - 소리 끄기
- `preload` - 미리 로드 방식
- `poster` - 포스터 이미지

### 오디오 삽입
```html
<audio src="mymusic.mp3" controls loop>
    브라우저가 audio 태그를 지원하지 않습니다.
</audio>

<!-- 다중 소스 -->
<audio controls>
    <source src="mymusic.mp3" type="audio/mpeg">
    <source src="mymusic.ogg" type="audio/ogg">
    브라우저가 audio 태그를 지원하지 않습니다.
</audio>
```

### 오디오 태그 속성
- `controls` - 재생 제어 버튼 표시
- `autoplay` - 자동 재생 (보안상 제한됨)
- `loop` - 반복 재생
- `muted` - 소리 끄기
- `preload` - 미리 로드 방식

## 주의사항

### 보안 관련
- 최신 브라우저에서는 보안의 이유로 `<audio>`와 `<video>` 태그의 `autoplay` 속성이 작동하지 않습니다.
- 사용자가 브라우저 상에서 재생 버튼을 눌러야 작동합니다.

### 스타일링
- 테두리, 색상 등의 시각적 스타일링은 CSS3를 사용하는 것이 바람직합니다.
- HTML의 `border` 속성보다는 CSS로 스타일을 적용하는 것을 권장합니다.
