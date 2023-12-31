import { Client,Databases,ID ,Storage} from "appwrite";
import conf from '../conf/conf.js';

export class Service{
    client = new Client();
    databases;
    storage;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
        
    }

    async  createPost({msg,id,userid,profilpic,bio}) {
        try{
            console.log("in profile pic:",profilpic)
            console.log("in arguemnet:",arguments[0])

            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),{
                    msg,id,userid,profilpic,bio
                })
        }catch(error){
            console.log("appwrite error::create post::", error)
        }
    }

   

    async getPosts(){
        try{
            return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId)
        }catch(error){
            console.log("appwrite error::get posts::", error)
            return false
        }

    }

    async deletePost(id){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async updateLike(post,{likecount}){
        try{

            // if (!post && !likeCount) {
            //     throw new Error("Invalid post or post ID");
            //   }
          
              const documentId = post;
          

            //   console.log(updatedData)
            return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,documentId,{likecount})
        }catch(error){
            console.log("appwrite error::update like::", error)
        }
    }

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(file)
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

   getFiles(fileId){
        try{
            const file = fileId
            const preview = this.storage.getFilePreview(
                conf.appwriteBucketId,
                file
            ) 
            return preview
        }catch(error){
            console.log("Appwrite serive :: getFiles :: error", error)
        }
           
    }

}

const service = new Service();
export default service;
