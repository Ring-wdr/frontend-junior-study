import {
  AlertTriangle,
  Bug,
  Check,
  Lock,
  Shield,
  TestTube,
  X,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const DebuggingSecuritySection = () => {
  const { t } = useTranslation('week18');
  const securityPoints = t('debuggingSecurity.securityPoints', {
    returnObjects: true,
  }) as string[];

  return (
    <SectionCard
      badge={{ label: t('debuggingSecurity.badge'), color: 'gray' }}
      title={t('debuggingSecurity.title')}
      description={t('debuggingSecurity.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('debuggingSecurity.sourcemapTitle')}
          icon
          iconColor="blue"
        >
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <Bug className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-blue-700">
                {t('debuggingSecurity.debugBuild')}
              </span>
            </div>
            <CodeBlock
              code={`# Emscripten 디버그 빌드
emcc -g4 source.c -o output.js --source-map-base http://localhost:8080/

# Rust 디버그 빌드
wasm-pack build --dev

# Chrome DevTools에서:
# 1. Sources 탭 열기
# 2. Wasm 파일 클릭
# 3. 원본 소스에서 브레이크포인트 설정`}
              language="bash"
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection
          title={t('debuggingSecurity.consoleTitle')}
          icon
          iconColor="purple"
        >
          <CodeBlock
            code={`use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
    #[wasm_bindgen(js_namespace = console)]
    fn error(s: &str);
}

// 편의 매크로
macro_rules! console_log {
    ($($t:tt)*) => (log(&format!($($t)*)))
}

#[wasm_bindgen]
pub fn debug_function(value: i32) {
    console_log!("Input value: {}", value);
    // 로직...
    console_log!("Processing complete");
}`}
            language="rust"
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('debuggingSecurity.testingTitle')}
          icon
          iconColor="green"
        >
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <TestTube className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bold text-green-700">
                  Rust {t('debuggingSecurity.unitTest')}
                </span>
              </div>
              <CodeBlock
                code={`#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 3), 5);
    }
}

// wasm-bindgen 테스트 (브라우저에서 실행)
#[cfg(test)]
mod wasm_tests {
    use super::*;
    use wasm_bindgen_test::*;

    wasm_bindgen_test_configure!(run_in_browser);

    #[wasm_bindgen_test]
    fn test_in_browser() {
        assert_eq!(add(2, 3), 5);
    }
}`}
                language="rust"
                className="text-xs"
              />
            </div>

            <CodeBlock
              code={`// Jest/Vitest 통합 테스트
import { describe, it, expect, beforeAll } from "vitest";
import init, { add, fibonacci } from "../pkg/my_wasm_project.js";

describe("Wasm Module", () => {
  beforeAll(async () => {
    await init();
  });

  it("should add numbers correctly", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("should compute fibonacci", () => {
    expect(fibonacci(10)).toBe(55);
  });
});`}
              language="javascript"
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection
          title={t('debuggingSecurity.sandboxTitle')}
          icon
          iconColor="orange"
        >
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-bold text-orange-700">
                {t('debuggingSecurity.wasmSandbox')}
              </span>
            </div>
            <ul className="space-y-2">
              {securityPoints.map((point: string, idx: number) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-xs text-gray-700"
                >
                  <Lock className="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </SubSection>

        <SubSection
          title={t('debuggingSecurity.securityTipsTitle')}
          icon
          iconColor="red"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-bold text-sm text-red-700 mb-2 flex items-center gap-2">
                <X className="w-4 h-4" />
                {t('debuggingSecurity.dangerous')}
              </h4>
              <CodeBlock
                code={`// ❌ 신뢰할 수 없는 소스
const maliciousWasm = await fetch(
  "https://untrusted.com/module.wasm"
);
await WebAssembly.instantiateStreaming(
  maliciousWasm
);`}
                language="javascript"
                className="text-xs"
              />
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-bold text-sm text-green-700 mb-2 flex items-center gap-2">
                <Check className="w-4 h-4" />
                {t('debuggingSecurity.safe')}
              </h4>
              <CodeBlock
                code={`// ✅ 출처 검증
const response = await fetch("module.wasm");
if (!response.url.startsWith(
  "https://trusted-domain.com/"
)) {
  throw new Error("Untrusted source");
}`}
                language="javascript"
                className="text-xs"
              />
            </div>
          </div>

          <InfoBox variant="gray" title={t('debuggingSecurity.cspTitle')}>
            <p className="text-sm font-mono">
              Content-Security-Policy: script-src 'self' 'wasm-unsafe-eval'
            </p>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('debuggingSecurity.rustSafetyTitle')}
          icon
          iconColor="green"
        >
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-xs text-gray-600 mb-3">
              {t('debuggingSecurity.rustSafetyDesc')}
            </p>
            <CodeBlock
              code={`// Rust의 메모리 안전성이 Wasm에도 적용됨
// - 널 포인터 역참조 방지
// - 버퍼 오버플로우 방지
// - use-after-free 방지

#[wasm_bindgen]
pub fn safe_function(data: &[u8]) {
    // 경계 검사 자동 수행
    for byte in data {
        // 안전한 처리...
    }
}`}
              language="rust"
              className="text-xs"
            />
          </div>

          <InfoBox variant="blue" title={t('debuggingSecurity.finalNote')}>
            <p className="text-sm">{t('debuggingSecurity.finalNoteDesc')}</p>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
