import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const React19Section = () => {
  return (
    <SectionCard
      badge={{ label: 'React 19 Preview', color: 'purple' }}
      title="React 19 & Experimental Hooks"
      description="Preview of upcoming features like useOptimistic, useFormStatus, and the 'use' hook."
    >
      <div className="space-y-8">
        <SubSection title="useOptimistic" icon iconColor="purple">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <code>useOptimistic</code> lets you optimistically update the UI
              while a background async action (like a Server Action) is pending.
              If the action fails, it automatically reverts.
            </p>
            <CodeBlock
              code={`import { useOptimistic } from 'react';

function LikeButton({ likeCount, onLike }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likeCount,
    (state, newLike) => state + newLike
  );

  return (
    <button onClick={async () => {
      addOptimisticLike(1); // Immediate UI update
      await onLike(); // Server request
    }}>
      Likes: {optimisticLikes}
    </button>
  );
}`}
              className="text-xs"
            />
          </div>
        </SubSection>

        <SubSection title="The 'use' Hook" icon iconColor="pink">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              The <code>use</code> API allows you to unwrap promises or read
              context inside components (even conditionally). It is a key part
              of integrating Server Components with Client Components.
            </p>
            <CodeBlock
              code={`import { use } from 'react';

function Comments({ commentsPromise }) {
  // Suspend until promise resolves
  const comments = use(commentsPromise); 

  return (
    <ul>
      {comments.map(comment => <li key={comment.id}>{comment.text}</li>)}
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
              Components that run exclusively on the server. They have zero
              bundle size impact and can access server resources (database,
              filesystem) directly.
            </p>
            <InfoBox variant="gray" title="RSC vs Client Components">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Server Components:</strong> No interactivity
                  (onClick), no useState/useEffect. Good for data fetching.
                </li>
                <li>
                  <strong>Client Components:</strong> Standard React components
                  with interactivity. Start with <code>'use client'</code>.
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
