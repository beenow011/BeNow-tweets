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

    async  createPost({userid,msg,profile_pic,id}) {
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),{
                    userid,
                    msg,
                    profile_pic,
                    id
                })
        }catch(error){
            console.log("appwrite error::create post::", error)
        }
    }

}

const service = new Service();
export default service;
