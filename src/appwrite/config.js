import conf from "../conf/conf";
import {
  Client,
  ID,
  Databases,
  Storage,
  Query,
  ImageFormat,
  Role,
  Permission,
  Account,
} from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteURL)
      .setProject(conf.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
    this.account = new Account(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const user = await this.account.get();
      return await this.databases.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
          authorName: user.name,
        },
        [Permission.read(Role.any())]
      );
    } catch (error) {
      console.log("config:createPost:error", error);
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("config:updatePost:error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("config:deletePost:error", error);
      return false;
    }
  }
  //method to get a single post
  async getPost(slug) {
    try {
      return this.databases.getDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("config:getPost:error", error);
    }
  }
  //if we directly use listDocument which is use to get all documents then we will
  // get all the document which status is not active we don't want that
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("config:getPosts:error", error);
      return false;
    }
  }

  //file upload services
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("config:uploadFile:error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appWriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("config:uploadFile:error", error);
      return false;
    }
  }
  //it's very fast that is why we are not using async await
  getFilePreview(fileId) {
    return this.bucket.getFileView(
      conf.appWriteBucketId,
      fileId,
      ImageFormat.Jpg
    );
  }
}

const service = new Service();
export default service;
