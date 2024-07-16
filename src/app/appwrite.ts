import { Client, Account, ID, OAuthProvider  } from 'appwrite';
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

const appwriteClient = new Client()

appwriteClient
.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '66891c1700100c0a7591');

export const account = new Account(appwriteClient)

export class AppwriteService {
    //create a new record of user inside appwrite
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

    async socialLogin() {
        try {
            const userAccount = await account.createOAuth2Session(
                OAuthProvider.Google, // provider
                'http://localhost:3000/', // redirect here on success
                'http://localhost:3000/login', // redirect here on failure
                // ['repo', 'user'] // scopes (optional)
            );

            return userAccount
        } catch (error) {
            throw error
        }
    }

    async login({ email, password }: LoginUserAccount) {
        try {
            return await account.createEmailPasswordSession(email, password)
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
        } catch (error) { }

        return false
    }

    async getCurrentUser() {
        try {
            return account.get()
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


}

const appwriteService = new AppwriteService()

export default appwriteService