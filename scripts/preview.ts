import { existsSync, statSync } from 'node:fs';
import { join, normalize } from 'node:path';

const BASE_PATH = '/frontend-junior-study';
const OUT_DIR = join(import.meta.dir, '..', 'out');
const port = Number(process.env.PORT ?? 3000);

function resolveFile(pathname: string) {
  const relative = normalize(decodeURIComponent(pathname)).replace(
    /^(\.\.[/\\])+/,
    '',
  );
  const candidate = join(OUT_DIR, relative);
  if (existsSync(candidate) && statSync(candidate).isDirectory()) {
    return join(candidate, 'index.html');
  }
  return candidate;
}

Bun.serve({
  port,
  fetch(request) {
    const { pathname } = new URL(request.url);
    if (!pathname.startsWith(BASE_PATH)) {
      return Response.redirect(`${BASE_PATH}/`, 302);
    }
    const file = Bun.file(resolveFile(pathname.slice(BASE_PATH.length) || '/'));
    return file.size > 0
      ? new Response(file)
      : new Response(Bun.file(join(OUT_DIR, '404.html')), { status: 404 });
  },
});

console.log(`Preview: http://localhost:${port}${BASE_PATH}/`);
