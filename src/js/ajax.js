// -------- CRUD POSTS -----------
const savePosts = (objectPost) => {
    $.ajax({
        method: "POST",
        url: "https://ajaxclass-1ca34.firebaseio.com/11g/teamd/posts/.json",
        data: JSON.stringify(objectPost),
        success: (response) => {
            console.log(response);
        },
        error: (error) => {
            console.log(error);
        },
    });
};

const getPosts = () => {
    let dbPosts = [];
    $.ajax({
      method: "GET",
      url: "https://ajaxclass-1ca34.firebaseio.com/11g/teamd/posts/.json",
      success: (response) => {
        console.log(response);
        dbPosts = response      
      },
      error: (error) => {
        console.log(error);
      },
      async: false,
    });
  
    console.log("getPosts", dbPosts);
    return dbPosts;
  };
  

// -------- CRUD REPLIES -----------
const saveReplies = (objectReply) => {
    //$(event.target).data("mentorkey");
    $.ajax({
        method: "POST",
        url: "https://ajaxclass-1ca34.firebaseio.com/11g/teamd/replies/.json",
        data: JSON.stringify(objectReply),
        success: (response) => {
            console.log(response);
        },
        error: (error) => {
            console.log(error);
        },
    });
};


const getReplies = () => {
    let dbReplies;
    $.ajax({
      method: "GET",
      url: "https://ajaxclass-1ca34.firebaseio.com/11g/teamd/replies/.json",
      success: (response) => {
        
        dbReplies = response;
      },
      error: (error) => {
        console.log(error);
      },
      async: false,
    });
  
    
    return dbReplies;
  };
  
// -------- CRUD USERS -----------
const saveUsers = (objectUser) => {
    $.ajax({
        method: "POST",
        url: "https://ajaxclass-1ca34.firebaseio.com/11g/teamd/users/.json",
        data: JSON.stringify(objectUser),
        success: (response) => {
            console.log(response);
        },
        error: (error) => {
            console.log(error);
        },
    });
};

const getUsers = () => {
    let dbUsers;
    $.ajax({
      method: "GET",
      url: "https://ajaxclass-1ca34.firebaseio.com/11g/teamd/users/.json",
      success: (response) => {
        
        dbUsers = response;
      },
      error: (error) => {
        console.log(error);
      },
      async: false,
    });
  
    
    return dbUsers;
  };
  

const deleteUser = (key) => {
    $.ajax({
        method: "DELETE",
        url: `https://ajaxclass-1ca34.firebaseio.com/11g/teamd/users/${key}.json`,

        success: (response) => {
            console.log(response);
        },
        error: (error) => {
            console.log(error);
        },
    });
};