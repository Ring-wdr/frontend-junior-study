import { useTranslation } from 'react-i18next';
import { Minimize2, Zap, HardDrive, CheckCircle } from 'lucide-react';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const OptimizationSection = () => {
  const { t } = useTranslation('week18');
  const checklist = t('optimization.checklist', { returnObjects: true }) as string[];

  return (
    <SectionCard
      badge={{ label: t('optimization.badge'), color: 'green' }}
      title={t('optimization.title')}
      description={t('optimization.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('optimization.binarySizeTitle')} icon iconColor="green">
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <Minimize2 className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bold text-green-700">Cargo.toml</span>
              </div>
              <CodeBlock
                code={`[profile.release]
opt-level = "z"      # 크기 최소화 ("s"보다 더 작음)
lto = true           # 링크 타임 최적화
codegen-units = 1    # 단일 코드 생성 단위
panic = "abort"      # 패닉 시 즉시 종료
strip = true         # 심볼 제거`}
                language="toml"
                className="text-xs"
              />
            </div>

            <CodeBlock
              code={`# wasm-opt 추가 최적화
wasm-opt -Oz -o output.wasm input.wasm

# Brotli 압축
brotli output.wasm`}
              language="bash"
              className="text-xs"
            />

            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-sm text-gray-700 mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                {t('optimization.checklistTitle')}
              </h4>
              <ul className="space-y-1">
                {checklist.map((item: string) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-gray-700">
                    <input type="checkbox" className="rounded text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SubSection>

        <SubSection title={t('optimization.runtimeTitle')} icon iconColor="blue">
          <CodeBlock
            code={`// 1. 스트리밍 컴파일 (병렬 다운로드 + 컴파일)
const { instance } = await WebAssembly.instantiateStreaming(
  fetch("module.wasm"),
  imports
);

// 2. 모듈 캐싱
const cachedModule = await WebAssembly.compileStreaming(fetch("module.wasm"));
// IndexedDB에 저장 후 재사용

// 3. 메모리 사전 할당
const memory = new WebAssembly.Memory({
  initial: 256, // 16MB
  maximum: 1024, // 64MB
});`}
            language="javascript"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('optimization.memoryTitle')} icon iconColor="purple">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <HardDrive className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-bold text-purple-700">{t('optimization.memoryPooling')}</span>
            </div>
            <CodeBlock
              code={`use wasm_bindgen::prelude::*;
use std::cell::RefCell;

thread_local! {
    static BUFFER: RefCell<Vec<u8>> =
        RefCell::new(Vec::with_capacity(1024 * 1024));
}

#[wasm_bindgen]
pub fn process_with_pool(data: &[u8]) -> Vec<u8> {
    BUFFER.with(|buf| {
        let mut buffer = buf.borrow_mut();
        buffer.clear();
        buffer.extend_from_slice(data);
        // 처리 로직...
        buffer.clone()
    })
}`}
              language="rust"
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title={t('optimization.jsIntegrationTitle')} icon iconColor="orange">
          <div className="space-y-4">
            <InfoBox variant="orange" title={t('optimization.typedArrayTitle')}>
              <p className="text-sm mb-2">{t('optimization.typedArrayDesc')}</p>
            </InfoBox>

            <CodeBlock
              code={`// Wasm 메모리에 직접 쓰기
const wasmMemory = wasmModule.exports.memory;
const inputPtr = wasmModule.exports.allocate(dataSize);

// TypedArray 뷰 생성
const inputView = new Float32Array(wasmMemory.buffer, inputPtr, dataSize);
inputView.set(jsFloatArray);  // 데이터 복사

// Wasm 함수 호출 (포인터 전달)
const outputPtr = wasmModule.exports.process(inputPtr, dataSize);

// 결과 읽기
const outputView = new Float32Array(wasmMemory.buffer, outputPtr, dataSize);
const result = new Float32Array(outputView);

// 메모리 해제
wasmModule.exports.deallocate(inputPtr);
wasmModule.exports.deallocate(outputPtr);`}
              language="javascript"
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title={t('optimization.profilingTitle')} icon iconColor="red">
          <CodeBlock
            code={`// 성능 측정
const start = performance.now();
instance.exports.heavy_computation();
const end = performance.now();
console.log(\`실행 시간: \${end - start}ms\`);

// Chrome DevTools에서 분석
// - Performance 탭: Wasm 함수 호출 추적
// - Memory 탭: 메모리 사용량 확인`}
            language="javascript"
            className="text-xs"
          />
        </SubSection>
      </div>
    </SectionCard>
  );
};
