var globalFontLoader
var globalImageLoader
var globalStartingHand

const cardDrawingDefaults = {
    template: {
        width: 300,
        height: 420
    },
    character: {
        width: 256,
        height: 256,
        x: 22,
        y: 34
    },
    dimension: {
        width: 50,
        height: 50,
        x: 248,
        y: 259
    },
    speed: {
        x: 33,
        y: 34,
        fontSize: 36
    },
    attack: {
        x: 36,
        y: 385,
        fontSize: 36
    },
    defense: {
        x: 268,
        y: 380,
        fontSize: 36
    },
    name: {
        x: 150,
        y: 288,
        fontSize: 24
    },
    description: {
        x: 40,
        y: 312,
        fontSize: 12
    },
    primaryAbility: {
        x: 150,
        y: 378,
        fontSize: 12
    },
    secondaryAbility: {
        x: 150,
        y: 398,
        fontSize: 12
    },
    topbar: {
        x: 150,
        y: 36
    }
}

function drawCard(cardX, cardY, cardJSON) {

}

function fontsPreloaded(event) {
    console.log("Fonts preloaded")
    var imagePreloadManifest = []
        //var arrayPreloadImages

    console.log("Preloading images...");
    imagePreloadManifest = imagePreloadManifest.concat(
            globalPreloadImages.characters.map(element => ({ src: "characters/" + element + ".png", id: "characters." + element })),
            globalPreloadImages.dimensions.map(element => ({ src: "dimensions/" + element + ".png", id: "dimensions." + element })),
            globalPreloadImages.card_templates.map(element => ({ src: "card_templates/" + element + ".png", id: "card_templates." + element })))
        //    arrayPreloadImages.forEach((element) => {
        //        imagePreloadManifest.push({ src: "characters/" + element + ".png", id: "characters." + element })
        //    });
        //console.log(arrayPreloadImages);
        /*
            console.log("Preloading dimensions images...");

            arrayPreloadImages = globalPreloadImages.dimensions
            arrayPreloadImages.forEach((element) => {
                imagePreloadManifest.push({ src: "dimensions/" + element + ".png", id: "dimensions." + element })
            });
            //console.log(imagePreloadManifest);

            console.log("Preloading card templates images...");
            arrayPreloadImages = globalPreloadImages.card_templates
            arrayPreloadImages.forEach((element) => {
                imagePreloadManifest.push({ src: "card_templates/" + element + ".png", id: "card_templates." + element })
            });
            //console.log(imagePreloadManifest);
        */

    /*    
        imageManifest = [{
                src: "card_templates/special.png",
                id: "special"
            }, {
                src: "characters/baaabb.png",
                id: "baaabb"
            }

        ];*/
    globalImageLoader = new createjs.LoadQueue(true, "images/");
    globalImageLoader.on("complete", imagesPreloaded);
    globalImageLoader.loadManifest(imagePreloadManifest, true);
    //console.log("Image load started")
    //console.log(loader)
}

function imagesPreloaded(event) {
    console.log("Everything preloaded. Starting drawing...")

}



function drawStartingHand(startingHandJSON) {
    var startingHandJSONParsed = JSON.parse(startingHandJSON)
    if (startingHandJSONParsed.result == "ok") {
        globalStartingHand = startingHandJSONParsed.data
        globalPreloadImages = startingHandJSONParsed.preload
        console.log("Preloading fonts...");

        globalFontLoader = new createjs.FontLoader({
            src: "fonts/Postamt.ttf.woff"
        }, true);
        globalFontLoader.on("complete", fontsPreloaded);
        globalFontLoader.load();
    } else {
        console.log("Can't get starting hand")
    }
}