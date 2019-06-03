import React from 'react';
import { Grid, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Acuarela from '../acuarela';

export default function AcuarelasList({
  acuarelas,
  loading
}){

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

  // const timeoutMessage = (
  //   <Message icon negative>
  //     <Icon name='wait' />
  //     <Message.Content>
  //         <Message.Header>{error.message}</Message.Header>
  //     </Message.Content>
  //   </Message>
  // );

  const acuarelasList = (
    <Grid doubling columns={6}>
      {
        acuarelas.map((acuarela, index) => {
          return <Acuarela
            key={index}
            id={acuarela._id}
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
      { acuarelas.length === 0 && !loading && emptyMessage }
      { acuarelas.length > 0 && acuarelasList }
    </div>
  );
}
