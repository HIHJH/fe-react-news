# fe-react-news

**샤샤샤 (SHA-44) - [홍지운](https://github.com/forhyundaisofteer), [황주희](https://github.com/HIHJH)**

## 개발 환경

- React + Typescript
- 빌드 도구: vite
  - 빠른 개발 서버 시작 가능, 간단한 설정으로 React 프로젝트 바로 시작 가능
- 스타일: tailwindCSS
  - 일관된 디자인 시스템을 쉽게 구축할 수 있고 빠른 스타일링 가능
- 패키지 매니저: pnpm
  - npm/yarn보다 디스크 공간을 효율적으로 사용, 의존성 설치 속도 빠름
- API 서버: serverless
  - 인프라 관리 부담 없이 API 서버를 구축 가능

## 목표

- 상태 관리 다양한 방법으로 해보기 + 장단점 비교
- API 연결 및 데이터 관리 방법 고민하기
- 유지 보수가 쉬운 코드 작성하기
- 불필요한 리렌더링 줄이기
- 타입 잘 관리하기

## 폴더 구조

```
src/
├── api/                 # API 연결 및 쿼리키 관리
├── assets/              # 정적 리소스
├── shared/              # 여러 기능이 공통으로 사용하는 코드
│   ├── components/      # 공통 UI 컴포넌트 (Button, Input, Card 등)
│   ├── hooks/           # 공통 커스텀 훅
│   ├── types/           # 공통 타입 정의
│   └── utils/           # 공통 유틸리티 함수
├── features/
│   └── 기능 단위/
│       └── components/
│       ├── hooks/
│       └── utils/
├── pages/               # 페이지 컴포넌트
│   └── NewsPage.tsx
├── App.tsx
└── main.tsx
```
