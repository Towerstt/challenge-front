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
        console.log(view)
        switch (view) {
            case "login":
                //alert("cargando login")
                $('.bttn-write').text("LOG IN")
                $('.bttn-write').attr('disabled', true)
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
                $('.bttn-write').text("LOG IN")
                $('.bttn-write').attr('disabled', false) // Checar bont+on ára login
                $('.bttn-write').click(() => {
                    loadView("./views/login.html", "login")
                })
                $('#avt').attr('src', 'https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg')
                $('.container-home').addClass('d-none')
                $('.container-login').removeClass('d-none')
                break

            case "store":
                $('.container-login').addClass('d-none')
                $('.container-home').removeClass('d-none')
                $('.bttn-write').attr('disabled', false)
                $('.bttn-write').click(() => {
                    loadView("./views/createPost.html", "createPost")
                })
                break

            case "home":
                $('.container-login').addClass('d-none')
                $('.container-home').removeClass('d-none')
                $('.bttn-write').text("Write New Post")
                $('.bttn-write').attr('disabled', false)
                $('.bttn-write').click(() => {
                    loadView("./views/createPost.html", "createPost")
                })
                break

            case "createPost":
                $('.container-login').addClass('d-none')
                $('.container-home').removeClass('d-none')
                $('.bttn-write').attr('disabled', false)
                break

            case "post":
                $('.container-login').addClass('d-none')
                $('.container-home').removeClass('d-none')
                $('.bttn-write').attr('disabled', false)
                $('.bttn-write').click(() => {
                    loadView("./views/createPost.html", "createPost")
                })
                break

            default:
                //alert("algo salió mal")
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

const filterByDate = tps => {
    let allPosts = getPosts()
    console.log(allPosts)
}


const printHome = () => {
    let allPostsToPrint = getPosts()
    let firstPostKey = Object.keys(allPostsToPrint)[0]
    let postAuthor
    for (key in allPostsToPrint){
        console.log(allPostsToPrint)
        const {content, coverUrl, creationDate, creationTime, duration, postId, tags, title, userId} = allPostsToPrint[key]
        let detalle = '#'
        let numberOfReactions = 11111111
        let numberOfComments = 22222222
        postAuthor = getAutor(userId, getUsers())  
        let allTags = tags.split(',')

        if(key === firstPostKey){
            let principalPost = 
            `<div class="post w-100 border bg-white rounded bg-white mt-2 shadow-sm">
                <!--Imagen principal-->
                <a href="${detalle}">
                    <img class="w-100" src="${coverUrl}" alt="post-img" />
                </a>
                <div class="d-flex mt-3">
                <!--Imagen de perfil-->
                    <img src=${postAuthor.userPic} alt="" class="rounded-circle profile-p ml-3" />
                    <div class="author-info ml-2">
                    <p>${postAuthor.userName}</p>
                    <p>${creationDate}${creationTime}</p>
                    </div>
                </div>
                <a href="${detalle}">
                    <h1 class="ml-3 font-weight-bold">${title}</h1>
                </a>
                <ul class="h-post d-flex w-100 flex-wrap category-wrapper">
                    <li><a href="#">Primer Tag de Prueba</a></li>
                </ul>
                <div class="post-interactions d-flex justify-content-between align-items-center w-md-25">
                    <!--footer del post principal-->
                    <div class="interactions d-flex">
                        <div>
                            <img src="Images/heart2.svg" alt="like" />
                            <span>${numberOfReactions}</span>
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
                        <button class="ml-2 btn btn-grey">Save</button>
                    </div>
                </div>
            </div>`
            for(i=0; i<allTags.length-1;i++){
                $('.categroy-wrapper').append(`<li><a href="#">${allTags[i]}</a></li>`)
            }
            $('.post-container').prepend(principalPost)
        }
        else{
            let secondaryPosts = 
        `<div class="post rounded mt-2 bg-white shadow-sm">
            <!--Imagen principal-->
            <div class="d-flex mt-3">
                <!--Imagen de perfil-->
                <img src=${postAuthor.userPic} alt="" class="rounded-circle profile-p ml-3" />
                <div class="author-info ml-2">
                    <p>${postAuthor.userName}</p>
                    <p>${creationDate}${creationTime}</p>
                </div>
            </div>
            <a href="#">
                <h1 class="ml-3 font-weight-bold">${title}</h1>
            </a>
            <ul class="h-post d-flex w-100 flex-wrap">
                <li><a href="#">Primer Tag de Prueba</a></li>

            </ul>
            <div class="post-interactions d-flex justify-content-between align-items-center">
                <div class="interactions d-flex">
                    <div>
                        <img src="Images/heart2.svg" alt="like" />
                        <span>${numberOfReactions}</span>
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
                    <button class="ml-2 btn btn-grey">Save</button>
                </div>
            </div>
        </div>`
        for(i=0; i<allTags.length-1;i++){
            $('.categroy-wrapper').append(`<li><a href="#">${allTags[i]}</a></li>`)
        }
        $('.post-container').append(secondaryPosts)
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

principalContainer.on("click", "#saveAccount",() => {
    getNewAccount()
})





