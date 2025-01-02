import Link from 'next/link';
import React from 'react';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import imageLoader from '@component/ImageLoader';
import Image from 'next/image';
import Icon from '../../icon/Icon';
import { StyledCategoryMenuItem } from './CategoryMenuItemStyle';

interface CategoryMenuItemProps {
  href: string;
  icon?: string;
  title: string;
  caret?: any[];
}

const CategoryMenuItem: React.FC<CategoryMenuItemProps> = ({
  href,
  icon,
  title,
  caret,
  children,
}) => {
  return (
    <StyledCategoryMenuItem>
      <Link href={href}>
        <a>
          <div className="category-dropdown-link">
            {icon && (
              <Image
                loader={imageLoader}
                src={icon}
                alt={`Icon for ${title} category`}
                width={30}
                height={30}
                quality={90}
                className="object-fit-cover"
              />

              // <img
              //   src={process.env.NEXT_PUBLIC_IMAGE_URL + icon}
              //   alt={`Icon for ${title} category`}
              //   width="30px"
              //   height="30px"
              //   className="object-fit-cover lazyload"
              // />
            )}
            <span className="title">{title}</span>
            {caret.length > 0 && <Icon variant="small">chevron-right</Icon>}
          </div>
        </a>
      </Link>
      {children}
    </StyledCategoryMenuItem>
  );
};

CategoryMenuItem.defaultProps = {
  caret: [],
};

export default CategoryMenuItem;
