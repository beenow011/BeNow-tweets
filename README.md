# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# BeNow-Tweets

Hello everyone, welcome to _BeNow_, this is a twitting website, where you can share your thoughts.

## Tech-stack

- _React.js_ for front-end component development.
- _Redux toolkit_ for storing and providing the user authentication status and all the tweets.
- _Tailwind CSS_ for designing.
- _Appwrite_ for authentication, databases, storage and other backend services.
- _React-hook-form_ for handling login and signup data properly.
- _Material UI_ for some ready made components.

## Accessing environment var:

# in create react app :

These environment variables will be defined for you on process.env. For example, having an environment variable named <br><br>REACT_APP_NOT_SECRET_CODE<br><br> will be exposed in your JS as<br><br> process.env.REACT_APP_NOT_SECRET_CODE.<br><br>
<br>
https://create-react-app.dev/docs/adding-custom-environment-variables/
<br><br>

# in vite:

<br>
To prevent accidentally leaking env variables to the client, only variables prefixed with **VITE\_** are exposed to your Vite-processed code. e.g. for the following env variables:

VITE_SOME_KEY=123<br>
DB_PASSWORD=foobar<br><br>
Only VITE_SOME_KEY will be exposed as<br>

```
import.meta.env.VITE_SOME_KEY
```

<br><br> to your client source code, but DB_PASSWORD will not.
<br>
https://vitejs.dev/guide/env-and-mode
<br>

** setting up appwrite: **

1. create new project <br>
2. create new database <br>
3. create new collectiom <br>
4. give permission in the collection's setting to read write or update and delete. <br>
5. create attributes. <br>
6. go to storage and create bucket <br>
7. Give permission in the bucket's setting.<br>
8. inside your src folder create a conf folder and create a conf file where you import and export all the env variables like:
   <br>
   ```
   const conf = {
    appwriteUrl : String(import.meta.VITE_APPWRITE_URL) ,
    appwriteProjectId : String(import.meta.VITE_APPWRITE_PROJECT_ID) ,
    appwriteDatabaseId : String(import.meta.VITE_APPWRITE_DATABASE_ID) ,
    appwriteCollectionId : String(import.meta.VITE_APPWRITE_COLLECTION_ID) ,
    appwriteBucketId : String(import.meta.VITE_APPWRITE_BUCKET_ID)
     }
    export default conf
   ```

** Setting up auth for appwrite: **

create a appwrite folder inside src and create auth.js<br>
import conf and user info:

```
   import conf from "../conf/conf";
   import { Client, Account, ID } from "appwrite";
```

best option is to create a class with new client <br>

```
export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account();
    }
}
const authService = new AuthService();
export default authService
```

** 1) sign up: ** <br>https://appwrite.io/docs/products/auth/email-password <br>

```
 async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
```

** 2)Login: **

```
 async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }
```

** 3)to get current user: **

```
 async getCurrentUser() {
        try {
            return  await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }
```

** 4)logout: **

```
async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
```

** 5) Update user: **
adding bio and profile pic's file id to the user prefs.

```
     async updateUser({fileId,bio}){
        try{
            return await this.account.updatePrefs({fileId,bio});
        }catch(error){
            console.log("Appwrite serive :: updateUser :: error", error);

        }
    }
```

<br><br><br><br>
** setup the service configuration **
<br><br>
make another file inside appwrite named config.js<br>

```
import conf from "../conf/conf";
import { Client, ID , Databases , Storage ,Query} from "appwrite";

export class Service{
    client = new Client();
    databases ;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Databases(this.client)
    }
}
const service = new Service();
export default service;
```

**1)creating post**

```
async createPost({title,slug,content,featuredImage,status,userId}){
        try{
           return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
                title,
                content,
                featuredImage,
                status,
                userId,
            })
        }catch(error){
            throw error;
        }
    }
```

**2)updating post**

```
 async updatePost(slug,{title,content,featuredImage,status}){
        try{
           return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
                title,
                content,
                featuredImage,
                status,
            })
        }catch(error){
            throw error;
        }
    }
```

**3)deleting post**

```
 async deletePost(slug){
        try{
           await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
           return true;
        }catch(error){
            // throw error;
            console.log("Appwrite error :: delete post:: error",error)
            return false;
        }
    }
```

**4)get a single particular post**

```
async getPost(slug){
        try{
        return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);

        }catch(error){
            // throw error;
            console.log("Appwrite error :: get post:: error",error)
            return false;
        }
    }
```

**5)get all posts**

```
async getPosts(queries = [Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries)
        }catch(error){
            console.log("Appwrite error :: get post:: error",error)
            return false;
        }
    }
```

**For uploading file service**
<br>create new methods inside the same class Service<br>
**1)Upload file**

```
 async uploadFile(file){
        try{
            return await this.databases.createFile(conf.appwriteBucketId,ID.unique(),file)
        }catch(error){
            console.log("Appwrite error :: upload file:: error",error)
            return false;
        }
    }
```

**2)Delete file**

```
 async deleteFile(fileId){
        try{
             await this.databases.deleteFile(conf.appwriteBucketId,fileId);
             return true;
        }catch(error){
            console.log("Appwrite error :: delete file:: error",error)
            return false;
        }
    }
```

**3)get file preview**

```
getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.appwriteBucketId,fileId)
    }
```

<br> config completed
<br>
now build your react store,slice,setup your redux and router and build all the components.
