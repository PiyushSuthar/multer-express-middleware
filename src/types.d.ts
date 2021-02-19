export type options = {
    /**
     * `default:- "image"`
     * The field where image will be added in frontend
     */
    imageProperty: string
    /**
     * Path where you would like to store your images.
     * 
     * ex. uploads/
     */
    destination: string

    /**
     * Customize the properties for frontend.
     */
    customize?: {
        upload?: {
            /**
             * `default:- /image/upload`
             * 
             * Api Path where you would like to post multipart data
             * 
             * ex usage:-
             * ```js
             * app.use("/api", imageStore({
             *      destination: "uploads",
             *      customize: {
             *          upload:{
             *              path: "/image/upload"
             *          }
             *      }
             * }))
             * 
             * // You can now post multipart formdata to `/api/image/upload`
             * ```
             */
            path: string;
            /**
             * `default:- "folder";)`
             * 
             * The property you would like to use in body while giving a post request
             * 
             * ex. if folderName, then post request can have `{ folderName: "something" }` and image will be saved in `$destination/something/$subFolderProperty`
             * 
             * ```js
             * {
             *  folderProperty: "folderName"
             * }
             * ```  
             */
            folderProperty?: string
            /**
             * `default:- "subfolder"`
             * 
             * The property you would like to use in body while giving a post request
             * 
             * ex. if subFolderName, then post request can have `{ subFolderName: "something" }` and image will be saved in `$destination/$folderProperty/something`  
             * 
             * ```js
             * {
             *  subFolderProperty: "subFolderName"
             * }
             * ``` 
             */
            subFolderProperty?: string
        };
        delete?: {
            /**
             * `default:- /image/upload`
             * 
             * Api Path where you would like to post image path to delete the image
             * 
             * ex usage:-
             * ```js
             * app.use("/api", imageStore({
             *      destination: "uploads",
             *      customize: {
             *          delete:{
             *              path: "/image/delete"
             *          }
             *      }
             * }))
             * 
             * // You can now post image path to delete to `/api/image/delete`
             * ```
             */
            path: string;
            /**
             * `DEFAULT:- "path"`
             * 
             * The property you would like to use in body while giving a post request to delete the image.
             * 
             * ex. if you set it to `"imageToDelete"`, then while giving a post request you can send `{ imageToDelete: "/path/to/delete/image" }` in body.
             */
            filePathProperty: string
        }
    }
}