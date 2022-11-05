import User from "../models/User";
import bcrypt from "bcrypt";
import IP from "request-ip";
import crypto from "crypto";
export const getLoginInfo = (req, res) => {
    if(!req.session.loggedIn) {
        return res.send({loggedIn:false});
    } else {
        return res.send({loggedIn:true});
    }
}

export const postLogin = (req, res) => {
    const { password } = req.body;
    if(process.env.PASSWORD !== password) return res.status(403).send({ errMsg: "잘못된 비밀번호입니다." });
    req.session.loggedIn = true;
    req.session.ip = String(IP.getClientIp(req));
    return res.sendStatus(200);
}

export const postLogout = async (req, res) => {
    await req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect("/");
    })
}

//type 제외
export const postAddList = async (req, res) => {
    const { name, phoneNumber, region, start, end } = req.body;
    if(!name || !phoneNumber || !region || !start || !end) 
        return res.status(409).send({errMsg: "잘못된 입력입니다."});
    const nameHash = crypto.createHash('sha256').update(name).digest('hex');
    const phoneHash = crypto.createHash('sha256').update(phoneNumber).digest('hex');
    try {
        const user = await User.find({
            $and: [
                {name: nameHash}, 
                {phoneNumber: phoneHash}
            ]
        });
        const startDate = new Date(new Date(start).getTime() - 9 * 60 * 60 * 1000);
        const endDate = new Date(new Date(end).getTime() + 15 * 60 * 60 * 1000);
        if(startDate.getTime() >= endDate.getTime())
            return res.status(409).send({errMsg: "잘못된 날짜 지정입니다."});
        for(let i = 0; i < user.length; i++) {
            const createDate = new Date(user[i].date);
            // console.log(startDate.getTime() + " " + endDate.getTime());
            // console.log(createDate.getTime());
            if(startDate.getTime() <= createDate.getTime() && createDate.getTime() < endDate.getTime()) {
                return res.status(409).send({errMsg: "이름과 전화번호가 중복됩니다."});
            }
        }
        
        await User.create({
            name: name,
            phoneNumber: phoneNumber,
            region: region,
            date: String(new Date()),
            IP: String(IP.getClientIp(req))
        })
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.status(409).send({ errMsg: "명단 추가 중 오류가 발생했습니다." });
    }
}

export const postDeleteList = async (req, res) => {
    const { _id } = req.body;
    try {
        const list = await User.findById(_id);
        if(!list) {
            return res.status(404).send({errMsg : "이용자가 명단에 존재하지 않습니다."});
        }
        await User.findByIdAndDelete(_id);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.status(400).send({errMsg : "명단 삭제 중 오류가 발생했습니다."});
    }
}

export const getSearchName = async (req, res) => {
    const { name, start, end } = req.query;
    if(!name || !start || !end) 
        return res.status(409).send({errMsg: "잘못된 입력입니다."});
    const nameHash = crypto.createHash('sha256').update(name).digest('hex');
    try {
        const user = await User.find({
            $and: [
                {name: nameHash}
            ]
        });
        const userInfo = [];
        const startDate = new Date(new Date(start).getTime() - 9 * 60 * 60 * 1000);
        const endDate = new Date(new Date(end).getTime() + 15 * 60 * 60 * 1000);
        if(startDate.getTime() >= endDate.getTime())
            return res.status(409).send({errMsg: "잘못된 날짜 지정입니다."});
        for(let i = 0; i < user.length; i++) {
            const createDate = new Date(user[i].date);
            if(startDate.getTime() <= createDate.getTime() && createDate.getTime() < endDate.getTime()) {
                userInfo.push(user[i]);
            }
        }
        return res.send(userInfo);
    } catch (error) {
        console.log(error);
        return res.status(400).send({errMsg : "명단 조회 중 오류가 발생했습니다."});
    }
}

export const getSearchPhone = async (req, res) => {
    const { phoneNumber, start, end } = req.query;
    if(!phoneNumber || !start || !end) 
        return res.status(409).send({errMsg: "잘못된 입력입니다."});
    const phoneNumberHash = crypto.createHash('sha256').update(phoneNumber).digest('hex');
    try {
        const user = await User.find({
            $and: [
                {phoneNumber: phoneNumberHash}
            ]
        });
        const userInfo = [];
        const startDate = new Date(new Date(start).getTime() - 9 * 60 * 60 * 1000);
        const endDate = new Date(new Date(end).getTime() + 15 * 60 * 60 * 1000);
        if(startDate.getTime() >= endDate.getTime())
            return res.status(409).send({errMsg: "잘못된 날짜 지정입니다."});
        for(let i = 0; i < user.length; i++) {
            const createDate = new Date(user[i].date);
            if(startDate.getTime() <= createDate.getTime() && createDate.getTime() < endDate.getTime()) {
                userInfo.push(user[i]);
            }
        }
        return res.send(userInfo);
    } catch (error) {
        console.log(error);
        return res.status(400).send({errMsg : "명단 조회 중 오류가 발생했습니다."});
    }
}

export const getSearchBoth = async (req, res) => {
    const { name, phoneNumber, start, end } = req.query;
    if(!phoneNumber || !name || !start || !end) 
        return res.status(409).send({errMsg: "잘못된 입력입니다."});
    const phoneNumberHash = crypto.createHash('sha256').update(phoneNumber).digest('hex');
    const nameHash = crypto.createHash('sha256').update(name).digest('hex');
    try {
        const user = await User.find({
            $and: [
                {phoneNumber: phoneNumberHash},
                {name: nameHash}
            ]
        });
        const userInfo = [];
        const startDate = new Date(new Date(start).getTime() - 9 * 60 * 60 * 1000);
        const endDate = new Date(new Date(end).getTime() + 15 * 60 * 60 * 1000);
        if(startDate.getTime() >= endDate.getTime())
            return res.status(409).send({errMsg: "잘못된 날짜 지정입니다."});
        for(let i = 0; i < user.length; i++) {
            const createDate = new Date(user[i].date);
            if(startDate.getTime() <= createDate.getTime() && createDate.getTime() < endDate.getTime()) {
                userInfo.push(user[i]);
            }
        }
        return res.send(userInfo);
    } catch (error) {
        console.log(error);
        return res.status(400).send({errMsg : "명단 조회 중 오류가 발생했습니다."});
    }
}

export const getList = async (req, res) => {
    let { start, end } = req.query;
    if(start === "" || !start) start = "2022-01-01";
    if(end === "" || !end) end = "2099-01-01";

    try {
        const user = await User.find({}).sort({ _id: -1 });
        const userList = [];
        const startDate = new Date(new Date(start).getTime() - 9 * 60 * 60 * 1000);
        const endDate = new Date(new Date(end).getTime() + 15 * 60 * 60 * 1000);
        if(startDate.getTime() >= endDate.getTime())
            return res.status(409).send({errMsg: "잘못된 날짜 지정입니다."});
        for(let i = 0; i < user.length; i++) {
            const createDate = new Date(user[i].date);
            if(startDate.getTime() <= createDate.getTime() && createDate.getTime() < endDate.getTime()) {
                userList.push(user[i]);
            }
        }
        return res.send(userList);
    } catch (error) {
        console.log(error);
        return res.status(400).send({errMsg : "명단 조회 중 오류가 발생했습니다."});
    }
}