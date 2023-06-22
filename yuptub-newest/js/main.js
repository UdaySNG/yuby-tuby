class API {
  data;

  async getData(url) {
    let dataToBeReturned = {};
    await fetch(url).then(
      (response) => {
        return response.json();
      }
    ).then((data) => {
      dataToBeReturned = data.videos;
    });
    return dataToBeReturned;

  }

}

class App {
  switcher;
  main;
  api;
  data;
  constructor() {
    this.api = new API();
    this.api.getData("../data/data.json").then((data) => {
      this.data = data;
      this.switcher = new Switcher(this, data);
    });
  }
}


class Switcher {
  yubtub;
  cleaner;
  app;
  data;
  default = 0;

  constructor(app, data) {
    this.app = app;
    this.data = data;

    this.yubtub = new Yubtub(this.app, this.data, this.data[0]);
    this.cleaner = new Cleaner();
  }

  switch(id) {
    this.dataobject = this.data[id];
    this.yubtub.dataobject = this.dataobject;
    this.yubtub.main = new Main(this.yubtub, this.dataobject);
  }
}


class Cleaner {
  clean(whereToClean) {
    document.querySelector(whereToClean).innerHTML = "";
  }
}

class Yubtub {
  aside;
  main;
  renderer;
  data;
  dataobject;
  app;
  comments;
  constructor(yubtub, data, dataobject) {
    this.data = data;
    this.yubtub = yubtub;
    this.dataobject = dataobject;
    this.app = app;

    this.renderer = new Renderer();
    this.header = new Header(this, data);
    this.main = new Main(this, dataobject);
    this.aside = new Aside(this, data);
    //this.comments = new Comments(this, this.data);
    //this.video = new Video(this, data);

  }
}

class Renderer {
  render(whereToRender, whatToRender) {
    document.querySelector(whereToRender).appendChild(whatToRender);
  }
}

class Header {
  htmlElement;
  textElement;
  iconElement;
  yubtub;

  constructor(yubtub, data) {
    this.yubtub = yubtub;
    this.data = data;
    this.htmlElement = document.createElement("header");
    this.htmlElement.classList = "header";
    this.textElement = document.createElement("h2");
    this.textElement.innerHTML = "TWITCH";
    this.textElement.classList = "title__text";
    this.iconElement = document.createElement("i");
    this.iconElement.classList = "fa-brands fa-twitch";

    this.yubtub.renderer.render("body", this.htmlElement);
    this.yubtub.renderer.render("header", this.textElement);
    this.yubtub.renderer.render("h2", this.iconElement);

  }
}


class Main {
  yubtub;
  htmlElement;
  videoElement;
  iconElement;
  videowrapper;
  constructor(yubtub, dataobject) {

    this.yubtub = yubtub;
    this.dataobject = dataobject;
    this.htmlElement = document.createElement("main");
    this.htmlElement.classList = "main";

    this.videoElement = this.createVideoElement(dataobject);
    this.videowrapper = document.createElement("div");
    this.videowrapper.classList = "video__wrapping";


    this.profileElement = document.createElement("img");
    this.profileElement.classList = "profile__sizing";

    this.titleElement = document.createElement("h3");
    this.titleElement.classList = "title__size";
    this.iconElement = document.createElement("i");
    this.iconElement.classList = "fa-solid fa-star star__style__first";

    this.iconElementSecond = document.createElement("i");
    this.iconElementSecond.classList = "fa-solid fa-star star__style__second star__icon";

    this.iconElementShare = document.createElement("i");
    this.iconElementShare.classList = "fa-sharp fa-solid fa-share share__icon";


    this.actionElement = document.createElement("figure");
    this.actionElement.classList = "figure__element";

    this.yubtub.renderer.render("body", this.htmlElement);
    this.yubtub.renderer.render("main", this.videowrapper);
    this.yubtub.renderer.render("main", this.iconElement);
    this.yubtub.renderer.render("main", this.iconElementSecond);

    this.yubtub.renderer.render(".video__wrapping", this.videoElement);
    this.yubtub.renderer.render(".video__wrapping", this.iconElement);
    this.yubtub.renderer.render(".video__wrapping", this.actionElement);
    this.yubtub.renderer.render(".figure__element", this.iconElementSecond);
    this.yubtub.renderer.render(".figure__element", this.iconElementShare);
    this.yubtub.renderer.render(".figure__element", this.profileElement);


  }

  createVideoElement(dataobject) {
    const videoElement = document.createElement("video");
    videoElement.classList = "main__video";
    videoElement.src = "./videos/" + dataobject.video;
    videoElement.controls = true;
    videoElement.addEventListener("click", () => {
      //this.yubtub.nextVideo.videoClicked(dataobject);
    });
    return videoElement;
  }

  updateVideo(dataobject) {
    this.videoElement.src = "./videos/" + dataobject.video;
    this.videoElement.removeEventListener("click", this.videoClickHandler);
    this.videoElement.addEventListener("click", () => {
      //this.yubtub.nextVideo.videoClicked(dataobject);
    });

  }

}

class Video {
  yubtub;
  videoElement;
  iconStarElement;
  comments;
  main;
  constructor(main, dataobject) {

    this.main = main;
    this.dataobject = dataobject;
    //console.log(dataobject);
    console.log("making comments");
    this.videowrapper = document.createElement("div");
    this.videowrapper.classList = "video__wrapper";

    this.videoElement = document.createElement("video");
    this.videoElement.classList = "main__video";
    this.videoElement.src = "./videos/" + dataobject.video;
    this.videoElement.controls = true;

    //this.videowrapper.appendChild(this.iconStarElement);
    console.log(this.main, this.main.yubtub);
    this.yubtub.renderer.render("main", this.videowrapper);
    this.yubtub.renderer.render("main", this.videoElement);

    this.videoElement.addEventListener("click", this.videoClicked);




  }

}


class Aside {
  yubtub;
  nextVideo;
  htmlElement;

  constructor(yubtub, data) {
    this.yubtub = yubtub;
    this.data = data;

    this.htmlElement = document.createElement("aside");
    this.htmlElement.classList = "aside__side";

    this.yubtub.renderer.render("main", this.htmlElement);
    this.nextVideo = new NextVideo(this, this.data);
  }
}



class NextVideo {
  aside;
  htmlElements;

  constructor(aside, data) {
    this.aside = aside;
    this.data = data;
    this.htmlElements = [];

    for (let i = 0; i < this.data.length; i++) {
      const videoElement = document.createElement("video");
      videoElement.src = "./videos/" + this.data[i].video;

      videoElement.classList = "aside_img";
      videoElement.controls = false;  //dit zorgt er voor dat je niet die slider ziet in de kleine videos in de aside 
      videoElement.muted = true;  //dit zorgt er voor dat als je over de videos in de aside hovert dat er geen geluid in komt, mijn videos zijn sowieso al stil maar op eentje na 


      videoElement.addEventListener("mouseover", () => {    //dit is een manier om de aside videos te laten afspelen zonder dat je er perse hoeft te drukken en in de main video te kijken, dit heeft youtube ook gehad
        videoElement.play();
      });

      videoElement.addEventListener("mouseout", () => {
        videoElement.pause();
        videoElement.currentTime = 0;
      });

      videoElement.addEventListener("click", () => {
        this.videoClicked(data[i]);
      });

      this.htmlElements.push(videoElement);
      this.aside.yubtub.renderer.render("aside", videoElement);
    }
  }

  videoClicked = (data) => {
    this.aside.yubtub.main.updateVideo(data);
  };
}



// class Comments {
//   main;
//   HTMLElement;
//   comment;
//   data;
//   constructor(yubtub, data) {
//     this.yubtub = yubtub;
//     this.data = data;
//     this.HTMLWrapper = document.createElement("div")
//     this.HTMLWrapper.classList = "main__ulwrapper";
//     this.HTMLElement = document.createElement("ul");
//     this.HTMLElement.classList = "main__comments";


//     //this.comment = new Comment(this, this.data);
//     this.yubtub.renderer.render("main", this.HTMLWrapper)
//     this.yubtub.renderer.render("main", this.HTMLElement);
//   }
// }



// class Comment {
//   comments;
//   HTMLElement;
//   data;
//   constructor(incommingComments, incommingData) {

//     this.comments = incommingComments;
//     this.data = incommingData;
//     this.commentsArray = [];
//     this.inputElement = document.createElement("input");
//     this.inputElement.classList = "main__input";
//     this.inputElement.placeholder = "Plaats hier je comment.... ";
//     this.buttonElement = document.createElement("button");
//     this.buttonElement.classList = "main__button";
//     this.buttonElement.innerText = "Verstuur";
//     this.buttonElement.addEventListener("click", this.addComment.bind(this));
//     this.comments.main.yubtub.renderer.render(this.inputElement, this.comments.HTMLWrapper);
//     this.comments.main.yubtub.renderer.render(this.buttonElement, this.comments.HTMLWrapper);
//   }

//   addComment() {

//     this.commentText = this.inputElement.value.trim();
//     if (this.commentText !== "") {
//       this.HTMLElement = document.createElement("li");
//       this.HTMLElement.classList = ("main__comment")
//       this.HTMLElement.innerText = this.commentText;
//       this.comments.main.yubtub.renderer.render(this.HTMLElement, this.comments.HTMLElement);

//       this.profile = document.createElement("article");
//       this.profile.classList = "main__comment__profile";


//       this.commentsArray.push(this.commentText);
//       this.inputElement.value = "";
//       this.inputElement.placeholder = "Plaats hier je comment....";

//     }
//   }
// }




const app = new App();
console.log(app);