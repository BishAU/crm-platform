import React from 'react';
import { render, screen } from '@testing-library/react';
import { sidebarConfig } from '../app/components/sidebarConfig';

describe('SidebarConfig', () => {
  it('should render the sidebar config', () => {
    render(<>{JSON.stringify(sidebarConfig)}</>);
    expect(screen.getByText(/"name":"Dashboard"/)).toBeInTheDocument();
  });
});