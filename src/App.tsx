import './App.css';
import { TokenResponse } from '@react-oauth/google';
import { useState } from 'react';
import { people_v1 } from '@googleapis/people';
import GoogleLoginButton from './components/GoogleLoginButton';
import InfoCard from './components/InfoCard';

function App() {
  const [userData, setUserData] = useState<people_v1.Schema$Person | null>(null)

  const getUserInfo = async (tokenResponse: TokenResponse): Promise<void> => {
    const personResponse = await fetch(
      `https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names,organizations,occupations`,
      {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`
        }
      }
    )
    const personData: people_v1.Schema$Person = await personResponse.json()
    setUserData(personData)
  }

  return (
    <div className="App">
      <section className="App-content">
        {!userData 
          ? <GoogleLoginButton onSuccess={getUserInfo} />
          : <InfoCard data={[
              {name: 'Name', value: userData.names?.[0].displayName},
              {name: 'Email', value: userData.emailAddresses?.[0].value},
              {name: 'Occupation', value: userData.occupations?.[0].value},
              {name: 'Job description', value: userData.organizations?.[0].jobDescription},
            ]} />
        }
      </section>
    </div>
  );
}

export default App;
