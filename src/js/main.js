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
    return dbPosts;
};

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
$(document).ready(function () {
    loadView("./views/landing.html", "landing")
    
})
$('.bttn-write').click(() => {
    loadView('./views/createPost.html')
})

const loadView = (url, view) => {
    principalContainer.load(url, () => {
        switch (view) {
            case "login":
                $('.bttn-login').addClass('d-none')
                $('.bttn-write').removeClass('d-sm-inline')
                $('#avt').attr('src', 'https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg')
                $('.container-home').addClass('d-none')
                $('.container-login').removeClass('d-none')
                $('.checkuser').click((event) => {
                    console.log("HOLA")
                    event.preventDefault()
                    activeUser = checkUserExist()
                })
                break
            case "createUser":
                    //alert("cargando user")
                    $('.bttn-write').text("LOG IN")
                    $('.bttn-write').attr('disabled', true)
                    $('#avt').attr('src', 'https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg')
                    $('.container-home').addClass('d-none')
                    $('.container-login').removeClass('d-none')
                    /*$("#saveAccount").click(()=>{
                        saveUsers(newAccount)
                        loadView("./views/home.html", "home")
                    })*/

                    break
            case "landing":
                $('.bttn-login').removeClass('d-none')
                $('.bttn-write').removeClass('d-sm-inline')
                $('.bttn-login').click(() => {
                    loadView("./views/login.html", "login")
                })
                $('#avt').attr('src', 'https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg')
                $('.container-home').addClass('d-none')
                $('.container-login').removeClass('d-none')
                printHome(getPosts())
                printTags()
                break

            case "store":
                $('.container-login').addClass('d-none')
                $('.container-home').removeClass('d-none')
                $('.bttn-login').addClass('d-none')
                $('.bttn-write').addClass('d-sm-inline')
                $('.bttn-write').click(() => {
                    loadView("./views/createPost.html", "createPost")
                })
                break

            case "home":
                $('.container-login').addClass('d-none')
                $('.container-home').removeClass('d-none')
                $('.bttn-login').addClass('d-none')
                $('.bttn-write').addClass('d-sm-inline')
                $('.bttn-write').click(() => {
                    loadView("./views/createPost.html", "createPost")
                })
                printHome(getPosts())
                printTags()
                break

            case "createPost":
                $('.container-login').addClass('d-none')
                $('.container-home').removeClass('d-none')
                $('.bttn-login').addClass('d-none')
                $('.bttn-write').removeClass('d-sm-inline')
                break

            case "post":
                $('.container-login').addClass('d-none')
                $('.container-home').removeClass('d-none')
                $('.bttn-login').addClass('d-none')
                $('.bttn-write').addClass('d-sm-inline')
                $('.bttn-write').click(() => {
                    loadView("./views/createPost.html", "createPost")
                })
                break

            default:
                alert("algo salió mal")
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
        let numberOfReactions = 11111111
        let numberOfComments = 22222222
        postAuthor = getAutor(userId, getUsers())
        if (key === firstPostKey) {
            let principalPost =
                `<div class="post w-100 border bg-white rounded bg-white mt-2 mb-2 shadow-sm">
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
                    <h1 class="ml-3 font-weight-bold">${title}</h1>
                </a>
                <ul class="h-post d-flex w-100 flex-wrap category-wrapper" data-postId = ${postId}>
                    <li><a href="#">Primer Tag de Prueba</a></li>
                </ul>
                <div class="post-interactions d-flex justify-content-between align-items-center w-md-25">
                    <!--footer del post principal-->
                    <div class="interactions d-flex">
                        <div>
                            <img src="Images/heart2.svg" alt="like" />
                            <span>${likes}</span>
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
                `<div class="post rounded mt-2 bg-white mb-2 shadow-sm">
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
                <h1 class="ml-3 font-weight-bold">${title}</h1>
            </a>
            <ul class="h-post d-flex w-100 flex-wrap category-wrapper" data-postId = ${postId}>
                <li><a href="#">Primer Tag de Prueba</a></li>

            </ul>
            <div class="post-interactions d-flex justify-content-between align-items-center">
                <div class="interactions d-flex">
                    <div>
                        <img src="Images/heart2.svg" alt="like" />
                        <span>${likes}</span>
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
        }
    }
}

const printTags = () => {
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
}


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
  
  $("#inputSearch").keypress(function(e) {
    if(e.which == 13) {
       let searchresult = searchPosts(this.value,getPosts())
       console.log(searchresult)
       //$('total-container .post-container').empty()
       printHome(searchresult)
       //despues pintar otra vez los posts filtrados
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
        $('.post-wrapper .post-tags').append(`<span class="badge ${tag.replace("#", "").toLowerCase()} mr-2 p-badge font-weight-normal text-size-icon"
        >${tag}</span>`)
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





$('.total-container').on('click','#btn-feed',function(event){
    printHome(getPosts())
})
$('.total-container').on('click','#btn-week',function(event){
    printHome(filterByDate(7, 'days'))
})
$('.total-container').on('click','#btn-month',function(event){
    printHome(filterByDate(1, 'month'))
})
$('.total-container').on('click','#btn-year',function(event){
    printHome(filterByDate(1, 'year'))
})
$('.total-container').on('click','#btn-latest',function(event){
    printHome(filterByDate(7, 'days'))
})
