import { Grid, Image, Rating, Header } from 'semantic-ui-react';
import React from 'react';

import './Acuarela.css';

export default function Acuarela({name, author, pathImage, rating}){
  return (
    <Grid.Column>
        <Image src={pathImage} size='medium' />
        <Header size='medium' className="picture-name">{name}</Header>
        <div className="picture-author">{author}</div>
        <Grid.Row>
          <Rating icon='star' defaultRating={3} maxRating={4} />&nbsp;({rating})
        </Grid.Row>
      </Grid.Column>
  );
}
