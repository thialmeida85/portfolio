import { trpc } from '@/lib/trpc';

export function useAuth() {
  const { data: user, isLoading } = trpc.auth.me.useQuery();
  const logoutMutation = trpc.auth.logout.useMutation();

  const logout = async () => {
    await logoutMutation.mutateAsync();
    window.location.href = '/';
  };

  const getLoginUrl = () => {
    const baseUrl = import.meta.env.VITE_OAUTH_PORTAL_URL || 'https://oauth.manus.im';
    const appId = import.meta.env.VITE_APP_ID;
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    return `${baseUrl}/oauth/authorize?app_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  };

  return {
    user,
    isLoading,
    logout,
    getLoginUrl,
  };
}
