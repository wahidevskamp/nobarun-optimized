import FlexBox from '@component/FlexBox';
import ProductCard12 from '@component/product-cards/HeadlineCard';
import Typography from '@component/Typography';

const Ammenities = ({ contact }) => {
  return (
    <ProductCard12 title="Office Amenities">
      <ul>
        {contact &&
          contact.amenities &&
          contact.amenities.map((amenity) => (
            <li className="mb-10" key={amenity.title}>
              <FlexBox alignItems="center">
                <img
                  src={process.env.NEXT_PUBLIC_IMAGE_URL + amenity.image}
                  alt={`icon for ${amenity.title} of Nobarun`}
                  style={{ height: '4rem', width: '4rem' }}
                />
                <Typography letterSpacing="1px" ml="1.5rem" fontSize="22px">
                  {amenity.title}
                </Typography>
              </FlexBox>
            </li>
          ))}
      </ul>
    </ProductCard12>
  );
};

export default Ammenities;
