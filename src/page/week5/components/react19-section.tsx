import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';
import { React19Visualizer } from './react19-visualizer';

export const React19Section = () => {
  return (
    <SectionCard
      badge={{ label: 'React 19 Preview', color: 'purple' }}
      title="React 19 & Experimental Hooks"
      description="Preview of upcoming features like useOptimistic, useFormStatus, useActionState, and the 'use' hook."
    >
      <div className="space-y-8">
        <SubSection title="Server Actions Overview" icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              React 19 introduces <strong>Server Actions</strong> – functions
              that run on the server and can be called directly from client
              components. This eliminates the need for manual API route
              creation.
            </p>

            <InfoBox variant="blue" title="Benefits of Server Actions">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Zero-latency state updates with optimistic UI</li>
                <li>Automatic re-validation of data after mutations</li>
                <li>No need to manually create API routes</li>
                <li>Direct database access without exposing credentials</li>
                <li>Works with progressive enhancement</li>
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

        <SubSection title="useOptimistic Hook" icon iconColor="purple">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <code>useOptimistic</code> enables optimistic UI updates. The UI
              updates immediately while the server action completes in the
              background. If it fails, the UI automatically reverts.
            </p>

            <InfoBox variant="purple" title="How useOptimistic Works">
              <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
                <li>User triggers an action</li>
                <li>Optimistic update renders immediately</li>
                <li>Server action processes in background</li>
                <li>Success: UI stays updated, Data syncs with server</li>
                <li>Failure: UI reverts to previous state</li>
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

        <SubSection title="useFormStatus Hook" icon iconColor="green">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <code>useFormStatus</code> provides information about the form's
              submission state. Useful for showing loading states and disabling
              submit buttons during form submission.
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

        <SubSection title="useActionState Hook" icon iconColor="orange">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <code>useActionState</code> (formerly <code>useFormState</code>)
              handles the state and result of a server action. It tracks pending
              state, form data, and the action result.
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

            <InfoBox variant="gray" title="useActionState Benefits">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Automatic pending state tracking</li>
                <li>Error handling built-in</li>
                <li>Access to form data</li>
                <li>Cleaner than manual useState patterns</li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection title="The 'use' Hook" icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              The <code>use</code> hook unwraps promises or reads context,
              enabling <strong>Suspense</strong> boundaries. It allows client
              components to work with promises passed from server components.
            </p>

            <InfoBox variant="blue" title="use() API">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  <strong>Promises:</strong> Suspends the component until
                  resolved
                </li>
                <li>
                  <strong>Context:</strong> Can read context conditionally
                </li>
                <li>
                  <strong>Works with Suspense:</strong> Properly integrates with
                  Suspense boundaries
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

        <SubSection title="React Server Components (RSC)" icon iconColor="blue">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <strong>Server Components</strong> run exclusively on the server.
              They enable direct database access, keep sensitive data secure,
              and have <strong>zero bundle size impact</strong>.
            </p>

            <div className="grid grid-cols-1 gap-4">
              <InfoBox variant="blue" title="Server Components">
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>
                    Run on server only (default in Next.js 13+ App Router)
                  </li>
                  <li>Direct database/API access</li>
                  <li>No client JS bundle impact</li>
                  <li>Can't use hooks or state</li>
                  <li>Perfect for data fetching & rendering</li>
                </ul>
              </InfoBox>

              <InfoBox variant="purple" title="Client Components">
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>
                    Standard React components (use <code>'use client'</code>{' '}
                    directive)
                  </li>
                  <li>Can use hooks, state, and effects</li>
                  <li>Handle user interactivity</li>
                  <li>Sent to browser as JavaScript</li>
                  <li>Can receive data from server components</li>
                </ul>
              </InfoBox>

              <InfoBox variant="green" title="When to Use Each">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Server Components:</strong> Fetching data, database
                  queries, sensitive operations
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Client Components:</strong> Forms, buttons, event
                  handlers, browser APIs
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

        <SubSection title="Transition to React 19" icon iconColor="orange">
          <div className="space-y-4">
            <InfoBox variant="orange" title="Key Changes from React 18">
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Server Actions become first-class citizen</li>
                <li>New hooks optimized for server-client patterns</li>
                <li>Improved form handling</li>
                <li>Better integration with Next.js</li>
                <li>Enhanced error boundaries and Suspense</li>
              </ul>
            </InfoBox>

            <InfoBox variant="gray" title="Learning Resources">
              <p className="text-sm text-gray-700">
                React 19 is still evolving. Check the official React blog and
                RFC discussions for latest features. Next.js documentation is
                the best resource for practical examples.
              </p>
            </InfoBox>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
