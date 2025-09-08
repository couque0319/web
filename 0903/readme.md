
# 웹 프로그래밍 기초 개념 정리

## 1. 웹의 기본 개념

### 웹의 구성
- **웹 서버**: 웹 사이트를 탑재하는 컴퓨터 (예: Google, Naver)
  - 웹 문서, 이미지, 동영상 등 데이터 저장 및 관리
  - 웹 클라이언트 요청에 따른 웹 문서 전송
- **웹 클라이언트**: 사용자 인터페이스 담당
  - 웹 서버에 문서 요청 및 사용자에게 출력

<img width="1049" height="511" alt="image" src="https://github.com/user-attachments/assets/67bb5a04-b85a-4ba3-866e-044e94002acc" />


### 인터넷과 웹의 차이
- **인터넷**: 1969년 ARPA에서 시작된 컴퓨터 연결 네트워크
  - 고유한 IP 주소로 컴퓨터 구분
  - 다양한 응용 서비스: 이메일, 뉴스, FTP, 채팅, 메신저, P2P, 스트리밍 등
- **웹**: 인터넷을 활용하는 응용 서비스 중 하나
  - 웹 서버와 웹 브라우저로 구성되는 정보 전달 및 공유 서비스
  - 인터넷이 고속도로라면 웹은 물류 산업

## 2. 웹 브라우저

### 웹 브라우저 역사
- 1990: WorldWideWeb (최초, Tim Berners-Lee 개발)
- 1993: Mosaic
- 1994: Netscape Navigator (GUI를 갖춘 최초의 브라우저)
- 1995: Internet Explorer
- 1996: Opera
- 2002: Mozilla Firefox (W3C 표준에 가장 충실)
- 2003: Safari (Apple)
- 2008: Chrome (현재 가장 많이 사용)
- 2015: Microsoft Edge

<img width="1100" height="855" alt="image" src="https://github.com/user-attachments/assets/6affad04-d619-4f15-bec0-8d7e456a7c1a" />

### 웹 브라우저 특징
- **Netscape Navigator**: 일반인도 쉽게 사용하는 GUI 제공
- **Internet Explorer**: Windows에 끼워 배포로 시장 점유
- **Opera**: 작은 크기, 빠른 렌더링 속도
- **Safari**: Mac OS와 iOS 전용
- **Firefox**: W3C 표준 충실
- **Chrome**: 현재 가장 인기있는 브라우저

## 3. 웹 사이트 구축

### 웹 서버 소프트웨어
- **Apache**: Apache 사 제작
- **IIS**: Microsoft 사 제작, Windows NT 전용
- **nginx**: NGINX 사 제작
- **GWS**: Google Web Server

### 웹 서버 응용프로그램 개발 언어
- 서버용 자바스크립트
- JSP (Java Server Page)
- Java (서블릿)
- C/C++
- PHP, Perl, Python 등

## 4. 웹 문서 vs 전자 문서

### 전자 문서
- 워드, 한글 등으로 작성
- 하나의 문서는 하나의 파일
- 텍스트, 이미지, 오디오, 비디오를 문서 내에 직접 저장

### 웹 문서
- HTML 언어로 작성, 웹 브라우저로 보기
- 페이지 단위로 파일 분할 저장
- 텍스트만 저장, 멀티미디어는 별도 파일
- 하이퍼링크로 페이지 연결
- 사용자가 읽는 순서 결정 (내비게이션)

## 5. URL 구조
```
http://www.oracle.com:80/technetwork/java/index.html
```
- **프로토콜**: HTTP, HTTPS, FTP 등
- **서버주소**: 웹 페이지를 가진 컴퓨터의 인터넷 주소
- **포트번호**: 서버가 대기하는 TCP/IP 포트 (HTTP: 80)
- **경로명**: 웹 서버 내 파일의 폴더 경로
- **파일이름**: 웹 페이지의 HTML 파일명

## 6. 웹 페이지 구성 3요소

### HTML (구조와 내용)
- 웹 페이지의 뼈대와 내용을 담당
- 태그를 사용하여 문서 구조 정의

### CSS (모양/스타일)
- 웹 페이지의 시각적 표현 담당
- 색상, 폰트, 레이아웃 등 디자인 요소

### JavaScript (행동/동작)
- 웹 페이지의 동적 기능 담당
- 사용자 상호작용, 애니메이션 등

## 7. HTML5

### HTML5 출현 배경
1. **비표준 기술의 혼재**: Active-X, 플러그인, 플래시 등 비표준 기술 난립
2. **인터넷 기기의 다양화**: PC, 모바일 등 다양한 기기에서 웹 사용
3. **새로운 범용 웹 표준의 필요성**: 모든 기기에서 동일하게 작동하는 표준

### HTML5의 의의
- 플랫폼이나 장치 의존성 제거
- PC/모바일 관계없이 동일한 실행 보장
- Active-X, 플래시 불필요
- 웹 애플리케이션 작성 지원

### HTML5 주요 기능
- 웹 폼 (Web Form)
- 오디오, 비디오
- 캔버스 (Canvas)
- SVG (Scalable Vector Graphic)
- 웹 스토리지 (Web Storage)
- 웹 SQL 데이터베이스
- 파일 입출력 (File I/O)
- 위치 정보 API (Geolocation API)
- 웹 워커 (Web Worker)
- 웹 소켓 (Web Socket)
- 오프라인 웹 애플리케이션

## 8. HTML5 문서 편집

### 편집기 종류
- **텍스트 편집기**: 메모장, 한글, 워드 등
- **전문 편집기**: Atom, Eclipse, Sublime Text 등
- **WYSIWYG 편집기**: Dreamweaver, CoffeeCup, FCKeditor 등

### 편집 시 주의사항
- UTF-8 문자셋 사용
- .html 확장자로 저장
- HTML, CSS, JavaScript 파일 모두 UTF-8로 저장

## 9. 개발 도구
- 브라우저의 개발자 도구 (F12)
- Sources 메뉴에서 소스 보기
- 중단점(break point) 설정으로 디버깅 가능
