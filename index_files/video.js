// Fonction pour bloquer le chargement des vidéos

// Appeler la fonction pour bloquer le chargement des vidéos

function getVideoResolution() {
  const width = window.innerWidth;
  console.log(width);
  if (width <= 640) {
    // Petite résolution pour mobiles
    return "_360p.webm";
  } else if (width <= 854) {
    // Résolution moyenne pour téléphone
    return "_480p.webm"; // Utilise déjà cette version
  } else if (width <= 1280) {
    // Résolution pour tablette
    return "_720p.webm"; // À remplacer si disponible
  } else {
    // Résolution par défaut pour Laptop
    return "_1080p.webm"; // À remplacer si disponible
  }
}
function replaceVideosWithWebm(videos) {
  //   let videos = document.querySelectorAll(".gallery-video");

  // Vérification si l'appareil est mobile
  if (isMobile()) {
    var videos = document.querySelectorAll("video");
    videos.forEach(function (video) {
      video.src = video.dataset.src;
      console.log(video);
      video.load();
    });
    videos.forEach((video) => {
      if (video.readyState === 4) {
        console.log("La video est bien chargee");
        return;
      }
    });
  } else {
    // const resolution = getVideoResolution();
    // console.log(resolution);
    // if (resolution !== "_360p.webm") {
    //   videos.forEach((video) => {
    //     let src = video.getAttribute("src");
    //     let newSrc = src.replace("_360p.webm", resolution);
    //     video.setAttribute("src", newSrc);
    //   });
    // }
  }
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
// window.addEventListener("load", replaceVideosWithWebm);
