module.exports=class {

    id
    name
    email
    profilePicture
    isAdmin
    isActivated
    createdAt
    constructor(model){
        this.id=model.id
        this.name=model.name
        this.email=model.name
        this.profilePicture=model.profilePicture
        this.isAdmin=model.isAdmin
        this.isActivated=model.isActivated
    }
}