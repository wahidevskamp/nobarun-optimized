import systemCss from '@styled-system/css';
import styled from 'styled-components';
import { color, ColorProps, compose, space, SpaceProps } from 'styled-system';

interface StyledNavLinkProps {
  isCurrentRoute?: boolean;
  className?: string;
  [key: string]: unknown;
}

const StyledNavLink = styled.a<StyledNavLinkProps & SpaceProps & ColorProps>(
  ({ isCurrentRoute, theme }) =>
    systemCss({
      position: 'relative',
      // Set a fallback color for non-current routes to avoid layout shift
      color: isCurrentRoute
        ? theme.colors.primary.main
        : theme.colors.text.main, // Default color if not current
      transition: 'all 150ms ease-in-out',
      '&:hover': {
        color: `${theme.colors.primary.main} !important`,
      },
      '& svg path': {
        // Apply a consistent fill color to prevent changes after page load
        fill: isCurrentRoute
          ? theme.colors.primary.main
          : theme.colors.text.main,
      },
      '& svg polyline, svg polygon': {
        color: isCurrentRoute
          ? theme.colors.primary.main
          : theme.colors.text.main,
      },
    }),
  compose(space, color),
);

export default StyledNavLink;
