import React, { useState } from 'react'
import Logo from '@src/assets/images/logo.webp';
import '../../components/Sidebar/sidebar.css';
import { useToast } from '@src/hooks/ToastProvider';
import { apiService } from '@src/Router';
import routes from '@src/routes';
import { Link, useNavigate } from 'react-router-dom';

interface IData {
  email: string;
  password: string;
}

const SignInScreen: React.FC<{ setIsLogged: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setIsLogged }) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [data, setData] = useState<IData>({
    email: '',
    password: '',
  });

  const showToast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors([]);
    const newErrors: string[] = [];

    if (!data.email) {
      newErrors.push('email');
    }

    if (!data.password) {
      newErrors.push('password');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      showToast?.('error', 'Erreur', 'Veuillez vérifier les champs du formulaire');
      return;
    }

    apiService.users.SignIn(data).then((res) => {
      if (res.statusCode === 200) {
        sessionStorage.setItem('access_token', res.user.accessToken);
        apiService.updateAccessToken(apiService.getAccessToken() as string);
        setIsLogged(true);
        navigate(routes.DASHBOARD);
      } else {
        showToast?.('error', 'Erreur', "L'email et/ou le mot de passe est incorrect");
      }
    }).catch((err) => {
      showToast?.('error', 'Erreur', err.message || 'Une erreur est survenue');
    });
  }

  return (
    <div className='min-h-screen flex flex-col items-center gap-4 justify-center'>
      <div className='flex flex-col gap-4 w-full max-w-md'>
        <img src={Logo} alt="Logo" className='w-[100px] h-auto mx-auto png-logo' />
        <h1 className='text-2xl font-bold text-white text-center'>Connexion</h1>
        <p className='text-gray-500 text-center'>Connectez-vous à votre espace d'administration</p>

        <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-2'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='text-white'>Email</label>
            <input value={data.email} onChange={(e) => setData({ ...data, email: e.currentTarget.value })} type="email" name='email' placeholder='john.doe@example.com' className={`bg-gray-200 p-2 rounded-md w-full ${errors.includes('email') && 'border border-red-500'}`} />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="password" className='text-white'>Mot de passe</label>
            <input value={data.password} onChange={(e) => setData({ ...data, password: e.currentTarget.value })} type="password" name='password' placeholder='Mot de passe' className={`bg-gray-200 p-2 rounded-md w-full ${errors.includes('password') && 'border border-red-500'}`} />
          </div>

          <button type='submit' style={{ background: 'transparent', border: '1px solid rgba(204, 21, 204, 0.7)' }} className='text-white text-md w-fit font-bold py-2 px-8 mx-auto rounded-md mt-4 hover:!bg-[#cc15cccc] transition-all duration-300'>Se connecter</button>
        </form>
        <p className='text-white text-center'>Vous n'avez pas encore de compte ?</p>
        <Link to={routes.SIGNUP} style={{ background: 'transparent', border: '1px solid rgba(204, 21, 204, 0.7)' }} className='text-white text-md w-fit font-bold py-2 px-8 mx-auto rounded-md hover:!bg-[#cc15cccc] transition-all duration-300'>Inscrivez-vous</Link>

      </div>
    </div>
  )
}

export default SignInScreen