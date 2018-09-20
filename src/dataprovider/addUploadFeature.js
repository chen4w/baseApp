const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.rawFile);

        reader.onload = () => {
            resolve({
                title:file.title,
                src:reader.result
            });
        }
        reader.onerror = reject;
    });

const addUploadCapabilities = requestHandler => (type, resource, params) => {
    if ((type === 'UPDATE'|| type === 'CREATE') && resource === 'File') {
        if (params.data.pictures && params.data.pictures.length) {
            // only freshly dropped pictures are instance of File
            const formerPictures = params.data.pictures.filter(
                p => !(p.rawFile instanceof File)
            );
            const newPictures = params.data.pictures.filter(
                p => p.rawFile instanceof File
            );

            return Promise.all(newPictures.map(convertFileToBase64))
                .then(base64Pictures =>
                    base64Pictures.map(picture64 => {
                        //picture64
                        requestHandler(type, resource, {
                            data: picture64                        
                        })   
                        picture64
                    }
                    )
                ).then(transformedNewPictures => requestHandler("GET_LIST", resource, 
                    {filter:{},pagination:{page:1,perPage:10},sort:{field: "id", order: "DESC"}}))
        }
    }

    return requestHandler(type, resource, params);
};

export default addUploadCapabilities;
