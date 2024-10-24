import React, { useState } from 'react'
import Logo from '@assets/images/logo.webp';
import '../../components/Sidebar/sidebar.css';
import { useToast } from '@src/hooks/ToastProvider';
import { apiService } from '@src/Router';
import routes from '@src/routes';
import { Link, useNavigate } from 'react-router-dom';

interface IData {
    email: string;
    password: string;
    confirmPassword: string;
    secret: string;
}

const SignUpScreen: React.FC = () => {
    const [errors, setErrors] = useState<string[]>([]);
    const [data, setData] = useState<IData>({
        email: '',
        password: '',
        confirmPassword: '',
        secret: '',
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

        if (data.password !== data.confirmPassword) {
            newErrors.push('passwordConfirm');
        }

        if (!data.secret) {
            newErrors.push('secret');
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            showToast?.('error', 'Erreur', 'Veuillez vérifier les champs du formulaire');
            return;
        }

        apiService.users.SignUp(data).then((res) => {
            if (res.statusCode === 201) {
                navigate(routes.SIGNIN);
                showToast?.('success', 'Succès', 'Vous êtes désormais inscrit');
            } else {
                showToast?.('error', 'Erreur', res.message);
            }
        }).catch((err) => {
            showToast?.('error', 'Erreur', err.message || 'Une erreur est survenue');
        })
    }

    return (
        <div className='min-h-screen flex flex-col items-center justify-center'>
            <div className='flex flex-col gap-4 w-full max-w-md'>
                <img src={Logo} alt="Logo" className='w-[100px] h-auto mx-auto png-logo' />
                <h1 className='text-2xl font-bold text-white text-center'>Inscription</h1>
                <p className='text-gray-500 text-center'>Inscrivez-vous pour accéder à votre d'administration</p>

                <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email" className='text-white'>Email</label>
                        <input value={data.email} onChange={(e) => setData({ ...data, email: e.currentTarget.value })} type="email" name='email' placeholder='john.doe@example.com' className={`bg-gray-200 p-2 rounded-md w-full ${errors.includes('email') && 'border border-red-500'}`} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="password" className='text-white'>Mot de passe</label>
                        <input value={data.password} onChange={(e) => setData({ ...data, password: e.currentTarget.value })} type="password" name='password' placeholder='Mot de passe' className={`bg-gray-200 p-2 rounded-md w-full ${errors.includes('password') && 'border border-red-500'}`} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="confirmPassword" className='text-white'>Confirmer le mot de passe</label>
                        <input value={data.confirmPassword} onChange={(e) => setData({ ...data, confirmPassword: e.currentTarget.value })} type="password" name='confirmPassword' placeholder='Confirmer le mot de passe' className={`bg-gray-200 p-2 rounded-md w-full ${errors.includes('passwordConfirm') && 'border border-red-500'}`} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-white' htmlFor="secret">Code secret</label>
                        <input value={data.secret} onChange={(e) => setData({ ...data, secret: e.currentTarget.value })} type="password" name='secret' placeholder='Code secret' className={`bg-gray-200 p-2 rounded-md w-full ${errors.includes('secret') && 'border border-red-500'}`} />
                    </div>

                    <button type='submit' style={{ background: 'transparent', border: '1px solid rgba(204, 21, 204, 0.7)' }} className='text-white text-md w-fit font-bold py-2 px-8 mx-auto rounded-md mt-4 hover:!bg-[#cc15cccc] transition-all duration-300'>S'inscrire</button>
                </form>
                <p className='text-white text-center'>Vous avez déjà un compte ?</p>
                <Link to={routes.SIGNIN} style={{ background: 'transparent', border: '1px solid rgba(204, 21, 204, 0.7)' }} className='text-white text-md w-fit font-bold py-2 px-8 mx-auto rounded-md hover:!bg-[#cc15cccc] transition-all duration-300'>Connectez-vous</Link>

            </div>
        </div>
    )
}

export default SignUpScreen