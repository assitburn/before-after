async function switch_resize_check(){
    let checked = document.getElementById("switch_resize").checked;

    if (checked){
        console.log("switch resize ja "+ checked);
        pixelchange=true;
        document.getElementById("pixelgroesse").disabled = false;
    }else{
        document.getElementById("pixelgroesse").disabled = true;
        pixelchange=false;
        console.log("switch resize nö "+ checked);    
    }
}

//document.getElementById("switch_resize").addEventListener("click",switch_resize_check);

async function key_check(){
    
    let pixel = document.getElementById("pixelgroesse").value ;
    pixel = pixel.replace(",","");
    pixel = pixel.replace(".","");
    document.getElementById("pixelgroesse").value = pixel;
}

//document.getElementById("pixelgroesse").addEventListener("input",key_check);

async function bildgroesseaendern(px){
    console.log("start");
    const app = require('photoshop').app;
    const activeDoc = app.activeDocument; 
    
    if (activeDoc.height > activeDoc.width){
        console.log("portrait");
        const batchPlay = require("photoshop").action.batchPlay;
        const result = await batchPlay(
        [
        {
            "_obj": "invokeCommand",
            "commandID": 1030,
            "kcanDispatchWhileModal": true,
            "_isCommand": false,
            "_options": {
                "dialogOptions": "dontDisplay"
            }
        },
        {
            "_obj": "modalStateChanged",
            "level": 1,
            "state": {
                "_enum": "state",
                "_value": "enter"
            },
            "kcanDispatchWhileModal": true,
            "title": "Image Size",
            "_isCommand": false,
            "_options": {
                "dialogOptions": "dontDisplay"
            }
        },
        {
            "_obj": "modalStateChanged",
            "level": 0,
            "state": {
                "_enum": "state",
                "_value": "exit"
            },
            "kcanDispatchWhileModal": true,
            "title": "Image Size",
            "_isCommand": false,
            "_options": {
                "dialogOptions": "dontDisplay"
            }
        },
        {
            "_obj": "imageSize",
            "height": {
                "_unit": "pixelsUnit",
                "_value": px
            },
            "scaleStyles": true,
            "constrainProportions": true,
            "interfaceIconFrameDimmed": {
                "_enum": "interpolationType",
                "_value": "automaticInterpolation"
            },
            "_isCommand": true,
            "_options": {
                "dialogOptions": "dontDisplay"
            }
        }
      
        ],{
        "synchronousExecution": false,
        
        "historyStateInfo": {
            "name": label_bildgroesse + px + label_pixel,
            "target": {
            "_ref":"document",
            "_enum": "ordinal",
            "_value": "targetEnum"
            }}
        });
    }else{
        console.log("landscape");
        const batchPlay = require("photoshop").action.batchPlay;
        const result = await batchPlay(
        [
        {
            "_obj": "invokeCommand",
            "commandID": 1030,
            "kcanDispatchWhileModal": true,
            "_isCommand": false,
            "_options": {
                "dialogOptions": "dontDisplay"
            }
        },
        {
            "_obj": "modalStateChanged",
            "level": 1,
            "state": {
                "_enum": "state",
                "_value": "enter"
            },
            "kcanDispatchWhileModal": true,
            "title": "Image Size",
            "_isCommand": false,
            "_options": {
                "dialogOptions": "dontDisplay"
            }
        },
        {
            "_obj": "modalStateChanged",
            "level": 0,
            "state": {
                "_enum": "state",
                "_value": "exit"
            },
            "kcanDispatchWhileModal": true,
            "title": "Image Size",
            "_isCommand": false,
            "_options": {
                "dialogOptions": "dontDisplay"
            }
        },
        {
            "_obj": "imageSize",
            "width": {
                "_unit": "pixelsUnit",
                "_value": px
            },
            "scaleStyles": true,
            "constrainProportions": true,
            "interfaceIconFrameDimmed": {
                "_enum": "interpolationType",
                "_value": "automaticInterpolation"
            },
            "_isCommand": true,
            "_options": {
                "dialogOptions": "dontDisplay"
            }
        }
      
        ],{
        "synchronousExecution": false,
        
        "historyStateInfo": {
            "name": label_bildgroesse + px + label_pixel,
            "target": {
            "_ref":"document",
            "_enum": "ordinal",
            "_value": "targetEnum"
            }}
        });
    }
    await menuCommand(1192);
}