import { render, screen } from '@testing-library/react';
import { Badge } from './badge';

describe('Badge', () => {
  it('should render children', () => {
    render(<Badge>Test</Badge>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should apply default variant classes', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge.className).toContain('bg-surface-800');
  });

  it('should apply success variant', () => {
    render(<Badge variant="success">Success</Badge>);
    const badge = screen.getByText('Success');
    expect(badge.className).toContain('bg-emerald-500');
  });

  it('should apply size classes', () => {
    render(<Badge size="md">Large</Badge>);
    const badge = screen.getByText('Large');
    expect(badge.className).toContain('text-sm');
  });
});
