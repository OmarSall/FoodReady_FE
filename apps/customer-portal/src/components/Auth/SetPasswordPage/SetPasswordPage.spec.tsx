import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SetPasswordPage from './SetPasswordPage';
import * as authApi from '../../../api/authenticationApi';

vi.mock('../../../api/authenticationApi');

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderWithToken(token: string) {
  return render(
    <MemoryRouter initialEntries={[`/set-password?token=${token}`]}>
      <Routes>
        <Route path="/set-password" element={<SetPasswordPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('SetPasswordPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render password form when token is present', () => {
    renderWithToken('abc123');

    expect(
      screen.getByLabelText(/new password/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/confirm password/i),
    ).toBeInTheDocument();
  });

  it('should call setPassword API with correct token and password', async () => {
    const user = userEvent.setup();
    vi.spyOn(authApi, 'setPassword').mockResolvedValue(undefined);

    renderWithToken('abc123');

    await user.type(screen.getByLabelText(/new password/i), 'password123');
    await user.type(
      screen.getByLabelText(/confirm password/i),
      'password123',
    );
    await user.click(screen.getByRole('button', { name: /set password/i }));

    expect(authApi.setPassword).toHaveBeenCalledWith({
      token: 'abc123',
      password: 'password123',
    });
  });

  it('should redirect to /login after successful password set', async () => {
    const user = userEvent.setup();
    vi.spyOn(authApi, 'setPassword').mockResolvedValue(undefined);

    renderWithToken('abc123');

    await user.type(screen.getByLabelText(/new password/i), 'password123');
    await user.type(
      screen.getByLabelText(/confirm password/i),
      'password123',
    );
    await user.click(screen.getByRole('button', { name: /set password/i }));

    expect(mockNavigate).toHaveBeenCalledWith('/login', {
      state: { inviteSuccess: true },
      replace: true,
    });
  });

  it('should display error message when API returns error', async () => {
    const user = userEvent.setup();
    vi.spyOn(authApi, 'setPassword').mockRejectedValue(
      new Error('Invalid or expired token'),
    );

    renderWithToken('abc123');

    await user.type(screen.getByLabelText(/new password/i), 'password123');
    await user.type(
      screen.getByLabelText(/confirm password/i),
      'password123',
    );
    await user.click(screen.getByRole('button', { name: /set password/i }));

    expect(
      screen.getByText(/invalid or expired token/i),
    ).toBeInTheDocument();
  });
});