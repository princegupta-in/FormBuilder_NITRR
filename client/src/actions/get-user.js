const URL = "/api/v1/user";

const getUser = async () => {
    const res = await fetch(URL);

    return res.json();
};

export default getUser;