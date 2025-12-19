import { useState } from 'react';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const SemanticHtmlSection = () => {
  const [showBad, setShowBad] = useState(false);

  return (
    <SectionCard
      badge={{ label: 'HTML', color: 'green' }}
      title="시맨틱 HTML - 최강의 접근성 도구"
      description="접근성의 80%는 HTML을 올바르게 사용하는 것만으로 해결됩니다"
    >
      <div className="space-y-8">
        <SubSection title="시맨틱 태그의 중요성" icon iconColor="green">
          <InfoBox variant="green" title="Why Semantic HTML?">
            <p className="text-sm leading-relaxed">
              시맨틱 HTML은 스크린리더와 검색 엔진이 페이지 구조를 이해하는
              기반입니다. <code>&lt;div&gt;</code>와{' '}
              <code>&lt;span&gt;</code>만 사용하면 보조 기술이 콘텐츠의 의미를
              파악할 수 없습니다.
            </p>
          </InfoBox>
        </SubSection>

        <SubSection title="Interactive: Good vs Bad" icon iconColor="blue">
          <DemoBox label="Toggle to Compare">
            <div className="space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowBad(false)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition ${
                    !showBad
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  ✓ Good (Semantic)
                </button>
                <button
                  type="button"
                  onClick={() => setShowBad(true)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition ${
                    showBad
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  ✗ Bad (Div Soup)
                </button>
              </div>

              <div
                className={`p-4 rounded-lg border-2 ${showBad ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}
              >
                <CodeBlock
                  code={
                    showBad
                      ? `<!-- Bad: Div Soup -->
<div class="header">
  <div class="nav">
    <div onclick="navigate()">Home</div>
    <div onclick="navigate()">About</div>
  </div>
</div>
<div class="main">
  <div class="article">
    <div class="title">Article Title</div>
    <div>Article content...</div>
  </div>
</div>
<div class="footer">
  © 2024 My Site
</div>`
                      : `<!-- Good: Semantic HTML -->
<header>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>
<main>
  <article>
    <h1>Article Title</h1>
    <p>Article content...</p>
  </article>
</main>
<footer>
  © 2024 My Site
</footer>`
                  }
                  className="text-xs"
                />
              </div>

              <div
                className={`text-sm p-3 rounded ${showBad ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
              >
                {showBad ? (
                  <span>
                    ⚠️ 스크린리더가 구조를 인식할 수 없음, 키보드 네비게이션
                    불가
                  </span>
                ) : (
                  <span>
                    ✓ 스크린리더가 landmark로 인식, 키보드 네비게이션 가능
                  </span>
                )}
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title="핵심 시맨틱 요소" icon iconColor="purple">
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                tag: '<button>',
                wrong: '<div onclick>',
                desc: '클릭 가능한 액션',
              },
              {
                tag: '<a href>',
                wrong: '<span onclick>',
                desc: '페이지 이동 링크',
              },
              {
                tag: '<label for>',
                wrong: '<span>',
                desc: '폼 필드 레이블',
              },
              {
                tag: '<nav>',
                wrong: '<div class="nav">',
                desc: '내비게이션 영역',
              },
              {
                tag: '<main>',
                wrong: '<div class="main">',
                desc: '주요 콘텐츠 영역',
              },
              {
                tag: '<header>/<footer>',
                wrong: '<div>',
                desc: '페이지/섹션 헤더/푸터',
              },
            ].map((item) => (
              <div
                key={item.tag}
                className="bg-white p-3 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-green-600 text-sm font-mono bg-green-50 px-1.5 rounded">
                    {item.tag}
                  </code>
                </div>
                <div className="flex items-center gap-1 text-xs text-red-500 mb-1">
                  <span>✗</span>
                  <code className="font-mono">{item.wrong}</code>
                </div>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title="폼 접근성" icon iconColor="orange">
          <CodeBlock
            code={`<!-- Accessible Form Pattern -->
<form>
  <fieldset>
    <legend>Personal Information</legend>

    <div>
      <label for="name">Name (required)</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        aria-describedby="name-hint"
      />
      <span id="name-hint">Enter your full name</span>
    </div>

    <div>
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        aria-invalid="true"
        aria-describedby="email-error"
      />
      <span id="email-error" role="alert">
        Please enter a valid email address
      </span>
    </div>
  </fieldset>

  <button type="submit">Submit</button>
</form>`}
            className="text-xs"
          />
          <InfoBox variant="orange" className="mt-3">
            <ul className="text-xs space-y-1">
              <li>
                • <code>for</code>와 <code>id</code>로 레이블 연결 필수
              </li>
              <li>
                • <code>fieldset</code>과 <code>legend</code>로 그룹화
              </li>
              <li>
                • <code>aria-describedby</code>로 힌트/에러 연결
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title="Heading 계층 구조" icon iconColor="red">
          <DemoBox label="Document Outline">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="space-y-1 font-mono text-sm">
                <div className="text-gray-800">
                  <span className="text-blue-500">h1</span> - Page Title
                </div>
                <div className="text-gray-700 pl-4">
                  <span className="text-blue-500">h2</span> - Main Section 1
                </div>
                <div className="text-gray-600 pl-8">
                  <span className="text-blue-500">h3</span> - Subsection 1.1
                </div>
                <div className="text-gray-600 pl-8">
                  <span className="text-blue-500">h3</span> - Subsection 1.2
                </div>
                <div className="text-gray-700 pl-4">
                  <span className="text-blue-500">h2</span> - Main Section 2
                </div>
                <div className="text-gray-600 pl-8">
                  <span className="text-blue-500">h3</span> - Subsection 2.1
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              ⚠️ h1 → h3처럼 레벨을 건너뛰지 마세요. 스크린리더 사용자는 heading
              목록으로 페이지를 탐색합니다.
            </p>
          </DemoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
