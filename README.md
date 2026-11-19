# ✅ [Today Log](https://today-log.netlify.app/)

> 오늘 하루를 기록하고 완성해가는 투두 웹 애플리케이션

---

## 📖 소개

**Today Log 앱**은 오늘 날짜를 기준으로 할 일을 빠르고 직관적으로 관리할 수 있는 웹 애플리케이션입니다.
모든 항목을 완료하면 컨페티 애니메이션으로 성취감을 느껴보세요 🎊

---

## 🛠 기술 스택

| 기술                                                                                          | 설명                     |
| --------------------------------------------------------------------------------------------- | ------------------------ |
| ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)             | UI 컴포넌트 라이브러리   |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) | 타입 안전성              |
| ![CSS Modules](https://img.shields.io/badge/CSS_Modules-000000?logo=css3&logoColor=white)     | 컴포넌트 스코프 스타일링 |

<br/>

---

## ✨ 기능 소개

### 오늘 날짜 표시

- 상단에 오늘 날짜(Today + 일자)를 실시간으로 표시

### 다크 모드

- 우측 상단 달 아이콘으로 다크/라이트 모드 전환
- `DarkModeContext`로 전역 상태 관리

### 할 일 추가

- 하단 `+ 작업 추가` 버튼으로 새 항목을 빠르게 등록

### 완료 처리

- 체크박스 클릭 시 완료 상태로 전환 (취소선 표시)
- 모든 항목 완료 시 🎊 컨페티 애니메이션 재생

### 인라인 편집

- 편집 아이콘 클릭 시 해당 항목이 인라인 텍스트 입력창으로 전환
- `수정 완료` 버튼으로 저장, `취소` 버튼으로 되돌리기

### 고정 / 삭제

- 항목 호버 시 고정(📌), 삭제(🗑) 버튼 표시
- 드래그 핸들(⠿)로 항목 순서 변경 가능
- 삭제 시 모달창을 띄움으로써 한 번 더 확인하고 제거

### 필터링

- All / Active / Completed 탭으로 원하는 항목만 필터링
- `완료 삭제` 버튼으로 완료된 항목 일괄 제거

### 반응형 디자인

- 데스크탑, 태블릿, 모바일 모든 화면 크기에 최적화
- CSS Modules 미디어 쿼리로 레이아웃 자동 조정

### 스켈레톤 ui 제공

- 로딩 시 스켈레톤 ui 제공하여 사용자 불편함 감소

<br/>

---

## 📸 스크린샷

### 기본 화면

<img src="./public/screenshots/main.png" width="600"/>

> 오늘 날짜와 할 일 목록, 작업 추가 버튼이 깔끔하게 배치된 메인 화면

### 인라인 편집

<img src="./public/screenshots/edit.png" width="600"/>

> 편집 버튼 클릭 시 해당 항목이 즉시 입력창으로 전환되며, 수정 완료 / 취소 버튼으로 저장 여부를 선택할 수 있습니다

### 모두 완료 시 — 컨페티 🎊

<img src="./public/screenshots/completed.png" width="600"/>

> 모든 항목을 체크하면 컨페티 애니메이션이 화면을 가득 채웁니다

### 다크 모드

<img src="./public/screenshots/dark-mode.png" width="600"/>

> 우측 상단 달 아이콘 클릭 시 다크 모드로 전환되며, 선택한 테마는 유지됩니다

### 모바일 화면

<img src="./public/screenshots/mobile.jpg" width="280"/>

> 모바일 화면에서도 레이아웃이 최적화되어 편리하게 사용할 수 있습니다

### 스켈레톤 UI

<img src="./public/screenshots/skeleton.png" width="600"/>

> 로딩 시 스켈레톤 UI를 제공합니다

<br/>

---

## 📁 프로젝트 구조

```
my-todo-app/
├── public/
│   ├── logo.jpg
│   └── today-log-og-im...
├── src/
│   ├── components/
│   │   ├── AddTodo/
│   │   │   ├── AddTodo.module.css
│   │   │   └── AddTodo.tsx
│   │   ├── ConfirmModal/
│   │   │   ├── ConfirmModal.module.css
│   │   │   └── ConfirmModal.tsx
│   │   ├── context/
│   │   │   └── DarkModeContext.tsx
│   │   ├── Header/
│   │   │   ├── Header.module.css
│   │   │   └── Header.tsx
│   │   ├── ScrollToTop/
│   │   │   ├── ScrollToTop.module.css
│   │   │   └── ScrollToTop.tsx
│   │   ├── Todo/
│   │   │   ├── Todo.module.css
│   │   │   └── Todo.tsx
│   │   ├── TodoControls/
│   │   │   ├── TodoControls.module.css
│   │   │   └── TodoControls.tsx
│   │   ├── TodoForm/
│   │   │   ├── TodoForm.module.css
│   │   │   └── TodoForm.tsx
│   │   ├── TodoList/
│   │   │   └── TodoList.tsx
│   │   └── TodoSkeleton/
│   │       ├── TodoSkeleton.module.css
│   │       └── TodoSkeleton.tsx
│   ├── App.css
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
└── package.json
```
