import Icon from '@component/icon/Icon';
import useWindowSize from '@hook/useWindowSize';
import Link from 'next/link';
import React, { forwardRef, useEffect, useState } from 'react';
import CategoryMenuItem from './category-menu-item/CategoryMenuItem';
import { StyledCategoryMenuItem } from './category-menu-item/CategoryMenuItemStyle';
import { StyledCategoryDropdown } from './CategoryDropdownStyle';
import MegaMenu from './mega-menu/MegaMenu2';

export interface CategoryDropdownProps {
  open: boolean;
  position?: 'absolute' | 'relative';
  menu?: any;
  ref?: any;
  noOfCategory?: number;
  categories?: any[];
  CONTAINER?: number;
}

const MENU = 45;

const CategoryDropdown: React.FC<CategoryDropdownProps> = forwardRef(
  ({ open, position, categories }, ref) => {
    const [slice, setSlice] = useState(0);
    const [showLoadMore, setShowLoadMore] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const width = useWindowSize();

    let CONTAINER;
    if (width > 1700) {
      CONTAINER = 490;
    }
    if (width <= 1700) {
      CONTAINER = 450;
    }
    if (width <= 1300) {
      CONTAINER = 390;
    }
    if (width <= 1025) {
      CONTAINER = 320;
    }

    if (width <= 990) {
      CONTAINER = 230;
    }

    useEffect(() => {
      const menuHeight = categories?.length * 45;
      const height = CONTAINER;
      // console.log({
      //   length: categories?.length,
      //   width,
      //   CONTAINER,
      //   menuHeight,
      //   height,
      // });
      if (menuHeight > height) {
        const noOfMenu = Math.floor(height / MENU);
        setSlice(noOfMenu);
        setShowLoadMore(true);
      } else {
        setSlice(categories?.length);
        setShowLoadMore(false);
      }
    }, [width]);

    let items = [];
    items =
      categories?.length > 0 &&
      categories
        // .concat(categories)
        .slice(0, slice)
        .map((item, index) => (
          <CategoryMenuItem
            title={item.name}
            href={`/category/${item.slug}`}
            icon={item.icon}
            caret={item.children}
            key={index + 1}
          >
            <MegaMenu data={item.children || {}} />
          </CategoryMenuItem>
        ));
    return (
      <StyledCategoryDropdown open={open} position={position} ref={ref}>
        {items}
        {showLoadMore && (
          <StyledCategoryMenuItem>
            <Link href="#">
              <div
                className="category-dropdown-link"
                onClick={(e) => {
                  e.preventDefault();
                  if (showAll) {
                    const height = CONTAINER;
                    const noOfMenu = Math.floor(height / MENU);
                    setSlice(noOfMenu);
                    setShowAll(false);
                  } else {
                    setSlice(categories.length);
                    setShowAll(true);
                  }
                }}
              >
                <Icon size="20px" ml=".2rem" mr="1rem">
                  {showAll ? 'double-up' : 'double-down'}
                </Icon>
                <span className="title">
                  {showAll ? 'Show Less Categories' : 'Load All Categories'}
                </span>
              </div>
            </Link>
          </StyledCategoryMenuItem>
        )}
      </StyledCategoryDropdown>
    );
  },
);

CategoryDropdown.defaultProps = {
  position: 'absolute',
};

export default CategoryDropdown;
