# GunSiteFront

개인 포트폴리오 사이트의 최신 프론트엔드 저장소입니다. 프로젝트와 경력 경험을 단순히 나열하는 대신, 어떤 문제를 다뤘고 어떤 기술로 서비스 흐름을 만들었는지 보여주는 데 초점을 맞췄습니다.

## Overview

- 메인 히어로, 프로필, 연락처 섹션으로 구성된 포트폴리오 첫 화면
- 프로젝트와 교육, 수상 경험을 한 번에 볼 수 있는 Career 페이지
- 각 경험을 상세 페이지로 연결하는 정적 라우팅 구조
- Framer Motion 기반 스크롤 진입 애니메이션
- 모바일과 데스크톱 환경을 고려한 반응형 UI

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons

## Main Features

### Portfolio Home

개발자 소개, 핵심 경험, 연락 정보를 어두운 톤의 인터랙티브 화면으로 구성했습니다. 방문자가 첫 화면에서 기술 스택보다 사람과 방향성을 먼저 이해할 수 있도록 문장과 레이아웃을 정리했습니다.

### Career Archive

창업진흥원 PMS 고도화, Cozy Record, LG전자 DX School, 뉴스 빅데이터 해커톤, NHN Academy 등 주요 경험을 데이터 기반으로 관리합니다. 경험 데이터는 `src/data/experiences.ts`에서 관리하며, 목록과 상세 페이지가 같은 데이터를 사용하도록 구성했습니다.

### Project Detail Pages

프로젝트별 기간, 역할, 기술 스택, 기여 내용, 세부 기록을 별도 페이지에서 제공합니다. Next.js의 `generateStaticParams`를 활용해 프로젝트 상세 페이지를 정적으로 생성합니다.

### Motion Interaction

Framer Motion을 활용해 페이지 진입과 스크롤 구간에서 자연스러운 전환을 제공합니다. 텍스트와 카드가 한 번에 튀어나오지 않도록 시선 흐름에 맞춰 애니메이션을 조정했습니다.

## Project Structure

```text
src
├── app
│   ├── page.tsx
│   ├── career
│   └── projects/[slug]
├── components
│   ├── common
│   ├── home
│   └── layout
├── data
│   └── experiences.ts
└── styles
```

## Getting Started

```bash
npm install
npm run dev
```

개발 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Focus

이 저장소는 단순한 자기소개 페이지가 아니라, 실제 프로젝트 경험을 웹에서 읽히는 포트폴리오 콘텐츠로 구조화하는 실험입니다. 특히 AI-OCR, 백엔드 API, 데이터 기반 서비스 기획, 풀스택 프로젝트 경험을 한 흐름 안에서 전달하는 데 중점을 두었습니다.
