import React from 'react';
import { useQuery } from '@apollo/client';
import { } from '../utils/queries';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';


const Home = () => {
  // const { loading, data } = useQuery(QUERY_THOUGHTS);

  return (
         <MDBRow>
      <MDBCol md='8'>
        md="8"
      </MDBCol>
      <MDBCol md='4'>
        md="4"
      </MDBCol>
    </MDBRow>
  );
};

export default Home;
