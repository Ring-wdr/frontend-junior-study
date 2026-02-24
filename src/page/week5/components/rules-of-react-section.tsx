import { Trans, useTranslation } from 'react-i18next';
import { InfoBox, SectionCard, SubSection } from '../../../components';
import { CodeBlock } from '../../../components/ui/code-block';

export const RulesOfReactSection = () => {
  const { t } = useTranslation('week5');

  return (
    <SectionCard
      badge={{ label: t('rulesOfReact.badge'), color: 'red' }}
      title={t('rulesOfReact.title')}
      description={t('rulesOfReact.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('rulesOfReact.componentsAndHooksPure.title')}
          icon
          iconColor="blue"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans
                t={t}
                i18nKey="rulesOfReact.componentsAndHooksPure.intro"
                components={{ strong: <strong />, code: <code /> }}
              />
            </p>

            <h5 className="font-semibold text-gray-900">
              {t('rulesOfReact.componentsAndHooksPure.badCodeTitle')}
            </h5>
            <CodeBlock
              code={`// Bad: side effects and external mutation during render
let renderCount = 0;

function ProductPage({ product }) {
  renderCount += 1; // external mutation during render
  document.title = \`\${product.name} • Render \${renderCount}\`;
  const id = Math.random(); // not deterministic
  return <h1 key={id}>{product.name}</h1>;
}`}
              className="text-xs"
            />

            <h5 className="font-semibold text-gray-900">
              {t('rulesOfReact.componentsAndHooksPure.goodCodeTitle')}
            </h5>
            <CodeBlock
              code={`// Good: keep render pure
import { useEffect } from 'react';

function ProductPage({ product }) {
  const title = \`Product: \${product.name}\`;

  useEffect(() => {
    document.title = title;
  }, [title]);

  return <h1>{product.name}</h1>;
}`}
              className="text-xs"
            />

            <InfoBox
              variant="blue"
              title={t('rulesOfReact.componentsAndHooksPure.checklist.title')}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  {t('rulesOfReact.componentsAndHooksPure.checklist.item1')}
                </li>
                <li>
                  {t('rulesOfReact.componentsAndHooksPure.checklist.item2')}
                </li>
                <li>
                  {t('rulesOfReact.componentsAndHooksPure.checklist.item3')}
                </li>
                <li>
                  {t('rulesOfReact.componentsAndHooksPure.checklist.item4')}
                </li>
                <li>
                  {t('rulesOfReact.componentsAndHooksPure.checklist.item5')}
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title={t('rulesOfReact.reactCallsComponentsAndHooks.title')}
          icon
          iconColor="purple"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans
                t={t}
                i18nKey="rulesOfReact.reactCallsComponentsAndHooks.intro"
                components={{ strong: <strong />, code: <code /> }}
              />
            </p>

            <h5 className="font-semibold text-gray-900">
              {t('rulesOfReact.reactCallsComponentsAndHooks.badCodeTitle')}
            </h5>
            <CodeBlock
              code={`// Bad: calling component or hook from the wrong place
function BlogPost({ title }) {
  const likes = useLikeCounter(); // should only be in component/custom hook
  const article = Article({ title, likes }); // component called like normal function

  const onSubmit = () => {
    const [status] = useFormStatus(); // ❌ callback call
    if (status.success) {
      return 'done';
    }
  };

  return <section>{article}</section>;
}`}
              className="text-xs"
            />

            <h5 className="font-semibold text-gray-900">
              {t('rulesOfReact.reactCallsComponentsAndHooks.goodCodeTitle')}
            </h5>
            <CodeBlock
              code={`// Good: render components in JSX and keep hooks in React bodies
function usePostLikeState(initialLikes) {
  const [likes, setLikes] = useState(initialLikes);
  return { likes, setLikes };
}

function BlogPost({ title }) {
  const { likes, setLikes } = usePostLikeState(0);

  return (
    <article>
      <Article title={title} likes={likes} />
      <LikeButton onSubmit={() => setLikes((prev) => prev + 1)} />
    </article>
  );
}`}
              className="text-xs"
            />

            <InfoBox
              variant="purple"
              title={t(
                'rulesOfReact.reactCallsComponentsAndHooks.checklist.title',
              )}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  {t(
                    'rulesOfReact.reactCallsComponentsAndHooks.checklist.item1',
                  )}
                </li>
                <li>
                  {t(
                    'rulesOfReact.reactCallsComponentsAndHooks.checklist.item2',
                  )}
                </li>
                <li>
                  {t(
                    'rulesOfReact.reactCallsComponentsAndHooks.checklist.item3',
                  )}
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title={t('rulesOfReact.rulesOfHooks.title')}
          icon
          iconColor="orange"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans
                t={t}
                i18nKey="rulesOfReact.rulesOfHooks.intro"
                components={{ strong: <strong />, code: <code /> }}
              />
            </p>

            <h5 className="font-semibold text-gray-900">
              {t('rulesOfReact.rulesOfHooks.badCodeTitle')}
            </h5>
            <CodeBlock
              code={`// Bad: conditional, loop, callback hook calls
function UserProfile({ isAdmin, users }) {
  const [name] = useState('');

  if (isAdmin) {
    const [adminUsers] = useState([]); // ❌ conditional hook call
  }

  for (const user of users) {
    const [selected] = useState(false); // ❌ loop call
    void selected;
  }

  return (
    <button onClick={() => {
      const [clicked, setClicked] = useState(false); // ❌ callback call
      setClicked(!clicked);
    }}>
      Save
    </button>
  );
}`}
              className="text-xs"
            />

            <h5 className="font-semibold text-gray-900">
              {t('rulesOfReact.rulesOfHooks.goodCodeTitle')}
            </h5>
            <CodeBlock
              code={`// Good: hook order is fixed at top-level
function UserProfile({ isAdmin, users }) {
  const [name, setName] = useState('');
  const [adminUsers] = useState([]);
  const [clicked, setClicked] = useState(false);
  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => a.name.localeCompare(b.name)),
    [users],
  );

  const listToRender = isAdmin ? adminUsers : sortedUsers;

  return (
    <button onClick={() => setClicked(!clicked)}>
      {clicked ? 'Saving...' : 'Save'}
      {listToRender.length ? '(' + listToRender.length + ')' : ''}
    </button>
  );
}`}
              className="text-xs"
            />

            <InfoBox
              variant="orange"
              title={t('rulesOfReact.rulesOfHooks.checklist.title')}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>{t('rulesOfReact.rulesOfHooks.checklist.item1')}</li>
                <li>{t('rulesOfReact.rulesOfHooks.checklist.item2')}</li>
                <li>{t('rulesOfReact.rulesOfHooks.checklist.item3')}</li>
                <li>{t('rulesOfReact.rulesOfHooks.checklist.item4')}</li>
                <li>{t('rulesOfReact.rulesOfHooks.checklist.item5')}</li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title={t('rulesOfReact.setStateInEffect.title')}
          icon
          iconColor="green"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans
                t={t}
                i18nKey="rulesOfReact.setStateInEffect.intro"
                components={{ strong: <strong />, code: <code /> }}
              />
            </p>

            <h5 className="font-semibold text-gray-900">
              {t('rulesOfReact.setStateInEffect.badCodeTitle')}
            </h5>
            <CodeBlock
              code={`// Bad: useEffect only copies derived values into state
import { useEffect, useState } from 'react';

function UserBadge({ user }) {
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    setDisplayName(\`\${user.firstName} \${user.lastName}\`);
  }, [user.firstName, user.lastName]);

  return <span>{displayName}</span>;
}`}
              className="text-xs"
            />

            <h5 className="font-semibold text-gray-900">
              {t('rulesOfReact.setStateInEffect.goodCodeTitle')}
            </h5>
            <CodeBlock
              code={`// Good: compute derived value during render
import { useMemo } from 'react';

function UserBadge({ user }) {
  const displayName = useMemo(
    () => \`\${user.firstName} \${user.lastName}\`,
    [user.firstName, user.lastName],
  );

  return <span>{displayName}</span>;
}`}
              className="text-xs"
            />

            <InfoBox
              variant="green"
              title={t('rulesOfReact.setStateInEffect.checklist.title')}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>{t('rulesOfReact.setStateInEffect.checklist.item1')}</li>
                <li>{t('rulesOfReact.setStateInEffect.checklist.item2')}</li>
                <li>{t('rulesOfReact.setStateInEffect.checklist.item3')}</li>
                <li>{t('rulesOfReact.setStateInEffect.checklist.item4')}</li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>

        <SubSection
          title={t('rulesOfReact.youMightNotNeedAnEffect.title')}
          icon
          iconColor="pink"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <Trans
                t={t}
                i18nKey="rulesOfReact.youMightNotNeedAnEffect.intro"
                components={{ strong: <strong />, code: <code /> }}
              />
            </p>

            <h5 className="font-semibold text-gray-900">
              {t('rulesOfReact.youMightNotNeedAnEffect.badCodeTitle')}
            </h5>
            <CodeBlock
              code={`// Bad: deriving state inside effect
import { useEffect, useState } from 'react';

function UserList({ users, query }) {
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setFilteredUsers(users.filter((user) => user.name.includes(query)));
  }, [users, query]);

  return (
    <ul>
      {filteredUsers.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`}
              className="text-xs"
            />

            <h5 className="font-semibold text-gray-900">
              {t('rulesOfReact.youMightNotNeedAnEffect.goodCodeTitle')}
            </h5>
            <CodeBlock
              code={`// Good: derive list in render or memoize it
import { useMemo } from 'react';

function UserList({ users, query }) {
  const filteredUsers = useMemo(
    () => users.filter((user) => user.name.includes(query)),
    [users, query],
  );

  return (
    <ul>
      {filteredUsers.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`}
              className="text-xs"
            />

            <InfoBox
              variant="red"
              title={t('rulesOfReact.youMightNotNeedAnEffect.checklist.title')}
            >
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>
                  {t('rulesOfReact.youMightNotNeedAnEffect.checklist.item1')}
                </li>
                <li>
                  {t('rulesOfReact.youMightNotNeedAnEffect.checklist.item2')}
                </li>
                <li>
                  {t('rulesOfReact.youMightNotNeedAnEffect.checklist.item3')}
                </li>
                <li>
                  {t('rulesOfReact.youMightNotNeedAnEffect.checklist.item4')}
                </li>
              </ul>
            </InfoBox>
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
