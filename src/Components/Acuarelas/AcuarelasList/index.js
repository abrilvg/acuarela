import React from 'react';
import { Grid, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Acuarela from '../Acuarela';

export default function AcuarelasList({acuarelas, loading, error, logoutUser, clearAcuarelasError}){

  const loadingMessage = (
    <Message icon info>
      <Icon name='circle notched' loading />
      <Message.Content>
          <Message.Header>Just one second</Message.Header>
          We are fetching all acuarelas...
      </Message.Content>
    </Message>
  );

  const emptyMessage = (
    <Message icon info>
      <Icon name='warning circle' />
      <Message.Content>
          <Message.Header>No acuarelas found</Message.Header>
          <p>Add some new acuarelas to get started...</p>
          <Link to={'/acuarela-form'} className="ui button primary">Add New Acuarela</Link>
      </Message.Content>
    </Message>
  );

  if (error.status === 401) {
    //TODO review other way to handle this
    //delete user data from localstorage and redux store cause token is not allows anymore
    logoutUser();
    //TODO how to handle this? clean acuarelas because we want to clean the error user unauthorized
    clearAcuarelasError();
  }

  const timeoutMessage = (
    <Message icon negative>
      <Icon name='wait' />
      <Message.Content>
          <Message.Header>{error.message}</Message.Header>
      </Message.Content>
    </Message>
  );

  const acuarelasList = (
    <Grid doubling columns={4}>
      {
        acuarelas.map((acuarela, index) => {
          return <Acuarela
            key={index}
            name={acuarela.name}
            author={acuarela.author}
            rating={acuarela.rating}
            pathImage={(acuarela.images && acuarela.images.length)? acuarela.images[0].url : 'https://react.semantic-ui.com/images/wireframe/image.png'}
          />;
        })
      }
    </Grid>
  );

  return (
    <div>
      { loading && loadingMessage }
      { acuarelas.length === 0 && !loading && !error && emptyMessage }
      { error.message && timeoutMessage }
      { acuarelas.length > 0 && acuarelasList }
    </div>
  );
}
