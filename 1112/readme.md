
📌 Web Programming Project
🚀 프로젝트 개요

이 프로젝트는 여러 웹 서비스 개발 경험을 기반으로 한 종합 웹 개발 프로젝트로,
다양한 기능 구현 및 UI/UX 실험을 통해 웹 기술을 실제 서비스 형태로 구현하는 것을 목표로 한다.

주요 작업 범위는 다음과 같다:

React + Vite 기반 프로젝트 구성

Supabase 데이터 연동

지도 기반 서비스 개발 (자전거보관소, 자전거길, 맛집 지도 등)

정적/동적 웹페이지 제작

여러 기능별 독립 프로젝트 개발 (CampusNotes, PROJECT: MECH, 맛집 추천 사이트, 탄막 슈팅 게임 등)

📁 프로젝트 구성 요소
1️⃣ Supabase 기반 데이터 연동

Supabase를 사용해 테이블 데이터를 불러오고 React에서 비동기로 처리.

API Key는 .env 파일에 분리해 관리.

주요 활용 예:

자전거 보관소 데이터 불러오기

자전거 도로(WFS) 데이터 처리

사용자 데이터 저장

2️⃣ 지도 기반 웹 서비스 구현
✔ 자전거 보관소 지도 웹앱

공공데이터포털 API 사용.

KakaoMap 또는 vWorld Map 적용.

데이터 WMS/WFS 형식 변환 후 시각화.

정확한 위치 정제(좌표계 변환 포함).

✔ 자전거길 지도 및 리스트 기능

TXT 파일의 상세 경로 데이터를 전부 출력하도록 수정.

지도에 경로가 정확히 표시되도록 좌표 처리 개선.

✔ 맛집/관광지 추천 사이트

주요 기능:

주변 맛집 자동 탐색

목적지 주변 역/정류장 표시

대표 메뉴·가격 출력

태그 기능 (# 분위기, #SNS 스타일)

리뷰 노출

연령대별 추천 카테고리

요리 종류 필터

지도 기반 위치 표기

교통수단 추천 기능(프론트엔드에서 간단한 텍스트 추천 방식)

3️⃣ 게임 개발 프로젝트 (PROJECT: MECH & Striker2945)
✔ Phaser 또는 Canvas 기반의 슈팅 게임

스테이지 시스템(튜토리얼~Hard 모드)

몬스터/보스 패턴 기반 탄막 시스템

이미지 기반 스프라이트 로드

플레이어 기체 선택 기능 (hangar.html)

HP 하트 이미지 기반 HUD

게임 오버 처리

사운드 효과(hit, game_over)

스테이지 잠금/해제 시스템

상점 기능 및 능력 강화 (연사력, 데미지, 기관포 라인 추가 등)

4️⃣ CampusNotes 사이트

학생들의 학습 노트를 공유 및 열람하는 플랫폼.

목적:

전공 학습에 필요한 개념이나 노트를 서로 공유

학습법, 공부법 습득

Lovable 플랫폼을 이용해 자동 웹 생성.

사이트 구조:

게시글 목록

필터/검색 기능

노트 상세 페이지

태그 구조

UI/UX 자동 구성

5️⃣ 웹사이트 UI/UX 작업

다크모드·라이트모드 CSS 변수 정의

반응형 UI 구성

카테고리 필터, 상세보기 모달, 버튼 인터랙션 등 프론트엔드 기능 구현

PPT 프롬프트 제작 및 프로젝트 소개 문서화

6️⃣ GitHub 운영 관련 정리

브랜치 생성 및 머지 전략

GitHub Pages 배포 방식

“Deploy from a branch” 설정

Private → Public 전환

리포지토리 구조 관리 (intro/main/select/game/hangar 등)

📂 예시 폴더 구조 (게임 프로젝트)
Webgame/
│
├── intro.html
├── main.html
├── select_stage.html
├── stage_list_easy.html
├── stage_list_hard.html
├── game.html
├── hangar.html
│
└── assets/
    ├── css/
    │   ├── base.css
    │   ├── intro.css
    │   ├── main_layout.css
    │   ├── main.css
    │   ├── stage.css
    │   └── stage_list.css
    │
    ├── js/
    │   ├── script.js
    │   ├── main_game.js
    │   ├── stage_manager.js
    │   └── stage_defs.js
    │
    ├── images/
    │   ├── player/
    │   ├── enemy/
    │   ├── boss/
    │   ├── hp/
    │   └── bullets/
    │
    └── audio/
        ├── hit.mp3
        └── game_over.mp3

📑 프로젝트 진행 방식 요약

다양한 웹 서비스 개발을 병행하며 기술역량 확장

GitHub 기반 버전 관리

Supabase, Public Data API, KakaoMap, vWorld API 연동 실습

Canvas/Phaser 기반 게임 개발 실습

PPT, Markdown 정리로 문서화 능력 강화
