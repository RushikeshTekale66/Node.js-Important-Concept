const sesstionIdToUserMap = new Map();

function setUser(id, user){
    sesstionIdToUserMap.set(id, user)
}

function getUser(id){
    return sesstionIdToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser
}