var px = PIXI
const pxLoader = px.Loader.shared; // PixiJS exposes a premade instance for you to use.

var globalPXApp
var globalFontLoader
var globalImageLoader
var globalStartingHand
var globalContainerGameField
var globalCardsArray
    //var filterEnergyLevel = new PIXI.filters.ColorMatrixFilter();


var fullImage = {
    character: { type: "sprite", position: { x: 22, y: 34 }, texture: "characters.aaaaaa.full", width: 256, height: 256 },
    template: { type: "sprite", position: { x: 0, y: 0 }, texture: "card_templates.common.full", width: 300, height: 420 },
    dimension: { type: "sprite", position: { x: 251, y: 262 }, texture: "dimensions.alphar.full", tooltip: "Alphar", width: 40, height: 40 },
    speed: {
        type: "text",
        text: "5",
        tooltip: "Speed of the card",
        position: { x: 32, y: 25 },
        anchor: { x: 0.5, y: 0.5 },
        style: { fontFamily: "canadian", fontWeight: "bold", fontSize: 32, align: "center", textBaseline: "middle", fill: "white", stroke: "black", strokeThickness: 5 }
    },
    power: {
        type: "text",
        text: "5",
        tooltip: "Power of the card",
        position: { x: 35, y: 374 },
        anchor: { x: 0.5, y: 0.5 },
        style: { fontFamily: "canadian", fontWeight: "bold", fontSize: 32, align: "center", textBaseline: "middle", fill: "white", stroke: "black", strokeThickness: 5 }
    },
    defense: {
        type: "text",
        text: "5",
        tooltip: "Defense of the card",
        position: { x: 267, y: 374 },
        anchor: { x: 0.5, y: 0.5 },
        style: { fontFamily: "canadian", fontWeight: "bold", fontSize: 32, align: "center", textBaseline: "middle", fill: "white", stroke: "black", strokeThickness: 5 }
    },
    name: {
        type: "text",
        text: "Jane",
        tooltip: "Name of the card",
        position: { x: 152, y: 280 },
        anchor: { x: 0.5, y: 0.5 },
        style: { fontFamily: "Georgia", fontSize: 24, align: "center", textBaseline: "middle", fill: "white", padding: 10 }
    },
    description: {
        type: "text",
        text: "Hi! My name is Jane",
        tooltip: "Card slogan",
        position: { x: 152, y: 328 },
        anchor: { x: 0.5, y: 0.5 },
        style: { fontFamily: "Arial", fontSize: 22, align: "left", textBaseline: "middle", fill: "white", padding: 10 }
    },
    primary: {
        type: "text",
        text: "primary",
        tooltip: "Primary ability",
        position: { x: 154, y: 366 },
        anchor: { x: 0.5, y: 0.5 },
        style: { fontFamily: "Arial", fontSize: 18, align: "center", textBaseline: "middle", fill: "white", padding: 10 }
    },
    secondary: {
        type: "text",
        text: "secondary",
        tooltip: "Secondary ability",
        position: { x: 154, y: 388 },
        anchor: { x: 0.5, y: 0.5 },
        style: { fontFamily: "Arial", fontSize: 18, align: "center", textBaseline: "middle", fill: "white", padding: 10 }
    },
    power_up: {
        type: "button",
        position: { x: 21, y: 346 },
        resource: "arrow_buttons",
        textures: { out: "up_arrow_out", over: "up_arrow_over", down: "up_arrow_down" },
        tooltip: "Increase power.\nEvery point of energy will multiple the power",
        onClick: function(e) {
            //            console.log("On Click!")
            let container = e.currentTarget.parent
            container.cardParams.energy.power += 1
            container.getChildByName("energy_point_power_" + container.cardParams.energy.power).alpha = 1
            container.getChildByName("power").text = container.cardParams.power * (container.cardParams.energy.power + 1)
        }

    },
    defense_up: {
        type: "button",
        position: { x: 253, y: 346 },
        resource: "arrow_buttons",
        textures: { out: "up_arrow_out", over: "up_arrow_over", down: "up_arrow_down" },
        tooltip: "Increase defense.\nEvery point of energy will multiple the defense",
        onClick: function(e) {
            let container = e.currentTarget.parent
            container.cardParams.energy.defense += 1
            container.getChildByName("energy_point_defense_" + container.cardParams.energy.defense).alpha = 1
            container.getChildByName("defense").text = container.cardParams.defense * (container.cardParams.energy.defense + 1)
        }
    },
    speed_up: {
        type: "button",
        position: { x: 19, y: -2 },
        resource: "arrow_buttons",
        textures: { out: "up_arrow_out", over: "up_arrow_over", down: "up_arrow_down" },
        tooltip: "Increase defense.\nEvery 3 points of energy will increase speed by 1",
        onClick: function(e) {
            let container = e.currentTarget.parent
            console.log("cardparams:", cardParams.energy)
            console.log("cardparams:", container.cardParams.energy)
            container.cardParams.energy.speed += 3
            container.getChildByName("energy_point_speed_" + (container.cardParams.energy.speed - 2)).alpha = 1
            container.getChildByName("energy_point_speed_" + (container.cardParams.energy.speed - 1)).alpha = 1
            container.getChildByName("energy_point_speed_" + container.cardParams.energy.speed).alpha = 1
            container.getChildByName("speed").text = (container.cardParams.speed * 1 + (container.cardParams.energy.speed / 3))
        }
    },
    power_down: {
        type: "button",
        position: { x: 21, y: 400 },
        resource: "arrow_buttons",
        textures: { out: "down_arrow_out", over: "down_arrow_over", down: "down_arrow_down" },
        tooltip: "Decrease power.\nEvery point of energy will multiple the power",
        onClick: function(e) {
            let container = e.currentTarget.parent
            if (container.cardParams.energy.power > 0) {
                container.getChildByName("energy_point_power_" + container.cardParams.energy.power).alpha = 0
                container.getChildByName("power").text = container.cardParams.power * container.cardParams.energy.power
                container.cardParams.energy.power -= 1
            }
        }
    },
    defense_down: {
        type: "button",
        position: { x: 253, y: 400 },
        resource: "arrow_buttons",
        textures: { out: "down_arrow_out", over: "down_arrow_over", down: "down_arrow_down" },
        tooltip: "Decrease defense.\nEvery point of energy will multiple the defense",
        onClick: function(e) {
            let container = e.currentTarget.parent
            if (container.cardParams.energy.defense > 0) {
                container.getChildByName("energy_point_defense_" + container.cardParams.energy.defense).alpha = 0
                container.getChildByName("defense").text = container.cardParams.defense * container.cardParams.energy.defense
                container.cardParams.energy.defense -= 1
            }
        }
    },
    speed_down: {
        type: "button",
        position: { x: 19, y: 52 },
        resource: "arrow_buttons",
        textures: { out: "down_arrow_out", over: "down_arrow_over", down: "down_arrow_down" },
        tooltip: "Decrease defense.\nEvery 1 point of speed will give back 3 points of energy",
        onClick: function(e) {
            let container = e.currentTarget.parent
            console.log("cardparams:", cardParams)
            if (container.cardParams.energy.speed > 0) {
                container.getChildByName("energy_point_speed_" + (container.cardParams.energy.speed - 2)).alpha = 0
                container.getChildByName("energy_point_speed_" + (container.cardParams.energy.speed - 1)).alpha = 0
                container.getChildByName("energy_point_speed_" + container.cardParams.energy.speed).alpha = 0
                container.cardParams.energy.speed -= 3
                container.getChildByName("speed").text = container.cardParams.speed * 1 + (container.cardParams.energy.speed / 3)
            }
        }
    },
    energy_point_speed: { type: "sprite_array", count: 15, position: { x: 0, y: -16 }, delta: { x: 16, y: 0 }, alpha: 0, texture: "energy_point" },
    energy_point_power: { type: "sprite_array", count: 15, position: { x: -16, y: 400 }, delta: { x: 0, y: -16 }, alpha: 0, texture: "energy_point" },
    energy_point_defense: { type: "sprite_array", count: 15, position: { x: 300, y: 400 }, delta: { x: 0, y: -16 }, alpha: 0, texture: "energy_point" }
}


var miniImage = {
    character: { type: "sprite", position: { x: 10, y: 10 }, texture: "characters.aaaabb", width: 256, height: 256 },
    template: { type: "sprite", position: { x: 0, y: 0 }, texture: "card_templates.common", width: 200, height: 280 },
    dimension: { type: "sprite", position: { x: 151, y: 14 }, texture: "dimensions.alphar", width: 40, height: 40 },
    speed: {
        type: "text",
        text: "5",
        position: { x: 27, y: 20 },
        anchor: { x: 0.5, y: 0.5 },
        style: { fontFamily: "canadian", fontWeight: "bold", fontSize: 32, align: "center", textBaseline: "middle", fill: "white", stroke: "black", strokeThickness: 5, padding: 10 }
    },
    power: {
        type: "text",
        text: "5",
        position: { x: 36, y: 184 },
        anchor: { x: 0.5, y: 0.5 },
        style: { fontFamily: "canadian", fontWeight: "bold", fontSize: 32, align: "center", textBaseline: "middle", fill: "white", stroke: "black", strokeThickness: 5, padding: 10 }
    },
    defense: {
        type: "text",
        text: "5",
        position: { x: 36, y: 239 },
        anchor: { x: 0.5, y: 0.5 },
        style: { fontFamily: "canadian", fontWeight: "bold", fontSize: 32, align: "center", textBaseline: "middle", fill: "white", stroke: "black", strokeThickness: 5, padding: 10 }
    },
    name: {
        type: "text",
        text: "Jane",
        position: { x: 102, y: 152 },
        anchor: { x: 0.5, y: 0.5 },
        style: { fontFamily: "Georgia", fontSize: 24, align: "center", textBaseline: "middle", fill: "white", padding: 10 }
    },
    primary: {
        type: "text",
        text: "primary",
        position: { x: 121, y: 193 },
        anchor: { x: 0.5, y: 0.5 },
        style: { fontFamily: "Arial", fontSize: 18, fontWeight: "bold", align: "center", textBaseline: "middle", fill: "green", padding: 10 }
    },
    secondary: {
        type: "text",
        text: "primary",
        position: { x: 121, y: 220 },
        anchor: { x: 0.5, y: 0.5 },
        style: { fontFamily: "Arial", fontSize: 18, align: "center", textBaseline: "middle", fill: "red", padding: 10 }
    }
}

//current state of the card, including all abilities and added energy points
var cardParams = {
    energy: {
        power: 0,
        speed: 0,
        defense: 0
    },
    power: 0,
    speed: 0,
    defense: 0
}

function drawComplexObject(container, complexObject) {
    entries = Object.entries(complexObject)
        //console.log(entries)
    _.each(entries, (element, index) => {
        //console.log(element, " - ", index)
        switch (element[1].type) {
            case "sprite":
                //console.log("sprite:", element[1])
                let sprite = new px.Sprite(pxLoader.resources[element[1].texture].texture);
                sprite.position = element[1].position
                sprite.name = element[0]
                container.addChild(sprite);
                if (element[1].tooltip) {
                    sprite.interactive = true
                    sprite.on("pointerover", e => {
                        //console.log("pointerover")
                        globalPXApp.view.title = element[1].tooltip;
                    })

                    sprite.on("pointerout", e => {
                        //console.log("pointerout")
                        globalPXApp.view.title = '';
                    })
                }
                //createDragAndDropFor(sprite)
                break;
            case "text":
                //console.log("text:", element[1])
                let text = new px.Text(element[1].text, element[1].style);
                text.anchor = element[1].anchor
                text.position = element[1].position;
                text.name = element[0]
                container.addChild(text);
                if (element[1].tooltip) {
                    text.interactive = true
                    text.on("pointerover", e => {
                        // console.log("pointerover")
                        globalPXApp.view.title = element[1].tooltip;
                    })

                    text.on("pointerout", e => {
                        //console.log("pointerout")
                        globalPXApp.view.title = "";
                    })
                } //createDragAndDropFor(text)
                break;
            case "button":
                let buttonTextures = {}
                buttonTextures.out = pxLoader.resources[element[1].resource].textures[element[1].textures.out]
                buttonTextures.over = pxLoader.resources[element[1].resource].textures[element[1].textures.over]
                buttonTextures.down = pxLoader.resources[element[1].resource].textures[element[1].textures.down]
                    //buttonTextures.push(pxLoader.resources[element[1].resource].textures[element[1].textures.out]);
                    //buttonTextures.push(pxLoader.resources[element[1].resource].textures[element[1].textures.over]);
                    //buttonTextures.push(pxLoader.resources[element[1].resource].textures[element[1].textures.down]);

                let button = new px.Sprite(buttonTextures.out);
                button.buttonMode = true;
                button.name = element[0]
                button.position = element[1].position
                button.interactive = true;

                container.addChild(button)

                button.on('click', e => {
                    console.log("top on clik")
                    if (element[1]["onClick"]) {
                        element[1]["onClick"](e)
                    }
                })

                button.on('mousedown', e => {
                    //e.stopPropagation()
                    e.currentTarget.texture = buttonTextures.down;
                })

                button.on('mouseup', e => {
                    e.currentTarget.texture = buttonTextures.over;

                    //e.stopPropagation()
                })

                button.on('mouseout', e => {
                    //e.stopPropagation()
                    e.currentTarget.texture = buttonTextures.out;
                    if (element[1].tooltip) {
                        globalPXApp.view.title = "";
                    }
                })

                button.on('mouseover', e => {
                    e.currentTarget.texture = buttonTextures.over;
                    if (element[1].tooltip) {
                        globalPXApp.view.title = element[1].tooltip;
                    }
                })
                break;
            case "sprite_array":
                console.log("sprite_array:", element[1])
                let i = 1
                for (i = 1; i <= element[1].count; i++) {
                    let sprite = new px.Sprite(pxLoader.resources[element[1].texture].texture);
                    sprite.x = element[1].position.x + element[1].delta.x * i
                    sprite.y = element[1].position.y + element[1].delta.y * i
                    sprite.name = element[0] + "_" + i
                    sprite.alpha = element[1].alpha
                    container.addChild(sprite);
                    if (element[1].tooltip) {
                        sprite.interactive = true
                        sprite.on("pointerover", e => {
                            //console.log("pointerover")
                            globalPXApp.view.title = element[1].tooltip;
                        })

                        sprite.on("pointerout", e => {
                            //console.log("pointerout")
                            globalPXApp.view.title = '';
                        })
                    }

                }
                break;

            default:
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


function drawCard(cardX, cardY, cardData) {

    let containerCard = new px.Container();
    let cardImage = miniImage
    cardImage.character.texture = "characters." + cardData.imageId + ".mini"
    cardImage.template.texture = "card_templates." + cardData.rarity + ".mini"
    cardImage.dimension.texture = "dimensions." + cardData.dimension + ".mini"
    cardImage.name.text = cardData.name
    cardImage.speed.text = cardData.speed
    cardImage.power.text = cardData.power
    cardImage.defense.text = cardData.defense
    cardImage.primary.text = cardData.primaryAbility
    cardImage.secondary.text = cardData.secondaryAbility
    containerCard = drawComplexObject(containerCard, cardImage)

    containerCard.x = cardX
    containerCard.y = cardY
    containerCard.cardData = cardData
    containerCard.cardImage = cardImage
    containerCard.interactive = true
    containerCard.cursor = "pointer"
    containerCard.on("click", selectCard)

    globalPXApp.stage.addChild(containerCard);
    return containerCard
}

function drawSelectedCard(cardX, cardY, cardData) {
    console.log("New card: ", cardData)
        //entries = Object.entries(card)
        //console.log(entries)
        //console.log(entries[8])
        //console.log(entries[8][1].description)

    let containerCard = new px.Container();
    console.log(containerCard);
    let cardImage = fullImage
    cardImage.character.texture = "characters." + cardData.imageId + ".full"
    cardImage.template.texture = "card_templates." + cardData.rarity + ".full"
    cardImage.dimension.texture = "dimensions." + cardData.dimension + ".full"
    cardImage.name.text = cardData.name
    cardImage.speed.text = cardData.speed
    cardImage.power.text = cardData.power
    cardImage.defense.text = cardData.defense
    cardImage.description.text = cardData.description
    cardImage.primary.text = cardData.primaryAbility
    cardImage.secondary.text = cardData.secondaryAbility
    containerCard = drawComplexObject(containerCard, cardImage)
        //console.log(pxLoader.resources)
        //console.log(pxLoader.resources["ojjkjk." + cardData.imageId])
        //console.log(pxLoader.resources["bjkbmn." + cardData.imageId].texture)

    //            containerCard.width = templateCard.width;
    //containerCard.height = templateCard.height;
    console.log(containerCard);
    console.log(cardParams);
    containerCard.x = cardX
    containerCard.y = cardY
    containerCard.cardData = cardData
    containerCard.cardParams = Object.assign({}, cardParams)
    containerCard.cardParams.energy = Object.assign({}, cardParams.energy)
    containerCard.cardParams.speed = cardData.speed
    containerCard.cardParams.power = cardData.power
    containerCard.cardParams.defense = cardData.defense
    containerCard.cardImage = cardImage

    //console.log(globalPXApp)
    //containerCard.scale.x = 0.5
    //containerCard.scale.y = 0.5


    //containerCard.interactive = true
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
        // console.log(this)


    if (globalPXApp.stage.getChildByName("selectedCard")) {
        console.log("already selected")
        globalPXApp.stage.removeChild(globalPXApp.stage.getChildByName("selectedCard"))
    }
    containerSelectedCard = drawSelectedCard(1200, 100, this.cardData)
    containerSelectedCard.name = "selectedCard"
        //console.log(containerSelectedCard.getBounds())
        //stage.removeChild(stage.getChildByName("selectedCard"))
        //containerSelectedCard.uncache()
        //console.log(stage)
        //console.log(containerSelectedCard)
        //cardHitArea = containerSelectedCard.getChildByName("cardHitArea")
        //console.log(cardHitArea)
        //cardHitArea.removeAllEventListeners()

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


    //-----------------------BUTTONS--------------------------
    /*     buttonDecreaseData = {
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
     */
    //-----------------------BUTTONS--------------------------

    //boundsContainerSelectedCard = containerSelectedCard.getBounds()
    //console.log(boundsContainerSelectedCard)

    // containerSelectedCard.cache(boundsContainerSelectedCard.x, boundsContainerSelectedCard.y, boundsContainerSelectedCard.width, boundsContainerSelectedCard.height)

    //stage.addChild(containerSelectedCard);
    //console.log(containerSelectedCard.getBounds())
    //console.log(pxLoader.resources["buttons.increase"])
    //console.log(px.utils.TextureCache)


    /* 
        .on('touchstart', onButtonDown)

        // set the mouseup and touchend callback...
        .on('mouseup', onButtonUp)
            .on('touchend', onButtonUp)
            .on('mouseupoutside', onButtonUp)
            .on('touchendoutside', onButtonUp)

        // set the mouseover callback...
        .on('mouseover', onButtonOver)

        // set the mouseout callback...
        .on('mouseout', onButtonOut)
     */
    // containerSelectedCard.on("click", deselectCard)
    containerSelectedCard.interactive = false
        /* 
            containerSelectedCard.on("pointerover", e => {
                console.log("pointerover")
                globalPXApp.view.title = '<h1>TOOLTIP</h1>';
            })

            containerSelectedCard.on("pointerout", e => {
                    console.log("pointerout")
                    globalPXApp.view.title = '';
                })
                // stage.update()
                */
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
        drawCard(20 + index * 220, 50, element)
    });
    //stage.update()
}

function fontsPreloaded() {
    //createjs.Ticker.addEventListener("tick", handleTick);
    console.log("Preloading images...");
    let imagePreloadManifest = []
        //buttonsPreloadManifest = [{ url: "images/ui/increase_button_anim.png", name: "buttons.increase.anim" }, { url: "images/ui/decrease_button_anim.png", name: "buttons.decrease.anim" }];
        //buttonsPreloadManifest = [{ url: "images/ui/increase_button.json", name: "buttons.increase" }, { url: "images/ui/decrease_button.json", name: "buttons.decrease" }];
    additionalPreloadManifest = [{ url: "images/ui/arrow_buttons.json", name: "arrow_buttons" }, { url: "images/ui/energy_point.png", name: "energy_point" }];
    imagePreloadManifest = imagePreloadManifest.concat(
        globalPreloadImages.characters.map(element => ({ url: "images/characters/" + element + ".full.png", name: "characters." + element + ".full" })),
        globalPreloadImages.characters.map(element => ({ url: "images/characters/" + element + ".mini.png", name: "characters." + element + ".mini" })),
        globalPreloadImages.dimensions.map(element => ({ url: "images/dimensions/" + element + ".full.png", name: "dimensions." + element + ".full" })),
        globalPreloadImages.dimensions.map(element => ({ url: "images/dimensions/" + element + ".mini.png", name: "dimensions." + element + ".mini" })),
        globalPreloadImages.card_templates.map(element => ({ url: "images/card_templates/" + element + ".full.png", name: "card_templates." + element + ".full" })),
        globalPreloadImages.card_templates.map(element => ({ url: "images/card_templates/" + element + ".mini.png", name: "card_templates." + element + ".mini" })),
        additionalPreloadManifest
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