async function vorher_nachher(){
    layeranzahl();
    if (layercount >0){
        const app = require("photoshop").app;
        const activeDoc = app.activeDocument;   
        if (activeDoc.height > activeDoc.width){
            vorher_nachher_portrait();
            showToast("Portrait",20000);
        }else{
            vorher_nachher_quer();
            showToast("Quervormat",20000);
        }
    }else{
        showToast("zu wenig Ebenen vorhanden",20000);    
    }
}
async function background_check(){
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [
    {
        "_obj": "get",
        "_target": [
            {
                "_ref": "document",
                "_enum": "ordinal",
               "_value": "targetEnum"
            }
        ],
        "_options": {
            "dialogOptions": "dontDisplay"
        }
    }
    ],{
    "synchronousExecution": false,
    "modalBehavior": "fail"
    });
    const pinned = result[0].hasBackgroundLayer;
    if (pinned){
        hintergrund_vorhanden="ja";
    }else{
        hintergrund_vorhanden="nein";
    }
}
async function vorher_nachher_quer(){
    ebenenauswahlaufheben();
    alle_ebenen_auswaehlen();
    await farbreset();
    await check_ebenen_nach_oben_zusammenfassen();
    await ebenenauswahlaufheben();
    await select_layer_by_index(0);
    await select_layer_by_index(await layeranzahl());
    await in_neue_datei_kopieren();
    await background_check();
    if (hintergrund_vorhanden == "ja"){
        await hintergrund_entfernen();
    }
    await bildrahmen_unten(10);
    await arbeitsflaeche_erweitern_oben();
    ebenenauswahlaufheben();
    await select_layer_by_index(0);
    await nach_oben_schieben();
    await zusammenfuehren();
    await menuCommand(1192);
}
async function hintergrund_entfernen(){
    await ebenenauswahlaufheben();
    await select_layer_by_index(await layeranzahl());
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [
       {
          "_obj": "set",
          "_target": [
             {
                "_ref": "layer",
                "_property": "background"
             }
          ],
          "to": {
             "_obj": "layer",
             "opacity": {
                "_unit": "percentUnit",
                "_value": 100
             },
             "mode": {
                "_enum": "blendMode",
                "_value": "normal"
             }
          },
          "layerID": 41,
          "_isCommand": true,
          "_options": {
             "dialogOptions": "dontDisplay"
          }
       }
    ],{
       "synchronousExecution": false,
       "modalBehavior": "fail"
    });
    
}
async function vorher_nachher_portrait(){
    ebenenauswahlaufheben();
    alle_ebenen_auswaehlen();
    await farbreset();
    await check_ebenen_nach_oben_zusammenfassen();
    await ebenenauswahlaufheben();
    await select_layer_by_index(0);
    await select_layer_by_index(await layeranzahl());
    await in_neue_datei_kopieren();
    await background_check();
    if (hintergrund_vorhanden == "ja"){
        await hintergrund_entfernen();
    }
    await bildrahmen_links(10);
    await arbeitsflaeche_erweitern();
    ebenenauswahlaufheben();
    await select_layer_by_index(0);
    await nach_rechts_schieben();
    await menuCommand(1192);
    return;
}

async function zusammenfuehren(){
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [
    {
        "_obj": "make",
        "_target": [
            {
                "_ref": "layer"
            }
        ],
        "layerID": 4,
        "_isCommand": true,
        "_options": {
            "dialogOptions": "dontDisplay"
        }
    },
    {
        "_obj": "exchange",
        "_target": [
            {
                "_ref": "color",
                "_property": "colors"
            }
        ],
        "_isCommand": true,
        "_options": {
            "dialogOptions": "dontDisplay"
        }
    },
    {
        "_obj": "select",
        "_target": [
            {
                "_ref": "bucketTool"
            }
        ],
        "dontRecord": true,
        "forceNotify": true,
        "_isCommand": false,
        "_options": {
            "dialogOptions": "dontDisplay"
        }
    },
    {
        "_obj": "fill",
        "from": {
            "_obj": "paint",
            "horizontal": {
                "_unit": "pixelsUnit",
                "_value": 1666
            },
            "vertical": {
                "_unit": "pixelsUnit",
                "_value": 1319
            }
        },
        "tolerance": 32,
        "antiAlias": true,
        "using": {
            "_enum": "fillContents",
            "_value": "foregroundColor"
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
            "_value": "back"
        },
        "_isCommand": true,
        "_options": {
            "dialogOptions": "dontDisplay"
        }
    },
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
    },
    {
        "_obj": "mergeLayersNew",
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
            "name": "Vorher-Nachher"
        },
        "_isCommand": true,
        "_options": {
            "dialogOptions": "dontDisplay"
        }
    }
    ],{
    "synchronousExecution": false,
    "modalBehavior": "fail"
    });
}

async function nach_oben_schieben(){
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [
       {
          "_obj": "select",
          "_target": [
             {
                "_ref": "moveTool"
             }
          ],
          "dontRecord": true,
          "forceNotify": true,
          "_isCommand": false,
          "_options": {
             "dialogOptions": "dontDisplay"
          }
       },
       {
          "_obj": "align",
          "_target": [
             {
                "_ref": "layer",
                "_enum": "ordinal",
                "_value": "targetEnum"
             }
          ],
          "using": {
             "_enum": "alignDistributeSelector",
             "_value": "ADSTops"
          },
          "alignToCanvas": true,
          "_isCommand": true,
          "_options": {
             "dialogOptions": "dontDisplay"
          }
       },
       {
          "_obj": "canvasSize",
          "relative": true,
          "width": {
             "_unit": "pixelsUnit",
             "_value": 20
          },
          "height": {
             "_unit": "pixelsUnit",
             "_value": 10
          },
          "horizontal": {
             "_enum": "horizontalLocation",
             "_value": "center"
          },
          "vertical": {
             "_enum": "verticalLocation",
             "_value": "bottomEnum"
          },
          "_isCommand": true,
          "_options": {
             "dialogOptions": "dontDisplay"
          }
       }
    ],{
       "synchronousExecution": false,
       "modalBehavior": "fail"
    });
    
}

async function arbeitsflaeche_erweitern_oben(){
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [
       {
          "_obj": "canvasSize",
          "height": {
             "_unit": "percentUnit",
             "_value": 200
          },
          "vertical": {
             "_enum": "verticalLocation",
             "_value": "bottomEnum"
          },
          "_isCommand": true,
          "_options": {
             "dialogOptions": "dontDisplay"
          }
       }
    ],{
       "synchronousExecution": false,
       "modalBehavior": "fail"
    });
    
}

async function bildrahmen_unten(wert){
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [{
        "_obj": "canvasSize",
        "relative": true,
        "height": {
            "_unit": "pixelsUnit",
            "_value": wert
        },
        "vertical": {
            "_enum": "verticalLocation",
            "_value": "top"
        },
        "_isCommand": true,
        "_options": {
            "dialogOptions": "dontDisplay"
        }
    }
    ],{
    "synchronousExecution": false,
    "modalBehavior": "fail"
    });

}
async function nach_rechts_schieben(){
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [
    {
        "_obj": "align",
        "_target": [
            {
                "_ref": "layer",
                "_enum": "ordinal",
                "_value": "targetEnum"
            }
        ],
        "using": {
            "_enum": "alignDistributeSelector",
            "_value": "ADSRights"
        },
        "alignToCanvas": true,
        "_isCommand": true,
        "_options": {
            "dialogOptions": "dontDisplay"
        }
    },{
        "_obj": "canvasSize",
        "relative": true,
        "width": {
           "_unit": "pixelsUnit",
           "_value": 10
        },
        "horizontal": {
           "_enum": "horizontalLocation",
           "_value": "left"
        },
        "_isCommand": true,
        "_options": {
           "dialogOptions": "dontDisplay"
        }
     },
     {
        "_obj": "canvasSize",
        "relative": true,
        "height": {
           "_unit": "pixelsUnit",
           "_value": 20
        },
        "vertical": {
           "_enum": "verticalLocation",
           "_value": "center"
        },
        "_isCommand": true,
        "_options": {
           "dialogOptions": "dontDisplay"
        }
     },
     {
        "_obj": "make",
        "_target": [
           {
              "_ref": "layer"
           }
        ],
        "layerID": 4,
        "_isCommand": true,
        "_options": {
           "dialogOptions": "dontDisplay"
        }
     },
     {
        "_obj": "select",
        "_target": [
           {
              "_ref": "bucketTool"
           }
        ],
        "dontRecord": true,
        "forceNotify": true,
        "_isCommand": false,
        "_options": {
           "dialogOptions": "dontDisplay"
        }
     },
     {
        "_obj": "fill",
        "from": {
           "_obj": "paint",
           "horizontal": {
              "_unit": "pixelsUnit",
              "_value": 1869
           },
           "vertical": {
              "_unit": "pixelsUnit",
              "_value": 917
           }
        },
        "tolerance": 32,
        "antiAlias": true,
        "using": {
           "_enum": "fillContents",
           "_value": "foregroundColor"
        },
        "_isCommand": true,
        "_options": {
           "dialogOptions": "dontDisplay"
        }
     },
     {
        "_obj": "exchange",
        "_target": [
           {
              "_ref": "color",
              "_property": "colors"
           }
        ],
        "_isCommand": true,
        "_options": {
           "dialogOptions": "dontDisplay"
        }
     },
     {
        "_obj": "fill",
        "from": {
           "_obj": "paint",
           "horizontal": {
              "_unit": "pixelsUnit",
              "_value": 1866
           },
           "vertical": {
              "_unit": "pixelsUnit",
              "_value": 699
           }
        },
        "tolerance": 32,
        "antiAlias": true,
        "using": {
           "_enum": "fillContents",
           "_value": "foregroundColor"
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
           "_value": "back"
        },
        "_isCommand": true,
        "_options": {
           "dialogOptions": "dontDisplay"
        }
     },
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
     },
     {
        "_obj": "mergeLayersNew",
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
           "name": "Vorher-Nachher"
        },
        "_isCommand": true,
        "_options": {
           "dialogOptions": "dontDisplay"
        }
     }
  
  
    ],{
    "synchronousExecution": false,
    "modalBehavior": "fail"
    });
}

async function select_layer_by_index(id){
    const ps = window.require("photoshop").app;
    let doc = ps.activeDocument;
    let all_layers = doc.layers;
    
    doc = ps.activeDocument;
    if (doc.layers[id] !== "undefined")
    {
        doc.layers[id].selected = true;
    }
}

async function bildrahmen(breite,hoehe){
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [
    {
        "_obj": "canvasSize",
        "relative": true,
        "width": {
            "_unit": "pixelsUnit",
            "_value": breite
        },
        "height": {
            "_unit": "pixelsUnit",
            "_value": hoehe
        },
        "horizontal": {
            "_enum": "horizontalLocation",
            "_value": "center"
        },
        "vertical": {
            "_enum": "verticalLocation",
            "_value": "center"
        },
        "canvasExtensionColorType": {
            "_enum": "canvasExtensionColorType",
            "_value": "backgroundColor"
        },
        "_isCommand": true,
        "_options": {
            "dialogOptions": "dontDisplay"
        }
    },{
        "_obj": "reset",
        "_target": [
           {
              "_ref": "color",
              "_property": "colors"
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
     "name": label_rahmen_hinzufuegen,
     "target": {
     "_ref":"document",
     "_enum": "ordinal",
     "_value": "targetEnum"
     }}
    });
}

async function bildrahmen_links(wert){
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [
    {
        "_obj": "canvasSize",
        "relative": true,
        "width": {
            "_unit": "pixelsUnit",
            "_value": wert
        },
        "horizontal": {
            "_enum": "horizontalLocation",
            "_value": "right"
        },
        "_isCommand": true,
        "_options": {
            "dialogOptions": "dontDisplay"
        }
    }
    ],{
    "synchronousExecution": false,
    "modalBehavior": "fail"
    });
}

async function in_neue_datei_kopieren(){
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [
    {
        "_obj": "make",
        "_target": [
            {
                "_ref": "document"
            }
        ],
        "name": "Vorher-Nachher",
        "using": {
            "_ref": "layer",
            "_enum": "ordinal",
            "_value": "targetEnum"
        },
        "version": 5,
        "_isCommand": true,
        "_options": {
            "dialogOptions": "dontDisplay"
        }
    }
    ],{
    "synchronousExecution": false,
    "modalBehavior": "fail",
    "historyStateInfo": {
     "name": label_in_neue_datei_kopieren,
     "target": {
     "_ref":"document",
     "_enum": "ordinal",
     "_value": "targetEnum"
     }}
    });

}

async function arbeitsflaeche_erweitern(){
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [{
        "_obj": "canvasSize",
        "width": {
            "_unit": "percentUnit",
            "_value": 200
        },
        "horizontal": {
            "_enum": "horizontalLocation",
            "_value": "left"
        },
        "_isCommand": true,
        "_options": {
            "dialogOptions": "dontDisplay"
        }
    }
    ],{
    "synchronousExecution": false,
    "modalBehavior": "fail"
    });
}

async function farbreset(){
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [{
        "_obj": "reset",
        "_target": [
            {
                "_ref": "color",
                "_property": "colors"
            }
        ],
        "_isCommand": true,
        "_options": {
            "dialogOptions": "dontDisplay"
        }
    }
    ],{
    "synchronousExecution": false,
    "modalBehavior": "fail"
    });
}
document.getElementById("btn_vorher_nachher").addEventListener("click", vorher_nachher);
  