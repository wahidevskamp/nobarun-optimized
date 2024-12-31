import Card from '@component/Card';
import React from 'react';
import { StyledProductCard12 } from './CardStyle';

interface ProductCardProps {
  title: string;
}

const ProductCard12: React.FC<ProductCardProps> = (props) => {
  const { title, children } = props;
  return (
    <StyledProductCard12>
      <p className="mb-0">{title}</p>
      <Card
        px="1rem"
        py="1rem"
        // pt="1.3rem"
        style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      >
        {children}
      </Card>
    </StyledProductCard12>
  );
};

export default ProductCard12;
