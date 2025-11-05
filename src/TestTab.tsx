import React, { FC } from 'react';

const TestTab: FC = (props) => {
  return (
    <>
      <p>
        <strong>Test tab</strong>
      </p>
      {Object.entries(props ?? {}).map(([name, value]) => (
        <>
          <p>
            <strong>Prop: {name}</strong>
          </p>
          <pre>{JSON.stringify(value, null, 2)}</pre>
        </>
      ))}
    </>
  );
};

export default TestTab;
