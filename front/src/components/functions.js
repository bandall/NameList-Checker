import axios from "axios";
const server_url = "http://localhost:7000"
export const postLoggin = async (password) => {
    axios.defaults.withCredentials = true;
    try {
        const url = server_url + "/api/login";
        await axios.post(url, {
            password: password
        });
        return true;
    } catch (error) {
        console.log(error.response.data.errMsg);
        alert(error.response.data.errMsg);
        return false;
    }
}

export const getLoggedIn = async () => {
    axios.defaults.withCredentials = true;
    try {
        const url = server_url + "/api/loggedin";
        const res = await axios.get(url);
        return res.data.loggedIn;
    } catch (error) {
        console.log(error.response.data.errMsg);
        alert(error.response.data.errMsg);
        return false;
    }
}

export const postLogout = async () => {
    axios.defaults.withCredentials = true;
    try {
        const url = server_url + "/api/logout";
        await axios.post(url);
    } catch (error) {
        console.log(error);
    }
}


export const postAddList = async (name, phoneNumber, region, start, end) => {
    axios.defaults.withCredentials = true;
    try {
        const url = server_url + "/api/addlist";
        await axios.post(url, {
            name: name,
            phoneNumber: phoneNumber,
            region: region,
            start: start,
            end: end
        });
        alert("등록 성공!");
        return true;
    } catch (error) {
        console.log(error.response.data.errMsg);
        alert(error.response.data.errMsg);
        return false;
    }
}

export const postDeleteList = async (_id) => {
    axios.defaults.withCredentials = true;
    try {
        const url = server_url + "/api/deletelist";
        await axios.post(url, {
            _id: _id,
        });
        alert("삭제 성공!");
        return true;
    } catch (error) {
        console.log(error.response.data.errMsg);
        alert(error.response.data.errMsg);
        return false;
    }
}

export const getSearchName = async (name, start, end) => {
    axios.defaults.withCredentials = true;
    try {
        const url = server_url + "/api/serachName";
        const userInfo = await axios.get(url, 
            {params: {name:name, start:start, end:end}}
        );
        return userInfo.data;
    } catch (error) {
        console.log(error.response.data.errMsg);
        alert(error.response.data.errMsg);
        return null;
    }
}

export const getSearchPhone = async (phoneNumber, start, end) => {
    axios.defaults.withCredentials = true;
    try {
        const url = server_url + "/api/searchPhone";
        const userInfo = await axios.get(url, 
            {params: {phoneNumber:phoneNumber, start:start, end:end}}
        );
        return userInfo.data;
    } catch (error) {
        console.log(error.response.data.errMsg);
        alert(error.response.data.errMsg);
        return null;
    }
}

export const getSearchBoth = async (name, phoneNumber, start, end) => {
    axios.defaults.withCredentials = true;
    try {
        const url = server_url + "/api/searchBoth";
        const userInfo = await axios.get(url, 
            {params: {name:name, phoneNumber:phoneNumber, start:start, end:end}}
        );
        return userInfo.data;
    } catch (error) {
        console.log(error.response.data.errMsg);
        alert(error.response.data.errMsg);
        return null;
    }
}

export const getList = async (start, end) => {
    axios.defaults.withCredentials = true;
    try {
        const url = server_url + "/api/list";
        const userInfo = await axios.get(url, 
            {params: {start:start, end:end}}
        );
        return userInfo.data;
    } catch (error) {
        console.log(error.response.data.errMsg);
        alert(error.response.data.errMsg);
        return null;
    }
}