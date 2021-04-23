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
    console.log(postKey)
    console.log(newVal)
    $.ajax({
        method:"PATCH",
        data:JSON.stringify({[newKey]:newVal}),
        url:`https://ajaxclass-1ca34.firebaseio.com/11g/teamd/posts/${postKey}.json`,
        success: response => {
            console.log( response )
            getPosts()
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

//-------------LÓGICA ------------
const getAutor = (userId, users) => {
    let newUser = {};
    //let users = getUsers();
    for (ky in users) {
        if (users[ky].userId == userId) {
            newUser["userName"] = users[ky].userName;
            newUser["userPic"] = users[ky].userPic;
            newUser["userId"] = users[ky].userId;
        }
    }
    return newUser;
};

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
                $('.bttn-login').addClass('d-sm-inline')
                $('.bttn-write').removeClass('d-sm-inline')
                $('.bttn-createAccount').addClass('d-sm-inline')
                $('#avt').attr('src', 'https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg')
                $('.container-home').addClass('d-none')
                $('.container-login').removeClass('d-none')
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
                $('.container-home').addClass('d-none')
                $('.container-login').removeClass('d-none')
                $("#saveAccount").click(()=>{
                    saveUsers(newAccount)
                    loadView("./views/home.html", "home")
                })
                    break
            case "landing":
                $('.bttn-login').addClass('d-sm-inline')
                $('.bttn-write').removeClass('d-sm-inline')
                $('.bttn-createAccount').addClass('d-sm-inline')
                $('.bttn-login').click(() => {
                    loadView("./views/login.html", "login")
                })
                $('#avt').attr('src', 'https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg')
                $('.container-home').addClass('d-none')
                $('.container-login').removeClass('d-none')
                printHome(getPosts())
                
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
                $('.container-login').addClass('d-none')
                $('.container-home').removeClass('d-none')
                $('.bttn-login').removeClass('d-sm-inline')
                $('.bttn-write').addClass('d-sm-inline')
                $('.bttn-createAccount').removeClass('d-sm-inline')
                $('.bttn-write').click(() => {
                    loadView("./views/createPost.html", "createPost")
                })
                printHome(getPosts())
                
                break

            case "createPost":
                $('.bttn-login').removeClass('d-sm-inline')
                $('.bttn-write').removeClass('d-sm-inline')
                $('.bttn-createAccount').removeClass('d-sm-inline')
                $('.container-login').addClass('d-none')
                $('.container-home').removeClass('d-none')
                break

            case "post":
                $('.container-login').addClass('d-none')
                $('.container-home').removeClass('d-none')
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
        console.log(week)
        let newDate = creationDate.split('/')
        creationDateToFilter = moment(newDate.reverse().join('-'))
        difHoy = soloporhoy.diff(week,'days')
        difPost = soloporhoy.diff(creationDateToFilter,'days')
        console.log('al día de hoy ' + difHoy + 'contra el post ' + difPost)
        difPost <= difHoy ? postFilteredByTime = {...postFilteredByTime, [k]: allPosts[k]} : null
        console.log(postFilteredByTime)
    }
    console.log(postFilteredByTime)
    return postFilteredByTime

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
        let numberOfComments = 22222222
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
                            <span>${numberOfComments}</span>
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
                        <span>${numberOfComments}</span>
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

    $("#newAccount input, #newAccount textarea").each(function (){
        let property =this.id
        let value = this.value
        newAccount = {...newAccount, [property]:value}   
    })

    newAccount = {...newAccount, userId: new Date().getTime()}
    console.log(newAccount)
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
            }else{
                printHome(allPosts)
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
            
    $(".post-wrapper .post-user-avatar").attr("src", activeUser.userPic);
    $(".btn-save-replie").attr("data-commentkey", data.postId);
    //printReplies(data.postId);
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
    dataContainer.each(function(){
        let containerKey = this.id
        let containerValue = this.value
        newPostData = {...newPostData, [containerKey]: containerValue}
    })
    checkBoxContainer.each(function(){
        let newValue = '#' + this.value
        tagArray.push(newValue)
    })
    newPostData = {...newPostData, tags: tagArray, userId : activeID, creationDate: moment().format('DD/MM/YYYY'), creationTime: moment().format('h:mm'), postId : Date.now()}
    savePosts(newPostData)
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
    location.reload()

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



