import { Trans, useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { React19Visualizer } from './react19-visualizer';

export const React19Section = () => {
  const { t } = useTranslation('week5');
  return (
    <SectionCard
      badge={{ label: t('react19.badge'), color: 'purple' }}
      title={t('react19.title')}
      description={t('react19.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('react19.serverActions.title')}
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans t={t} i18nKey="react19.serverActions.intro" />
            </p>

            <InfoBox
              variant="blue"
              title={t('react19.serverActions.benefits.title')}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>{t('react19.serverActions.benefits.zeroLatency')}</li>
                <li>{t('react19.serverActions.benefits.autoRevalidation')}</li>
                <li>{t('react19.serverActions.benefits.noAPIRoutes')}</li>
                <li>{t('react19.serverActions.benefits.directDB')}</li>
                <li>{t('react19.serverActions.benefits.progressive')}</li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`// app/actions.ts (Server Action)
'use server';

export async function addTodo(formData) {
  const title = formData.get('title');
  // Direct database access on server
  await db.todos.create({ title });
  revalidatePath('/todos');
}

// Client Component
import { addTodo } from './actions';

export function AddTodoForm() {
  return (
    <form action={addTodo}>
      <input name="title" type="text" />
      <button type="submit">Add Todo</button>
    </form>
  );
}`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection
          title={t('react19.useOptimistic.title')}
          icon
          iconColor="purple"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans
                t={t}
                i18nKey="react19.useOptimistic.intro"
                components={{ code: <code /> }}
              />
            </p>

            <InfoBox
              variant="purple"
              title={t('react19.useOptimistic.howItWorks.title')}
            >
              <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
                <li>{t('react19.useOptimistic.howItWorks.step1')}</li>
                <li>{t('react19.useOptimistic.howItWorks.step2')}</li>
                <li>{t('react19.useOptimistic.howItWorks.step3')}</li>
                <li>{t('react19.useOptimistic.howItWorks.step4')}</li>
                <li>{t('react19.useOptimistic.howItWorks.step5')}</li>
              </ol>
            </InfoBox>

            <CodeBlock
              code={`'use client';

import { useOptimistic } from 'react';
import { updateTodo } from './actions';

function TodoList({ todos }) {
  const [optimisticTodos, updateOptimistic] = useOptimistic(
    todos,
    (state, newTodo) => {
      return state.map(todo =>
        todo.id === newTodo.id
          ? { ...todo, completed: newTodo.completed }
          : todo
      );
    }
  );

  async function handleToggle(todo) {
    // Update UI immediately
    updateOptimistic({
      ...todo,
      completed: !todo.completed
    });

    // Server updates in background
    await updateTodo(todo.id, !todo.completed);
  }

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggle(todo)}
          />
          {todo.title}
        </li>
      ))}
    </ul>
  );
}`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <React19Visualizer />

        <SubSection
          title={t('react19.useFormStatus.title')}
          icon
          iconColor="green"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans
                t={t}
                i18nKey="react19.useFormStatus.intro"
                components={{ code: <code /> }}
              />
            </p>

            <CodeBlock
              code={`'use client';

import { useFormStatus } from 'react-dom';
import { submitForm } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={pending ? 'opacity-50 cursor-not-allowed' : ''}
    >
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

export function ContactForm() {
  return (
    <form action={submitForm}>
      <input name="name" type="text" required />
      <textarea name="message" required />
      <SubmitButton />
    </form>
  );
}`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection
          title={t('react19.useActionState.title')}
          icon
          iconColor="orange"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans
                t={t}
                i18nKey="react19.useActionState.intro"
                components={{ code: <code /> }}
              />
            </p>

            <CodeBlock
              code={`'use client';

import { useActionState } from 'react';
import { loginUser } from './actions';

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginUser,
    { error: null, success: false }
  );

  return (
    <form action={formAction}>
      {state.error && (
        <div className="error">{state.error}</div>
      )}

      <input
        name="email"
        type="email"
        required
        disabled={isPending}
      />
      <input
        name="password"
        type="password"
        required
        disabled={isPending}
      />

      <button type="submit" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Log In'}
      </button>

      {state.success && <p>Login successful!</p>}
    </form>
  );
}`}
              className="text-xs"
            />

            <InfoBox
              variant="gray"
              title={t('react19.useActionState.benefits.title')}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>{t('react19.useActionState.benefits.autoPending')}</li>
                <li>{t('react19.useActionState.benefits.errorHandling')}</li>
                <li>{t('react19.useActionState.benefits.formData')}</li>
                <li>{t('react19.useActionState.benefits.cleaner')}</li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>
        <SubSection title={t('react19.useHook.title')} icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans
                t={t}
                i18nKey="react19.useHook.intro"
                components={{ code: <code /> }}
              />
            </p>

            <InfoBox variant="blue" title={t('react19.useHook.api.title')}>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  <Trans t={t} i18nKey="react19.useHook.api.promises" />
                </li>
                <li>
                  <Trans t={t} i18nKey="react19.useHook.api.context" />
                </li>
                <li>
                  <Trans t={t} i18nKey="react19.useHook.api.suspense" />
                </li>
              </ul>
            </InfoBox>

            <CodeBlock
              code={`// Server Component
async function getComments(postId) {
  const comments = await db.comments.findMany({ postId });
  return comments;
}

export default function Post({ id }) {
  const commentsPromise = getComments(id);

  return (
    <div>
      <h1>Post {id}</h1>
      <Suspense fallback={<LoadingComments />}>
        <Comments promise={commentsPromise} />
      </Suspense>
    </div>
  );
}

// Client Component using 'use'
'use client';

import { use } from 'react';

function Comments({ promise }) {
  // Suspend the component until promise resolves
  const comments = use(promise);

  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>{comment.text}</li>
      ))}
    </ul>
  );
}`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title={t('react19.nextjs.title')} icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans
                t={t}
                i18nKey="react19.nextjs.description"
                components={{ strong: <strong />, code: <code /> }}
              />{' '}
              <Trans
                t={t}
                i18nKey="react19.useHook.nextjsCaching"
                components={{ code: <code /> }}
              />
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-purple-100 shadow-sm">
                <h4 className="font-bold text-purple-700 mb-2">
                  {t('react19.nextjs.oldWay.title')}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  <Trans
                    t={t}
                    i18nKey="react19.nextjs.oldWay.description"
                    components={{ code: <code /> }}
                  />
                </p>
                <code className="text-xs bg-gray-100 p-1 rounded block">
                  {t('react19.nextjs.oldWay.code')}
                </code>
              </div>

              <div className="p-4 bg-white rounded-lg border border-blue-100 shadow-sm">
                <h4 className="font-bold text-blue-700 mb-2">
                  {t('react19.nextjs.newWay.title')}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {t('react19.nextjs.newWay.description')}
                </p>
                <code className="text-xs bg-gray-100 p-1 rounded block">
                  {t('react19.nextjs.newWay.code1')}
                  <br />
                  {t('react19.nextjs.newWay.code2')}
                </code>
              </div>
            </div>
          </div>
        </SubSection>

        <SubSection title={t('react19.rsc.title')} icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans t={t} i18nKey="react19.rsc.intro" />
            </p>

            <div className="grid grid-cols-1 gap-4">
              <InfoBox
                variant="blue"
                title={t('react19.rsc.serverComponents.title')}
              >
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>
                    <Trans
                      t={t}
                      i18nKey="react19.rsc.serverComponents.serverOnly"
                    />
                  </li>
                  <li>{t('react19.rsc.serverComponents.directDB')}</li>
                  <li>{t('react19.rsc.serverComponents.noBundle')}</li>
                  <li>{t('react19.rsc.serverComponents.noHooks')}</li>
                  <li>{t('react19.rsc.serverComponents.perfectFor')}</li>
                </ul>
              </InfoBox>

              <InfoBox
                variant="purple"
                title={t('react19.rsc.clientComponents.title')}
              >
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>
                    <Trans
                      t={t}
                      i18nKey="react19.rsc.clientComponents.standard"
                      components={{ code: <code /> }}
                    />
                  </li>
                  <li>{t('react19.rsc.clientComponents.useHooks')}</li>
                  <li>{t('react19.rsc.clientComponents.interactivity')}</li>
                  <li>{t('react19.rsc.clientComponents.sentBrowser')}</li>
                  <li>{t('react19.rsc.clientComponents.receiveData')}</li>
                </ul>
              </InfoBox>

              <InfoBox variant="green" title={t('react19.rsc.whenToUse.title')}>
                <p className="text-sm text-gray-700 mb-2">
                  <Trans t={t} i18nKey="react19.rsc.whenToUse.server" />
                </p>
                <p className="text-sm text-gray-700">
                  <Trans t={t} i18nKey="react19.rsc.whenToUse.client" />
                </p>
              </InfoBox>
            </div>

            <CodeBlock
              code={`// app/posts/[id]/page.tsx (Server Component by default)
import { Suspense } from 'react';
import { getPosts, getComments } from '@/lib/db';

export default async function Post({ params }) {
  const posts = await getPosts();
  const comments = await getComments(params.id);

  return (
    <article>
      <h1>{posts[params.id].title}</h1>

      <Suspense fallback={<p>Loading comments...</p>}>
        <Comments commentsPromise={comments} />
      </Suspense>
    </article>
  );
}

// Components/Comments.tsx (Client Component)
'use client';

import { use } from 'react';

export function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return <ul>{/* render comments */}</ul>;
}`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection
          title={t('react19.transition.title')}
          icon
          iconColor="orange"
        >
          <div className="space-y-4">
            <InfoBox
              variant="orange"
              title={t('react19.transition.keyChanges.title')}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>{t('react19.transition.keyChanges.serverActions')}</li>
                <li>{t('react19.transition.keyChanges.newHooks')}</li>
                <li>{t('react19.transition.keyChanges.formHandling')}</li>
                <li>{t('react19.transition.keyChanges.nextjsIntegration')}</li>
                <li>{t('react19.transition.keyChanges.enhancedBoundaries')}</li>
              </ul>
            </InfoBox>

            <InfoBox
              variant="gray"
              title={t('react19.transition.resources.title')}
            >
              <p className="text-sm text-gray-700">
                {t('react19.transition.resources.description')}
              </p>
            </InfoBox>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
