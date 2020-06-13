var px = PIXI
const pxLoader = px.Loader.shared; // PixiJS exposes a premade instance for you to use.

var globalPXApp
var globalFontLoader
var globalImageLoader
var globalStartingHand
var globalContainerGameField
var globalCardsArray
var globalPlayerHandContainer
var globalEnemyHandContainer
var globalSelectedCardContainer

const playFieldWidth = 1800,
    playFieldHeight = 1200,
    playerHandX = 10,
    playerHandY = 10,
    playerHandInterval = 10,
    enemyHandX = 10,
    enemyHandY = 10,
    enemyHandInterval = 10,
    selectedCardX = 380,
    selectedCardY = 100


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
                //console.log("cardparams:", cardParams.energy)
                //console.log("cardparams:", container.cardParams.energy)
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
                //console.log("cardparams:", cardParams)
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

var cardCalculationBox = {
    speed_label: {
        type: "text",
        text: "Speed:",
        position: { x: 400, y: 20 },
        anchor: { x: 0.5, y: 0.5 },
        style: { fontFamily: "canadian", fontWeight: "bold", fontSize: 32, align: "center", textBaseline: "middle", fill: "white", stroke: "black", strokeThickness: 5, padding: 10 }
    },
    power_label: {
        type: "text",
        text: "Power:",
        position: { x: 400, y: 50 },
        anchor: { x: 0.5, y: 0.5 },
        style: { fontFamily: "canadian", fontWeight: "bold", fontSize: 32, align: "center", textBaseline: "middle", fill: "white", stroke: "black", strokeThickness: 5, padding: 10 }
    },
    defense_label: {
        type: "text",
        text: "Defense:",
        position: { x: 400, y: 80 },
        anchor: { x: 0.5, y: 0.5 },
        style: { fontFamily: "canadian", fontWeight: "bold", fontSize: 32, align: "center", textBaseline: "middle", fill: "white", stroke: "black", strokeThickness: 5, padding: 10 }
    },
    speed_value: {
        type: "text",
        text: "5",
        position: { x: 500, y: 20 },
        anchor: { x: 0.5, y: 0.5 },
        style: { fontFamily: "canadian", fontWeight: "bold", fontSize: 32, align: "center", textBaseline: "middle", fill: "white", stroke: "black", strokeThickness: 5, padding: 10 }
    },
    power_value: {
        type: "text",
        text: "5",
        position: { x: 500, y: 50 },
        anchor: { x: 0.5, y: 0.5 },
        style: { fontFamily: "canadian", fontWeight: "bold", fontSize: 32, align: "center", textBaseline: "middle", fill: "white", stroke: "black", strokeThickness: 5, padding: 10 }
    },
    defense_value: {
        type: "text",
        text: "5",
        position: { x: 500, y: 80 },
        anchor: { x: 0.5, y: 0.5 },
        style: { fontFamily: "canadian", fontWeight: "bold", fontSize: 32, align: "center", textBaseline: "middle", fill: "white", stroke: "black", strokeThickness: 5, padding: 10 }
    }
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
                    //console.log("top on clik")
                    e.stopPropagation()
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


function drawCard(cardData) {

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
    containerCard.cardImage = cardImage



    //globalPlayerHandContainer.addChild(containerCard);

    return containerCard
}

function drawSelectedCard(cardData) {
    //console.log("New card: ", cardData)
    //entries = Object.entries(card)
    //console.log(entries)
    //console.log(entries[8])
    //console.log(entries[8][1].description)

    let containerCard = new px.Container();
    //console.log(containerCard);
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
    //console.log(containerCard);
    // console.log(cardParams);
    containerCard.cardImage = cardImage

    //console.log(globalPXApp)
    //containerCard.scale.x = 0.5
    //containerCard.scale.y = 0.5




    //globalSelectedCardContainer.addChild(containerCard);
    //globalSelectedCardContainer.alpha = 1
    //globalPlayerHandContainer.alpha = 0.5
    //globalPXApp.stage.alpha = 0.5

    //containerCard.cache(-50, -50, cardDrawingDefaults.template.width + 50, cardDrawingDefaults.template.height + 50)
    // createjs.Ticker.framerate = 30;
    //console.log(containerCard.toJSON())

    return containerCard
}

function drawCalculationBox(boxData) {

    console.log(boxData)
    let containerCalculationBox = new px.Container();
    let background = new px.Graphics();

    background.lineStyle(2, 0x000000, 1);
    background.beginFill(0xaaaaaa, 1);
    background.drawRect(320, 0, 200, 420);
    background.endFill();
    containerCalculationBox.addChild(background)
    let boxImage = cardCalculationBox
    boxImage.power_value.text = boxData.power
    boxImage.defense_value.text = boxData.defense
    boxImage.speed_value.text = boxData.speed
    containerCalculationBox = drawComplexObject(containerCalculationBox, boxImage)
    containerCalculationBox.boxImage = boxImage



    //globalPlayerHandContainer.addChild(containerCard);

    return containerCalculationBox
}

function init() {
    globalPXApp = new px.Application({
        width: playFieldWidth,
        height: playFieldHeight,
        antialiasing: true,
        transparent: false,
        resolution: 1,
        backgroundColor: 0x999999,
        view: document.getElementById("playField")
    });
    globalPlayerHandContainer = new px.Container();
    globalPlayerHandContainer.alpha = 0
    globalPXApp.stage.addChild(globalPlayerHandContainer);
    globalEnemyHandContainer = new px.Container();
    globalEnemyHandContainer.alpha = 0
    globalPXApp.stage.addChild(globalEnemyHandContainer);
    globalSelectedCardContainer = new px.Container();
    globalSelectedCardContainer.alpha = 0
    globalPXApp.stage.addChild(globalSelectedCardContainer);
}


function selectCard(event) {
    console.log("Card selected")
        //console.log(event)
        //console.log(this)sadfasdfasdfasdf
        // console.log(this)asdfasdfasdfasdfasdfasdfasdf
    globalSelectedCardContainer.removeChildren()
        /*     if (globalPXApp.stage.getChildByName("selectedCard")) {
                console.log("already selected")
                globalPXApp.stage.removeChild(globalPXApp.stage.getChildByName("selectedCard"))
            }
         */
    containerSelectedCard = drawSelectedCard(this.cardData)
    globalSelectedCardContainer.x = selectedCardX
    globalSelectedCardContainer.y = selectedCardY
    globalSelectedCardContainer.addChild(containerSelectedCard)
    containerSelectedCard.name = "selectedCard"
    containerSelectedCard.cardData = this.cardData
    containerSelectedCard.cardParams = Object.assign({}, cardParams)
    containerSelectedCard.cardParams.energy = Object.assign({}, cardParams.energy)
    containerSelectedCard.cardParams.speed = this.cardData.speed
    containerSelectedCard.cardParams.power = this.cardData.power
    containerSelectedCard.cardParams.defense = this.cardData.defense
    containerSelectedCard.interactive = true
    containerSelectedCard.cursor = "pointer"
    containerSelectedCard.on("click", deselectCard)


    globalSelectedCardContainer.alpha = 1
    let filterPlayerHandContainer = new PIXI.filters.ColorMatrixFilter();
    filterPlayerHandContainer.brightness(0.5)
        //    filterPlayerHandContainer.desaturate()
    globalPlayerHandContainer.filters = [filterPlayerHandContainer]
    globalPlayerHandContainer.interactiveChildren = false
    let boxData = {
        power: containerSelectedCard.cardParams.power,
        defense: containerSelectedCard.cardParams.defense,
        speed: containerSelectedCard.cardParams.speed
    }
    console.log(boxData)
    containerCalculationBox = drawCalculationBox(boxData)
    globalSelectedCardContainer.addChild(containerCalculationBox)

}

function deselectCard(event) {
    console.log("Card deselected")
    globalSelectedCardContainer.removeChildren()
    globalSelectedCardContainer.alpha = 0
    globalPlayerHandContainer.filters = ""
    globalPlayerHandContainer.interactiveChildren = true
}

function resourcesPreloaded(event) {
    console.log("Everything preloaded. Starting drawing...")
    let currentCardX = 0
    globalStartingHand.forEach((element) => {
        containerCard = drawCard(element)
        containerCard.x = currentCardX
        containerCard.y = 0
        containerCard.cardData = element
        containerCard.interactive = true
        containerCard.cursor = "pointer"
        containerCard.on("click", selectCard)
        containerCard.cacheAsBitmap = true

        globalPlayerHandContainer.addChild(containerCard)

        currentCardX = currentCardX + containerCard.width + playerHandInterval

    });

    globalPlayerHandContainer.x = playerHandX
    globalPlayerHandContainer.y = playerHandY
    globalPlayerHandContainer.alpha = 1
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