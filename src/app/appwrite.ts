import { Client, Account, ID, OAuthProvider, Databases, Storage } from 'appwrite';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

type CreateUserAccount = {
    email: string,
    password: string,
    name: string,
}
type LoginUserAccount = {
    email: string,
    password: string,
}
type UpdateUserPassword = {
    phone: string,
    password: string,
}
type CreateDocument = {
    data: object,
}

const appwriteClient = new Client()

appwriteClient
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '669519590004b6369e2e');

export const account = new Account(appwriteClient)
export const databases = new Databases(appwriteClient)
export const storage = new Storage(appwriteClient);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '66951bb9001d5c90ec32'
const PLAN_ID = process.env.NEXT_PUBLIC_APPWRITE_PLAN_ID || '669670f90033fcd711e4'
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || '669a0ea7002f1eec3604'



export class AppwriteService {
    
    async createUserAccount({ email, password, name }: CreateUserAccount) {
        try {
            const userAccount = await account.create(ID.unique(), email, password, name)
            console.log(userAccount)
            if (userAccount) {
                return this.login({ email, password })
            } else {
                console.log(userAccount)
                return userAccount
            }
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async googleLogin() {
        try {
            const userAccount = await account.createOAuth2Session(
                OAuthProvider.Google,
                'http://localhost:3000/',
                'http://localhost:3000/error',
            );
            Cookies.set("user_loggedIn", "true")
            return userAccount
        } catch (error) {
            throw error
        }
    }

    async login({ email, password }: LoginUserAccount) {
        try {
            const response = await account.createEmailPasswordSession(email, password)
            if (response.$id) {
                Cookies.set("user_loggedIn", "true", { path: '/', sameSite: 'strict' })
                Cookies.set("user_id", response.userId , { path: '/', sameSite: 'strict' })
                Cookies.set("user_email", response.providerUid, { path: '/', sameSite: 'strict' })
              }
              return response
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async isLoggedIn(): Promise<boolean> {
        try {
            const data = await this.getCurrentUser();
            return Boolean(data)
        } catch (error) { 
        }
        return false
    }

    async getCurrentUser() {
        try {
            return account.get()
        } catch (error) {
        }

        return null
    }

    async updatePhonne({ phone, password }: UpdateUserPassword) {
        try {
            return account.updatePhone(phone, password)
        } catch (error) {
            console.log("getcurrentUser error: " + error)
        }

        return null
    }

    async logout() {
        try {
            return await account.deleteSession("current")
        } catch (error) {
            console.log("logout error: " + error)
        }
    }

    async createPlan(data: object) {
        try {
            const createDocument = await databases.createDocument(
                DATABASE_ID,
                PLAN_ID,
                ID.unique(),
                data
            );
            return (createDocument)
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async updatePlan(data: { id: string; payload: object; }) {
        try {
            const updateDocument = await databases.updateDocument(
                DATABASE_ID,
                PLAN_ID,
                data.id,
                data.payload
            );
            return (updateDocument)
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async deletePlan(data: string) {
        try {
            const deleteDocument = await databases.deleteDocument(
                DATABASE_ID,
                PLAN_ID,
                data
            );
            toast.success("Plan Deleted")
            return (deleteDocument)
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async listPlan() {
        try {
            const listDocument = await databases.listDocuments(
                DATABASE_ID,
                PLAN_ID,
            );
            return listDocument
        } catch (error: any) {     
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error         
        }
    }

    async uploadFile(file: any) {
        try {
            const uploadFile = await storage.createFile(
                BUCKET_ID,
                ID.unique(),
                file
            );
            console.log(uploadFile)
            return uploadFile
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

}


const appwriteService = new AppwriteService()

export default appwriteService