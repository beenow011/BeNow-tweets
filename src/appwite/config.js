import { Client,Databases,ID } from "appwrite";
import conf from '../conf/conf.js';

export class Service{
    client = new Client();
    databases;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        
    }

    async  createPost({msg,id,userid,profilepic}) {
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),{
                    msg,id,userid,profilepic
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

}

const service = new Service();
export default service;
