import Input from '@src/components/Forms/Input'
import { useToast } from '@src/hooks/ToastProvider';
import { apiService } from '@src/Router';
import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState } from 'react'

const ProfileScreen: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentEmail, setCurrentEmail] = useState('');

    const [profile, setProfile] = useState({
        email: ''
    });

    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<string[]>([]);

    const getMe = () => {
        apiService.users.getMe().then((res) => {
            if (res.statusCode === 200) {
                setProfile({ email: res.email });
                setCurrentEmail(res.email as string);
            } else {
                showToast?.('error', 'Erreur', res.message)
            }
        }).catch((err) => {
            showToast?.('error', 'Erreur', err.message);
        });
    }

    useEffect(() => {
        getMe();
    }, [])

    const showToast = useToast();

    const handleChangeProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({
            ...profile,
            [event.target.name]: event.target.value
        })
    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword({
            ...password,
            [event.target.name]: event.target.value
        })
    }

    const handleEditPassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErrors([]);

        const newErrors = [];

        if (!password.currentPassword) {
            newErrors.push('current_password_empty');
        }

        if (!password.newPassword) {
            newErrors.push('new_password_empty');
        }

        if (!password.confirmPassword) {
            newErrors.push('new_password_confirm_empty');
        }

        if (password.newPassword !== password.confirmPassword) {
            newErrors.push('new_password_mismatch');
        }

        if (newErrors.length) {
            setErrors(newErrors);
            // showToast?.('error', 'Erreur', 'Impossible de mettre à jour le mot de passe, vérifiez les informations')
            return;
        }

        console.log('Password updated');
        apiService.users.UpdatePassword({ oldPassword: password.currentPassword, newPassword: password.newPassword }).then((res) => {
            if (res.statusCode === 200) {
                showToast?.('success', 'Mot de passe mis à jour', 'Votre mot de passe a été mis à jour avec succès')
            } else {
                showToast?.('error', 'Erreur', res.message);
            }
        }).catch((err) => {
            showToast?.('error', 'Erreur', err.message);
        })
    }

    const handleEditEmail = (event: React.FormEvent<HTMLFormElement>) => {
        event.stopPropagation();
        event.preventDefault();

        setErrors([]);

        const newErrors = [];

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!profile.email) {
            newErrors.push('email_empty');
        }

        if (profile.email && !emailRegex.test(profile.email)) {
            newErrors.push('email_invalid');
        }

        if (newErrors.length) {
            setErrors(newErrors);
            return;
        }

        if (profile.email === currentEmail) {
            showToast?.('info', 'Information', 'Aucune modification n\'a été apportée à l\'email actuel')

            setIsVisible(false);
            return;
        }

        apiService.users.UpdateEmail({ newEmail: profile.email }).then((res) => {
            if (res.statusCode === 200) {
                getMe();
                showToast?.('success', 'Succès', 'Votre email a été mis à jour')
            } else {
                showToast?.('error', 'Erreur', res.message)
            }
        }).catch((err) => {
            showToast?.('error', 'Erreur', err.message)
        })

        setIsVisible(false);
    }

    const handleOpenEmailDialog = () => {
        setCurrentEmail(profile.email);
        setIsVisible(true);
    }



    return (
        <div>
            <header className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold'>Mon profil</h1>
                <p className='text-gray-500'>Consultez et modifiez les informations de votre profil</p>
            </header>
            <div className='mt-8 flex gap-6 flex-col md:flex-row'>
                <div className='bg-white p-6 rounded-md shadow-md flex flex-col gap-4 w-full'>
                    <h2 className='text-lg font-semibold'>Mettre à jour votre adresse email</h2>
                    <p className='text-black text-lg font-bold'></p>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="email">Email</label>
                        <div className='flex items-center gap-2 relative'>
                            <Input name='email' value={currentEmail.length ? currentEmail : profile.email} type='email' disabled />
                            <button onClick={() => handleOpenEmailDialog()} type="button" className='bg-blue-500 text-white p-2 rounded-md rounded-l-none absolute right-0 px-4 hover:bg-blue-600 transition-colors'>Modifier</button>
                            <Dialog header="Mettre à jour votre adresse email" visible={isVisible} style={{ width: '50vw' }} onHide={() => { if (!isVisible) return; setIsVisible(false); }}>
                                <form onSubmit={(event) => handleEditEmail(event)} className='flex flex-col gap-4'>
                                    <Input placeholder='john.doe@gmail.com' name='email' value={profile.email} onChange={(event) => handleChangeProfile(event)} label='Email' type='email' error={errors.includes('email_empty') || errors.includes('email_invalid')} errorMessage={errors.includes('email_invalid') ? 'Le format de l\'email est invalide' : 'Veuillez entrer un email'} />

                                    <div className='flex gap-4'>
                                        <button onClick={() => setIsVisible(false)} type="button" className='bg-red-500 w-full text-white p-2 rounded-md hover:bg-red-600 transition-colors'>Annuler</button>
                                        <button type="submit" className='bg-blue-500 w-full text-white p-2 rounded-md hover:bg-blue-600 transition-colors'>Enregistrer</button>
                                    </div>
                                </form>
                            </Dialog>
                        </div>
                    </div>
                </div>
                <div className='bg-white p-6 rounded-md shadow-md flex flex-col gap-4 w-full'>
                    <h2 className='text-lg font-semibold'>Changer de mot de passe</h2>
                    <form className='h-full' onSubmit={(event) => handleEditPassword(event)}>
                        <div className='flex flex-col gap-4 h-full'>
                            <div className='flex flex-col gap-2'>
                                <Input name='currentPassword' value={password.currentPassword} onChange={(event) => handleChangePassword(event)} placeholder='****' label='Mot de passe actuel' type='password' error={errors.includes('current_password_empty')} errorMessage='Veuillez entrer un mot de passe' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Input name='newPassword' value={password.newPassword} onChange={(event) => handleChangePassword(event)} placeholder='****' label='Nouveau mot de passe' type='password' error={errors.includes('new_password_empty') || errors.includes('new_password_mismatch')} errorMessage={errors.includes('new_password_mismatch') ? '' : 'Veuillez entrer un mot de passe'} />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Input name='confirmPassword' value={password.confirmPassword} onChange={(event) => handleChangePassword(event)} placeholder='****' label='Confirmer le mot de passe' type='password' error={errors.includes('new_password_confirm_empty') || errors.includes('new_password_mismatch')} errorMessage={errors.includes('new_password_mismatch') ? 'Les mots de passe ne correspondent pas' : 'Veuillez entrer un mot de passe'} />
                            </div>
                            <button type="submit" className='bg-blue-500 mt-auto w-fit px-8 text-white p-2 rounded-md hover:bg-blue-600 transition-colors'>Enregistrer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen