const convertFile = (file, targetType) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        switch(targetType){
            case 'base64':
                reader.readAsDataURL(file.rawFile);
                break;
            case 'utf8':
                reader.readAsText(file.rawFile);
                break;
            default:
                reader.readAsArrayBuffer(file.rawFile);
        }

        reader.onload = () => {
            resolve({
                title:file.title,
                src:reader.result
            });
        }
        reader.onerror = reject;
    });
const xhr = new XMLHttpRequest(); 
const uploadFile = file =>{
    var formData = new FormData();
    formData.append('file-to-upload', file.rawFile);
    xhr.open('POST', '/upload', true);
    console.log(file.rawFile)
    xhr.send(formData);
}

const addUploadCapabilities = requestHandler => (type, resource, params) => {
    if ((type === 'UPDATE'|| type === 'CREATE') && (resource === 'File' || resource === 'keypairs' )) {
        if (params.data.pictures && params.data.pictures.length) {
            // only freshly dropped pictures are instance of File
            const newPictures = params.data.pictures.filter(
                p => p.rawFile instanceof File
            );

            return Promise.all(newPictures.map(uploadFile))
                .then(transformedNewPictures => requestHandler("GET_LIST", resource, 
                    {filter:{},pagination:{page:1,perPage:10},sort:{field: "id", order: "DESC"}}))
        }

        if(params.data.keypairFile){
            return convertFile(params.data.keypairFile, 'utf8')
            .then(keypair =>
                requestHandler(type, resource, {
                    data: {
                        keypairImported: keypair
                    }
                })
            )
        }

        return requestHandler(type, resource, params);
    }

    return requestHandler(type, resource, params);
};

export default addUploadCapabilities;
