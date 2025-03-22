import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

export interface ImageUpload {
    public_id: string;
    url: string;
}

@Injectable({
    providedIn: 'root'
})
export class UploadImagesService {
    private http = inject(HttpClient);

    async uploadImages(images: any) {
        let newImages = [];

        for (let img of images) {
            const formData = new FormData();

            formData.append('file', img);
            formData.append('upload_preset', 'ahmedPhoto');
            const res: any = await lastValueFrom(
                this.http.post('https://api.cloudinary.com/v1_1/dgufxudqm/image/upload', formData)
            );

            newImages.push({
                public_id: res.public_id,
                url: res.secure_url
            });

            console.log(res);
        }

        return newImages;
    }
}
