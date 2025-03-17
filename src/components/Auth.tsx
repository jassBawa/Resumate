import { Authenticator } from '@aws-amplify/ui-react';

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <h1>Welcome {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
