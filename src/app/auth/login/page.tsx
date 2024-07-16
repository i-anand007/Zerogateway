import AuthWrapper from '@/app/shared/auth-layout/auth-wrapper';
import SignInForm from './login-form';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Login'),
};

export default function SignInPage() {
  return (
    <AuthWrapper
      title={
        <>
          Welcome Back! <br /> Sign in with your credentials.
        </>
      }
      isSignIn
      isSocialLoginActive={true}
    >
      <SignInForm />
    </AuthWrapper>
  );
}
