import React, { useEffect } from 'react';
import CollectionDetails from './components/CollectionDetails';
import ParticipantsTable from './components/CollectionDetails/ParticipantsTable';
import 'rsuite/dist/rsuite.min.css';
import { Container, Content } from 'rsuite';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export type Participant = {
  id: number;
  ownerFullName: string;
  avatar: string;
  ownerName: string;
  jarName: string;
  jarAmount: number;
  jarGoal: number;
  jarStatus: string;
  jarLink: string;
}

function App() {
  const [loading, setLoading] = React.useState(false);
  const [participants, setParticipants] = React.useState([] as Participant[]);

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/api/groups-data`)
      .then(response => response.json())
      .then(results => {
        setParticipants(results);
      })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  const actualGoal = participants.reduce((acc, participant) => acc + participant.jarGoal, 0);
  const actualAmount = participants.reduce((acc, participant) => acc + participant.jarAmount, 0);

  return (
    <Container>
      <Content style={{padding: 20 }}>
        <CollectionDetails
          responsible="Марія Підкапка"
          initialGoal={273_000_00}
          actualGoal={actualGoal}
          actualAmount={actualAmount}
        />

        <ParticipantsTable loading={loading} participants={participants} />
      </Content>
    </Container>
  );
}

export default App;
