
export async function sendData(url, data) {
    const formData = new FormData();

    for (const name in data) {
        formData.append(name, data[name]);
    }

    const response = await fetch(url, {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        method: "POST",
        body: formData,
    });
    return response.json();
}


export async function updateData(url, data) {
    const formData = new FormData();

    for (const name in data) {
        formData.append(name, data[name]);
    }

    const response = await fetch(url, {
        method: "PATCH",
        body: formData,
    });
    return response;
}