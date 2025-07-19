import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const BookOpenIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className ?? 'h-6 w-6'}
    {...props}
  >
    <path d="M12 4c-1.1 0-2 .9-2 2v13c0-1.1-.9-2-2-2H4V6c0-1.1.9-2 2-2h6Zm0 0c1.1 0 2 .9 2 2v13c0-1.1.9-2 2-2h4V6c0-1.1-.9-2-2-2h-6Z"/>
  </svg>
);

export const WrenchScrewdriverIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className ?? 'h-6 w-6'}
    {...props}
  >
    <path d="M7.7 3 3 7.7l3.6 3.6 4.7-4.7L7.7 3Zm6.6 5.4-4.7 4.7 6 6 4.7-4.7-6-6Zm4.8-4.8-3.9 3.9 2.4 2.4 3.9-3.9-2.4-2.4Z"/>
  </svg>
);

export const GoogleDriveIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className ?? 'h-6 w-6'}
    {...props}
  >
    <path d="M12.4 3 3 19h6.6L19 3h-6.6Zm-7.4 8L3 19h9l3-5H5Zm11.5 0-3 5 3 5h6l-6-10Z"/>
  </svg>
);

export const SpinnerIcon: React.FC<IconProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    className={className ?? 'h-5 w-5 animate-spin'}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
    <path d="M22 12a10 10 0 0 1-10 10" strokeOpacity="0.75" />
  </svg>
);

export default {
  BookOpenIcon,
  WrenchScrewdriverIcon,
  GoogleDriveIcon,
  SpinnerIcon,
};
