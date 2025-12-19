# 12 인증 및 보안 (Authentication & Security)
내용 요약: 이번 주는 웹 프론트엔드 개발에서 필수적인 **인증(Authentication)**과 보안 주제를 다룹니다. OAuth 2.0과 OpenID Connect의 개념을 정리하고, Social Login 등이 어떻게 동작하는지 이해합니다. 또한 Next.js에서 널리 쓰이는 **NextAuth.js (Auth.js)**를 이용해 OAuth 연동이나 이메일 로그인 등을 구현하는 방법을 배웁니다. JWT (JSON Web Token)를 이용한 인증과, 세션 vs 토큰 기반 인증의 차이도 살펴봅니다. 브라우저 환경의 보안 이슈들 – 예를 들어 XSS(크로스사이트스크립팅)와 CSRF(사이트간 요청 위조)에 대한 프론트엔드 측 대응, 쿠키 보안 옵션 (HttpOnly, SameSite) – 을 정리하고, 개인정보 보호(GDPR 등) 관점에서 프론트엔드가 유의할 점도 알아봅니다. 실습으로는 NextAuth를 프로젝트에 설치해 구글 OAuth 로그인 버튼을 만들어보고, JWT 페이로드를 콘솔에 출력하거나, 토큰 만료 처리를 경험해보세요.

OAuth 2.0 기본 개념: OAuth2는 제3자 서비스에 사용자 자원 접근을 위임하기 위한 표준 프로토콜입니다. 예를 들어 내 앱에서 사용자의 구글 캘린더에 접근하려면, OAuth2를 통해 구글이 발행한 액세스 토큰을 받는 식이죠. OAuth2에는 Authorization Code Grant 등 여러 플로우가 있는데, 일반적인 웹/모바일 앱에서는 Authorization Code 방식을 씁니다. 핵심은 Authorization Server가 사용자 인증을 거쳐 Access Token을 발급하고, 클라이언트는 이를 Resource Server(API)에 제시해 리소스에 접근하는 것입니다. Access Token은 보통 만료 시간이 짧고, 만료 시 Refresh Token으로 재발급 받습니다. OAuth2 자체는 인증(로그인)을 다루지 않기에, 로그인에는 **OpenID Connect (OIDC)**를 확장하여 ID Token을 사용합니다【61†L25-L33】.

OpenID Connect (OIDC): OIDC는 OAuth2 위에 사용자 인증과 프로필 정보 표준을 추가한 프로토콜입니다【61†L25-L33】. OAuth2 + OIDC 흐름에서는 액세스 토큰*(JWT)이 함께 발급되며, 이 ID 토큰에 사용자 식별 정보(서명됨)가 담깁니다. 예컨대 구글 로그인 OIDC ID 토큰에는 email, name 등이 포함되고, 우리 앱은 이 토큰을 검증하여 사용자를 로그인 처리합니다. OIDC는 OAuth2의 스코프 openid를 포함해 요청하며, 따로 구현하기보다는 NextAuth 등 라이브러리가 내부적으로 처리해줍니다. 핵심은 OAuth2 = 권한위임(Authorization), **OIDC = +인증(Authentication)**이라는 점입니다【61†L25-L33】.

NextAuth.js 사용: NextAuth.js(이름이 Auth.js로 변경될 예정)는 Next.js용 완전한 인증 솔루션으로, 다양한 Providers(구글, 깃허브 등) OAuth 로그인, 자격증명 로그인 등을 쉽게 구현하게 해줍니다【62†L19-L22】. NextAuth는 PI(route handlers)를 모두 제공하며, JWT 또는 DB 세션 모드를 선택할 수 있습니다. 기본 설정으로 /api/auth/[...nextauth] API 경로를 생성하고, SessionProvider로 앱을 감싸 session 정보를 전역 제공할 수 있습니다. 실습으로 NextAuth 공식 가이드를 따라 Google OAuth를 세팅해보고, useSession() 훅으로 로그인 상태를 가져와 헤더에 사용자 이름 표시 같은 걸 해보세요. NextAuth는 CSR/SSR 모두 지원하며, getServerSession으로 서버 측에서도 세션 확인이 가능합니다.

JWT vs 세션: JWT (JSON Web Token)는 *으로, 클라이언트가 이 JWT를 저장(보통 localStorage나 쿠키에)하고 요청 시 보내면 서버는 서명검증만으로 유효성 판단하고 인증합니다. 장점은 서버가 세션 저장소를 안가져도 되고, 확장성(스케일아웃)에 유리합니다. 하지만 JWT 자체는 탈취되면 위험하고, **만료 후 폐기 처리(revocation)**가 어렵다는 단점이 있습니다. 반면 **세 서버에 세션 저장(메모리 or DB)하고 세션ID를 쿠키로 발급하는 방식입니다【61†L25-L33】. 이는 서버 측 제어가 용이하고, 세션 만료나 철회가 쉽지만, 서버 메모리를 차지하고 스케일링시 세션 공유 이슈가 있습니다. 최신 애플리케이션에서는 액세스 토큰(JWT) + Refresh 토큰(쿠키) 혼합전략도 흔합니다. 프론트엔드는 JWT를 localStorage에 저장하는 것은 XSS 위험있어 지양하고, 가급적 HTTP-only 쿠키에 토큰을 담아야 안전합니다.

CSRF와 SameSite 쿠키: 세션이나 JWT를 쿠키에 담을 때, CSRF 공격(타 사이트에서 사용자의 쿠키로 멋대로 요청 보내는 것)을 방지해야 합니다. SameSite 쿠키 옵션을 Lax 또는 Strict로 주면 기본적인 CSRF는 막을 수 있습니다 (Strict는 크로스사이트에서 아예 안보내고, Lax는 GEextAuth 같은 라이브러리는 자동으로 CSRF 토큰을 폼에 심고 검증하여 대응하기도 합니다. 프론트엔드는 쿠키를 건드릴 때 SameSite 옵션 설정, 폼에는 CSRF 토큰 hidden 필드 삽입 등의 백엔드 협업을 지원합니다.

XSS와 Content Security Policy: XSS는 악성 스크립트가 삽입되어 사용자의 세션 쿠키 등 탈취를 노리는 공격입니다. 프론트엔드는 dangerouslySetInnerHTML 사용 지양, DOM 조작 시 입력 값 치환/이스케이프, 신뢰할 수 없는 JSON 데이터를 바로 실행하지 않기 등의 수칙을 따라야 합니다. 또한 CSP 헤더를 설정하여 허용된 스크립트 소스만 실행되게 하면 XSS 위험을 크게 줄일 수 있습니다. 예컨대 <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://trusted.cdn.com;">. 이러한 보안 헤더는 백엔드 설정이지만, Next.js에서는 next.config.js나 헤더 설정 API로 관리 가능합니다. 개발 단계에서 Chrome DevTools의 "Security" 패널을 참고해, 주요 보안 헤더 적용을 검토하세요.

개인정보 보호와 기타 고려: 프론트엔드는 사용자의 인증 최소한의 정보만 클라이언트에 저장해야 합니다. 예를 들어 액세스토큰은 HttpOnly 쿠키로 저장하고, 사용자 이메일 등도 가능한 한 노출 안 시키는 편이 좋습니다. 또한 로그아웃 구현 시 서버 세션/토큰 삭제 확실히 호출해주고, 클라이언트 측 상태도 정리해야 합니다. 비밀번호 입력 폼은 type="password"와 함께 **자동완성 off (또는 새 비번의 경우 autocomplete="new-password")**로 설정하여 브라우저 저장 문제가 없게 합니다. 마지막으로, 프론트엔드에서 할 수 있는 보안 강화 UI/UX도 생각해보세요: 비밀번호 세기 표시, 2FA 코드 입력 편의 (자동 focus 이동) 등으로 보안과 편리함의 균형을 잡습니다.

🔗 주차별 참고 리소스:

Okta 개발자 문서: OAuth2 & OIDC 개요 – OAuth2와 OpenID Connect의 차이 및 작동 Auth2에 사용자 인증 (SSO) 기능을 확장한다는 설명【61†L25-L33】

영상: OAuth 2.0 5분 설명 – 비개발자도 이해할 수 있는 OAuth 흐름 애니메이션 영상. 리소스 소유자, 클라이언트, 인증 서버 등 역할 구분을 시각적으로 파악

NextAuth.js 공식 문서 – NextAuth 설정 및 사용법. Providers 등록, useSession 훅 사용 등 기본 가이드. 데이터베이스 세션 사용 vs JWT 사용모드 설정 방법 안내. (시작 튜토리얼 따라하기 추천)【62†L19-L22】

JWT.io – *. JWT를 붙여 넣으면 Payload 내용과 서명 검증 등을 해볼 수 있음. JWT의 3부분 (Header.Payload.Signature) 구조 설명도 확인

MDN 웹 문서: HttpOnly & SameSite 쿠키 – 쿠키의 보안 속성에 대한 설명. HttpOnly는 JS에서 접근 불가 (XSS 방지), SameSite는 CSRF 방지용 옵션 등의 내용 포함

OWASP Cheat Sheet: XSS 방어 – XSS 예방 수칙 모음. 컨텍스트별 이스케이프 규칙 (HTML, JS, CSS), 신뢰 안가는 데이터는 innerHTML 쓰지 않기, Content Security Policy 적용 등의 권고

Next.js 보안 헤더 설정 가이드 – Next.js에서 CSP, X-Frame-Options, HSTS 등의 보안 헤더를 설정하는 법. 보안 헤더의 역할과 Next.config.js 예시 제시 (강력한 보안 필요 시 반드시 설정할 것)