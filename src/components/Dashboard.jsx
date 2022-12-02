import React from 'react';
import Editor from 'react-simple-code-editor';

export default function Dashboard() {
  const [code, setCode] = React.useState('');

  let msg = 'default message here';
  try {
    msg = process.env.MY_CUSTOM_SECRET || msg;
  } catch {}
  return (
    <>
      The editor:
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => {}}
        padding={10}
      />
    </>
  );
}
