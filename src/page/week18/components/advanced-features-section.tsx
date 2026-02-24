import { ArrowRight, Cpu, Trash2, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const AdvancedFeaturesSection = () => {
  const { t } = useTranslation('week18');

  return (
    <SectionCard
      badge={{ label: t('advancedFeatures.badge'), color: 'red' }}
      title={t('advancedFeatures.title')}
      description={t('advancedFeatures.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('advancedFeatures.simdTitle')}
          icon
          iconColor="red"
        >
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4 text-red-600" />
                <span className="text-sm font-bold text-red-700">
                  {t('advancedFeatures.simdDesc')}
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                {t('advancedFeatures.simdExplain')}
              </p>
              <CodeBlock
                code={`// Rust에서 SIMD 사용 예시
use std::arch::wasm32::*;

pub fn vector_add(a: &[f32], b: &[f32], result: &mut [f32]) {
    for i in (0..a.len()).step_by(4) {
        unsafe {
            let va = v128_load(a.as_ptr().add(i) as *const v128);
            let vb = v128_load(b.as_ptr().add(i) as *const v128);
            let vr = f32x4_add(va, vb);
            v128_store(result.as_mut_ptr().add(i) as *mut v128, vr);
        }
    }
}`}
                language="rust"
                className="text-xs"
              />
            </div>

            <CodeBlock
              code={`// JavaScript에서 SIMD 지원 확인
const simdSupported = WebAssembly.validate(
  new Uint8Array([
    0x00, 0x61, 0x73, 0x6d, // Magic
    0x01, 0x00, 0x00, 0x00, // Version
    // ... SIMD 128-bit type 검증 바이트코드
  ])
);
console.log("SIMD 지원:", simdSupported);`}
              language="javascript"
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection
          title={t('advancedFeatures.threadsTitle')}
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-blue-700">
                  {t('advancedFeatures.threadsDesc')}
                </span>
              </div>
              <CodeBlock
                code={`// main.js
const memory = new WebAssembly.Memory({
  initial: 10,
  maximum: 100,
  shared: true, // SharedArrayBuffer 활성화
});

const worker = new Worker("worker.js");
worker.postMessage({ memory });

// worker.js
self.onmessage = async (e) => {
  const { memory } = e.data;
  const { instance } = await WebAssembly.instantiateStreaming(
    fetch("parallel_module.wasm"),
    { env: { memory } }
  );
  instance.exports.parallel_compute();
};`}
                language="javascript"
                className="text-xs"
              />
            </div>

            <InfoBox variant="blue" title={t('advancedFeatures.coopCoep')}>
              <p className="text-sm font-mono">
                Cross-Origin-Opener-Policy: same-origin
                <br />
                Cross-Origin-Embedder-Policy: require-corp
              </p>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title={t('advancedFeatures.gcTitle')}
          icon
          iconColor="green"
        >
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <Trash2 className="w-4 h-4 text-green-600" />
              <span className="text-sm font-bold text-green-700">
                {t('advancedFeatures.gcDesc')}
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-4">
              {t('advancedFeatures.gcExplain')}
            </p>

            <div className="space-y-3">
              <div className="bg-white p-3 rounded border border-gray-200">
                <span className="text-xs font-bold text-gray-700 block mb-2">
                  {t('advancedFeatures.beforeGc')}
                </span>
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-gray-200 px-2 py-1 rounded">Wasm</span>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <span className="text-red-600">
                    {t('advancedFeatures.selfGcNeeded')}
                  </span>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <span className="text-red-600">
                    {t('advancedFeatures.overhead')}
                  </span>
                </div>
              </div>
              <div className="bg-white p-3 rounded border border-green-200">
                <span className="text-xs font-bold text-green-700 block mb-2">
                  {t('advancedFeatures.afterGc')}
                </span>
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-green-200 px-2 py-1 rounded">Wasm</span>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <span className="text-green-600">
                    {t('advancedFeatures.browserGc')}
                  </span>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <span className="text-green-600">
                    {t('advancedFeatures.efficient')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
