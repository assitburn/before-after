const toast = document.querySelector(".toast");
toast.onclick = () => {
    toast.classList.remove("visible");
};

function showToast(msg,time) {
    toast.textContent = msg;
    toast.classList.add("visible");
    setTimeout(() => {
        toast.classList.remove("visible");
    }, time);
}

function menuCommand(id) {
    require('photoshop').core.performMenuCommand({
      commandID: id,
      kcanDispatchWhileModal: true,
      _isCommand: false
    });
}

async function layeranzahl(){
    const app = require('photoshop').app;
    const myDoc = app.activeDocument;
    const docLayers = myDoc.layers;
    var aai ="";
    var anzahl=0;
    for (let i=0; i< docLayers.length; i++) {
        var anzahl = i;
    }
    layercount = anzahl;
    return anzahl;
}

async function ebenenauswahlaufheben(){
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [
    {
        "_obj": "selectNoLayers",
        "_target": [
            {
                "_ref": "layer",
                "_enum": "ordinal",
                "_value": "targetEnum"
            }
        ],
        "_isCommand": true,
        "_options": {
            "dialogOptions": "dontDisplay"
        }
    }
    ],{
    "synchronousExecution": false,
    "modalBehavior": "fail",
    "historyStateInfo": {
        "name": "Ebenenauswahl aufgehoben",
        "target": {
           "_ref":"document",
           "_enum": "ordinal",
           "_value": "targetEnum"
        }}
    });

}

async function check_ebenen_nach_oben_zusammenfassen() {
    const app = require('photoshop').app;
    const myDoc = app.activeDocument;
    const docLayers = myDoc.layers;
    var aai ="";
    var nummer=0;
        for (let i=0; i< docLayers.length; i++) {
            var nummer = i;
        }
        
        if (nummer > 0){
            await ebenen_nach_oben_zusammenfassen();
        }
    
}
async function ebenen_nach_oben_zusammenfassen(){
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [
       {
          "_obj": "mergeVisible",
          "duplicate": true,
          "_isCommand": true,
          "_options": {
             "dialogOptions": "dontDisplay"
          }
       },
       {
          "_obj": "move",
          "_target": [
             {
                "_ref": "layer",
                "_enum": "ordinal",
                "_value": "targetEnum"
             }
          ],
          "to": {
             "_ref": "layer",
             "_enum": "ordinal",
             "_value": "front"
          },
          "_isCommand": true,
          "_options": {
             "dialogOptions": "dontDisplay"
          }
       },
       {
        "_obj": "move",
        "_target": [
           {
              "_ref": "layer",
              "_enum": "ordinal",
              "_value": "targetEnum"
           }
        ],
        "to": {
           "_ref": "layer",
           "_enum": "ordinal",
           "_value": "front"
        },
        "_isCommand": true,
        "_options": {
           "dialogOptions": "dontDisplay"
        }
     },
       {
          "_obj": "set",
          "_target": [
             {
                "_ref": "layer",
                "_enum": "ordinal",
                "_value": "targetEnum"
             }
          ],
          "to": {
             "_obj": "layer",
             "name": label_zusammengefasst
          },
          "_isCommand": true,
          "_options": {
             "dialogOptions": "dontDisplay"
          }
       }
    ],{
       "synchronousExecution": false,
       "modalBehavior": "fail",
       "historyStateInfo": {
        "name": label_zusammengefasst,
        "target": {
        "_ref":"document",
        "_enum": "ordinal",
        "_value": "targetEnum"
        }}
    });

}
async function alle_ebenen_auswaehlen(){
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [
    {
        "_obj": "selectAllLayers",
        "_target": [
            {
                "_ref": "layer",
                "_enum": "ordinal",
                "_value": "targetEnum"
            }
        ],
        "_isCommand": true,
        "_options": {
            "dialogOptions": "dontDisplay"
        }
    }
    ],{
    "synchronousExecution": false,
    "modalBehavior": "fail",
    "historyStateInfo": {
     "name": label_alle_ebenen_auswaehlen,
     "target": {
     "_ref":"document",
     "_enum": "ordinal",
     "_value": "targetEnum"
     }}
    });

}


async function switch_kopie_check(){
    
    if(document.getElementById("switch_kopie").checked){
        document.getElementById("switch_kopie").innerHTML="Kopie links / unten";
        
        showToast("Kopie wird links / unten angezeigt",5000);
    }else{
        document.getElementById("switch_kopie").innerHTML="Kopie rechts / oben";
        showToast("Kopie wird rechts / oben angezeigt",5000);
    }
    
}

document.getElementById("switch_kopie").addEventListener("click",switch_kopie_check);