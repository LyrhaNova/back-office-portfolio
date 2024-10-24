export class ApiService {
    constructor(private accessToken: string | null, private baseUrl: string) {
        this.accessToken = accessToken || '';
        this.baseUrl = baseUrl || 'http://localhost:3030/api';
    }

    getAccessToken() {
        return this.accessToken;
    }

    updateAccessToken(accessToken: string) {
        this.accessToken = accessToken;
    }

    async get(url: string) {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            },
        });

        const responseJson = await response.json();

        responseJson.statusCode = response.status;

        if ([401, 403].includes(responseJson.statusCode)) {
            this.accessToken = '';
            sessionStorage.removeItem('access_token');
            window.location.reload();
            return false;
        }

        return responseJson;
    }

    async post(url: string, data: any, isFormData: boolean = false) {
        const headers: any = {
            Authorization: `Bearer ${this.accessToken}`,
        }

        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'POST',
            headers: headers,
            body: isFormData ? data : JSON.stringify(data),
        });

        const responseJson = await response.json();
        
        responseJson.statusCode = response.status;

        if ([401, 403].includes(response.status)) {
            this.accessToken = '';
            sessionStorage.removeItem('access_token');
            window.location.reload();
            return false;
        }

        return responseJson;
    }

    async patch(url: string, data: any, isFormData: boolean = false) {
        const headers: any = {
            Authorization: `Bearer ${this.accessToken}`,
        }

        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'PATCH',
            headers: headers,
            body: isFormData ? data : JSON.stringify(data),
        });

        const responseJson = await response.json();

        responseJson.statusCode = response.status;
        
        if ([401, 403].includes(responseJson.statusCode)) {
            this.accessToken = '';
            sessionStorage.removeItem('access_token');
            window.location.reload();
            return false;
        }

        return responseJson;
    }

    async delete(url: string) {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'DELETE',
            headers: {

                Authorization: `Bearer ${this.accessToken}`,
            },
        });

        const responseJson = await response.json();

        responseJson.statusCode = response.status;
        
        if ([401, 403].includes(responseJson.statusCode)) {
            this.accessToken = '';
            sessionStorage.removeItem('access_token');
            window.location.reload();
            return false;
        }

        return responseJson;
    }

    users = {
        SignUp: async (data: any) => {
            return this.post('/users/signup', data);
        },
        SignIn: async (data: any) => {
            return this.post('/users/signin', data);
        },
        UpdateEmail: async (data: any) => {
            return this.patch('/users/update-email', data);
        },
        UpdatePassword: async (data: any) => {
            return this.patch('/users/update-password', data);
        },
        getMe: async () => {
            return this.get('/users/getMe');
        }
    };

    projects = {
        GetProjects: async () => {
            return this.get(`/projects`);
        },
        
        GetProject: async (id: string) => {
            return this.get(`/projects/${id}`);
        },

        CreateProject: async (data: any) => {
            return this.post('/projects', data);
        },
        UpdateProject: async (id: string, data: any) => {
            return this.patch(`/projects/${id}`, data);
        },
        DeleteProject: async (id: string) => {
            return this.delete(`/projects/${id}`);
        }
    }
}