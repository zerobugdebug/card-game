var globalFontLoader
var globalImageLoader
var globalStartingHand
var globalContainerGameField

const defaultCardScale = 0.8
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
        width: 40,
        height: 40,
        x: 251,
        y: 262
    },
    speed: {
        x: 33,
        y: 34,
        font: "32px canadian"
    },
    power: {
        x: 36,
        y: 385,
        font: "32px canadian"
    },
    defense: {
        x: 268,
        y: 385,
        font: "32px canadian"
    },
    name: {
        x: 150,
        y: 288,
        font: "22px Georgia"
    },
    description: {
        x: 30,
        y: 330,
        font: "22px Arial"
    },
    primaryAbility: {
        x: 150,
        y: 375,
        font: "18px Arial"
    },
    secondaryAbility: {
        x: 150,
        y: 398,
        font: "18px Arial"
    },
    topbar: {
        x: 150,
        y: 34,
        font: "18px Georgia"
    }
}

function drawCard(cardX, cardY, cardJSON) {
    var containerCard = new createjs.Container();
    containerCard.x = cardX
    containerCard.y = cardY
        //            containerCard.width = templateCard.width;
        //containerCard.height = templateCard.height;
        //console.log(containerCard);

    //var characterImage = new Image();
    //characterImage.src = "images/characters/baaabb.png";
    //console.log(characterImage);
    //characterImage.width
    //console.log("card_templates." + globalImageLoader.getResult(cardJSON.rarity))
    bitmapCharacter = new createjs.Bitmap(globalImageLoader.getResult("characters." + cardJSON.imageId));
    //console.log(bitmapCharacter)
    containerCard.addChild(bitmapCharacter);

    bitmapCharacter.x = cardDrawingDefaults.character.x;
    bitmapCharacter.y = cardDrawingDefaults.character.y;

    bitmapCharacter.scale = bitmapCharacter.originalScale = 1;
    containerCard.addChild(bitmapCharacter);
    // console.log("character." + globalImageLoader.getResult(cardJSON.imageId))
    bitmapCard = new createjs.Bitmap(globalImageLoader.getResult("card_templates." + cardJSON.rarity));
    //console.log(bitmapCard)

    bitmapCard.on("click", selectCard)

    bitmapCard.x = 0;
    bitmapCard.y = 0;

    //bitmapCard.rotation = 360 * Math.random() | 0;
    //bitmapCard.regX = bitmapCard.image.width / 2 | 0;
    //bitmapCard.regY = bitmapCard.image.height / 2 | 0;
    bitmapCard.scale = bitmapCard.originalScale = 1;
    bitmapCard.name = "bmp_1";
    bitmapCard.cursor = "pointer";
    containerCard.addChild(bitmapCard);

    var hit = new createjs.Shape();
    hit.graphics.beginFill("#000").drawRect(0, 0, cardDrawingDefaults.template.width, cardDrawingDefaults.template.height);
    //containerCard.addChild(hit);
    bitmapCard.hitArea = hit;
    bitmapCard.name = "cardHitArea"

    containerCard.scale = containerCard.originalScale = 0.5;

    bitmapDimension = new createjs.Bitmap(globalImageLoader.getResult("dimensions." + cardJSON.dimension));
    //console.log(bitmapCard)
    bitmapDimension.x = cardDrawingDefaults.dimension.x;
    bitmapDimension.y = cardDrawingDefaults.dimension.y;
    containerCard.addChild(bitmapDimension);

    console.log(bitmapDimension)

    textSpeedOutline = new createjs.Text(cardJSON.speed, cardDrawingDefaults.speed.font, "#000");
    textSpeedOutline.x = cardDrawingDefaults.speed.x;
    textSpeedOutline.y = cardDrawingDefaults.speed.y;
    textSpeedOutline.textAlign = "center"
    textSpeedOutline.textBaseline = "middle"
        //textSpeed.shadow = new createjs.Shadow("#000000", 3, 3, 3);
    textSpeedOutline.outline = 3
    containerCard.addChild(textSpeedOutline);

    textSpeed = new createjs.Text(cardJSON.speed, cardDrawingDefaults.speed.font, "#FFF");
    textSpeed.x = cardDrawingDefaults.speed.x;
    textSpeed.y = cardDrawingDefaults.speed.y;
    textSpeed.textAlign = "center"
    textSpeed.textBaseline = "middle"
        //textSpeed.shadow = new createjs.Shadow("#000000", 3, 3, 3);
        //textSpeed.outline = 2
    containerCard.addChild(textSpeed);

    textPowerOutline = new createjs.Text(cardJSON.power, cardDrawingDefaults.power.font, "#000");
    textPowerOutline.x = cardDrawingDefaults.power.x;
    textPowerOutline.y = cardDrawingDefaults.power.y;
    textPowerOutline.textAlign = "center"
    textPowerOutline.textBaseline = "middle"
        //textPower.shadow = new createjs.Shadow("#000000", 3, 3, 3);
    textPowerOutline.outline = 3
    containerCard.addChild(textPowerOutline);

    textPower = new createjs.Text(cardJSON.power, cardDrawingDefaults.power.font, "#FFF");
    textPower.x = cardDrawingDefaults.power.x;
    textPower.y = cardDrawingDefaults.power.y;
    textPower.textAlign = "center"
    textPower.textBaseline = "middle"
        //textPower.shadow = new createjs.Shadow("#000000", 3, 3, 3);
    containerCard.addChild(textPower);

    textDefenseOutline = new createjs.Text(cardJSON.defense, cardDrawingDefaults.defense.font, "#000");
    textDefenseOutline.x = cardDrawingDefaults.defense.x;
    textDefenseOutline.y = cardDrawingDefaults.defense.y;
    textDefenseOutline.textAlign = "center"
    textDefenseOutline.textBaseline = "middle"
        //textDefense.shadow = new createjs.Shadow("#000000", 3, 3, 3);
    textDefenseOutline.outline = 3
    containerCard.addChild(textDefenseOutline);

    textDefense = new createjs.Text(cardJSON.defense, cardDrawingDefaults.defense.font, "#FFF");
    textDefense.x = cardDrawingDefaults.defense.x;
    textDefense.y = cardDrawingDefaults.defense.y;
    textDefense.textAlign = "center"
    textDefense.textBaseline = "middle"
        //textDefense.shadow = new createjs.Shadow("#000000", 3, 3, 3);
    containerCard.addChild(textDefense);

    textName = new createjs.Text(cardJSON.name, cardDrawingDefaults.name.font, "#FFF");
    textName.x = cardDrawingDefaults.name.x;
    textName.y = cardDrawingDefaults.name.y;
    textName.textAlign = "center"
    textName.textBaseline = "middle"
    containerCard.addChild(textName);

    textTopbar = new createjs.Text(cardJSON.dimension, cardDrawingDefaults.topbar.font, "#FFF");
    textTopbar.x = cardDrawingDefaults.topbar.x;
    textTopbar.y = cardDrawingDefaults.topbar.y;
    textTopbar.textAlign = "center"
    textTopbar.textBaseline = "middle"
    containerCard.addChild(textTopbar);


    textDescription = new createjs.Text(cardJSON.description, cardDrawingDefaults.description.font, "#FFF");
    textDescription.x = cardDrawingDefaults.description.x;
    textDescription.y = cardDrawingDefaults.description.y;
    textDescription.textAlign = "left"
    textDescription.textBaseline = "middle"
    textDescription.lineWidth = 250
    containerCard.addChild(textDescription);

    textPrimaryAbility = new createjs.Text(cardJSON.primaryAbility, cardDrawingDefaults.primaryAbility.font, "#F00");
    textPrimaryAbility.x = cardDrawingDefaults.primaryAbility.x;
    textPrimaryAbility.y = cardDrawingDefaults.primaryAbility.y;
    textPrimaryAbility.textAlign = "center"
    textPrimaryAbility.textBaseline = "middle"
    containerCard.addChild(textPrimaryAbility);

    textSecondaryAbility = new createjs.Text(cardJSON.secondaryAbility, cardDrawingDefaults.secondaryAbility.font, "#0F0");
    textSecondaryAbility.x = cardDrawingDefaults.secondaryAbility.x;
    textSecondaryAbility.y = cardDrawingDefaults.secondaryAbility.y;
    textSecondaryAbility.textAlign = "center"
    textSecondaryAbility.textBaseline = "middle"
    containerCard.addChild(textSecondaryAbility);

    containerCard.x = cardX
    containerCard.y = cardY
    containerCard.cardJSON = cardJSON

    stage.addChild(containerCard);
    containerCard.cache(-50, -50, cardDrawingDefaults.template.width + 50, cardDrawingDefaults.template.height + 50)
    createjs.Ticker.framerate = 30;
    return containerCard
}

function selectCard(event) {
    console.log("Card selected")
        //console.log(event)
        //console.log(this)
        //console.log(this.parent)
    if (stage.getChildByName("selectedCard")) {
        console.log("already selected")
        stage.removeChild(stage.getChildByName("selectedCard"))
    }
    containerSelectedCard = drawCard(285, 100, this.parent.cardJSON)
    containerSelectedCard.scale = 1
    containerSelectedCard.name = "selectedCard"
        //console.log(stage)
    console.log(containerSelectedCard)
    cardHitArea = containerSelectedCard.getChildByName("cardHitArea")
    console.log(cardHitArea)
    cardHitArea.removeAllEventListeners()

    //containerSelectedCard.removeChildAt(2)

    textDefenseIncreaseBackground = new createjs.Shape();
    textDefenseIncreaseBackground.graphics.setStrokeStyle(1);
    textDefenseIncreaseBackground.graphics.beginStroke("#000000");
    textDefenseIncreaseBackground.graphics.beginFill("green").drawCircle(0, 0, 15);
    textDefenseIncreaseBackground.x = cardDrawingDefaults.defense.x - 25;
    textDefenseIncreaseBackground.y = cardDrawingDefaults.defense.y;
    containerSelectedCard.addChild(textDefenseIncreaseBackground);

    textDefenseIncreaseOutline = new createjs.Text("+", cardDrawingDefaults.defense.font, "#000");
    textDefenseIncreaseOutline.x = cardDrawingDefaults.defense.x - 25;
    textDefenseIncreaseOutline.y = cardDrawingDefaults.defense.y;
    textDefenseIncreaseOutline.textAlign = "center"
    textDefenseIncreaseOutline.textBaseline = "middle"
        //textDefense.shadow = new createjs.Shadow("#000000", 3, 3, 3);
    textDefenseIncreaseOutline.outline = 3
    containerSelectedCard.addChild(textDefenseIncreaseOutline);

    textDefenseIncrease = new createjs.Text("+", cardDrawingDefaults.defense.font, "#FFF");
    textDefenseIncrease.x = cardDrawingDefaults.defense.x - 25;
    textDefenseIncrease.y = cardDrawingDefaults.defense.y;
    textDefenseIncrease.textAlign = "center"
    textDefenseIncrease.textBaseline = "middle"
        //textDefense.shadow = new createjs.Shadow("#000000", 3, 3, 3);
    containerSelectedCard.addChild(textDefenseIncrease);

    textDefenseDecreaseBackground = new createjs.Shape();
    textDefenseDecreaseBackground.graphics.setStrokeStyle(1);
    textDefenseDecreaseBackground.graphics.beginStroke("#000000");
    textDefenseDecreaseBackground.graphics.beginFill("red").drawCircle(0, 0, 15);
    textDefenseDecreaseBackground.x = cardDrawingDefaults.defense.x + 25;
    textDefenseDecreaseBackground.y = cardDrawingDefaults.defense.y;
    containerSelectedCard.addChild(textDefenseDecreaseBackground);

    textDefenseDecreaseOutline = new createjs.Text("-", cardDrawingDefaults.defense.font, "#000");
    textDefenseDecreaseOutline.x = cardDrawingDefaults.defense.x + 25;
    textDefenseDecreaseOutline.y = cardDrawingDefaults.defense.y;
    textDefenseDecreaseOutline.textAlign = "center"
    textDefenseDecreaseOutline.textBaseline = "middle"
        //textDefense.shadow = new createjs.Shadow("#000000", 3, 3, 3);
    textDefenseDecreaseOutline.outline = 3
    containerSelectedCard.addChild(textDefenseDecreaseOutline);

    textDefenseDecrease = new createjs.Text("-", cardDrawingDefaults.defense.font, "#FFF");
    textDefenseDecrease.x = cardDrawingDefaults.defense.x + 25;
    textDefenseDecrease.y = cardDrawingDefaults.defense.y;
    textDefenseDecrease.textAlign = "center"
    textDefenseDecrease.textBaseline = "middle"
        //textDefense.shadow = new createjs.Shadow("#000000", 3, 3, 3);
    containerSelectedCard.addChild(textDefenseDecrease);







    containerSelectedCard.cache(-50, -50, cardDrawingDefaults.template.width + 50, cardDrawingDefaults.template.height + 50)

    cardHitArea.on("click", deselectCard)
    stage.update()
}

function deselectCard(event) {
    console.log("Card deselected")
        //console.log(event)
        //console.log(this)
    console.log(this.parent)
    console.log(this.parent.parent)
    stage.removeChild(this.parent)
    stage.update()
}

function fontsPreloaded(event) {
    console.log("Fonts preloaded")
    var imagePreloadManifest = []
        //var arrayPreloadImages

    console.log("Preloading images...");
    imagePreloadManifest = imagePreloadManifest.concat(
            globalPreloadImages.characters.map(element => ({ src: "characters/" + element + ".png", id: "characters." + element })),
            globalPreloadImages.dimensions.map(element => ({ src: "dimensions/" + element + ".png", id: "dimensions." + element })),
            globalPreloadImages.card_templates.map(element => ({ src: "card_templates/" + element + ".png", id: "card_templates." + element }))
        )
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
        //console.log(globalStartingHand);
        //console.log(canvas)
        //console.log(stage)
        //console.log("fontloader:")
        //console.log(globalFontLoader)
        //console.log(globalImageLoader)
    globalStartingHand.forEach((element, index) => {
        console.log(element, index)
        drawCard(20 + index * 170, 50, element)
    });
    stage.update()
}



function drawStartingHand(startingHandJSON) {
    var startingHandJSONParsed = JSON.parse(startingHandJSON)
    if (startingHandJSONParsed.result == "ok") {
        globalStartingHand = startingHandJSONParsed.data
        globalPreloadImages = startingHandJSONParsed.preload
        console.log("Preloading fonts...");

        globalFontLoader = new createjs.FontLoader({
            src: "fonts/canadian.woff"
        }, true);
        globalFontLoader.on("complete", fontsPreloaded);
        globalFontLoader.load();
    } else {
        console.log("Can't get starting hand")
    }
}