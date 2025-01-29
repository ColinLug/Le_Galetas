document.querySelector("#buttonsound").onclick = function() {
    document.querySelector("#allowsound").style.display = "none";
    audio = document.createElement("audio");
    audio.setAttribute("src", "assets/sound/air-ambience-234180.mp3");
    audio.setAttribute("loop", true);
    audio.setAttribute("autoplay", true);
    audio.volume = 0.5;
}
const scene = document.querySelector("a-scene");
const camera = document.querySelector("a-camera")
function dustDisplay(){
    let loadedSpheres = 0;  // Compteur pour savoir combien de sphères sont chargées (en lien avec la requête ChatGPT ci-dessous)
    const totalSpheres = 1400;  // Nombre total de sphères à charger (en lien avec la requête ChatGPT ci-dessous)
    let creer_sphere = ()=>{
        sphere = document.createElement("a-sphere")
        sphere.setAttribute("radius", THREE.MathUtils.randFloat(0.002,0.007))
        sphere.setAttribute("segments-width", "4")
        sphere.setAttribute("segments-height", "5")
        sphere.setAttribute("color", "#D0CFCF")
        sphere.setAttribute("class", "dust")
        sphere.setAttribute("position", { x: THREE.MathUtils.randFloat(-5,15), y: THREE.MathUtils.randFloat(0,8), z: THREE.MathUtils.randFloat(-10,5) });
        /*Cette partie a été générée par ChatGPT
        Prompt: "Après un petit console.log, je remarque que la fonction animate récupère la position avant que celle-ci ne soit initiée 
        (affiche d'abord 0 0 0 puis la valeur correcte après le chargement complet de la scène).
        Comment faire pour que la fonction animate attende le chargement complet des sphères ?)"
        */
        sphere.addEventListener('loaded', () => {
            loadedSpheres++;  // Incrémenter le compteur quand une sphère est chargée
            // Si toutes les sphères sont chargées, démarrer l'animation
            if (loadedSpheres === totalSpheres) {
                console.log('Toutes les sphères sont chargées. Lancer l\'animation.');
                animate();  // Lancer l'animation
            }
        });
        // ||||||||||||||||||||
        return sphere;
    }
    for(let i=0; i<1400; i++){
        let ma_sphere = creer_sphere();
        scene.appendChild(ma_sphere);
    }
    function animate(){
        let spheres = document.querySelectorAll(".dust")
        spheres.forEach((element) =>{
            let pos = element.getAttribute('position');
            pos.y -= 0.0004;
            if(pos.y<0){
                pos.y=8
                if(pos.z>0){
                    pos.z=-10
                }
            }
            pos.z += 0.0001;
            element.setAttribute("position", { x: pos.x, y: pos.y, z: pos.z});
        });
        requestAnimationFrame(animate);
    }
}
dustDisplay();
let trapdoor = document.querySelector("#trapdoor")
trapdoor.addEventListener("click", function() {
    let rot_x = trapdoor.getAttribute("rotation").x
    console.log(rot_x)
    if(rot_x == 90){
        console.log("salut")
        trapdoor.setAttribute("rotation", {x: 180, y: 0, z:0})
        trapdoor.setAttribute("position", {x:-2.5, y:0.6, z:0.8})
        document.querySelectorAll(".renfort").forEach((element)=>{
            element.setAttribute("rotation", {x: 90, y: 0, z:0})
            let nw_pos_x = element.getAttribute("position").x
            element.setAttribute("position", {x: nw_pos_x , y: 0.85, z: 0.85})
        })
        trapdoor.setAttribute("sound", "src:url(assets/sound/door-43633.mp3); autoplay:true; volume:2")
    }
    else{
        trapdoor.setAttribute("rotation", {x: 90, y: 0, z:0})
        trapdoor.setAttribute("position", {x:-2.5, y:0.15, z:0})
        document.querySelectorAll(".renfort").forEach((element)=>{
            element.setAttribute("rotation", {x: 0, y: 0, z:0})
            let nw_pos_x = element.getAttribute("position").x
            element.setAttribute("position", {x: nw_pos_x , y: 0.21799, z: -0.25444})
        })
        trapdoor.setAttribute("sound", "src:url(assets/sound/door-close-79921.mp3); autoplay:true; volume:2")
    }
})


