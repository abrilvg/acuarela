import React from 'react';
import { Grid, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Acuarela from '../Acuarela';
import { Redirect } from 'react-router-dom';

export default function AcuarelasList({acuarelas, loading, error, logoutUser, cleanAcuarelas}){

  const loadingMessage = (
      <Message icon info>
        <Icon name='circle notched' loading />
        <Message.Content>
           <Message.Header>Just one second</Message.Header>
           We are fetching all acuarelas...
       </Message.Content>
      </Message>
    )

  const emptyMessage = (
    <Message icon info>
      <Icon name='warning circle' />
      <Message.Content>
          <Message.Header>No acuarelas found</Message.Header>
          <p>Add some new acuarelas to get started.</p>
          <Link to={'/acuarelas/new'} className="ui button primary">Add New Acuarela</Link>
      </Message.Content>
    </Message>
  )

  let timeoutMessage;
  if (error.status === 401) {
    logoutUser();
    //TODO review other way to handle this
    cleanAcuarelas();
    return <Redirect to='login'/>
  }
  if (error.data || error.message) {
    timeoutMessage = (
      <Message icon negative>
        <Icon name='wait' />
        <Message.Content>
            <Message.Header>{error.data? error.data.message: error.message}</Message.Header>
        </Message.Content>
      </Message>
    );
  }

  const acuarelasList = (
    <Grid doubling columns={4}>
      {acuarelas.map((acuarela, index) => {
        return <Acuarela key={index} name={acuarela.name} author={acuarela.author} pathImage={acuarela.smallImage} rating={acuarela.rating}/>;
      })}
    </Grid>
  )

  return (
    <div>
      { loading && loadingMessage }
      { acuarelas.length === 0 && !loading  && !error && emptyMessage }
      { timeoutMessage }
      { acuarelas.length > 0 && acuarelasList }
    </div>
  )
}
