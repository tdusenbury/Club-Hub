import React from 'react';
import { useQuery } from '@apollo/client';

import { } from '../utils/queries';

const Home = () => {
  // const { loading, data } = useQuery(QUERY_THOUGHTS);

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <h1>LANDING PAGE!!!!!</h1>
        </div>
        <div className="col-12 col-md-8 mb-3">

          <h1>GET INVOLVED</h1>

        </div>
      </div>
    </main>
  );
};

export default Home;
