import routes from '@src/routes';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IProject } from '@src/data/projects';
import { useToast } from '@src/hooks/ToastProvider';
import { apiService } from '@src/Router';

const ProjectsEdit: React.FC = () => {
    const [project, setProject] = useState<IProject>();
    const [projects, setProjects] = useState<IProject[]>([]);
    const [projectToEdit, setProjectToEdit] = useState<IProject>();

    const [errors, setErrors] = useState<string[]>([]);

    const { id } = useParams();

    const showToast = useToast();

    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            navigate(routes.PROJECTS.LIST);
        }
    }, []);

    const fetchProject = (id: string): Promise<IProject | null> => {
        return apiService.projects.GetProject(id).then((res) => {
            console.log("status", res.statusCode)
            if (res.statusCode === 200) {
                if (Object.keys(res).length > 0) {
                    res.id = res._id
                    console.log("Project", res);
                    return res as IProject;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }).catch(() => {
            return null;
        }) as Promise<IProject | null>;
    }

    useEffect(() => {
        if (!id) {
            navigate(routes.PROJECTS.LIST);
            return;
        }

        fetchProject(id).then((project: IProject | null) => {
            if (!project) {
                showToast?.('error', 'Erreur', 'Impossible de trouver le projet')
                navigate(routes.PROJECTS.LIST)
                return;
            }

            setProject(project)
            setProjectToEdit(project);
            console.log(project);
        });
    }, [id]);

    if (!project || !projectToEdit) return <>Loading...</>;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErrors([]);
        const newErrors = [];

        if (!projectToEdit.title) {
            newErrors.push('title');
        }

        if (!projectToEdit.description) {
            newErrors.push('description');
        }

        if (!projectToEdit.largeDescription) {
            newErrors.push('largeDescription');
        }

        if (!projectToEdit.imageUrl) {
            newErrors.push('image')
        }

        if (!projectToEdit.techs) {
            newErrors.push('techs')
        }

        if (newErrors.length) {
            setErrors(newErrors);
            showToast?.('error', 'Erreur', 'Veuillez vérifier les champs du formulaire')
            return;
        }

        apiService.projects.UpdateProject(projectToEdit.id, projectToEdit).then((res) => {
            if (res.statusCode === 200) {
                showToast?.('success', 'Succès', 'Votre projet a été mis à jour avec succès');
                navigate(routes.PROJECTS.LIST);
            } else {
                showToast?.('error', 'Erreur', res.message);
            }
        }).catch((err) => {
            showToast?.('error', 'Erreur', err.message);
        })
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            setProjectToEdit({ ...project, imageUrl: e.target?.result as string });
        }
        reader.readAsDataURL(file);
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <header className='flex flex-col md:flex-row gap-2 md:justify-between items-start'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                            <Link to={routes.PROJECTS.LIST} className='bg-none border-none cursor-pointer'><i className='pi pi-arrow-left text-md'></i></Link>
                            <h1 className='text-2xl font-bold'>Édition projet : {project?.title}</h1>
                        </div>
                        <p className='text-gray-500'>Édition du projet sélectionné</p>
                    </div>

                    <button type="submit" className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors'>Enregistrer</button>
                </header>

                <div className='mt-8 flex gap-6 flex-col md:flex-row'>
                    <div className='bg-white p-6 rounded-md shadow-md flex flex-col gap-4 w-full'>
                        <h2 className='text-lg font-semibold'>Informations générales</h2>
                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold' htmlFor="title">Titre</label>
                            <input type="text" name='title' value={projectToEdit.title} onChange={(event) => setProjectToEdit({ ...project, title: event.target.value })} placeholder='Titre du projet' className={`outline-none bg-gray-200 p-2 rounded-md w-full ${errors.includes('title') && 'border border-red-500'}`} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold' htmlFor="description">Description</label>
                            <textarea name='description' value={projectToEdit.description} onChange={(event) => setProjectToEdit({ ...project, description: event.target.value })} placeholder='Description du projet' className={`outline-none bg-gray-200 p-2 rounded-md w-full ${errors.includes('description') && 'border border-red-500'} h-32`} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold' htmlFor="largeDescription">Description longue</label>
                            <textarea name='largeDescription' value={projectToEdit.largeDescription} onChange={(event) => setProjectToEdit({ ...project, largeDescription: event.target.value })} placeholder='Description longue du projet' className={`outline-none bg-gray-200 p-2 rounded-md w-full ${errors.includes('largeDescription') && 'border border-red-500'} h-32`} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold' htmlFor="techs">Technologies</label>
                            <input type="text" name='techs' value={projectToEdit.techs} onChange={(event) => setProjectToEdit({ ...project, techs: event.target.value })} placeholder='Technologies du projet' className={`outline-none bg-gray-200 p-2 rounded-md w-full ${errors.includes('techs') && 'border border-red-500'}`} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold' htmlFor="github">Github</label>
                            <input type="text" name='github' value={projectToEdit.github} onChange={(event) => setProjectToEdit({ ...project, github: event.target.value })} placeholder='Github du projet' className={`outline-none bg-gray-200 p-2 rounded-md w-full`} />
                        </div>
                    </div>
                    <div className='bg-white p-6 rounded-md shadow-md flex flex-col gap-4 w-full'>
                        <h2 className='text-lg font-semibold'>Image de présentation</h2>
                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold' htmlFor="imageUrl">Image</label>
                            {/* image preview, lors du clique dessus on peut modifier l'image */}
                            <div className={`flex items-center gap-2 relative min-h-24 ${errors.includes('image') && 'border border-red-500 rounded-md'}`}>
                                <img src={projectToEdit.imageUrl} alt={project.title || "Image à renseigner"} className='w-full rounded-md object-cover' />
                                <p className='text-white font-bold text-lg p-2 rounded-md absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-colors w-full h-full flex items-center justify-center bg-black bg-opacity-25'>Tapez pour modifier</p>
                                <input onChange={(e) => handleImageChange(e)} type='file' name='imageUrl' className='bg-gray-100 cursor-pointer p-2 rounded-md w-full absolute top-0 left-0 opacity-0 h-full' />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProjectsEdit