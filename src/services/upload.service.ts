import { Injectable } from "@angular/core";

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


@Injectable()
export class UploadService {
    myStorage: any;

    constructor(private transfer: FileTransfer, private file: File) {
        this.myStorage = window.localStorage;
    }

    setServerURL(url: string) {
        this.myStorage.setItem('server', url);
    }

    getServerURL(): string {
        return this.myStorage.getItem('server');
    }

    uploadData(data: Array<Object>, activity: string): Promise<any> {
        const fileTransfer : FileTransferObject = this.transfer.create();
        var timestamp = new Date().getTime();
        var fileName = activity + "_" + timestamp + '.csv';
        var csv = this.createCSV(data);
        return new Promise((resolve, reject) => {
            this.file.writeFile(this.file.dataDirectory, fileName, csv).then(newFile => {
            console.log(newFile);
            let options: FileUploadOptions = {
                fileKey: 'dataFile',
                fileName: fileName,
                mimeType: 'text/csv',
                headers: {
                }
            }
            fileTransfer.upload(this.file.dataDirectory + fileName, 'http://'+this.getServerURL() + '.ngrok.io/upload', options).then((data) => {
                console.log(data);
                this.file.removeFile(this.file.dataDirectory, fileName);
                resolve(data);
            }, (err) => {
                console.log(err);
                reject(err);
            });

            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
        
    }

    createCSV(data: Array<Object>): string {
        var lineArray = [];
        var keys = Object.keys(data[0]);
        // if column names should be stored in the first line
        /*var header = "";
        keys.forEach(function(key, index) {
            header += (index == 0 ? key : ";"+key);
        });
        lineArray.push(header);*/
        data.forEach(function (element, index) {
            var line = "";
            keys.forEach(function(key, index) {
                line += (index==0? element[key] : ";"+element[key]);
            });
            lineArray.push(line);
        });
        var csvContent = lineArray.join("\n");
        console.log(csvContent);
        return csvContent;
    }
    
}