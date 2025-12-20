import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const SemanticHtmlSection = () => {
  const { t } = useTranslation('week14');
  const [showBad, setShowBad] = useState(false);

  return (
    <SectionCard
      badge={{ label: t('semantic.badge'), color: 'green' }}
      title={t('semantic.title')}
      description={t('semantic.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('semantic.importance.title')} icon iconColor="green">
          <InfoBox variant="green" title={t('semantic.importance.infoTitle')}>
            <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t('semantic.importance.infoText') }} />
          </InfoBox>
        </SubSection>

        <SubSection title={t('semantic.goodVsBad.title')} icon iconColor="blue">
          <DemoBox label={t('semantic.goodVsBad.label')}>
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
                  {t('semantic.goodVsBad.goodButton')}
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
                  {t('semantic.goodVsBad.badButton')}
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
                  <span>{t('semantic.goodVsBad.badWarning')}</span>
                ) : (
                  <span>{t('semantic.goodVsBad.goodMessage')}</span>
                )}
              </div>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection title={t('semantic.coreElements.title')} icon iconColor="purple">
          <div className="grid grid-cols-2 gap-3">
            {(t('semantic.coreElements.elements', { returnObjects: true }) as Array<{tag: string, wrong: string, desc: string}>).map((item) => (
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

        <SubSection title={t('semantic.formAccessibility.title')} icon iconColor="orange">
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
              {(t('semantic.formAccessibility.tips', { returnObjects: true }) as string[]).map((tip, idx) => (
                <li key={idx}>• {tip}</li>
              ))}
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection title={t('semantic.headingHierarchy.title')} icon iconColor="red">
          <DemoBox label={t('semantic.headingHierarchy.label')}>
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
              {t('semantic.headingHierarchy.warning')}
            </p>
          </DemoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
