import { useTranslation } from 'react-i18next';
import { Image, Video, Gamepad2, Lock, BarChart3 } from 'lucide-react';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

const useCaseIconMap = {
  image: Image,
  video: Video,
  gamepad: Gamepad2,
  lock: Lock,
  chart: BarChart3,
};

export const UseCasesSection = () => {
  const { t } = useTranslation('week18');
  const useCases = t('useCases.cases', { returnObjects: true }) as any[];

  return (
    <SectionCard
      badge={{ label: t('useCases.badge'), color: 'pink' }}
      title={t('useCases.title')}
      description={t('useCases.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('useCases.imageTitle')} icon iconColor="pink">
          <div className="space-y-4">
            <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
              <div className="flex items-center gap-2 mb-3">
                <Image className="w-4 h-4 text-pink-600" />
                <span className="text-sm font-bold text-pink-700">Rust - {t('useCases.grayscale')}</span>
              </div>
              <CodeBlock
                code={`#[wasm_bindgen]
pub fn grayscale(data: &mut [u8]) {
    for i in (0..data.len()).step_by(4) {
        let r = data[i] as f32;
        let g = data[i + 1] as f32;
        let b = data[i + 2] as f32;

        // 가중 평균 (인간의 색상 인식 고려)
        let gray = (0.299 * r + 0.587 * g + 0.114 * b) as u8;

        data[i] = gray;     // R
        data[i + 1] = gray; // G
        data[i + 2] = gray; // B
    }
}`}
                language="rust"
                className="text-xs"
              />
            </div>

            <CodeBlock
              code={`// JavaScript - Canvas 연동
import init, { grayscale } from "./pkg/image_processing.js";
await init();

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

grayscale(imageData.data);  // Wasm 처리
ctx.putImageData(imageData, 0, 0);`}
              language="javascript"
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title={t('useCases.videoTitle')} icon iconColor="purple">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <Video className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-bold text-purple-700">FFmpeg.wasm</span>
            </div>
            <CodeBlock
              code={`import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({ log: true });
await ffmpeg.load();

// 파일 로드
ffmpeg.FS("writeFile", "input.mp4", await fetchFile(videoFile));

// 변환 실행
await ffmpeg.run("-i", "input.mp4", "-vf", "scale=640:480", "output.mp4");

// 결과 가져오기
const data = ffmpeg.FS("readFile", "output.mp4");
const videoUrl = URL.createObjectURL(
  new Blob([data.buffer], { type: "video/mp4" })
);`}
              language="javascript"
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title={t('useCases.cryptoTitle')} icon iconColor="green">
          <CodeBlock
            code={`use wasm_bindgen::prelude::*;
use sha2::{Sha256, Digest};

#[wasm_bindgen]
pub fn sha256_hash(data: &[u8]) -> Vec<u8> {
    let mut hasher = Sha256::new();
    hasher.update(data);
    hasher.finalize().to_vec()
}

#[wasm_bindgen]
pub fn verify_password(password: &str, hash: &[u8]) -> bool {
    let computed = sha256_hash(password.as_bytes());
    computed == hash
}`}
            language="rust"
            className="text-xs"
          />
        </SubSection>

        <SubSection title={t('useCases.dataVizTitle')} icon iconColor="blue">
          <CodeBlock
            code={`#[wasm_bindgen]
pub fn compute_histogram(data: &[f32], bins: usize, min: f32, max: f32) -> Vec<u32> {
    let mut histogram = vec![0u32; bins];
    let range = max - min;

    for &value in data {
        if value >= min && value < max {
            let bin = ((value - min) / range * bins as f32) as usize;
            let bin = bin.min(bins - 1);
            histogram[bin] += 1;
        }
    }
    histogram
}

#[wasm_bindgen]
pub fn moving_average(data: &[f32], window: usize) -> Vec<f32> {
    if data.len() < window { return data.to_vec(); }

    let mut result = Vec::with_capacity(data.len() - window + 1);
    let mut sum: f32 = data[..window].iter().sum();
    result.push(sum / window as f32);

    for i in window..data.len() {
        sum = sum - data[i - window] + data[i];
        result.push(sum / window as f32);
    }
    result
}`}
            language="rust"
            className="text-xs"
          />
        </SubSection>

        <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
          <h4 className="font-bold text-sm text-gray-700 mb-3">{t('useCases.realWorldTitle')}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {useCases.map((uc: any) => {
              const IconComponent = useCaseIconMap[uc.icon as keyof typeof useCaseIconMap] || Image;
              return (
                <div
                  key={uc.name}
                  className="bg-white p-3 rounded border border-gray-200 flex items-start gap-3"
                >
                  <IconComponent className="w-5 h-5 text-gray-500 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-gray-800 block">{uc.name}</span>
                    <span className="text-xs text-gray-600">{uc.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionCard>
  );
};
