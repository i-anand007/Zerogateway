import AuthWrapper from '@/app/shared/auth-layout/auth-wrapper';
import RegisterForm from './register-form';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Register'),
};

export default function SignUpPage() {
  return (
    <AuthWrapper
      title="Join us today! Get special benefits and stay up-to-date."
      isSocialLoginActive={true}
    >
      <RegisterForm />
    </AuthWrapper>
  );
}
