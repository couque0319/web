
# 📌 SportsMap 프로젝트 통합 요약

## 1. 프로젝트 개요

SportsMap은 전국 체육시설·프로그램·생활체육 정보를 수집·정제한 후, 지도 기반으로 보여주는 웹 서비스입니다.

사용자는 지역·종목·프로그램 정보 등을 선택해 맞춤형 시설을 확인할 수 있습니다.

### 주요 목표

- 공공체육시설 위치정보를 지도에 시각화
- 종목별/지역별 필터링
- 프로그램 안내 기능
- 사용자 편의 기반 인터페이스 제공
- 백엔드·DB·지도 API 연동을 통한 실제 서비스 형태 구축

---

## 2. 기술 스택

### Frontend
- React + Vite
- Tailwind CSS
- Kakao Map SDK / Google Maps / Naver Maps API 중 선택 가능
- 배포: Vercel, DotHome 고려 중

### Backend
- Node.js + Express
- Supabase 연동 API 서버
- Geocoding 스크립트 (주소 → 좌표 변환)

### Database (Supabase / PostgreSQL)
주요 테이블:
- `facilities`
- `sports`
- `facility_sports`
- `programs`
- `favorites`

### 지도 서비스
- 기본: Kakao Map API
- 대체: Google Maps Geocoding, Naver Maps Geocoding
- 좌표계: WGS84 위도/경도 기반 → Kakao Map에서 사용 가능

---

## 3. DB 설계 및 주요 테이블 구조

### 3.1 facilities
```sql
CREATE TABLE facilities (
  id bigint generated always as identity primary key,
  name text not null,
  address text,
  lat double precision,
  lng double precision,
  region text,
  created_at timestamp with time zone default now()
);
```

### 3.2 sports
```sql
CREATE TABLE sports (
  id bigint generated always as identity primary key,
  name text not null
);
```

### 3.3 facility_sports
```sql
CREATE TABLE facility_sports (
  id bigint generated always as identity primary key,
  facility_id bigint references facilities(id),
  sport_id bigint references sports(id)
);
```

### 3.4 programs
```sql
CREATE TABLE programs (
  id bigint generated always as identity primary key,
  facility_id bigint references facilities(id),
  title text,
  description text,
  schedule text,
  price text
);
```

---

## 4. Geocoding(주소 → 좌표 변환) 흐름 정리

### 사용한 방법들
- Kakao 주소검색 API
- Naver Geocoding API
- Google Maps Geocoding API
- 행안부 주소정제(JUSO API)
- 좌표값 WGS84 기준으로 DB 저장

### 자동 변환 스크립트 예시
- Node.js 기반
- Supabase에서 주소 목록 → 반복 처리
- 지오코딩 실패 시 fallback 처리
- 좌표 저장 → 지도에서 마커 표시

---

## 5. 지도 UI 구현 흐름

### 5.1 지역 선택 기능
- 기본값: "전국"
- 전국 선택 시 → 모든 마커 표시
- 지역 선택 시(예: 서울/부산) → 필터된 마커만 표시
- Supabase에서 `region` 필드 기반으로 쿼리
- React 상태 관리로 지도 리렌더링 처리

### 5.2 마커 표시
- axios/fetch로 Supabase에서 시설 목록 호출
- lat/lng 기반 마커 생성
- 지도 줌/중심 자동 조정

### 5.3 프로그램 안내 기능
- 프로그램 테이블(`programs`)에서 각 시설의 프로그램 목록 연동
- "더보기" 클릭 → 상세 페이지 이동
- 이미지 포함한 카드 UI 구성 (요청 기반)

---

## 6. 백엔드 구현 흐름

### 6.1 Node.js Express API
- `/facilities` : 전체 시설
- `/facilities?region=서울` : 지역 필터
- `/programs?facility_id=3` : 프로그램 목록
- `/sports` : 종목 목록
- `/search?keyword=풋살` : 키워드 검색

### 6.2 문제 해결 기록
- node / npm 미설치 → 시스템 PATH 문제 해결
- nodemon 미인식 → 전역 설치
- Supabase Service Key 사용법 정리
- CORS 우회 문제 처리
- 배포 시 환경변수 적용 문제 → Vercel Redeploy 필요
- Vercel SSL 인증서(kro.kr) 발급 한도 문제 발생 → 인증 대체 방식 안내

---

## 7. 호스팅 / 배포 전략

### 7.1 프론트 (Vercel)
- 순수 React + Vite → Vercel에서 문제 없이 호스팅
- Environment Variables 적용 후 Redeploy 필요
- index.html에서 KakaoMap script 키 적용 확인

### 7.2 백엔드(Node.js)
- **옵션 A**: Vercel Serverless
- **옵션 B**: Render / Railway
- **옵션 C**: Nginx + Node.js (로컬 서버 또는 VPS)

### 7.3 DotHome 호스팅
- DotHome은 정적 호스팅 위주
- React build 결과물 배포는 가능
- Node 서버는 배포 어려움 → 대체 필요

---

## 8. 공공데이터 연동 및 활용

### 8.1 데이터 출처
- 국민체육진흥공단
- 체육종합빅데이터센터
- 공공데이터포털
- 지방자치단체 시설정보

### 8.2 사용 가능한 오픈API
- 생활체육 관련 최신 소식 API(여러 기관)
- 프로그램 신청 정보 API
- 체육시설 운영 현황 API
- 자전거 보관소 WMS/WFS API
- 자전거길 정보 API
