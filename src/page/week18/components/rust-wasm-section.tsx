import { Box, Code, Link as LinkIcon, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

export const RustWasmSection = () => {
  const { t } = useTranslation('week18');

  return (
    <SectionCard
      badge={{ label: t('rustWasm.badge'), color: 'orange' }}
      title={t('rustWasm.title')}
      description={t('rustWasm.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('rustWasm.basicTitle')} icon iconColor="orange">
          <div className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-bold text-orange-700">
                  src/lib.rs
                </span>
              </div>
              <CodeBlock
                code={`use wasm_bindgen::prelude::*;

// JavaScript에서 호출 가능한 함수
#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}`}
                language="rust"
                className="text-xs"
              />
            </div>

            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-bold text-gray-700">
                  JavaScript
                </span>
              </div>
              <CodeBlock
                code={`import init, { add, fibonacci } from "./pkg/my_wasm_project.js";

await init();
console.log(add(10, 20));     // 30
console.log(fibonacci(10));   // 55`}
                language="javascript"
                className="text-xs"
              />
            </div>
          </div>
        </SubSection>

        <SubSection title={t('rustWasm.stringTitle')} icon iconColor="blue">
          <CodeBlock
            code={`use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[wasm_bindgen]
pub fn reverse_string(s: &str) -> String {
    s.chars().rev().collect()
}`}
            language="rust"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('rustWasm.structTitle')} icon iconColor="green">
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-3">
                <Box className="w-4 h-4 text-green-600" />
                <span className="text-sm font-bold text-green-700">
                  Rust Struct
                </span>
              </div>
              <CodeBlock
                code={`use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Calculator {
    value: f64,
}

#[wasm_bindgen]
impl Calculator {
    #[wasm_bindgen(constructor)]
    pub fn new(initial: f64) -> Calculator {
        Calculator { value: initial }
    }

    pub fn add(&mut self, n: f64) {
        self.value += n;
    }

    pub fn subtract(&mut self, n: f64) {
        self.value -= n;
    }

    pub fn result(&self) -> f64 {
        self.value
    }
}`}
                language="rust"
                className="text-xs"
              />
            </div>

            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-bold text-gray-700">
                  {t('rustWasm.jsUsage')}
                </span>
              </div>
              <CodeBlock
                code={`import { Calculator } from "./pkg/my_wasm_project.js";

const calc = new Calculator(100);
calc.add(50);
calc.subtract(30);
console.log(calc.result()); // 120`}
                language="javascript"
                className="text-xs"
              />
            </div>
          </div>
        </SubSection>

        <SubSection title={t('rustWasm.externTitle')} icon iconColor="purple">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <LinkIcon className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-bold text-purple-700">
                {t('rustWasm.callingJs')}
              </span>
            </div>
            <CodeBlock
              code={`use wasm_bindgen::prelude::*;

// JavaScript 함수 선언 (extern)
#[wasm_bindgen]
extern "C" {
    // console.log 바인딩
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // alert 바인딩
    fn alert(s: &str);

    // 커스텀 JavaScript 함수
    #[wasm_bindgen(js_name = getCurrentTime)]
    fn get_current_time() -> f64;
}

#[wasm_bindgen]
pub fn run_with_logging() {
    log("Wasm 모듈이 실행되었습니다!");
    let time = get_current_time();
    log(&format!("현재 시간: {}", time));
}`}
              language="rust"
              className="text-xs"
            />
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
