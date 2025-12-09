import React from "react";

export default function SelfIntroPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 px-6 py-10 md:py-16 flex justify-center relative overflow-hidden">
      {/* 부드러운 배경 그라디언트 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.35),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(45,212,191,0.22),_transparent_55%)] opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.92),rgba(15,23,42,1))]" />

      {/* 파티클 효과 레이어 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-teal-300/25 blur-[1px] animate-pulse"
          style={{ top: "18%", left: "12%" }}
        />
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-sky-300/25 blur-[1px] animate-pulse"
          style={{ top: "32%", left: "78%" }}
        />
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-emerald-300/25 blur-[1px] animate-pulse"
          style={{ top: "65%", left: "25%" }}
        />
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300/25 blur-[1px] animate-pulse"
          style={{ top: "72%", left: "60%" }}
        />
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-slate-100/15 blur-[2px] animate-pulse"
          style={{ top: "12%", left: "55%" }}
        />
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-teal-200/25 blur-[1px] animate-pulse"
          style={{ top: "48%", left: "8%" }}
        />
      </div>

      <div className="w-full max-w-6xl space-y-16 relative">
        {/* 상단 자기소개 영역 */}
        <section className="grid gap-10 md:grid-cols-[1.45fr,1fr] items-center">
          {/* 텍스트 영역 */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-600/70 bg-slate-800/70 px-3 py-1 text-[11px] font-medium text-slate-200 mb-4 backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
              Currently exploring UX-focused web & data projects
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              안녕하세요, <span className="text-teal-300">황보정</span> 입니다.
            </h1>
            <p className="text-base md:text-lg text-slate-100/90 leading-relaxed mb-2">
              정보통신공학을 주전공으로 하고 소프트웨어공학을 복수전공하며, 사람들에게
              <span className="font-semibold text-teal-200">
                {" "}
                실제로 쓰이는 서비스
              </span>
              를 만드는 경험을 쌓고 있습니다.
            </p>
            <p className="text-sm md:text-[15px] text-slate-300 leading-relaxed mb-6">
              단순한 과제용 결과물이 아니라, 공공데이터·지도·게임 같은 요소들을 결합해
              실제로 있으면 좋겠다고 느껴지는 서비스를 설계하고 구현하는 과정에 흥미를
              느낍니다.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              <span className="rounded-full bg-slate-800/80 border border-slate-600/70 px-3 py-1 text-xs text-slate-100">
                #웹서비스 기획 & 개발
              </span>
              <span className="rounded-full bg-slate-800/80 border border-slate-600/70 px-3 py-1 text-xs text-slate-100">
                #공공데이터 & 지도 시각화
              </span>
              <span className="rounded-full bg-slate-800/80 border border-slate-600/70 px-3 py-1 text-xs text-slate-100">
                #게임 개발(Phaser / Unreal)
              </span>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-slate-200">
              <div className="rounded-2xl border border-slate-600/80 bg-slate-800/90 px-4 py-3 min-w-[190px] shadow-sm">
                <div className="text-[11px] text-slate-300 mb-1">
                  지금 집중하는 것
                </div>
                <div className="font-medium">
                  지도 기반 서비스 · PWA · 인터랙션
                </div>
              </div>
              <div className="rounded-2xl border border-slate-600/80 bg-slate-800/90 px-4 py-3 min-w-[190px] shadow-sm">
                <div className="text-[11px] text-slate-300 mb-1">
                  주로 사용하는 스택
                </div>
                <div className="font-medium text-[13px]">
                  React · Node.js · Supabase · Phaser3
                </div>
              </div>
            </div>
          </div>

          {/* 프로필 카드 */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-teal-400/35 via-sky-300/20 to-emerald-300/35 blur-2xl opacity-80" />
            <div className="relative rounded-3xl border border-slate-600/70 bg-slate-900/95 px-8 py-9 shadow-2xl flex flex-col items-center gap-6 transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.9)]">
              {/* 여기 HJ 대신 이미지 가능 */}
              <div className="h-24 w-24 rounded-2xl overflow-hidden shadow-lg bg-slate-800 flex items-center justify-center text-slate-300 text-sm">
                {/* <img src="/me.jpg" alt="profile" className="h-full w-full object-cover" /> */}
                프로필 이미지 영역
              </div>
              <div className="text-center space-y-1">
                <div className="text-lg font-semibold">황보정</div>
                <div className="text-sm text-slate-300">
                  정보통신공학과 / 소프트웨어공학과 복수전공 학부생
                </div>
              </div>
              <div className="w-full border-t border-slate-700/70 pt-4 space-y-2 text-sm text-slate-200">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-400 text-[13px]">성향</span>
                  <span className="text-right">
                    문제 구조를 먼저 잡고, 안정적인 구현을 지향
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-400 text-[13px]">강점</span>
                  <span className="text-right">
                    실전 프로젝트 경험에서 나온 실행력
                  </span>
                </div>
              </div>
              <div className="w-full flex flex-wrap gap-2 text-[11px] text-slate-100">
                <span className="rounded-xl bg-slate-800/80 px-3 py-1">
                  팀 프로젝트 경험 多
                </span>
                <span className="rounded-xl bg-slate-800/80 px-3 py-1">
                  공모전 &amp; 경진대회 준비
                </span>
                <span className="rounded-xl bg-slate-800/80 px-3 py-1">
                  새로운 스택 시도하는 편
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* AI Mood Player */}
        <section>
          <div className="group rounded-2xl border border-slate-700 bg-slate-900/90 p-6 hover:border-teal-400/80 hover:bg-slate-900 transition-all duration-200 cursor-default hover:-translate-y-1 hover:shadow-xl transform">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-400/15 text-[11px] text-teal-200">
                  AI
                </span>
                <h3 className="font-semibold text-slate-50">AI Mood Player</h3>
              </div>
              <span className="text-[10px] rounded-full bg-teal-400/15 px-2 py-0.5 text-teal-200 border border-teal-400/40">
                AI · Emotion Detection
              </span>
            </div>
            <p className="text-sm text-slate-200 mb-3">
              Spotify API와 Face++ 감정 인식 API를 결합하여, 사용자의 얼굴 표정을 분석하고
              <span className="font-medium">
                {" "}
                실시간으로 분위기에 맞는 음악을 추천해주는 웹 서비스
              </span>
              입니다.
            </p>
            <ul className="text-[13px] text-slate-300 space-y-1 mb-3">
              <li>
                · Face++ API로 실시간 감정 분석 (Happy, Sad, Angry 등)
              </li>
              <li>· Spotify API를 통한 자동 플레이리스트 매칭</li>
              <li>· 사용자 표정 변화에 따라 즉각적으로 음악 변경</li>
            </ul>
            <div className="flex gap-2 text-[11px] text-slate-200">
              <span className="rounded-full bg-slate-800/80 px-2.5 py-1">
                #AI 추천
              </span>
              <span className="rounded-full bg-slate-800/80 px-2.5 py-1">
                #Emotion Detection
              </span>
              <span className="rounded-full bg-slate-800/80 px-2.5 py-1">
                #Spotify API
              </span>
            </div>
          </div>
        </section>

        {/* 프로젝트 섹션 */}
        <section className="space-y-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-50 mb-1">
                Selected Projects
              </h2>
              <p className="text-xs md:text-[13px] text-slate-300">
                수업, 공모전, 사이드 프로젝트를 거치며 실제로 설계·구현해본 작업들입니다.
              </p>
            </div>
            <span className="text-[11px] rounded-full border border-slate-600/80 bg-slate-800/80 px-3 py-1 text-slate-300 self-start md:self-auto">
              실사용 · 실습 · 실험 프로젝트 모음
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* SportsMap */}
            <div className="group rounded-2xl border border-slate-700 bg-slate-900/90 p-5 hover:border-teal-300/80 hover:bg-slate-900 transition-all duration-200 cursor-default hover:-translate-y-1 hover:shadow-xl transform">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-300/15 text-[11px] text-teal-200">
                    SM
                  </span>
                  <h3 className="font-semibold">SportsMap</h3>
                </div>
                <span className="text-[10px] rounded-full bg-teal-300/15 px-2 py-0.5 text-teal-200 border border-teal-300/40">
                  공공데이터 · 지도
                </span>
              </div>
              <p className="text-sm text-slate-200 mb-3">
                국민체육진흥공단 등에서 제공하는 공공데이터를 활용해 전국 스포츠 시설을
                <span className="font-medium"> 지도 위에 시각화</span>
                하고, 지역·종목별로 쉽게 찾을 수 있게 하는 웹 서비스.
              </p>
              <ul className="text-[13px] text-slate-300 space-y-1 mb-3">
                <li>· React + Node.js + Supabase 기반 풀스택 프로젝트</li>
                <li>· Kakao Map API를 이용한 좌표 매핑 및 필터링</li>
              </ul>
              <div className="flex gap-2 text-[11px] text-slate-200">
                <span className="rounded-full bg-slate-800/80 px-2.5 py-1">
                  #공공데이터 활용
                </span>
                <span className="rounded-full bg-slate-800/80 px-2.5 py-1">
                  #지역 필터링
                </span>
              </div>
            </div>

            {/* CampusNotes */}
            <div className="group rounded-2xl border border-slate-700 bg-slate-900/90 p-5 hover:border-emerald-300/80 hover:bg-slate-900 transition-all duration-200 cursor-default hover:-translate-y-1 hover:shadow-xl transform">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-300/15 text-[11px] text-emerald-200">
                    CN
                  </span>
                  <h3 className="font-semibold">CampusNotes</h3>
                </div>
                <span className="text-[10px] rounded-full bg-emerald-300/15 px-2 py-0.5 text-emerald-200 border border-emerald-300/40">
                  웹 서비스
                </span>
              </div>
              <p className="text-sm text-slate-200 mb-3">
                전공별로 강의 노트를 공유하고 정리할 수 있는
                <span className="font-medium">
                  {" "}
                  대학생 전용 노트 플랫폼
                </span>
                을 목표로 한 기획 및 프로토타입입니다.
              </p>
              <ul className="text-[13px] text-slate-300 space-y-1 mb-3">
                <li>· 정보 구조 설계, UX 플로우 기획</li>
                <li>· 커뮤니티형 기능으로 확장 가능성 고려</li>
              </ul>
              <div className="flex gap-2 text-[11px] text-slate-200">
                <span className="rounded-full bg-slate-800/80 px-2.5 py-1">
                  #대학생 문제 해결
                </span>
                <span className="rounded-full bg-slate-800/80 px-2.5 py-1">
                  #노트 공유
                </span>
              </div>
            </div>

            {/* 맛집/명소 지도 웹 */}
            <div className="group rounded-2xl border border-slate-700 bg-slate-900/90 p-5 hover:border-sky-300/80 hover:bg-slate-900 transition-all duration-200 cursor-default hover:-translate-y-1 hover:shadow-xl transform">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-300/15 text-[11px] text-sky-200">
                    MAP
                  </span>
                  <h3 className="font-semibold">맛집/명소 지도 웹</h3>
                </div>
                <span className="text-[10px] rounded-full bg-sky-300/15 px-2 py-0.5 text-sky-200 border border-sky-300/40">
                  위치 기반
                </span>
              </div>
              <p className="text-sm text-slate-200 mb-3">
                지도 위에 맛집과 관광 명소를
                <span className="font-medium">
                  {" "}
                  카테고리 · 태그별로 필터링
                </span>
                하며 탐색할 수 있는 실습형 프로젝트입니다.
              </p>
              <ul className="text-[13px] text-slate-300 space-y-1 mb-3">
                <li>· 카카오맵 / 네이버 지도 API 실습</li>
                <li>· 실제 서비스화 아이디어로 확장 가능</li>
              </ul>
              <div className="flex gap-2 text-[11px] text-slate-200">
                <span className="rounded-full bg-slate-800/80 px-2.5 py-1">
                  #위치 기반 서비스
                </span>
                <span className="rounded-full bg-slate-800/80 px-2.5 py-1">
                  #데이터 시각화
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact 섹션 */}
        <section>
          <div className="rounded-3xl border border-slate-700 bg-slate-900/95 px-8 py-8 md:px-10 md:py-9 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-[0_18px_45px_rgba(15,23,42,0.9)]">
            <div>
              <h2 className="text-lg md:text-xl font-semibold mb-2">
                함께 만들고, 배우고, 도전해요.
              </h2>
              <p className="text-sm md:text-[15px] text-slate-200 max-w-xl">
                사이드 프로젝트, 공모전, 혹은 실습용 아이디어까지 언제든 환영합니다.
                가볍게 아이디어를 공유해도 좋고, 진지한 프로젝트 제안도 좋습니다.
              </p>
            </div>
            <a
              href="https://github.com/couque0319/web"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-teal-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-teal-400 hover:-translate-y-0.5 active:translate-y-0 transition-transform"
            >
              깃허브 레포지토리 보기
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
