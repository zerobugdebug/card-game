var globalFontLoader
var globalImageLoader
var globalStartingHand
var globalContainerGameField
var globalCardsArray


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

var ability = {
    name: "",
    power: 0,
    turn: 0,
    speed: 0,
    defense: 0,
    strike: 0
}

var primaryAbility = secondaryAbility = ability


var card = {
    imageId: "",
    name: "",
    power: 0,
    defense: 0,
    speed: 0,
    dimension: "",
    rarity: "",
    primaryAbility,
    secondaryAbility,
    description: ""
}


function textWithOutline(id, x, y, text, font, color, container) {
    textOutline = new createjs.Text(text, font, "#000");
    textOutline.x = x;
    textOutline.y = y;
    textOutline.textAlign = "center"
    textOutline.textBaseline = "middle"
        //textPower.shadow = new createjs.Shadow("#000000", 3, 3, 3);
    textOutline.outline = 3
    textOutline.name = id + ".outline"
    container.addChild(textOutline);

    textBase = new createjs.Text(text, font, color);
    textBase.x = x;
    textBase.y = y;
    textBase.textAlign = "center"
    textBase.textBaseline = "middle"
    textBase.name = id + ".base"
        //textPower.shadow = new createjs.Shadow("#000000", 3, 3, 3);
    container.addChild(textBase);

}


function drawCard(cardX, cardY, cardJSON) {
    console.log(card)

    var containerCard = new createjs.Container();
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

    //console.log(bitmapDimension)

    textWithOutline("speed", cardDrawingDefaults.speed.x, cardDrawingDefaults.speed.y, cardJSON.speed, cardDrawingDefaults.speed.font, "#FFF", containerCard)
    textWithOutline("power", cardDrawingDefaults.power.x, cardDrawingDefaults.power.y, cardJSON.power, cardDrawingDefaults.power.font, "#FFF", containerCard)
    textWithOutline("defense", cardDrawingDefaults.defense.x, cardDrawingDefaults.defense.y, cardJSON.defense, cardDrawingDefaults.defense.font, "#FFF", containerCard)
        /*     textSpeedOutline = new createjs.Text(cardJSON.speed, cardDrawingDefaults.speed.font, "#000");
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
         */
        /*     textPowerOutline = new createjs.Text(cardJSON.power, cardDrawingDefaults.power.font, "#000");
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
         */
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
        //console.log(containerSelectedCard.getBounds())
    stage.removeChild(stage.getChildByName("selectedCard"))
    containerSelectedCard.uncache()
        //console.log(stage)
        //console.log(containerSelectedCard)
    cardHitArea = containerSelectedCard.getChildByName("cardHitArea")
        //console.log(cardHitArea)
    cardHitArea.removeAllEventListeners()

    //containerSelectedCard.removeChildAt(2)

    /*     bitmapIncrease = new createjs.Bitmap(globalImageLoader.getResult("buttons.increase"));
        bitmapIncrease.x = cardDrawingDefaults.defense.x - 15;
        bitmapIncrease.y = cardDrawingDefaults.defense.y - 45
        containerSelectedCard.addChild(bitmapIncrease);
        //console.log(bitmapIncrease)

        bitmapDecrease = new createjs.Bitmap(globalImageLoader.getResult("buttons.decrease"));
        bitmapDecrease.x = cardDrawingDefaults.defense.x - 15;
        bitmapDecrease.y = cardDrawingDefaults.defense.y + 10;
        containerSelectedCard.addChild(bitmapDecrease);

        bitmapIncrease = new createjs.Bitmap(globalImageLoader.getResult("buttons.increase"));
        bitmapIncrease.x = cardDrawingDefaults.speed.x - 15;
        bitmapIncrease.y = cardDrawingDefaults.speed.y - 45
        containerSelectedCard.addChild(bitmapIncrease);
        //console.log(bitmapIncrease)

        bitmapDecrease = new createjs.Bitmap(globalImageLoader.getResult("buttons.decrease"));
        bitmapDecrease.x = cardDrawingDefaults.speed.x - 15;
        bitmapDecrease.y = cardDrawingDefaults.speed.y + 10;
        containerSelectedCard.addChild(bitmapDecrease);
        //console.log(bitmapDecrease) */

    buttonDecreaseData = {
        images: [globalImageLoader.getResult("buttons.decrease.anim")],
        frames: { width: 30, height: 30 },
        animations: {
            out: 0,
            over: 1,
            down: 2
        }
    }
    spritesheetButtonDecrease = new createjs.SpriteSheet(buttonDecreaseData);

    buttonIncreaseData = {
        images: [globalImageLoader.getResult("buttons.increase.anim")],
        frames: { width: 30, height: 30 },
        animations: {
            out: 0,
            over: 1,
            down: 2
        }
    }
    spritesheetButtonIncrease = new createjs.SpriteSheet(buttonIncreaseData);

    buttonSpeedIncrease = new createjs.Sprite(spritesheetButtonIncrease);
    buttonHelperSpeedIncrease = new createjs.ButtonHelper(buttonSpeedIncrease);
    buttonSpeedIncrease.x = cardDrawingDefaults.speed.x - 15;
    buttonSpeedIncrease.y = cardDrawingDefaults.speed.y - 50;
    buttonSpeedIncrease.on("click", buttonSpeedIncreaseClick)
    containerSelectedCard.addChild(buttonSpeedIncrease)

    buttonPowerIncrease = new createjs.Sprite(spritesheetButtonIncrease);
    buttonHelperPowerIncrease = new createjs.ButtonHelper(buttonPowerIncrease);
    buttonPowerIncrease.x = cardDrawingDefaults.power.x - 15;
    buttonPowerIncrease.y = cardDrawingDefaults.power.y - 50;
    buttonPowerIncrease.on("click", buttonPowerIncreaseClick)
    containerSelectedCard.addChild(buttonPowerIncrease)

    buttonDefenseIncrease = new createjs.Sprite(spritesheetButtonIncrease);
    buttonHelperDefenseIncrease = new createjs.ButtonHelper(buttonDefenseIncrease);
    buttonDefenseIncrease.x = cardDrawingDefaults.defense.x - 15;
    buttonDefenseIncrease.y = cardDrawingDefaults.defense.y - 50;
    buttonDefenseIncrease.on("click", buttonDefenseIncreaseClick)
    containerSelectedCard.addChild(buttonDefenseIncrease)

    buttonSpeedDecrease = new createjs.Sprite(spritesheetButtonDecrease);
    buttonHelperSpeedDecrease = new createjs.ButtonHelper(buttonSpeedDecrease);
    buttonSpeedDecrease.x = cardDrawingDefaults.speed.x - 15;
    buttonSpeedDecrease.y = cardDrawingDefaults.speed.y + 15;
    buttonSpeedDecrease.on("click", buttonSpeedDecreaseClick)
    containerSelectedCard.addChild(buttonSpeedDecrease)

    buttonPowerDecrease = new createjs.Sprite(spritesheetButtonDecrease);
    buttonHelperPowerDecrease = new createjs.ButtonHelper(buttonPowerDecrease);
    buttonPowerDecrease.x = cardDrawingDefaults.power.x - 15;
    buttonPowerDecrease.y = cardDrawingDefaults.power.y + 15;
    buttonPowerDecrease.on("click", buttonPowerDecreaseClick)
    containerSelectedCard.addChild(buttonPowerDecrease)

    buttonDefenseDecrease = new createjs.Sprite(spritesheetButtonDecrease);
    buttonHelperDefenseDecrease = new createjs.ButtonHelper(buttonDefenseDecrease);
    buttonDefenseDecrease.x = cardDrawingDefaults.defense.x - 15;
    buttonDefenseDecrease.y = cardDrawingDefaults.defense.y + 15;
    buttonDefenseDecrease.on("click", buttonDefenseDecreaseClick)
    containerSelectedCard.addChild(buttonDefenseDecrease)

    boundsContainerSelectedCard = containerSelectedCard.getBounds()
        //console.log(boundsContainerSelectedCard)

    // containerSelectedCard.cache(boundsContainerSelectedCard.x, boundsContainerSelectedCard.y, boundsContainerSelectedCard.width, boundsContainerSelectedCard.height)

    stage.addChild(containerSelectedCard);
    //console.log(containerSelectedCard.getBounds())




    cardHitArea.on("click", deselectCard)

    cardHitArea.on("rollover", e => {
        console.log("rollover")
        stage.canvas.title = '<h1>TOOLTIP</h1>';
    })

    cardHitArea.on("rollout", e => {
        console.log("rollout")
        stage.canvas.title = '';
    })
    stage.update()
}



function buttonSpeedDecreaseClick(event) {
    console.log("buttonSpeedDecreaseClick clicked")
    this.parent.removeChild(this.parent.getChildByName("speed.outline"))
    this.parent.removeChild(this.parent.getChildByName("speed.base"))
    textWithOutline("speed", cardDrawingDefaults.speed.x, cardDrawingDefaults.speed.y, this.parent.cardJSON.speed--, cardDrawingDefaults.speed.font, "#FFF", this.parent)

}

function buttonSpeedIncreaseClick(event) {
    console.log("buttonSpeedIncreaseClick clicked")
    this.parent.removeChild(this.parent.getChildByName("speed.outline"))
    this.parent.removeChild(this.parent.getChildByName("speed.base"))
    textWithOutline("speed", cardDrawingDefaults.speed.x, cardDrawingDefaults.speed.y, this.parent.cardJSON.speed++, cardDrawingDefaults.speed.font, "#FFF", this.parent)

}


function buttonPowerDecreaseClick(event) {
    console.log("buttonPowerDecreaseClick clicked")
    this.parent.removeChild(this.parent.getChildByName("power.outline"))
    this.parent.removeChild(this.parent.getChildByName("power.base"))
    textWithOutline("power", cardDrawingDefaults.power.x, cardDrawingDefaults.power.y, this.parent.cardJSON.power--, cardDrawingDefaults.power.font, "#FFF", this.parent)

}

function buttonPowerIncreaseClick(event) {
    console.log("buttonPowerIncreaseClick clicked")
    this.parent.removeChild(this.parent.getChildByName("power.outline"))
    this.parent.removeChild(this.parent.getChildByName("power.base"))
    textWithOutline("power", cardDrawingDefaults.power.x, cardDrawingDefaults.power.y, this.parent.cardJSON.power++, cardDrawingDefaults.power.font, "#FFF", this.parent)

}


function buttonDefenseDecreaseClick(event) {
    console.log("buttonDefenseDecreaseClick clicked")
    this.parent.removeChild(this.parent.getChildByName("defense.outline"))
    this.parent.removeChild(this.parent.getChildByName("defense.base"))
    textWithOutline("defense", cardDrawingDefaults.defense.x, cardDrawingDefaults.defense.y, this.parent.cardJSON.defense--, cardDrawingDefaults.defense.font, "#FFF", this.parent)

}

function buttonDefenseIncreaseClick(event) {
    console.log("buttonDefenseIncreaseClick clicked")
    this.parent.removeChild(this.parent.getChildByName("defense.outline"))
    this.parent.removeChild(this.parent.getChildByName("defense.base"))
    textWithOutline("defense", cardDrawingDefaults.defense.x, cardDrawingDefaults.defense.y, this.parent.cardJSON.defense++, cardDrawingDefaults.defense.font, "#FFF", this.parent)

}


function deselectCard(event) {
    console.log("Card deselected")
        //console.log(event)
        //console.log(this)
        //console.log(this.parent)
        //console.log(this.parent.parent)
    stage.removeChild(this.parent)
    stage.update()
}

function fontsPreloaded(event) {
    console.log("Fonts preloaded")
    var imagePreloadManifest = []
        //var arrayPreloadImages

    console.log("Preloading images...");
    buttonsPreloadManifest = [{ src: "ui/increase_button_anim.png", id: "buttons.increase.anim" }, { src: "ui/decrease_button_anim.png", id: "buttons.decrease.anim" }];
    imagePreloadManifest = imagePreloadManifest.concat(
            globalPreloadImages.characters.map(element => ({ src: "characters/" + element + ".png", id: "characters." + element })),
            globalPreloadImages.dimensions.map(element => ({ src: "dimensions/" + element + ".png", id: "dimensions." + element })),
            globalPreloadImages.card_templates.map(element => ({ src: "card_templates/" + element + ".png", id: "card_templates." + element })),
            buttonsPreloadManifest

        )
        //    arrayPreloadImages.forEach((element) => {
        //        imagePreloadManifest.push({ src: "characters/" + element + ".png", id: "characters." + element })
        //    });
        //console.log(imagePreloadManifest);
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
        //console.log(element, index)
        drawCard(20 + index * 170, 50, element)
    });
    stage.update()
}



function drawStartingHand(startingHandJSON) {
    createjs.Ticker.addEventListener("tick", handleTick);
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


function handleTick(event) {
    stage.update(event);
}