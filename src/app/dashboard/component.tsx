import * as React from 'react';
import { Card, CardTitle, CardBody, CardFooter, TextInput } from '@patternfly/react-core'; //import card


const ComponentCard = () => {
    // Apply custom styles for Card and CardTitle
    const cardStyles = {
        backgroundColor: '#f0f0f0', // A light grey color for the card background
      };
      
      const titleStyles = {
        backgroundColor: '#4a4a4a', // A dark grey color for the title background
        color: '#ffffff', // Optionally, changing the text color to white for better readability
        padding: '10px', // Add padding to make the title look better
      };

      const cardContainerStyle = {
        marginBottom: '8px', // Reduced margin for shorter space between cards
      };

      const modifiers = {
        isCompact: true,
        isFlat: true,
        isRounded: true
      };

        // Array of card data with custom properties for each card
  const cardData = [
    { title: 'CU', body: 'This is the first card.', footer: 'Footer 1', bgColor: '#d0d0d0', titleBgColor: '#6a6a6a' },
    { title: 'DU', body: 'This is the second card.', footer: 'Footer 2', bgColor: '#d0d0d0', titleBgColor: '#6a6a6a' },
    { title: 'RU', body: 'This is the third card.', footer: 'Footer 3', bgColor: '#d0d0d0', titleBgColor: '#6a6a6a' },
    { title: 'UE', body: 'This is the fourth card.', footer: 'Footer 4', bgColor: '#d0d0d0', titleBgColor: '#6a6a6a' }
  ];


    return (
        // <div>
        //           {Array.from({ length: 4 }).map((_, index) => (
        //             <><div key={index} style={cardContainerStyle}>
        //               <Card {...modifiers} style={cardStyles}>
        //                 <CardTitle style={titleStyles}>Title {index + 1}</CardTitle>
        //                 <CardBody>Body</CardBody>
        //                 <CardFooter>Footer</CardFooter>
        //               </Card>
        //             </div></>
        //           ))}
        //         </div>
        <div>
      {cardData.map((card, index) => (
        <div key={index} style={cardContainerStyle}>
          <Card isCompact isFlat isRounded style={{ backgroundColor: card.bgColor }}>
            <CardTitle style={{ backgroundColor: card.titleBgColor, color: '#ffffff', padding: '10px' }}>
              {card.title}
            </CardTitle>
            <CardBody>{card.body}</CardBody>
            <CardFooter>{card.footer}</CardFooter>
          </Card>
        </div>
      ))}
    </div>
    )
}

export default ComponentCard;
