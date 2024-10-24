import React, { useEffect, useState } from 'react'
// @ts-ignore
import { projects } from '../../../data/projects';
// @ts-ignore
import { IProject } from '../../../data/projects';
import { Link, useNavigate } from 'react-router-dom';
import routes from '@src/routes';
import { useToast } from '@src/hooks/ToastProvider';
import { Dialog } from 'primereact/dialog';
import { apiService } from '@src/Router';

const ProjectCard: React.FC<{ project: Partial<IProject>, getProjects: () => void }> = ({ project: { id, title, imageUrl }, getProjects }) => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    const showToast = useToast();

    const handleEditNavigate = () => {
        if (!id) return showToast?.('error', 'Erreur', 'Impossible d\'éditer le projet');

        const url = routes.PROJECTS.EDIT.replace(':id', id.toString());
        navigate(url);
    }



    const handleDelete = () => {
        if (!id) return showToast?.('error', 'Erreur', 'Impossible de supprimer le projet');

        apiService.projects.DeleteProject(id).then((res) => {
            if (res.statusCode === 200) {
                getProjects();
                showToast?.('success', 'Succès', 'Le projet a été supprimé avec succès');
            } else {
                showToast?.('error', 'Erreur', res.message);
            }
        }).catch((err) => {
            showToast?.('error', 'Erreur', err.message);
        })
    }

    return (
        <div className='bg-slate-300 p-6 rounded-md shadow-md flex flex-col gap-4'>
            <img src={imageUrl} alt={title} className='w-full rounded-md max-h-32 object-cover' />
            <h2 className='text-lg font-semibold'>{title}</h2>
            <div className='flex flex-col gap-2 mt-auto'>
                <button onClick={() => handleEditNavigate()} type="button" className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors'>Éditer le projet</button>
                <button onClick={() => setVisible(true)} type="button" className='bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors'>Supprimer le projet</button>
                <Dialog
                    visible={visible}
                    modal
                    onHide={() => { if (!visible) return; setVisible(false); }}
                    content={({ hide }) => (
                        <div className="flex flex-col px-8 py-5 gap-4 bg-white rounded-md shadow-md">
                            <i className='pi pi-exclamation-triangle text-4xl text-red-500 my-2 mx-auto'></i>
                            <p className="text-gray-500">Êtes-vous sûr de vouloir supprimer ce projet ?</p>
                            <div className="flex gap-4">
                                <button onClick={(e) => hide(e)} type="button" className='bg-blue-500 w-full text-white p-2 rounded-md hover:bg-blue-600 transition-colors'>Annuler</button>
                                <button onClick={(e) => { handleDelete(); hide(e) }} type="button" className='bg-red-500 w-full text-white p-2 rounded-md hover:bg-red-600 transition-colors'>Supprimer</button>
                            </div>
                        </div>
                    )}
                ></Dialog>
            </div>
        </div>
    );
}


const ProjectsList: React.FC = () => {

    const [projects, setProjects] = useState<IProject[]>([]);

    const showToast = useToast();

    const getProjects = () => {
        apiService.projects.GetProjects().then((res) => {
            console.log(res)
            if (res.statusCode === 200) {
                const projects = res.map((project: any) => ({ ...project, id: project._id }));
                setProjects(projects);
            } else {
                showToast?.('error', 'Erreur', res.message);
            }
        }).catch((err) => {
            showToast?.('error', 'Erreur', err.message);
        })
    }

    useEffect(() => {
        getProjects();
    }, []);


    if (!projects) {
        return <p className='text-center text-gray-500'>Chargement...</p>
    }

    return (
        <div>
            <header className='flex flex-col md:flex-row gap-2 md:justify-between items-start'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-bold'>Projets</h1>
                    <p className='text-gray-500'>Consultez et modifiez les informations de vos projets</p>
                </div>

                <Link to={routes.PROJECTS.ADD} type="button" className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors'>Ajouter un projet</Link>
            </header>

            <div className='mt-8 flex gap-6 flex-col md:flex-row'>
                <div className='bg-white p-6 rounded-md shadow-md flex flex-col gap-4 w-full'>
                    <h2 className='text-lg font-semibold'>Liste des projets</h2>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {projects.length ? projects.map((project: IProject, index: number) => (
                            <ProjectCard key={index} project={project} getProjects={getProjects} />  
                        )) : <p className='text-center text-gray-500'>Aucun projet trouvé</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectsList