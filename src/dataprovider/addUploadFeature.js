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
const xhr = new XMLHttpRequest(); 
const uploadFile = file =>{
    var formData = new FormData();
    formData.append('file-to-upload', file.rawFile);
    xhr.open('POST', '/upload', true);
    console.log(file.rawFile)
    xhr.send(formData);
}

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

            return Promise.all(newPictures.map(uploadFile))
                .then(transformedNewPictures => requestHandler("GET_LIST", resource, 
                    {filter:{},pagination:{page:1,perPage:10},sort:{field: "id", order: "DESC"}}))
        }
    }

    return requestHandler(type, resource, params);
};

export default addUploadCapabilities;
