module.exports=class PostDTO{
    id
    title
    description
    user
    tags
    isPinned
    isArchived
    color
    createdAt
    constructor(post){
        this.id=post._id;
        this.title=post.title;
        this.description=post.description;
        this.user=post.user;
        this.tags=post.tags;
        this.isPinned=post.isPinned;
        this.isArchived=post.isArchived;
        this.color=post.color;
        this.createdAt=post.createdAt
    }
}