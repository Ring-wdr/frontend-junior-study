import { useTranslation } from 'react-i18next';
import { Terminal, Settings, Wrench } from 'lucide-react';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const DevEnvironmentSection = () => {
  const { t } = useTranslation('week18');
  const toolchains = t('devEnvironment.toolchains', { returnObjects: true }) as any[];

  return (
    <SectionCard
      badge={{ label: t('devEnvironment.badge'), color: 'green' }}
      title={t('devEnvironment.title')}
      description={t('devEnvironment.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('devEnvironment.toolchainsTitle')} icon iconColor="green">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left font-bold text-gray-700">{t('devEnvironment.table.language')}</th>
                  <th className="p-2 text-left font-bold text-gray-700">{t('devEnvironment.table.toolchain')}</th>
                  <th className="p-2 text-left font-bold text-gray-700">{t('devEnvironment.table.features')}</th>
                </tr>
              </thead>
              <tbody>
                {toolchains.map((tc: any) => (
                  <tr key={tc.language} className="border-b border-gray-100">
                    <td className="p-2 font-medium text-gray-800">{tc.language}</td>
                    <td className="p-2 font-mono text-green-700">{tc.toolchain}</td>
                    <td className="p-2 text-gray-600">{tc.features}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title={t('devEnvironment.emscriptenTitle')} icon iconColor="blue">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-blue-700">{t('devEnvironment.installSteps')}</span>
            </div>
            <CodeBlock
              code={`# Emscripten 설치
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh

# 컴파일
emcc hello.c -o hello.js -s WASM=1`}
              language="bash"
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title={t('devEnvironment.rustTitle')} icon iconColor="orange">
          <div className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-bold text-orange-700">{t('devEnvironment.rustSetup')}</span>
              </div>
              <CodeBlock
                code={`# Rust 설치 후
rustup target add wasm32-unknown-unknown

# wasm-pack 설치
cargo install wasm-pack

# 프로젝트 생성
cargo new --lib my-wasm-project
cd my-wasm-project

# 빌드
wasm-pack build --target web`}
                language="bash"
                className="text-xs"
              />
            </div>

            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-bold text-gray-700">Cargo.toml</span>
              </div>
              <CodeBlock
                code={`[package]
name = "my-wasm-project"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"

[profile.release]
opt-level = "s"      # 크기 최적화
lto = true           # 링크 타임 최적화`}
                language="toml"
                className="text-xs"
              />
            </div>
          </div>
        </SubSection>

        <SubSection title={t('devEnvironment.assemblyScriptTitle')} icon iconColor="purple">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-bold text-purple-700">{t('devEnvironment.assemblyScriptSetup')}</span>
            </div>
            <CodeBlock
              code={`# npm으로 설치
npm init -y
npm install --save-dev assemblyscript

# 프로젝트 초기화
npx asinit .

# 빌드
npm run asbuild`}
              language="bash"
              className="text-xs"
            />
          </div>

          <InfoBox variant="purple" title={t('devEnvironment.assemblyScriptNote')}>
            <p className="text-sm">
              {t('devEnvironment.assemblyScriptNoteDesc')}
            </p>
          </InfoBox>
        </SubSection>
      </div>
    </SectionCard>
  );
};
