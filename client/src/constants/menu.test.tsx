import React from 'react';
import { render, screen } from '@testing-library/react';
import { useMenuItems } from './menu';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) =>
      ({
        'menu.aboutUs': 'About us',
        'menu.products': 'Products',
      }[key] || key),
  }),
}));

const MenuProbe = () => {
  const items = useMenuItems();
  return (
    <ul>
      {items.map((item) => (
        <li key={item.url}>{item.title}</li>
      ))}
    </ul>
  );
};

describe('useMenuItems', () => {
  it('returns translated menu labels', () => {
    render(<MenuProbe />);
    expect(screen.getByText('About us')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
  });
});
