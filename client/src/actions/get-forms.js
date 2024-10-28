const URL = "/api/v1/form";

const getForms = async () => {
    const res = await fetch(URL);

    return res.json();
};

export default getForms;