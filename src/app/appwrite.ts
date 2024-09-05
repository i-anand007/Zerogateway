import { itemsEqual } from '@dnd-kit/sortable/dist/utilities';
import { Client, Account, ID, OAuthProvider, Databases, Storage, Query } from 'appwrite';
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
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(appwriteClient)
export const databases = new Databases(appwriteClient)
export const storage = new Storage(appwriteClient);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!
const PAYMENTS_ID = process.env.NEXT_PUBLIC_APPWRITE_PAYMENTS_ID!

const PLAN_ID = process.env.NEXT_PUBLIC_APPWRITE_PLAN_ID!
const USER_UPI_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_UPI_ID!
const USER_BANK_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_BANK_ID!

const CHECKOUT_SETTING_ID = process.env.NEXT_PUBLIC_APPWRITE_CHECKOUT_SETTING_ID!



const KYC_ID = '66a88fe2000ed1a3d59d'
const AdminUPI_ID = '669b9e9a0011cfaf2917'
const AdminBANK_ID = '669ba107001349375425'



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
                Cookies.set("user_id", response.userId, { path: '/', sameSite: 'strict' })
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

    async isAdmin() {
        try {
            const response = await account.get()
            if (response.labels.includes('Administrator')) {
                return 'true'
            } else
                return 'false'
        } catch (error) {
        }

        return null
    }

    async updatePhone({ phone, password }: UpdateUserPassword) {
        try {
            return account.updatePhone(phone, password)
        } catch (error) {
            console.log("getcurrentUser error: " + error)
        }

        return null
    }

    async getPrefs() {
        return await account.getPrefs();
    }

    async updatePrefs(prefs: any) {
        try {
            if (prefs === 'clear') {
                return await account.updatePrefs({});
            }

            const currentPrefs = await account.getPrefs();

            if (typeof prefs === 'object' && !Array.isArray(prefs) && prefs !== null) {
                if ('key' in prefs && 'value' in prefs) {
                    currentPrefs[prefs.key] = prefs.value;
                } else {
                    Object.assign(currentPrefs, prefs);
                }
            }

            // Update the preferences
            return await account.updatePrefs(currentPrefs);
        } catch (error) {
            console.log("updatePrefs error: " + error);
        }
        return null;
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
            return uploadFile
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async getFile(fileId: string) {
        try {
            const getFile = await storage.getFile(
                BUCKET_ID,
                fileId
            );
            return getFile
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async getFilePreview(fileId: string) {
        try {
            const getFilePreview = await storage.getFilePreview(
                BUCKET_ID,
                fileId
            );
            return getFilePreview
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async getFileDownload(fileId: string) {
        try {
            const getFileDownload = await storage.getFileDownload(
                BUCKET_ID,
                fileId
            );
            return getFileDownload
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async submitKYC(data: object) {
        try {
            const createDocument = await databases.createDocument(
                DATABASE_ID,
                KYC_ID,
                ID.unique(),
                data
            );
            toast.success('KYC Submitted')
            return (createDocument)
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async listKYC() {
        try {
            const listDocuments = await databases.listDocuments(
                DATABASE_ID,
                KYC_ID,
            );
            return listDocuments
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async addAdminUPI(data: object) {
        try {
            const createDocument = await databases.createDocument(
                DATABASE_ID,
                AdminUPI_ID,
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

    async listAdminUPI() {
        try {
            const listDocuments = await databases.listDocuments(
                DATABASE_ID,
                AdminUPI_ID,
            );
            const data = listDocuments.documents.map(item => ({
                id: item.$id,
                createdAt: item.$createdAt,
                upi_id: item.upi_id,
                merchant: item.merchant == 'true' ? 'Merchant' : 'Non Merchant',
                status: item.status ? 'Active' : 'Blocked',
            }))
            return (data)
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async updateAdminUPIstatus(data: { id: string; payload: object; }) {
        try {
            const updateDocument = await databases.updateDocument(
                DATABASE_ID,
                AdminUPI_ID,
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

    async deleteAdminUPI(data: string) {
        try {
            const deleteDocument = await databases.deleteDocument(
                DATABASE_ID,
                AdminUPI_ID,
                data
            );
            toast.success("UPI Deleted")
            return (deleteDocument)
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async addAdminBANK(data: object) {
        try {
            const createDocument = await databases.createDocument(
                DATABASE_ID,
                AdminBANK_ID,
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

    async listAdminBANK() {
        try {
            const listDocuments = await databases.listDocuments(
                DATABASE_ID,
                AdminBANK_ID,
            );
            const data = listDocuments.documents.map(item => ({
                id: item.$id,
                createdAt: item.$createdAt,
                bank_name: item.bank_name,
                account_name: item.account_name,
                account_number: item.account_number,
                ifsc: item.ifsc,
                status: item.status ? 'Active' : 'Blocked',
            }))
            return (data)
        } catch (error: any) {
            // let response = error.toString();
            // toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async updateAdminBANKstatus(data: { id: string; payload: object; }) {
        try {
            const updateDocument = await databases.updateDocument(
                DATABASE_ID,
                AdminBANK_ID,
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

    async deleteAdminBANK(data: string) {
        try {
            const deleteDocument = await databases.deleteDocument(
                DATABASE_ID,
                AdminBANK_ID,
                data
            );
            toast.success("BANK Deleted")
            return (deleteDocument)
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async addUserUPI(data: object) {
        try {
            const createDocument = await databases.createDocument(
                DATABASE_ID,
                USER_UPI_ID,
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

    async listUserUPI(userID: string) {
        try {
            const listDocuments = await databases.listDocuments(
                DATABASE_ID,
                USER_UPI_ID,
                [
                    Query.contains("user_Id", userID)
                ]
            );
            const data = listDocuments.documents.map(item => ({
                id: item.$id,
                createdAt: item.$createdAt,
                upi_id: item.upi_id,
                merchant: item.merchant == 'true' ? 'Merchant' : 'Non Merchant',
                status: item.status ? 'Active' : 'Blocked',
            }))
            return (data)
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async addUserBANK(data: object) {
        try {
            const createDocument = await databases.createDocument(
                DATABASE_ID,
                USER_BANK_ID,
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

    async checkout_settings(user_Id: string, data: object) {
        try {
            console.log(data)
            const listUser = await databases.listDocuments(
                DATABASE_ID,
                CHECKOUT_SETTING_ID
            );

            const existingDoc = listUser.documents.find(doc => doc.user_Id === user_Id);

            if (existingDoc) {
                const update = await databases.updateDocument(
                    DATABASE_ID,
                    CHECKOUT_SETTING_ID,
                    existingDoc.$id,
                    data
                );
                toast.success('Updated')
                return update
            } else {
                // Create a new document if user_Id does not exist
                const newDoc = await databases.createDocument(
                    DATABASE_ID,
                    CHECKOUT_SETTING_ID,
                    'unique()',
                    data
                );
                toast.success('Updated')
                return newDoc;
            }






            // for (const doc of listUser.documents) {
            //     // Check if the user_Id matches the given userIdToFind
            //     if (doc.user_Id === user_Id) {
            //         // Return the $id if a match is found
            //         return doc.$id;
            //     }
            // }
            // console.log(listUser)
            // console.log(listUser.documents.map(item => {
            //     item.$id === user_Id
            //     return "found"
            // }))


            // const createDocument = await databases.createDocument(
            //     DATABASE_ID,
            //     CHECKOUT_SETTING_ID,
            //     ID.unique(),
            //     data
            // );
            return (listUser)
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async get_checkout_settings(user_Id: string) {
        try {
            const listDocuments = await databases.listDocuments(
                DATABASE_ID,
                CHECKOUT_SETTING_ID,
                [
                    Query.contains("user_Id", user_Id)
                ]
            );
            return (listDocuments)
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async listUserBANK(userID: string) {
        try {
            const listDocuments = await databases.listDocuments(
                DATABASE_ID,
                USER_BANK_ID,
                [
                    Query.contains("user_Id", userID)
                ]
            );
            const data = listDocuments.documents.map(item => ({
                id: item.$id,
                createdAt: item.$createdAt,
                bank_name: item.bank_name,
                account_name: item.account_name,
                account_number: item.account_number,
                ifsc: item.ifsc,
                status: item.status ? 'Active' : 'Blocked',
            }))
            return (data)
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async addPayments(
        paymentid: string,
        userto: any,
        userfrom: any,
        purpose: any,
        name: any,
        phone: any,
        email: any,
        payment_mode: any,
        upi_acc: any,
        utr: any,
        amount: any,
        screenshot: any
    ) {
        try {
            const createDocument = await databases.createDocument(
                DATABASE_ID,
                PAYMENTS_ID,
                paymentid,
                {
                    userto,
                    userfrom,
                    purpose,
                    name,
                    phone,
                    email,
                    payment_mode,
                    upi_acc,
                    utr,
                    amount,
                    screenshot
                }
            );
            return createDocument
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async listPayments(userId: string) {
        try {
            const listDocuments = await databases.listDocuments(
                DATABASE_ID,
                PAYMENTS_ID,
                [
                    Query.limit(200000),
                    Query.contains("userto", userId),
                    Query.orderDesc('$createdAt')
                ]
            );
            return listDocuments
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async listAllPayments() {
        try {
            const listDocuments = await databases.listDocuments(
                DATABASE_ID,
                PAYMENTS_ID,
            );
            return listDocuments
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async getPaymentsInfo(
        paymentId: string
    ) {
        try {
            const listDocuments = await databases.listDocuments(
                DATABASE_ID,
                PAYMENTS_ID,
                [
                    Query.equal("$id", paymentId)
                ]
            );
            return listDocuments
        } catch (error: any) {
            let response = error.toString();
            toast.error(response.split('AppwriteException: ')[1].split('.')[0] + '.')
            throw error
        }
    }

    async updatePaymentStatus(data: { id: string; payload: object; }) {
        try {
            const updateDocument = await databases.updateDocument(
                DATABASE_ID,
                PAYMENTS_ID,
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

}


const appwriteService = new AppwriteService()

export default appwriteService