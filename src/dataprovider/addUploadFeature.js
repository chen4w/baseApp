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

const addUploadCapabilities = requestHandler => (type, resource, params) => {
    if ((type === 'UPDATE'|| type === 'CREATE') && (resource === 'keypairs' )) {
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
