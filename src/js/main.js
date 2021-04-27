

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
            dbPosts = response
        },
        error: (error) => {
            console.log(error);
        },
        async: false,
    });
    return dbPosts;
};
const patchPost = (event, newVal, newKey) => {
    let postKey = event.target.dataset.postkey
    let postLike = event.target
    console.log(postKey)
    console.log(newVal)
    $.ajax({
        method:"PATCH",
        data:JSON.stringify({[newKey]:newVal}),
        url:`https://ajaxclass-1ca34.firebaseio.com/11g/teamd/posts/${postKey}.json`,
        success: response => {
            console.log( response )
            //getPosts()
            if(newKey==="likes"){
                console.log(postLike)
                $(postLike).html(response.likes)
            }
           
        },
        error: error => {
            console.log ( error )
        },
        async: false,
    })
}

const deletePosts = (key) => {
    $.ajax({
        method: "DELETE",
        url: `https://ajaxclass-1ca34.firebaseio.com/11g/teamd/posts/${key}.json`,
        success: (response) => {
            console.log(response);
        },
        error: (error) => {
            console.log(error);
        },
        async: false,
    });
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
            printReplies(objectReply.post);
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
            let aU = getUser(response.name)
            setActiveUser(aU)
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

const getUser = (key) => {
    let dbUser = {}
    $.ajax({
      method: "GET",
      url: `https://ajaxclass-1ca34.firebaseio.com/11g/teamd/users/${key}/.json`,
      success: (response) => {
        dbUser = response;
      },
      error: (error) => {
        console.log(error);
      },
      async: false,
    });    
    return dbUser;
  };
  

const patchUser = (userKey, postKey) => {
    let allPosts = getPosts()
    let thisPost = filterByID(postId, allPosts)
    let thisPostFavs = {}
    console.log(thisPost)

    for (post in allPosts) {
        console.log([post], thisPost)
        postKey === [post] ? thisPostFavs = {
            ...thisPostFavs,
            [post]: allPosts[post].favs
        } : null
    }
    // $.ajax({
    //     method:"PATCH",
    //     data:JSON.stringify({'favs': thisPostFavs}),
    //     url:`https://ajaxclass-1ca34.firebaseio.com/11g/teamd/users/${userKey}.json`,
    //     success: response => {
    //         console.log( response )
    //         getUsers()
    //     },
    //     error: error => {
    //         console.log ( error )
    //     },
    //     async: false,
    // })
}



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

//-------------LÓGICA ------------
const getAutor = (userId, users) => {
    let newUser = {};
    //let users = getUsers();
    for (ky in users) {
        if (users[ky].userId == userId) {
            newUser["userName"] = users[ky].userName;
            newUser["userPic"] = users[ky].userPic;
            newUser["userId"] = users[ky].userId;
            newUser["description"] = users[ky].description;
            newUser["location"] = users[ky].location;
            newUser["work"] = users[ky].work;
            newUser["userNickname"] = users[ky].userNickname;
        }
    }
    return newUser;
};

const filterByID = (id, coll) => {
    let userFiltered = {}
    for (user in coll) {
        coll[user].userId === id ? userFiltered = {
            ...userFiltered,
            [user]: coll[user]
        } : null
    }
    return userFiltered
}


let principalContainer = $('.total-container')
let activeUser = {}
let singlePostKey = ''
$(document).ready(function () {
    loadView("./views/landing.html", "landing")    
})
$('.bttn-write').click(() => {
    loadView('./views/createPost.html')
})

const loadView = (url, view) => {
    $('.bttn-login').removeClass('d-sm-inline')
    $('.bttn-write').removeClass('d-sm-inline')
    $('.bttn-createAccount').removeClass('d-sm-inline')
    principalContainer.load(url, () => {
        switch (view) {
            case "login":
                printAside(getPosts())
                $('.bttn-login').addClass('d-sm-inline')
                $('.bttn-write').removeClass('d-sm-inline')
                $('.bttn-createAccount').addClass('d-sm-inline')
                $('#avt').attr('src', 'https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg')
                $('.container-home').attr('left', '-100%')
                $('.container-login').attr('left', '1.5%')
                $('.checkuser').click((event) => {
                    event.preventDefault()
                    activeUser = checkUserExist()
                })
                                
                break
            case "createUser":
                $('.bttn-login').removeClass('d-sm-inline')
                $('.bttn-write').removeClass('d-sm-inline')
                $('.bttn-createAccount').removeClass('d-sm-inline')
                $('#avt').attr('src', 'https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg')
                $('.container-home').attr('left', '-100%')
                $('.container-login').attr('left', '1.5%')
                    break
            case "landing":
                $('.bttn-login').addClass('d-sm-inline')
                $('.bttn-write').removeClass('d-sm-inline')
                $('.bttn-createAccount').addClass('d-sm-inline')
                $('.bttn-login').click(() => {
                    loadView("./views/login.html", "login")
                })
                $('#avt').attr('src', 'https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg')
                $('.container-home').attr('left', '-100%')
                $('.container-login').attr('left', '1.5%')
                printHome(getPosts())
                printAside(getPosts())
                break

            case "store":
                $('.container-login').addClass('d-none')
                $('.container-home').removeClass('d-none')
                $('.bttn-login').removeClass('d-sm-inline')
                $('.bttn-write').removeClass('d-sm-inline')
                $('.bttn-createAccount').removeClass('d-sm-inline')
                $('.bttn-write').click(() => {
                    loadView("./views/createPost.html", "createPost")
                })
                break

            case "home":
                $('.container-login').attr('left', '-100%')
                $('.container-home').attr('left', '1.5%')
                $('.bttn-login').removeClass('d-sm-inline')
                $('.bttn-write').addClass('d-sm-inline')
                $('.bttn-createAccount').removeClass('d-sm-inline')
                $('.bttn-write').click(() => {
                    loadView("./views/createPost.html", "createPost")
                })

                printHome(getPosts())
                printAside(getPosts())
                
                break

            case "createPost":
                $('.bttn-login').removeClass('d-sm-inline')
                $('.bttn-write').removeClass('d-sm-inline')
                $('.bttn-createAccount').removeClass('d-sm-inline')
                $('.container-login').attr('left', '-100%')
                $('.container-home').attr('left', '1.5%')
                break

            case "post":
                $('.container-login').attr('left', '-100%')
                $('.container-home').attr('left', '1.5%')
                $('.bttn-login').removeClass('d-sm-inline')
                $('.bttn-write').addClass('d-sm-inline')
                $('.bttn-createAccount').removeClass('d-sm-inline')
                $('.bttn-write').click(() => {
                    loadView("./views/createPost.html", "createPost")
                })

                printSinglePost(getPost(singlePostKey))
                break

            default:
                break
        }
    })
}

const checkUserExist = () => {
    let inputGroup = $('.userdata')
    userExists = {}
    $.each(inputGroup, (idx, currentInput) => {
        userExists[currentInput.name] = currentInput.value
    })
    inputGroup.val('')
    allUsers = getUsers()
    $.each(allUsers, (idx, current) => {
        userExists.usermail === current.mail && userExists.userpassword === current.password ? activeUser = current : null
    })
    activeUser.userId > 0 ? setActiveUser(activeUser) : alert("Nombre de usuario y/o contraseña incorrectos.")
}
var activeID
const setActiveUser = userData => {
    if (l.length === 0){
        const {
            description,
            joined,
            location,
            mail,
            password,
            userId,
            userName,
            userNickname,
            userPic
        } = userData
        $('#avt').attr('src', userPic)
        $('#active-user-name').text(userName)
        $('#active-user-nickname').text(userNickname)
        activeID = userId
        loadView("./views/home.html", "home")
    }
    else{
        $('#avt').attr('src', l.getItem('AvtImg'))
        $('#active-user-name').text(l.getItem('newUsN'))
        $('#active-user-nickname').text(l.getItem('newUsNname'))
    }
    
}


const reorderArray = arr => {
    let temp = []
    temp[0] = arr[0]
    arr[0] = arr[1]
    arr[1] = temp[0]
    return arr
}
//Es importante en time poner ('days', 'weeks', 'months', 'years')
const filterByDate = (numberOfDays,time) => {
    console.log(typeof(numberOfDays))
    let allPosts = getPosts()
    let postFilteredByTime = {}
    console.log(allPosts)
    for (k in allPosts) {
        const {
            content,
            coverUrl,
            creationDate,
            creationTime,
            duration,
            likes,
            postId,
            tags,
            title,
            userId
        } = allPosts[k]

        let soloporhoy = moment(moment().format('YYYY-MM-DD'))
        let week = moment(moment(moment().subtract(numberOfDays, time).calendar()).format('YYYY-MM-DD'))
        let newDate = creationDate.split('/')
        creationDateToFilter = moment(newDate.reverse().join('-'))
        difHoy = soloporhoy.diff(week,'days')
        difPost = soloporhoy.diff(creationDateToFilter,'days')
        console.log('al día de hoy ' + difHoy + 'contra el post ' + difPost)
        difPost <= difHoy ? postFilteredByTime = {...postFilteredByTime, [k]: allPosts[k]} : null
    }
    return postFilteredByTime

}
//count Replies by Post
const countRepliesByPost = (postId) => {  
    let replies = getReplies();
    let repliesByPost ={}   
    let countReplies = 0;
    for (key in replies) { 
        if (replies[key].post === postId) {
          values=replies[key]
          repliesByPost = {...repliesByPost, [key] : values }
        }
    }
    countReplies =Object.keys(repliesByPost).length
    return countReplies
}
const printHome = (allPostsToPrint) => {
    $('.post-container').empty()
    let firstPostKey = Object.keys(allPostsToPrint)[0]
    let postAuthor
    for (key in allPostsToPrint) {
        const {
            content,
            coverUrl,
            creationDate,
            creationTime,
            duration,
            likes,
            postId,
            tags,
            title,
            userId
        } = allPostsToPrint[key]
        let detalle = '#'
        let numberOfComments = 0
        postAuthor = getAutor(userId, getUsers())
        if (key === firstPostKey) {
            let principalPost =
                `<div class="post w-100 border bg-white rounded bg-white mt-2 mb-2 shadow-sm" id="post-${postId}">
                <!--Imagen principal-->
                <a href="${detalle}">
                    <img class="w-100" src="${coverUrl}" alt="post-img" />
                </a>
                <div class="d-flex mt-3">
                <!--Imagen de perfil-->
                    <img src="${postAuthor.userPic}" alt="" class="rounded-circle profile-p ml-3" />
                    <div class="author-info ml-2">
                    <p>${postAuthor.userName}</p>
                    <p>${creationDate}  ${creationTime} - ${moment(`${creationDate}`, "DD/MM/YYYY").fromNow()}</p>
                    </div>
                </div>
                <a href="${detalle}">
                    <h1 class="ml-3 font-weight-bold"><a href="#" data-post-key="${key}" class="btn-title">${title}</a></h1>
                </a>
                <ul class="h-post d-flex w-100 flex-wrap category-wrapper" data-postId = ${postId}>
                    <li><a href="#">Primer Tag de Prueba</a></li>
                </ul>
                <div class="post-interactions d-flex justify-content-between align-items-center w-md-25">
                    <!--footer del post principal-->
                    <div class="interactions d-flex">
                        <div>
                            <img src="Images/heart2red.svg" class="red-heart" alt="like" />
                            <img src="Images/heart2.svg" alt="like" />
                            <a class = 'likes-anchor text-muted' data-postkey = ${key}>${likes}</a>
                            <span class="d-none d-md-inline">reactions</span>
                        </div>
                        <div>
                            <img src="Images/comments.svg" alt="comment" />
                            <span class="numberOfComments">${numberOfComments}</span>
                            <span class="d-none d-md-inline">comments</span>
                        </div>
                    </div>
                    <div class="d-flex align-items-center">
                        <p class="mb-0">${duration}</p>
                        <button class="ml-2 btn btn btn-outline-secondary">Save</button>
                    </div>
                </div>
            </div>`

            $('.post-container').prepend(principalPost)
            
        } else {
            let secondaryPosts =
                `<div class="post rounded mt-2 bg-white mb-2 shadow-sm" id="post-${postId}">
            <!--Imagen principal-->
            <div class="d-flex mt-3">
                <!--Imagen de perfil-->
                <img src=${postAuthor.userPic} alt="" class="rounded-circle profile-p ml-3" />
                <div class="author-info ml-2">
                    <p>${postAuthor.userName}</p>
                    <p>${creationDate}  ${creationTime} - ${moment(`${creationDate}`, "DD/MM/YYYY").fromNow()}</p>
                </div>
            </div>
            <a href="#">
                <h1 class="ml-3 font-weight-bold"><a href="#" data-post-key="${key}" class="btn-title">${title}</a></h1>
            </a>
            <ul class="h-post d-flex w-100 flex-wrap category-wrapper" data-postId = ${postId}>
                <li><a href="#">Primer Tag de Prueba</a></li>

            </ul>
            <div class="post-interactions d-flex justify-content-between align-items-center">
                <div class="interactions d-flex">
                    <div>
                        <img src="Images/heart2red.svg" class="red-heart" alt="like" />    
                        <img src="Images/heart2.svg" alt="like" />
                        <a class = 'likes-anchor text-muted' data-postkey = ${key}>${likes}</a>
                        <span class="d-none d-md-inline">reactions</span>
                    </div>
                    <div>
                    <img src="Images/comments.svg" alt="comment" class="ml" />
                        <span class="numberOfComments">${numberOfComments}</span>
                        <span class="d-none d-md-inline">comments</span>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <p class="mb-0">${duration}</p>
                    <button class="ml-2 btn btn btn-outline-secondary">Save</button>
                </div>
            </div>
        </div>`
            $('.post-container').append(secondaryPosts)
            $('.red-heart').hide()
        }
        $(`#post-${postId} .category-wrapper`).html("")  
            tags.forEach( tag =>{
                $(`#post-${postId} .category-wrapper`).append(`<li class="badge ${tag.replace("#", "").toLowerCase()} mr-1 p-badge font-weight-normal text-size-icon"
                ><a href="#" data-tag-name="${tag}" class="btn-tag">${tag}</a></li>`)
        })
        numberOfComments = countRepliesByPost(postId)
        $(`#post-${postId} .numberOfComments`).html(numberOfComments) 
        
    }
}

/*const printTags = () => {
    let allPostsToPrint = getPosts()
    for (key in allPostsToPrint) {
        const {
            content,
            coverUrl,
            creationDate,
            creationTime,
            duration,
            postId,
            tags,
            title,
            userId
        } = allPostsToPrint[key]
        for (i = 0; i < tags.length - 1; i++) {
            let tagToPrint = `<li><a href="#">${tags[i]}</a></li>`
            let wrappers = $('.category-wrapper')
            $.each(wrappers, (idx, curr) => {
                curr.dataset.postid == postId ? curr.append(tagToPrint) : null
            })
        }
    }
}*/

////Create Account
principalContainer.on("click", ".add-user", () => {
    console.log( " agregando usuario ")
})

$('.bttn-createAccount').click(() => {
    loadView('./views/createUser.html')//ingresa a la pag. create user
})

const getNewAccount = ()=>{
    let newAccount={}
    let sendForm=true//validation
    $("#newAccount input, #newAccount textarea").each(function (){
        let property =this.id
        let value = this.value
        if(value==""){ //validation
            sendForm=false;
            $(`#${property}Help`).removeAttr("hidden");
        }else{
            $(`#${property}Help`).attr("hidden", true);
            newAccount = {...newAccount, [property]:value}   
        }    
    })
    if(sendForm){
        newAccount = {...newAccount, userId: new Date().getTime()}
        //console.log(newAccount)
        $('#newAccount')[0].reset();
        saveUsers(newAccount)
        loadView("./views/home.html", "home")
    }else{
        return false
    }

    newAccount = {...newAccount, userId: new Date().getTime()}
    saveUsers(newAccount)
}

//Function Search Posts
const searchPosts = (search, posts) =>{
    let matchPosts = {};
    let regExp = new RegExp(search, 'gi');
    for (key in posts) { 
      if( regExp.test(posts[key].title) ){
        values=posts[key]
        matchPosts = {...matchPosts, [key] : values }
      }
    }
    return matchPosts;  
  }
  
  const searchByTag = (tagsearch, posts) =>{
    let matchPosts = {};
    let regExp = new RegExp(tagsearch, 'gi');
    for (key in posts) { 
        posts[key].tags.forEach(tag =>{
            if( regExp.test(tag) ){
                values=posts[key]
                matchPosts = {...matchPosts, [key] : values }
            }
        })      
    }
    return matchPosts;  
  }  
  
  $("#inputSearch").keypress(function(e) {
    if(e.which == 13) {
       let allPosts = getPosts() 
       let searchresult = searchPosts(this.value,allPosts)
       console.log(searchresult)
       principalContainer.load( "views/home.html",()=>{
            if(Object.keys(searchresult).length > 0){
                printHome(searchresult)
                printAside(getPosts())
            }else{
                printHome(allPosts)
                printAside(getPosts())
            }        
       });   
    }
  });

//Detail Post
//let urlParams = new URLSearchParams(window.location.search);
//let postKey = urlParams.get("postkey");

//console.log(postKey);

const getPost = (postKey) => {
  let dbPost = {};
  $.ajax({
    method: "GET",
    url: `https://ajaxclass-1ca34.firebaseio.com/11g/teamd/posts/${postKey}.json`,
    success: (response) => {
      console.log(response);
      dbPost = response;
      
    },
    error: (error) => {
      console.log(error);
    },
    async: false,
  });

  //console.log("getPost", dbPost);
  return dbPost;
}; 

//Print replies function
const printReplies = (postId) => {
    $(`#replies-wrapper li`).remove();
    let replies = getReplies();
    let repliesByPost = {};
    
    let countReplies = 0;

    for (key in replies) { 
        if (replies[key].post === postId) {
          values=replies[key]
          repliesByPost = {...repliesByPost, [key] : values }
        }
    }

    console.log('replies  ', replies)
    console.log('replies  ', repliesByPost)
    countReplies =Object.keys(repliesByPost).length
    
    if(countReplies > 0){ 
        $('.count-replies').html(countReplies)  
        for (key in repliesByPost) {
        
            
            //let user = getUser(replies[key].userId);
            //console.log(user.avatar);
            // console.log("traeusercomment", user);
    
            //let h3Id = Date.now();
    
            let liHTML = `<li class="list-group-item">
                                    <div class="reply-box">
                                        <h4 id="reply-${repliesByPost[key].replyId}"></h4>
                                        
                                        <p class="mb-0 text-muted comment-text">${repliesByPost[key].content}</p>
                                        <p class="mb-0 text-right text-muted comment-date">
                                            <span class="date">${repliesByPost[key].creationDate}</span> 
                                            <span class="time">${repliesByPost[key].creationTime}</span>   
                                        </p>
                                    </div>
                                </li>
                            `;
            
            let repWrapp = `#replies-wrapper`;  
            $(repWrapp).prepend(liHTML);    
            //print user
            postAuthor = getAutor(repliesByPost[key].userId, getUsers())
            userInfo=`
            <div class="d-flex flex-row mb-3">
            <img
              src="${postAuthor.userPic}"
              alt="${postAuthor.userName}"
              class="img-profile rounded-circle mr-2"
            />
            <a class="my-auto text-color-title">
                ${postAuthor.userName} 
            </a>
          </div>
            `
            //let userinfo = printUser(replies[key].userId);
            $(`#reply-${repliesByPost[key].replyId}`).append(userInfo);
        
        }
        
    }
  };

const printSinglePost = (data) => {

    postAuthor = getAutor(data.userId, getUsers())  
    console.log(data.content);
    console.log(data.coverUrl);
    $(".post-wrapper .post-cover-img").attr("src", data.coverUrl);
    $(".post-wrapper .post-title").html(data.title);

    $(".post-wrapper .post-tags").html(data.title);
    
    $(".post-wrapper .content").html(data.content);
    $(".post-wrapper .post-avatar").attr("src", postAuthor.userPic);
    let dateCreationHtml = `${postAuthor.userName} <span class="ml-3 " >${data.creationDate} ・ ${data.duration} read</span>`;
    $(".post-wrapper .post-creation").html(dateCreationHtml);
    
    $('.post-wrapper .post-tags').html("")  
    data.tags.forEach( tag =>{
        $('.post-wrapper .post-tags').append(`<span class="badge ${tag.replace("#", "").toLowerCase()} mr-2 p-badge font-weight-normal text-size-icon"><a href="#" data-tag-name="${tag}" class="btn-post-tag">${tag}</a></span>`)
    })    
    $(".total-container .perfil-avatar").attr("src", postAuthor.userPic);
    console.log('autor',postAuthor)
    $(".total-container .perfil-name").html(postAuthor.userNickname);
    $(".total-container .perfil-description").html(postAuthor.description);
    $(".total-container .perfil-work").html(postAuthor.work);
    $(".total-container .perfil-location").html(postAuthor.location);
    //$(".total-container .perfil-name").html(postAuthor.userNickname);
    if(activeID>0){
        userComment = getAutor(activeID, getUsers())        
        $(".post-wrapper .post-user-avatar").attr("src", userComment.userPic);
        
    }
    
    $(".btn-save-replie").attr("data-commentkey", data.postId);
    printReplies(data.postId);
}
    //printSinglePost(getPost(postKey));
    //printSinglePost(getPost("-MYsPw9-8lhLZSCvtuRs"));
    principalContainer.on("click", "#saveAccount",() => {
        getNewAccount()
       
    })

//FUNCIONALIDAD DE BOTONES
const setActiveBtns = () =>{
    $('.total-container').on('click','#btn-feed',function(event){
        $('#btn-feed').addClass('active')
        $('#btn-feed').parents('li').siblings('li').children('a').removeClass('active')
        printHome(getPosts())
    })
    $('.total-container').on('click','#btn-week',function(event){
        $('#btn-week').addClass('active')
        $('#btn-week').parents('li').siblings('li').children('a').removeClass('active')
        printHome(filterByDate(7, 'days'))
    })
    $('.total-container').on('click','#btn-month',function(event){
        $('#btn-month').addClass('active')
        $('#btn-month').parents('li').siblings('li').children('a').removeClass('active')
        printHome(filterByDate(1, 'month'))
    })
    $('.total-container').on('click','#btn-year',function(event){
        $('#btn-year').addClass('active')
        $('#btn-year').parents('li').siblings('li').children('a').removeClass('active')
        printHome(filterByDate(1, 'year'))
    })
    $('.total-container').on('click','#btn-infinity',function(event){
        $('#btn-infinity').addClass('active')
        $('#btn-infinity').parents('li').siblings('li').children('a').removeClass('active')
        printHome(getPosts())
    })
    $('.total-container').on('click','#btn-latest',function(event){
        $('#btn-latest').addClass('active')
        $('#btn-latest').parents('li').siblings('li').children('a').removeClass('active')
        printHome(filterByDate(14, 'days'))
    })
}
setActiveBtns()
const addAttrToSelectTime = () =>{
    let timeSelected = $('#select-time').val()
    switch(timeSelected){
        case 'feed':
            printHome(getPosts())
            break
        case 'week':
            printHome(filterByDate(7, 'days'))
            console.log($('#select-time option:selected'))
            break
        case 'month':
            printHome(filterByDate(1, 'month'))
            break
        case 'year':
            printHome(filterByDate(1, 'year'))
            break
        case 'infinity':
            printHome(getPosts())
            break
        case 'latest':
            printHome(filterByDate(14, 'days'))
            break
        default:
            break
    }
}
$('.total-container').on('change', '#select-time', addAttrToSelectTime)

$('#devto-logo').click(() =>{
    activeUser === {} ? loadView("./views/landing.html", "landing") : loadView("./views/home.html", "home")
})
$('#sign-out').click(()=>{
    activeUser = {}
    l.clear()
    loadView("./views/landing.html", "landing")
})
$('#login-a').click(()=>{
    loadView("./views/login.html", "login")
})
$('#create-user-a').click(()=>{
    loadView("./views/createUser.html", "createUser")
})

//Cargar nuevo Post

const newPost = () =>{
    let newPostData = {}
    let tagArray = []
    let dataContainer = $('#write-new-post input[type=text], #write-new-post textarea, #write-new-post select')
    let checkBoxContainer = $('#write-new-post input[type=checkbox]:checked')
    let sendForm=true//validation
    dataContainer.each(function(){
        let containerKey = this.id
        let containerValue = this.value   
        if(containerValue==""){ //validation
            sendForm=false;
            $(`#${containerKey}Help`).removeAttr("hidden");
        }else{
            $(`#${containerKey}Help`).attr("hidden", true);
            newPostData = {...newPostData, [containerKey]: containerValue}      
        }    
    })
    checkBoxContainer.each(function(){
        let newValue = '#' + this.value
        tagArray.push(newValue)
    })
    if(tagArray.length<1){ //validation
        sendForm=false;
        $(`#tagsHelp`).removeAttr("hidden");
    }else{
        $(`#tagsHelp`).attr("hidden", true);
    }
    if(sendForm){
        newPostData = {...newPostData, tags: tagArray, userId : activeID, creationDate: moment().format('DD/MM/YYYY'), creationTime: moment().format('h:mm'), postId : Date.now(), likes: 0}
        $('#write-new-post')[0].reset()
        savePosts(newPostData)
        loadView('views/home.html','home')
    }else{
        return false
    }    
}
$('.total-container').on('click', '#submit-new-post', newPost)

//Dar likes al post

const setNewLike = (event) =>{
    let allPostsToLike = getPosts()
    let postKeyToLike = event.target.dataset
    let numOfLikes = event.target.text
    console.log(numOfLikes)
    let postToLike = {}
    for(post in allPostsToLike){
        post === postKeyToLike.postkey ? postToLike = {...postToLike, [post]: allPostsToLike[post]} : null
    }
    Object.values(postToLike)[0].likes +=1
    let likes = Object.keys(Object.values(postToLike)[0])[5]
    let numOfLikesUploaded = Object.values(postToLike)[0].likes
    console.log(likes + ' : ' + numOfLikesUploaded)
    console.log(postToLike)
    patchPost(event, numOfLikesUploaded, likes)
    //location.reload()
    
}
$('.total-container').on('click', '.likes-anchor', function(event){
    let imgHeart = event.target.parentElement.firstElementChild
    let originalHeart = event.target.parentElement.children[1]
    $(originalHeart).animate({
        width:'toggle',
        height : 'toggle'
    },30)
    $(imgHeart).animate({
        width:'toggle',
        height : 'toggle'
    },30)
    setNewLike(event)
})
//search by tag button
$('.total-container').on('click','.btn-tag',function(event){
    event.preventDefault()
    let searchresult = searchByTag(event.target.dataset.tagName,getPosts())
    printHome(searchresult)
})

//go to single Post by Key
$('.total-container').on('click','.btn-title',function(event){
    event.preventDefault()
    singlePostKey=event.target.dataset.postKey;
    loadView("./views/post.html?", "post")    
})

//search by tag button in Single Post
$('.total-container').on('click','.btn-post-tag',function(event){
    event.preventDefault()
    let searchresult = searchByTag(event.target.dataset.tagName,getPosts())
    principalContainer.load( "views/home.html",()=>{
        printHome(searchresult)
    });
})

$('.total-container').on('click','.btn-save-replie',function(event){
    event.preventDefault()
    
    let postId = $(event.target).data("commentkey");
    let comment = $(`#post-reply`).val();
    
    if(activeID>0){
        newReply={
            content: comment,
            creationDate: moment().format("l"),
            creationTime: moment().format("LT"),
            post: postId,
            userId: activeID,
            replyId: Date.now()
        }
        console.log(postId,comment,activeID,newReply)
        $(`#post-reply`).val("");
        saveReplies(newReply)
    }else{
        console.log("Debe loguearse para poder commentar",activeID)
        logIn=confirm('Para comentar debe iniciar sessión, ¿Desea iniciar seción ahora?')
        if(logIn){
            loadView('./views/login.html','login')
        }
    }
    
})

const printAside = () => {
    //TEMP

    
    postList = getPosts()
    $('.right-aside-wrapper').empty()
    let firstPostKey = Object.keys(postList)[4]
    //let activeUser = filterByID(activeID, getUsers())
    for (post in postList) {
        const {
            content,
            coverUrl,
            creationDate,
            creationTime,
            duration,
            likes,
            postId,
            tags,
            title,
            userId
        } = postList[post]

        if (post === firstPostKey) {
            let asideFirst =` <a class ='go-to-detail'><img class="w-100" src="${coverUrl}" alt="card-img" data-postkey="${post}"></a>

            <header class="py-3 border-bottom">
              <a href="#">
                <h3>Stories (${Object.keys(postList).length})</h3>
              </a>
            </header>`
        $('.right-aside-wrapper').prepend(asideFirst)
        } else {
            let asides = `<a href="#" class="go-to-detail" >
            <div class="py-3 px-3 border-bottom"  data-postkey="${post}">
              ${title}
            </div>
          </a>`
        $('.right-aside-wrapper').append(asides)
        }
    }
    let asideButtons = `<div class="py-4 d-flex flex-column">
    <button type="button" class="btn btn-blue mb-3 mx-auto w-75">
      Share your story
    </button>
    <button type="button" class="btn btn-grey mx-auto w-75">See all posts</button>
  </div>`
    $('.right-aside-wrapper').append(asideButtons)

    
}
$('.total-container').on('click', '.go-to-detail', function (event) {
    event.preventDefault()
    singlePostKey = event.target.dataset.postkey;
    //console.log("buton aside", event.target.dataset.postkey)
    loadView("./views/post.html", "post")
})
















let l = localStorage
$('.total-container').on('focusout', '#userPic' ,function(){
    l.setItem('AvtImg', $('#userPic').val())
    console.log(l.getItem('AvtImg'))
})
$('.total-container').on('focusout', '#mail' ,function(){
    l.setItem('mail', $('#mail').val())
    console.log(l.getItem('mail'))
})
$('.total-container').on('focusout', '#password' ,function(){
    l.setItem('psd', $('#password').val())
    console.log(l.getItem('psd'))
})
$('.total-container').on('focusout', '#userName' ,function(){
    l.setItem('newUsN', $('#userName').val())
    console.log(l.getItem('newUsN'))
})
$('.total-container').on('focusout', '#userNickName' ,function(){
    l.setItem('newUsNname', $('#userNickName').val())
    console.log(l.getItem('newUsNname'))
})
$('#devto-logo').on('click', '#devto-logo',function(){
    l.length != 0 ? l.setItem('ID', activeID) : null
})
