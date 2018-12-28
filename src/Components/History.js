import React from "react";
import { Container, Image, Divider } from 'semantic-ui-react';


const HistoryComponent = () => {
  return (
    <div>
      <Divider />
      <Container textAlign='justified'>
        <Image src="/images/pic1.jpg" 
          label={{ as: 'a', color: 'black', content: 'Thomas Girtin', icon: 'hotel', ribbon: true }}
          size='small' floated='left'
        />
        <p>
          Thomas Girtin, Abadía Jedburgh desde el río, acuarela sobre papel, 1798-1799.

          John Constable Iglesia de Tillington, acuarela, 1834.
          La pintura a la acuarela empezó con la invención del papel en China poco después de 100 a. C. En el siglo XII los árabes introdujeron la fabricación del papel en España y la tecnología se extendió a Italia décadas más tarde. Algunos de los más antiguos fabricantes de papel incluyen a Fabriano (en Italia), abierto en 1276, y Arches (en Francia), abierto en 1492.

          El antecesor de la acuarela en Europa fue el fresco —pintura mural usando pigmentos en un medio acuoso sobre yeso húmedo—. Un buen ejemplo de fresco es la Capilla Sixtina, iniciado en 1508 y completado en 1514.

          El primer uso conocido de la acuarela en Europa es por el pintor renacentista italiano Rafael Sanzio (1483-1520), quien pintaba en grandes cartulinas como bocetos de tapices.

          En Alemania, Alberto Durero (1471-1528) pintó acuarelas en el siglo XV. La primera escuela de acuarela en Europa fue liderada por Hans Bol (1534-1593), influida por las creaciones de Durero.

          Otros famosos artistas usaron la acuarela para completar su obra al óleo, incluyendo a Van Dyck (1599-1641), Thomas Gainsborough (1727-1788), y John Constable (1776-1837).
        </p>
        <Image src="/images/pic7.jpg" size='small' floated='right' 
          label={{ as: 'a', color: 'black', content: 'Thomas Girtin', icon: 'hotel', ribbon: true }}
        />
        <p>
          En la Gran Bretaña del siglo XVIII, Paul Sandby (1725-1809) fue llamado padre de la acuarela británica.

          Uno de los acuarelistas más famosos es Joseph Mallord William Turner (1775-1850), precursor de las técnicas que posteriormente desarrollarían las vanguardias. Sus cuadros reflejan magníficamente la luz y el movimiento.

          En la pintura española del siglo XX cabe destacar en acuarela al maestro Julio Quesada Guilabert (1918-2009). Sin olvidar a Ceferino Olivé (1907-1995) y sus discípulos Pere Calderó Ripoll (1916-2009), Francisco Torné Gavaldà (1917-2008) y Rafael Alonso López-Montero (1921-2009), de quien se ha escrito:

          Rafael sigue despertando admiración sincera con su dominio de la figura, su acierto en la temática y su concepción del color. En la proporción, el encuadre, la perspectiva, la consecución de los primeros términos y de los fondos lejanos, Rafael Alonso es un maestro desenfadado. Y ha llegado a esa cima a través del trabajo ilusionado cada día. Ya hace tiempo que Rafael Alonso figura entre los más destacados acuarelistas españoles. Sólo hay que contemplar esta espléndida selección de su variada obra para comprenderlo.

          Agustín Romo. Revista Correo del Arte. 19892​
          Otro pintor que usó la técnica de la acuarela fue Alfons walde.

          En Canarias, es significativa la práctica de esta técnica pictórica que tiene y ha tenido un gran arraigo y desarrollo, destacando, entre otros artistas, Francisco Bonnín Guerín, José Comas Quesada o Alberto Manrique.
        </p>
      </Container>
    </div>
  );
}

export default HistoryComponent;
