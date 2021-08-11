async function vorher_nachher(){
   rand = document.getElementById("FQ-rand-slider").value;
   rand2 = rand * 2;
   speichern("rand", rand);
   let testmodus = await check_start();
   if (testmodus == false) {
      return;
   }
    await layeranzahl();
    if (layercount >0){
        const app = require("photoshop").app;
        const activeDoc = app.activeDocument;   
        original_document = await document_id();
        if (activeDoc.height > activeDoc.width){
            vorher_nachher_portrait();
            showToast("Portrait",10000);
        }else{
            vorher_nachher_quer();
            showToast("Quervormat",10000);
        }
    }else{
        showToast("zu wenig Ebenen vorhanden",20000);    
    }
}

async function vorher_nachher_quer(){
   while (loop != "fordergrundfarbe_setzen"){
      await fordergrundfarbe_setzen(red,grain,blue);
   }
   while(loop != "document_id"){
      original_document = await document_id(); 
   }
   await ebenenauswahlaufheben();
   await alle_ebenen_auswaehlen();
   while (loop!="check_ebenen_nach_oben_zusammenfassen"){
      await check_ebenen_nach_oben_zusammenfassen();
   }
   await ebenenauswahlaufheben();
   await select_layer_by_index(0);
   await select_layer_by_index(await layeranzahl());
   while (loop !="in_neue_datei_kopieren"){
      await in_neue_datei_kopieren();
   }
   neues_document = await document_id();
   await background_check();
   if (hintergrund_vorhanden == "ja"){
      await hintergrund_entfernen();
   }
   while (loop!="bildrahmen_unten"){
      await bildrahmen_unten(rand);
   }
   while (loop!="arbeitsflaeche_erweitern_oben"){
      await arbeitsflaeche_erweitern_oben();
   }
   await ebenenauswahlaufheben();
   if(document.getElementById("switch_kopie").checked){
      await select_layer_by_index(1); 
   }else{
      await select_layer_by_index(0);
   }
   while (loop!="nach_oben_schieben"){
      await nach_oben_schieben();
   }
   await select_layer_by_index(0);
   while (loop!="zusammenfuehren_quer"){
      await zusammenfuehren_quer();
   }
   await menuCommand(1192);
   while(loop !="renamelayer"){
      await renamelayer(label_layerneu);
   }
   
   while (loop != "dokument_aktivieren"){
      await dokument_aktivieren(original_document);
   }
   await ebenenauswahlaufheben();
   await select_layer_by_index(0);
   while(loop!="ebene_loeschen_name"){
      await ebene_loeschen_name(label_zusammengefasst);
   }
   while (loop != "dokument_aktivieren"){
      await dokument_aktivieren(neues_document);
   }
   return;
}

async function vorher_nachher_portrait(){
   while (loop != "fordergrundfarbe_setzen"){
      await fordergrundfarbe_setzen(red,grain,blue);
   }
   original_document = await document_id(); 
   await ebenenauswahlaufheben();
   await alle_ebenen_auswaehlen();
   while (loop!="check_ebenen_nach_oben_zusammenfassen"){
      await check_ebenen_nach_oben_zusammenfassen();
   }
   await ebenenauswahlaufheben();
   await select_layer_by_index(0);
   await select_layer_by_index(await layeranzahl());
   while (loop !="in_neue_datei_kopieren"){
      await in_neue_datei_kopieren();
   }
   await background_check();
   if (hintergrund_vorhanden == "ja"){
      while(loop !="hintergrund_entfernen"){
         await hintergrund_entfernen();
      }
   }
   while (loop != "bildrahmen_links"){
      await bildrahmen_links(rand);
   }
   while (loop !="arbeitsflaeche_erweitern"){
      await arbeitsflaeche_erweitern();
   }
   await ebenenauswahlaufheben();
   if(document.getElementById("switch_kopie").checked){
      await select_layer_by_index(1); 
   }else{
      await select_layer_by_index(0);
   }
   while (loop != "nach_rechts_schieben"){
      await nach_rechts_schieben();
   }
   await menuCommand(1192);
   neues_document = await document_id();
   while (loop != "hintergrund_portrait"){
      await hintergrund_portrait();
   }
   await ebenenauswahlaufheben();
   await select_layer_by_index(0);
   while(loop !="renamelayer"){
      await renamelayer(label_layerneu);
   }
   while (loop != "dokument_aktivieren"){
      await dokument_aktivieren(original_document);
   }
   await ebenenauswahlaufheben();
   await select_layer_by_index(0);
   while(loop!="ebene_loeschen_name"){
      await ebene_loeschen_name(label_zusammengefasst);
   }

   while (loop !="dokument_aktivieren"){
      await dokument_aktivieren(neues_document);
   }
   return;
}


async function hintergrund_portrait(){
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
         "_obj": "fill",
         "from": {
            "_obj": "paint",
            "horizontal": {
               "_unit": "pixelsUnit",
               "_value": 1887
            },
            "vertical": {
               "_unit": "pixelsUnit",
               "_value": 808
            }
         },
         "tolerance": 32,
         "antiAlias": true,
         "using": {
            "_enum": "fillContents",
            "_value": "foregroundColor"
         },
         "mode": {
            "_enum": "blendMode",
            "_value": "dissolve"
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
      }, {
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
      }
   
   ],{
      "synchronousExecution": false,
      "modalBehavior": "fail"
   });
   loop ="hintergrund_portrait";
}

async function dokument_aktivieren(id){
   const batchPlay = require("photoshop").action.batchPlay;
   const result = await batchPlay(
   [
      {
         "_obj": "select",
         "_target": [
            {
               "_ref": "document",
               "_id": id
            }
         ],
         "documentID": id,
         "_isCommand": true,
         "_options": {
            "dialogOptions": "dontDisplay"
         }
      }
     
   ],{
      "synchronousExecution": false,
      "modalBehavior": "fail"
   });
   loop = "dokument_aktivieren";
}

async function renamelayer(name){
   const batchPlay = require("photoshop").action.batchPlay;
   const result = await batchPlay(
   [
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
            "name": name
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
   loop = "renamelayer";
}

async function document_id(){
   const batchPlay = require("photoshop").action.batchPlay;
   const result = await batchPlay(
   [
      {
         "_obj": "get",
         "_target": [
            {
               "_property": "documentID"
            },
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
   const pinned = result[0].documentID;
   loop = "document_id";
   return pinned;
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
    loop="hintergrund_entfernen";
}

async function delete_layer(){
   const batchPlay = require("photoshop").action.batchPlay;
   const result = await batchPlay(
   [
      {
         "_obj": "delete",
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
      "modalBehavior": "fail"
   });
   loop = "delete_layer";
}

async function zusammenfuehren_quer(){
   //red = parseInt(await laden("red","255"));
   //blue = parseInt(await laden("blue","255"));
   //grain = parseInt(await laden("grain","255"));
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [{
        "_obj": "set",
        "_target": [
           {
              "_ref": "channel",
              "_property": "selection"
           }
        ],
        "to": {
           "_enum": "ordinal",
           "_value": "allEnum"
        },
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
             "_value": rand2
          },
          "height": {
             "_unit": "pixelsUnit",
             "_value": rand
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
       },
       {
          "_obj": "make",
          "_target": [
             {
                "_ref": "layer"
             }
          ],
          "layerID": 5,
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
                "_value": 1114
             },
             "vertical": {
                "_unit": "pixelsUnit",
                "_value": 1347
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
       }
    ],{
       "synchronousExecution": false,
       "modalBehavior": "fail"
    });
    loop ="zusammenfuehren_quer";
}

async function nach_oben_schieben(){
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [{
        "_obj": "set",
        "_target": [
           {
              "_ref": "channel",
              "_property": "selection"
           }
        ],
        "to": {
           "_enum": "ordinal",
           "_value": "allEnum"
        },
        "_isCommand": true,
        "_options": {
           "dialogOptions": "dontDisplay"
        }
     }
    ,{
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
    }
    ],{
    "synchronousExecution": false,
    "modalBehavior": "fail"
    });
    loop="nach_oben_schieben";
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
    loop = "arbeitsflaeche_erweitern_oben";
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
    loop="bildrahmen_unten";
}

async function nach_rechts_schieben(){
    const batchPlay = require("photoshop").action.batchPlay;
    const result = await batchPlay(
    [{
        "_obj": "set",
        "_target": [
           {
              "_ref": "channel",
              "_property": "selection"
           }
        ],
        "to": {
           "_enum": "ordinal",
           "_value": "allEnum"
        },
        "_isCommand": true,
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
           "_value": rand
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
           "_value": rand2
        },
        "vertical": {
           "_enum": "verticalLocation",
           "_value": "center"
        },
        "_isCommand": true,
        "_options": {
           "dialogOptions": "dontDisplay"
        }
     }, {
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
    "modalBehavior": "fail"
    });
    loop = "nach_rechts_schieben";
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
    loop="bildrahmen_links";
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
    loop="in_neue_datei_kopieren";
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
    loop="arbeitsflaeche_erweitern";
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
  