var px = PIXI
const pxLoader = px.Loader.shared; // PixiJS exposes a premade instance for you to use.

var globalPXApp
var globalFontLoader
var globalImageLoader
var globalStartingHand
var globalContainerGameField
var globalCardsArray


//const defaultCardScale = 0.8
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

var imageMini = {
    scale: 0.5,
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

var text = {

}


var fullImage = {
    character: { type: "sprite", x: 22, y: 34, texture: "characters.aaaaaa", width: 256, height: 256 },
    template: { type: "sprite", x: 0, y: 0, texture: "card_templates.common", width: 300, height: 420 },
    dimension: { type: "sprite", x: 251, y: 262, texture: "dimensions.alphar", width: 40, height: 40 },
    speed: {
        type: "text",
        position: {
            x: 32,
            y: 25
        },
        style: {
            fontFamily: "canadian",
            fontWeight: "bold",
            fontSize: 32,
            align: "center",
            textBaseline: "middle",
            fill: "white",
            stroke: "black",
            strokeThickness: 5
        }
    },
    power: {
        type: "text",
        position: {
            x: 35,
            y: 374
        },
        style: {
            fontFamily: "canadian",
            fontWeight: "bold",
            fontSize: 32,
            align: "center",
            textBaseline: "middle",
            fill: "white",
            stroke: "black",
            strokeThickness: 5
        }
    },
    defense: {
        type: "text",
        position: {
            x: 267,
            y: 374
        },
        style: {
            fontFamily: "canadian",
            fontWeight: "bold",
            fontSize: 32,
            align: "center",
            textBaseline: "middle",
            fill: "white",
            stroke: "black",
            strokeThickness: 5
        }
    },
    name: {
        type: "text",
        position: {
            x: 152,
            y: 280
        },
        style: {
            fontFamily: "Georgia",
            fontSize: 24,
            align: "center",
            textBaseline: "middle",
            fill: "white",
            padding: 10

        }
    },
    description: {
        type: "text",
        position: {
            x: 152,
            y: 328
        },
        style: {
            fontFamily: "Arial",
            fontSize: 22,
            align: "left",
            textBaseline: "middle",
            fill: "white",
            padding: 10

        }
    },
    primary: {
        type: "text",
        position: {
            x: 154,
            y: 366
        },
        style: {
            fontFamily: "Arial",
            fontSize: 18,
            align: "center",
            textBaseline: "middle",
            fill: "white",
            padding: 10

        }
    },
    secondary: {
        type: "text",
        position: {
            x: 154,
            y: 388
        },
        style: {
            fontFamily: "Arial",
            fontSize: 18,
            align: "center",
            textBaseline: "middle",
            fill: "white",
            padding: 10

        }
    }
}

var miniImage = {
    character: {
        type: "sprite",
        position: {
            x: 17,
            y: 59
        },
        texture: "characters.aaaabb",
        width: 256,
        height: 256
    },
    template: {
        type: "sprite",
        position: {
            x: 0,
            y: 0
        },
        texture: "card_templates.common",
        width: 300,
        height: 420
    },
    dimension: {
        type: "sprite",
        position: {
            x: 151,
            y: 14
        },
        texture: "dimensions.alphar",
        width: 40,
        height: 40
    },
    speed: {
        type: "text",
        text: "5",
        position: {
            x: 27,
            y: 20
        },
        anchor: {
            x: 0.5,
            y: 0.5
        },
        style: {
            fontFamily: "canadian",
            fontWeight: "bold",
            fontSize: 32,
            align: "center",
            textBaseline: "middle",
            fill: "white",
            stroke: "black",
            strokeThickness: 5,
            padding: 10

        }
    },
    power: {
        type: "text",
        text: "5",
        position: {
            x: 36, //34
            y: 184, //237
        },
        anchor: {
            x: 0.5,
            y: 0.5
        },
        style: {
            fontFamily: "canadian",
            fontWeight: "bold",
            fontSize: 32,
            align: "center",
            textBaseline: "middle",
            fill: "white",
            stroke: "black",
            strokeThickness: 5,
            padding: 10
        }
    },
    defense: {
        type: "text",
        text: "5",
        position: {
            x: 36, //170,
            y: 239, //237
        },
        anchor: {
            x: 0.5,
            y: 0.5
        },
        style: {
            fontFamily: "canadian",
            fontWeight: "bold",
            fontSize: 32,
            align: "center",
            textBaseline: "middle",
            fill: "white",
            stroke: "black",
            strokeThickness: 5,
            padding: 10
        }
    },
    name: {
        type: "text",
        text: "Jane",
        position: {
            x: 102,
            y: 152
        },
        anchor: {
            x: 0.5,
            y: 0.5
        },
        style: {
            fontFamily: "Georgia",
            fontSize: 24,
            align: "center",
            textBaseline: "middle",
            fill: "white",
            padding: 10
        }
    },
    description: {
        text: "Hello, my name is Jane!",
        type: "text",
        position: {
            x: 152,
            y: 328
        },
        anchor: {
            x: 0.5,
            y: 0.5
        },
        style: {
            fontFamily: "Arial",
            fontSize: 22,
            align: "left",
            textBaseline: "middle",
            fill: "white",
            padding: 10

        }
    },
    primary: {
        type: "text",
        text: "primary",
        position: {
            x: 121, //100,
            y: 193, //186
        },
        anchor: {
            x: 0.5,
            y: 0.5
        },
        style: {
            fontFamily: "Arial",
            fontSize: 18,
            fontWeight: "bold",
            align: "center",
            textBaseline: "middle",
            fill: "green",
            padding: 10

        }
    },
    secondary: {
        type: "text",
        text: "primary",
        position: {
            x: 121, //100,
            y: 220, // 208
        },
        anchor: {
            x: 0.5,
            y: 0.5
        },
        style: {
            fontFamily: "Arial",
            fontSize: 18,
            align: "center",
            textBaseline: "middle",
            fill: "red",
            padding: 10

        }
    }
}



/* bitmapCharacter = new createjs.Bitmap(globalImageLoader.getResult("characters." + cardJSON.imageId));
//console.log(bitmapCharacter)
containerCard.addChild(bitmapCharacter);

bitmapCharacter.x = cardDrawingDefaults.character.x;
bitmapCharacter.y = cardDrawingDefaults.character.y;

bitmapCharacter.scale = bitmapCharacter.originalScale = 1;
 */



var ability = {
    name: "",
    power: 0,
    turn: 0,
    speed: 0,
    defense: 0,
    strike: 0,
    description: "",
    tooltip: ""
}

var primaryAbility = secondaryAbility = ability

var card = {
    imageId: "",
    name: "",
    power: 0,
    defense: 0,
    speed: 0,
    energy: 0,
    dimension: "",
    rarity: "",
    primaryAbility,
    secondaryAbility,
    description: "",
    graphics: {
        containerMini: "",
        containerFull: ""
            //imageMini,
            //imageFull
    },
    json: ""
}

function drawComplexObject(container, complexObject) {
    entries = Object.entries(complexObject)
    console.log(entries)
    _.each(entries, (element, index) => {
        //console.log(element, " - ", index)
        switch (element[1].type) {
            case "sprite":
                console.log("sprite:", element[1])
                let sprite = new px.Sprite(pxLoader.resources[element[1].texture].texture);
                sprite.position = element[1].position
                sprite.name = element[0]
                container.addChild(sprite);
                //createDragAndDropFor(sprite)
                break;
            case "text":
                console.log("text:", element[1])
                let text = new px.Text(element[1].text, element[1].style);
                text.anchor = element[1].anchor
                text.position = element[1].position;
                text.name = element[0]
                container.addChild(text);
                createDragAndDropFor(text)
                break;
            case "default":
                console.log("UNKNOWN:", element[1])
        }
    })
    return container
}


function createDragAndDropFor(target) {
    target.interactive = true;
    var drag
    target.on("mousedown", function(e) {
        drag = target;
        //console.log(e)
    })
    target.on("mouseup", function(e) {
        console.log(drag.position.x + " x " + drag.position.y)
        drag = false;
    })
    target.on("mousemove", function(e) {
        if (drag) {
            drag.position.x += (e.data.originalEvent.movementX * 0.5);
            drag.position.y += (e.data.originalEvent.movementY * 0.5);
        }
    })
}


function drawCard(cardX, cardY, cardJSON) {
    //console.log(card)
    //entries = Object.entries(card)
    //console.log(entries)
    //console.log(entries[8])
    //console.log(entries[8][1].description)

    let containerCard = new px.Container();
    let cardImage = miniImage
    cardImage.character.texture = "characters." + cardJSON.imageId
    cardImage.template.texture = "card_templates." + cardJSON.rarity
    cardImage.dimension.texture = "dimensions." + cardJSON.dimension
    cardImage.name.text = cardJSON.name
    cardImage.speed.text = cardJSON.speed
    cardImage.power.text = cardJSON.power
    cardImage.defense.text = cardJSON.defense
    cardImage.description.text = cardJSON.description
    cardImage.primary.text = cardJSON.primaryAbility
    cardImage.secondary.text = cardJSON.secondaryAbility
    containerCard = drawComplexObject(containerCard, miniImage)
        //console.log(pxLoader.resources)
        //console.log(pxLoader.resources["ojjkjk." + cardJSON.imageId])
        //console.log(pxLoader.resources["bjkbmn." + cardJSON.imageId].texture)

    //            containerCard.width = templateCard.width;
    //containerCard.height = templateCard.height;
    //console.log(containerCard);
    containerCard.x = cardX
    containerCard.y = cardY
    containerCard.cardJSON = cardJSON

    //console.log(globalPXApp)
    //containerCard.scale.x = 0.5
    //containerCard.scale.y = 0.5


    containerCard.interactive = false
        //containerCard.on("click", selectCard)

    globalPXApp.stage.addChild(containerCard);

    //containerCard.cache(-50, -50, cardDrawingDefaults.template.width + 50, cardDrawingDefaults.template.height + 50)
    // createjs.Ticker.framerate = 30;
    //console.log(containerCard.toJSON())

    return containerCard
}

function init() {
    globalPXApp = new px.Application({
        width: 1800,
        height: 800,
        antialiasing: true,
        transparent: false,
        resolution: 1,
        backgroundColor: 0x999999
    });

    //Add the canvas that Pixi automatically created for you to the HTML document
    document.getElementById("playField").appendChild(globalPXApp.view);

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

function resourcesPreloaded(event) {
    console.log("Everything preloaded. Starting drawing...")
        //console.log(globalStartingHand);
        //console.log(canvas)
        //console.log(stage)
        //console.log("fontloader:")
        //console.log(globalFontLoader)
        //console.log(globalImageLoader)
    globalStartingHand.forEach((element, index) => {
        //console.log(element, index)
        drawCard(20 + index * 300, 50, element)
    });
    //stage.update()
}

function fontsPreloaded() {
    //createjs.Ticker.addEventListener("tick", handleTick);
    console.log("Preloading images...");
    let imagePreloadManifest = []
    buttonsPreloadManifest = [{ url: "images/ui/increase_button_anim.png", name: "buttons.increase.anim" }, { url: "images/ui/decrease_button_anim.png", name: "buttons.decrease.anim" }];
    imagePreloadManifest = imagePreloadManifest.concat(
        globalPreloadImages.characters.map(element => ({ url: "images/characters/" + element + ".png", name: "characters." + element })),
        globalPreloadImages.dimensions.map(element => ({ url: "images/dimensions/" + element + ".png", name: "dimensions." + element })),
        globalPreloadImages.card_templates.map(element => ({ url: "images/card_templates/" + element + ".png", name: "card_templates." + element })),
        buttonsPreloadManifest
    )

    pxLoader.add(imagePreloadManifest)
        //console.log(imagePreloadManifest)
        //console.log(pxLoader)
    pxLoader.onComplete.add(resourcesPreloaded);
    pxLoader.load();
    //console.log(pxLoader)
}

function drawStartingHand(startingHandJSON) {
    //createjs.Ticker.addEventListener("tick", handleTick);
    var startingHandJSONParsed = JSON.parse(startingHandJSON)
    if (startingHandJSONParsed.result == "ok") {
        globalStartingHand = startingHandJSONParsed.data
        globalPreloadImages = startingHandJSONParsed.preload
        console.log("Preloading fonts...");
        let fontCanadian = new FontFaceObserver('canadian');
        let fontPostamt = new FontFaceObserver('Postamt');
        Promise.all([fontCanadian.load(), fontPostamt.load()]).then(fontsPreloaded)
    } else {
        console.log("Can't get starting hand")
    }
}


function handleTick(event) {
    stage.update(event);
}