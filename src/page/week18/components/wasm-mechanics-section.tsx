import { useTranslation } from 'react-i18next';
import { ArrowRight, Box, Database, FileCode, Layers } from 'lucide-react';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const WasmMechanicsSection = () => {
  const { t } = useTranslation('week18');
  const moduleStructure = t('wasmMechanics.moduleStructure', { returnObjects: true }) as any[];

  return (
    <SectionCard
      badge={{ label: t('wasmMechanics.badge'), color: 'blue' }}
      title={t('wasmMechanics.title')}
      description={t('wasmMechanics.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('wasmMechanics.pipelineTitle')} icon iconColor="blue">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
              <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm">
                <FileCode className="w-6 h-6 text-blue-500 mb-1" />
                <span className="text-xs font-bold text-gray-700">{t('wasmMechanics.pipeline.source')}</span>
                <span className="text-xs text-gray-500">C/C++/Rust</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 rotate-90 md:rotate-0" />
              <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm">
                <Layers className="w-6 h-6 text-purple-500 mb-1" />
                <span className="text-xs font-bold text-gray-700">{t('wasmMechanics.pipeline.compiler')}</span>
                <span className="text-xs text-gray-500">Emscripten/wasm-pack</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 rotate-90 md:rotate-0" />
              <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm">
                <Box className="w-6 h-6 text-orange-500 mb-1" />
                <span className="text-xs font-bold text-gray-700">{t('wasmMechanics.pipeline.wasmFile')}</span>
                <span className="text-xs text-gray-500">.wasm</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 rotate-90 md:rotate-0" />
              <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg shadow-sm">
                <Database className="w-6 h-6 text-green-500 mb-1" />
                <span className="text-xs font-bold text-gray-700">{t('wasmMechanics.pipeline.browser')}</span>
                <span className="text-xs text-gray-500">V8/SpiderMonkey</span>
              </div>
            </div>
          </div>
        </SubSection>

        <SubSection title={t('wasmMechanics.moduleTitle')} icon iconColor="purple">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="space-y-2">
              {moduleStructure.map((item: any) => (
                <div key={item.name} className="flex items-center gap-3 bg-white p-2 rounded border border-purple-100">
                  <span className="text-xs font-mono font-bold text-purple-700 min-w-[80px]">{item.name}</span>
                  <span className="text-xs text-gray-600">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </SubSection>

        <SubSection title={t('wasmMechanics.interopTitle')} icon iconColor="green">
          <CodeBlock
            code={`// 1. Wasm 모듈 로드 (권장: instantiateStreaming)
const response = await fetch("module.wasm");
const { instance, module } = await WebAssembly.instantiateStreaming(
  response,
  {
    env: {
      // JS에서 Wasm으로 전달할 함수
      consoleLog: (value) => console.log("From Wasm:", value),
    },
  }
);

// 2. Wasm 함수 호출
const result = instance.exports.add(10, 20);
console.log(result); // 30

// 3. 메모리 접근
const memory = new Uint8Array(instance.exports.memory.buffer);
console.log(memory[0]); // Wasm 메모리 읽기`}
            language="javascript"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('wasmMechanics.memoryTitle')} icon iconColor="orange">
          <CodeBlock
            code={`// WebAssembly.Memory - 선형 메모리
const memory = new WebAssembly.Memory({
  initial: 1,   // 초기 페이지 수 (1 페이지 = 64KB)
  maximum: 10,  // 최대 페이지 수
});

// TypedArray로 메모리 접근
const view = new Uint8Array(memory.buffer);
view[0] = 255; // 직접 메모리 쓰기

// 메모리 증가
memory.grow(1); // 1 페이지 추가
// 주의: grow 후 기존 view는 무효화됨!`}
            language="javascript"
            className="text-xs"
          />

          <InfoBox variant="orange" title={t('wasmMechanics.memoryWarning')}>
            <p className="text-sm">
              {t('wasmMechanics.memoryWarningDesc')}
            </p>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
