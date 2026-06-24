import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MembershipDashboard from '../MembershipDashboard';
import { AuthProvider } from '../../contexts/AuthContext';
import { vi, describe, test, expect } from 'vitest';

vi.mock('../../services/membershipService', () => ({
  membershipService: {
    getActiveMembership: vi.fn(() => ({
      name: 'Signature Club',
      activatedAt: new Date().toISOString(),
      expiresAt: new Date(new Date().getTime() + 1000 * 3600 * 24 * 30).toISOString()
    })),
    syncActiveMembership: vi.fn(() => Promise.resolve({
      name: 'Signature Club'
    }))
  }
}));

vi.mock('../../services/paymentService', () => ({
  paymentService: {
    getTransactionHistory: vi.fn(() => [])
  }
}));

// Provide a mock for authService to satisfy AuthProvider
vi.mock('../../services/authService', () => ({
  authService: {
    isAuthenticated: vi.fn(() => true),
    getCurrentUser: vi.fn(() => ({ name: 'Test User', email: 'test@example.com' })),
    login: vi.fn(),
    logout: vi.fn()
  }
}));

describe('MembershipDashboard Concierge Actions', () => {
  const renderDashboard = () => {
    return render(
      <AuthProvider>
        <MemoryRouter>
          <MembershipDashboard />
        </MemoryRouter>
      </AuthProvider>
    );
  };

  test('renders the Concierge section', () => {
    renderDashboard();
    // Use findByText or wait for state updates if needed, but synchronous getByText should work here since the mock returns immediately
    expect(screen.getByText('Concierge')).toBeInTheDocument();
  });

  test('Book a Treatment link navigates correctly', async () => {
    renderDashboard();
    const link = await screen.findByRole('link', { name: /Book a Treatment/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/appointments');
  });

  test('Manage Profile link navigates correctly', async () => {
    renderDashboard();
    const link = await screen.findByRole('link', { name: /Manage Profile/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/profile');
  });

  test('Contact Support link navigates correctly', async () => {
    renderDashboard();
    const link = await screen.findByRole('link', { name: /Contact Support/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/support');
  });
});
